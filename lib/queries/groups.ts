import { Dataset, Group } from "@portaljs/ckan";
import {
  CkanResponse,
  privateToPublicDatasetName,
  privateToPublicGroupName,
  privateToPublicOrgName,
  publicToPrivateGroupName,
} from "./utils";
import ky from "ky";

export const getAllGroups = async ({
  detailed = true, // Whether to add group_show or not
}: {
  detailed: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const mainGroup = `${mainOrg}-group`;
  const groupsTree: CkanResponse<Group & { children: Group[] }> = await ky
    .get(
      `https://demo.dev.datopian.com/api/3/action/group_tree_section?type=group&id=${mainGroup}`
    )
    .json();

  let children = groupsTree.result.children;

  if (detailed) {
    children = await Promise.all(
      children.map(async (g) => {
        const groupDetails: CkanResponse<Group> = await ky
          .get(
            `https://demo.dev.datopian.com/api/3/action/group_show?id=${g.id}`
          )
          .json();

        return groupDetails.result;
      })
    );
  }

  children = children.map((c) => {
    const publicName = privateToPublicGroupName(c.name, mainGroup);
    return { ...c, name: publicName };
  });

  return children;
};

export const getGroup = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const mainGroup = `${mainOrg}-group`;
  const privateName = publicToPrivateGroupName(name, mainGroup);

  const group: CkanResponse<Group> = await ky
    .get(
      `https://demo.dev.datopian.com/api/3/action/group_show?id=${privateName}&include_datasets=${include_datasets}`
    )
    .json();

  if (include_datasets) {
    group.result.packages.forEach((dataset: Dataset) => {
      const publicOrgName = privateToPublicOrgName(
        dataset.organization.name,
        mainOrg
      );
      dataset.organization.name = publicOrgName;

      const publicDatasetName = privateToPublicDatasetName(
        dataset.name,
        mainOrg
      );
      dataset.name = publicDatasetName;
    });
  }

  const publicName = privateToPublicGroupName(group.result.name, mainGroup);

  return { ...group.result, name: publicName, _name: group.result.name };
};

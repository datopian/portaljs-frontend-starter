import { Dataset, Group } from "@portaljs/ckan";
import {
  privateToPublicDatasetName,
  privateToPublicGroupName,
  privateToPublicOrgName,
  publicToPrivateGroupName,
} from "./utils";
import CkanRequest, { CkanResponse } from "@portaljs/ckan-api-client-js";

const DMS = process.env.NEXT_PUBLIC_DMS;
const mainOrg = process.env.NEXT_PUBLIC_ORG;
const mainGroup = `${mainOrg}-group`;

export const getAllGroups = async ({
  detailed = true, // Whether to add group_show or not
}: {
  detailed: boolean;
}) => {
  if (!mainOrg) {
    const organizations = await CkanRequest.get<CkanResponse<Group[]>>(
      `group_list?all_fields=True`,
      {
        ckanUrl: DMS,
      }
    );

    return organizations.result.map((o) => {
      return { ...o, _name: o.name };
    });
  }

  const groupsTree = await CkanRequest.get<
    CkanResponse<Group & { children: Group[] }>
  >(`group_tree_section?type=group&id=${mainGroup}`, {
    ckanUrl: DMS,
  });

  let children = groupsTree.result.children;

  if (detailed) {
    children = await Promise.all(
      children.map(async (g) => {
        const groupDetails = await CkanRequest.get<CkanResponse<Group>>(
          `group_show?id=${g.id}`,
          {
            ckanUrl: DMS,
          }
        );
        return groupDetails.result;
      })
    );
  }

  children = children.map((c) => {
    const publicName = privateToPublicGroupName(c.name);
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
  const privateName = publicToPrivateGroupName(name);

  const group = await CkanRequest.get<CkanResponse<Group>>(
    `group_show?id=${privateName}&include_datasets=${include_datasets}`,
    { ckanUrl: DMS }
  );

  if (include_datasets) {
    group.result.packages.forEach((dataset: Dataset) => {
      const publicOrgName = privateToPublicOrgName(dataset.organization.name);
      dataset.organization.name = publicOrgName;

      const publicDatasetName = privateToPublicDatasetName(dataset.name);
      dataset.name = publicDatasetName;
    });
  }

  const publicName = privateToPublicGroupName(group.result.name);

  return { ...group.result, name: publicName, _name: group.result.name };
};

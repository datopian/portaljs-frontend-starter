import { Dataset, Group } from "@portaljs/ckan";
import {
  privateToPublicDatasetName,
  privateToPublicGroupName,
  privateToPublicOrgName,
  publicToPrivateGroupName,
} from "./utils";
import CkanRequest, { CkanResponse } from "@portaljs/ckan-api-client-js";

const DMS = process.env.NEXT_PUBLIC_DMS;

export const getAllGroups = async () => {
    const groups = await CkanRequest.get<CkanResponse<Group[]>>(
      `group_list?all_fields=True`,
      {
        ckanUrl: DMS,
      }
    );

    return groups.result.map((o) => {
      return { ...o, _name: o.name };
    });
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

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
  const group = await CkanRequest.get<CkanResponse<Group>>(
    `group_show?id=${name}&include_datasets=${include_datasets}`,
    { ckanUrl: DMS }
  );

  return { ...group.result, _name: group.result.name };
};

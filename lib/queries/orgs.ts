import { Dataset, Organization } from "@portaljs/ckan";
import {
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateOrgName,
} from "./utils";
import CkanRequest, { CkanResponse } from "@portaljs/ckan-api-client-js";

const DMS = process.env.NEXT_PUBLIC_DMS;

export const getOrganization = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const privateName = publicToPrivateOrgName(name);

  const organization = await CkanRequest.get<CkanResponse<Organization>>(
    `organization_show?id=${privateName}&include_datasets=${include_datasets}`,
    { ckanUrl: DMS }
  );

  if (include_datasets) {
    organization.result.packages.forEach((dataset: Dataset) => {
      dataset.organization.name = name;
      dataset.name = privateToPublicDatasetName(dataset.name);
    });
  }

  const publicName = privateToPublicOrgName(organization.result.name);

  return {
    ...organization.result,
    name: publicName,
    _name: organization.result.name,
  };
};

export const getAllOrganizations = async () => {
  const organizations = await CkanRequest.get<CkanResponse<Organization[]>>(
    `organization_list?all_fields=True`,
    {
      ckanUrl: DMS,
    }
  );

  return organizations.result.map((o) => {
    return { ...o, _name: o.name };
  });
};

import { Organization } from "@portaljs/ckan";
import CkanRequest, { CkanResponse } from "@portaljs/ckan-api-client-js";

const DMS = process.env.NEXT_PUBLIC_DMS;

export const getOrganization = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const organization = await CkanRequest.get<CkanResponse<Organization>>(
    `organization_show?id=${name}&include_datasets=${include_datasets}`,
    { ckanUrl: DMS }
  );

  return organization.result
};

export const getAllOrganizations = async () => {
  const organizations = await CkanRequest.get<CkanResponse<Organization[]>>(
    `organization_list?all_fields=True`,
    {
      ckanUrl: DMS,
    }
  );

  return organizations.result
};

import { Dataset, Organization } from "@portaljs/ckan";
import {
  CkanResponse,
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateOrgName,
} from "./utils";
import CkanRequest from "@portaljs/ckan-api-client-js";

const DMS = process.env.NEXT_PUBLIC_DMS;

export const getOrganization = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const privateName = publicToPrivateOrgName(name, mainOrg);

  const organization = await CkanRequest.get<CkanResponse<Organization>>(
    `organization_show?id=${privateName}&include_datasets=${include_datasets}`,
    { ckanUrl: DMS }
  );

  if (include_datasets) {
    organization.result.packages.forEach((dataset: Dataset) => {
      dataset.organization.name = name;
      dataset.name = privateToPublicDatasetName(dataset.name, mainOrg);
    });
  }

  const publicName = privateToPublicOrgName(organization.result.name, mainOrg);

  return {
    ...organization.result,
    name: publicName,
    _name: organization.result.name,
  };
};

export const getAllOrganizations = async ({
  detailed = true, // Whether to add organization_show or not
}: {
  detailed?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  /*
   * Get hierarchy from root org
   *
   */

  const organizationsTree = await CkanRequest.get<
    CkanResponse<Organization & { children: Organization[]; _name: string }>
  >(`group_tree_section?type=organization&id=${mainOrg}`, {
    ckanUrl: DMS,
  });

  /*
   * Flatten orgs hierarchy, fix name and preserve
   * internal name as `_name`
   *
   */
  const { children, ...parent } = organizationsTree.result;

  let organizations = children.map((c) => {
    const publicName = privateToPublicOrgName(c.name, mainOrg);
    return { ...c, name: publicName, _name: c.name };
  });

  organizations.unshift({ ...parent, _name: parent.name });

  /*
   * Get details for each org
   *
   */
  if (organizations && detailed) {
    organizations = await Promise.all(
      organizations.map(async (o) => {
        const orgDetails = await getOrganization({
          name: o.name,
        });

        return { ...o, ...orgDetails, name: o.name, _name: o._name };
      })
    );
  }

  return organizations;
};

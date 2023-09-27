import { CKAN, Organization, PackageSearchOptions } from "@portaljs/ckan";
import {
  CkanResponse,
  getAvailableOrgs,
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateDatasetName,
} from "./utils";
import ky from "ky";

export async function searchDatasets(input: PackageSearchOptions) {
  const ckan = new CKAN(process.env.NEXT_PUBLIC_DMS);
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const mainGroup = `${mainOrg}-group`;

  //  Add the main group prefix before querying
  if (input.groups) {
    input.groups = input.groups.map((g) => `${mainGroup}--${g}`);
  }

  let orgs: string[] = [];
  if (input.orgs && input.orgs.length > 0) {
    const mainOrgPrefix = `${mainOrg}--`;
    orgs = input.orgs?.map((g) => {
      if (g == mainOrg) {
        return g;
      }
      return `${mainOrgPrefix}${g}`;
    });
  } else {
    orgs = await getAvailableOrgs(mainOrg);
  }

  const datasets = await ckan.packageSearch({
    ...input,
    orgs,
  });

  //  Remove the main group prefix from the groups names
  //  Remove the main org prefix from the owner_org name
  const results = datasets.datasets.map((d) => {
    const mainGroupPrefix = `${mainGroup}--`;
    const mainOrgPrefix = `${mainOrg}--`;
    const groups = d?.groups?.map((g) => {
      const name = g.name.slice(mainGroupPrefix.length);

      return { ...g, name };
    });
    const owner_org =
      d.organization.name === mainOrg
        ? mainOrg
        : d.organization.name.slice(mainOrgPrefix.length);
    const organization = { ...d.organization, name: owner_org };

    const publicName = privateToPublicDatasetName(d.name, mainOrg);

    return { ...d, organization, name: publicName, groups };
  });

  return { datasets: results, count: datasets.count };
}

export const getDataset = async ({ name }: { name: string }) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const ckan = new CKAN(DMS);
  const privateName = publicToPrivateDatasetName(name, mainOrg);
  const dataset = await ckan.getDatasetDetails(privateName);
  dataset.name = privateToPublicDatasetName(dataset.name, mainOrg);
  return {
    ...dataset,
    _name: privateName,
    organization: {
      ...dataset.organization,
      name: privateToPublicOrgName(dataset.organization.name, mainOrg),
    },
  };
};

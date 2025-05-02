import { CKAN, Organization } from "@portaljs/ckan";
import {
  CkanResponse,
  getAvailableOrgs,
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateDatasetName,
} from "./utils";
import ky from "ky";
import { PackageSearchOptions } from "@/schemas/dataset.interface";

export async function searchDatasets_OLD(input: PackageSearchOptions) {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const ckan = new CKAN(DMS);

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
    orgs = await getAvailableOrgs(mainOrg, DMS);
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

export async function searchDatasets(options: PackageSearchOptions) {
  const baseAction = `package_search`;
  const mainOrg = process.env.NEXT_PUBLIC_ORG;

  const facetFields = [
    "groups",
    "organization",
    "res_format",
    //"tags",
  ]
    .map((f) => `"${f}"`)
    .join(",");

  let queryParams: string[] = [];

  if (options?.query) {
    queryParams.push(`q=${options.query}`);
  }

  if (options?.offset) {
    queryParams.push(`start=${options.offset}`);
  }

  if (options?.limit || options?.limit == 0) {
    queryParams.push(`rows=${options.limit}`);
  }

  if (options?.sort) {
    queryParams.push(`sort=${options?.sort}`);
  }

  let fqList: string[] = [`main_org:${mainOrg}`];

  if (options?.fq) {
    fqList.push(options.fq);
  }

  let fqListGroups: string[] = [];
  if (options?.orgs?.length) {
    fqListGroups.push(`organization:(${joinTermsWithOr(options?.orgs)})`);
  }

  if (options?.groups?.length) {
    fqListGroups.push(`groups:(${joinTermsWithOr(options?.groups)})`);
  }

  if (options?.resFormat?.length) {
    fqListGroups.push(`res_format:(${joinTermsWithOr(options.resFormat)})`);
  }

  if (fqListGroups?.length) {
    fqList.push(`+(${fqListGroups.join(" AND ")})`);
  }

  if (fqList?.length) {
    queryParams.push(`fq=${fqList.join(" ")}`);
  }

  const action = `${baseAction}?${queryParams.join(
    "&"
  )}&facet.field=[${facetFields}]&facet.limit=9999`;

  const res = await CkanRequest.get(action);

  return { ...res.result, datasets: res.result.results };
}

const joinTermsWithOr = (tems) => {
  return tems.map((t) => `"${t}"`).join(" OR ");
};

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

export const CkanRequest = {
  get: async (endpoint: string) => {
    const DMS = process.env.NEXT_PUBLIC_DMS;
    try {
      const response = await fetch(`${DMS}/api/3/action/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch Data Dictionary:", error);
    }
  },
};

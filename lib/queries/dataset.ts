import { CKAN } from "@portaljs/ckan";
import {
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateDatasetName,
} from "./utils";
import { Dataset, PackageSearchOptions } from "@/schemas/dataset.interface";
import CkanRequest, { CkanResponse } from "@portaljs/ckan-api-client-js";

const DMS = process.env.NEXT_PUBLIC_DMS;

export async function searchDatasets(options: PackageSearchOptions) {
  const baseAction = `package_search`;

  const facetFields = ["groups", "organization", "res_format", "tags"]
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

  let fqList: string[] = [];

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

  if (options?.tags?.length) {
    fqListGroups.push(`tags:(${joinTermsWithOr(options?.tags)})`);
  }

  if (options?.resFormat?.length) {
    fqListGroups.push(`res_format:(${joinTermsWithOr(options.resFormat)})`);
  }

  if (options?.type) {
    fqListGroups.push(`dataset_type:${options.type}`);
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

  const res = await CkanRequest.get<
    CkanResponse<{
      results: Dataset[];
      count: number;
      search_facets: {
        [k: string]: {
          title: string;
          items: { name: string; display_name: string; count: number }[];
        };
      };
    }>
  >(action, { ckanUrl: DMS });

  return { ...res.result, datasets: res.result.results };
}

const joinTermsWithOr = (tems) => {
  return tems.map((t) => `"${t}"`).join(" OR ");
};

export const getDataset = async ({ name }: { name: string }) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const ckan = new CKAN(DMS);
  const dataset = await ckan.getDatasetDetails(name);

  return {
    ...dataset,
    _name: name,
    organization: {
      ...dataset.organization,
      name: privateToPublicOrgName(dataset.organization.name),
    },
  };
};

import { Organization } from "@portaljs/ckan";
import ky from "ky";

export interface CkanResponse<T> {
  help: string;
  success: boolean;
  result: T;
}

export const publicToPrivateDatasetName = (
  publicName: string,
  mainOrg: string
) => {
  return `${mainOrg}--${publicName}`;
};

export const privateToPublicDatasetName = (
  privateName: string,
  mainOrg: string
) => {
  const mainOrgPrefix = `${mainOrg}--`;
  let publicName = privateName;

  if (privateName.startsWith(mainOrgPrefix)) {
    publicName = publicName.slice(mainOrgPrefix.length);
  }

  return publicName;
};

export const publicToPrivateGroupName = (
  publicName: string,
  mainGroup: string
) => {
  if (publicName === mainGroup) {
    return mainGroup;
  }

  return `${mainGroup}--${publicName}`;
};

export const privateToPublicGroupName = (
  privateName: string,
  mainGroup: string
) => {
  if (privateName === mainGroup) {
    return mainGroup;
  }

  const mainGroupPrefix = `${mainGroup}--`;
  let publicName = privateName;

  if (privateName.startsWith(mainGroupPrefix)) {
    publicName = publicName.slice(mainGroupPrefix.length);
  }

  return publicName;
};

export const publicToPrivateOrgName = (publicName: string, mainOrg: string) => {
  if (publicName === mainOrg) {
    return mainOrg;
  }

  return `${mainOrg}--${publicName}`;
};

export const privateToPublicOrgName = (
  privateName: string,
  mainOrg: string
) => {
  if (privateName === mainOrg) {
    return mainOrg;
  }

  const mainOrgPrefix = `${mainOrg}--`;
  let publicName = privateName;

  if (privateName.startsWith(mainOrgPrefix)) {
    publicName = publicName.slice(mainOrgPrefix.length);
  }
  return publicName;
};

export const getAvailableOrgs = async (mainOrg: string) => {
  const organizationsTree: CkanResponse<
    Organization & { children: Organization[] }
  > = await ky
    .get(
      `https://demo.dev.datopian.com/api/3/action/group_tree_section?type=organization&id=${mainOrg}`
    )
    .json();

  const { children, ...parent } = organizationsTree.result;
  const orgsList = children;
  orgsList.unshift(parent);
  return orgsList.map((o) => o.name);
};

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

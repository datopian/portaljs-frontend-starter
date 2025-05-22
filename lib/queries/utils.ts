const mainOrg = process.env.NEXT_PUBLIC_ORG;

export const publicToPrivateDatasetName = (publicName: string) => {
  return `${mainOrg}--${publicName}`;
};

export const privateToPublicDatasetName = (privateName: string) => {
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

export const publicToPrivateOrgName = (publicName: string) => {
  if (publicName === mainOrg) {
    return mainOrg;
  }

  return `${mainOrg}--${publicName}`;
};

export const privateToPublicOrgName = (privateName: string) => {
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

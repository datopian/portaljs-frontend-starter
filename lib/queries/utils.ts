const mainOrg = process.env.NEXT_PUBLIC_ORG;
const mainGroup = mainOrg ? `${mainOrg}-group` : undefined;

export const publicToPrivateDatasetName = (publicName: string) => {
  if (!mainOrg) {
    return publicName;
  }

  return `${mainOrg}--${publicName}`;
};

export const privateToPublicDatasetName = (privateName: string) => {
  if (!mainOrg) {
    return privateName;
  }

  const mainOrgPrefix = `${mainOrg}--`;
  let publicName = privateName;

  if (privateName.startsWith(mainOrgPrefix)) {
    publicName = publicName.slice(mainOrgPrefix.length);
  }

  return publicName;
};

export const publicToPrivateGroupName = (publicName: string) => {
  if (!mainOrg) {
    return publicName;
  }

  if (publicName === mainGroup) {
    return mainGroup;
  }

  return `${mainGroup}--${publicName}`;
};

export const privateToPublicGroupName = (privateName: string) => {
  if (!mainOrg) {
    return privateName;
  }

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
  if (!mainOrg) {
    return publicName;
  }

  if (publicName === mainOrg) {
    return mainOrg;
  }

  return `${mainOrg}--${publicName}`;
};

export const privateToPublicOrgName = (privateName: string) => {
  if (!mainOrg) {
    return privateName;
  }

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

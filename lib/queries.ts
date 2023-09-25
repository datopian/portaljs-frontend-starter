import {
  CKAN,
  Dataset,
  Group,
  Organization,
  PackageSearchOptions,
  User,
} from "@portaljs/ckan";
import ky from "ky";

export interface CkanResponse<T> {
  help: string;
  success: boolean;
  result: T;
}

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
    orgs = orgsList.map((o) => o.name);
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

    return { ...d, organization, groups };
  });

  return { datasets: results, count: datasets.count };
}

export const getOrganization = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const privateName = publicToPrivateOrgName(name, mainOrg);

  const organization: CkanResponse<Organization> = await ky
    .get(
      `https://demo.dev.datopian.com/api/3/action/organization_show?id=${privateName}&include_datasets=${include_datasets}`
    )
    .json();

  if (include_datasets) {
    organization.result.packages.forEach((dataset: Dataset) => {
      dataset.organization.name = name;
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
  const organizationsTree: CkanResponse<
    Organization & { children: Organization[]; _name: string }
  > = await ky
    .get(
      `https://demo.dev.datopian.com/api/3/action/group_tree_section?type=organization&id=${mainOrg}`
    )
    .json();

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

export const getAllGroups = async ({
  detailed = true, // Whether to add group_show or not
}: {
  detailed: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const mainGroup = `${mainOrg}-group`;
  const groupsTree: CkanResponse<Group & { children: Group[] }> = await ky
    .get(
      `https://demo.dev.datopian.com/api/3/action/group_tree_section?type=group&id=${mainGroup}`
    )
    .json();

  let children = groupsTree.result.children;

  if (detailed) {
    children = await Promise.all(
      children.map(async (g) => {
        const groupDetails: CkanResponse<Group> = await ky
          .get(
            `https://demo.dev.datopian.com/api/3/action/group_show?id=${g.id}`
          )
          .json();

        return groupDetails.result;
      })
    );
  }

  children = children.map((c) => {
    const publicName = privateToPublicGroupName(c.name, mainGroup);
    return { ...c, name: publicName };
  });

  return children;
};

export const getGroup = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const mainGroup = `${mainOrg}-group`;
  const privateName = publicToPrivateGroupName(name, mainGroup);

  const group: CkanResponse<Group> = await ky
    .get(
      `https://demo.dev.datopian.com/api/3/action/group_show?id=${privateName}&include_datasets=${include_datasets}`
    )
    .json();

  if (include_datasets) {
    group.result.packages.forEach((dataset: Dataset) => {
      const publicOrgName = privateToPublicOrgName(
        dataset.organization.name,
        mainOrg
      );
      dataset.organization.name = publicOrgName;
    });
  }

  const publicName = privateToPublicGroupName(group.result.name, mainGroup);

  return { ...group.result, name: publicName, _name: group.result.name };
};

export const getDataset = async ({ name }: { name: string }) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const ckan = new CKAN(DMS);
  const dataset = await ckan.getDatasetDetails(name);
  return {
    ...dataset,
    organization: {
      ...dataset.organization,
      name: privateToPublicOrgName(dataset.organization.name, mainOrg),
    },
  };
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

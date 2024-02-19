import { Field, Form, Formik, useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Organization, PackageSearchOptions, Tag } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import useSWR from "swr";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";

function AutoSubmit({
  setOptions,
  options,
}: {
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
}) {
  const { values } = useFormikContext<{
    tags: string[];
    orgs: string[];
    groups: string[];
  }>();
  useEffect(() => {
    setOptions({
      ...options,
      groups: values.groups,
      tags: values.tags,
      orgs: values.orgs,
    });
  }, [values]);
  return null;
}

export default function DatasetSearchFilters({
  orgs,
  groups,
  setOptions,
  options,
}: {
  orgs: Array<Organization>;
  groups: Array<Group>;
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
}) {
  const [seeMoreOrgs, setSeeMoreOrgs] = useState(false);
  const [seeMoreGroups, setSeeMoreGroups] = useState(false);
  const { data: groupsData } = useSWR('groups', () => {
    return getAllGroups({ detailed: true });
  }, { fallbackData: groups})
  const { data: orgsData } = useSWR('orgs', () => {
    return getAllOrganizations({ detailed: true });
  }, { fallbackData: orgs })
  return (
    <Formik
      initialValues={{
        tags: [],
        orgs: [],
        groups: [],
      }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <section className="bg-white rounded-lg xl:p-8 p-4 mb-4 max-h-[400px] overflow-y-auto">
          <h1 className="font-bold pb-4">Refine by Theme</h1>
          {groupsData.slice(0, seeMoreGroups ? groupsData.length : 5).map((group) => (
            <div key={group.id}>
              <Field
                type="checkbox"
                id={group.id}
                name="groups"
                value={group.name}
              ></Field>
              <label className="ml-1.5" htmlFor={group.id}>
                {group.display_name}
              </label>
            </div>
          ))}
          {groupsData.length > 5 && (
            <button
              onClick={() => setSeeMoreGroups(!seeMoreGroups)}
              type="button"
              className="bg-gray-300 px-2 rounded text-gray-600 mt-2"
            >
              See {seeMoreGroups ? "less" : "more..."}
            </button>
          )}
        </section>
        <section className="bg-white rounded-lg xl:p-8 p-4 mb-4 max-h-[400px] overflow-y-auto">
          <h1 className="font-bold pb-4">Refine by Organization</h1>
          {orgsData.slice(0, seeMoreOrgs ? orgsData.length : 5).map((org) => (
            <div key={org.id}>
              <Field
                type="checkbox"
                id={org.id}
                name="orgs"
                value={org.name}
              ></Field>
              <label className="ml-1.5" htmlFor={org.id}>
                {org.display_name}
              </label>
            </div>
          ))}
          {orgsData.length > 5 && (
            <button
              onClick={() => setSeeMoreOrgs(!seeMoreOrgs)}
              type="button"
              className="bg-gray-300 px-2 rounded text-gray-600 mt-2"
            >
              See {seeMoreOrgs ? "less" : "more..."}
            </button>
          )}
        </section>
        <AutoSubmit options={options} setOptions={setOptions} />
      </Form>
    </Formik>
  );
}

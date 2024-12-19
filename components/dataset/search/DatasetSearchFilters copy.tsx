import { Field, Form, Formik, useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Organization, PackageSearchOptions, Tag } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import useSWR from "swr";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";
import { useTheme } from "@/components/theme/theme-provider";
import MultiCheckbox from "@/components/_shared/MultiCheckbox";

import { useSearchState } from "./SearchContext";

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
    formats: string[];
  }>();
  useEffect(() => {
    setOptions({
      ...options,
      groups: values.groups,
      tags: values.tags,
      orgs: values.orgs,
      resFormat: values.formats,
      offset: 0,
    });
  }, [values]);
  return null;
}

export default function DatasetSearchFilters({
  orgs,
  groups,
  formats,
  setOptions,
  options,
}: {
  orgs: Array<Organization>;
  groups: Array<Group>;
  formats: string[];
  options: PackageSearchOptions;
  setOptions: Dispatch<SetStateAction<PackageSearchOptions>>;
}) {
  const {
    theme: { styles },
  } = useTheme();
  const [seeMoreOrgs, setSeeMoreOrgs] = useState(false);
  const [seeMoreGroups, setSeeMoreGroups] = useState(false);
  const { data: groupsData } = useSWR(
    "groups",
    () => {
      return getAllGroups({ detailed: true });
    },
    { fallbackData: groups }
  );
  const { data: orgsData } = useSWR(
    "orgs",
    () => {
      return getAllOrganizations({ detailed: true });
    },
    { fallbackData: orgs }
  );

  const maxPerView = 5;

  return (
    <Formik
      initialValues={{
        tags: [],
        orgs: [],
        groups: [],
        formats: [],
      }}
      onSubmit={async (values) => {
        //alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <section
          className={`bg-white rounded-[10px] xl:p-8 p-4 mb-4 max-h-[400px] overflow-y-auto ${styles.shadowMd}`}
        >
          <h1 className="font-bold pb-4">Refine by Organization</h1>
          {orgsData
            .slice(0, seeMoreOrgs ? orgsData.length : maxPerView)
            .map((org) => (
              <MultiCheckbox
                name={"orgs"}
                value={org.name}
                label={org.display_name}
                key={org.id}
              />
            ))}
          {orgsData.length > maxPerView && (
            <button
              onClick={() => setSeeMoreOrgs(!seeMoreOrgs)}
              type="button"
              className="bg-[var(--dark)] hover:bg-black text-white py-[10px] px-[12px] rounded-[4px] mt-2 transition font-[600] text-[12px] leading-[15px]"
            >
              See {seeMoreOrgs ? "Less" : "More"}
            </button>
          )}
        </section>
        <section
          className={`bg-white rounded-[10px] xl:p-8 p-4 mb-4 max-h-[400px] overflow-y-auto ${styles.shadowMd}`}
        >
          <h1 className="font-bold pb-4">Refine by Theme</h1>
          {groupsData
            .slice(0, seeMoreGroups ? groupsData.length : maxPerView)
            .map((group) => (
              <MultiCheckbox
                name={"groups"}
                value={group.name}
                label={group.display_name}
                key={group.id}
              />
            ))}
          {groupsData.length > maxPerView && (
            <button
              onClick={() => setSeeMoreGroups(!seeMoreGroups)}
              type="button"
              className="bg-[var(--dark)] hover:bg-black text-white py-[10px] px-[12px] rounded-[4px] mt-2 transition font-[600] text-[12px] leading-[15px]"
            >
              See {seeMoreGroups ? "Less" : "More"}
            </button>
          )}
        </section>
        <section
          className={`bg-white rounded-[10px] xl:p-8 p-4 mb-4 max-h-[400px] overflow-y-auto ${styles.shadowMd}`}
        >
          <h1 className="font-bold pb-4">Refine by Formats</h1>
          {formats.map((format) => (
            <MultiCheckbox
              name={"formats"}
              value={format}
              label={format}
              key={format}
            />
          ))}
        </section>
        <AutoSubmit options={options} setOptions={setOptions} />
      </Form>
    </Formik>
  );
}

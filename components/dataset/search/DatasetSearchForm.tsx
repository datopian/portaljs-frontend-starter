import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { Organization, PackageSearchOptions } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import useSWR from "swr";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";
import { useTheme } from "@/components/theme/theme-provider";
import SelectCombobox from "@/components/_shared/SelectCombobox";
import { useSearchState } from "./SearchContext";

export default function DatasetSearchForm() {
  const { theme } = useTheme();
  const { setOptions, options: searchOptions, searchFacets } = useSearchState();
  const [q, setQ] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setOptions({
      query: q,
    });
    return false;
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="min-h-[70px] flex flex-col lg:flex-row bg-white pr-5 py-3 rounded-xl">
        <input
          type="text"
          placeholder="Type in keyword..."
          className="mx-4 grow py-3 border-0 placeholder:text-neutral-400 outline-0"
          name="query"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <button
          className={`font-bold text-white px-12 py-3 rounded-lg bg-accent hover:bg-cyan-500 duration-150 ${theme.styles.bgDark}`}
          type="submit"
        >
          SEARCH
        </button>
      </div>
    </form>
  );
}

{
  /*<Formik
      initialValues={{
        org: "",
        group: "",
        query: options.query || "",
      }}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const org = orgs.find((org) => org.name === values.org);
        const group = groups.find((group) => group.name === values.group);
        setOptions({
          ...options,
          groups: group ? [group.name] : [],
          orgs: org ? [org.name] : [],
          query: values.query,
        });
      }}
    >*/
}

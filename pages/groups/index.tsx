import Head from "next/head";
import MiniSearch from "minisearch";
import ListOfGroups from "../../components/groups/ListOfGroups";
import Layout from "../../components/_shared/Layout";
import { useState } from "react";
import TopBar from "../../components/_shared/TopBar";
import SearchHero from "../../components/dataset/_shared/SearchHero";
import { Group } from "@portaljs/ckan";
import { getAllGroups } from "@/lib/queries/groups";

export async function getServerSideProps() {
  const groups = await getAllGroups({ detailed: true });
  return {
    props: {
      groups,
    },
  };
}

export default function GroupsPage({ groups }): JSX.Element {
  const miniSearch = new MiniSearch({
    fields: ["description", "display_name"], // fields to index for full-text search
    storeFields: ["description", "display_name", "image_display_url", "name"], // fields to return with search results
  });
  miniSearch.addAll(groups);
  return (
    <>
      <Head>
        <title>Groups</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main miniSearch={miniSearch} groups={groups} />
    </>
  );
}

function Main({
  miniSearch,
  groups,
}: {
  miniSearch: MiniSearch<any>;
  groups: Array<Group>;
}) {
  const [searchString, setSearchString] = useState("");
  return (
    <Layout>
      <SearchHero
        title="Groups"
        searchValue={searchString}
        onChange={setSearchString}
      />
      <main className="custom-container py-8">
        <ListOfGroups
          groups={groups}
          searchString={searchString}
          miniSearch={miniSearch}
        />
      </main>
    </Layout>
  );
}

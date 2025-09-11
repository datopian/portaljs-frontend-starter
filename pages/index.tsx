import type { InferGetServerSidePropsType } from "next";
import MainSection from "../components/home/mainSection/MainSection";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";
import HeroSectionLight from "@/components/home/heroSectionLight";
import { HomePageStructuredData } from "@/components/schema/HomePageStructuredData";

export async function getServerSideProps() {
  const datasets = await searchDatasets({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
    type: "dataset"
  });
  const visualizations = await searchDatasets({
    offset: 0,
    limit: 0,
    tags: [],
    groups: [],
    orgs: [],
    type: "visualization"
  });
  const groups = await getAllGroups({ detailed: true });
  const orgs = await getAllOrganizations({ detailed: true });
  const stats = {
    datasetCount: datasets.count,
    groupCount: groups.length,
    orgCount: orgs.length,
    visualizationCount: visualizations.count
  };
  return {
    props: {
      datasets: datasets.datasets,
      groups,
      orgs,
      stats,
    },
  };
}

export default function Home({
  datasets,
  groups,
  orgs,
  stats,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <>
      <HomePageStructuredData />
      <HeroSectionLight stats={stats} />
      <MainSection groups={groups} datasets={datasets} />
    </>
  );
}

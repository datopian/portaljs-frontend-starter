import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { StatsProps } from "../components/home/heroSection/Stats";
import MainSection from "../components/home/mainSection/MainSection";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";
import HeroSectionLight from "@/components/home/heroSectionLight";
import dynamic from "next/dynamic";
//import { LineChart } from "@portaljs/components";

//const LineChart = dynamic(() => import('@portaljs/components'));

export async function getStaticProps() {
  const datasets = await searchDatasets({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
  });
  const groups = await getAllGroups({ detailed: true });
  const orgs = await getAllOrganizations({ detailed: true });
  const stats: StatsProps = {
    datasetCount: datasets.count,
    groupCount: groups.length,
    orgCount: orgs.length,
  };
  return {
    props: {
      datasets: datasets.datasets,
      groups,
      orgs,
      stats,
    },
    revalidate: 1800,
  };
}

export default function Home({
  datasets,
  groups,
  orgs,
  stats,
}: InferGetServerSidePropsType<typeof getStaticProps>): JSX.Element {
  const LineChart = dynamic(
    () => import("@portaljs/components").then((mod) => mod.LineChart),
    { ssr: false }
  );
  return (
    <>
      <Head>
        <title>Open Data Portal Demo</title>
        <meta name="description" content="Open Data Portal Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionLight stats={stats} />
      <MainSection groups={groups} datasets={datasets} />

      <div className="mt-5 custom-container">
        <LineChart
          data={
            "https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv"
          }
          xAxisTimeUnit="year"
          xAxis="Date"
          yAxis="Price"
        />
      </div>
    </>
  );
}

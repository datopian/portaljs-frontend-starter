import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { StatsProps } from "../components/home/heroSection/Stats";
import MainSection from "../components/home/mainSection/MainSection";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";
import HeroSectionLight from "@/components/home/heroSectionLight";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/theme/theme-provider";

export async function getServerSideProps() {
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
  };
}

export default function Home({
  datasets,
  groups,
  orgs,
  stats,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const LineChart = dynamic(
    () => import("@portaljs/components").then((mod) => mod.LineChart),
    { ssr: false }
  );

  const { theme } = useTheme();

  console.log(datasets);
  console.log(stats);
  return (
    <>
      <Head>
        <title>Open Data Portal Demo</title>
        <meta name="description" content="Open Data Portal Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSectionLight stats={stats} />
      <MainSection groups={groups} datasets={datasets} />

      <div className="mt-5 custom-container bg-white">
        <div className={`${theme.styles.shadowSm} p-4`}>
          <h4>
            <div
              className={`inline-block align-middle w-12 h-0.5 border border-accent`}
            />
            <span className="inline-block font-roboto text-sm text-center pl-2">
              &nbsp; MOST DOWNLOADED
            </span>
          </h4>
          <LineChart
            data={
              "https://raw.githubusercontent.com/datasets/oil-prices/main/data/wti-year.csv"
            }
            xAxisTimeUnit="year"
            xAxis="Date"
            yAxis="Price"
          />
        </div>
      </div>
    </>
  );
}

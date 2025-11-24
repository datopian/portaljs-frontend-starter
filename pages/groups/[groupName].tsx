import { GetServerSideProps } from "next";
import Head from "next/head";
import DatasetList from "../../components/_shared/DatasetList";
import ActivityStream from "../../components/_shared/ActivityStream";
import Layout from "../../components/_shared/Layout";
import Tabs from "../../components/_shared/Tabs";
import { CKAN } from "@portaljs/ckan";
import styles from "@/styles/DatasetInfo.module.scss";
import GroupNavCrumbs from "../../components/groups/individualPage/GroupNavCrumbs";
import GroupInfo from "../../components/groups/individualPage/GroupInfo";
import { getGroup } from "@/lib/queries/groups";
import { getDataset, searchDatasets } from "@/lib/queries/dataset";
import HeroSection from "@/components/_shared/HeroSection";
import { GroupIndividualPageStructuredData } from "@/components/schema/GroupIndividualPageStructuredData";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const ckan = new CKAN(DMS);
  const groupName = context.params?.groupName;
  if (!groupName) {
    return {
      notFound: true,
    };
  }
  let group = await getGroup({
    name: groupName as string,
    include_datasets: false,
  });
  let initialDatasets = null;
  if (group.package_count) {
    initialDatasets = await searchDatasets({
      fq: `groups:${group.name}`,
      offset: 0,
      limit: 10,
      type: "dataset",
      query: "",
      sort: "metadata_modified desc",
      groups: [],
      orgs: [],
      tags: [],
      resFormat: [],
    });
  }
  const activityStream = await ckan.getGroupActivityStream(group.name);
  if (!group) {
    return {
      notFound: true,
    };
  }
  group = { ...group, activity_stream: activityStream };
  return {
    props: {
      group,
      initialDatasets,
    },
  };
};

export default function GroupPage({ group, initialDatasets }): JSX.Element {
  const tabs = [
    {
      id: "datasets",
      content:  (
        //TO DO: index search by group name
        <DatasetList type="group" name={group?.groups[0]?.name+'--'+group.name} initialDatasets={initialDatasets} />
      ),
      title: "Datasets",
    },
    {
      id: "activity-stream",
    content: (
        <ActivityStream
          activities={group?.activity_stream ? group.activity_stream : []}
        />
      ),
      title: "Activity Stream",
    },
  ];

  return (
    <>
      <GroupIndividualPageStructuredData group={group} />
      {group && (
        <Layout>
          <HeroSection title={group.title} cols="6" />
          <GroupNavCrumbs
            group={{
              name: group?.name,
              title: group?.title,
            }}
          />
          <div className="grid grid-rows-datasetpage-hero mt-8">
            <section className="grid row-start-2 row-span-2 col-span-full">
              <div className="custom-container">
                {group && (
                  <main className={styles.main}>
                    <GroupInfo group={group} />
                    <div>
                      <Tabs items={tabs} />
                    </div>
                  </main>
                )}
              </div>
            </section>
          </div>
        </Layout>
      )}
    </>
  );
}

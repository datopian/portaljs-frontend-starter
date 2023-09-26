import { GetStaticProps } from "next";
import { format } from "timeago.js";
import ResourceCard from "@/components/dataset/_shared/ResourceCard";
import Layout from "@/components/_shared/Layout";
import TopBar from "@/components/_shared/TopBar";
import { Resource } from "@portaljs/ckan";
import { CKAN } from "@portaljs/ckan";
import dynamic from "next/dynamic";
import Link from "next/link";

const PdfViewer = dynamic(
  () => import("@portaljs/components").then((mod) => mod.PdfViewer),
  { ssr: false }
);

const ExcelViewer = dynamic(
  () => import("@portaljs/components").then((mod) => mod.Excel),
  { ssr: false }
);

const RawCsvViewer = dynamic(
  () => import("@portaljs/components").then((mod) => mod.FlatUiTable),
  { ssr: false }
);

const MapViewer = dynamic(
  () => import("@portaljs/components").then((mod) => mod.Map),
  { ssr: false }
);

export const getServerSideProps: GetStaticProps = async (context) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const ckan = new CKAN(DMS);
  try {
    const resourceId = context.params?.resourceId;
    if (!resourceId) {
      console.log("[!] resourceId not found");
      return {
        notFound: true,
      };
    }

    const resource = await ckan.getResourceMetadata(resourceId as string);
    if (!resource) {
      console.log("[!] Resource metadata not found");
      return {
        notFound: true,
      };
    }

    return {
      props: { resource },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

export default function ResourcePage({
  resource,
}: {
  resource: Resource;
}): JSX.Element {
  const resourceFormat = resource.format.toLowerCase();
  return (
    <>
      <Layout>
        <div className="grid grid-rows-datasetpage-hero">
          <section className="row-start-1 row-end-3 col-span-full">
            <div
              className="bg-cover h-full bg-center bg-no-repeat bg-black flex flex-col"
              style={{
                backgroundImage: "url('/images/backgrounds/SearchHero.avif')",
                marginBottom: "4rem",
              }}
            >
              <TopBar />
            </div>
          </section>
          <section className="grid row-start-2 row-span-2 col-span-full pb-16">
            <div className="custom-container bg-[#fcfcfc] lg:px-4 py-8 rounded">
              <div className="flex items-center gap-x-4 custom-container">
                <ResourceCard small resource={resource} />
                <h1 className="text-4xl truncate max-w-xs sm:max-w-sm lg:max-w-lg">
                  {resource.name}
                </h1>
              </div>
              <div className="flex gap-x-2 items-center custom-container py-2">
                <span className="font-medium text-gray-500 inline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-accent inline mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  Created: {resource.created && format(resource.created)}
                </span>
                <span className="font-medium text-gray-500 inline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-accent inline mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Updated:{" "}
                  {resource.metadata_modified &&
                    format(resource.metadata_modified)}
                </span>
                <span className="font-medium text-gray-500 inline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-accent inline mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                    />
                  </svg>
                  Size: {resource.size || "N/A"}
                </span>
              </div>
              <div className="custom-container py-4">
                <Link
                  href={resource.url}
                  className="bg-accent h-auto py-2 px-4 text-sm text-gray-800 rounded-xl font-roboto font-bold hover:bg-cyan-800 hover:text-white duration-150 flex items-center gap-1 w-fit"
                >
                  Download
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </Link>
              </div>
              <div className="custom-container py-4">
                <p className="text-stone-500">{resource.description}</p>
              </div>
              <div className="lg:px-8">
                {resourceFormat == "csv" ? (
                  <div>
                    <RawCsvViewer url={resource.url} />
                  </div>
                ) : null}
                {resourceFormat == "pdf" && (
                  <PdfViewer
                    layout={true}
                    url={resource.url}
                    parentClassName="h-[900px]"
                  />
                )}
                {["xlsx", "xls"].includes(resourceFormat) && (
                  <ExcelViewer url={resource.url} />
                )}
                {resourceFormat == "geojson" && (
                  <MapViewer
                    layers={[{ data: resource.url, name: "Geojson" }]}
                    title={resource.name}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

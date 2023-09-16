import TopBar from "../../_shared/TopBar";
import { Organizations, FindData, Groups } from "./Options";
import SearchForm from "./SearchForm";
import Stats, { StatsProps } from "./Stats";

export default function Hero({ stats }: { stats: StatsProps }) {
  return (
    <section className="sm:grid sm:grid-rows-frontpage-hero">
      <section className="row-start-1 row-span-3 col-span-full">
        <div
          className="bg-cover bg-center bg-no-repeat bg-black flex flex-col h-full"
          style={{
            backgroundImage: "url('/images/backgrounds/HomeHero.png')",
            minHeight: "95vh",
          }}
        >
          <TopBar />
          <div className="grid lg:grid-cols-2 mx-auto items-center grow custom-container">
            <div className="col-span-1">
              <h3 className="text-xs font-medium pb-2 uppercase text-gray-400 tracking-widest sm:text-base lg:text-sm xl:text-base">
                Quality Data ready to Integrate
              </h3>
              <h1 className="text-6xl font-black text-white">Find and Share</h1>
              <h1 className="text-6xl font-black text-cyan-500">
                Quality Data
              </h1>
              <h3 className="text-xl text-gray-300 py-6">
                At Portal, we have over thousands of datasets for free and a
                Premium Data Service for additional or customised data with
                guaranteed updates.
              </h3>
              <div className="sm:max-w-lg sm:text-center lg:text-left lg:mx-0">
                <SearchForm />
              </div>
              <div className="sm:max-w-lg py-4 lg:pb-12 sm:py-0">
                <Stats
                  datasetCount={stats.datasetCount}
                  orgCount={stats.orgCount}
                  groupCount={stats.groupCount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="custom-container homepage-padding grid grid-cols-1 sm:grid-cols-3 gap-6 row-start-3 row-span-2 col-span-full pt-8 sm:pt-0"
        style={{ minHeight: "300px" }}
      >
        <section className="col-span-1">
          <FindData />
        </section>
        <section className="col-span-1">
          <Groups />
        </section>
      </section>
    </section>
  );
}

import SearchForm from "./SearchForm";


import { RiBarChartLine, RiFileCopy2Line, RiFunctionLine, RiTeamLine } from "react-icons/ri";
import { Stat } from "../heroSection/Stats";

export default function HeroSectionLight({
  stats,
}: {
  stats: {
    orgCount: number;
    groupCount: number;
    datasetCount: number;
    visualizationCount: number;
  };
}) {
  return (
    <div>
      <div className="custom-container mx-auto bg-white">
        <div className="flex flex-col lg:flex-row lg:items-center py-[30px] md:py-[80px] lg:py-[140px] gap-10 lg:gap-0">
          <div className="lg:max-w-[478px]">
            <h1 className="font-black text-[40px] md:text-[55px] flex flex-col leading-[50px] md:leading-[65px]">
              <span>Find and Share</span>
              <span className="text-accent">Quality Data.</span>
            </h1>
            <p className="text-[16px] md:text-[20px] text-[var(--text-gray)] mt-[10px] mb-[30px]">
              At Portal, we have over thousands of datasets for free and a
              Premium Data Service for additional or customised data with
              guaranteed updates.
            </p>

            <SearchForm />
          </div>
          <div
            className={`lg:ml-auto lg:pr-[135px] flex lg:flex-col justify-start gap-[40px] flex-wrap `}
          >
            <Stat
              Icon={RiFileCopy2Line}
              href="/search"
              count={stats.datasetCount}
              label="Dataset"
            />
            {!!stats.visualizationCount && <Stat
              Icon={RiBarChartLine}
              href="/search?type=visualization"
              count={stats.visualizationCount}
              label="Visualization"
            />}
            <Stat
              Icon={RiFunctionLine}
              href="/groups"
              count={stats.groupCount}
              label="Group"
            />
            <Stat
              Icon={RiTeamLine}
              href="/organizations"
              count={stats.orgCount}
              label="Organization"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

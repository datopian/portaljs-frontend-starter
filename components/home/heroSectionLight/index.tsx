import Image from "next/image";
import Link from "next/link";
import SearchForm from "./SearchForm";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function HeroSectionLight({ stats }) {
  return (
    <div>
      <div className="custom-container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center py-[30px] md:py-[80px] lg:py-[140px] gap-10 lg:gap-0">
          <div className="lg:max-w-[478px]">
            <h1 className="font-black text-[40px] md:text-[55px] flex flex-col leading-[50px] md:leading-[65px]">
              <span>Find and Share</span>
              <span className="text-[var(--accent)]">Quality Data.</span>
            </h1>
            <p className="text-[16px] md:text-[20px] text-[var(--text-gray)] mt-[10px] mb-[30px]">
              At Portal, we have over thousands of datasets for free and a
              Premium Data Service for additional or customised data with
              guaranteed updates.
            </p>

            <SearchForm />
          </div>
          <div
            className={`${poppins.className} lg:ml-auto lg:pr-[135px] flex lg:flex-col justify-start gap-[40px] flex flex-wrap `}
          >
            <Link href={`/search`} className={`flex items-center gap-[20px] `}>
              <Image
                src={`/images/icons/stats-bullet.svg`}
                alt="stats-bullet"
                width={38}
                height={38}
              />
              <div className="flex flex-col gap-0">
                <span className="font-bold text-[32px] leading-[40px]">
                  {stats.datasetCount}
                </span>
                <span className="text-[16px] leading-[24px]">
                  Dataset{stats.datasetCount > 1 ? "s" : ""}
                </span>
              </div>
            </Link>
            <Link href="/groups" className="flex items-center gap-[20px]">
              <Image
                src={`/images/icons/stats-bullet.svg`}
                alt="stats-bullet"
                width={38}
                height={38}
              />
              <div className="flex flex-col gap-0">
                <span className="font-bold text-[32px] leading-[40px]">
                  {stats.groupCount}
                </span>
                <span className="text-[16px] leading-[24px]">
                  Group{stats.groupCount > 1 ? "s" : ""}
                </span>
              </div>
            </Link>
            <Link href="/organization" className="flex items-center gap-[20px]">
              <Image
                src={`/images/icons/stats-bullet.svg`}
                alt="stats-bullet"
                width={38}
                height={38}
              />
              <div className="flex flex-col gap-0">
                <span className="font-bold text-[32px] leading-[40px]">
                  {stats.orgCount}
                </span>
                <span className="text-[16px] leading-[24px]">
                  Organization{stats.orgCount > 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

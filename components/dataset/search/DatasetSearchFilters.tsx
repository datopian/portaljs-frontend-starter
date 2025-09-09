import { useState } from "react";
import MultiCheckbox from "@/components/_shared/MultiCheckbox";
import { useSearchState } from "./SearchContext";
import FacetCard from "@/components/_shared/FacetCard";
import {
  PackageFacetOptions,
  PackageSearchOptions,
} from "@/schemas/dataset.interface";
import {
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleStackIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "primereact/utils";

export default function DatasetSearchFilters() {
  const [showFilters, setShowFilters] = useState(true);
  const [seeMoreOrgs, setSeeMoreOrgs] = useState(false);
  const [seeMoreGroups, setSeeMoreGroups] = useState(false);
  const {
    searchFacets,
    options,
    setOptions,
    packageSearchResults,
    visualizationsSearchResults,
  } = useSearchState();
  const maxPerView = 6;

  return (
    <div className="flex flex-col ">
      <a
        href="#"
        className="text-xs flex items-center gap-1 lg:hidden  mb-4"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide" : "Show"} Filters
        {showFilters ? (
          <ChevronUpIcon width={14} />
        ) : (
          <ChevronDownIcon width={14} />
        )}
      </a>
      <div className={` ${showFilters ? "block" : "hidden"} lg:block`}>
        <FacetCard title="Type">
          <div className="text-[#5F5F5F] space-y-[10px]">
            <DatasetTypeOption
              title="Datasets"
              Icon={CircleStackIcon}
              type="dataset"
              count={packageSearchResults?.count}
            />
            <DatasetTypeOption
              title="Visualizations"
              Icon={ChartBarIcon}
              type="visualization"
              count={visualizationsSearchResults?.count}
            />
          </div>
        </FacetCard>

        <FacetCard
          title={
            <>
              Refine by <span className="text-accent">Organization</span>
            </>
          }
          showClear={options.orgs.length > 0}
          clearAction={() => {
            setOptions({
              orgs: [],
              offset: 0,
            });
          }}
        >
          <div>
            <div className="max-h-[400px] overflow-y-auto">
              {searchFacets.organization?.items
                ?.slice(
                  0,
                  seeMoreOrgs
                    ? searchFacets.organization?.items?.length
                    : maxPerView
                )
                .map((org: PackageFacetOptions) => (
                  <MultiCheckbox
                    name={"orgs"}
                    value={org.name}
                    label={org.display_name}
                    count={org.count}
                    key={org.name}
                  />
                ))}
            </div>

            {searchFacets.organization?.items?.length > maxPerView && (
              <button
                onClick={() => setSeeMoreOrgs(!seeMoreOrgs)}
                type="button"
                className="bg-[var(--dark)] hover:bg-black text-white py-[10px] px-[12px] rounded-[4px] mt-2 transition font-[600] text-[12px] leading-[15px]"
              >
                See {seeMoreOrgs ? "Less" : "More"}
              </button>
            )}
          </div>
        </FacetCard>
        {searchFacets.groups?.items.length > 0 && (
          <FacetCard
            title={
              <>
                Refine by <span className="text-accent">Theme</span>
              </>
            }
            showClear={options.groups.length > 0}
            clearAction={() => {
              setOptions({
                groups: [],
                offset: 0,
              });
            }}
          >
            <div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchFacets.groups?.items
                  ?.slice(
                    0,
                    seeMoreGroups
                      ? searchFacets.groups?.items?.length
                      : maxPerView
                  )
                  .map((group: PackageFacetOptions) => {
                    return (
                      <MultiCheckbox
                        name={"groups"}
                        value={group.name}
                        label={group.display_name}
                        count={group.count}
                        key={group.name}
                      />
                    );
                  })}
              </div>
              {searchFacets.groups?.items?.length > maxPerView && (
                <button
                  onClick={() => setSeeMoreGroups(!seeMoreGroups)}
                  type="button"
                  className="bg-[var(--dark)] hover:bg-black text-white py-[10px] px-[12px] rounded-[4px] mt-2 transition font-[600] text-[12px] leading-[15px]"
                >
                  See {seeMoreGroups ? "Less" : "More"}
                </button>
              )}
            </div>
          </FacetCard>
        )}
        {searchFacets.tags?.items?.length > 0 && (
          <FacetCard
            title={
              <>
                Refine by <span className="text-accent">Tags</span>
              </>
            }
            showClear={options.tags.length > 0}
            clearAction={() => {
              setOptions({
                tags: [],
                offset: 0,
              });
            }}
          >
            <div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchFacets?.tags?.items.map((tag: PackageFacetOptions) => (
                  <MultiCheckbox
                    name={"tags"}
                    value={tag.name}
                    label={tag.display_name}
                    key={tag.name}
                    count={tag.count}
                  />
                ))}
              </div>
            </div>
          </FacetCard>
        )}
        {searchFacets.res_format?.items?.length > 0 && (
          <FacetCard
            title={
              <>
                Refine by <span className="text-accent">Format</span>
              </>
            }
            showClear={options.resFormat.length > 0}
            clearAction={() => {
              setOptions({
                resFormat: [],
                offset: 0,
              });
            }}
          >
            <div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchFacets?.res_format?.items.map(
                  (format: PackageFacetOptions) => (
                    <MultiCheckbox
                      name={"resFormat"}
                      value={format.name}
                      label={format.display_name}
                      key={format.name}
                      count={format.count}
                    />
                  )
                )}
              </div>
            </div>
          </FacetCard>
        )}
      </div>
    </div>
  );
}

function DatasetTypeOption({
  Icon,
  title,
  type,
  count,
}: {
  Icon: React.FC<{ className?: string }>;
  title: string;
  type: string;
  count?: number;
}) {
  const {
    options,
    setOptions,
    packageSearchResults,
    visualizationsSearchResults,
  } = useSearchState();
  const isActive = options.type === type;

  return (
    <button
      onClick={() => {
        const hasResults = !!(
          type === "visualization"
            ? visualizationsSearchResults
            : packageSearchResults
        )?.results?.length;
        const newOptions: Partial<PackageSearchOptions> = { type, offset: 0 };
        if (!hasResults) {
          Object.assign(newOptions, {
            resFormat: [],
            tags: [],
            groups: [],
            orgs: [],
            query: ""
          });
        }
        setOptions(newOptions);
      }}
      className={classNames(
        "flex items-center justify-between w-full",
        !isActive && "opacity-50",
        "hover:opacity-100 transition-all"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={classNames("w-5 h-5", isActive && "text-accent")} />{" "}
        {title}
      </div>
      {!!count && (
        <span className="ml-auto w-[24px] h-[24px] inline-flex items-center justify-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {count}
        </span>
      )}
    </button>
  );
}

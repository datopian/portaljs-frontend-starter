import { useState } from "react";
import MultiCheckbox from "@/components/_shared/MultiCheckbox";
import { useSearchState } from "./SearchContext";
import FacetCard from "@/components/_shared/FacetCard";
import { PackageFacetOptions } from "@/schemas/dataset.interface";

export default function DatasetSearchFilters() {
  const [seeMoreOrgs, setSeeMoreOrgs] = useState(false);
  const [seeMoreGroups, setSeeMoreGroups] = useState(false);
  const { searchFacets, options, setOptions } = useSearchState();
  const maxPerView = 6;

  return (
    <div>
      <FacetCard
        title="Refine by Organization"
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
          title="Refine by Theme"
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
      {searchFacets.res_format?.items?.length > 0 && (
        <FacetCard
          title="Refine by Format"
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
  );
}

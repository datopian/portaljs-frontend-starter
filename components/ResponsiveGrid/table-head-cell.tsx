import Slider from "rc-slider";
import { sortConfigProps, useResourceData } from "./data-provider";
import { isValidDate } from "./utils";
import DateRange from "./date-range";
import { PinBoard, PinIcon } from "../icons";

export default function TableHeadCell({ col: key }) {
  const {
    data,
    filteredData,
    sortConfig,
    visibleColumns,
    pinnedColumns,
    togglePinColumn,
    setSortConfig,
    updateFilter,
  } = useResourceData();
  return (
    <th
      className={`py-2  border-0 text-left bg-accent-50  whitespace-nowrap group ${
        !visibleColumns.includes(key) ? "hidden" : ""
      } ${
        pinnedColumns.includes(key) ? "sticky left-0 z-10 bg-accent-50 " : ""
      }`}
      role="columnheader"
      scope="col"
    >
      <div className="flex justify-between text-left px-3 pb-2 gap-2">
        <div className="flex truncate">
          <button
            onClick={() =>
              setSortConfig((prev: sortConfigProps) =>
                prev?.key === key && prev.direction === "asc"
                  ? { key, direction: "desc" }
                  : { key, direction: "asc" }
              )
            }
            title={key}
            className="text-sm text-left truncate font-normal text-gray-600"
          >
            <span className="uppercase font-[600]">{key}</span>{" "}
            {sortConfig?.key === key
              ? sortConfig.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </button>
        </div>
        <PinButton col={key} />
      </div>

      <div className="border-t border-accent-100 px-3 pt-2">
        {/* Filters */}
        {typeof data[0][key] === "number" ? (
          <div className=" h-[34px] flex items-center w-full">
            <div className="w-full">
              <div className="mx-2">
                <Slider
                  range
                  min={Math.min(...data.map((row) => row[key]))}
                  max={Math.max(...data.map((row) => row[key]))}
                  defaultValue={[
                    Math.min(...data.map((row) => row[key])),
                    Math.max(...data.map((row) => row[key])),
                  ]}
                  onChange={(value) => updateFilter(key, value)}
                  aria-label={`Range filter for ${key}`}
                />
              </div>
            </div>
          </div>
        ) : isValidDate(data[0][key]) ? (
          <DateRange
            onSelect={(v: any) => {
              if (v[0] && v[1]) {
                updateFilter(key, v);
              } else {
                updateFilter(key, []);
              }
            }}
          />
        ) : (
          <>
            <input
              type="text"
              placeholder={`Filter ${filteredData?.length} records `}
              className="w-full shadow-sm  p-[5px] border-0 font-normal border-gray-200 rounded-md p-1 bg-white placeholder:font-normal placeholder:text-[14px]"
              onChange={(e) => updateFilter(key, e.target.value)}
              aria-label={`Filter  ${key}`}
            />
          </>
        )}
      </div>

      {pinnedColumns.includes(key) && (
        <span className="absolute right-[0px] h-full w-[1px] bg-gray-100 top-0"></span>
      )}
    </th>
  );
}

export const PinButton = ({ col }: { col: string }) => {
  const { pinnedColumns, togglePinColumn } = useResourceData();
  return (
    <button
      onClick={() => togglePinColumn(col)}
      className={` text-left w-fit p-1 bg-white rounded shadow group-hover:opacity-[1] transition-all ${
        !pinnedColumns.includes(col) ? "opacity-0" : ""
      }`}
      title={"Pin this column"}
      aria-label={`Pin the column ${col}`}
    >
      <PinIcon />
    </button>
  );
};

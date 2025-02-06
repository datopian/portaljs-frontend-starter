import { useEffect, useState } from "react";
import { useResourceData } from "./DataProvider";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { RiSettings2Line } from "react-icons/ri";
import { PinButton } from "./TableHeadCell";

export function SettingsDisplayButton() {
  const { toggleSettingsDropdown, isSettingsDropdownOpen } = useResourceData();
  return (
    <div className="relative inline-block mb-4">
      <button
        onClick={() => toggleSettingsDropdown()}
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        aria-haspopup="true"
        aria-expanded={isSettingsDropdownOpen}
      >
        <RiSettings2Line className="text-[20px]" />
        Settings
      </button>
    </div>
  );
}

export function SettingsDisplayPanel() {
  const {
    columns,
    isSettingsDropdownOpen,
    data,
    visibleColumns,
    toggleColumnVisibility,
    pinnedColumns,
    rowsPerPage,
    setRowsPerPage,
    setVisibleColumns,
  } = useResourceData();

  const cols = Object.keys(data[0] || {});

  const [checkAll, toggleCheckAll] = useState(
    visibleColumns.length == columns.length
  );

  const [columnSearchValue, setColumnSearchValue] = useState("");

  const searchColumn = (text) => {
    setColumnSearchValue(text);
  };

  const handleCheckAll = () => {
    const checked = !checkAll;
    toggleCheckAll(!checkAll);
    setVisibleColumns(checked ? columns : []);
  };

  useEffect(() => {
    toggleCheckAll(visibleColumns.length === columns.length ? true : false);
  }, [visibleColumns]);

  const filteredCols = cols.filter((item) =>
    item?.toLocaleLowerCase().includes(columnSearchValue?.toLowerCase())
  );

  return (
    isSettingsDropdownOpen && (
      <div
        className="  text-gray-700 text-sm flex flex-col gap-8"
        aria-label="Column visibility options"
      >
        <div>
          <div className="px-4 mb-4">
            <span className="text-gray-600 uppercase text-xs mb-2 block font-bold">
              Columns ({columns.length})
            </span>
            <div className="mt-2 grid grid-cols-1">
              <input
                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10 sm:pr-9 "
                placeholder="Search columns..."
                aria-label="Search for columns matching they keywords "
                value={columnSearchValue}
                onChange={(e) => {
                  searchColumn(e.target.value);
                }}
              />
              {columnSearchValue?.length > 0 && (
                <button
                  className="col-start-1 row-start-1 mr-1 self-center justify-self-end "
                  aria-label="Clear column search input"
                  onClick={() => setColumnSearchValue("")}
                >
                  <XMarkIcon width={24} />
                </button>
              )}
            </div>
          </div>
          {filteredCols?.length > 0 && (
            <div className="flex items-center mb-[10px] px-4">
              <input
                id={`resource-preview-column-checkall`}
                type="checkbox"
                checked={checkAll}
                onChange={() => handleCheckAll()}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    handleCheckAll();
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor={`resource-preview-column-checkall`}
                tabIndex={0}
                className={`h-5 w-5 min-w-[1.25rem] flex items-center justify-center rounded border-2 cursor-pointer ${
                  checkAll
                    ? "bg-accent border-accent text-white"
                    : "bg-white border-gray-200"
                } transition-colors`}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    handleCheckAll();
                  }
                }}
              >
                {checkAll && <CheckIcon width={16} />}
                <span className="sr-only">Check All</span>
              </label>
              <span
                onClick={() => handleCheckAll()}
                className="ml-3  text-gray-900 cursor-pointer flex gap-1 w-full"
              >
                Check All
              </span>
            </div>
          )}

          <div className="max-h-[320px] overflow-y-auto">
            {filteredCols?.length === 0 && (
              <div className="italic text-sm px-4">
                0 results found matching{" "}
                <span className="underline">{columnSearchValue}</span>
              </div>
            )}
            {filteredCols.map((column, x) => {
              const active = visibleColumns.includes(column);
              const pinned = pinnedColumns.includes(column);
              return (
                <div
                  className={`flex items-center group px-4 py-2 hover:bg-accent-100 ${
                    pinned ? "bg-accent-100 font-medium" : ""
                  }`}
                  key={column}
                >
                  <div className="flex gap-2 justify-between w-full">
                    <input
                      id={`resource-preview-column-${column}-${x}`}
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleColumnVisibility(column)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          toggleColumnVisibility(column);
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor={`resource-preview-column-${column}-${x}`}
                      tabIndex={0}
                      className={`h-5 w-5 min-w-[1.25rem] flex items-center justify-center rounded border-2 cursor-pointer ${
                        active
                          ? "bg-accent border-accent text-white"
                          : "bg-white border-gray-200"
                      } transition-colors`}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          toggleColumnVisibility(column);
                        }
                      }}
                    >
                      {active && <CheckIcon width={16} />}
                      <span className="sr-only">{column}</span>
                    </label>
                    <span
                      onClick={() => toggleColumnVisibility(column)}
                      className="ml-3 text-[#5F5F5F] cursor-pointer flex gap-1 w-full break-all"
                    >
                      {column}
                    </span>
                  </div>
                  <PinButton col={column} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="">
          <div className="px-4 ">
            <span className="text-gray-600 uppercase text-xs mb-2 block font-bold">
              Pagination
            </span>
          </div>
          <div className="flex justify-between px-4">
            <span>Rows per page</span>
            <select
              className="p-1 shadow-sm rounded"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50, 100].map((v) => (
                <option key={`o-${v}`}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  );
}

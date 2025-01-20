import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Datepicker from "react-tailwindcss-datepicker";
import { isValidDate } from "./utils";
import Papa from "papaparse";
import { MapPinIcon } from "@heroicons/react/20/solid";

interface TableProps {
  data?: Array<Record<string, any>>;
  dataUrl?: string;
}

const ResponsiveGrid: React.FC<TableProps> = ({ dataUrl }) => {
  const debounceTimeoutRef = useRef(null);
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pinnedColumns, setPinnedColumns] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    Object.keys(data[0] || {})
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const rowsPerPage = 10;

  const handleGlobalFilterChange = (e) => {
    const value = e.target.value;
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      setGlobalFilter(value);
    }, 1000);
  };

  const toggleColumnDropdown = () => {
    setIsColumnDropdownOpen((prev) => !prev);
  };

  // Update filters
  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Toggle column visibility
  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  // Pin/unpin columns
  const togglePinColumn = (column: string) => {
    setPinnedColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [column]
    );
  };

  const fetchAndParseCsv = async () => {
    try {
      const response = await fetch(dataUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const csvText = await response.text();

      Papa.parse(csvText, {
        complete: (results) => {
          setData(results.data); // Store parsed data in the state
          setVisibleColumns(Object.keys(results.data[0] || {}));
          //setLoading(false);
        },
        header: true, // If the CSV contains headers
        skipEmptyLines: true, // Skip empty lines in the CSV
      });
    } catch (err) {
      //setError(err.message); // Handle errors (e.g., network issues)
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndParseCsv();
  }, [dataUrl]);

  // Apply sorting
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    const sorted = [...data];
    sorted.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Apply global and column-specific filters
  const filteredData = sortedData.filter((row) => {
    // Apply global filter
    if (
      globalFilter &&
      !Object.values(row).some((value) => {
        console.log(value);
        return value
          ?.toString()
          .toLowerCase()
          .includes(globalFilter.toLowerCase());
      })
    ) {
      return false;
    }

    // Apply column-specific filters
    return Object.entries(filters).every(([key, value]) => {
      const cellValue = row[key];
      if (!cellValue) return true;

      if (typeof value === "string") {
        return cellValue.toString().toLowerCase().includes(value.toLowerCase());
      }

      if (Array.isArray(value) && typeof cellValue === "number") {
        const [min, max] = value;
        return cellValue >= min && cellValue <= max;
      }

      if (isValidDate(cellValue)) {
        const [start, end] = value;
        if (start && end) {
          const dateValue = new Date(cellValue).getTime();
          const oneMonthInMilliseconds = 30.44 * 24 * 60 * 60 * 1000;
          return (
            dateValue >= new Date(start).getTime() &&
            dateValue <= new Date(end).getTime() + oneMonthInMilliseconds
          );
        }
      }

      return true;
    });
  });

  // Paginate data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Columns order: pinned first
  const columns = [
    ...pinnedColumns,
    ...Object.keys(data[0] || {}).filter((col) => !pinnedColumns.includes(col)),
  ];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div>
      <div className="flex gap-4">
        {/* Global Filter */}
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="Search globally..."
            className="w-full border border-gray-300 rounded-md p-1.5"
            onChange={handleGlobalFilterChange}
            aria-label="Global filter"
          />
        </div>

        {/* Column visibility controls */}
        <div className="relative inline-block mb-4">
          <button
            onClick={toggleColumnDropdown}
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            aria-haspopup="true"
            aria-expanded={isColumnDropdownOpen}
          >
            Columns
          </button>
          {isColumnDropdownOpen && (
            <div
              className="absolute mt-2 bg-white border border-gray-300 rounded shadow z-10"
              role="menu"
              aria-label="Column visibility options"
            >
              {Object.keys(data[0] || {}).map((column) => (
                <label
                  key={column}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(column)}
                    onChange={() => toggleColumnVisibility(column)}
                    className="mr-2"
                  />
                  {column}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        {/* Table */}
        <table
          className="min-w-full table-auto border-collapse border-0"
          role="table"
        >
          <thead className="border-0 bg-accent-50">
            <tr role="row" className="border-0">
              {columns.map((key) => (
                <th
                  key={key}
                  className={`py-2 border-y border-0 text-left min-w-[140px] max-w-[250px] truncate whitespace-nowrap group ${
                    !visibleColumns.includes(key) ? "hidden" : ""
                  } ${
                    pinnedColumns.includes(key)
                      ? "sticky left-0 z-10 bg-accent-50 "
                      : ""
                  }`}
                  role="columnheader"
                  scope="col"
                >
                  <div className="flex  text-left px-3 pb-2 gap-2">
                    <button
                      onClick={() =>
                        setSortConfig((prev) =>
                          prev?.key === key && prev.direction === "asc"
                            ? { key, direction: "desc" }
                            : { key, direction: "asc" }
                        )
                      }
                      title={key}
                      className="text-sm text-left truncate font-normal"
                    >
                      <span className="uppercase font-[600]">{key}</span>{" "}
                      {sortConfig?.key === key
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : ""}
                    </button>
                    <button
                      onClick={() => togglePinColumn(key)}
                      className=" text-left w-fit opacity-0 group-hover:opacity-[1] transition-all"
                      aria-label={`Pin ${key}`}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        className=""
                        viewBox="0 0 16 16"
                        width="14"
                        height="14"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.456.734a1.75 1.75 0 012.826.504l.613 1.327a3.081 3.081 0 002.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 11-1.061 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.081 3.081 0 00-1.707-2.084l-1.327-.613a1.75 1.75 0 01-.504-2.826L4.456.734zM5.92 1.866a.25.25 0 00-.404-.072L1.794 5.516a.25.25 0 00.072.404l1.328.613A4.582 4.582 0 015.73 9.63l.584 2.454a.25.25 0 00.42.12l5.47-5.47a.25.25 0 00-.12-.42L9.63 5.73a4.581 4.581 0 01-3.098-2.537L5.92 1.866z"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="border-t border-gray-300 px-3 pt-2">
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
                          placeholder={`Filter ${filteredData.length} records `}
                          className="w-full border font-normal border-gray-300 rounded-md p-1 bg-white placeholder:font-normal placeholder:text-[14px]"
                          onChange={(e) => updateFilter(key, e.target.value)}
                          aria-label={`Filter  ${key}`}
                        />
                      </>
                    )}
                  </div>

                  {pinnedColumns.includes(key) && (
                    <span className="absolute right-[0px] h-full w-[1px] bg-gray-300 top-0"></span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} role="row">
                {columns.map((key) => (
                  <td
                    key={key}
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${
                      !visibleColumns.includes(key) ? "hidden" : ""
                    } ${
                      pinnedColumns.includes(key)
                        ? "sticky left-[-1px] bg-accent-50 z-10 font-medium"
                        : ""
                    }`}
                    role="gridcell"
                    tabIndex={0}
                    aria-label={row[key]}
                  >
                    <span className="w-fit block">{row[key]}</span>
                    {pinnedColumns.includes(key) && (
                      <span className="absolute right-[-1px] h-full w-[1px] bg-gray-300 top-0"></span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}

      <nav
        aria-label="Pagination"
        className="flex items-center justify-between border-t border-gray-200 bg-white  py-3"
        role="navigation"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <a
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="cursor-pointer relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            aria-label="Previous page"
          >
            Previous
          </a>
          <a
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="cursor-pointer relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            aria-label="Next page"
          >
            Next
          </a>
        </div>
      </nav>
    </div>
  );
};

export default ResponsiveGrid;

const DateRange = ({ onSelect }) => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
    onSelect([newValue.startDate, newValue.endDate]);
  };

  return (
    <Datepicker
      value={value}
      onChange={handleChange}
      asSingle={false} // Ensure the date picker is in range mode
      showShortcuts={false} // Optional: Show predefined date range shortcuts
      showFooter={false} // Optional: Show footer in the date picker
    />
  );
};

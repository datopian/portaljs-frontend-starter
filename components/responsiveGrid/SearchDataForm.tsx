import { useResourceData } from "./DataProvider";
import { useCallback, useRef } from "react";
import Papa from "papaparse";

export default function SearchDataForm() {
  const { handleGlobalFilterChange, dataUrl, setTableData, data } =
    useResourceData();
  const debounceTimeout = useRef(null);

  const queryData = async (value) => {
    const response = await fetch(
      `/api/search-resource-data?query=${value}&url=${dataUrl}`
    );
    if (!response.ok) {
      throw new Error(`Failed to search data`);
    }
    const filteredData = await response.json();
    setTableData(Papa.unparse(filteredData));
  };

  // Debounced version of the queryData function without lodash
  const debouncedQueryData = useCallback(
    (value) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        queryData(value);
      }, 300);
    },
    [dataUrl]
  );

  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full border border-gray-200 rounded-md p-1.5"
        onChange={(e) => debouncedQueryData(e.target.value)}
        aria-label="Global filter"
      />
    </div>
  );
}

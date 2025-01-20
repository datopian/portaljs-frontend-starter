import { useState, useMemo } from "react";
import { isValidDate } from "./utils";

// Define the types for the state
interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

interface StoreState {
  filters: Record<string, any>;
  pinnedColumns: string[];
  visibleColumns: string[];
  currentPage: number;
  globalFilter: string;
  sortConfig: SortConfig | null;
  isColumnDropdownOpen: boolean;
  rowsPerPage: number;
  data: any[];
}

const useTableStore = () => {
  const [filters, setFilters] = useState<StoreState["filters"]>({});
  const [pinnedColumns, setPinnedColumns] = useState<
    StoreState["pinnedColumns"]
  >([]);
  const [visibleColumns, setVisibleColumns] = useState<
    StoreState["visibleColumns"]
  >([]);
  const [currentPage, setCurrentPage] = useState<StoreState["currentPage"]>(1);
  const [globalFilter, setGlobalFilter] =
    useState<StoreState["globalFilter"]>("");
  const [sortConfig, setSortConfig] = useState<StoreState["sortConfig"]>(null);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] =
    useState<StoreState["isColumnDropdownOpen"]>(false);
  const [data, setData] = useState<any[]>([]); // Store the data received in the main component
  const rowsPerPage = 10;

  // Update data
  const updateData = (newData: any[]) => {
    setData(newData);
    setVisibleColumns(Object.keys(newData[0] || {}));
  };

  // Toggle column visibility dropdown
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

  // Apply sorting
  const sortedData = useMemo(() => {
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
  const filteredData = useMemo(() => {
    return sortedData.filter((row) => {
      // Apply global filter
      if (
        globalFilter &&
        !Object.values(row).some((value) => {
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
          return cellValue
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
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
  }, [sortedData, globalFilter, filters]);

  // Paginate data
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredData, currentPage]);

  // Columns order: pinned first
  const columns = [
    ...pinnedColumns,
    ...visibleColumns.filter((col) => !pinnedColumns.includes(col)),
  ];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return {
    filters,
    pinnedColumns,
    visibleColumns,
    currentPage,
    globalFilter,
    sortConfig,
    isColumnDropdownOpen,
    rowsPerPage,
    totalPages,
    columns,
    paginatedData,
    data,
    updateData, // Expose this function to update data
    toggleColumnDropdown,
    updateFilter,
    toggleColumnVisibility,
    togglePinColumn,
    setCurrentPage,
    setSortConfig,
    setGlobalFilter,
  };
};

export default useTableStore;

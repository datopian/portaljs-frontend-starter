import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { isValidDate } from "./utils";

import Papa from "papaparse";

export type sortConfigProps = {
  key: string;
  direction: "asc" | "desc";
} | null;

interface DataStateContextProps {
  dataUrl: string;
  data: any[];
  filteredData: any[];
  filters: Record<string, any>;
  pinnedColumns: string[];
  visibleColumns: string[];
  currentPage: number;
  globalFilter: string;
  sortConfig: {
    key: string;
    direction: "asc" | "desc";
  } | null;
  isSettingsDropdownOpen: boolean;
  columns: string[];
  paginatedData: any[];
  totalPages: number;
  rowsPerPage: number;
  handleGlobalFilterChange: Function;
  toggleSettingsDropdown: Function;
  updateFilter: Function;
  toggleColumnVisibility: Function;
  togglePinColumn: Function;
  setTableData: Function;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setSortConfig: Dispatch<SetStateAction<sortConfigProps>>;
  setVisibleColumns: Dispatch<SetStateAction<string[]>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
}

export const DataStateContext = createContext<DataStateContextProps | null>(
  null
);

export const useResourceData = () => useContext(DataStateContext);

export const DataStateProvider = ({
  children,
  dataUrl,
}: {
  children: React.ReactNode;
  dataUrl: string;
}) => {
  const debounceTimeoutRef = useRef(null);
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [pinnedColumns, setPinnedColumns] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    Object.keys(data[0] || {})
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<sortConfigProps>(null);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const setTableData = (stringData) => {
    const result: any = parseData(stringData);
    setData(result.data);
  };

  const handleGlobalFilterChange = (value) => {
    // const value = e.target.value;
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      setGlobalFilter(value);
    }, 1000);
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen((prev) => !prev);
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

  const parseData: any = (stringData) => {
    return Papa.parse(stringData, {
      header: true, // If the CSV contains headers
      skipEmptyLines: true, // Skip empty lines in the CSV
      dynamicTyping: true,
    });
  };
  const fetchData = async () => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const csvText = await response.text();
      const parsedData = parseData(csvText);
      setData(parsedData.data);
      setVisibleColumns(Object.keys(parsedData.data[0] || {}));
    } catch (err) {
      throw new Error(err.message);
      //setError(err.message); // Handle errors (e.g., network issues)
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const value: DataStateContextProps = {
    dataUrl,
    data,
    filteredData,
    filters,
    pinnedColumns,
    visibleColumns,
    currentPage,
    globalFilter,
    sortConfig,
    isSettingsDropdownOpen,
    columns,
    paginatedData,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    handleGlobalFilterChange,
    toggleSettingsDropdown,
    updateFilter,
    toggleColumnVisibility,
    togglePinColumn,
    setCurrentPage,
    setSortConfig,
    setVisibleColumns,
    setTableData,
  };

  return (
    <DataStateContext.Provider value={value}>
      {children}
    </DataStateContext.Provider>
  );
};

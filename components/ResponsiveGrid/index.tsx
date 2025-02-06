import React from "react";

import "rc-slider/assets/index.css";

import { DataStateProvider, useResourceData } from "./DataProvider";
import SearchDataForm from "./SearchDataForm";
import { SettingsDisplayButton, SettingsDisplayPanel } from "./SettingsDisplay";
import TablePagination from "./Pagination";
import TableData from "./Table";
import TableActions from "./TableActions";

interface TableProps {
  data?: Array<Record<string, any>>;
  dataUrl?: string;
}

const ResponsiveGrid: React.FC<TableProps> = ({}) => {
  const { isSettingsDropdownOpen } = useResourceData() || {};
  return (
    <div>
      <div className="flex gap-4">
        <SearchDataForm />
        <SettingsDisplayButton />
        <TableActions />
      </div>
      <div className="flex w-full gap-[16px] bg-white">
        {isSettingsDropdownOpen && (
          <div className="order-2 py-4 bg-accent-50 border-l border-accent-100 ml-auto min-w-[250px] max-w-[250px]">
            <SettingsDisplayPanel />
          </div>
        )}
        <TableData />
      </div>
      <div className="mt-4">
        <TablePagination />
      </div>
    </div>
  );
};

const ResponsiveGridWrapper = ({ dataUrl }: TableProps) => {
  return (
    <DataStateProvider dataUrl={dataUrl}>
      <ResponsiveGrid />
    </DataStateProvider>
  );
};

export default ResponsiveGridWrapper;

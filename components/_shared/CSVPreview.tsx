import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import {
  AllCommunityModule,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";

import Papa from "papaparse";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelApiModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

interface CsvDataGridPreviewProps {
  url: string;
}

const CsvDataGridPreview: React.FC<CsvDataGridPreviewProps> = ({ url }) => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV data from ${url}`);
        }
        const csvText = await response.text();
        console.log(csvText);
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: (result) => {
            if (result.errors.length > 0) {
              console.error("CSV Parsing Errors:", result.errors);
            }
            if (result.data.length > 0) {
              const columns = Object.keys(result.data[0]).map((key) => ({
                field: key,
                filter: true,
                sortable: true,
              }));
              setColumnDefs(columns);
              setRowData(result.data);
            }
          },
        });
        if (parsed.errors.length > 0) {
          console.error("CSV Parsing Errors:", parsed.errors);
          return;
        }

        if (parsed.data.length > 0) {
          const columns = Object.keys(parsed.data[0]).map((key) => ({
            field: key,
            filter: true,
            sortable: true,
            resizable: true,
          }));
          setColumnDefs(columns);
          setRowData(parsed.data);
        }
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
      }
    };

    fetchCsvData();
  }, [url]);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        modules={[ClientSideRowModelApiModule]} // Register required modules
        pagination={true}
        paginationPageSize={10}
        defaultColDef={{
          resizable: true,
          filter: true,
          sortable: true,
        }}
        enableAdvancedFilter={true}
        columnMenu="new"
        groupAggFiltering={true}
      />
    </div>
  );
};

export default CsvDataGridPreview;

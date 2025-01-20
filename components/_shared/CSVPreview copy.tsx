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

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import "primereact/resources/themes/nano/theme.css";

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

const OOO = () => {
  return (
    <DataTable
      value={[
        {
          id: 1,
          date: "2022-12-21",
          text: "Elit",
          number: 684,
          city: "Toronto",
          country: "India",
          language: "Hindi/English",
          status: "Active",
          value: 840.68,
          code: "CODE-6363",
        },
        {
          id: 2,
          date: "2022-03-21",
          text: "Lorem",
          number: 513,
          city: "Paris",
          country: "Italy",
          language: "Italian",
          status: "Inactive",
          value: 812.14,
          code: "CODE-6340",
        },
        {
          id: 3,
          date: "2021-05-25",
          text: "Lorem",
          number: 687,
          city: "Rome",
          country: "England",
          language: "English",
          status: "Inactive",
          value: 107.62,
          code: "CODE-1206",
        },
      ]}
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field="id" header="ID"></Column>
      <Column field="date" header="Date" filter></Column>
      <Column field="text" header="Text"></Column>
      <Column field="number" header="Number" filter></Column>
      <Column field="city" header="City"></Column>
      <Column field="city" header="City"></Column>
    </DataTable>
  );
};

export default OOO;

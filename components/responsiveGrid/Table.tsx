import { useResourceData } from "./DataProvider";
import TableColumnValue from "./TableColValue";
import TableHead from "./TableHead";

export default function TableData() {
  const { paginatedData, columns } = useResourceData();
  return (
    <div className="overflow-auto max-h-[750px] relative border-y min-h-[500px] w-full">
      {/* Table */}
      <table
        className="min-w-full table-auto border-collapse border-0 static"
        role="table"
      >
        {/* Table Head */}
        <TableHead className="sticky top-0 z-[15] border-b  shadow-sm" />
        <tbody className="divide-y divide-accent-100">
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} role="row">
              {columns.map((key, z) => (
                <TableColumnValue
                  key={`col-${z}`}
                  column={key}
                  value={row[key]}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

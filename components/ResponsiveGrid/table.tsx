import { useResourceData } from "./dataProvider";
import TableColumnValue from "./tableColValue";
import TableHead from "./tableHead";

export default function TableData() {
  const { paginatedData, columns } = useResourceData();
  return (
    <div className="overflow-auto max-h-[750px] relative border-y">
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

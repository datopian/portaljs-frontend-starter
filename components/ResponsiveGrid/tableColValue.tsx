import { useResourceData } from "./DataProvider";

export default function TableColumnValue({ column, value }) {
  const { visibleColumns, pinnedColumns } = useResourceData();
  const isVisible = visibleColumns.includes(column);
  const isPinned = pinnedColumns.includes(column);
  return (
    <td
      className={` px-3 py-4 text-sm text-gray-500   ${
        !isVisible ? "hidden" : ""
      } ${isPinned ? "sticky left-[-1px] bg-accent-50 z-10 font-medium" : ""}`}
      role="gridcell"
      tabIndex={0}
      aria-label={value}
    >
      <span className=" block max-w-[400px] w-[max-content] ">{value}</span>
      {isPinned && (
        <span className="absolute right-[-1px] h-full w-[1px] bg-gray-100 top-0"></span>
      )}
    </td>
  );
}

import { useResourceData } from "./DataProvider";

export default function SearchDataForm() {
  const { handleGlobalFilterChange } = useResourceData();

  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        placeholder="Search..."
        className="w-full border border-gray-200 rounded-md p-1.5"
        onChange={(e) => handleGlobalFilterChange(e.target.value)}
        aria-label="Global filter"
      />
    </div>
  );
}

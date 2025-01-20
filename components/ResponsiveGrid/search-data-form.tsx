import { useResourceData } from "./data-provider";

export default function SearchDataForm() {
  const { handleGlobalFilterChange } = useResourceData();
  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        placeholder="Search globally..."
        className="w-full border border-gray-200 rounded-md p-1.5"
        onChange={() => handleGlobalFilterChange}
        aria-label="Global filter"
      />
    </div>
  );
}

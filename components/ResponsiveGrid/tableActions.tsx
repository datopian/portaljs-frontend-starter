import { useResourceData } from "./DataProvider";

export default function TableActions() {
  const { dataUrl, data } = useResourceData();
  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex  gap-1">
      <div className="flex gap-1">
        <div className="relative inline-block">
          <a
            onClick={handleDownload}
            className="cursor-pointer bg-accent hover:bg-accent-600 text-white transition-all inline-flex w-full justify-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-accent "
          >
            Export
          </a>
        </div>
      </div>
    </div>
  );
}

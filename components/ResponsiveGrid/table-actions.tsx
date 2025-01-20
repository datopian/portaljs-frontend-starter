import { RiDownload2Line, RiDownloadLine } from "react-icons/ri";

export default function TableActions() {
  return (
    <div className="flex  gap-1">
      <div className="flex gap-1">
        <div className="relative inline-block">
          <button className="bg-accent hover:bg-accent-600 text-white transition-all inline-flex w-full justify-center gap-x-1.5 rounded-md px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-accent ">
            <RiDownloadLine className="text-[20px]" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

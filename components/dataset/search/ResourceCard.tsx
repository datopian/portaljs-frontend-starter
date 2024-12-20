import { Resource } from "@portaljs/ckan";

export default function ResourceCard({
  resource,
  small,
}: {
  resource?: Resource;
  small?: boolean;
}) {
  const resourceTextColors = {
    PDF: "text-[#C9EEEF]",
    CSV: "text-[#E0DBDE]",
    JSON: "text-[#DBC9EB]",
    ODS: "text-amber-400",
    XLS: "text-[#C9DAEB]",
    XLSX: "text-[#C9DAEB]",
    DOC: "text-red-300",
    SHP: "text-purple-400",
    HTML: "text-pink-300",
  };

  let textSize: string;
  const charCountBreakpoint = 5;
  if (small) {
    if (resource && resource.format.length < charCountBreakpoint) {
      textSize = "text-lg";
    } else {
      textSize = "text-xs";
    }
  } else {
    if (resource && resource.format.length < charCountBreakpoint) {
      textSize = "text-2xl";
    } else {
      textSize = "text-lg";
    }
  }

  return (
    <div className="col-span-1 md:pt-1.5 place-content-center md:place-content-start">
      <div
        className="bg-[var(--dark)] rounded-lg max-w-[90px] min-w-[60px] mx-auto md:mx-0 flex place-content-center my-auto"
        style={{ minHeight: small ? "60px" : "86px" }}
      >
        {(resource && resource.format && (
          <span
            className={`${
              resourceTextColors[
                resource.format as keyof typeof resourceTextColors
              ]
                ? resourceTextColors[
                    resource.format as keyof typeof resourceTextColors
                  ]
                : "text-gray-200"
            } font-bold ${textSize} my-auto`}
          >
            {resource.format}
          </span>
        )) || (
          <span className="font-bold text-2xl text-gray-200 my-auto">NONE</span>
        )}
      </div>
    </div>
  );
}

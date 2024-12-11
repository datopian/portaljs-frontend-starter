import { Resource } from "@portaljs/ckan";

export default function MultipleResourcesCard({
  resources,
}: {
  resources?: Resource[];
}) {
  const [firstResource, ...rest] = resources;
  return (
    <div className="col-span-1 md:pt-1.5 place-content-center md:place-content-start">
      <LayeredCard firstResource={firstResource} layers={rest} />
    </div>
  );
}

const LayeredCard = ({ firstResource, layers }) => {
  const visibleLayers = layers.slice(0, 3);
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

  return (
    <div className="relative w-20 h-20">
      <div
        className="absolute border border-white top-0 left-0 w-full h-full bg-[var(--dark)] rounded-lg shadow-lg flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <span
          className={`${
            resourceTextColors[
              firstResource.format as keyof typeof resourceTextColors
            ]
              ? resourceTextColors[
                  firstResource.format as keyof typeof resourceTextColors
                ]
              : "text-gray-200"
          } font-bold text-[20px] my-auto`}
        >
          {firstResource.format}
        </span>
      </div>
      {visibleLayers.map((_, index) => {
        const offset = (index + 2) * 6;
        return (
          <div
            key={index}
            style={{
              top: `${offset}px`,
              left: `${offset}px`,
              zIndex: 5 - index,
            }}
            className={`absolute  w-[75px] h-[75px] bg-[var(--dark)] border border-white rounded-lg shadow-lg`}
          />
        );
      })}
    </div>
  );
};

import { Resource } from "@portaljs/ckan";
import { resourceTextColors } from "./FormatsColors";

export default function MultipleResourcesCard({
  resources,
}: {
  resources?: Resource[];
}) {
  const [firstResource, ...rest] = resources;
  return (
    <div className="col-span-1 md:pt-1.5 place-content-center md:place-content-start flex items-center">
      <LayeredCard firstResource={firstResource} layers={rest} />
    </div>
  );
}

const LayeredCard = ({ firstResource, layers }) => {
  const visibleLayers = layers.slice(0, 2);

  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20  sm:mx-0 p-0.5 ">
      <div
        className="absolute  border border-white top-0 left-0 w-full h-full bg-[var(--dark)] rounded-lg shadow-lg flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <span
          className={`${
            resourceTextColors[
              firstResource?.format?.toUpperCase() as keyof typeof resourceTextColors
            ]
              ? resourceTextColors[
                  firstResource?.format?.toUpperCase() as keyof typeof resourceTextColors
                ]
              : "text-gray-200"
          } font-bold text-[12px] md:text-[15px] my-auto break-all  text-center `}
        >
          {firstResource?.format || "--"}
        </span>
      </div>
      {visibleLayers.map((_, index) => {
        //const
        const offset =
          typeof window !== "undefined"
            ? window.innerWidth < 768
              ? (index + 1) * 4
              : (index + 1) * 6
            : 0;
        return (
          <div
            key={index}
            style={{
              top: `${offset}px`,
              left: `${offset}px`,
              zIndex: 5 - index,
            }}
            className={`absolute  w-16 md:w-20 h-16 md:h-20 bg-[var(--dark)] border border-white rounded-lg shadow-lg`}
          />
        );
      })}
    </div>
  );
};

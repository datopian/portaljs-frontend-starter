import { Resource } from "@portaljs/ckan";
import { useEffect, useState } from "react";
import {
  resourceBgColors,
  resourceFormatColors,
  resourceTextColors,
} from "./FormatsColors";

import Color from "color";

export default function ResourcesBadges({
  resources,
}: {
  resources?: Resource[];
}) {
  const _unique_resources = Array.from(
    new Map(resources.map((item) => [item.format, item])).values()
  );

  const visibleResources = _unique_resources.slice(0, 3);

  return (
    <div className="flex gap-1 flex-wrap">
      {visibleResources.map((res, index) => {
        const color =
          resourceFormatColors[
            res.format?.toUpperCase() as keyof typeof resourceBgColors
          ];
        return (
          <span
            key={index}
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  ring-1 ring-inset ring-[rgba(0,0,0,0.05)]`}
            style={{
              color: Color(color).mix(Color("#000000"), 0.5).hex(),
              background: Color(color).mix(Color("#ffffff"), 0.85).hex(),
            }}
          >
            {res.format || "--"}
          </span>
        );
      })}
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

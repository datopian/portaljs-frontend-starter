import React, { useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
interface TabProps {
  items: Array<{ title: string; content: React.ReactNode; id: string }>;
}
export default function Tabs({ items }: TabProps) {
  return (
    <>
      <Tab.Group>
        <Tab.List>
          {items.map((item, index) => (
            <Tab key={item.id}>
              {({ selected }) => (
                <span
                  className={`font-semibold text-xs px-6 py-4 focus:outline-0 border-accent ${
                    selected ? "border-b-2" : ""
                  } `}
                >
                  {item.title}
                </span>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {items.map((item) => (
            <Tab.Panel
              key={item.id}
              className="flex items-center flex-wrap overflow-y-auto"
            >
              {item.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

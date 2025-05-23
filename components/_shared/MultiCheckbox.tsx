import { CheckIcon } from "@heroicons/react/20/solid";
import { useSearchState } from "../dataset/search/SearchContext";
import { useRef } from "react";

type MultiCheckboxProps = {
  name: string;
  value: string;
  label: string;
  count?: number;
};

export const MultiCheckbox = ({
  name,
  value,
  label,
  count,
}: MultiCheckboxProps) => {
  const inputRef = useRef();
  const { setOptions, options: searchOptions } = useSearchState();

  const searchOptionsField = searchOptions[name] as Array<string>;
  const active = searchOptionsField?.includes(value);

  const select = () => {
    const searchOptionsValue = [...searchOptionsField];
    const indexOfNewValue = searchOptionsValue.findIndex((v) => v == value);

    if (indexOfNewValue >= 0) {
      searchOptionsValue.splice(indexOfNewValue, 1);
    } else {
      searchOptionsValue.push(value);
    }

    setOptions({ [name]: searchOptionsValue, offset: 0 });
  };

  return (
    <div className="flex items-center mb-[10px]">
      <input
        type="checkbox"
        id={`${name}-${value}`}
        checked={active}
        onChange={select}
        className="hidden"
        ref={inputRef}
      />
      <label
        htmlFor={`${name}-${value}`}
        tabIndex={0}
        className={`h-5 w-5 min-w-[1.25rem] flex items-center justify-center rounded border-2 cursor-pointer ${
          active
            ? "bg-accent border-accent text-white"
            : "bg-white border-gray-300"
        } transition-colors`}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            select();
          }
        }}
      >
        {active && <CheckIcon width={16} />}
        <span className="sr-only">{label}</span>
      </label>
      <span
        onClick={select}
        className="ml-3 text-[#5F5F5F] cursor-pointer flex gap-1 w-full"
      >
        {label}
        {count && (
          <span className="ml-auto w-[24px] h-[24px] inline-flex items-center justify-center rounded-full bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            {count}
          </span>
        )}
      </span>
    </div>
  );
};

export default MultiCheckbox;

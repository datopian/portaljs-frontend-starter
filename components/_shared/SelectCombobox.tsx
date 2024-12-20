import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useField } from "formik";

export type SelectComboboxProps = {
  value: string;
  name: string;
};

export default function SelectCombobox({
  name = "",
  placeholder = "",
  options = [],
}: {
  name?: string;
  placeholder?: string;
  options: SelectComboboxProps[];
}) {
  const [field, , helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const [query, setQuery] = useState("");

  const handleInputChange = (query: string) => {
    setQuery(query);
  };

  const handleChange = (selectedOption: SelectComboboxProps) => {
    setValue(selectedOption?.value || ""); // Extract only the "value" property
  };

  const filteredOptions =
    query === ""
      ? options
      : options.filter((o) =>
          o.value.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox onChange={handleChange} name={name} nullable>
      <div className="relative mt-1">
        <Combobox.Input
          placeholder={placeholder}
          className="w-full rounded-md py-2 pl-3 pr-10  placeholder:text-neutral-400 outline-0"
          displayValue={(option: any) => option?.name}
          onChange={(event) => handleInputChange(event.target.value)}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredOptions.length === 0 && query != "" ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              Nothing found.
            </div>
          ) : (
            filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-[whitesmoke]" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-[var(--dark)]"
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}

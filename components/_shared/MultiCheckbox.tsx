import { CheckIcon } from "@heroicons/react/20/solid";
import { useField } from "formik";

type MultiCheckboxProps = {
  name: string;
  value: string;
  label: string;
};

export const MultiCheckbox = ({ name, value, label }: MultiCheckboxProps) => {
  const [field, , helpers] = useField({ name });

  const currentValues = Array.isArray(field.value) ? field.value : [];

  return (
    <div className="flex items-center mb-[10px]">
      <input
        type="checkbox"
        id={`${name}-${value}`}
        checked={currentValues.includes(value)}
        onChange={(e) => {
          if (e.target.checked) {
            helpers.setValue([...currentValues, value]);
          } else {
            helpers.setValue(currentValues.filter((v) => v !== value));
          }
        }}
        className="hidden"
      />
      <label
        htmlFor={`${name}-${value}`}
        className={`h-5 w-5 flex items-center justify-center rounded border-2 cursor-pointer ${
          currentValues.includes(value)
            ? "bg-black border-black text-white"
            : "bg-white border-gray-300"
        } transition-colors`}
      >
        {currentValues.includes(value) && <CheckIcon width={16} />}
      </label>
      <span
        onClick={() => {
          if (currentValues.includes(value)) {
            helpers.setValue(currentValues.filter((v) => v !== value));
          } else {
            helpers.setValue([...currentValues, value]);
          }
        }}
        className="ml-3 text-[#5F5F5F] cursor-pointer"
      >
        {label}
      </span>
    </div>
  );
};

export default MultiCheckbox;

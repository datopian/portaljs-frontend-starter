import React, { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface DropdownProps {
  options: string[];
  defaultOption: string;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultOption,
  onSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-3 bg-white md:pl-4 rounded-lg">
        <h2 className="text-[#313131] text-[14px] font-normal leading-normal">
          Sort by:
        </h2>
        <div
          className="flex gap-2 bg-[#FFFFFF] shadow-lg bg-opacity-80 min-w-[100px] px-4 h-[40px] items-center justify-center rounded-xl cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <h2 className="text-[14px] text-[#313131] leading-normal font-normal select-none">
            {defaultOption}
          </h2>
          <RiArrowDropDownLine size={25} />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg z-10 select-none">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                onSelect(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

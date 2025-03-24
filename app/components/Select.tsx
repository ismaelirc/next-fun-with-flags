"use client";

import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {useState} from "react";

type SelectProps = {
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
};

const Search = ({options, selected, setSelected}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full md:w-1/3">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="listbox-label"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-between w-full px-4 py-2 text-left border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
      >
        {selected}
        <ChevronDownIcon
          className={`size-4 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <ul
          id="listbox-label"
          className="absolute overflow-hidden w-full bg-white mt-2 rounded-lg shadow-md border-gray-300 z-10"
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left border-gray-300 hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;

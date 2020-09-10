import React from 'react';

const SelectBox = ({ options = [], onChange, value }) => (
  <div>
    <div className="relative">
      <select
        className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-indigo-500 text-base pl-3 pr-10"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.map(({ name, label }) => <option value={name}>{label}</option>)}
      </select>
      <span
        className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  </div>
);

export default SelectBox;

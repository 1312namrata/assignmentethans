


import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const farms = [
  {
    id: 1,
    name: "Martin Jones & Sons",
    fields: ["Big Field", "Calf Paddock", "Fox Lane"],
  },
  {
    id: 2,
    name: "Nice Harvest Farm",
    fields: ["Big Field", "Narrows", "Home Field"],
  },
  {
    id: 3,
    name: "Sunny Acres Ranch",
    fields: ["Small Field", "Lakeside", "East Pasture"],
  },
];

export default function TeamMemberRoleFields() {
  const [expanded, setExpanded] = useState({});
  const [checked, setChecked] = useState({});

  const toggleExpand = (farmId) => {
    setExpanded((prev) => ({ ...prev, [farmId]: !prev[farmId] }));
  };

  const toggleCheck = (farmId, field, year) => {
    const key = `${farmId}-${field}-${year}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="border border-gray-300 rounded">
      {/* Title */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-300">
        <h1 className="text-sm font-semibold text-gray-800">
          Creating a New Tenant: Assign Farms and Fields
        </h1>
      </div>

      {/* Subtitle */}
      <p className="px-3 py-2 text-sm">
        Select which Farms and Fields to assign to{" "}
        <span className="px-1 bg-purple-100 border border-purple-600 rounded cursor-pointer">
          Bayer ✎
        </span>
        , and for which Harvest Years.
      </p>

      {/* Table Header */}
      <div className="grid grid-cols-5 border-y border-gray-300 text-sm font-medium">
        {/* Farms & Fields */}
        <div className="px-2 py-2">
          Farms & Fields
          <input
            type="text"
            placeholder="Search for a Farm or Field"
            className="w-full mt-1 border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        {/* Undo / Redo / Reset */}
        <div className="flex flex-col items-start px-2 py-2 gap-1">
          <button className="text-blue-600 text-xs">↺ Undo</button>
          <button className="text-blue-600 text-xs">↻ Redo</button>
          <button className="text-red-600 text-xs">⟳ Reset</button>
        </div>

        {/* 2023 + 2024 */}
        <div className="px-2 py-2">
          {/* <div className="text-center font-semibold">2023 / 2024</div> */}
          <div className="grid grid-cols-2 text-xs mt-1">
            <span className="text-center">2023</span>
            <span className="text-center">2024</span>
          </div>
        </div>

        {/* 2025 + Ongoing */}
        <div className="px-2 py-2">
          {/* <div className="text-center font-semibold">2025 / Ongoing</div> */}
          <div className="grid grid-cols-2 text-xs mt-1">
            <span className="text-center">2025</span>
            <span className="text-center">Ongoing</span>
          </div>
        </div>

        {/* Cancel */}
        <div className="flex items-center justify-center">
          <button className="text-sm border border-gray-300 bg-white rounded px-4 py-1">
            Cancel
          </button>
        </div>
      </div>

      {/* Table Rows */}
      {farms.map((farm) => (
        <div key={farm.id} className="border-b border-gray-200">
          <div className="grid grid-cols-5 items-center">
            {/* Farm column */}
            <div
              className="flex items-center gap-2 px-2 py-2 cursor-pointer"
              onClick={() => toggleExpand(farm.id)}
            >
              {expanded[farm.id] ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
              <input type="checkbox" className="accent-blue-600 w-4 h-4" />
              <span className="font-semibold">{farm.name}</span>
            </div>

            {/* Dropdown col */}
            <div className="text-center">▼</div>

            {/* 2023 + 2024 */}
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              <input
                type="checkbox"
                checked={!!checked[`${farm.id}-ALL-2023`]}
                onChange={() => toggleCheck(farm.id, "ALL", "2023")}
                className="w-4 h-4 accent-blue-600"
              />
              <input
                type="checkbox"
                checked={!!checked[`${farm.id}-ALL-2024`]}
                onChange={() => toggleCheck(farm.id, "ALL", "2024")}
                className="w-4 h-4 accent-blue-600"
              />
            </div>

            {/* 2025 + Ongoing */}
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              <input
                type="checkbox"
                checked={!!checked[`${farm.id}-ALL-2025`]}
                onChange={() => toggleCheck(farm.id, "ALL", "2025")}
                className="w-4 h-4 accent-blue-600"
              />
              <input
                type="checkbox"
                checked={!!checked[`${farm.id}-ALL-Ongoing`]}
                onChange={() => toggleCheck(farm.id, "ALL", "Ongoing")}
                className="w-4 h-4 accent-blue-600"
              />
            </div>

            {/* Empty col for Cancel header */}
            <div />
          </div>

          {/* Field rows */}
          {expanded[farm.id] &&
            farm.fields.map((field) => (
              <div
                key={field}
                className="grid grid-cols-5 items-center border-t border-gray-100"
              >
                {/* Field col */}
                <div className="flex items-center gap-2 pl-8 py-2">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                  <span>{field}</span>
                </div>

                {/* Empty col */}
                <div />

                {/* 2023 + 2024 */}
                <div className="grid grid-cols-2 gap-4 justify-items-center">
                  <input
                    type="checkbox"
                    checked={!!checked[`${farm.id}-${field}-2023`]}
                    onChange={() => toggleCheck(farm.id, field, "2023")}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <input
                    type="checkbox"
                    checked={!!checked[`${farm.id}-${field}-2024`]}
                    onChange={() => toggleCheck(farm.id, field, "2024")}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>

                {/* 2025 + Ongoing */}
                <div className="grid grid-cols-2 gap-4 justify-items-center">
                  <input
                    type="checkbox"
                    checked={!!checked[`${farm.id}-${field}-2025`]}
                    onChange={() => toggleCheck(farm.id, field, "2025")}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <input
                    type="checkbox"
                    checked={!!checked[`${farm.id}-${field}-Ongoing`]}
                    onChange={() => toggleCheck(farm.id, field, "Ongoing")}
                    className="w-4 h-4 accent-blue-600"
                  />
                </div>

                {/* Empty col */}
                <div />
              </div>
            ))}
        </div>
      ))}

      {/* Footer buttons */}
      <div className="flex justify-end mt-4 gap-2 px-3 py-2">
        <button className="px-4 py-2 border border-gray-300 rounded text-sm bg-white">
          Previous Step
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
          Next Step
        </button>
      </div>
    </div>
  );
}


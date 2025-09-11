import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

export default function AssignFarmsAndFields() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const data = useMemo(
    () => [
      {
        farm: "Martin Jones & Sons",
        fields: ["Big Field", "Calf Paddock", "Fox Lane"],
      },
      {
        farm: "Nice Harvest Farm",
        fields: ["Big Field", "Narrows", "Home Field"],
      },
      {
        farm: "Sunny Acres Ranch",
        fields: ["Small Field", "Lakeside", "East Pasture"],
      },
    ],
    []
  );

  const years = ["2023", "2024", "2025", "Ongoing"];

  // Initialize state with all checkboxes checked and farms expanded
  const [checked, setChecked] = useState(() => {
    const initialChecked = {};
    data.forEach(group => {
      years.forEach(year => {
        initialChecked[`${group.farm}|${year}`] = true;
      });
      group.fields.forEach(field => {
        const fieldKey = `${group.farm}:${field}`;
        years.forEach(year => {
          initialChecked[`${fieldKey}|${year}`] = true;
        });
      });
    });
    return initialChecked;
  });

  const [checkedLeft, setCheckedLeft] = useState(() => {
    const initialCheckedLeft = {};
    data.forEach(group => {
      initialCheckedLeft[group.farm] = true;
      group.fields.forEach(field => {
        const fieldKey = `${group.farm}:${field}`;
        initialCheckedLeft[fieldKey] = true;
      });
    });
    return initialCheckedLeft;
  });

  const [expanded, setExpanded] = useState(() => {
    const expandedState = {};
    data.forEach(group => {
      expandedState[group.farm] = true; // Expand all farms by default
    });
    return expandedState;
  });

  const toggle = (fieldKey, year) => {
    setChecked((prev) => {
      const key = `${fieldKey}|${year}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const toggleLeft = (rowKey) => {
    setCheckedLeft((prev) => ({ ...prev, [rowKey]: !prev[rowKey] }));
  };

  const toggleExpand = (farm) => {
    setExpanded((prev) => ({ ...prev, [farm]: !prev[farm] }));
  };

  // Filtered data by search
  const filteredData = data.filter(
    (group) =>
      group.farm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.fields.some((f) =>
        f.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex flex-col h-full bg-spectrum-white2 px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-sm font-semibold">
          Creating a New Tenant: Assign Farms and Fields
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-spectrum-gray2 rounded"
        >
          Cancel
        </button>
      </div>

      <div className="border border-spectrum-gray2 rounded bg-white h-[calc(100vh-180px)] overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-spectrum-gray2">
          <input
            className="border border-spectrum-gray2 rounded px-3 py-2 w-64"
            placeholder="Search for a Farm or a Field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-3 py-2 border border-spectrum-gray2 rounded text-sm">
            Undo
          </button>
          <button className="px-3 py-2 border border-spectrum-gray2 rounded text-sm">
            Redo
          </button>
          <button
            className="px-3 py-2 border border-spectrum-gray2 rounded text-sm"
            onClick={() => {
              // reset selections
              const resetChecked = {};
              const resetCheckedLeft = {};
              data.forEach(group => {
                years.forEach(year => {
                  resetChecked[`${group.farm}|${year}`] = false;
                });
                resetCheckedLeft[group.farm] = false;
                group.fields.forEach(field => {
                  const fieldKey = `${group.farm}:${field}`;
                  years.forEach(year => {
                    resetChecked[`${fieldKey}|${year}`] = false;
                  });
                  resetCheckedLeft[fieldKey] = false;
                });
              });
              setChecked(resetChecked);
              setCheckedLeft(resetCheckedLeft);
            }}
          >
            Reset
          </button>
        </div>

        {/* Table with Years */}
        <div className="overflow-x-auto overflow-y-auto flex-1">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-center w-12"></th>
                <th className="px-3 py-2 text-left w-2/5">Farm & Field</th>
                {years.map((y) => (
                  <th key={y} className="px-3 py-2 text-center">
                    {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((group) => (
                <>
                  {/* Farm Row */}
                  <tr key={group.farm} className="border-t bg-gray-50">
                    {/* spacer column to match layout */}
                    <td className="px-3 py-2 text-center"></td>
                    <td className="px-3 py-2 font-semibold text-gray-900">
                      {/* farm name with checkbox before name and arrow after name */}
                      <input
                        type="checkbox"
                        className="mr-2 align-middle w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        checked={!!checkedLeft[group.farm]}
                        onChange={() => toggleLeft(group.farm)}
                      />
                      <span className="align-middle">{group.farm}</span>
                      <button
                        onClick={() => toggleExpand(group.farm)}
                        className="ml-2 inline-flex align-middle items-center justify-center w-5 h-5 border border-gray-300 rounded bg-white"
                        aria-label={expanded[group.farm] ? "Collapse" : "Expand"}
                      >
                        <span className="text-xs leading-none text-gray-600">
                          {expanded[group.farm] ? "▼" : "▶"}
                        </span>
                      </button>
                    </td>
                    {years.map((y) => (
                      <td
                        key={`${group.farm}|${y}`}
                        className="px-3 py-2 text-center"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          checked={!!checked[`${group.farm}|${y}`]}
                          onChange={() => toggle(`${group.farm}|${y}`, y)}
                        />
                      </td>
                    ))}
                  </tr>

                  {/* Field Rows - only show when farm is expanded */}
                  {expanded[group.farm] &&
                    group.fields.map((field, idx) => {
                      const fieldKey = `${group.farm}:${field}`;
                      const isLast = idx === group.fields.length - 1;
                      const treePrefix = isLast ? "└─" : "├─";

                      return (
                        <tr key={fieldKey} className="border-t">
                          {/* spacer column to align under first column */}
                          <td className="px-3 py-2 text-center"></td>
                          <td className="px-3 py-2 relative pl-8">
                            {/* Vertical line for non-last items */}
                            {!isLast && (
                              <span className="absolute left-3 top-0 bottom-0 border-l border-gray-300" />
                            )}
                            {/* Tree connector symbol */}
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                              {treePrefix}
                            </span>
                            {/* Move checkbox after connector, before name */}
                            <input
                              type="checkbox"
                              className="ml-4 mr-2 align-middle w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                              checked={!!checkedLeft[fieldKey]}
                              onChange={() => toggleLeft(fieldKey)}
                            />
                            {/* Field name */}
                            <span className="align-middle">{field}</span>
                          </td>
                          {years.map((y) => (
                            <td
                              key={`${fieldKey}|${y}`}
                              className="px-3 py-2 text-center"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                checked={!!checked[`${fieldKey}|${y}`]}
                                onChange={() => toggle(fieldKey, y)}
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-spectrum-gray2 rounded"
        >
          Previous Step
        </button>
        <button className="px-6 py-2 bg-primary-main text-white rounded">
          Next Step
        </button>
      </div>
    </div>
  );
}

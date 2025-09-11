
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FieldAccessAssignment() {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});
  

  // Tenant-Holding-Field structure
  const tenantGroups = [
    {
      id: 1,
      title: "Tenant 1 (A 'farm' Tenant, always one Farm)",
      holdings: [
        {
          name: "Holding 1 (Farm Name) (enforce unique)",
          fields: [
            { name: "Field 1 (Name necessarily unique)" },
            { name: "Field 2" },
            { name: "Field 3" },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Tenant 2 (A 'enterprise' tenant, multiple Farms)",
      holdings: [
        {
          name: "Holding 2 (Farm Name) (enforce unique)",
          fields: [
            { name: "Field 1 (Name necessarily unique)" },
            { name: "Field 2" },
            { name: "Field 3" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Tenant 3 (another enterprise tenant)",
      holdings: [
        {
          name: "Holding 3 (Farm Name) (enforce unique)",
          fields: [
            { name: "Field 1 (Name necessarily unique)" },
            { name: "Field 2" },
            { name: "Field 3" },
          ],
        },
      ],
    },
  ];

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (item) => {
    setSelected((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  

  // Recursive renderer for Holding → Fields
  const renderHoldings = (holdings) => {
    return holdings.map((holding, idx) => (
      <div
        key={holding.name}
        //  className={`relative flex items-center gap-2 py-2 hover:bg-spectrum-gray1 
        //   ${idx !== holding.length - 1 ? "border-b-[0.5px] border-spectrum-gray2  " : ""}`}
        // className={`relative py-1   ${
        //   idx !== holdings.length ? "border-spectrum-gray2" : ""
        // }`}
       
      >
           {/* Inner container for indentation + connectors */}
        <div className="ml-15 flex items-center relative">
          {/* Vertical line (if not last child) */}
          {idx !== holding.length && (
            <span className="absolute left-[-1.20rem]  top-1.5 bottom-1.5 border-l border-gray-400"></span>
          )}

          {/* Horizontal connector */}
          <span className="absolute left-[-1.20rem]  top-1/2 w-4 border-t border-gray-400"></span>

        <div className={" py-1 flex items-center gap-2 relative  "}>
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={!!selected[holding.name]}
            onChange={() => toggleSelect(holding.name)}
            className="accent-primary-main w-4 h-4 ml-1 "
          />
          <span>{holding.name}</span>
          </div>

          {/* Expand button if fields exist */}
          {holding.fields && (
            <button
              className="ml-auto mr-3 "
              onClick={() => toggleExpand(holding.name)}
            >
              {expanded[holding.name] ? (
                <ChevronDown className="w-4 h-4 " />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Fields */}
        {holding.fields && expanded[holding.name] && (
          <div>
            {holding.fields.map((field, i) => (
              <div
                key={field.name}
                className={`flex items-center gap-2 py-1  ${
                  i !== holding.fields.length - 1
                    ? "border-b first:border-t border-spectrum-gray2"
                    : ""
                }`}
               
              >
                 <div className="ml-23 flex items-center relative gap-2 ">
          {/* Vertical line (if not last child) */}
          {idx !== holding.fields.length && (
            <span className="absolute left-[-1.25rem]  top-0.5 bottom-0.5 border-l border-gray-400"></span>
          )}

          {/* Horizontal connector */}
          <span className="absolute left-[-1.25rem]  top-1/2 w-4 border-t border-gray-400"></span>

      

                
                <input
                  type="checkbox"
                  checked={!!selected[field.name]}
                  onChange={() => toggleSelect(field.name)}
                  className="accent-primary-main w-4 h-4 ml-1 "
                />
                <span>{field.name}</span>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="m-2 bg-spectrum-white2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-sm font-semibold text-spectrum-black mt-3 ml-3">
          Creating a New User: Field Access Assignment
        </h1>
        <button
          onClick={() => navigate("/userandteams/directory")}
          className="text-sm border border-spectrum-gray2 bg-spectrum-white rounded px-10 py-1 mt-3 mr-3"
        >
          Cancel
        </button>
      </div>

      <div className="bg-spectrum-white m-3 border border-spectrum-gray2 rounded ">
        <div className="flex">
          {/* LEFT */}
          <div className="w-1/2 p-3">
            <p className="mt-2">
              Select which Fields to allow {" "}
               <span className="px-2  text-spectrum-black bg-primary-light2 border-[0.5px] border-primary-main  rounded"
               onClick={() => navigate("/userandteams/invite")}
               >John smith✎</span>


              to access as an {" "}
              <span className="px-2  text-spectrum-black bg-primary-light2 border-[0.5px] border-primary-main  rounded"
               onClick={() => navigate("/userandteams/roleassignment")}
               >agronomist✎</span>
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-1/2 border-l border-spectrum-gray2">
            {tenantGroups.map((tenant,idx) => (
              <div
                key={tenant.id}
                className="text-sm border-b border-spectrum-gray2"
              >
                {/* Tenant Row */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-spectrum-gray2 last:border-b-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={tenant.holdings.every((h) => selected[h.name])}
                      onChange={() =>
                        tenant.holdings.forEach((h) => toggleSelect(h.name))
                      }
                      className="accent-primary-main w-4 h-4"
                    />
                    <span>{tenant.title}</span>




             
                  </div>
                  <button onClick={() => toggleExpand(tenant.id)}>
                    {expanded[tenant.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>




                </div>

                {/* Holdings & Fields */}
                {expanded[tenant.id] && <div>{renderHoldings(tenant.holdings)}</div>}
              </div>

            ))}

            {/* Buttons */}
            <div className="flex justify-end mt-4 mb-2 mr-2">
              <button
                onClick={() => navigate("/userandteams/roleassignment")}
                className="mb-2 mt-2 px-10 py-2 ml-3 text-sm border border-spectrum-gray2 bg-spectrum-white rounded"
              >
                Previous Step
              </button>
              <button
                type="submit"
                onClick={() => navigate("/userandteams/fieldaccessassignmentwithyear")}
                className="mb-2 mt-2 px-10 py-2 ml-3 text-sm bg-primary-main text-white rounded hover:bg-[#000066]"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





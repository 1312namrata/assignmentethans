import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FieldAccessAssignmentWithYear() {
  const navigate = useNavigate();
  const location = useLocation();

  const firstName = location.state?.firstName || "John Smith";

  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  // Example tenantGroups (replace with real data)
 // Tenant-Holding-Field structure
  const HarvestYear = [
    {
      id: 1,
      title: "Harvest Year 2026",
      
    },
    {
      id: 2,
      title: "Harvest Year 2025",
     
    },
    {
      id: 3,
      title: "Harvest Year 2024",
    
    },
     {
      id: 4,
      title: "Harvest Year 2023",
    
    },
     {
      id: 5,
      title: "Harvest Year 2022",
    
    },
  ];




  const toggleSelect = (role) => {
    setSelected((prev) => ({ ...prev, [role]: !prev[role] }));
  };


     
      
             
   

  return (
    <div className="m-2 bg-spectrum-white2">
      {/* Title + Cancel */}
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

      {/* Two Column Layout */}
      <div className="bg-spectrum-white m-3 border border-spectrum-gray2 rounded ">
        <div className="flex">
          {/* LEFT COLUMN */}
          <div className="w-1/2 p-3">
            <p className="mt-2">
              Select which years to allow {" "} <span
                className="px-1  text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/invite")}>john smith✎</span>
              to access as an {" "}
               <span
                className="px-1 text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/roleassignment")}
              >agronomist✎ </span>
              for {" "}
              <span
                className="px-1 text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/fieldaccessassignment")}
              > 9 selectedfields✎ </span>
            </p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-1/2 border-l-[0.5px] border-spectrum-gray2">
            {HarvestYear.map((year) => (
              <div
                key={year.id}
                className="text-sm  border-b-[0.5px] border-spectrum-gray2"
              >
                <div className="flex items-center justify-between px-3 py-2  border-b-[0.5px] border-spectrum-gray2 last:border-b-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      
                      className="accent-primary-main w-4 h-4"
                    />
                    <span>{year.title}</span>
                  </div>
                  
                
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 mb-2 mr-2">
          <button
            onClick={() => navigate("/userandteams/fieldaccessassignment")}
            className="mb-2 mt-2 px-10 py-2 ml-3 text-sm border border-spectrum-gray2 bg-spectrum-white rounded"
          >
            Previous Step
          </button>
          <button
            type="submit"
            onClick={() => navigate("/userandteams/sendinvite")}
            className="mb-2 mt-2 px-10 py-2 ml-3 text-sm bg-primary-main text-white rounded hover:bg-[#000066]"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

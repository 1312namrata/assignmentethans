
import { useEffect, useState } from "react";
import axios from 'axios';
import { ChevronDown, ChevronRight } from "lucide-react";
import {useLocation, useNavigate } from "react-router-dom";

export default function RoleAssignment() {
  const navigate = useNavigate();
   const location = useLocation();

    // Get passed name, fallback if missing
  const firstName = location.state?.firstName || "John Smith";

  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});
  const [hoveredRole, setHoveredRole] = useState(null);

  // const [roleGroups, setRoleGroups] = useState([]);




   
  const roleGroups = [
    {
      id: 1,
      title: "United Kingdom",
      roles: ["East Anglia", "South East England","South West England", "Midlands", "North Of England", "Scotland", "Wales","Northern Ireland"],
    },
    {
      id: 2,
      title: "Germany",
      roles: ["Northern Germany", "Eastern Germany","Western Germany","Southrn Germany"],
    }

  ];


  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (role) => {
    setSelected((prev) => ({ ...prev, [role]: !prev[role] }));
  };


  

 


  return (
    <div className="  bg-spectrum-white2 ">
      {/* Title + Cancel */}
       {/* Two Column Layout */}
  
      <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm font-semibold text-spectrum-black ">
            Creating a New User:Region Access
          </h1>
         <button
           onClick={() => navigate("/userandteams/directory")}
            className=" text-sm border-[1px] border-spectrum-gray2 bg-spectrum-white rounded transition px-10 py-1 mt-3 mr-3">
            Cancel
          </button>
        </div>

    

       <div className=" bg-spectrum-white m-3 border-[0.5px] border-spectrum-gray2 
                      rounded-[5px] opacity-100  ">
    
       <div className="flex">
       {/* LEFT COLUMN */}
          <div className="w-1/2 p-3">
            <p className="mt-2">
              Select which regions to allow to{" "} 
              <span className="  text-spectrum-black bg-primary-light2 border-[0.5px] border-primary-main  rounded"
               onClick={() => navigate("/userandteams/invite")}
               >{firstName} ✎</span> see
            </p>
          </div>
      
      
       {/* RIGHT COLUMN */}
    <div className="w-1/2 border-l-[0.5px] border-spectrum-gray2">
    
        {roleGroups.map((group) => (
          <div key={group.id} className=" text-sm border-b-[0.5px] border-spectrum-gray2  ">
            {/* Group Row */}
            <div className="flex items-center justify-between px-3 py-2 border-b-[0.5px] border-spectrum-gray2 last:border-b-0 ">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={group.roles.every((r) => selected[r])}
                  onChange={() => group.roles.forEach((r) => toggleSelect(r))}
                  className="accent-primary-main w-4 h-4"
                />
                <span>{group.title}</span>
              </div>
              <button onClick={() => toggleExpand(group.id)}>
                {expanded[group.id] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Expanded Children */}
            {expanded[group.id] && (
              // <div className="ml-6 border-l text-sm  pl-4">
              // <div className="ml-6 mt-1 mb-2 relative ">
                <div>
                
                {group.roles.map((role,idx) => (
                  <div
                    key={role}
                   className={`relative flex items-center gap-2 py-2 hover:bg-spectrum-gray1 
          ${idx !== group.roles.length - 1 ? "border-b-[0.5px] border-spectrum-gray2  " : ""}`}
                    // className="flex items-center gap-2 pl-6 py-1 hover:bg-spectrum-gray1 relative"
                    onMouseEnter={() => setHoveredRole(role)}
                    onMouseLeave={() => setHoveredRole(null)}
                  >
                 {/* Inner container for indentation + connectors */}
        <div className="ml-15 flex items-center relative gap-2">
          {/* Vertical line (if not last child) */}
          {idx !== group.roles.length && (
            <span className="absolute left-[-1.25rem]  top-0 bottom-0 border-l border-gray-400"></span>
          )}

          {/* Horizontal connector */}
          <span className="absolute left-[-1.25rem]  top-1/2 w-4 border-t border-gray-400"></span>


                    
                    <input
                      type="checkbox"
                      checked={!!selected[role]}
                      onChange={() => toggleSelect(role)}
                      className="accent-primary-main w-4 h-4"
                    />
                    <span>{role}</span>
                  </div>
                  </div>
                ))}
              </div>
            )}
          </div>

         ))}



 

{/* Buttons */}
      <div className=" flex justify-end mt-4 mb-2 mr-2">
        <button
          onClick={() => navigate("/userandteams/roleassignment")}
          className="mb-2 mt-2 px-10 py-1 ml-3 text-sm border-[1px] border-spectrum-gray2 bg-spectrum-white rounded"
        >
          Previous Step
        </button>
         <button
                type="submit"
                onClick={() => navigate("/userandteams/super-admin-role")}
                className="mb-2 mt-2 px-10 py-1 ml-3 text-sm bg-primary-main text-white rounded "
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






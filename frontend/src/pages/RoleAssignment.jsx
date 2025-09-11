
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




   // ✅ Fetch roles (with descriptions) from backend
  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await axios.get("192.168.1.40:8000/db/roles-can-assigin");
  //       setRoleGroups(response.data);
  //     } catch (err) {
  //       console.error("Error fetching roles", err);
  //     } 
  //   };

  //   fetchRoles();
  // }, []);

  const roleGroups = [
    {
      id: 1,
      title: "Elaniti Admin Roles (if internal user)",
      roles: ["Superadmin", "Admin"],
    },
    {
      id: 2,
      title: "Elaniti Lab Roles (if internal user)",
      roles: ["Lab Admin", "Lab Team"],
    },
    {
      id: 3,
      title: "Elaniti Data Roles (if internal user)",
      roles: ["Data Science Admin", "Data Science Team"],
    },
    {
      id: 4,
      title: "Elaniti Data Roles (if internal user)",
      roles: ["Data Science Admin", "Data Science Team"],
    },
     {
      id: 5,
      title: "Customer Roles (if external user, drop this level)",
      roles: ["Item 1", "Item 2", "Item 3"],
    },
  ];

  const roleDescriptions = {
    Superadmin: "Superadmin has full access to all system features and settings.",
    Admin: "Admin can manage users, roles, and system settings but with limited privileges.",
    "Lab Admin": "Lab Admin oversees lab-related tasks and assigns team responsibilities.",
    "Lab Team": "Lab Team members can view and manage lab projects assigned to them.",
    "Data Science Admin": "Responsible for managing data science workflows and access.",
    "Data Science Team": "Team members who perform data analysis and build models.",
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (role) => {
    setSelected((prev) => ({ ...prev, [role]: !prev[role] }));
  };


  

  const activeRole = hoveredRole || Object.keys(selected).find((r) => selected[r]);
  // const activeRoleDescription = (() => {
  //   for (let group of roleGroups) {
  //     for (let role of group.roles) {
  //       if (role.name === activeRole) {
  //         return role.description;
  //       }
  //     }
  //   }
  //   return null;
  // })();


  return (
    <div className="  bg-spectrum-white2 ">
      {/* Title + Cancel */}
       {/* Two Column Layout */}
  
      <div className="flex items-center justify-between ">
          <h1 className="text-sm font-semibold text-spectrum-black mt-3 ml-3">
            Creating a New User:Role Assignment
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
              Select which roles to assign to{" "}
              <span className="px-2  text-spectrum-black bg-primary-light2 border-[0.5px] border-primary-main  rounded"
               onClick={() => navigate("/userandteams/invite")}
               >{firstName} ✎</span>
            </p>
          </div>
      
      
       {/* RIGHT COLUMN */}
    <div className="w-1/2 border-l-[0.5px] border-spectrum-gray2 ">
      {/* <div className="border-l-[0.5px] border-spectrum-gray2 w-[500px] ml-130 "> */}
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


                     {/* Vertical line - stop at last child */}
                        {/* {idx !== group.roles.length - 1 && ( */}
                          {/* <span className="absolute left-2 top-1 bottom-1 border-l border-spectrum-gray2"></span> */}
                        {/* )} */}
               {/* Horizontal connector line */}
                    
                     {/* <span className="absolute left-2 top-1/2 w-3 border-t border-spectrum-gray2"></span> */}
                    

                    {/* Checkbox */}
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



 {/* Info Box */}
      <div className="mt-5 p-3 bg-primary-light2  text-sm ">
        {activeRole ? (
          <>
            <p className="text-primary-main font-medium">What is {activeRole}?</p>
            <p className="text-primary-main">{roleDescriptions[activeRole]}</p>
             
          </>
        ) : (
          <p className="text-gray-600 italic">
            Hover over or select a role to see its description.
          </p>
        )}
      </div>

{/* Buttons */}
      <div className=" flex justify-end mt-4 mb-2 mr-2">
        <button
          onClick={() => navigate("/userandteams/invite")}
          className="mb-2 mt-2 px-10 py-2 ml-3 text-sm border-[1px] border-spectrum-gray2 bg-spectrum-white rounded"
        >
          Previous Step
        </button>
         <button
                type="submit"
                onClick={() => navigate("/userandteams/regionaccess")}
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






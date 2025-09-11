import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Directory() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const users = [
    { name: "John Smith", email: "johnsmith@xyz.com", status: "Active, May 15, 2025", action: "view" },
    { name: "David Green", email: "davidgreen@abc.com", status: "Awaiting Approval, December 2, 2024", action: "manage" },
    { name: "Michael Brown", email: "michaelbrown@xyz.com", status: "Invited on April 20, 2025", action: "manage" },
    { name: "Emily White", email: "emilywhite@def.com", status: "Suspended, May 1, 2025", action: "view" },
    { name: "Sophia Johnson", email: "sophiaj@xyz.com", status: "Active, June 10, 2025", action: "view" },
    { name: "James Wilson", email: "jameswilson@abc.com", status: "Active, May 15, 2025", action: "manage" },
    { name: "Olivia Martínez", email: "oliviam@xyz.com", status: "Invited on March 15, 2025", action: "manage" },
    { name: "Ethan Lewis", email: "ethanlewis@xyz.com", status: "Invited on March 5, 2025", action: "manage" },
    { name: "Avery Young", email: "averyyoung@def.com", status: "Active, September 8, 2025", action: "view" },
    { name: "Matthew King", email: "matthewking@xyz.com", status: "Active, August 22, 2025", action: "view" },
   
   
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" m-2 bg-spectrum-white2">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm font-semibold text-spectrum-black mt-3 ml-3">
            User Directory
          </h1>
         <button
           onClick={() => navigate("/userandteams/invite")}
            className=" text-sm border-[1px] border-spectrum-gray2  bg-primary-main text-spectrum-white rounded px-10 py-1 mt-3 mr-3">
            Invite a New User
          </button>
        </div>
    

      {/* SEARCH */}
      <div className="mb-3 ml-3 mr-3">
        <input
          type="text"
          placeholder="Search the Directory"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-spectrum-gray2 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-spectrum-gray2 rounded ml-3 mr-3 mb-2">
        <table className="w-full text-sm text-center  ">
          <thead className="bg-gray-100  ">
            <tr>
              <th className="p-1 border-b border-r border-spectrum-gray2 font-medium ">Name</th>
              <th className="p-1 border-b border-r border-spectrum-gray2 font-medium">Email</th>
              <th className="p-2 border-b border-r border-spectrum-gray2 font-medium">Status</th>
              <th className="p-1 border-b border-r border-spectrum-gray2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody >
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-1 border-b border-r border-spectrum-gray2">{user.name}</td>
                <td className="p-1 border-b border-r border-spectrum-gray2">{user.email}</td>
                <td className="p-1 border-b border-r border-spectrum-gray2">{user.status}</td>
                <td className="p-1 border-b  border-spectrum-gray2">
                  {user.action === "view" ? (
                    <button className="border border-spectrum-gray2 px-7 py-1 rounded hover:bg-gray-100">
                      View Details
                    </button>
                  ) : (
                    <button className="border border-spectrum-gray2 px-3 py-1 rounded hover:bg-gray-100">
                      Manage Invitation
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



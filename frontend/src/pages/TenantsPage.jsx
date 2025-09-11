// import Layout from "./Layout";


import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function TenantsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const users = [
    { tenantname: "Hutchinsons", tenanttype: "Enterprise", users: "100" },
    { tenantname: "Bayer", tenanttype: "Enterprise", users: "12" },
    { tenantname: "Lines & Sons, Finches", tenanttype: "Farming", users: "6" },
    { tenantname: "Manor Farms", tenanttype: "Farming", users: "2" },
    { tenantname: "Davis Farm", tenanttype: "Farming", users: "2" },
    { tenantname: "Matt Damon Agronomy", tenanttype: "Enterprise", users: "1" },
  ];

  const filtered = users.filter(
    (u) =>
      u.tenantname.toLowerCase().includes(search.toLowerCase()) ||
      u.tenanttype.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-spectrum-white2 ">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-semibold text-spectrum-black mt-3 ml-3">
          Tenants Directory
        </h1>
        <button onClick={() => navigate('/userandteams/createtenant')} className="bg-primary-main border border-1-primary-main text-spectrum-white px-8 py-3 rounded-[6px]">
          Create a New Enterprise Tenant
        </button>
      </div>

      {/* Search */}
      <div className="mb-3 ">
        <input
          type="text"
          placeholder="Search the Directory"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-spectrum-gray2 rounded p-3 text-sm"
        />
      </div>

      {/* Table */}
      <div className="flex-1 border border-spectrum-gray2 shadow overflow-x-auto ">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-r border-spectrum-gray2 w-1/5">
                Tenant Name
              </th>
              <th className="px-4 py-2 border-b border-r border-spectrum-gray2 w-1/5">
                Tenant Type
              </th>
              <th className="px-4 py-2 border-b border-r border-spectrum-gray2 w-1/5">
                No. of Users
              </th>
              <th
                className="px-4 py-2 border-b border-spectrum-gray2 text-center"
                colSpan={2}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filtered.map((u, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b border-r border-spectrum-gray2">
                  {u.tenantname}
                </td>
                <td className="px-4 py-2 border-b border-r border-spectrum-gray2">
                  {u.tenanttype}
                </td>
                <td className="px-4 py-2 border-b border-r border-spectrum-gray2">
                  {u.users}
                </td>
                {/* Actions column spanning 2 cols */}
                <td
                  className="px-4 py-2 border-b border-spectrum-gray2 text-center"
                  colSpan={2}
                >
                  <div className="flex justify-center gap-3">
                    <button className="px-3 py-1 border border-spectrum-gray2 rounded">
                      View Farm Mapping
                    </button>
                    <button className="px-3 py-1 border border-spectrum-gray2 rounded">
                      View Users
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

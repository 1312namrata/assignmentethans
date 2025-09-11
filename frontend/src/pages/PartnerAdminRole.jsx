import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

export default function PartnerAdminRole() {
  const navigate = useNavigate();

  // Tenants data (can later come from API)
  const tenants = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Tenant ${i + 1}`,
  }));

  // Keep track of selected tenants
  const [selected, setSelected] = useState({});

  const toggleTenant = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="m-2 bg-spectrum-white2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-sm font-semibold text-spectrum-black mt-3 ml-3">
          Creating a New User: Partner Admin Role
        </h1>
        <button
          onClick={() => navigate("/userandteams/directory")}
          className="text-sm border border-spectrum-gray2 bg-spectrum-white rounded px-10 py-1 mt-3 mr-3"
        >
          Cancel
        </button>
      </div>

      {/* Content Box */}
      <div className="bg-spectrum-white m-3 border border-spectrum-gray2 rounded">
        <div className="flex">
          {/* LEFT COLUMN */}
          <div className="w-1/2 p-3">
            <p className="mt-2">
              Select which tenants {" "}
              <span
                className="px-1 text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/invite")}
              >
                
                john smith✎
              </span>{" "}
              can access as a{" "}
              <span
                className="px-1 text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/partneradminrole")}
              >
                partner admin✎
              </span>
            </p>
          </div>

          {/* RIGHT COLUMN: Tenant list */}
          <div className="w-1/2 border-l-[0.5px] border-spectrum-gray2">
            {tenants.map((tenant) => (
              <div
                key={tenant.id}
                className="flex items-center justify-between px-3 py-2 text-sm border-b-[0.5px] border-spectrum-gray2 last:border-b-0"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!selected[tenant.id]}
                    onChange={() => toggleTenant(tenant.id)}
                    className="accent-primary-main w-4 h-4"
                  />
                  <span>{tenant.title}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4 mb-2 mr-2">
          <button
            onClick={() => navigate("/userandteams/team-member-role")}
            className="mb-2 mt-2 px-10 py-2 ml-3 text-sm border border-spectrum-gray2 bg-spectrum-white rounded"
          >
            Previous Step
          </button>
          <button
            onClick={() => navigate("/userandteams/partner-team-member-role")}
            className="mb-2 mt-2 px-10 py-2 ml-3 text-sm bg-primary-main text-white rounded hover:bg-[#000066]"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

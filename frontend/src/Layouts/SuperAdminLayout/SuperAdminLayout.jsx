



import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import userlogo from "../../assets/user.png";

// Define menus
const menuTop = ["Reports Center", "Soil Function Explorer", "Sample Tracker"];
const menuBottom = [
  "Lab Workbench",
  "Data Console",
  "Users and Teams",
  "My Account",
];

export default function SuperAdminLayout() {
  const [selectedMenu, setSelectedMenu] = useState("Reports Center");

  const navigate = useNavigate();

  const handleSelect = (item) => {
    setSelectedMenu(item);

    const routeMap = {
      "Reports Center": "/reportscenter",
      "Soil Function Explorer": "/soilfunctionexplorer",
      "Sample Tracker": "/sampletracker",
      "Lab Workbench": "/labworkbench",
      "Data Console": "/dataconsole",
      "Users and Teams": "/userandteams",
      "My Account": "/myaccount",
    };

    navigate(routeMap[item]);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <div className="flex items-center w-full bg-primary-dark text-spectrum-white h-16 relative">
        {/* Left brand area spacing for sidebar width */}
        <div className="w-60 h-full flex items-center justify-center border-r border-spectrum-gray4">
          <img src={logo} alt="Logo" className="w-20" />
        </div>

        {/* Right section of topbar */}
        <div className="flex-1 flex justify-center items-center gap-4 pr-6 h-17">
          {/* Farm selector */}
          <div className="flex items-center gap-3 border border-spectrum-gray4 px-2 py-1 rounded">
            <label className="text-sm border-r text-spectrum-gray2 border-spectrum-gray4 px-6">
              Farm Name
            </label>
            <select className="text-sm rounded text-spectrum-gray2">
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>

          {/* Field selector */}
          <div className="flex items-center gap-3 border border-spectrum-gray4 px-2 py-1 rounded">
            <label className="text-sm text-spectrum-gray2 border-r border-spectrum-gray4 px-4">
              Field Name
            </label>
            <select className="text-sm rounded text-spectrum-gray2">
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>

          {/* Logos */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-20 ml-30" />
            <img
              src={userlogo}
              alt="userlogo"
              className="rounded-full scale-70 object-cover object-top w-[34px] h-[34px] bg-[#8FB2EF] border-[1px] border-spectrum-white"
            />
          </div>
        </div>
      </div>

      {/* Main area: left sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Persistent left sidebar */}
        <aside className="w-60 h-full bg-primary-dark text-spectrum-white flex flex-col justify-between border-r border-spectrum-gray4">
          <div className="border-t border-spectrum-gray4">
            {[
              "Reports Center",
              "Soil Function Explorer",
              "Sample Tracker",
            ].map((item) => (
              <div
                key={item}
                onClick={() => handleSelect(item)}
                className={`cursor-pointer px-4 py-3 border-b border-spectrum-gray4 text-sm border-l-[5px] ${
                  selectedMenu === item
                    ? "bg-spectrum-white2 text-spectrum-gray4 border-l-[#9D007B]"
                    : "border-l-transparent"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mb-4 border-t border-spectrum-gray4">
            {["Lab Workbench", "Data Console", "Users and Teams", "My Account"].map(
              (item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer px-4 py-3 border-b border-spectrum-gray4 text-sm border-l-[5px] ${
                    selectedMenu === item
                      ? "bg-spectrum-white2 text-spectrum-gray4 border-l-[#9D007B]"
                      : "border-l-transparent"
                  }`}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto p-5 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}








import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MainNavigationBar from "../components/MainNavigationBar";
import MainNavigationPanel from "../components/MainNavigationPanel";
import { Grid, GridItem } from "../components/Grid";

const menuTop = ["Reports Center", "Soil Function Explorer", "Sample Tracker"];
const menuBottom = ["Lab Workbench", "Data Console", "Users and Teams", "My Account"];

const routeMap = {
  "Reports Center": "/reportscenter",
  "Soil Function Explorer": "/soilfunctionexplorer",
  "Sample Tracker": "/sampletracker",
  "Lab Workbench": "/labworkbench",
  "Data Console": "/dataconsole",
  "Users and Teams": "/userandteams",
  "My Account": "/myaccount",
};

export default function MainLayout() {
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Reports Center");

  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 Sync selected menu with current URL
  useEffect(() => {
    const foundMenu = Object.keys(routeMap).find(
      (key) => routeMap[key] === location.pathname
    );
    if (foundMenu) {
      setSelectedMenu(foundMenu);
    }
  }, [location.pathname]);

  const handleSelect = (item) => {
    setSelectedMenu(item);
    navigate(routeMap[item]);
  };

  return (
    <div className="h-screen flex flex-col ">
      {/* Topbar */}
      <MainNavigationBar
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        selectedMenu={selectedMenu}
      />

      <Grid className="flex-1">
         <GridItem colSpan={1}>
              <MainNavigationPanel
                dropdownOpen={dropdownOpen}
                selectedMenu={selectedMenu}
                handleSelect={handleSelect}
                menuTop={menuTop}
                menuBottom={menuBottom}
              />
      
         </GridItem>
          <GridItem colSpan={5} className="overflow-auto bg-primary-light1 pt-4 pb-[14px] px-6">
                   {/* White panel */}
                   <div className="w-full min-h-full rounded border border-spectrum-gray2 bg-spectrum-white2 px-6 py-4">
                     <Outlet />
                   </div>
          </GridItem>

      </Grid>

      {/* Sidebar */}
     
      {/* Main Dashboard Content */}
      {/* <div className="flex-1 overflow-auto p-5 bg-gray-50">
        <Outlet />
      </div> */}
    </div>
  );
}

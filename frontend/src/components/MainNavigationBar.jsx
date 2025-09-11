import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../assets/logo.png";
import userlogo from "../assets/user.png";
import {Grid, GridItem } from "./Grid";

const MainNavigationBar = ({ dropdownOpen, setDropdownOpen, selectedMenu }) => {
  return (
    <div className="flex items-start w-full bg-primary-dark text-spectrum-white h-14">
      {/* Sidebar toggle + Dropdown Menu */}
      <Grid className='w-full'>
          <GridItem colSpan={1} className="flex items-center px-4">
               <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className=" bg-primary-dark flex items-center justify-between px-4 font-normal"
        >
          {dropdownOpen ? (
            <img src={logo} alt="Logo" className="w-20" />
          ) : (
            selectedMenu
          )}
          <IoMdArrowDropdown
            className={` transform transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
          </GridItem>
         
     
       {/* <GridItem colSpan={1} className="flex items-center px-4">
                <h1 className="font-semibold text-sm">
                  Users and teams 
                </h1>
              </GridItem> */}
      {/* <div className="relative h-full z-49 border-r border-spectrum-gray4"> */}
        {/* Toggle Button */}
        {/* <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-16 w-60 bg-primary-dark flex items-center justify-between px-4 font-normal"
        >
          {dropdownOpen ? (
            <img src={logo} alt="Logo" className="w-20" />
          ) : (
            selectedMenu
          )}
          <IoMdArrowDropdown
            className={`w-5 h-5 transform transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div> */}

      {/* Right section */}
      <GridItem colSpan={5} className="flex justify-end items-center ">

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
          <div className="flex items-center gap-3 border border-spectrum-gray4 px-2 py-1 rounded">
          <label className="text-sm text-spectrum-gray2 border-r border-spectrum-gray4 px-4">
            Field Name
          </label>
          <select className="text-sm rounded text-spectrum-gray2">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>

           <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-20 ml-30" />
            <img
              src={userlogo}
              alt="userlogo"
              className="rounded-full scale-70 object-cover object-top w-[34px] h-[34px] bg-[#8FB2EF] border-[1px] border-spectrum-white"
            />
          </div>
          </div>


      </GridItem>
      
      

        {/* Field selector */}
        {/* <div className="flex items-center gap-3 border border-spectrum-gray4 px-2 py-1 rounded">
          <label className="text-sm text-spectrum-gray2 border-r border-spectrum-gray4 px-4">
            Field Name
          </label>
          <select className="text-sm rounded text-spectrum-gray2">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div> */}

        {/* Logos */}
        {/* <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-20 ml-30" />
          <img
            src={userlogo}
            alt="userlogo"
            className="rounded-full scale-70 object-cover object-top w-[34px] h-[34px] bg-[#8FB2EF] border-[1px] border-spectrum-white"
          />
        </div> */}
         </Grid>
      </div>
   
  );
};

export default MainNavigationBar;

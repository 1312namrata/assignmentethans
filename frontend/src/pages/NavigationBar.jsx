import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";

import logo from '../assets/logo.png';
import userlogo from '../assets/user.png'

const menuTop = ['Directory', 'Approve Users(2)','Roles', 'Tenants', 'Farms and Field'];
const menuBottom = ['Invite a User'];

export default function NavigationBar({
  dropdownOpen,
  setDropdownOpen,
  selectedMenu,
  setSelectedMenu
}) {
  const navigate = useNavigate();
  //  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (item) => {
    setSelectedMenu(item);
    //  setMobileMenuOpen(false)
    // setDropdownOpen(false);

    const routeMap = {
      'Directory': 'directory',
      'Approve Users(2)': 'approveusers',
      'Roles': 'roles',

      'Tenants': 'tenants',
      'Farms and Field': 'farmandfield',
      'Invite a User': 'inviteuser',
      
    };

    navigate(routeMap[item]);
  };

  return (
    <div className="flex items-start w-full bg-primary-dark text-spectrum-white h-12 relative">
      {/* Dropdown Sidebar Area */}
      <div className="relative h-full z-49 border-r border-spectrum-gray4">
        {/* Toggle Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-full w-60 bg-primary-dark flex items-center justify-between px-4 font-normal "
        >
          {dropdownOpen ?  "User And Teams" : selectedMenu}
          <svg
            className={`w-4 h-4 transform transition-transform duration-300 ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
            fill="White"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu as Sidebar */}
        {dropdownOpen && (
          <div className="absolute top-12 left-0 w-60 h-[calc(100vh-3rem)] bg-primary-light2 text-spectrum-black flex flex-col justify-between  shadow-lg">
            {/* Top Menu Items */}
            <div >
              {menuTop.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer px-4 py-3 border-b border-spectrum-white2 text-sm border-l-[5px] ${
                    selectedMenu === item
                      ? 'bg-spectrum-white2 text-spectrum-gray4  border-l-[#9D007B]'
                      : 'border-l-transparent'
                  }` 
                }
                  
                >
     
                  
                  {item}
                </div>
              ))}
            </div>

            {/* Bottom Menu Items */}
            <div className="mb-4 border-t border-spectrum-white">
              {menuBottom.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer px-4 py-3 border-b border-spectrum-white2 text-sm border-l-[5px] ${
                    selectedMenu === item
                      ? 'bg-spectrum-white2 text-spectrum-gray4 border-l-[#9D007B]'
                      : 'border-l-transparent'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right section of navbar */}
      <div className="flex-1 flex justify-center items-center gap-4 ml-100 h-12">
        
        
      <div className="flex items-center space-x-2 ">
     
        <img src={logo} alt="Logo" className="w-20 ml-30 " />
        <img src= {userlogo} alt='userlogo' className=' rounded-full scale-70 object-cover object-top  w-[34px] h-[34px] bg-[#8FB2EF] border-[1px] border-spectrum-white ' />
      </div>
      
      </div>
    </div>
  );
}

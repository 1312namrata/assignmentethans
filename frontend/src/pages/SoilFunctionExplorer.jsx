import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

const Chip = ({ label, tone }) => {
  // Updated colors to match the image exactly
  const toneStyles = {
    Low: 'bg-[#E74C3C] text-white',
    Moderate: 'bg-[#F39C12] text-white',
    High: 'bg-[#27AE60] text-white',
  };
  return (
    <span className={`text-xs px-4 py-2 rounded inline-block text-center w-full ${toneStyles[tone] || ''}`}>
      {label}
    </span>
  );
};

const SoilFunctionExplorer = () => {
  return (
    <div className="flex flex-col bg-gray-100 p-4">
      {/* Filters row */}
      <div className="flex gap-3 mb-4">
        <div className="relative w-64">
          <div className="border border-gray-300 rounded h-9 flex items-center px-3 text-sm justify-between bg-white cursor-pointer">
            <span>Regions</span>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">3 selected</span>
              <span className="text-gray-500">▼</span>
            </div>
          </div>
        </div>
        <div className="relative w-64">
          <div className="border border-gray-300 rounded h-9 flex items-center px-3 text-sm justify-between bg-white cursor-pointer">
            <span>Farms / Fields</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
        <div className="relative w-64">
          <div className="border border-gray-300 rounded h-9 flex items-center px-3 text-sm justify-between bg-white cursor-pointer">
            <span>All (34 Fields)</span>
            <span className="text-gray-500">▼</span>
          </div>
        </div>
      </div>

      {/* Table with combined soil functions and region names */}
      <div className="bg-white rounded shadow">
        {/* Top header bar with merged title */}
        <div className="bg-[#CBCDD1] text-[12px] text-gray-600 text-center py-2 font-medium">
          Soil Functions
        </div>
        
        {/* Column header row */}
        <div className="flex">
          <div className="w-1/3">
            {/* Search bar moved to the black box area */}
            <div className="p-4">
              <input className="w-full h-9 border border-gray-300 rounded px-3 text-sm bg-white placeholder:text-gray-400" placeholder="Search for a Region, a Farm, or a Field" />
            </div>
          </div>
          <div className="w-2/3 grid grid-cols-6 bg-[#CBCDD1] text-[12px] font-medium text-gray-600">
            <div className="px-2 py-3 text-center">Crop<br/>Establishment<br/>Support</div>
            <div className="px-2 py-3 text-center">Nutrient<br/>Supply<br/>Efficiency</div>
            <div className="px-2 py-3 text-center">Crop Defence<br/>Capacity</div>
            <div className="px-2 py-3 text-center">Organic<br/>Matter and<br/>Biological<br/>Cycling</div>
            <div className="px-2 py-3 text-center">Soil Structural<br/>Resilience</div>
            <div className="px-2 py-3 text-center">Water<br/>Management<br/>and Supply</div>
          </div>
        </div>

        {/* Rows */}
        {["Region: East Anglia, UK", "Region: South East England, UK"].map((region, index) => (
          <div key={region} className={`flex border-t border-gray-200`}>
            <div className="w-1/3 px-4 py-3 text-sm flex items-center gap-2">
              <IoIosArrowForward className="w-3 h-3 text-gray-400" />
              {region}
            </div>
            <div className="w-2/3 grid grid-cols-6 gap-0 py-0">
              <div className="p-2"><Chip label="Low" tone="Low" /></div>
              <div className="p-2"><Chip label="High" tone="High" /></div>
              <div className="p-2"><Chip label="Moderate" tone="Moderate" /></div>
              <div className="p-2"><Chip label="Low" tone="Low" /></div>
              <div className="p-2"><Chip label="High" tone="High" /></div>
              <div className="p-2"><Chip label="Moderate" tone="Moderate" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SoilFunctionExplorer
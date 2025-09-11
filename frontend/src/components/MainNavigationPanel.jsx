import React from "react";

const MainNavigationPanel = ({ dropdownOpen, selectedMenu, handleSelect, menuTop, menuBottom }) => {
  if (!dropdownOpen) return null;

  return (
    <div className=" h-full bg-primary-dark text-spectrum-white flex flex-col justify-between border-b border-spectrum-gray4 shadow-lg">
      {/* Top Menu */}
      <div className="border-t border-spectrum-gray4">
        {menuTop.map((item) => (
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

      {/* Bottom Menu */}
      <div className="mb-4 border-t border-spectrum-gray4">
        {menuBottom.map((item) => (
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
    </div>
  );
};

export default MainNavigationPanel;

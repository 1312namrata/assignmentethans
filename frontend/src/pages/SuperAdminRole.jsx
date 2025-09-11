import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import explore from "../assets/explore.svg"

export const SuperAdminRole=()=> {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };
   const handleNext = () => {
    // Navigate to Role page
    navigate("/userandteams/admin-role");  
  };

  const handleCancel = () => {
    // Go back to previous page
    navigate(-1);
  };

  return (
    <div className="  bg-spectrum-white2 ">

        <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm font-semibold text-spectrum-black mt-1 ml-3">
            Creating a New User:Superadmin Role
          </h1>
          <button
           onClick={handleCancel}
            className=" text-sm border-[1px] border-spectrum-gray2 bg-spectrum-white rounded transition px-10 py-1 mt-3 mr-3">
            Cancel
          </button>
        </div>
       
        
          
     
        {/* Left: Form Section */}
       
           <div className="  w-[400px] ml-[24px]
                      bg-spectrum-white  border-[0.5px] border-spectrum-gray2
                      rounded-[5px] opacity-100  p-4 ">
          <p className="mt-2">
              Are you sure you would like to add {" "} 
              <span className="px-2  text-spectrum-black bg-primary-light2 border-[0.5px] border-primary-main  rounded"
               onClick={() => navigate("/userandteams/invite")}
               >john✎</span>as a 
                <span className="px-2  text-spectrum-black bg-primary-light2 border-[0.5px] border-primary-main  rounded"
               onClick={() => navigate("/userandteams/adminrole")}
               >superadmin ✎?</span>
            </p>

          <form onSubmit={handleSubmit} className="space-y-3 h-80 ">
           


            {/* Phone Number */}
            <div className="mt-15 ">
              <label className="block text-sm text-spectrum-black mb-1">
                Please re-enter your password to confirm
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*******"
                className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </form>
          
      
      </div>
      
           <button
            onClick={() => navigate("/userandteams/regionaccess")}
            className="mb-1 mt-2 px-10 py-1 ml-20 text-sm border border-spectrum-gray2 bg-spectrum-white rounded"
          >
            Previous Step
          </button>
              <button
                type="submit"
                onClick={handleNext}
                className=" mb-1 mt-2 px-10 py-1 ml-5 text-sm bg-primary-main text-white rounded hover:bg-[#000066]"
              >
                Next Step
              </button>

             

    </div>
    
  );
}
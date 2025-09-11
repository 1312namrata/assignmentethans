
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import explore from "../assets/explore.svg"
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';


export const InviteUser=()=> {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    navigate("/userandteams/roleassignment");  // put your route path here
  };

  const handleCancel = () => {
    // Go back to previous page
    navigate(-1);
  };

  return (
    <div className="  bg-spectrum-white2 ">

        <div className="flex items-center justify-between pb-6">
          <h1 className="text-sm font-semibold text-spectrum-black mt-6 ">
            Creating a New User:Basic Information
          </h1>
          <button
           onClick={handleCancel}
            className=" text-sm border border-spectrum-gray2 bg-spectrum-white rounded-[6px] transition mt-3 px-[32px] py-3 w-min-[180px] ">
            Cancel
          </button>
        </div>
       
        
          
     
        {/* Left: Form Section */}
       
           <div className="  w-[400px] 
                      bg-spectrum-white  border-[0.5px] border-spectrum-gray2
                      rounded-[5px] opacity-100  px-4 pt-6">
        

          <form onSubmit={handleSubmit} className="space-y-3 ">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-spectrum-black mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-spectrum-black mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Smith"
                  className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-spectrum-black mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johnsmith@gmail.com"
                className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div>


            <label className="block text-sm text-spectrum-black mb-1">Phone Number</label>
              <PhoneInput
              
               
                country={"in"}             
                value={formData.phone}
                // onChange={handleChange}
                 onChange={(phone) =>
      setFormData((prev) => ({ ...prev, phone }))
      }
          inputClass="!w-full !text-xs !h-7 !pl-12 !p-1 !rounded !border !border-spectrum-gray3 !bg-spectrum-white2 !text-spectrum-black focus:!ring-1 focus:!ring-blue-500 focus:!outline-none"
          buttonClass="!border-spectrum-gray3 !bg-spectrum-white2 !rounded-l !h-7"
          dropdownClass="!text-xs !bg-spectrum-white2"
          containerClass="!w-full"
        // className="w-full  text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"  
      />
    
              {/* <label className="block text-sm text-spectrum-black mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Add an international phone number field here"
                className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              /> */}
            </div>
          </form>
            <img
            src={explore}
            alt="Illustration"
            className="w-56 ml-200 mt-10 pr-6 pb-6"
             />
    
      </div>

      

              <button
                type="submit"
                onClick={handleNext}
                className="mb-2 mt-2 px-10 py-1 ml-70 text-sm bg-primary-main text-white rounded hover:bg-[#000066]"
              >
                Next Step
              </button>

               {/* Right: Illustration */}
       


   {/* <div className=" md-flex flex-1 justify-items-end mb-50"> */}
          
        
        {/* </div> */}

    </div>
    
  );
}


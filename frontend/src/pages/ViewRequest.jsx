
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {useLocation, useNavigate } from "react-router-dom";
import RequestImage from '../assets/throw_away.svg';


export default function ViewRequest() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      contactMethod: "",
      country: "",
      role:"",
      organisation:"",
      organisationType: "",
      hearAboutus:""
    });

     const [showPopup, setShowPopup] = useState(false);

 const handleReject = () => {
    setShowPopup(true);

    // hide popup and navigate after 10 sec
    setTimeout(() => {
      setShowPopup(false);
      navigate("/userandteams/approve-users"); // change to your route
    }, 5000);
  };

  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Submitted:", formData);
    };
   



  return (
    <div className=" m-2 bg-spectrum-white2 ">
      {/* Title + Cancel */}
       {/* Two Column Layout */}
  
      <div className="flex items-center justify-between mb-2">
          <h1 className="text-sm font-semibold text-spectrum-black mt-3 ml-3">
            User Profile
          </h1>
         <button
           onClick={() => navigate("/userandteams/directory")}
            className=" text-sm border-[1px] border-spectrum-gray2 bg-spectrum-white rounded transition px-10 py-1 mt-3 mr-3">
           Back
          </button>
        </div>

    

       <div className=" bg-spectrum-white m-3 border-[0.5px] border-spectrum-gray2 
                      rounded-[5px] opacity-100  ">
    
       <div className="flex">
       {/* LEFT COLUMN */}
          <div className="w-1/2 p-3">
           <form onSubmit={handleSubmit} className="space-y-3 ">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-spectrum-black mb-1">
                  First Name
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
            <div className="mt-4">
              <label className="block text-sm text-spectrum-black mb-1">
                Email
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
            <div className="mt-4">
              <label className="block text-sm text-spectrum-black mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Add an international phone number field here"
                className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div >
                <label className="block text-sm text-spectrum-black mb-1">
                  Preferred Contact Method
                </label>
                <input
                  type="text"
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  placeholder="phone"
                  className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div >
                <label className="block text-sm text-spectrum-black mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Germany"
                  className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
             <div className="mt-4">
              <label className="block text-sm text-spectrum-black mb-1">
                Role
              </label>
              <input
                
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Agriculture Products Distibution Professional"
                className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm text-spectrum-black mb-1">
                  Organisation
                </label>
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  placeholder="Bayer CropScience"
                  className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-spectrum-black mb-1">
                  Organisation Type
                </label>
                <input
                  type="text"
                  name="organisationType"
                  value={formData.organisationType}
                  onChange={handleChange}
                  placeholder="Agribusiness"
                  className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

          </form>



           
          </div>
      
      
       {/* RIGHT COLUMN */}
    <div className="w-1/2 p-3 border-l-[0.5px] border-spectrum-gray2">

        <div>
                <label className="block text-sm text-spectrum-black mb-1">
                  How did they hear about us
                </label>
                <input
                  type="text"
                  name="hearAboutus"
                  value={formData.hearAboutus}
                  onChange={handleChange}
                  placeholder="Word of mouth"
                  className="w-full border border-spectrum-gray3 text-spectrum-black bg-spectrum-white2 rounded p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

    </div>    

    {/* Buttons */}
         
    
    </div>
   </div>
     <div className=" flex justify-end mt-4 mb-2 mr-10">
        <button
         onClick={handleReject}
          className="mb-2 mt-2 px-10 py-1 ml-3 text-sm border-[1px] text-spectrum-white bg-secondary-main border-secondary-main rounded"
        >
          Reject Request
        </button>

           {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* BACKDROP */}
            <div className="absolute inset-0 bg-black opacity-70"></div>
        
            {/* POPUP CARD */}
            <div className="relative bg-white  rounded-lg shadow-lg  w-[700px] h-[350px] flex flex-col items-center justify-center">
              <button className="bg-secondary-main text-spectrum-white border-spectrum-black px-15 py-3 rounded mb-4">
                Request Rejected
              </button>
              <img
                src={RequestImage}
                alt="Success"
                className="w-90 h-50 ml-60 mt-2"
              />
            </div>
          </div>
        )}
        
         <button
                type="submit"
                onClick={() => navigate("/userandteams/invite")}
                className="mb-2 mt-2 px-8 py-1 ml-3 text-sm bg-green-700 text-spectrum-white rounded "
              >
                Proceed to invitation
              </button>
      </div> 

   </div>
  );
}






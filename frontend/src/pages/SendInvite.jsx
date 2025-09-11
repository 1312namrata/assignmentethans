

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SuccessImage from '../assets/send.svg'

export  function SendInvite() {

  const navigate = useNavigate();

  const [toEmail, setToEmail] = useState("johnsmith@gmail.com");
  const [ccEmail, setCcEmail] = useState("inviteuser@gmail.com");
  const [subject, setSubject] = useState("Welcome To Elaniti");
  const [message, setMessage] = useState( );
   const [showPopup, setShowPopup] = useState(false);

     const handleSend = () => {
    setShowPopup(true);

    // hide popup and navigate after 10 sec
    setTimeout(() => {
      setShowPopup(false);
      navigate("/userandteams/directory"); // change to your route
    }, 5000);
  };

  return (
    <div className="m-2 bg-spectrum-white2 ">
      
        {/* ... all form fields here ... */}
      {/* Title + Cancel */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-sm font-semibold text-spectrum-black mt-3 ml-3">
          Creating a New User: Field Access Assignment
        </h1>
        <button
          onClick={() => navigate("/userandteams/directory")}
          className="text-sm border border-spectrum-gray2 bg-spectrum-white rounded px-10 py-1 mt-3 mr-3"
        >
          Cancel
        </button>
      </div>

    <div className="bg-spectrum-white m-3 border border-spectrum-gray2 rounded  ">
        <div className="flex">
         {/* LEFT SIDE SUMMARY */} 
      <div className="w-1/2 p-3">
        
        <p className="mt-2">
          Inviting {" "}<span className="px-2  text-spectrum-black bg-primary-light2 border-[0.5px] border-primary-main  rounded"
               onClick={() => navigate("/userandteams/invite")}
               >John smith✎</span>
          as an{" "} <span
                className="px-1 text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/roleassignment")}
              >agronomist✎ </span>
          for {" "}<span
                className="px-1 text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/fieldaccessassignment")}
              > 9selectedfields✎ </span>
          for {" "}<span
                className="px-1 text-spectrum-black bg-primary-light2 border border-primary-main rounded cursor-pointer"
                onClick={() => navigate("/userandteams/fieldaccessassignmentwithyear")}
              > 2022, 2023 and 2026✎ </span>
          </p>
        </div>

        {/* RIGHT SIDE EMAIL EDITOR */}
        <div className="w-1/2 border-l-[0.5px] border-spectrum-gray2">
          <div className="space-y-3 m-3 ">
            {/* To */}
            <div className="w-full  border border-spectrum-gray2 text-xs py-1 rounded">
               <label className=" text-gray-500  ml-3 mr-12 "> To </label>
              <input

                className="border-l border-spectrum-gray2  pl-2"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />
            </div>

            {/* Cc */}
            <div className="w-full border border-spectrum-gray2 text-xs py-1 rounded">
              <label className=" text-gray-500  ml-3 mr-12">Cc</label>
              <input
              
                // className="w-full border border-spectrum-gray2 rounded px-2 py-1 text-gray-700"
                 className="border-l  border-spectrum-gray2 pl-2"
                value={ccEmail}
                onChange={(e) => setCcEmail(e.target.value)}
              />
               

            </div>

            {/* Subject */}
            <div className="w-full border border-spectrum-gray2 text-xs py-1 rounded">
              <label className=" text-gray-500 ml-3 mr-5 ">Subject</label>
              <input
                // className="w-full border border-spectrum-gray2 rounded px-2 py-1 text-gray-700"
                 className="border-l border-spectrum-gray2 pl-2 "
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Body */}
            {/* <div>
              {/* <label className="block text-gray-500 text-xs mb-1">Message</label> */}
              {/* <textarea
                rows={10}
                className="w-full border border-spectrum-gray2 rounded px-2 py-2 text-gray-700 "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
               <button className="mb-2 mt-2 px-10 py-2 ml-3 text-sm bg-primary-main text-spectrum-white rounded "> Join SoilSawant</button>
            </div>  */}

             {/* Body */}
            <div className="border border-gray-200 rounded p-3 leading-relaxed text-xs">
              <p>Hi John,</p>
              <p className="mt-2">
                You’ve been invited by Utkarsh Vaidya to join the SoilSavant –
                the soil intelligence platform powered by Elaniti.
              </p>
              <p className="mt-2">
                SoilSavant provides decision support tools to help you
                understand and enhance the function of your soils, with data
                visualisation, agronomic insights, and secure sample tracking.
              </p>
              <p className="mt-2">To get started:</p>
              <ol className="list-decimal list-inside ml-2">
                <li>Click the link below to create your account.</li>
                <li>
                  Follow the prompts to log in and explore your dashboard.
                </li>
              </ol>

              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
                Join SoilSavant
              </button>

              <p className="mt-2 text-xs">
                If you have any questions or need assistance, just reply to this
                email.
              </p>

              <p className="mt-2 text-xs">Best regards,<br/>Scott Jarrett<br/>CEO, Elaniti</p>
            </div>
          </div>
        </div>
      </div>

     
       {/* Buttons */}
        <div className="flex justify-end mt-2 mb-2 mr-2">
          <button
            onClick={() => navigate("/userandteams/fieldaccessassignmentwithyear")}
            
            className="mb-1 mt-1 px-10 py-2 ml-3 text-sm border border-spectrum-gray2 bg-spectrum-white rounded"
          >
            Previous Step
          </button>
          <button
            type="submit"
            onClick={handleSend}
           className="mb-1 mt-1 px-10 py-2 ml-3 text-sm bg-primary-main text-spectrum-white rounded "
          >
            Send Invitation
          </button>
           {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* BACKDROP */}
    <div className="absolute inset-0 bg-black opacity-70"></div>

    {/* POPUP CARD */}
    <div className="relative bg-white  rounded-lg shadow-lg p-6 w-[700px] h-[350px] flex flex-col items-center justify-center">
      <button className="bg-green-600 text-spectrum-white px-15 py-3 rounded mb-4">
        Success! Invitation Sent
      </button>
      <img
        src={SuccessImage}
        alt="Success"
        className="w-90 h-60 ml-65 mb-2"
      />
    </div>
  </div>
)}

            
        </div>
    </div>
    </div>
  );
}



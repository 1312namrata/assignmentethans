// import { useContext, useEffect } from "react";
// import { AuthContext } from "../auth/AuthProvider";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const { fakeLogin, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       fakeLogin(); // 👈 auto login with Postman token
//     } else {
//       navigate("/superadmin/sampletracker"); // 👈 redirect to dashboard
//     }
//   }, [user, fakeLogin, navigate]);

//   return <p>Logging in with Postman token...</p>;
// }






import React from 'react';
import {  useNavigate } from 'react-router-dom';

const Login = () => {
   const navigate = useNavigate();
  const loginUrl =
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000/login'
      : 'https://app.elaniti.com/api/auth/login';

  const handleLogin = () => {
    window.location.href = loginUrl;
    navigate("/mainlayout")
    
  };

  return (
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
    <h2 className="text-2xl font-bold mb-6 text-gray-800">Login with Auth0</h2>
    <button
      onClick={handleLogin}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
    >
      Login
    </button>
  </div>
</div>

  );
};

export default Login;

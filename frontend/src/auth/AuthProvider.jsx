// AuthContext.js
// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   // 👇 Instead of real API login, we just set the token from Postman
//   const fakeLogin = () => {
//     const mockUser = {
//       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVsYTIwMjUxIiwiZW1haWwiOiJrZXNoYXZAZWxhbml0aS5jb20iLCJyb2xlcyI6WyJzdXBlcmFkbWluIl0sImlhdCI6MTc1NjExNDMwMiwiZXhwIjoxNzU2MTE1MjAyfQ.-3ocMBf5Pk88DQVbjCJ3uhaejffHZqPr3YsA11ZAd9s",
//       role: "superadmin", // or "admin"
//     };
//     setUser(mockUser);
//     localStorage.setItem("user", JSON.stringify(mockUser));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, fakeLogin, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading during auth check
  // const base_url = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'http://localhost';
  // console.log('Base URL:', base_url);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          window.location.hostname === 'localhost'
            ? 'http://localhost:3000/auth/me'
            : 'https://app.elaniti.com/api/auth/me',
          {
            credentials: 'include',
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        console.error('Auth check failed:', err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

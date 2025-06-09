// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const storedUsername = localStorage.getItem("username");
//     setIsAuthenticated(!!token);
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("username");
//     setIsAuthenticated(false);
//     window.location.href = "/";
//   };

//   return (
//     <header className="navbar">
//       <nav className="nav-container">
//         <Link to="/" className="nav-logo">TypeMaster</Link>
//         <div className="nav-links">
//           {isAuthenticated ? (
//             <>
//               <Link to="/dashboard" className="nav-link">Dashboard</Link>
//               <Link to="/profile" className="nav-link">Profile</Link>
//               <button onClick={handleLogout} className="nav-button logout">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="nav-button login">Login</Link>
//               <Link to="/signup" className="nav-button signup">Sign Up</Link>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

// components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <header className="p-6">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-2xl font-black text-[#323232]">
          <Link to="/">TypeFast</Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}

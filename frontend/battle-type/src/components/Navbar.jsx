import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUsername = localStorage.getItem("username");
    setIsAuthenticated(!!token);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <nav className="nav-container">
        <Link to="/" className="nav-logo">TypeMaster</Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={handleLogout} className="nav-button logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-button login">Login</Link>
              <Link to="/signup" className="nav-button signup">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};


export default Navbar;

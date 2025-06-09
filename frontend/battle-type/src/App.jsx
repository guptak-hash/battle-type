import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile/Profile";
import "./App.css";
import TypingGame from "./pages/TypingGame";
import Dashboard from "./pages/dashboard/Dashboard";
import Leaderboard from "./components/Leaderboard";
import Card from "./components/Card";

const ProtectedRoute = ({ children }) => {
  // You can implement actual auth check here
  const isAuthenticated = localStorage.getItem("token");
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/typingGame" element={<TypingGame />} />
        {/* <Route path='/profile' element={<Profile />}/> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // full viewport height to center vertically
              }}
            >
              <Card />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

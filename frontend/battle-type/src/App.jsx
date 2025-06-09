import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/profile/Profile';
import './App.css';
import TypingGame from './pages/TypingGame';
import Dashboard from './pages/dashboard/Dashboard';
import Leaderboard from './components/Leaderboard';


const ProtectedRoute = ({ children }) => {
  // You can implement actual auth check here
  const isAuthenticated = localStorage.getItem('token');
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
        <Route path='/typingGame' element={<TypingGame/>}/>
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
      </Routes>
    </Router>
  );
};

export default App;
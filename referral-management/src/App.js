import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import ResourceManagement from './ResourceManagement';
import Login from './Login';
import Signup from './Signup';
import ReferralForm from './ReferralForm';
import ReferralData from './ReferralData';  // Ensure this is imported
import FollowUp from './FollowUp';
import DetailedFollowUp from './DetailedFollowUp';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('token') !== null);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            Resource Referral System
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/resource-management" className="nav-link">Resource Management</Link>
                </li>
                <li className="nav-item">
                  <Link to="/referral-form" className="nav-link">Referral Form</Link>
                </li>
                <li className="nav-item">
                  <Link to="/follow-up" className="nav-link">Follow-Up</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link logout-button" onClick={logout}>Logout</button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/resource-management" element={isAuthenticated ? <ResourceManagement /> : <Navigate to="/login" />} />
          <Route path="/referral-form" element={isAuthenticated ? <ReferralForm /> : <Navigate to="/login" />} />
          <Route path="/referral-data" element={isAuthenticated ? <ReferralData /> : <Navigate to="/login" />} />
          <Route path="/follow-up" element={isAuthenticated ? <FollowUp /> : <Navigate to="/login" />} />
          <Route path="/follow-up/:client_id" element={isAuthenticated ? <DetailedFollowUp /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="main-content">
      <h2>Welcome to the Resource Referral System</h2>
      <p>Please log in to access the Resource Management and Referral Form.</p>
    </div>
  );
}

export default App;

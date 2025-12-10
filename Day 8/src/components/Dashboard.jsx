import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h2>Welcome to Mobile Recharge Application</h2>
      <p>Your one-stop solution for all mobile recharge needs</p>
      
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate('/recharge')}>
          <h3>⚡ Quick Recharge</h3>
          <p>Recharge your mobile instantly</p>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/plans')}>
          <h3>📋 View Plans</h3>
          <p>Browse available plans</p>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/history')}>
          <h3>📈 Transaction History</h3>
          <p>View your recharge history</p>
        </div>
      </div>
      
      <div className="quick-recharge-card">
        <h3>Quick Recharge</h3>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input type="tel" placeholder="Enter 10-digit mobile number" maxLength="10" />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input type="number" placeholder="Enter amount" />
        </div>
        <button className="recharge-btn" onClick={() => navigate('/recharge')}>
          Proceed to Recharge
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
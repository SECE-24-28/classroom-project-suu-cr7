import React, { useState } from 'react';

const Recharge = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [operator, setOperator] = useState('');
  const [circle, setCircle] = useState('');

  const handleRecharge = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10 && amount) {
      alert(`Recharge successful! ₹${amount} recharged to ${mobileNumber}`);
      setMobileNumber('');
      setAmount('');
    } else {
      alert('Please enter valid mobile number and amount');
    }
  };

  const quickAmounts = [10, 20, 50, 100, 200, 500];

  return (
    <div className="recharge-page">
      <h2>Mobile Recharge</h2>
      
      <div className="recharge-form">
        <form onSubmit={handleRecharge}>
          <div className="form-group">
            <label>Mobile Number *</label>
            <input 
              type="tel" 
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Operator</label>
            <select value={operator} onChange={(e) => setOperator(e.target.value)}>
              <option value="">Select Operator</option>
              <option value="airtel">Airtel</option>
              <option value="jio">Jio</option>
              <option value="vi">Vi</option>
              <option value="bsnl">BSNL</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Circle</label>
            <select value={circle} onChange={(e) => setCircle(e.target.value)}>
              <option value="">Select Circle</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="kolkata">Kolkata</option>
              <option value="chennai">Chennai</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Amount (₹) *</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
            
            <div className="quick-amounts">
              {quickAmounts.map(amt => (
                <button 
                  key={amt}
                  type="button"
                  className="quick-amount-btn"
                  onClick={() => setAmount(amt)}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>
          
          <button type="submit" className="recharge-btn">
            Recharge Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Recharge;
import React, { useState } from 'react';

const Plans = () => {
  const [operator, setOperator] = useState('airtel');
  
  const plansData = {
    airtel: [
      { id: 1, name: 'Airtel ₹299 Plan', validity: '28 days', data: '1.5GB/day', price: 299 },
      { id: 2, name: 'Airtel ₹479 Plan', validity: '56 days', data: '1.5GB/day', price: 479 },
      { id: 3, name: 'Airtel ₹719 Plan', validity: '84 days', data: '2GB/day', price: 719 }
    ],
    jio: [
      { id: 1, name: 'Jio ₹299 Plan', validity: '28 days', data: '2GB/day', price: 299 },
      { id: 2, name: 'Jio ₹599 Plan', validity: '84 days', data: '1.5GB/day', price: 599 },
      { id: 3, name: 'Jio ₹999 Plan', validity: '168 days', data: '1.5GB/day', price: 999 }
    ],
    vi: [
      { id: 1, name: 'Vi ₹299 Plan', validity: '28 days', data: '1.5GB/day', price: 299 },
      { id: 2, name: 'Vi ₹699 Plan', validity: '84 days', data: '2GB/day', price: 699 }
    ]
  };

  const handleSelectPlan = (plan) => {
    alert(`Selected plan: ${plan.name} for ₹${plan.price}`);
  };

  return (
    <div className="plans-page">
      <h2>Available Plans</h2>
      
      <div className="operator-selector">
        <h3>Select Operator:</h3>
        <div className="operator-buttons">
          <button 
            className={operator === 'airtel' ? 'active' : ''}
            onClick={() => setOperator('airtel')}
          >
            Airtel
          </button>
          <button 
            className={operator === 'jio' ? 'active' : ''}
            onClick={() => setOperator('jio')}
          >
            Jio
          </button>
          <button 
            className={operator === 'vi' ? 'active' : ''}
            onClick={() => setOperator('vi')}
          >
            Vi
          </button>
        </div>
      </div>
      
      <div className="plans-grid">
        {plansData[operator].map(plan => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.name}</h3>
            <div className="plan-details">
              <p><strong>Validity:</strong> {plan.validity}</p>
              <p><strong>Data:</strong> {plan.data}</p>
              <p><strong>Voice:</strong> Unlimited</p>
              <p><strong>SMS:</strong> 100 SMS/day</p>
            </div>
            <div className="plan-price">
              <h4>₹{plan.price}</h4>
            </div>
            <button 
              className="select-plan-btn"
              onClick={() => handleSelectPlan(plan)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
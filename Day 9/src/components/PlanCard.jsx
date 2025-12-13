const PlanCard = ({ plan }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-2 border-transparent hover:border-primary hover:shadow-lg transition-all plan-card">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">₹{plan.price}</h3>
        <div className="text-gray-600 space-y-1 mb-4">
          <p>Validity: {plan.validity}</p>
          <p>Data: {plan.data}</p>
          <p className="text-sm">{plan.description}</p>
        </div>
        <button 
          onClick={() => {
            localStorage.setItem('selectedPlan', JSON.stringify(plan));
            window.location.href = '/recharge';
          }}
          className="w-full bg-secondary text-white py-3 rounded-full hover:bg-opacity-90 transition-colors font-medium"
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
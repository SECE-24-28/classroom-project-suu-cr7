import { useState, useEffect } from 'react';
import PlanCard from '../components/PlanCard';
import { usePlans } from '../context/PlansContext';
import { useLocation } from 'react-router-dom';
import Toast from '../components/Toast';

const RechargePlans = () => {
  const [planType, setPlanType] = useState('prepaid');
  const { plans } = usePlans();
  const location = useLocation();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  console.log('RechargePlans - Current plans:', plans);

  useEffect(() => {
    if (location.state?.planAdded) {
      setShowSuccessToast(true);
    }
  }, [location]);

  const filteredPlans = plans.filter(plan => plan.type === planType);

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">Recharge Plans</h1>
        
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setPlanType('prepaid')}
              className={`px-8 py-3 rounded-full transition-all font-medium ${
                planType === 'prepaid' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Prepaid
            </button>
            <button
              onClick={() => setPlanType('postpaid')}
              className={`px-8 py-3 rounded-full transition-all font-medium ${
                planType === 'postpaid' ? 'bg-secondary text-white shadow-md' : 'text-gray-600 hover:text-secondary'
              }`}
            >
              Postpaid
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        {showSuccessToast && (
          <Toast
            message="🎉 Plan added successfully!"
            type="success"
            onClose={() => setShowSuccessToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RechargePlans;
import { useState, useEffect } from 'react';
import PlanCard from '../components/PlanCard';

const RechargePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [planType, setPlanType] = useState('prepaid');

  const fallbackPlans = [
    { id: 1, type: 'prepaid', price: 149, validity: '28 days', data: '1GB/day', description: 'Unlimited calls + 100 SMS/day' },
    { id: 2, type: 'prepaid', price: 199, validity: '28 days', data: '1.5GB/day', description: 'Unlimited calls + 100 SMS/day' },
    { id: 3, type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
    { id: 4, type: 'prepaid', price: 399, validity: '56 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
    { id: 5, type: 'prepaid', price: 599, validity: '84 days', data: '1.5GB/day', description: 'Unlimited calls + 100 SMS/day' },
    { id: 6, type: 'prepaid', price: 719, validity: '84 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
    { id: 7, type: 'postpaid', price: 399, validity: '30 days', data: '40GB', description: 'Unlimited calls + SMS' },
    { id: 8, type: 'postpaid', price: 599, validity: '30 days', data: '75GB', description: 'Unlimited calls + SMS' },
    { id: 9, type: 'postpaid', price: 799, validity: '30 days', data: '100GB', description: 'Unlimited calls + SMS + Disney+' },
    { id: 10, type: 'postpaid', price: 999, validity: '30 days', data: '150GB', description: 'Unlimited calls + SMS + Netflix' },
    { id: 11, type: 'postpaid', price: 1299, validity: '30 days', data: '200GB', description: 'Unlimited calls + SMS + Netflix + Prime' },
    { id: 12, type: 'postpaid', price: 1599, validity: '30 days', data: '300GB', description: 'Unlimited calls + SMS + All OTT' },
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('https://65f5b8e741d90c1c5e0a6f8b.mockapi.io/plans');
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        } else {
          setPlans(fallbackPlans);
        }
      } catch (error) {
        setPlans(fallbackPlans);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const filteredPlans = plans.filter(plan => plan.type === planType);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-secondary rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-primary font-medium">Loading plans...</p>
        </div>
      </div>
    );
  }

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
      </div>
    </div>
  );
};

export default RechargePlans;
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const PlansContext = createContext();

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
};

const defaultPlans = [
  // Prepaid Plans (10)
  { id: 1, type: 'prepaid', price: 79, validity: '28 days', data: '200MB/day', description: 'Unlimited calls + 100 SMS/day' },
  { id: 2, type: 'prepaid', price: 99, validity: '28 days', data: '500MB/day', description: 'Unlimited calls + 100 SMS/day' },
  { id: 3, type: 'prepaid', price: 149, validity: '28 days', data: '1GB/day', description: 'Unlimited calls + 100 SMS/day' },
  { id: 4, type: 'prepaid', price: 199, validity: '28 days', data: '1.5GB/day', description: 'Unlimited calls + 100 SMS/day' },
  { id: 5, type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
  { id: 6, type: 'prepaid', price: 399, validity: '56 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day' },
  { id: 7, type: 'prepaid', price: 499, validity: '84 days', data: '1.5GB/day', description: 'Unlimited calls + 100 SMS/day' },
  { id: 8, type: 'prepaid', price: 719, validity: '84 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day + Disney+ Hotstar' },
  { id: 9, type: 'prepaid', price: 999, validity: '84 days', data: '3GB/day', description: 'Unlimited calls + 100 SMS/day + Netflix + Prime' },
  { id: 10, type: 'prepaid', price: 1499, validity: '365 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day + All OTT' },
  // Postpaid Plans (10)
  { id: 11, type: 'postpaid', price: 199, validity: '30 days', data: '20GB', description: 'Unlimited calls + SMS' },
  { id: 12, type: 'postpaid', price: 299, validity: '30 days', data: '25GB', description: 'Unlimited calls + SMS' },
  { id: 13, type: 'postpaid', price: 399, validity: '30 days', data: '40GB', description: 'Unlimited calls + SMS' },
  { id: 14, type: 'postpaid', price: 499, validity: '30 days', data: '60GB', description: 'Unlimited calls + SMS + Disney+ Hotstar' },
  { id: 15, type: 'postpaid', price: 599, validity: '30 days', data: '75GB', description: 'Unlimited calls + SMS + Netflix' },
  { id: 16, type: 'postpaid', price: 799, validity: '30 days', data: '100GB', description: 'Unlimited calls + SMS + Netflix + Prime' },
  { id: 17, type: 'postpaid', price: 999, validity: '30 days', data: '150GB', description: 'Unlimited calls + SMS + Netflix + Prime + Disney+' },
  { id: 18, type: 'postpaid', price: 1299, validity: '30 days', data: '200GB', description: 'Unlimited calls + SMS + All OTT platforms' },
  { id: 19, type: 'postpaid', price: 1599, validity: '30 days', data: '300GB', description: 'Unlimited calls + SMS + Premium OTT + International roaming' },
  { id: 20, type: 'postpaid', price: 1999, validity: '30 days', data: '500GB', description: 'Unlimited calls + SMS + All premium services + Priority network' },
];

export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState(() => {
    const savedPlans = localStorage.getItem('rechargePlans');
    return savedPlans ? JSON.parse(savedPlans) : defaultPlans;
  });

  useEffect(() => {
    // Load plans from backend on mount
    const loadPlans = async () => {
      try {
        const response = await API.get('/plans');
        if (response.data.success) {
          setPlans(response.data.data);
        }
      } catch (error) {
        console.log('Backend not available, using local plans');
      }
    };
    loadPlans();
  }, []);

  useEffect(() => {
    localStorage.setItem('rechargePlans', JSON.stringify(plans));
  }, [plans]);

  const updatePlan = async (id, updatedPlan) => {
    try {
      // Try backend first
      try {
        const response = await API.put(`/plans/${id}`, updatedPlan);
        if (response.data.success) {
          updatedPlan = response.data.data;
        }
      } catch (error) {
        console.log('Backend not available, using local state');
      }
      
      setPlans(prev => prev.map(plan => 
        plan.id === id ? { ...plan, ...updatedPlan } : plan
      ));
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const addPlan = async (newPlan) => {
    try {
      let planWithId = { ...newPlan, id: Date.now(), isActive: true };
      console.log('Adding plan:', planWithId);
      
      // Try backend first
      try {
        const response = await API.post('/plans', planWithId);
        if (response.data.success) {
          planWithId = response.data.data;
        }
      } catch (error) {
        console.log('Backend not available, using local state');
      }
      
      setPlans(prev => {
        const newPlans = [...prev, planWithId];
        console.log('Updated plans:', newPlans);
        return newPlans;
      });
      
      // Add notification for new plan
      const event = new CustomEvent('newPlanAdded', { 
        detail: { plan: planWithId } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  const deletePlan = async (id) => {
    try {
      // Try backend first
      try {
        await API.delete(`/plans/${id}`);
      } catch (error) {
        console.log('Backend not available, using local state');
      }
      
      setPlans(prev => prev.filter(plan => plan.id !== id));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <PlansContext.Provider value={{ plans, updatePlan, addPlan, deletePlan }}>
      {children}
    </PlansContext.Provider>
  );
};
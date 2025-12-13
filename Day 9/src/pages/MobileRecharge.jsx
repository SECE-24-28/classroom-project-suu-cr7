import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRecharge } from '../context/RechargeContext';

const MobileRecharge = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [rechargeType, setRechargeType] = useState('prepaid');
  const { addRecharge } = useRecharge();
  
  useEffect(() => {
    const selectedPlan = localStorage.getItem('selectedPlan');
    if (selectedPlan) {
      const plan = JSON.parse(selectedPlan);
      setValue('amount', plan.price);
      setRechargeType(plan.type);
      localStorage.removeItem('selectedPlan');
    }
  }, [setValue]);

  const onSubmit = (data) => {
    addRecharge({
      operator: data.operator,
      amount: data.amount,
      type: rechargeType,
      mobile: data.mobile
    });
    alert(`Recharge of ₹${data.amount} for ${data.mobile} successful!`);
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Mobile Recharge</h1>
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex mb-6">
            <button
              onClick={() => setRechargeType('prepaid')}
              className={`flex-1 py-3 rounded-l-lg font-medium ${
                rechargeType === 'prepaid' ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              Prepaid
            </button>
            <button
              onClick={() => setRechargeType('postpaid')}
              className={`flex-1 py-3 rounded-r-lg font-medium ${
                rechargeType === 'postpaid' ? 'bg-secondary text-white' : 'bg-gray-200'
              }`}
            >
              Postpaid
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('mobile', { 
                  required: 'Mobile number is required',
                  pattern: { value: /^\d{10}$/, message: 'Enter valid 10-digit number' }
                })}
                placeholder="Mobile Number"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>

            <div>
              <select
                {...register('operator', { required: 'Select operator' })}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
              >
                <option value="">Select Operator</option>
                <option value="jio">Jio</option>
                <option value="airtel">Airtel</option>
                <option value="vi">Vi</option>
                <option value="bsnl">BSNL</option>
              </select>
              {errors.operator && <p className="text-red-500 text-sm mt-1">{errors.operator.message}</p>}
            </div>

            <div>
              <input
                {...register('amount', { 
                  required: 'Amount is required',
                  min: { value: 10, message: 'Minimum ₹10' },
                  max: { value: 5000, message: 'Maximum ₹5000' }
                })}
                type="number"
                placeholder="Amount"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white py-4 rounded-full hover:bg-opacity-90 transition-colors font-medium"
            >
              Recharge Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MobileRecharge;
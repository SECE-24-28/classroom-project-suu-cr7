import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecharge } from '../context/RechargeContext';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addRecharge } = useRecharge();
  const [plan, setPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const planParam = urlParams.get('plan');
    const phoneParam = urlParams.get('phone');
    const operatorParam = urlParams.get('operator');
    
    if (planParam) {
      setPlan(JSON.parse(decodeURIComponent(planParam)));
      setPhoneNumber(phoneParam);
      setOperator(operatorParam);
    } else if (location.state) {
      setPlan(location.state.plan);
      setPhoneNumber(location.state.phoneNumber);
      setOperator(location.state.operator);
    }
  }, [location]);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!plan) {
    navigate('/plans');
    return null;
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const rechargeData = {
        operator,
        amount: plan.price,
        type: plan.type,
        phoneNumber,
        plan: plan
      };
      
      addRecharge(rechargeData);
      setProcessing(false);
      navigate('/payment/success', { 
        state: { 
          ...rechargeData, 
          transactionId: `TXN${Date.now()}`,
          paymentMethod 
        } 
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Payment</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Operator:</span>
                <span className="font-semibold">{operator}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone Number:</span>
                <span className="font-semibold">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Plan Type:</span>
                <span className="font-semibold capitalize">{plan.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Data:</span>
                <span className="font-semibold">{plan.data}</span>
              </div>
              <div className="flex justify-between">
                <span>Validity:</span>
                <span className="font-semibold">{plan.validity}</span>
              </div>
              <div className="flex justify-between">
                <span>Description:</span>
                <span className="text-sm text-gray-600">{plan.description}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary">₹{plan.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Payment Method</h3>
            
            <div className="mb-6">
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Credit/Debit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  UPI
                </label>
              </div>
            </div>

            <form onSubmit={handlePayment}>
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      className="p-3 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      className="p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <input
                  type="text"
                  placeholder="UPI ID (e.g., user@paytm)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-primary text-white py-3 rounded-lg mt-6 hover:bg-opacity-90 disabled:opacity-50"
              >
                {processing ? 'Processing...' : `Pay ₹${plan.price}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
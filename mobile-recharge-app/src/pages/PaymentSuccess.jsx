import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { operator, amount, type, phoneNumber, plan, transactionId, paymentMethod } = location.state || {};

  if (!transactionId) {
    navigate('/plans');
    return null;
  }

  const currentDate = new Date().toLocaleString();

  const downloadBill = () => {
    const billContent = `
MOBILE RECHARGE BILL
=====================================================
Transaction ID: ${transactionId}
Date & Time: ${currentDate}
=====================================================

CUSTOMER DETAILS:
Phone Number: ${phoneNumber}
Operator: ${operator}

PLAN DETAILS:
Plan Type: ${type}
Data: ${plan.data}
Validity: ${plan.validity}
Description: ${plan.description}

PAYMENT DETAILS:
Payment Method: ${paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}
Amount Paid: ₹${amount}

=====================================================
Thank you for using MobileRecharge!
For support, contact: support@mobilerecharge.com
=====================================================
    `;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bill_${transactionId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={80} />
          <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">Your recharge has been completed successfully</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
            <h3 className="text-xl font-bold mb-4 text-center">Transaction Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-semibold">{currentDate}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Phone Number:</span>
                <span className="font-semibold">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Operator:</span>
                <span className="font-semibold">{operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan Type:</span>
                <span className="font-semibold capitalize">{type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <span className="font-semibold">{plan.data}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Validity:</span>
                <span className="font-semibold">{plan.validity}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">{paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600 font-bold">Amount Paid:</span>
                <span className="font-bold text-primary">₹{amount}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={downloadBill}
              className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 flex items-center gap-2"
            >
              <Download size={20} />
              Download Bill
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
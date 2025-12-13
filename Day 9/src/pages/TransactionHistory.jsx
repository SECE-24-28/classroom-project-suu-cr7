import { useRecharge } from '../context/RechargeContext';

const TransactionHistory = () => {
  const { rechargeData } = useRecharge();

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">Transaction History</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Operator</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rechargeData.transactionHistory.map(transaction => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{transaction.date}</td>
                    <td className="px-6 py-4">{transaction.operator}</td>
                    <td className="px-6 py-4 font-semibold">₹{transaction.amount}</td>
                    <td className="px-6 py-4">{transaction.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === 'Success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
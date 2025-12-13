import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useRecharge } from '../context/RechargeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { rechargeData } = useRecharge();
  
  const monthlyData = [
    { month: 'Jan', amount: 500 },
    { month: 'Feb', amount: 800 },
    { month: 'Mar', amount: 600 },
    { month: 'Apr', amount: 900 },
    { month: 'May', amount: 750 },
    { month: 'Dec', amount: rechargeData.thisMonth }
  ];

  const operatorData = [
    { name: 'Jio', value: 40, color: '#0088FE' },
    { name: 'Airtel', value: 30, color: '#00C49F' },
    { name: 'Vi', value: 20, color: '#FFBB28' },
    { name: 'BSNL', value: 10, color: '#FF8042' }
  ];

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">Welcome, {user?.name || 'User'}!</h1>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Recharges</h3>
            <p className="text-3xl font-bold text-primary">₹{rechargeData.totalRecharges}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">This Month</h3>
            <p className="text-3xl font-bold text-secondary">₹{rechargeData.thisMonth}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Transactions</h3>
            <p className="text-3xl font-bold text-primary">{rechargeData.transactions}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Savings</h3>
            <p className="text-3xl font-bold text-green-600">₹{rechargeData.savings}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Monthly Spending</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#A97882" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Operator Usage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={operatorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  {operatorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
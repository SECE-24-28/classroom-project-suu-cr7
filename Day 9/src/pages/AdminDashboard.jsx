import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRecharge } from '../context/RechargeContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { rechargeData } = useRecharge();
  
  const stats = {
    totalUsers: 1250 + rechargeData.transactions * 10,
    totalRecharges: rechargeData.transactions,
    todayRecharges: rechargeData.transactionHistory.filter(t => t.date === new Date().toISOString().split('T')[0]).length,
    revenue: rechargeData.totalRecharges
  };

  useEffect(() => {
    if (!localStorage.getItem('isAdmin')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const revenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 28000 },
    { month: 'Dec', revenue: rechargeData.thisMonth }
  ];

  const logout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Recharges</h3>
            <p className="text-3xl font-bold text-secondary">{stats.totalRecharges}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Today's Recharges</h3>
            <p className="text-3xl font-bold text-primary">{stats.todayRecharges}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
            <p className="text-3xl font-bold text-green-600">₹{stats.revenue}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#A97882" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
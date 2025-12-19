import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRecharge } from '../context/RechargeContext';
import { usePlans } from '../context/PlansContext';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { rechargeData } = useRecharge();
  const { plans, updatePlan, addPlan, deletePlan } = usePlans();
  const { user, logout } = useAuth();
  const [editingPlan, setEditingPlan] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);



  const stats = {
    totalUsers: 1250 + rechargeData.transactions * 10,
    totalRecharges: rechargeData.transactions,
    todayRecharges: rechargeData.transactionHistory.filter(t => t.date === new Date().toISOString().split('T')[0]).length,
    revenue: rechargeData.totalRecharges
  };

  const revenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 22000 },
    { month: 'Apr', revenue: 25000 },
    { month: 'May', revenue: 28000 },
    { month: 'Dec', revenue: rechargeData.thisMonth }
  ];

  const handleEdit = (plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSave = async () => {
    await updatePlan(editingPlan.id, editingPlan);
    setEditingPlan(null);
    alert('Plan updated successfully!');
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPlan = {
      type: formData.get('type'),
      price: parseInt(formData.get('price')),
      validity: formData.get('validity'),
      data: formData.get('data'),
      description: formData.get('description')
    };
    await addPlan(newPlan);
    setShowAddForm(false);
    e.target.reset();
    alert('Plan added successfully! You can see it in the plans list below.');
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      await deletePlan(id);
      alert('Plan deleted successfully!');
    }
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
        {/* Stats Cards */}
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

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
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

        {/* Plans Management */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Manage Plans</h3>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/admin/plans')}
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90"
              >
                Full Plans Manager
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90"
              >
                Add New Plan
              </button>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-bold mb-4">Add New Plan</h4>
              <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
                <select name="type" required className="p-3 border rounded-lg">
                  <option value="prepaid">Prepaid</option>
                  <option value="postpaid">Postpaid</option>
                </select>
                <input name="price" type="number" placeholder="Price" required className="p-3 border rounded-lg" />
                <input name="validity" placeholder="Validity" required className="p-3 border rounded-lg" />
                <input name="data" placeholder="Data" required className="p-3 border rounded-lg" />
                <input name="description" placeholder="Description" required className="p-3 border rounded-lg md:col-span-2" />
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" className="bg-secondary text-white px-6 py-2 rounded-lg">Add Plan</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.id} className="bg-gray-50 p-4 rounded-lg border">
                {editingPlan && editingPlan.id === plan.id ? (
                  <div className="space-y-3">
                    <input
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({...editingPlan, price: parseInt(e.target.value)})}
                      type="number"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editingPlan.validity}
                      onChange={(e) => setEditingPlan({...editingPlan, validity: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editingPlan.data}
                      onChange={(e) => setEditingPlan({...editingPlan, data: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editingPlan.description}
                      onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                      className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                      <button onClick={() => setEditingPlan(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-bold text-primary">₹{plan.price}</h4>
                    <p className="text-sm text-gray-600">Validity: {plan.validity}</p>
                    <p className="text-sm text-gray-600">Data: {plan.data}</p>
                    <p className="text-xs text-gray-500 mb-2">{plan.description}</p>
                    <span className="inline-block bg-secondary bg-opacity-20 text-secondary px-2 py-1 rounded text-xs mb-3">
                      {plan.type}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
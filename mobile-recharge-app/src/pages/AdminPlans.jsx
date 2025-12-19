import { useState } from 'react';
import { usePlans } from '../context/PlansContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

const AdminPlans = () => {
  const { plans, updatePlan, addPlan, deletePlan } = usePlans();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editingPlan, setEditingPlan] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState(null);



  const handleEdit = (plan) => {
    setEditingPlan({ ...plan });
  };

  const handleSave = () => {
    updatePlan(editingPlan.id, editingPlan);
    setEditingPlan(null);
    setToast({ message: 'Plan updated successfully!', type: 'success' });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPlan = {
      type: formData.get('type'),
      price: parseInt(formData.get('price')),
      validity: formData.get('validity'),
      data: formData.get('data'),
      description: formData.get('description')
    };
    addPlan(newPlan);
    setShowAddForm(false);
    e.target.reset();
    setToast({ message: 'New plan added successfully!', type: 'success' });
  };

  return (
    <div className="min-h-screen bg-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Manage Plans</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-secondary text-white px-6 py-2 rounded-full hover:bg-opacity-90"
          >
            Add New Plan
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Add New Plan</h3>
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
            <div key={plan.id} className="bg-white p-6 rounded-lg shadow-md">
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
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary mb-2">₹{plan.price}</h3>
                  <p className="text-gray-600">Validity: {plan.validity}</p>
                  <p className="text-gray-600">Data: {plan.data}</p>
                  <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                  <span className="inline-block bg-secondary bg-opacity-20 text-secondary px-3 py-1 rounded-full text-sm mb-4">
                    {plan.type}
                  </span>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this plan?')) {
                          deletePlan(plan.id);
                          setToast({ message: 'Plan deleted successfully!', type: 'success' });
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AdminPlans;
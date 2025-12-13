import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.username === 'admin' && data.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('username')}
            placeholder="Username"
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
            required
          />
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-primary"
            required
          />
          <button
            type="submit"
            className="w-full bg-secondary text-white py-4 rounded-full hover:bg-opacity-90 transition-colors font-medium"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
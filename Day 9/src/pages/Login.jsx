import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/validationSchemas';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login({ email: data.email, name: data.email.split('@')[0] });
    reset();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-4 rounded-full hover:bg-opacity-90 transition-colors font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
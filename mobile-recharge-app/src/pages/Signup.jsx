import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../utils/validationSchemas';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { register: registerField, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(signupSchema)
  });
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const onSubmit = async (data) => {
    const newUser = {
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      role: 'user'
    };
    
    const result = await registerUser(newUser);
    
    if (result.success) {
      alert('Account created successfully!');
      reset();
      navigate('/login');
    } else {
      alert(result.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Sign Up</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...registerField('name')}
              type="text"
              placeholder="Full Name"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <input
              {...registerField('email')}
              type="email"
              placeholder="Email"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              {...registerField('phone')}
              type="tel"
              placeholder="Phone Number"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <input
              {...registerField('password')}
              type="password"
              placeholder="Password"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <input
              {...registerField('confirmPassword')}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-4 rounded-full hover:bg-opacity-90 transition-colors font-medium"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
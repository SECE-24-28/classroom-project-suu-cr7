import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell } from 'lucide-react';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className="bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mr-2">
              <span className="text-primary font-bold text-lg">M</span>
            </div>
            <Link to="/" className="text-2xl font-bold">MobileRecharge</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user?.role === 'admin' ? (
              <>
                <Link to="/admin/dashboard" className="hover:text-secondary transition">Admin Dashboard</Link>
                <Link to="/admin/plans" className="hover:text-secondary transition">Manage Plans</Link>
                <Link to="/plans" className="hover:text-secondary transition">View Plans</Link>
                <Link to="/notifications" className="hover:text-secondary transition">
                  <Bell size={20} />
                </Link>
              </>
            ) : (
              <>
                <Link to="/recharge" className="hover:text-secondary transition">Recharge</Link>
                <Link to="/plans" className="hover:text-secondary transition">Plans</Link>
                <Link to="/dashboard" className="hover:text-secondary transition">Dashboard</Link>
                <Link to="/history" className="hover:text-secondary transition">History</Link>
                <Link to="/notifications" className="hover:text-secondary transition">
                  <Bell size={20} />
                </Link>
                <Link to="/contact" className="hover:text-secondary transition">Contact</Link>
              </>
            )}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:text-secondary transition">Login</Link>
                <Link to="/signup" className="hover:text-secondary transition">Sign Up</Link>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome, {user?.name}</span>
                <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition text-white font-medium">Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
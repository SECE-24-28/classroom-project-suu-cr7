import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedUser = localStorage.getItem('user');
    
    if (savedIsLoggedIn && savedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save to localStorage when state changes
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isLoggedIn, user]);

  const login = async (email, password, role) => {
    try {
      // Try backend authentication first
      const response = await API.post('/auth/login', { email, password, role });
      if (response.data.success) {
        const userData = response.data.user;
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('token', response.data.token);
        return { success: true, role: userData.role };
      }
    } catch (error) {
      console.log('Backend not available, using hardcoded credentials');
    }
    
    // Fallback to hardcoded credentials
    if (role === 'admin' && email === 'admin13@gmail.com' && password === 'seceaids2024') {
      const userData = { email, role: 'admin', name: 'Admin' };
      setIsLoggedIn(true);
      setUser(userData);
      return { success: true, role: 'admin' };
    }
    else if (role === 'user' && email && password) {
      const userData = { email, role: 'user', name: email.split('@')[0] };
      setIsLoggedIn(true);
      setUser(userData);
      return { success: true, role: 'user' };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = async (userData) => {
    // Simple registration - just return success
    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
import { createContext, useContext, useState } from 'react';

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  
  const ADMIN_EMAIL = 'admin13@gmail.com';
  const ADMIN_PASSWORD = 'seceaids2024';

  const addUser = (userData) => {
    setUsers(prev => [...prev, userData]);
  };

  const findUser = (email, password, role) => {
    if (role === 'admin') {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return { email, password, role: 'admin', name: 'Admin' };
      }
      return null;
    }
    return users.find(user => 
      user.email === email && 
      user.password === password && 
      user.role === 'user'
    );
  };

  return (
    <UsersContext.Provider value={{ users, addUser, findUser }}>
      {children}
    </UsersContext.Provider>
  );
};
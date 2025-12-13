import { createContext, useContext, useState } from 'react';

const RechargeContext = createContext();

export const useRecharge = () => {
  const context = useContext(RechargeContext);
  if (!context) {
    throw new Error('useRecharge must be used within a RechargeProvider');
  }
  return context;
};

export const RechargeProvider = ({ children }) => {
  const [rechargeData, setRechargeData] = useState(() => {
    const initialHistory = [
      { id: 1, date: '2024-12-10', operator: 'Jio', amount: 399, status: 'Success', type: 'Prepaid' },
      { id: 2, date: '2024-12-08', operator: 'Airtel', amount: 199, status: 'Success', type: 'Prepaid' },
      { id: 3, date: '2024-12-05', operator: 'Vi', amount: 599, status: 'Failed', type: 'Postpaid' },
    ];
    
    const totalRecharges = initialHistory.filter(t => t.status === 'Success').reduce((sum, t) => sum + t.amount, 0);
    const thisMonth = initialHistory.filter(t => t.status === 'Success' && t.date.includes('2024-12')).reduce((sum, t) => sum + t.amount, 0);
    const transactions = initialHistory.length;
    const savings = Math.floor(totalRecharges * 0.05);
    
    return {
      totalRecharges,
      thisMonth,
      transactions,
      savings,
      transactionHistory: initialHistory,
      notifications: [
        { id: 1, type: 'success', title: 'Welcome', message: 'Welcome to Mobile Recharge App', time: '1 hour ago' }
      ]
    };
  });

  const addRecharge = (rechargeInfo) => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      operator: rechargeInfo.operator,
      amount: parseInt(rechargeInfo.amount),
      status: 'Success',
      type: rechargeInfo.type || 'Prepaid'
    };

    const newNotification = {
      id: Date.now(),
      type: 'success',
      title: 'Recharge Successful',
      message: `Your ₹${rechargeInfo.amount} recharge for ${rechargeInfo.operator} was successful`,
      time: 'Just now'
    };

    setRechargeData(prev => {
      const newHistory = [newTransaction, ...prev.transactionHistory];
      const totalRecharges = newHistory.filter(t => t.status === 'Success').reduce((sum, t) => sum + t.amount, 0);
      const thisMonth = newHistory.filter(t => t.status === 'Success' && t.date.includes('2024-12')).reduce((sum, t) => sum + t.amount, 0);
      const transactions = newHistory.length;
      const savings = Math.floor(totalRecharges * 0.05);
      
      return {
        totalRecharges,
        thisMonth,
        transactions,
        savings,
        transactionHistory: newHistory,
        notifications: [newNotification, ...prev.notifications]
      };
    });
  };

  return (
    <RechargeContext.Provider value={{ rechargeData, addRecharge }}>
      {children}
    </RechargeContext.Provider>
  );
};
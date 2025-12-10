import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Create Context for shared state
const AppContext = createContext();

// Custom hook to use AppContext
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};

// Simple inline components
const Navbar = ({ userName, onLogout }) => {
  const { theme } = useAppContext();
  
  return (
    <nav style={{
      ...styles.navbar,
      backgroundColor: theme === 'Dark' ? '#1a1a1a' : '#2c3e50'
    }}>
      <div style={styles.navbarLogo}>
        <Link to="/dashboard" style={styles.logoLink}>
          <h1 style={{color: theme === 'Dark' ? '#4da6ff' : '#3498db'}}>MobileRecharge</h1>
        </Link>
      </div>
      
      <div style={styles.navbarMenu}>
        <ul style={styles.menuList}>
          <li style={styles.menuItem}>
            <Link to="/dashboard" style={{
              ...styles.menuLink,
              color: theme === 'Dark' ? '#e0e0e0' : 'white'
            }}>Home</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/recharge" style={{
              ...styles.menuLink,
              color: theme === 'Dark' ? '#e0e0e0' : 'white'
            }}>Recharge</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/plans" style={{
              ...styles.menuLink,
              color: theme === 'Dark' ? '#e0e0e0' : 'white'
            }}>Plans</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/history" style={{
              ...styles.menuLink,
              color: theme === 'Dark' ? '#e0e0e0' : 'white'
            }}>History</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/support" style={{
              ...styles.menuLink,
              color: theme === 'Dark' ? '#e0e0e0' : 'white'
            }}>Support</Link>
          </li>
        </ul>
      </div>
      
      <div style={styles.navbarUser}>
        {userName && <span style={{
          ...styles.userName,
          color: theme === 'Dark' ? '#e0e0e0' : '#ecf0f1'
        }}>Welcome, {userName}</span>}
        <button onClick={onLogout} style={{
          ...styles.logoutBtn,
          backgroundColor: theme === 'Dark' ? '#ff6b6b' : '#e74c3c'
        }}>Logout</button>
      </div>
    </nav>
  );
};

const Sidebar = ({ activeItem, onItemClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const { theme } = useAppContext();

  const menuItems = [
    { id: 1, label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 2, label: 'Quick Recharge', icon: '⚡', path: '/recharge' },
    { id: 3, label: 'My Plans', icon: '📋', path: '/plans' },
    { id: 4, label: 'Transaction History', icon: '📈', path: '/history' },
    { id: 5, label: 'Saved Contacts', icon: '👥', path: '/contacts' },
    { id: 6, label: 'Notifications', icon: '🔔', path: '/notifications' },
    { id: 7, label: 'Settings', icon: '⚙️', path: '/settings' }
  ];

  const handleItemClick = (itemId, path) => {
    onItemClick(itemId);
    navigate(path);
  };

  return (
    <div style={{
      ...styles.sidebar,
      width: isCollapsed ? '80px' : '250px',
      backgroundColor: theme === 'Dark' ? '#1a1a1a' : '#34495e'
    }}>
      <button 
        style={{
          ...styles.sidebarToggle,
          backgroundColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '→' : '←'}
      </button>
      
      <div style={styles.sidebarHeader}>
        {!isCollapsed && <h3 style={{color: theme === 'Dark' ? '#4da6ff' : '#3498db'}}>Menu</h3>}
      </div>
      
      <ul style={styles.sidebarMenu}>
        {menuItems.map(item => (
          <li
            key={item.id}
            style={{
              ...styles.sidebarItem,
              backgroundColor: activeItem === item.id ? 
                (theme === 'Dark' ? '#4da6ff' : '#3498db') : 
                'transparent'
            }}
            onClick={() => handleItemClick(item.id, item.path)}
          >
            <span style={styles.sidebarIcon}>{item.icon}</span>
            {!isCollapsed && (
              <span style={{
                color: theme === 'Dark' ? '#e0e0e0' : 'white'
              }}>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
      
      {!isCollapsed && (
        <div style={{
          ...styles.sidebarPromo,
          backgroundColor: theme === 'Dark' ? '#2c2c2c' : '#2c3e50',
          borderLeftColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
        }}>
          <p style={{color: theme === 'Dark' ? '#e0e0e0' : 'white'}}>
            Get 10% cashback on recharges above ₹500!
          </p>
        </div>
      )}
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <h2>Login to Mobile Recharge</h2>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.formGroup}>
            <label>Username:</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={styles.input}
              required
            />
          </div>
          
          <button type="submit" style={styles.loginBtn}>
            Login
          </button>
        </form>
        
        {/* Demo credentials removed */}
        <div style={styles.welcomeBox}>
          <p>Welcome to Mobile Recharge App</p>
          <p>Enter your credentials to continue</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { addTransaction, addNotification, theme } = useAppContext();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleQuickRecharge = () => {
    if (mobile.length === 10 && amount) {
      const transaction = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        number: mobile,
        amount: parseInt(amount),
        status: 'Success'
      };
      
      const notification = {
        id: Date.now(),
        title: 'Recharge Successful',
        message: `Your recharge of ₹${amount} to ${mobile} was successful`,
        time: 'Just now',
        read: false
      };
      
      addTransaction(transaction);
      addNotification(notification);
      alert(`Recharge successful! ₹${amount} to ${mobile}`);
      setMobile('');
      setAmount('');
    } else {
      alert('Please enter valid mobile number and amount');
    }
  };
  
  return (
    <div style={styles.dashboard}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Welcome to Mobile Recharge Application</h2>
      <p style={{color: theme === 'Dark' ? '#b0b0b0' : '#7f8c8d'}}>Your one-stop solution for all mobile recharge needs</p>
      
      <div style={styles.dashboardCards}>
        <div 
          style={{
            ...styles.dashboardCard,
            backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
            color: theme === 'Dark' ? '#e0e0e0' : 'inherit',
            borderLeftColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }}
          onClick={() => navigate('/recharge')}
        >
          <h3>⚡ Quick Recharge</h3>
          <p>Recharge your mobile instantly</p>
        </div>
        
        <div 
          style={{
            ...styles.dashboardCard,
            backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
            color: theme === 'Dark' ? '#e0e0e0' : 'inherit',
            borderLeftColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }}
          onClick={() => navigate('/plans')}
        >
          <h3>📋 View Plans</h3>
          <p>Browse available plans</p>
        </div>
        
        <div 
          style={{
            ...styles.dashboardCard,
            backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
            color: theme === 'Dark' ? '#e0e0e0' : 'inherit',
            borderLeftColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }}
          onClick={() => navigate('/history')}
        >
          <h3>📈 History</h3>
          <p>View your recharge history</p>
        </div>
      </div>
      
      <div style={{
        ...styles.rechargeCard,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <h3>Quick Recharge</h3>
        <div style={styles.formGroup}>
          <label style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Mobile Number:</label>
          <input 
            type="tel" 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter 10-digit number"
            style={{
              ...styles.input,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
            maxLength="10"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Amount:</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={{
              ...styles.input,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
          />
        </div>
        <button 
          style={styles.rechargeBtn}
          onClick={handleQuickRecharge}
        >
          Proceed to Recharge
        </button>
      </div>
    </div>
  );
};

const Recharge = () => {
  const { addTransaction, addNotification, theme } = useAppContext();
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [operator, setOperator] = useState('');
  const navigate = useNavigate();

  const handleRecharge = () => {
    if (mobile.length === 10 && amount) {
      // Create transaction
      const transaction = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        number: mobile,
        amount: parseInt(amount),
        operator: operator || 'Unknown',
        status: 'Success'
      };
      
      // Create notification
      const notification = {
        id: Date.now(),
        title: 'Recharge Successful',
        message: `Your recharge of ₹${amount} to ${mobile} was successful`,
        time: 'Just now',
        read: false
      };
      
      // Add to shared state
      addTransaction(transaction);
      addNotification(notification);
      
      alert(`Recharge successful! ₹${amount} to ${mobile}`);
      setMobile('');
      setAmount('');
      setOperator('');
      
      // Navigate to history
      navigate('/history');
    } else {
      alert('Please enter valid mobile number and amount');
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Mobile Recharge</h2>
      
      <div style={{
        ...styles.rechargeForm,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <div style={styles.formGroup}>
          <label style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Mobile Number *</label>
          <input 
            type="tel" 
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit number"
            style={{
              ...styles.input,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
            maxLength="10"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Operator</label>
          <select 
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            style={{
              ...styles.select,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
          >
            <option value="">Select Operator</option>
            <option value="airtel">Airtel</option>
            <option value="jio">Jio</option>
            <option value="vi">Vi</option>
            <option value="bsnl">BSNL</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Amount (₹) *</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={{
              ...styles.input,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
          />
          
          <div style={styles.quickAmounts}>
            {[10, 20, 50, 100, 200, 500].map(amt => (
              <button 
                key={amt}
                type="button"
                style={{
                  ...styles.quickBtn,
                  backgroundColor: theme === 'Dark' ? '#3c3c3c' : '#f8f9fa',
                  color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50',
                  borderColor: theme === 'Dark' ? '#555' : '#e0e0e0'
                }}
                onClick={() => setAmount(amt)}
              >
                ₹{amt}
              </button>
            ))}
          </div>
        </div>
        
        <button onClick={handleRecharge} style={styles.rechargeBtn}>
          Recharge Now
        </button>
      </div>
    </div>
  );
};

const Plans = () => {
  const { addTransaction, addNotification, theme } = useAppContext();
  const [operator, setOperator] = useState('airtel');
  const navigate = useNavigate();

  const plans = {
    airtel: [
      { id: 1, name: 'Airtel ₹299 Plan', validity: '28 days', data: '1.5GB/day', price: 299 },
      { id: 2, name: 'Airtel ₹479 Plan', validity: '56 days', data: '1.5GB/day', price: 479 },
      { id: 3, name: 'Airtel ₹719 Plan', validity: '84 days', data: '2GB/day', price: 719 }
    ],
    jio: [
      { id: 1, name: 'Jio ₹299 Plan', validity: '28 days', data: '2GB/day', price: 299 },
      { id: 2, name: 'Jio ₹599 Plan', validity: '84 days', data: '1.5GB/day', price: 599 },
      { id: 3, name: 'Jio ₹999 Plan', validity: '168 days', data: '1.5GB/day', price: 999 }
    ],
    vi: [
      { id: 1, name: 'Vi ₹299 Plan', validity: '28 days', data: '1.5GB/day', price: 299 },
      { id: 2, name: 'Vi ₹699 Plan', validity: '84 days', data: '2GB/day', price: 699 }
    ]
  };

  const handleSelectPlan = (plan) => {
    const transaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      number: '9876543210',
      amount: plan.price,
      operator: operator,
      plan: plan.name,
      status: 'Success'
    };
    
    const notification = {
      id: Date.now(),
      title: 'Plan Recharge Successful',
      message: `Your ${plan.name} recharge of ₹${plan.price} was successful`,
      time: 'Just now',
      read: false
    };
    
    addTransaction(transaction);
    addNotification(notification);
    
    alert(`Selected plan: ${plan.name} for ₹${plan.price}. Recharge successful!`);
    navigate('/history');
  };

  return (
    <div style={styles.page}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Available Plans</h2>
      
      <div style={{
        ...styles.operatorSelector,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <h3>Select Operator:</h3>
        <div style={styles.operatorBtns}>
          <button 
            style={{
              ...styles.operatorBtn,
              backgroundColor: operator === 'airtel' ? 
                (theme === 'Dark' ? '#4da6ff' : '#3498db') : 
                (theme === 'Dark' ? '#3c3c3c' : 'white'),
              color: operator === 'airtel' ? 'white' : 
                (theme === 'Dark' ? '#e0e0e0' : '#3498db'),
              borderColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
            }}
            onClick={() => setOperator('airtel')}
          >
            Airtel
          </button>
          <button 
            style={{
              ...styles.operatorBtn,
              backgroundColor: operator === 'jio' ? 
                (theme === 'Dark' ? '#4da6ff' : '#3498db') : 
                (theme === 'Dark' ? '#3c3c3c' : 'white'),
              color: operator === 'jio' ? 'white' : 
                (theme === 'Dark' ? '#e0e0e0' : '#3498db'),
              borderColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
            }}
            onClick={() => setOperator('jio')}
          >
            Jio
          </button>
          <button 
            style={{
              ...styles.operatorBtn,
              backgroundColor: operator === 'vi' ? 
                (theme === 'Dark' ? '#4da6ff' : '#3498db') : 
                (theme === 'Dark' ? '#3c3c3c' : 'white'),
              color: operator === 'vi' ? 'white' : 
                (theme === 'Dark' ? '#e0e0e0' : '#3498db'),
              borderColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
            }}
            onClick={() => setOperator('vi')}
          >
            Vi
          </button>
        </div>
      </div>
      
      <div style={styles.plansGrid}>
        {plans[operator].map(plan => (
          <div key={plan.id} style={{
            ...styles.planCard,
            backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
            color: theme === 'Dark' ? '#e0e0e0' : 'inherit',
            borderTopColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }}>
            <h3>{plan.name}</h3>
            <div style={styles.planDetails}>
              <p><strong>Validity:</strong> {plan.validity}</p>
              <p><strong>Data:</strong> {plan.data}</p>
              <p><strong>Voice:</strong> Unlimited</p>
              <p><strong>SMS:</strong> 100 SMS/day</p>
            </div>
            <div style={{
              ...styles.planPrice,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : '#f8f9fa'
            }}>
              <h4 style={{color: theme === 'Dark' ? '#4da6ff' : '#27ae60'}}>₹{plan.price}</h4>
            </div>
            <button 
              style={styles.selectBtn}
              onClick={() => handleSelectPlan(plan)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const History = () => {
  const { transactions, clearHistory, theme } = useAppContext();
  
  const addTestTransaction = () => {
    const { addTransaction, addNotification } = useAppContext();
    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      number: '9876543210',
      amount: Math.floor(Math.random() * 500) + 100,
      operator: ['airtel', 'jio', 'vi'][Math.floor(Math.random() * 3)],
      status: Math.random() > 0.2 ? 'Success' : 'Failed'
    };
    
    const notification = {
      id: Date.now(),
      title: newTransaction.status === 'Success' ? 'Recharge Successful' : 'Recharge Failed',
      message: `Recharge of ₹${newTransaction.amount} ${newTransaction.status === 'Success' ? 'was successful' : 'failed'}`,
      time: 'Just now',
      read: false
    };
    
    addTransaction(newTransaction);
    addNotification(notification);
  };

  return (
    <div style={styles.page}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Transaction History</h2>
      
      <div style={styles.historyActions}>
        <button 
          style={{
            ...styles.addHistoryBtn,
            backgroundColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }}
          onClick={addTestTransaction}
        >
          Add Test Transaction
        </button>
        <button 
          style={styles.clearHistoryBtn}
          onClick={clearHistory}
        >
          Clear History
        </button>
      </div>
      
      {transactions.length === 0 ? (
        <div style={{
          ...styles.emptyHistory,
          backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
          color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
        }}>
          <p>No transactions found.</p>
          <p>Your recharge history will appear here.</p>
        </div>
      ) : (
        <>
          <div style={{
            ...styles.historyTable,
            backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white'
          }}>
            <table style={styles.table}>
              <thead>
                <tr style={{backgroundColor: theme === 'Dark' ? '#1a1a1a' : '#34495e'}}>
                  <th style={{color: 'white'}}>Date</th>
                  <th style={{color: 'white'}}>Mobile Number</th>
                  <th style={{color: 'white'}}>Operator</th>
                  <th style={{color: 'white'}}>Amount (₹)</th>
                  <th style={{color: 'white'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id} style={{
                    borderBottomColor: theme === 'Dark' ? '#444' : '#eee',
                    color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
                  }}>
                    <td>{t.date}</td>
                    <td>{t.number}</td>
                    <td>{t.operator || 'Unknown'}</td>
                    <td>₹{t.amount}</td>
                    <td>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: t.status === 'Success' ? 
                          (theme === 'Dark' ? '#2d5a2d' : '#d4f8d4') : 
                          (theme === 'Dark' ? '#5a2d2d' : '#ffebee'),
                        color: t.status === 'Success' ? 
                          (theme === 'Dark' ? '#90ee90' : '#2e7d32') : 
                          (theme === 'Dark' ? '#ffa8a8' : '#c62828')
                      }}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{
            ...styles.historySummary,
            backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
            color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
          }}>
            <h3>Summary</h3>
            <div style={styles.summaryCards}>
              <div style={{
                ...styles.summaryCard,
                backgroundColor: theme === 'Dark' ? '#3c3c3c' : '#f8f9fa',
                color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
              }}>
                <h4>Total Transactions</h4>
                <p>{transactions.length}</p>
              </div>
              <div style={{
                ...styles.summaryCard,
                backgroundColor: theme === 'Dark' ? '#3c3c3c' : '#f8f9fa',
                color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
              }}>
                <h4>Total Amount</h4>
                <p>₹{transactions.reduce((sum, t) => sum + t.amount, 0)}</p>
              </div>
              <div style={{
                ...styles.summaryCard,
                backgroundColor: theme === 'Dark' ? '#3c3c3c' : '#f8f9fa',
                color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
              }}>
                <h4>Successful</h4>
                <p>{transactions.filter(t => t.status === 'Success').length}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Contacts = () => {
  const { contacts, addContact, deleteContact, theme } = useAppContext();
  const [newContact, setNewContact] = useState({ name: '', number: '' });

  const handleAddContact = () => {
    if (newContact.name && newContact.number.length === 10) {
      addContact(newContact);
      setNewContact({ name: '', number: '' });
      alert('Contact added successfully!');
    } else {
      alert('Please enter valid contact details (name and 10-digit number)');
    }
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Delete this contact?')) {
      deleteContact(id);
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Saved Contacts</h2>
      
      <div style={{
        ...styles.contactsForm,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <h3>Add New Contact</h3>
        <div style={styles.formGroup}>
          <label style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Name:</label>
          <input 
            type="text" 
            value={newContact.name}
            onChange={(e) => setNewContact({...newContact, name: e.target.value})}
            placeholder="Contact name"
            style={{
              ...styles.input,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Mobile Number:</label>
          <input 
            type="tel" 
            value={newContact.number}
            onChange={(e) => setNewContact({...newContact, number: e.target.value})}
            placeholder="10-digit number"
            style={{
              ...styles.input,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
            maxLength="10"
          />
        </div>
        <button onClick={handleAddContact} style={styles.addContactBtn}>
          Add Contact
        </button>
      </div>
      
      <div style={{
        ...styles.contactsList,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <h3>Your Contacts ({contacts.length})</h3>
        {contacts.length === 0 ? (
          <p style={styles.noContacts}>No contacts saved yet. Add your first contact above!</p>
        ) : (
          contacts.map(contact => (
            <div key={contact.id} style={{
              ...styles.contactItem,
              borderBottomColor: theme === 'Dark' ? '#444' : '#eee'
            }}>
              <div style={styles.contactInfo}>
                <h4>{contact.name}</h4>
                <p>{contact.number}</p>
              </div>
              <div style={styles.contactActions}>
                <button 
                  style={{
                    ...styles.rechargeContactBtn,
                    backgroundColor: theme === 'Dark' ? '#2d5a2d' : '#27ae60'
                  }}
                  onClick={() => window.location.href = `/recharge`}
                >
                  Recharge
                </button>
                <button 
                  style={styles.deleteContactBtn}
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotifications, theme } = useAppContext();
  
  const addTestNotification = () => {
    const { addNotification } = useAppContext();
    const messages = [
      'New recharge offer available!',
      'Your plan is about to expire',
      'Welcome bonus credited to your account',
      'Special discount on DTH recharge',
      'Refer a friend and earn ₹50 cashback'
    ];
    
    const newNotif = {
      id: Date.now(),
      title: 'New Notification',
      message: messages[Math.floor(Math.random() * messages.length)],
      time: 'Just now',
      read: false
    };
    
    addNotification(newNotif);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={styles.page}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Notifications</h2>
      
      <div style={{
        ...styles.notificationHeader,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <span>You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</span>
        <div>
          <button style={{
            ...styles.notificationActionBtn,
            backgroundColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }} onClick={addTestNotification}>
            Add Test Notification
          </button>
          <button style={{
            ...styles.notificationActionBtn,
            backgroundColor: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }} onClick={markAllAsRead}>
            Mark all as read
          </button>
          <button style={{
            ...styles.notificationActionBtn,
            ...styles.clearBtn,
            backgroundColor: theme === 'Dark' ? '#ff6b6b' : '#e74c3c'
          }} onClick={clearNotifications}>
            Clear all
          </button>
        </div>
      </div>
      
      {notifications.length === 0 ? (
        <div style={{
          ...styles.emptyNotifications,
          backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
          color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
        }}>
          <p>No notifications.</p>
          <p>You're all caught up!</p>
        </div>
      ) : (
        notifications.map(notif => (
          <div 
            key={notif.id} 
            style={{
              ...styles.notificationItem,
              backgroundColor: notif.read ? 
                (theme === 'Dark' ? '#3c3c3c' : '#f8f9fa') : 
                (theme === 'Dark' ? '#1a3a5f' : '#e3f2fd'),
              borderLeft: notif.read ? 
                `4px solid ${theme === 'Dark' ? '#666' : '#95a5a6'}` : 
                `4px solid ${theme === 'Dark' ? '#4da6ff' : '#3498db'}`,
              color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
            }}
          >
            <div style={styles.notificationContent}>
              <h4>{notif.title}</h4>
              <p>{notif.message}</p>
              <span style={{
                ...styles.notificationTime,
                color: theme === 'Dark' ? '#b0b0b0' : '#7f8c8d'
              }}>{notif.time}</span>
            </div>
            {!notif.read && (
              <button 
                style={{
                  ...styles.markReadBtn,
                  backgroundColor: theme === 'Dark' ? '#666' : '#95a5a6'
                }}
                onClick={() => markAsRead(notif.id)}
              >
                Mark as read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const Settings = () => {
  const { theme, settings, updateSettings } = useAppContext();

  const handleSettingChange = (key, value) => {
    updateSettings(key, value);
    
    // Apply theme change immediately
    if (key === 'theme') {
      document.body.style.backgroundColor = value === 'Dark' ? '#121212' : '#f5f7fa';
    }
    
    // Show notification for theme change
    if (key === 'theme') {
      const { addNotification } = useAppContext();
      addNotification({
        id: Date.now(),
        title: 'Theme Changed',
        message: `Theme changed to ${value} mode`,
        time: 'Just now',
        read: false
      });
    }
  };

  const saveSettings = () => {
    alert('Settings saved successfully!');
    const { addNotification } = useAppContext();
    addNotification({
      id: Date.now(),
      title: 'Settings Updated',
      message: 'Your settings have been updated successfully',
      time: 'Just now',
      read: false
    });
  };

  const resetSettings = () => {
    if (window.confirm('Reset all settings to default?')) {
      updateSettings('theme', 'Light');
      updateSettings('language', 'English');
      updateSettings('notifications', true);
      updateSettings('autoRecharge', false);
      updateSettings('emailUpdates', true);
      
      document.body.style.backgroundColor = '#f5f7fa';
      
      const { addNotification } = useAppContext();
      addNotification({
        id: Date.now(),
        title: 'Settings Reset',
        message: 'All settings have been reset to default',
        time: 'Just now',
        read: false
      });
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Settings</h2>
      
      <div style={{
        ...styles.settingsCard,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <h3>General Settings</h3>
        
        <div style={styles.settingItem}>
          <label>Theme:</label>
          <select 
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
            style={{
              ...styles.select,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
        
        <div style={styles.settingItem}>
          <label>Language:</label>
          <select 
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            style={{
              ...styles.select,
              backgroundColor: theme === 'Dark' ? '#3c3c3c' : 'white',
              color: theme === 'Dark' ? '#e0e0e0' : '#333',
              borderColor: theme === 'Dark' ? '#555' : '#ddd'
            }}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </select>
        </div>
        
        <div style={styles.settingItem}>
          <label style={styles.toggleLabel}>
            <input 
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              style={styles.checkbox}
            />
            Enable Notifications
          </label>
        </div>
        
        <div style={styles.settingItem}>
          <label style={styles.toggleLabel}>
            <input 
              type="checkbox"
              checked={settings.autoRecharge}
              onChange={(e) => handleSettingChange('autoRecharge', e.target.checked)}
              style={styles.checkbox}
            />
            Auto Recharge
          </label>
        </div>
        
        <div style={styles.settingItem}>
          <label style={styles.toggleLabel}>
            <input 
              type="checkbox"
              checked={settings.emailUpdates}
              onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
              style={styles.checkbox}
            />
            Email Updates
          </label>
        </div>
      </div>
      
      <div style={{
        ...styles.settingsCard,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <h3>Account Actions</h3>
        <button style={styles.saveBtn} onClick={saveSettings}>
          Save Settings
        </button>
        <button style={styles.resetBtn} onClick={resetSettings}>
          Reset to Default
        </button>
        <button style={styles.dangerBtn}>
          Change Password
        </button>
      </div>
    </div>
  );
};

const Support = () => {
  const { theme } = useAppContext();
  
  return (
    <div style={styles.page}>
      <h2 style={{color: theme === 'Dark' ? '#e0e0e0' : '#2c3e50'}}>Support Center</h2>
      
      <div style={styles.supportCards}>
        <div style={{
          ...styles.supportCard,
          backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
          color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
        }}>
          <h3>📞 Call Support</h3>
          <p>24/7 Customer Support</p>
          <p style={{
            ...styles.supportNumber,
            color: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }}>1800-123-4567</p>
          <button style={styles.supportBtn} onClick={() => alert('Calling support...')}>
            Call Now
          </button>
        </div>
        
        <div style={{
          ...styles.supportCard,
          backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
          color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
        }}>
          <h3>✉️ Email Support</h3>
          <p>Response within 24 hours</p>
          <p style={{
            ...styles.supportEmail,
            color: theme === 'Dark' ? '#4da6ff' : '#3498db'
          }}>support@mobilerecharge.com</p>
          <button style={styles.supportBtn} onClick={() => window.location.href = 'mailto:support@mobilerecharge.com'}>
            Send Email
          </button>
        </div>
        
        <div style={{
          ...styles.supportCard,
          backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
          color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
        }}>
          <h3>💬 Live Chat</h3>
          <p>Chat with our agents</p>
          <button style={styles.supportBtn} onClick={() => alert('Opening live chat...')}>
            Start Chat
          </button>
        </div>
      </div>
      
      <div style={{
        ...styles.faqSection,
        backgroundColor: theme === 'Dark' ? '#2c2c2c' : 'white',
        color: theme === 'Dark' ? '#e0e0e0' : 'inherit'
      }}>
        <h3>Frequently Asked Questions</h3>
        <div style={styles.faqItem}>
          <h4>How do I recharge my mobile?</h4>
          <p>Go to Recharge page, enter mobile number and amount, then click Recharge Now.</p>
        </div>
        <div style={styles.faqItem}>
          <h4>How long does recharge take?</h4>
          <p>Most recharges are instant. Some may take up to 5 minutes.</p>
        </div>
        <div style={styles.faqItem}>
          <h4>Can I cancel a recharge?</h4>
          <p>No, once recharge is processed it cannot be cancelled.</p>
        </div>
        <div style={styles.faqItem}>
          <h4>Is my payment secure?</h4>
          <p>Yes, we use SSL encryption to secure all transactions.</p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { theme } = useAppContext();
  
  return (
    <footer style={{
      ...styles.footer,
      backgroundColor: theme === 'Dark' ? '#1a1a1a' : '#2c3e50'
    }}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <h3 style={{color: theme === 'Dark' ? '#4da6ff' : '#3498db'}}>Quick Links</h3>
          <ul style={styles.footerList}>
            <li><Link to="/dashboard" style={{
              ...styles.footerLink,
              color: theme === 'Dark' ? '#e0e0e0' : '#ecf0f1'
            }}>Home</Link></li>
            <li><Link to="/recharge" style={{
              ...styles.footerLink,
              color: theme === 'Dark' ? '#e0e0e0' : '#ecf0f1'
            }}>Recharge</Link></li>
            <li><Link to="/plans" style={{
              ...styles.footerLink,
              color: theme === 'Dark' ? '#e0e0e0' : '#ecf0f1'
            }}>Plans</Link></li>
            <li><Link to="/support" style={{
              ...styles.footerLink,
              color: theme === 'Dark' ? '#e0e0e0' : '#ecf0f1'
            }}>Support</Link></li>
          </ul>
        </div>
        
        <div style={styles.footerSection}>
          <h3 style={{color: theme === 'Dark' ? '#4da6ff' : '#3498db'}}>Contact Info</h3>
          <p style={{color: theme === 'Dark' ? '#b0b0b0' : '#ecf0f1'}}>Email: support@mobilerecharge.com</p>
          <p style={{color: theme === 'Dark' ? '#b0b0b0' : '#ecf0f1'}}>Phone: 1800-123-4567</p>
          <p style={{color: theme === 'Dark' ? '#b0b0b0' : '#ecf0f1'}}>Available 24/7</p>
        </div>
      </div>
      
      <div style={styles.footerBottom}>
        <p style={{color: theme === 'Dark' ? '#888' : '#95a5a6'}}>© 2024 MobileRecharge. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main App Component with Context
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeSidebarItem, setActiveSidebarItem] = useState(1);
  
  // Shared state
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-03-15', number: '9876543210', operator: 'Airtel', amount: 299, status: 'Success' },
    { id: 2, date: '2024-03-10', number: '9876543210', operator: 'Jio', amount: 599, status: 'Success' }
  ]);
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Welcome!', message: 'Welcome to Mobile Recharge App', time: '2 days ago', read: true },
    { id: 2, title: 'New Feature', message: 'Check out our new plans page', time: '1 day ago', read: false }
  ]);
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', number: '9876543210' },
    { id: 2, name: 'Jane Smith', number: '9876543211' }
  ]);
  
  const [settings, setSettings] = useState({
    theme: 'Light',
    language: 'English',
    notifications: true,
    autoRecharge: false,
    emailUpdates: true
  });

  // Shared functions
  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setTransactions([]);
      alert('History cleared!');
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    alert('All notifications marked as read!');
  };

  const clearNotifications = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  const addContact = (contact) => {
    const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    setContacts(prev => [...prev, { id: newId, ...contact }]);
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const updateSettings = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogin = (username) => {
    setUserName(username);
    setIsLoggedIn(true);
    addNotification({
      id: Date.now(),
      title: 'Login Successful',
      message: `Welcome back, ${username}!`,
      time: 'Just now',
      read: false
    });
  };

  const handleLogout = () => {
    addNotification({
      id: Date.now(),
      title: 'Logout Successful',
      message: 'You have been logged out successfully',
      time: 'Just now',
      read: false
    });
    setIsLoggedIn(false);
    setUserName('');
  };

  // Context value
  const contextValue = {
    theme: settings.theme,
    transactions,
    notifications,
    contacts,
    settings,
    addTransaction,
    clearHistory,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    addContact,
    deleteContact,
    updateSettings
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: settings.theme === 'Dark' ? '#121212' : '#f5f7fa',
          color: settings.theme === 'Dark' ? '#e0e0e0' : '#333',
          transition: 'background-color 0.3s, color 0.3s'
        }}>
          {isLoggedIn && <Navbar userName={userName} onLogout={handleLogout} />}
          
          <div style={styles.mainContent}>
            {isLoggedIn && (
              <Sidebar 
                activeItem={activeSidebarItem}
                onItemClick={setActiveSidebarItem}
              />
            )}
            
            <div style={{
              flex: 1,
              padding: '2rem',
              overflowY: 'auto',
              backgroundColor: settings.theme === 'Dark' ? '#121212' : '#f5f7fa',
              color: settings.theme === 'Dark' ? '#e0e0e0' : '#333',
              transition: 'background-color 0.3s, color 0.3s'
            }}>
              <Routes>
                <Route path="/" element={
                  isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
                } />
                
                <Route path="/login" element={
                  isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
                } />
                
                <Route path="/dashboard" element={
                  isLoggedIn ? <Dashboard /> : <Navigate to="/login" />
                } />
                
                <Route path="/recharge" element={
                  isLoggedIn ? <Recharge /> : <Navigate to="/login" />
                } />
                
                <Route path="/plans" element={
                  isLoggedIn ? <Plans /> : <Navigate to="/login" />
                } />
                
                <Route path="/history" element={
                  isLoggedIn ? <History /> : <Navigate to="/login" />
                } />
                
                <Route path="/contacts" element={
                  isLoggedIn ? <Contacts /> : <Navigate to="/login" />
                } />
                
                <Route path="/notifications" element={
                  isLoggedIn ? <Notifications /> : <Navigate to="/login" />
                } />
                
                <Route path="/settings" element={
                  isLoggedIn ? <Settings /> : <Navigate to="/login" />
                } />
                
                <Route path="/support" element={
                  isLoggedIn ? <Support /> : <Navigate to="/login" />
                } />
              </Routes>
            </div>
          </div>
          
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

// Styles object
const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s, color 0.3s'
  },
  navbar: {
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s'
  },
  navbarLogo: {
    flex: 1
  },
  logoLink: {
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  navbarMenu: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center'
  },
  menuList: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0
  },
  menuItem: {
    margin: 0
  },
  menuLink: {
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s'
  },
  navbarUser: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '1rem'
  },
  userName: {
    transition: 'color 0.3s'
  },
  logoutBtn: {
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  sidebar: {
    transition: 'width 0.3s, background-color 0.3s',
    padding: '1rem',
    minHeight: 'calc(100vh - 120px)',
    position: 'relative'
  },
  sidebarToggle: {
    position: 'absolute',
    top: '1rem',
    right: '-15px',
    color: 'white',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  sidebarHeader: {
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '1rem'
  },
  sidebarMenu: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  sidebarItem: {
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s'
  },
  sidebarIcon: {
    fontSize: '1.2rem',
    marginRight: '1rem',
    width: '24px',
    textAlign: 'center'
  },
  sidebarPromo: {
    marginTop: '2rem',
    padding: '1rem',
    borderRadius: '4px',
    borderLeft: '4px solid',
    transition: 'background-color 0.3s, border-color 0.3s'
  },
  mainContent: {
    display: 'flex',
    flex: 1
  },
  contentArea: {
    flex: 1,
    padding: '2rem',
    overflowY: 'auto',
    transition: 'background-color 0.3s, color 0.3s'
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 100px)'
  },
  loginCard: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  loginForm: {
    marginBottom: '1.5rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
  },
  loginBtn: {
    backgroundColor: '#28a745', // Green color for login button
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  welcomeBox: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f0f8ff',
    borderRadius: '8px',
    borderLeft: '4px solid #3498db',
    textAlign: 'center',
    color: '#2c3e50'
  },
  dashboard: {
    width: '100%'
  },
  dashboardCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    margin: '2rem 0'
  },
  dashboardCard: {
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    borderLeft: '4px solid',
    transition: 'transform 0.3s, background-color 0.3s, color 0.3s, border-color 0.3s'
  },
  rechargeCard: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    maxWidth: '500px',
    marginTop: '2rem',
    transition: 'background-color 0.3s, color 0.3s'
  },
  rechargeBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  page: {
    width: '100%'
  },
  rechargeForm: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    maxWidth: '500px',
    marginTop: '1rem',
    transition: 'background-color 0.3s, color 0.3s'
  },
  quickAmounts: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginTop: '0.75rem'
  },
  quickBtn: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    border: '2px solid',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
  },
  operatorSelector: {
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    margin: '1rem 0',
    transition: 'background-color 0.3s, color 0.3s'
  },
  operatorBtns: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  operatorBtn: {
    padding: '0.75rem 1.5rem',
    border: '2px solid',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
  },
  activeOperator: {
    backgroundColor: '#3498db',
    color: 'white'
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem'
  },
  planCard: {
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    borderTop: '4px solid',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
  },
  planDetails: {
    margin: '1.5rem 0'
  },
  planPrice: {
    textAlign: 'center',
    margin: '1rem 0',
    padding: '1rem',
    borderRadius: '8px',
    transition: 'background-color 0.3s'
  },
  selectBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s'
  },
  select: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid',
    width: '150px',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
  },
  historyActions: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  addHistoryBtn: {
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  clearHistoryBtn: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  emptyHistory: {
    padding: '3rem',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'background-color 0.3s, color 0.3s'
  },
  historyTable: {
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginTop: '1rem',
    transition: 'background-color 0.3s'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  statusBadge: {
    padding: '0.375rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    display: 'inline-block',
    transition: 'background-color 0.3s, color 0.3s'
  },
  historySummary: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginTop: '2rem',
    transition: 'background-color 0.3s, color 0.3s'
  },
  summaryCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  summaryCard: {
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'background-color 0.3s, color 0.3s'
  },
  contactsForm: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginBottom: '2rem',
    transition: 'background-color 0.3s, color 0.3s'
  },
  addContactBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s'
  },
  contactsList: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'background-color 0.3s, color 0.3s'
  },
  contactItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid',
    marginBottom: '0.5rem',
    transition: 'border-color 0.3s'
  },
  contactInfo: {
    flex: 1
  },
  contactActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  rechargeContactBtn: {
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  deleteContactBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  noContacts: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d'
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s, color 0.3s'
  },
  notificationActionBtn: {
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    transition: 'background-color 0.3s'
  },
  clearBtn: {
    backgroundColor: '#e74c3c'
  },
  notificationItem: {
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '0.75rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.3s, color 0.3s, border-color 0.3s'
  },
  notificationContent: {
    flex: 1
  },
  notificationTime: {
    fontSize: '0.875rem',
    transition: 'color 0.3s'
  },
  markReadBtn: {
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'background-color 0.3s'
  },
  emptyNotifications: {
    padding: '3rem',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    transition: 'background-color 0.3s, color 0.3s'
  },
  settingsCard: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginBottom: '1.5rem',
    transition: 'background-color 0.3s, color 0.3s'
  },
  settingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  saveBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '1rem',
    marginTop: '0.5rem',
    transition: 'background-color 0.3s'
  },
  resetBtn: {
    backgroundColor: '#f39c12',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '1rem',
    marginTop: '0.5rem',
    transition: 'background-color 0.3s'
  },
  dangerBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '1rem',
    marginTop: '0.5rem',
    transition: 'background-color 0.3s'
  },
  supportCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    margin: '2rem 0'
  },
  supportCard: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    textAlign: 'center',
    transition: 'background-color 0.3s, color 0.3s'
  },
  supportNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '1rem 0',
    transition: 'color 0.3s'
  },
  supportEmail: {
    fontSize: '1.2rem',
    margin: '1rem 0',
    transition: 'color 0.3s'
  },
  supportBtn: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem',
    width: '100%',
    transition: 'background-color 0.3s'
  },
  faqSection: {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    marginTop: '2rem',
    transition: 'background-color 0.3s, color 0.3s'
  },
  faqItem: {
    marginBottom: '1.5rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  footer: {
    padding: '2rem',
    marginTop: 'auto',
    transition: 'background-color 0.3s'
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '2rem'
  },
  footerSection: {
    flex: 1,
    minWidth: '200px'
  },
  footerList: {
    listStyle: 'none',
    padding: 0
  },
  footerLink: {
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
    transition: 'color 0.3s'
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  }
};

export default App;
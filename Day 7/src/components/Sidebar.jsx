import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ menuItems, activeItem, onItemClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const defaultMenuItems = [
    { id: 1, label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 2, label: 'Quick Recharge', icon: '⚡', path: '/recharge' },
    { id: 3, label: 'My Plans', icon: '📋', path: '/plans' },
    { id: 4, label: 'Transaction History', icon: '📈', path: '/history' },
    { id: 5, label: 'Saved Contacts', icon: '👥', path: '/dashboard' },
    { id: 6, label: 'Notifications', icon: '🔔', path: '/dashboard' },
    { id: 7, label: 'Settings', icon: '⚙️', path: '/dashboard' }
  ];

  const handleItemClick = (itemId, path) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
    navigate(path);
  };

  const itemsToUse = menuItems || defaultMenuItems;

  return (
    <div style={styles.sidebar}>
      <button style={styles.sidebarToggle} onClick={handleToggle}>
        {isCollapsed ? '→' : '←'}
      </button>
      
      <div style={styles.sidebarHeader}>
        {!isCollapsed && <h3 style={styles.sidebarTitle}>Menu</h3>}
      </div>
      
      <ul style={styles.sidebarMenu}>
        {itemsToUse.map(item => (
          <li
            key={item.id}
            style={{
              ...styles.sidebarItem,
              ...(activeItem === item.id ? styles.activeItem : {})
            }}
            onClick={() => handleItemClick(item.id, item.path)}
          >
            <span style={styles.sidebarIcon}>{item.icon}</span>
            {!isCollapsed && <span style={styles.sidebarLabel}>{item.label}</span>}
          </li>
        ))}
      </ul>
      
      {!isCollapsed && (
        <div style={styles.sidebarPromo}>
          <p>Get 10% cashback on recharges above ₹500!</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  // ... your existing sidebar styles
};

export default Sidebar;
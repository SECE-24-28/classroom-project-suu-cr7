import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userName, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLogo}>
        <Link to="/dashboard" style={styles.logoLink}>
          <h1 style={styles.logoText}>MobileRecharge</h1>
        </Link>
      </div>
      
      <div style={styles.navbarMenu}>
        <ul style={styles.menuList}>
          <li style={styles.menuItem}>
            <Link to="/dashboard" style={styles.menuLink}>Home</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/recharge" style={styles.menuLink}>Recharge</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/plans" style={styles.menuLink}>Plans</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/history" style={styles.menuLink}>History</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="/support" style={styles.menuLink}>Support</Link>
          </li>
        </ul>
      </div>
      
      <div style={styles.navbarUser}>
        {userName && <span style={styles.userName}>Welcome, {userName}</span>}
        <button onClick={onLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  // ... keep your existing styles, just update the menuLink
  menuLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  }
  // ... rest of your styles
};

export default Navbar;
import React from 'react';
import './Footer.css';

const Footer = ({ companyName = "MobileRecharge Inc.", currentYear = new Date().getFullYear() }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Mobile Recharge</li>
            <li>DTH Recharge</li>
            <li>Data Card Recharge</li>
            <li>Electricity Bill</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>Email: support@mobilerecharge.com</p>
          <p>Phone: 1800-123-4567</p>
          <p>Available 24/7</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} {companyName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
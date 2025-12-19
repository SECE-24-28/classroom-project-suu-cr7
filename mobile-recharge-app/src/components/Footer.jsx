const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MobileRecharge</h3>
            <p className="text-gray-400">India's most trusted recharge platform</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Mobile Recharge</li>
              <li>Bill Payments</li>
              <li>DTH Recharge</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Download App</h4>
            <div className="space-y-2">
              <div className="bg-gray-700 px-3 py-2 rounded text-sm">Play Store</div>
              <div className="bg-gray-700 px-3 py-2 rounded text-sm">App Store</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 MobileRecharge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
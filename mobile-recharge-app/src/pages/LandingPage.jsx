import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import htmllImg from '../assets/htmll.jpeg';
import irImg from '../assets/ir.jpeg';
import documentsImg from '../assets/documents.jpeg';
import seImg from '../assets/se.jpeg';
import suImg from '../assets/su.png';
import airImg from '../assets/air.png';
import jioImg from '../assets/jio.png';
import voImg from '../assets/vo.jpeg';
import bsnlImg from '../assets/bsnl.png';

const LandingPage = () => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-blue-100'} min-h-screen`}>
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={htmllImg} alt="Mobile Devices" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-4">Recharge Online</h1>
          <p className="text-2xl mb-8">Faster recharges - anywhere, any time</p>
          <div className="flex justify-center space-x-4">
            <Link to="/recharge" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Recharge Now</Link>
            <Link to="/plans" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition">View Plans</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src={irImg} alt="Instant Recharge" className="w-20 h-20 mx-auto mb-4 rounded animate-bounce" />
              <h3 className="font-semibold mb-2 text-lg">Instant Recharge</h3>
              <p className="text-gray-600 text-sm mb-4">Lightning-fast recharge completed in seconds with 99.9% success rate</p>
              <Link to="/plans" className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-90 transition">Learn More</Link>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src={documentsImg} alt="Best Offers" className="w-20 h-20 mx-auto mb-4 rounded animate-bounce" />
              <h3 className="font-semibold mb-2 text-lg">Best Offers</h3>
              <p className="text-gray-600 text-sm mb-4">Exclusive cashback, rewards and special discounts on every recharge</p>
              <Link to="/plans" className="bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-90 transition">View Offers</Link>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src={seImg} alt="100% Secure" className="w-24 h-24 mx-auto mb-4 rounded animate-bounce" />
              <h3 className="font-semibold mb-2 text-lg">100% Secure</h3>
              <p className="text-gray-600 text-sm mb-4">Bank-grade security with SSL encryption and secure payment gateway</p>
              <button className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-90 transition">Security Info</button>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <img src={suImg} alt="24/7 Support" className="w-24 h-24 mx-auto mb-4 rounded animate-bounce" />
              <h3 className="font-semibold mb-2 text-lg">24/7 Support</h3>
              <p className="text-gray-600 text-sm mb-4">Round-the-clock customer support via chat, call and email</p>
              <button className="bg-secondary text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-90 transition">Get Help</button>
            </div>
          </div>
        </div>
      </div>

      {/* Operators Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">All Operators Supported</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img src={airImg} alt="Airtel" className="w-16 h-16 mx-auto mb-3 rounded hover:scale-110 transition-transform" />
            <h3 className="font-semibold">Airtel</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img src={jioImg} alt="Jio" className="w-16 h-16 mx-auto mb-3 rounded hover:scale-110 transition-transform" />
            <h3 className="font-semibold">Jio</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img src={voImg} alt="Vodafone" className="w-16 h-16 mx-auto mb-3 rounded hover:scale-110 transition-transform" />
            <h3 className="font-semibold">Vi</h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img src={bsnlImg} alt="BSNL" className="w-16 h-16 mx-auto mb-3 rounded hover:scale-110 transition-transform" />
            <h3 className="font-semibold">BSNL</h3>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Recharge?</h2>
          <p className="text-xl mb-6">Join millions of satisfied customers</p>
          <Link to="/recharge" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Start Recharging</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
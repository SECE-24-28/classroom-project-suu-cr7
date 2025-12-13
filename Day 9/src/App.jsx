import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RechargeProvider } from './context/RechargeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RechargePlans from './pages/RechargePlans';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './pages/TransactionHistory';
import ContactUs from './pages/ContactUs';
import Notifications from './pages/Notifications';
import MobileRecharge from './pages/MobileRecharge';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RechargeProvider>
          <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/plans" element={<RechargePlans />} />
                <Route path="/recharge" element={<MobileRecharge />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<TransactionHistory />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
          </Router>
        </RechargeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
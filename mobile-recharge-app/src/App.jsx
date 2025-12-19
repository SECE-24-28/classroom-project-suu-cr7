import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { RechargeProvider } from './context/RechargeContext';
import { PlansProvider } from './context/PlansContext';
import ProtectedRoute from './routes/ProtectedRoute';
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
import AdminDashboard from './pages/AdminDashboard';
import AdminPlans from './pages/AdminPlans';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlansProvider>
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
                <Route path="/history" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/plans" element={<ProtectedRoute adminOnly><AdminPlans /></ProtectedRoute>} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
              </Routes>
            </main>
            <Footer />
          </div>
            </Router>
          </RechargeProvider>
        </PlansProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
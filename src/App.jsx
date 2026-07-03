import React, { useState, useEffect } from 'react'; // <-- ADDED useEffect HERE
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Combined imports

// Import Components
import Contact from './pages/Contact';
import FloatingContact from './components/FloatingContact';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';

// Import Pages
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Photos from './pages/Photos';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; 
import Catalogues from './pages/Catalogues';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({ isOpen: false, product: '' });

  // Silent verification check on page load/refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_BASE_URL}/api/quotes`, {
          method: 'GET',
          credentials: 'include',
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const openQuoteModal = (productName = '') => {
    setModalState({ isOpen: true, product: productName });
  };

  const closeQuoteModal = () => {
    setModalState({ isOpen: false, product: '' });
  };

  // Wait for the backend to check the cookie before drawing the page
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        
        {/* Global Navbar */}
        <Navbar onActionClick={() => openQuoteModal('General Inquiry')} />

        {/* Hero Section */}
        {/* <HeroCarousel /> */}
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onCallModal={openQuoteModal} />} />
            <Route path="/products" element={<Products onCallModal={openQuoteModal} />} />
            <Route path="/products/:id" element={<ProductDetail onCallModal={openQuoteModal} />} />
            <Route path="/about" element={<About onCallModal={openQuoteModal} />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/catalogues" element={<Catalogues />} />
            <Route path="/contact" element={<Contact />} />
            {/* Public Login Route */}
            <Route path="/login" element={<AdminLogin onLogin={setIsAuthenticated} />} />

            {/* Protected Admin Route */}
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Lead Capture Form Popup Overlay */}
        <QuoteModal 
          isOpen={modalState.isOpen} 
          onClose={closeQuoteModal} 
          selectedProduct={modalState.product}
        />

        <FloatingContact />
        
      </div>
    </Router>
  );
}

export default App;
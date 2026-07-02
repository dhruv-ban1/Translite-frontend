import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Send } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, selectedProduct }) {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    requirement: selectedProduct || '',
  });

  // Automatically update the requirement if the user changes the clicked product
  React.useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, requirement: selectedProduct }));
    }
  }, [selectedProduct]);

const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // THIS IS THE CONNECTION TO THE BACKEND
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Thank you ${formData.name}! Your request has been logged.`);
        setFormData({ name: '', mobileNumber: '', requirement: '' });
        onClose();
      } else {
        alert("The server rejected the request. Check your backend terminal.");
      }
    } catch (error) {
      console.error("Frontend failed to connect to backend:", error);
      alert("Network error. Is your Node server running on port 5000?");
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Blur & Darkened Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl p-8 overflow-hidden z-10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-1">
                Get Bulk/Retail Quotes
              </span>
              <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                Request Specifications
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name / Company
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Ashok Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Mobile Number*
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                    +91
                  </span>
                  <input 
                    type="tel" 
                    required
                    pattern="[0-9]{10}"
                    placeholder="98100 XXXXX"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all text-sm font-medium tracking-wide"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Material / Requirement Details
                </label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Tell us about the thickness, size, or structural fabrication project details..."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-600 transition-all text-sm"
                />
              </div>

              {/* Trust Factor info */}
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your requirement is securely sent directly to Praveen Bansal (Proprietor).</span>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all active:scale-98 mt-2"
              >
                <Send className="w-4 h-4" />
                Submit Requirement
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
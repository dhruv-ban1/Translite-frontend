import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use environment variable for deployed backend, fallback to localhost for dev
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
        const res = await fetch(`${API_BASE_URL}/api/quotes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // 1. Matches exactly
            name: formData.name, 
            
            // 2. Map the frontend 'phone' to the backend 'mobileNumber'
            mobileNumber: formData.phone, 
            
            // 3. Combine the email and message into the required 'requirement' field so you don't lose the email data!
            requirement: `Email: ${formData.email || 'Not provided'} | Message: ${formData.message}` 
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' }); // Clear form
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen pt-24 pb-20 font-body-md">
      
      {/* Header */}
      <div className="bg-white border-b border-stone-200 mb-12 pb-16 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-50 rounded-full blur-3xl -z-10 opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <span className="text-orange-600 font-bold tracking-widest mb-4 block uppercase text-sm">
            We're Here To Help
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6">
            Get in <span className="text-orange-600">Touch</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Whether you need a custom quote, technical assistance, or bulk order pricing, our team is ready to help you find the perfect materials.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Interactive Contact Information Cards */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* Address (Clickable to Google Maps) */}
            <a 
              href="https://maps.google.com/?q=Sector+9+Noida+Uttar+Pradesh+201301" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-white p-6 rounded-2xl border border-stone-100 shadow-xl shadow-stone-200/40 flex items-start gap-5 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300"
            >
              <div className="bg-stone-100 p-3.5 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-lg group-hover:text-orange-600 transition-colors">Office & Factory</h3>
                <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
                  E-32 & E-36, Sector 9<br />Noida, Uttar Pradesh 201301
                </p>
              </div>
            </a>

            {/* Phone (Clickable to dial) */}
            <a 
              href="tel:+919876543210" 
              className="group block bg-white p-6 rounded-2xl border border-stone-100 shadow-xl shadow-stone-200/40 flex items-start gap-5 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300"
            >
              <div className="bg-stone-100 p-3.5 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-lg group-hover:text-orange-600 transition-colors">Call Us</h3>
                <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
                  +91 9910346546<br />+91 98181 14506
                </p>
              </div>
            </a>

            {/* Email (Clickable to draft email) */}
            <a 
              href="mailto:fibergallery96@gmail.com" 
              className="group block bg-white p-6 rounded-2xl border border-stone-100 shadow-xl shadow-stone-200/40 flex items-start gap-5 hover:-translate-y-1 hover:border-orange-200 transition-all duration-300"
            >
              <div className="bg-stone-100 p-3.5 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-lg group-hover:text-orange-600 transition-colors">Email Us</h3>
                <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
                  fibergallery96@gmail.com<br />bansalfiber@gmail.com
                </p>
              </div>
            </a>

            {/* Business Hours (Static) */}
            <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-xl shadow-stone-200/40 flex items-start gap-5">
              <div className="bg-stone-100 p-3.5 rounded-xl text-stone-600 shadow-sm shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-lg">Business Hours</h3>
                <p className="text-stone-600 text-sm mt-1.5 leading-relaxed">
                  Monday - Saturday<br />9:00 AM - 6:30 PM<br />Sunday: 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form connected to API */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/50">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8">Send us a Message</h2>
            
            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center py-16">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-green-700">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitStatus(null)}
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 mb-6">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">Something went wrong while sending your message. Please try again or contact us directly via phone.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-stone-900" 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-stone-900" 
                      placeholder="+91 00000 00000" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-stone-900" 
                    placeholder="john@company.com" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">How can we help you? <span className="text-red-500">*</span></label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5" 
                    className="w-full px-5 py-3.5 bg-stone-50 rounded-xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none transition-all text-stone-900" 
                    placeholder="Tell us about your requirements, sizes, or project details..." 
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
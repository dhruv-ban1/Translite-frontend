import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 mb-12 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Get in <span className="text-orange-600">Touch</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you need a custom quote, technical assistance, or bulk order pricing, our team is ready to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Information Cards */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Office & Factory</h3>
                <p className="text-slate-600 text-sm mt-1">E -32 & E 36 SECTOR 9<br />Noida, Uttar Pradesh 201301</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Call Us</h3>
                <p className="text-slate-600 text-sm mt-1">98765 43210<br /> 98765 00000</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Email Us</h3>
                <p className="text-slate-600 text-sm mt-1">fibergallery96@gmail.com<br />bansalfiber@gmail.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="bg-slate-100 p-3 rounded-lg text-slate-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Business Hours</h3>
                <p className="text-slate-600 text-sm mt-1">Monday - Saturday<br />9:00 AM - 6:30 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Form integration coming soon!'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none" placeholder="+91 00000 00000" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none" placeholder="john@company.com" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">How can we help you?</label>
                <textarea rows="5" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none resize-none" placeholder="Tell us about your requirements, sizes, or project details..." required></textarea>
              </div>

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md">
                <Send className="w-5 h-5" />
                Send Inquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
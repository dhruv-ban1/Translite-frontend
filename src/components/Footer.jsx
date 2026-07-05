import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react'; // Removed the social icons from here
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaPinterest
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 font-body-md border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Company Info */}
          <div>
            <img src="/logos/shopLogo.jpeg" 
            alt="Fiber Gallery Logo"
            className="w-20 h-25 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {/* <h3 className="text-2xl font-extrabold text-orange-500 mb-4">Fiber Gallery</h3> */}
            <p className="text-[15px] leading-7 text-slate-400 max-w-xs">
              India's premier manufacturer and distributor of high-performance architectural materials, fiberglass, and polycarbonate solutions.
            </p>
            {/* Social Icons (Using standard SVGs instead of Lucide) */}
              <div className="flex gap-5 mt-6">

                <a href="https://www.facebook.com/share/1EoGtzN1uB/" className="text-slate-400 hover:text-[#1877F2] transition-all duration-300 hover:-translate-y-1">
                  <FaFacebook size={24}/>
                </a>

                <a href="https://www.instagram.com/fiber_gallery_96" className="text-slate-400 hover:text-[#E4405F] transition-all duration-300 hover:-translate-y-1">
                  <FaInstagram size={24}/>
                </a>

                <a href="https://wa.me/919910346546" className="text-slate-400 hover:text-[#25D366] transition-all duration-300 hover:-translate-y-1">
                  <FaWhatsapp size={24}/>
                </a>

                <a href="https://www.youtube.com/@FiberGallery96" className="text-slate-400 hover:text-[#FF0000] transition-all duration-300 hover:-translate-y-1">
                  <FaYoutube size={24}/>
                </a>

              </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-orange-500 transition-colors">Products</Link></li>
              <li><Link to="/catalogues" className="hover:text-orange-500 transition-colors">Resource Library</Link></li>
              <li><Link to="/photos" className="hover:text-orange-500 transition-colors">Our Work</Link></li>
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-sm">E -32 & E 36 SECTOR 9<br />Noida, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="tel:+919818114506" className="text-sm hover:text-white transition-colors">+91 9818114506 <br />+91 9910346546</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="mailto:fibergallery96@gmail.com" className="text-sm hover:text-white transition-colors">fibergallery96@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Get a Quote</h4>
            <p className="text-sm mb-4 text-slate-400">Need pricing for a bulk order or custom fabrication? Reach out today.</p>
            <Link 
              to="/contact" 
              className="inline-block bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors w-full text-center"
            >
              Contact Sales Team
            </Link>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Translite Fiber Gallery. All rights reserved.</p>
          <p>Designed & Developed by <a href="https://www.linkedin.com/in/dhruv-bansal-9150b1256/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-white transition-colors">Dhruv Bansal</a></p>
        </div>
      </div>
    </footer>
  );
}
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation Links array
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'e-Catalogues', path: '/catalogues' },
    { name: 'Projects', path: '/photos' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo / Branding Section */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logos/shopLogo.jpeg" 
                alt="Fiber Gallery Logo"
                className="w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-500 group-hover:scale-105 rounded-md shadow-sm"
              />
              <div className="flex flex-col justify-center">
                {/* Glowing Text Effect */}
                <span className="text-xl md:text-2xl font-black uppercase tracking-wider transition-all duration-300">
                  <span className="text-stone-900 group-hover:drop-shadow-[0_0_8px_rgba(234,88,12,0.4)]">Fiber </span>
                  <span className="text-orange-600 drop-shadow-[0_0_12px_rgba(234,88,12,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(234,88,12,0.8)]">Gallery</span>
                </span>
                {/* <span className="text-[10px] md:text-xs font-bold text-stone-500 tracking-[0.2em] uppercase mt-0.5">
                  Industrial Solutions
                </span> */}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative text-sm font-bold uppercase tracking-widest py-2 transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-orange-600'
                    : 'text-stone-600 hover:text-orange-600'
                }`}
              >
                {link.name}
                {/* Animated Bottom Border */}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-orange-600 origin-left transition-transform duration-300 ease-out ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* Call to Action Button (Desktop) */}
          <div className="hidden md:flex items-center shrink-0">
            <a
              href="tel:+919910346546" // Replace with actual number
              className="inline-flex items-center gap-2 border-2 border-stone-900 bg-stone-900 hover:bg-orange-600 hover:border-orange-600 text-white px-6 py-2.5 font-bold uppercase text-xs tracking-widest shadow-md hover:shadow-orange-500/30 transition-all duration-300 rounded-sm group"
            >
              <Phone className="w-4 h-4 fill-white group-hover:animate-pulse" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-800 p-2 rounded-md hover:bg-stone-200 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-8 h-8 text-orange-600" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden absolute top-24 left-0 w-full bg-white border-b border-stone-200 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)} // Close menu on click
              className={`block px-4 py-4 text-sm font-bold uppercase tracking-widest transition-colors border-l-4 ${
                isActive(link.path)
                  ? 'bg-orange-50 text-orange-600 border-orange-600'
                  : 'text-stone-600 border-transparent hover:bg-stone-50 hover:text-orange-600 hover:border-orange-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-6 pb-2 px-4">
            <a
              href="tel:+919910346546" 
              className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-orange-600 text-white py-4 font-bold uppercase text-sm tracking-widest shadow-md transition-colors rounded-sm"
            >
              <Phone className="w-4 h-4 fill-white" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
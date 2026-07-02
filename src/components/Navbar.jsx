import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Layers } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation Links array to keep code DRY
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'e-Catalogues', path: '/catalogues' },
    { name: 'Our Portfolio', path: '/photos' },
    { name: 'About Us', path: '/about' },
    {name : 'Contact', path : '/contact'},
  ];

  // Helper function to check if a link is active to style it beautifully
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo / Branding Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand/10 p-2 rounded-xl text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-950 tracking-tight leading-tight">
                  Translite
                </span>
                <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
                  Fiber Gallery
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-2 ${
                  isActive(link.path)
                    ? 'text-brand'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.name}
                {/* Active indicator dot/bar */}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center">
            <a
              href="tel:+919910346546" // Replace with your Papa's actual number
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 fill-white" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)} // Close menu on click
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand/10 text-brand'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-100 px-4">
              <a
                href="tel:+919818114506" // Replace with your Papa's actual number
                className="w-full flex items-center justify-center gap-2 bg-slate-950 text-white py-3 rounded-xl font-semibold shadow-sm"
              >
                <Phone className="w-4 h-4 fill-white" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
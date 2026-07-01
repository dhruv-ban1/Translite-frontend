import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingContact() {
  // Replace these with your dad's actual business numbers
  const phoneNumber = "+919818114506"; 
  const whatsappNumber = "9818114506"; 
  const whatsappMessage = "Hello, I am interested in your fiberglass products. Can I get a quote?";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 hover:scale-110 transition-all duration-300 group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        {/* Tooltip */}
        <span className="absolute right-16 bg-slate-800 text-white text-sm font-medium py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      {/* Direct Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-700 hover:scale-110 transition-all duration-300 group md:hidden"
        title="Call Us Now"
      >
        <Phone className="w-7 h-7" />
      </a>
      
    </div>
  );
}
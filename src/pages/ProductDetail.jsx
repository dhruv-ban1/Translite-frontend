import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, BookOpen, CheckCircle } from 'lucide-react';
import { products } from '../data/products';

export default function ProductDetail({ onCallModal }) {
  // Grab the specific ID from the URL (e.g., 'frp-roofing')
  const { id } = useParams();
  
  // Find the exact product in our data array
  const product = products.find(p => p.id === id);

  // If someone types a bad URL, redirect them back to the products page
  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to all products
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Column: Image */}
          <div className="lg:w-1/2 h-80 lg:h-auto bg-slate-200 relative">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Content */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">{product.title}</h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {product.longDescription}
            </p>

            {/* Features List */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onCallModal(product.title)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm shadow-orange-600/20 text-center"
              >
                Request Quote
              </button>
              
              <a 
                href={product.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition-colors"
                title="Download Technical PDF"
              >
                <FileText className="w-5 h-5" />
                PDF
              </a>

              <a 
                href={product.flipbookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                title="View Interactive Flipbook"
              >
                <BookOpen className="w-5 h-5" />
                Flipbook
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
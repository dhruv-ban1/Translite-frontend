import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsList } from '../data/products';
import { CheckCircle2, ArrowLeft, Send, PenTool, LayoutGrid, Image as ImageIcon } from 'lucide-react';
import QuoteModal from '../components/QuoteModal';

export default function ProductDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Instantly snap to the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = productsList.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-orange-600 hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      
      {/* 1. COMPACT HERO SECTION */}
      <div className="bg-[#0a3a52] text-white pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <Link to="/products" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm mb-6 transition-colors w-fit font-semibold">
              <ArrowLeft className="w-4 h-4" /> Back to Catalogue
            </Link>
            
            <span className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-2 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {product.title}
            </h1>
            <h2 className="text-lg text-slate-300 font-medium mb-6">
              {product.subtitle}
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
              {product.overview}
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-400 text-slate-950 px-8 py-3.5 rounded-lg font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              <Send className="w-4 h-4" /> Request a Quote
            </button>
          </div>
          
          <div className="lg:w-1/2">
            <img 
              src={product.image} 
              alt={product.title} 
              className="rounded-xl shadow-2xl border-4 border-white/10 w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT SPLIT */}
      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: Deep Dive Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Why Choose Grid */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b-2 border-orange-500 inline-block pb-1">
              Why Choose This Product
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {product.whyChoose?.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-[#0a3a52] mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* VISUAL VARIANTS GRID */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <LayoutGrid className="text-orange-500 w-6 h-6" /> Product Variants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {product.variants?.map((variant, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group">
                  <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    {variant.image ? (
                      <img src={variant.image} alt={variant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="text-slate-300 flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8" />
                        <span className="text-xs font-medium uppercase tracking-widest">Image Pending</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow border-t border-slate-100">
                    <h4 className="font-bold text-[#0a3a52] mb-2 text-lg">{variant.name}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">{variant.description}</p>
                    <div className="bg-slate-50 px-3 py-2 rounded border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Best For</span>
                      <span className="text-xs font-semibold text-slate-800">{variant.bestFor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features & Benefits */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Features & Benefits
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5 w-5 h-5" />
                  <span className="text-sm text-slate-700 leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: Sticky Technical Sidebar (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Technical Specs Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-[#0a3a52] p-4">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Technical Specifications
                </h3>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-slate-100">
                    {product.technicalSpecs?.map((spec, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-4 text-xs font-bold text-slate-500 uppercase w-1/2">{spec.property}</td>
                        <td className="p-4 text-sm font-semibold text-slate-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sizes & Colours Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-100 p-4 border-b border-slate-200">
                <h3 className="text-md font-bold text-slate-900">Available Sizes & Colours</h3>
              </div>
              <div className="p-5 space-y-4">
                {product.sizesAndColours?.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">{item.attribute}</p>
                    <p className="text-sm text-slate-800 font-medium">{item.options}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessories Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-100 p-4 border-b border-slate-200">
                <h3 className="text-md font-bold text-slate-900 flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-[#0a3a52]" /> Installation Accessories
                </h3>
              </div>
              <ul className="p-5 space-y-3">
                {product.accessories?.map((acc, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    {acc}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Contact Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Get Pricing Details
            </button>
          </div>
        </div>
      </div>

      {/* 3. NEW APPLICATION GRID SECTION */}
      {product.applications && product.applications.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-20 mb-10">
          <div className="text-center mb-10 relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a3a52] uppercase tracking-wide bg-slate-50 relative z-10 inline-block px-6">
              Application
            </h2>
            {/* Dotted separator line */}
            <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dotted border-slate-300 -z-0"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.applications.map((app, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-all p-3 flex flex-col items-center text-center">
                <div className="w-full h-48 mb-4 overflow-hidden rounded bg-slate-100 flex items-center justify-center">
                  {app.image ? (
                    <img src={app.image} alt={app.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <h4 className="font-bold text-slate-800 text-base leading-tight mb-1">{app.title}</h4>
                <p className="text-slate-500 text-sm">{app.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedProduct={product.title} 
      />
    </div>
  );
}
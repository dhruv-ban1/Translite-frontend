import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { productsList } from '../data/products';
import QuoteModal from '../components/QuoteModal';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Dynamically generate categories from the data, adding "All Categories" at the top
  const categories = ["All Categories", ...new Set(productsList.map(item => item.category))];

  // Filter products based on both the active category and the search bar
  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      const matchesCategory = activeCategory === "All Categories" || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleOpenQuote = (productTitle) => {
    setSelectedProduct(productTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
          Product <span className="text-orange-500">Catalogue</span>
        </h1>
        <p className="text-slate-500 text-sm">
          Browse our comprehensive range of high-performance architectural materials,<br/> 
          from structural roofing to decorative interiors.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm sticky top-24">
            <div className="p-5 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 mb-4">Categories</h2>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Category List */}
            <ul className="flex flex-col">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-5 py-3 text-sm transition-colors border-l-2 flex justify-between items-center ${
                      activeCategory === cat
                        ? "bg-orange-50 text-orange-600 border-orange-500 font-semibold"
                        : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && <ChevronRight className="w-4 h-4" />}
                  </button>
                  {/* Subtle divider between items */}
                  {idx !== categories.length - 1 && <div className="h-px bg-slate-100 mx-5" />}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="flex-1">
          
          {/* Header & Result Count */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">{activeCategory}</h2>
            <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
              {filteredProducts.length} Results
            </span>
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Image Area */}
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Category Badge overlaying image */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-slate-800 uppercase tracking-wider shadow-sm">
                      {product.category}
                    </div>
                  </div>

                  {/* Text Area */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-6 line-clamp-2">
                      {product.overview}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="mt-auto flex gap-2">
                      <Link 
                        to={`/product/${product.id}`}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded text-xs font-bold text-center transition-colors"
                      >
                        Details
                      </Link>
                      <button 
                        onClick={() => handleOpenQuote(product.title)}
                        className="flex-1 bg-[#111827] hover:bg-slate-800 text-white py-2 rounded text-xs font-bold text-center transition-colors"
                      >
                        Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">No products match your search.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All Categories"); }}
                className="mt-2 text-orange-500 hover:underline text-sm font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        selectedProduct={selectedProduct} 
      />
    </div>
  );
}
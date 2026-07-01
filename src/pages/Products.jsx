import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Inbox } from 'lucide-react';
import { products } from '../data/products';

// Exact categories extracted from the provided screenshot
const CATEGORIES = [
  "All Categories",
  "Roofing Sheet",
  "Fiber Sheet",
  "Polycarbonate Sheet",
  "Acrylic Sheet",
  "PVC Flooring",
  "PVC Panel",
  "WPC Louvers",
  "Charcoal Panel",
  "Charcoal Sheet",
  "UV Marble Sheets",
  "UV Marble Roll",
  "Fabric Sheet",
  "Fro Sheet",
  "HDHMR Board",
  "Mosaic Tiles",
  "3D Panel",
  "Wooden Flooring",
  "Artificial Grass"
];

export default function Products({ onCallModal }) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-body-md">
      
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 mb-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Product <span className="text-orange-600">Catalogue</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Browse our comprehensive range of high-performance architectural materials, from structural roofing to decorative interiors.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT SIDEBAR: Categories */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col max-h-[80vh]">
              
              {/* Sidebar Header & Search */}
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-bold text-slate-900 text-lg mb-4">Categories</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-shadow"
                  />
                </div>
              </div>

              {/* Scrollable Category List */}
              <div className="overflow-y-auto flex-grow custom-scrollbar">
                <ul className="divide-y divide-slate-100">
                  {CATEGORIES.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-5 py-3.5 text-sm font-medium transition-colors flex items-center justify-between group ${
                          selectedCategory === category 
                            ? 'bg-orange-50 text-orange-700 border-l-4 border-orange-600' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
                        }`}
                      >
                        {category}
                        {selectedCategory === category && (
                          <ChevronRight className="w-4 h-4 text-orange-600" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT: Product Grid */}
          <div className="flex-grow">
            
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {selectedCategory}
              </h2>
              <span className="text-sm font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
                {filteredProducts.length} Results
              </span>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-16 flex flex-col items-center justify-center text-center">
                <Inbox className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500 max-w-sm">
                  We are currently updating our inventory for "{selectedCategory}". Please check back soon or contact us for custom orders.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSearchQuery("");
                  }}
                  className="mt-6 text-orange-600 font-semibold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              /* The Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                    
                    {/* Image Area */}
                    <Link to={`/products/${product.id}`} className="relative h-48 overflow-hidden block bg-slate-100">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        alt={product.title} 
                        src={product.image}
                      />
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-sm text-[10px] font-bold text-slate-600 tracking-wider uppercase">
                        {product.category}
                      </span>
                    </Link>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-grow">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                      </Link>

                      <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
                        {product.shortDescription}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="mt-auto flex gap-3">
                        <Link 
                          to={`/products/${product.id}`}
                          className="flex-1 text-center bg-slate-100 text-slate-700 font-semibold py-2 rounded-lg hover:bg-slate-200 transition-all text-sm"
                        >
                          Details
                        </Link>
                        <button 
                          onClick={() => onCallModal(`Inquiry regarding: ${product.title}`)}
                          className="flex-1 bg-slate-900 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition-all text-sm"
                        >
                          Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
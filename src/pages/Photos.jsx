import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

export default function Photos() {
  // Simple filter state
  const [filter, setFilter] = useState('All');

  // Gallery Data
  // Gallery Data
  const galleryPhotos = [
    {
      id: 1,
      category: 'Fabrication',
      title: 'Front Elevation Canopy',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.26.58 AM.jpeg'
    },
    {
      id: 2,
      category: 'Fabrication',
      title: 'Window Awning Structure',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.26.59 AM.jpeg'
    },
    {
      id: 3,
      category: 'Fabrication',
      title: 'Curved Dome Framework',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.26.59 AM (1).jpeg'
    },
    {
      id: 4,
      category: 'Fabrication',
      title: 'Blue Dome Installation',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.00 AM.jpeg'
    },
    {
      id: 5,
      category: 'Facility',
      title: 'Greenhouse Shed Structure',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.00 AM (1).jpeg'
    },
    {
      id: 6,
      category: 'Fabrication',
      title: 'Large Curved Roof',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.00 AM (2).jpeg'
    },
    {
      id: 7,
      category: 'Fabrication',
      title: 'Blue Polycarbonate Pool Cover',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.01 AM.jpeg'
    },
    {
      id: 8,
      category: 'Fabrication',
      title: 'Curved Industrial Canopy',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.01 AM (1).jpeg'
    },
    {
      id: 9,
      category: 'Facility',
      title: 'Warehouse Interior Roofing',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.01 AM (2).jpeg'
    },
    {
      id: 10,
      category: 'Materials',
      title: 'Green Patterned Roofing',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.01 AM (3).jpeg'
    },
    {
      id: 11,
      category: 'Fabrication',
      title: 'Blue Walkway Shelter',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.02 AM.jpeg'
    },
    {
      id: 12,
      category: 'Materials',
      title: 'Green Stained Glass Canopy',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.02 AM (1).jpeg'
    },
    {
      id: 13,
      category: 'Fabrication',
      title: 'Walkway Arch Structure',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.02 AM (2).jpeg'
    },
    {
      id: 14,
      category: 'Facility',
      title: 'Industrial Shed Interior',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.03 AM.jpeg'
    },
    {
      id: 15,
      category: 'Facility',
      title: 'Factory Roof Framework',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.27.03 AM (1).jpeg'
    },
    {
      id: 16,
      category: 'Fabrication',
      title: 'Terrace Pergola Structure',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.28.45 AM.jpeg'
    },
    {
      id: 17,
      category: 'Fabrication',
      title: 'Blue Awning Aerial View',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.28.46 AM.jpeg'
    },
    {
      id: 18,
      category: 'Fabrication',
      title: 'Skylight Interior Framing',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.28.46 AM (1).jpeg'
    },
    {
      id: 19,
      category: 'Fabrication',
      title: 'Geometric Dome Framework',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.28.47 AM.jpeg'
    },
    {
      id: 20,
      category: 'Materials',
      title: 'Decorative Shadow Panels',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.28.47 AM (1).jpeg'
    },
    {
      id: 21,
      category: 'Fabrication',
      title: 'Circular Skylight Dome',
      img: '/projects/WhatsApp Image 2026-07-02 at 11.28.47 AM (2).jpeg'
    }
  ];
  // Filter the photos based on selected category
  const filteredPhotos = filter === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter(photo => photo.category === filter);

  return (
    <div className="bg-slate-50 min-h-screen pt-8 pb-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-12">
        
        {/* Header Section */}
        <section className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Our <span className="text-orange-600">Portfolio</span>
            </h1>
            <p className="text-slate-600 max-w-xl text-lg">
              A visual journey through 25 years of industrial excellence. Explore our premium materials, manufacturing facility, and completed fabrication projects.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Materials', 'Fabrication', 'Facility'].map(category => (
              <button 
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === category 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-600 hover:text-orange-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Masonry Image Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={photo.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200 shadow-sm cursor-pointer"
            >
              <img 
                src={photo.img} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Hover Text & Icon */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="text-orange-500 font-bold text-xs uppercase tracking-wider mb-1">
                  {photo.category}
                </span>
                <h3 className="text-white font-bold text-xl flex justify-between items-center">
                  {photo.title}
                  <ZoomIn className="w-6 h-6 text-white/50" />
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </main>
    </div>
  );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

export default function Photos() {
  // Simple filter state
  const [filter, setFilter] = useState('All');

  // Gallery Data
  const galleryPhotos = [
    {
      id: 1,
      category: 'Fabrication',
      title: 'Industrial Polycarbonate Shed',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2VPVjbTYKuHRa_Acx0ZTaRLzy0LRoYMNNCldtMkN4nMuPbAgwiTBsc_MCVmE4Bzy7nsw8vODIwcgJDkb-wssZyniqMWlNT7DqopEB0ejEacIgtBnWMusqSPQqqMzi6Nn65OdJIOGY2vbdd5gcDBnLo8tKN5AZwdEhuinxe00AN1sjm4iXxYekPajUucAyrkYDpDlKLt5G9GU7q2fG7ejrx878PhkX9yHU0WwLE3ncTsmZT-pF8nwf3wIGbrE8oXV3heZfhLrwtpg'
    },
    {
      id: 2,
      category: 'Materials',
      title: 'Premium Acrylic Sheets',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOmXepwGHNN3fyA73bB4GFJ-JdDV06s5MFVmdu4JU0fPlFsmAaXM5qb8GbbNaBTza2cNIsqJtPnfPXgr70C-Zd3ZkOTTLWXiY0L3jStY7znAXDnB1kkl_mBAxgyy1eQz-XpjtvGmMPxR9e8fd_M4hnE_PbRLk7eCD6_peyYkMdbe_mXLG_x9iEaUzkDd0EpzpXpII3K7q18ALdtE7LVbd0KlcG2KYmFN7GTdhlk4g0LBsUmqRItvBGoff2T1fVLFv-6iVg7Kq7aAk'
    },
    {
      id: 3,
      category: 'Facility',
      title: 'Translite Manufacturing Hub',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArss-GuMS2eINjfUcgUMTXggRIPFDGOBrt780MCeIOg7hzKw0SV4Ccdd7l_eilyTJN6HZrX6GgG4mMxwAhoIPhfIsonsTb3ePBiNPIQ9BdTcdkN6lLBWnF9J8stmvsrqr2bwHNTks-gb4vk8AX52KT9qkG3-2D-wPlPjbxo_FsxXNETksJubOq5r-vivVICXadhoTJCbbpk3c1n5R7nlAiM_voq-ReazRvlIZi5Md08m1_5epURv2po94S3PmQU5ECmFISvfyvrWQ'
    },
    {
      id: 4,
      category: 'Materials',
      title: 'Corrugated Fiberglass',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFQXY3B6T9VASKz-Yj9libU4PSf_-kKc5Y_RXnGebQAmxmwSiwtPj6GgEMdDYddvzW0o4CT3SXDolGmHvC9LFbyHLa_X3-9gekuEy3p3cEmtsJ--SK-K5nusuZbBECB8yDqB0Kk7yuyiOzVs9mWi7VtDoHqEqvGGEU0z1Q3ck0ucOxnxJ8fBb3HIsOamdeotzYWWYwBZLPYGWNfEWwnqBKp-aNB_gTwsJkBjBeQKRdt38qtmX41CbgmVTGutY0eyAl21kS7PCG60g'
    },
    {
      id: 5,
      category: 'Fabrication',
      title: 'Sports Facility Backboards',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwLOZ3rNFSMIysF8h11n460ZPUHsQGNSb7LcxhMBFghNz_aPL-lkDOmrRHgaJpo8hCNR0XzJk2xZ8D_DHjpovqcQLqH7fc_nnXGRr0UHpvuce1TFI3_ba_MYq6ncFwI4XQ7m_2CQX20kL4AFVhesHaVRjknaoanGwc2hMr7h_awy64SZ1rw_ymHRPz2DVETfQbWszZQ0BxBoUwHKz5aqRDJL-33ZwBp3DMD0x5QQkFVlJgweldzIymy-02xdIRHNchkC4H4U1OZbc'
    },
    {
      id: 6,
      category: 'Materials',
      title: 'Multiwall Polycarbonate',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPANe9S6eH2SGE-u9K88IHbP3VOV9KUFYxGjGrQw4YyrdLf5kHgdroIZHGEVWxFeokny6yK-IrOWZ-Hs771A5DByONzZf46AgSo1dozgah5-42zUYsHuvNdJbhYoGQm7eM0zTaUgGARj3F6i9SbXQJo5k0XgRZ2tL7wM9Toy8QxxMTGu9GEeFYuklkteYy48Xz3acmVXnfxrvdLGNGdWl1rHE1wHIrYZg6LaPVJ_hruODlJVpYN8sqIjedhHsWHhIVY3lpOiasocs'
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
import React from 'react';
import { BookOpen, FileText } from 'lucide-react';

// Grouped data structure for categorized display
const groupedCatalogues = [
  {
    categoryTitle: "Acrylic Sheets",
    items: [
      {
        id: 'cat-acrylic-1',
        title: 'Premium Acrylic Range 2026',
        description: 'Complete technical specifications, light transmission rates, and fabrication guidelines for clear and tinted acrylic.',
        coverImage: 'catalogues/acrylic.png',
        pdfLink: 'catalogues/ACRYLIC.pdf',
        flipbookLink: 'https://flipbook.so/flip/0QIGL7Yb1WVJ9Geadh4z',
      },
      {
        id: 'cat-acrylic-2',
        title: 'Frosted & Textured Acrylic',
        description: 'Design guide for our privacy and glare-reduction acrylic sheets for interior applications.',
        coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
        pdfLink: 'catalogues/FROSTED-TEXTURED-ACRYLIC.pdf',
        flipbookLink: 'https://flipbook.so/flip/1QJHM8Zc2XWK0Hfbfi5A',
      }
    ]
  },
  {
    categoryTitle: "Wall Panels & Louvers",
    items: [
      {
        id: 'Wall-panels-1',
        title: 'Insulated Exterior Panels',
        description: 'Step-by-step installation instructions, locking mechanisms, and maintenance for WPC fluted panels.',
        coverImage: 'catalogues/Puffpanel.png',
        pdfLink: 'catalogues/LUXENBLOOMS TRANSLITE PANELS.pdf',
        flipbookLink: 'https://flipbook.so/flip/TonQX0pC1yRCv36BU8BX',
      },
      {
        id: 'Wall-panels-2',
        title: 'DSPL WPC 4 LINE LOUVERS',
        description: 'Explore the aesthetic and odor-reduction properties of our premium charcoal-infused wall panels.',
        coverImage: 'catalogues/dspl4.png',
        pdfLink: 'catalogues/WPC 4 Line pdf.pdf',
        flipbookLink: 'https://flipbook.so/flip/L2Au2Gdcb1zOj0FnWJN6',
      },
      {
        id: 'Wall-panels-3',
        title: 'DSPL WPC 8 LINE LOUVERS',
        description: 'High-gloss faux marble designs, thickness options, and adhesive recommendations.',
        coverImage: 'catalogues/Dspl8.png',
        pdfLink: 'catalogues/DSPL WPC 8 LINE LOUVERS.pdf (2).pdf',
        flipbookLink: 'https://flipbook.so/flip/RyIDUln8CrVwrGw872XQ',
      },
      {
        id: 'Wall-panels-4',
        title: 'FRP Decorative Panels',
        description: 'High-gloss faux marble designs, thickness options, and adhesive recommendations.',
        coverImage: 'catalogues/FRP.png',
        pdfLink: 'catalogues/FRP panels.pdf',
        flipbookLink: 'https://flipbook.so/flip/TOZy62hj1AUk9kbDfilS',
      },
      {
        id: 'Wall-panels-4',
        title: 'Interior Decorative Panels',
        description: 'High-gloss faux marble designs, thickness options, and adhesive recommendations.',
        coverImage: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=600',
        pdfLink: 'catalogues/2025-12-13 19-59-15.pdf',
        flipbookLink: 'https://flipbook.so/flip/uhtSw3P4JiorUE4v2nOh',
      }
    ]
  },
  {
    categoryTitle: "Wallpapers & Decor",
    items: [
      {
        id: 'cat-decor-1',
        title: 'Darae V series Wallpapers',
        description: 'Our latest imported textured and metallic wallpapers for commercial and residential interiors.',
        coverImage: 'catalogues/Darae 5.png',
        pdfLink: 'https://cdn.excelwallpapers.com/catalogs/pdfs/40/original/Darae_vol_5.pdf',
        flipbookLink: 'https://ecatalogues.s3.ap-south-1.amazonaws.com/darae_5/darae_5.html',
      },
      {
        id: 'cat-decor-2',
        title: 'Novus WallPapers',
        description: 'Installation and maintenance guide for our 3D wall panels, including adhesive recommendations.',
        coverImage: 'catalogues/Novus.png',
        pdfLink: 'https://cdn.excelwallpapers.com/catalogs/pdfs/103/original/Novus.pdf',
        flipbookLink: 'https://ecatalogues.s3.ap-south-1.amazonaws.com/novus/novus.html',
      },
      {
        id: 'cat-decor-3',
        title: 'Signature Series Wallpapers',
        description: 'A comprehensive guide to our premium imported wallpapers, including care instructions and warranty details.',
        coverImage: 'catalogues/Signature.jpeg',
        pdfLink: 'https://cdn.excelwallpapers.com/catalogs/pdfs/191/original/SIGNATURE.pdf',
        flipbookLink: 'https://ecatalogues.s3.ap-south-1.amazonaws.com/signature/signature.html',
      },
      {
        id: 'cat-decor-4',
        title: 'LUXE Collection Wallpapers',
        description: 'Explore our complete range of imported wallpapers, including metallic, textured, and 3D designs.',
        coverImage: 'catalogues/Screenshot From 2026-07-02 00-22-20.png',
        pdfLink: 'https://ecatalogues.s3.ap-south-1.amazonaws.com/Zio_Catalogues/LUXE.pdf',
        flipbookLink: 'https://ecatalogues.s3.ap-south-1.amazonaws.com/Zio_Catalogues/luxe/luxe.html',
      }
    ]
  }
];

export default function Catalogues() {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">
            Resource <span className="text-orange-600">Library</span>
          </h1>
          <p className="text-lg text-slate-600">
            Browse our complete range of product catalogues, technical specs, and installation guides. Download the PDFs or view our interactive digital flipbooks.
          </p>
        </div>

        {/* Dynamic Category Sections */}
        <div className="space-y-20">
          {groupedCatalogues.map((group, index) => (
            <section key={index} className="relative">
              
              {/* Category Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 whitespace-nowrap">
                  {group.categoryTitle}
                </h2>
                <div className="h-px bg-slate-200 w-full"></div>
              </div>

              {/* Bookshelf Grid for this specific category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.items.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1 group">
                    
                    {/* Cover Image */}
                    <div className="h-56 overflow-hidden relative bg-slate-200">
                      <img 
                        src={item.coverImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <a 
                          href={item.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors border border-slate-200"
                        >
                          <FileText className="w-4 h-4" />
                          View PDF
                        </a>

                        <a 
                          href={item.flipbookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm shadow-orange-600/20"
                        >
                          <BookOpen className="w-4 h-4" />
                          Flipbook
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
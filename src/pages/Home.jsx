import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Globe, 
  Leaf, 
  Lightbulb, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  ChevronUp
} from 'lucide-react';

// --- Custom Animated Counter Component ---
function AnimatedCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16); // 60fps approx
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
          observer.disconnect(); // Run once
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  // --- Hero Carousel State ---
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      image: "/projects/WhatsApp Image 2026-07-02 at 11.27.01 AM (2).jpeg",
      title: "TRANSFORM SPACES: TRANSLITE FIBER SYSTEMS",
      subtitle: "Seamless Strength. Quick Installation for Lasting Excellence."
    },
    {
      image: "/projects/WhatsApp Image 2026-07-02 at 11.27.00 AM (2).jpeg",
      title: "PREMIUM POLYCARBONATE ROOFING",
      subtitle: "Engineered for maximum natural light and structural integrity."
    },
    {
      image: "/projects/WhatsApp Image 2026-07-02 at 11.26.58 AM.jpeg",
      title: "INDUSTRIAL FABRICATION EXPERTS",
      subtitle: "Custom canopy and shed solutions designed for your needs."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // --- Projects Carousel State ---
  const [currentProject, setCurrentProject] = useState(0);
  const projects = [
    {
      title: "INDUSTRIAL WAREHOUSE ROOFING, NOIDA",
      desc: "Fiber Gallery proudly supplied and installed premium fiberglass sheets for this massive industrial complex. The durable and weather-resistant materials provide complete protection against the elements while ensuring long-lasting structural integrity.",
      img: "/projects/WhatsApp Image 2026-07-02 at 11.27.01 AM (2).jpeg"
    },
    {
      title: "COMMERCIAL SKYLIGHT DOME",
      desc: "Custom-engineered geometric polycarbonate dome structure allowing maximum natural daylight while filtering harmful UV rays, enhancing the aesthetics of the commercial space.",
      img: "/projects/WhatsApp Image 2026-07-02 at 11.28.47 AM.jpeg"
    },
    {
      title: "FRONT ELEVATION CANOPY",
      desc: "Modern structural fabrication providing architectural elegance and robust weather protection for the main entrance facility.",
      img: "/projects/WhatsApp Image 2026-07-02 at 11.26.58 AM.jpeg"
    }
  ];

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#faf9f6] text-stone-900 font-sans overflow-x-hidden">
      
      {/* 1. Hero Image Carousel */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-stone-900">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image with Dark Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-110"
              style={{ 
                backgroundImage: `url('${slide.image}')`,
                transform: index === currentHeroSlide ? 'scale(1)' : 'scale(1.1)' 
              }}
            ></div>
            <div className="absolute inset-0 bg-stone-900/60"></div>
            
            {/* Slide Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-wider max-w-5xl leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-stone-200 max-w-2xl font-medium tracking-wide">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Hero Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHeroSlide ? 'bg-orange-600 w-10' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Welcome Split Section */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden shadow-xl rounded-sm">
            <img 
              src="logos/gallery.jpeg" 
              alt="Premium Fiber Sheets" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-stone-900 mb-2 uppercase tracking-wide">
              Welcome to Fiber Gallery
            </h2>
            <h3 className="text-lg text-orange-600 font-bold mb-6 uppercase tracking-wider">
              Your Global Partner in Quality Solutions!
            </h3>
            <p className="text-stone-600 mb-8 leading-relaxed text-lg">
              Operating out of Noida, Uttar Pradesh, we take pride in our journey as one of India's leading manufacturers, suppliers, and installers of high-quality polycarbonate, acrylic, and fiber sheets. We have been at the forefront of providing innovative solutions for the construction, architectural, and fabrication sectors worldwide.
            </p>
            <div className="flex items-center gap-6 border-l-4 border-orange-600 pl-6">
              <span className="text-6xl font-black text-stone-900">25+</span>
              <span className="text-sm font-bold text-stone-500 uppercase tracking-widest leading-relaxed">
                Years Since We Established - <br />
                Experience & Skill Growing <br />
                Portfolio Day By Day
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Us & Animated Stats */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-4 text-sm">Why Fiber Gallery?</h2>
            <p className="text-3xl font-extrabold uppercase tracking-wider">Choosing Us: A Decision Rooted in Excellence</p>
            <p className="mt-6 text-stone-400 max-w-3xl mx-auto text-lg">
              When it comes to sourcing high-quality materials and professional installation, we stand out as the premier choice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 p-6 bg-white/5 border border-white/10 rounded-sm hover:border-orange-500/50 transition-colors">
              <CheckCircle className="w-10 h-10 text-orange-500" />
              <h4 className="font-bold text-lg">Unmatched Expertise</h4>
              <p className="text-stone-400 text-sm leading-relaxed">Over two decades of unparalleled expertise in manufacturing and sourcing premium materials.</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 p-6 bg-white/5 border border-white/10 rounded-sm hover:border-orange-500/50 transition-colors">
              <Lightbulb className="w-10 h-10 text-orange-500" />
              <h4 className="font-bold text-lg">Innovative Solutions</h4>
              <p className="text-stone-400 text-sm leading-relaxed">A pioneer in innovation with state-of-the-art facilities dedicated to product excellence.</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 p-6 bg-white/5 border border-white/10 rounded-sm hover:border-orange-500/50 transition-colors">
              <Globe className="w-10 h-10 text-orange-500" />
              <h4 className="font-bold text-lg">Global Reach, Local Trust</h4>
              <p className="text-stone-400 text-sm leading-relaxed">Ethical business practices globally, supported by a strong domestic network across India.</p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left gap-4 p-6 bg-white/5 border border-white/10 rounded-sm hover:border-orange-500/50 transition-colors">
              <Leaf className="w-10 h-10 text-orange-500" />
              <h4 className="font-bold text-lg">Commitment to Quality</h4>
              <p className="text-stone-400 text-sm leading-relaxed">Strict adherence to sustainability and structural integrity in every sheet we produce.</p>
            </div>
          </div>

          <hr className="border-white/10 mb-20" />

          {/* Animated Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div>
              <div className="text-5xl lg:text-6xl font-black text-orange-500 mb-4">
                <AnimatedCounter end={25} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl lg:text-6xl font-black text-orange-500 mb-4">
                <AnimatedCounter end={500} duration={2500} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Projects Done</div>
            </div>
            <div>
              <div className="text-5xl lg:text-6xl font-black text-orange-500 mb-4">
                <AnimatedCounter end={50} duration={2000} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Our Team</div>
            </div>
            <div>
              <div className="text-5xl lg:text-6xl font-black text-orange-500 mb-4">
                <AnimatedCounter end={2500} duration={3000} suffix="+" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Customers Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Range */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 uppercase tracking-wider">
              Our Products Range
            </h2>
            <p className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-4">
              Innovative Solutions, Diverse Products
            </p>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">
              Explore our comprehensive industrial and architectural product range, engineered for durability and maximum structural integrity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Polycarbonate Sheets",
                desc: "Multiwall and solid sheets, corrugated profiles, and engineered panels for maximum durability.",
                img: "https://5.imimg.com/data5/SELLER/Default/2023/3/295443060/HL/SY/TN/186789066/multiwall-polycarbonate-sheet-500x500.png"
              },
              {
                title: "Acrylic Sheets",
                desc: "Versatile and highly transparent solutions for architectural, signage, and aesthetic applications.",
                img: "https://www.sabinplastic.com/wp-content/uploads/2022/02/Copy-of-Acrylic-color-op-11-2-1.jpg"
              },
              {
                title: "FRP Sheets",
                desc: "Fiberglass-reinforced plastic sheets providing robust strength for industrial shedding and roofing.",
                img: "https://5.imimg.com/data5/SELLER/Default/2024/4/410727987/BI/US/RP/162950633/0-50mm-galvanized-iron-roofing-sheet-500x500.jpeg"
              },
              {
                title: "WPC Louvers & Panels",
                desc: "Wood Polymer Composite solutions combining the stunning aesthetics of wood with the durability of plastic.",
                img: "https://5.imimg.com/data5/SELLER/Default/2023/5/307371751/NY/VZ/GE/154308148/exterior-wpc-wall-cladding-services-500x500.jpg" // Using an existing shadow panel image from your gallery as a placeholder
              },
              {
                title: "Insulated Puff Panels",
                desc: "Lightweight, moisture-resistant boards perfectly suited for advertising, cabinetry, and interior applications.",
                img: "https://5.imimg.com/data5/TY/TQ/HX/SELLER-67499895/insulated-panels-500x500.jpg" // Placeholder
              },
              {
                title: "Prefabricated Sheds",
                desc: "High-performance architectural fabrics designed for custom awnings, canopies, and outdoor shading systems.",
                img: "projects/WhatsApp Image 2026-07-02 at 11.27.01 AM (2).jpeg" // Placeholder" // Using your canopy image
              }
            ].map((product, index) => (
              
              /* Product Card */
              <div 
                key={index} 
                className="bg-white border border-stone-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col relative overflow-hidden"
              >
                {/* Animated Top Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>
                
                {/* Image Container */}
                <div className="h-64 w-full overflow-hidden bg-stone-100 relative">
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500 z-10"></div>
                  <img 
                    src={product.img} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                {/* Content Container */}
                <div className="p-8 text-center flex flex-col flex-grow relative z-10 bg-white">
                  <h3 className="text-xl font-extrabold text-stone-900 uppercase mb-4">
                    {product.title}
                  </h3>
                  
                  <div className="w-12 h-px bg-stone-300 mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300"></div>
                  
                  <p className="text-stone-600 mb-8 flex-grow leading-relaxed">
                    {product.desc}
                  </p>
                  
                  <Link 
                    to="/products" 
                    className="inline-flex items-center justify-center gap-2 border-2 border-stone-900 text-stone-900 font-bold uppercase text-xs tracking-widest py-3 px-6 hover:bg-stone-900 hover:text-white transition-all duration-300 group/btn mt-auto mx-auto w-[80%]"
                  >
                    Explore 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* 5. Showcasing Excellence */}
      <section className="w-full bg-[#faf9f6]">
        {/* Dark Background Top Container */}
        <div className="relative pt-32 pb-64 bg-stone-900 overflow-hidden">
          
          {/* BULLETPROOF BACKGROUND IMAGE: Removed mix-blend-overlay and increased opacity to 60% */}
          <img 
            src="projects/WhatsApp Image 2026-07-02 at 11.28.46 AM (1).jpeg" 
            alt="Industrial Shed Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
          />

          {/* Added a subtle top gradient so the white text pops without darkening the whole image */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 text-center px-4">
            <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-2 text-2xl md:text-3xl drop-shadow-md">
              SHOWCASING EXCELLENCE -
            </h2>
            <p className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider drop-shadow-md">
              OUR RECENT PROJECTS
            </p>
          </div>
        </div>

        {/* Overlapping Slider Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-12 relative -mt-32 z-30 mb-20">
          
          {/* The White Slider Box */}
          <div className="relative bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col md:flex-row min-h-[450px] overflow-hidden group">
            
            {/* 
              HIGH-VISIBILITY NAVIGATION ARROWS 
              Positioned absolutely on the left and right edges of the slider.
            */}
            <button 
              onClick={prevProject} 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-stone-900/90 hover:bg-orange-600 text-white p-3 md:p-4 rounded-r-md transition-all cursor-pointer shadow-lg"
              title="Previous Project"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <button 
              onClick={nextProject} 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-stone-900/90 hover:bg-orange-600 text-white p-3 md:p-4 rounded-l-md transition-all cursor-pointer shadow-lg"
              title="Next Project"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Left Content (Text transitions) */}
            <div className="w-full md:w-1/2 relative bg-white z-10 min-h-[450px] md:min-h-full">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 p-10 md:p-14 md:pl-20 flex flex-col justify-center bg-white transition-opacity duration-700 ease-in-out ${
                    index === currentProject ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-extrabold text-stone-900 uppercase leading-snug pr-4">
                    {project.title}
                  </h3>
                  
                  <div className="w-8 h-[2px] bg-stone-300 my-6"></div>
                  
                  <p className="text-stone-600 leading-relaxed mb-10 text-sm md:text-base pr-4">
                    {project.desc}
                  </p>
                  
                  <div>
                    <Link to="/photos" className="border border-stone-300 text-stone-900 px-8 py-3 font-bold text-sm tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors inline-block">
                      ALL PROJECTS
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right Image (Image transitions) */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
              {projects.map((project, index) => (
                <img 
                  key={index}
                  src={project.img} 
                  alt={project.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    index === currentProject ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div className="max-w-7xl mx-auto px-6 pb-12 flex justify-end">
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-stone-900 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        </div>
      </section>

{/* 6. Completely Separate Testimonials & Clients Section */}
 {/* 6. Completely Separate Testimonials & Clients Section */}
      <section className="w-full">
        {/* Testimonial Top Half (Dark) */}
        <div className="bg-stone-900 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/gallery/WhatsApp Image 2026-07-02 at 11.27.01 AM.jpeg')] bg-cover bg-center"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-orange-500 font-extrabold text-3xl uppercase tracking-widest mb-12">
              WHAT OUR CLIENTS SAY
            </h2>
            <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto">
              "Fiber Gallery has been an invaluable partner for our industrial construction projects. Their premium polycarbonate and fiber sheets have not only met but exceeded our stringent safety and quality requirements. The durability of their products have set a new benchmark for our facilities."
            </p>
            <div className="text-white font-bold uppercase tracking-widest text-sm">
              CONSTRUCTION INDUSTRY PARTNER
              <span className="block text-stone-500 text-xs mt-2 normal-case tracking-normal">Noida, India</span>
            </div>
            <Quote className="w-10 h-10 text-orange-600/50 mx-auto mt-6 rotate-180" />
          </div>
        </div>

        {/* Clients/Partners Section (Exact Boxed Grid with Seamless Loop) */}
        <div className="bg-white py-12 border-y border-stone-200 overflow-hidden relative">
          
          <style>
            {`
              /* Flawless Seamless Loop Animation */
              @keyframes seamless-marquee {
                0% { transform: translateX(0); }
                /* Translates exactly 50% of the total width of the container */
                100% { transform: translateX(-50%); } 
              }
              
              .animate-marquee-track {
                display: flex;
                width: max-content;
                animation: seamless-marquee 30s linear infinite;
              }

              /* Pause on hover so users can see the logos clearly */
              .animate-marquee-track:hover {
                animation-play-state: paused;
              }
            `}
          </style>

{/* Container now strictly uses flex-col to stack heading on top of the logos */}
          <div className="max-w-[1400px] mx-auto flex flex-col items-center pt-4">
            
            {/* Top Static Heading */}
            <div className="w-full z-10 bg-white px-6 pb-10 text-center">
              <h3 className="text-3xl lg:text-4xl font-extrabold text-[#00405c] uppercase">
                OUR CLIENTS AND PARTNERS
              </h3>
              {/* Optional: Small accent line for styling */}
              <div className="w-24 h-1 bg-orange-500 mt-4 mx-auto"></div>
            </div>
            
            {/* Scrolling Marquee Container - Now uses the full width of the screen */}
            <div className="w-full overflow-hidden relative">
              <div className="animate-marquee-track">
                
                {/* 
                  Array containing your exact brand partners and filenames.
                */}
                {[
                  ...[
                    { name: "DLF", file: "dlf.jpg" },
                    { name: "Gold Plus Glass", file: "gold.png" },
                    { name: "Hindalco", file: "Hindalco.png" },
                    { name: "IndiGo", file: "Indigo.webp" },
                    { name: "L&T", file: "LT.jpeg" },
                    { name: "Delhi Metro", file: "metro.jpg" },
                    { name: "NHAI", file: "NHAI.png" },
                    { name: "PWD", file: "pwd.webp" },
                    { name: "Sabic", file: "sebic.png" },
                    { name: "Sparky", file: "sparky.png" }
                  ],
                  ...[
                    { name: "DLF", file: "dlf.jpg" },
                    { name: "Gold Plus Glass", file: "gold.png" },
                    { name: "Hindalco", file: "Hindalco.png" },
                    { name: "IndiGo", file: "Indigo.webp" },
                    { name: "L&T", file: "LT.jpeg" },
                    { name: "Delhi Metro", file: "metro.jpg" },
                    { name: "NHAI", file: "NHAI.png" },
                    { name: "PWD", file: "pwd.webp" },
                    { name: "Sabic", file: "sebic.png" },
                    { name: "Sparky", file: "sparky.png" }
                  ]
                ].map((partner, index) => (
                  
                  /* Individual Logo Box */
                  <div 
                    key={index} 
                    className="w-[160px] h-[100px] lg:w-[280px] lg:h-[160px] shrink-0 flex items-center justify-center border border-stone-200 mx-2 bg-white p-3 lg:p-4 transition-colors hover:border-orange-500"
                  >
                    <img 
                      src={`/logos/${partner.file}`} 
                      alt={`${partner.name} Logo`} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <span className="hidden font-bold text-xs md:text-sm text-stone-800 text-center uppercase">
                      {partner.name}
                    </span>
                  </div>

                ))}
                
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
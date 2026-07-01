import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Clock, 
  Package, 
  Layers, 
  Banknote, 
  Truck, 
  MapPin, 
  Phone, 
  FileText, 
  Star,
  Plus,
  Minus
} from 'lucide-react';

export default function About() {
  // Animation settings for reusable scroll effects
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-body-md overflow-x-hidden pt-8">
      
      {/* Hero Section: Our Story */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 bg-slate-200 text-slate-900 rounded-sm border border-slate-300 font-bold text-sm tracking-wider">
              <span className="mr-2">EST. 1999</span>
              <div className="w-2 h-2 rounded-full bg-orange-600"></div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Our Story: A Legacy of <span className="text-orange-600">Precision</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Translite Fiber Gallery is a distinguished proprietorship firm that was inaugurated in the year 1999 at Noida, Uttar Pradesh. Under the visionary guidance of our mentor, <span className="font-bold text-slate-900">Praveen Bansal</span>, we have evolved into a cornerstone of the industrial material supply chain.
            </p>
            <p className="text-base text-slate-600">
              Our journey began with a simple mission: to provide uncompromising quality in fiber and polycarbonate solutions. Decades later, that commitment remains our structural core, reinforcing every project we touch across the industrial landscape.
            </p>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-slate-200 rounded-lg border border-slate-300 shadow-lg relative overflow-hidden group">
              <video
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                src="videos/Shop.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 border border-slate-200 shadow-xl hidden md:block max-w-xs">
              <span className="text-5xl font-extrabold text-orange-600">25+</span>
              <p className="font-bold text-slate-500 uppercase tracking-widest mt-2 text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bento Grid: Meet the Team & Why Choose Us */}
      <section className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* CEO Profile */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="md:col-span-5 lg:col-span-4 bg-white border border-slate-200 p-10 flex flex-col justify-between group hover:shadow-xl transition-all duration-500 rounded-xl"
            >
              <div>
                <div className="w-20 h-1 bg-orange-600 mb-8"></div>
                <h3 className="text-3xl font-bold mb-2">Leadership</h3>
                <p className="text-slate-600 mb-10">Steering our vision toward new industrial frontiers.</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                  <img 
                    className="object-cover w-full h-full" 
                    alt="Kamlesh Bansal CEO" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD222XSAGDSmcn0-EzLo4Jc5Gh7cmCAhV1hWDPXmZW6DSxW6fmosDZUBwCvqFXbo3BWJPiLJqXMF4QI0Mu9Sd4IMyoViZOOEhAge7zx1bIOiSXPz5_ruOIKaS24aKpvJTQusLfKIuGp3JWp-HDhkKCw_i8emb-PO2zs4-QydEf05gK4kglgxnJ_9u2JBKCn_Thk6KPd1__nZiJ_uH2oq3V8CJ8viJOb9mknm7aV_4h0NJ4dMNrKjb_bxHqLEPF110OKReeupN19vOA"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Praveen Bansal</h4>
                  <p className="text-sm font-bold text-orange-600 uppercase tracking-wider mt-1">Founder</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                  <img 
                    className="object-cover w-full h-full" 
                    alt="Kamlesh Bansal CEO" 
                    src="catalogues/papa.jpeg"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Kamlesh Bansal</h4>
                  <p className="text-sm font-bold text-orange-600 uppercase tracking-wider mt-1">Co-Founder</p>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-slate-200 p-8 space-y-4 hover:border-orange-600 transition-colors rounded-xl shadow-sm">
                <ShieldCheck className="text-orange-600 w-10 h-10" />
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Quality</h4>
                <p className="text-slate-600 text-sm">Uncompromising standards in every sheet and fiber delivered.</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-slate-200 p-8 space-y-4 hover:border-orange-600 transition-colors rounded-xl shadow-sm">
                <Clock className="text-orange-600 w-10 h-10" />
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Timely Delivery</h4>
                <p className="text-slate-600 text-sm">Logistics precision ensuring your projects stay on schedule.</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-slate-200 p-8 space-y-4 hover:border-orange-600 transition-colors rounded-xl shadow-sm">
                <Package className="text-orange-600 w-10 h-10" />
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Packaging</h4>
                <p className="text-slate-600 text-sm">Reinforced industrial packing for zero-damage transit.</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-slate-200 p-8 space-y-4 hover:border-orange-600 transition-colors rounded-xl shadow-sm">
                <Layers className="text-orange-600 w-10 h-10" />
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Bulk Orders</h4>
                <p className="text-slate-600 text-sm">Capacity to scale with major infrastructure requirements.</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-slate-200 p-8 space-y-4 hover:border-orange-600 transition-colors rounded-xl shadow-sm">
                <Banknote className="text-orange-600 w-10 h-10" />
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Competitive Pricing</h4>
                <p className="text-slate-600 text-sm">Premium materials optimized for industrial feasibility.</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-slate-900 flex items-center justify-center p-8 text-slate-200 text-center rounded-xl shadow-sm">
                <p className="italic font-medium">Building the future of construction, one project at a time.</p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Factsheet: Technical Table */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 text-slate-900">Technical Factsheet</h2>
          <p className="text-slate-600">Our operational transparency and business parameters.</p>
        </div>
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-6 font-bold text-slate-900 uppercase text-sm border-b border-slate-200">Parameter</th>
                <th className="p-6 font-bold text-slate-900 uppercase text-sm border-b border-slate-200">Details</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 border-b border-slate-200 font-bold">Nature of Business</td>
                <td className="p-6 border-b border-slate-200">Wholesale Trader & Retailer</td>
              </tr>
              <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <td className="p-6 border-b border-slate-200 font-bold">GST Registration</td>
                <td className="p-6 border-b border-slate-200 font-mono">2017 (Verified)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-6 border-b border-slate-200 font-bold">Banking Partner</td>
                <td className="p-6 border-b border-slate-200">IDFC FIRST Bank</td>
              </tr>
              <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <td className="p-6 border-b border-slate-200 font-bold">Primary Shipment Mode</td>
                <td className="p-6 border-b border-slate-200 flex items-center gap-2">
                  <Truck className="text-orange-600 w-5 h-5" />
                  By Road (Regional & Interstate)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Contact Section & Map */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
        className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-200"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
              <p className="text-slate-600">Our team of material specialists is ready to assist with your technical inquiries.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-xl group hover:border-orange-600 transition-all shadow-sm">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-orange-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Office Address</h4>
                  <p className="text-sm text-slate-600">E -32 & E 36 SECTOR 9
Noida, Uttar Pradesh</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-xl group hover:border-orange-600 transition-all shadow-sm">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                  <p className="text-sm text-slate-600 mb-2">+91 9818114506</p>
                  <a href="tel:+919818114506" className="text-orange-600 font-bold hover:underline text-sm">Call Now</a>
                </div>
              </div>
              
              <div className="flex gap-4 p-6 bg-white border border-slate-200 rounded-xl group hover:border-orange-600 transition-all shadow-sm">
                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-orange-600 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">GST Number</h4>
                  <p className="text-sm font-mono text-slate-600">09XXXXXXXXXXXXX</p>
                </div>
              </div>
            </div>

            {/* Reviews & Ratings */}
            <div className="p-8 bg-slate-100 border border-slate-200 rounded-xl shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold">Client Trust</h4>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <Star className="w-5 h-5 text-slate-300" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="font-bold w-4 text-slate-900">4</span>
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[85%]"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-600">4/5 Rating</span>
                </div>
                <p className="text-sm italic text-slate-600 mt-4">
                  "Consistent quality and professional handling. Best in Noida for polycarbonate sheets."
                </p>
              </div>
            </div>
          </div>

          {/* Google Map Placeholder */}
          <div className="lg:col-span-3 h-[600px] bg-slate-200 border border-slate-300 rounded-xl relative overflow-hidden group shadow-md">
            <div className="absolute inset-0 opacity-80 mix-blend-multiply">
              <img 
                className="w-full h-full object-cover" 
                alt="Map of Noida" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2VPVjbTYKuHRa_Acx0ZTaRLzy0LRoYMNNCldtMkN4nMuPbAgwiTBsc_MCVmE4Bzy7nsw8vODIwcgJDkb-wssZyniqMWlNT7DqopEB0ejEacIgtBnWMusqSPQqqMzi6Nn65OdJIOGY2vbdd5gcDBnLo8tKN5AZwdEhuinxe00AN1sjm4iXxYekPajUucAyrkYDpDlKLt5G9GU7q2fG7ejrx878PhkX9yHU0WwLE3ncTsmZT-pF8nwf3wIGbrE8oXV3heZfhLrwtpg"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-2xl border border-orange-600">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="text-orange-600 w-10 h-10 animate-bounce" />
                <span className="font-bold text-slate-900 text-sm whitespace-nowrap">Translite Fiber Gallery</span>
              </div>
            </div>
            
            {/* Map Controls */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button className="bg-white w-10 h-10 flex items-center justify-center rounded border border-slate-200 shadow-md hover:bg-slate-50 transition-colors text-slate-700">
                <Plus className="w-5 h-5" />
              </button>
              <button className="bg-white w-10 h-10 flex items-center justify-center rounded border border-slate-200 shadow-md hover:bg-slate-50 transition-colors text-slate-700">
                <Minus className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </motion.section>
    </div>
  );
}
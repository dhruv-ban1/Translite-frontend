import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Handshake, HardHat, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

export default function Home() {
  const shaderRef = useRef(null);
  const threeContainerRef = useRef(null);

  useEffect(() => {
    // --- WebGL Shader Logic ---
    const canvas = shaderRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl');
    let shaderReqId;

    if (gl) {
      const vertexShaderSource = `
        attribute vec2 position;
        varying vec2 v_texCoord;
        void main() {
            v_texCoord = position * 0.5 + 0.5;
            gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fragmentShaderSource = `
        precision highp float;
        varying vec2 v_texCoord;
        uniform float u_time;
        uniform vec2 u_resolution;

        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                   -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 a0 = x - floor(x + 0.5);
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
            vec2 uv = v_texCoord;
            vec3 color1 = vec3(0.059, 0.09, 0.165); 
            vec3 color2 = vec3(0.1, 0.15, 0.25);    
            vec3 accent = vec3(0.96, 0.47, 0.11);   

            float noise = snoise(uv * 2.0 + u_time * 0.1);
            float noise2 = snoise(uv * 4.0 - u_time * 0.05);
            
            vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
            finalColor = mix(finalColor, accent, clamp(noise2 * 0.1, 0.0, 0.02));
            
            float grid = sin(uv.x * 100.0) * sin(uv.y * 100.0);
            finalColor += grid * 0.01;

            gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      const createShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };

      const program = gl.createProgram();
      gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
      gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
      gl.linkProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, 'position');
      const timeLocation = gl.getUniformLocation(program, 'u_time');
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

      const renderShader = (time) => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.uniform1f(timeLocation, time * 0.001);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        shaderReqId = requestAnimationFrame(renderShader);
      };
      shaderReqId = requestAnimationFrame(renderShader);
    }

    // --- Three.js Scene Logic ---
    const container = threeContainerRef.current;
    let threeReqId;
    let renderer;
    
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      
      container.innerHTML = ''; 
      container.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(3, 4, 0.1);
      const material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
          shininess: 100,
          specular: 0x444444
      });

      const panel = new THREE.Mesh(geometry, material);
      scene.add(panel);

      const wireframeGeom = new THREE.EdgesGeometry(geometry);
      const wireframeMat = new THREE.LineBasicMaterial({ color: 0xf57c1b, linewidth: 2 });
      const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMat);
      panel.add(wireframe);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      const animate3D = () => {
          threeReqId = requestAnimationFrame(animate3D);
          panel.rotation.y += 0.005;
          panel.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
          panel.position.y = Math.sin(Date.now() * 0.001) * 0.2;
          renderer.render(scene, camera);
      };
      animate3D();

      const handleResize = () => {
          const newWidth = container.clientWidth;
          const newHeight = container.clientHeight;
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(shaderReqId);
        cancelAnimationFrame(threeReqId);
        if (renderer) renderer.dispose();
      };
    }
  }, []);

  return (
    // Applied a warm off-white background to the entire page
    <div className="bg-[#faf9f6] text-stone-900 font-sans overflow-x-hidden">
      
      {/* Dramatic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden">
        <canvas ref={shaderRef} className="absolute inset-0 z-0 w-full h-full"></canvas>
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 backdrop-blur-md bg-white/5 p-8 md:p-12 border border-white/10 rounded-2xl transition-all duration-1000 opacity-0 animate-fade-up">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-px w-12 bg-orange-500"></div>
                <span className="text-orange-500 font-bold text-sm uppercase tracking-[0.3em]">ESTABLISHED 1999</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-[1.1]">
                25+ Years of <span className="text-orange-500">Excellence</span> in Fiber & Polycarbonate
              </h1>
              <p className="text-slate-300 max-w-2xl mb-12 text-xl leading-relaxed">
                Premium quality Acrylic, Fiberglass, and Polycarbonate sheets manufactured with precision in Noida. Trusted by architects and industrial developers worldwide.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/products" className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-600/20 transition-all">
                  VIEW CATALOG
                </Link>
                <Link to="/photos" className="border-2 border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all">
                  OUR PROJECTS
                </Link>
              </div>
            </div>
            
            <div ref={threeContainerRef} className="lg:col-span-5 h-[400px] md:h-[600px] relative"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar (Warmed up) */}
      <section className="bg-white py-16 relative border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col group">
              <span className="text-stone-500 font-bold text-xs mb-2 block uppercase tracking-wider">EXPERIENCE</span>
              <span className="text-5xl font-extrabold text-stone-900 border-l-4 border-orange-500 pl-6 mb-2">25+</span>
              <span className="text-stone-600 text-sm font-medium">Industry Leading Years</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-stone-500 font-bold text-xs mb-2 block uppercase tracking-wider">TRUSTED</span>
              <span className="text-5xl font-extrabold text-stone-900 border-l-4 border-orange-500 pl-6 mb-2">4.8<span className="text-2xl text-orange-500">/5</span></span>
              <span className="text-stone-600 text-sm font-medium">Satisfaction Rating</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-stone-500 font-bold text-xs mb-2 block uppercase tracking-wider">COMPLIANCE</span>
              <span className="text-5xl font-extrabold text-stone-900 border-l-4 border-orange-500 pl-6 mb-2">GST</span>
              <span className="text-stone-600 text-sm font-medium">Fully Registered Entity</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-stone-500 font-bold text-xs mb-2 block uppercase tracking-wider">LOCATION</span>
              <span className="text-5xl font-extrabold text-stone-900 border-l-4 border-orange-500 pl-6 mb-2">NOIDA</span>
              <span className="text-stone-600 text-sm font-medium">Strategic Manufacturing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-orange-600 font-bold tracking-widest mb-4 block uppercase text-sm">
                Our Expertise
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6">
                Integrated Industrial Solutions
              </h2>
              <div className="h-1.5 w-24 bg-orange-500 rounded-full"></div>
            </div>
            <p className="text-stone-600 text-lg max-w-md pb-2 leading-relaxed">
              Comprehensive solutions from precision raw material manufacturing to large-scale structural fabrication and on-site assembly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-lg shadow-stone-200/50 border border-stone-100 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  <Factory className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Manufacturing</h3>
                <p className="text-stone-600 leading-relaxed">
                  State-of-the-art facility in Noida producing high-density Translite fiber sheets with multi-layer UV protection.
                </p>
              </div>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-lg shadow-stone-200/50 border border-stone-100 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  <Handshake className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Trading</h3>
                <p className="text-stone-600 leading-relaxed">
                  Authorized primary dealers for global polycarbonate giants including Makrolon and Lexan technical solutions.
                </p>
              </div>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-lg shadow-stone-200/50 border border-stone-100 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-50 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  <HardHat className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Shed Fabrication</h3>
                <p className="text-stone-600 leading-relaxed">
                  End-to-end professional installation services for industrial sheds using premium fiber and polycarbonate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Completed Projects Section */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <span className="text-orange-600 font-bold tracking-widest mb-4 block uppercase text-sm">
                Our Legacy
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900">
                Recent Completed Work
              </h2>
            </div>
            <Link to="/photos" className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-colors">
              View Complete Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img src="/projects/WhatsApp Image 2026-07-02 at 11.26.58 AM.jpeg" alt="Front Elevation Canopy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-bold text-xl">Front Elevation Canopy</h3>
              </div>
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img src="/projects/WhatsApp Image 2026-07-02 at 11.27.00 AM (2).jpeg" alt="Large Curved Roof" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-bold text-xl">Large Curved Roof</h3>
              </div>
            </div>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img src="projects/WhatsApp Image 2026-07-02 at 11.27.00 AM.jpeg" alt="Warehouse Interior Roofing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-bold text-xl">Warehouse Interior Roofing</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog (Polished 3-Column Grid) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <span className="text-orange-500 font-bold tracking-widest block mb-4 uppercase text-sm">Featured Collections</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Primary Product Catalog</h2>
            <p className="text-slate-400 text-lg">Industry-grade materials designed for durability and maximum structural integrity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-colors duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('catalogues/acrylic.webp')" }}></div>
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">BEST SELLER</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Acrylic Sheets</h3>
                <p className="text-slate-400 mb-8 line-clamp-2">High-transparency acrylic sheets available in multiple thicknesses and custom dimensions.</p>
                <Link to="/products" className="inline-flex items-center text-orange-400 font-bold hover:text-orange-300 group/btn">
                  SPECIFICATIONS
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Product 2 */}
            <div className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-colors duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNa3JAu3wSstiS-07rcIzzBIE8nqeHBrP2rZM40WMW_Dho3Pv8qmDLSxava-LWcxQQo8-SXpkuAqBJ_DoDjiflbwC7pQIWqCgDaqg-GH8C5OoPqOR6YgdxoQTPkUGdE8hj6zVcQIwqz_tKjnHqNA0RSGifOf_crkBu2xOQWrNZsTjMSJnqOmh61AdrPTu3HYzR4Nsy8qjRDZKJ9oISU3RIHaJvruqppPLd1luHDm_bxiAhScCWpdYCcNMmRHaoSqbz5r4dH8hzIWo')" }}></div>
                <div className="absolute top-4 right-4 bg-white text-slate-900 px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">IN-HOUSE</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Fiberglass Sheets</h3>
                <p className="text-slate-400 mb-8 line-clamp-2">Proprietary Translite Fiber technology offering superior weather resistance and structural strength.</p>
                <Link to="/products" className="inline-flex items-center text-orange-400 font-bold hover:text-orange-300 group/btn">
                  TECHNICAL DATA
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Product 3 (Added Polycarbonate to complete the grid) */}
            <div className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-colors duration-300">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70" style={{ backgroundImage: "url('catalogues/Polycarbonate.webp')" }}></div>
                <div className="absolute top-4 right-4 bg-stone-500 text-white px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">PREMIUM</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Polycarbonate</h3>
                <p className="text-slate-400 mb-8 line-clamp-2">Multiwall and solid polycarbonate sheets for advanced daylighting and thermal insulation.</p>
                <Link to="/products" className="inline-flex items-center text-orange-400 font-bold hover:text-orange-300 group/btn">
                  EXPLORE RANGE
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-24 bg-white border-y border-outline-variant/30">
                  <div className="max-w-container-max mx-auto px-margin-desktop">
                        <p className="font-label-md text-on-surface-variant text-center mb-16 tracking-[0.4em] uppercase">Premium Partners</p>
                        <div className="flex flex-wrap justify-between items-center gap-12 opacity-40 hover:opacity-100 transition-opacity">
                              <span className="font-display-lg text-3xl text-primary tracking-tighter">TRANSLITE<sup>&reg;</sup></span>
                              <span className="font-display-lg text-3xl font-bold text-on-surface italic">LUXENBLOOMS</span>
                              <span className="font-display-lg text-4xl font-extrabold text-secondary tracking-tight">Excel Wallpapers</span>
                              <span className="font-display-lg text-3xl text-primary tracking-widest">POLYGLASS</span>
                        </div>
                  </div>
      </section>
      
    </div>
  );
}
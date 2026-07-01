import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
      
      // Clear container before appending to avoid duplicates in React strict mode
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

      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(shaderReqId);
        cancelAnimationFrame(threeReqId);
        if (renderer) renderer.dispose();
      };
    }
  }, []);

  return (
    <div className="bg-surface text-on-background font-body-md overflow-x-hidden">
      
      {/* Dramatic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-primary-container overflow-hidden">
        <canvas ref={shaderRef} className="absolute inset-0 z-0 w-full h-full"></canvas>
        <div className="relative z-20 max-w-container-max mx-auto px-margin-desktop w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 backdrop-blur-md bg-white/5 p-8 md:p-12 border border-white/10 rounded-xl transition-all duration-1000 opacity-0 animate-fade-up">
              <div className="flex items-center space-x-4 mb-8">
                <div className="h-px w-12 bg-secondary"></div>
                <span className="text-secondary font-label-md uppercase tracking-[0.3em]">ESTABLISHED 1999</span>
              </div>
              <h1 className="font-display-lg text-4xl md:text-6xl text-white mb-8 leading-[1.1] transition-all duration-700">
                25+ Years of <span className="text-secondary">Excellence</span> in Fiber & Polycarbonate
              </h1>
              <p className="font-body-lg text-on-primary-container max-w-2xl mb-12 text-xl leading-relaxed">
                Premium quality Acrylic, Fiberglass, and Polycarbonate sheets manufactured with precision in Noida. Trusted by architects and industrial developers worldwide.
              </p>
              <div className="flex flex-wrap gap-6 opacity-0 animate-fade-up delay-200">
                <Link to="/products" className="bg-secondary text-on-secondary px-12 py-5 font-label-md hover:translate-y-[-2px] hover:shadow-2xl transition-all animate-pulse-subtle">
                  VIEW CATALOG
                </Link>
                <Link to="/photos" className="border-2 border-white/20 text-white px-12 py-5 font-label-md hover:bg-white hover:text-primary transition-all glass-card">
                  OUR PROJECTS
                </Link>
              </div>
            </div>
            
            <div ref={threeContainerRef} className="lg:col-span-5 h-[400px] md:h-[600px] relative"></div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hex-pattern opacity-10 pointer-events-none"></div>
      </section>

      {/* Stats Bar */}
      <section className="bg-surface py-20 relative border-b border-outline-variant/30">
        <div className="absolute inset-0 industrial-pattern"></div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col group">
              <span className="text-on-surface-variant font-label-md mb-2 block group-hover:text-secondary transition-colors">EXPERIENCE</span>
              <span className="font-display-lg text-5xl text-primary border-l-4 border-secondary pl-6 mb-2">25+</span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-tighter">Industry Leading Years</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-on-surface-variant font-label-md mb-2 block group-hover:text-secondary transition-colors">TRUSTED</span>
              <span className="font-display-lg text-5xl text-primary border-l-4 border-secondary pl-6 mb-2">4.0<span className="text-2xl text-secondary">/5</span></span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-tighter">Satisfaction Rating</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-on-surface-variant font-label-md mb-2 block group-hover:text-secondary transition-colors">COMPLIANCE</span>
              <span className="font-display-lg text-5xl text-primary border-l-4 border-secondary pl-6 mb-2">GST</span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-tighter">Fully Registered Entity</span>
            </div>
            <div className="flex flex-col group">
              <span className="text-on-surface-variant font-label-md mb-2 block group-hover:text-secondary transition-colors">LOCATION</span>
              <span className="font-display-lg text-5xl text-primary border-l-4 border-secondary pl-6 mb-2">NOIDA</span>
              <span className="text-on-surface-variant text-sm font-medium uppercase tracking-tighter">Strategic Manufacturing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-secondary font-label-md tracking-widest mb-4 block uppercase">Our Expertise</span>
              <h2 className="font-display-lg text-4xl md:text-5xl text-primary mb-6">Integrated Industrial Solutions</h2>
              <div className="h-1.5 w-32 bg-primary"></div>
            </div>
            <p className="font-body-lg text-on-surface-variant max-w-md pb-2">
              Comprehensive solutions from precision raw material manufacturing to large-scale structural fabrication and on-site assembly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-outline-variant/30">
            <div className="p-16 border-r border-b border-outline-variant/30 hover:bg-slate-100 group transition-all duration-500">
              <div className="w-14 h-14 flex items-center justify-center border border-secondary mb-10 group-hover:bg-secondary group-hover:border-secondary transition-all">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">factory</span>
              </div>
              <h3 className="font-headline-sm text-2xl mb-6 transition-colors">Manufacturing</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                State-of-the-art facility in Noida producing high-density Translite fiber sheets with multi-layer UV protection.
              </p>
            </div>
            <div className="p-16 border-r border-b border-outline-variant/30 hover:bg-slate-100 group transition-all duration-500">
              <div className="w-14 h-14 flex items-center justify-center border border-secondary mb-10 group-hover:bg-secondary group-hover:border-secondary transition-all">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">handshake</span>
              </div>
              <h3 className="font-headline-sm text-2xl mb-6 transition-colors">Trading</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Authorized primary dealers for global polycarbonate giants including Makrolon and Lexan technical solutions.
              </p>
            </div>
            <div className="p-16 border-r border-b border-outline-variant/30 hover:bg-slate-100 group transition-all duration-500">
              <div className="w-14 h-14 flex items-center justify-center border border-secondary mb-10 group-hover:bg-secondary group-hover:border-secondary transition-all">
                <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white">architecture</span>
              </div>
              <h3 className="font-headline-sm text-2xl mb-6 transition-colors">Shed Fabrication</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                End-to-end professional installation services for industrial sheds using premium fiber and polycarbonate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-32 bg-primary-container text-white relative overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="mb-20 text-center">
            <span className="text-secondary font-label-md tracking-widest block mb-4 uppercase">Featured Collections</span>
            <h2 className="font-display-lg text-4xl md:text-5xl mb-4">Primary Product Catalog</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="product-card group relative bg-white/5 p-4 transition-all duration-500">
              <div className="relative aspect-[16/10] overflow-hidden mb-10">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuIn7e9ChXK30vO2Aq_YdlXyWhaXbNMJnmH9rhWF9wL62GLUMBdZJ9aZfbIe6Se7il3qlnHFC22nxEpdL_WhW-QdShjVK4I-N57b2kL70B45OObXAZvKCMwJeArIYnsZqqJB3w9pirfjFWsJYk933mLyTAwStfmE5HlSWIP5YXpttvq0o-ytANeYFRwJrpK30o6mRmmenHCGX2nSVwauSr6u7dMjratH_wnq1UJU51bgJ2CEkgxPFwV8M5_5s0nuw_QPgERFBxxsA4')" }}></div>
                <div className="absolute top-0 right-0 bg-secondary text-on-secondary px-6 py-2 font-label-md text-[10px]">BEST SELLER</div>
              </div>
              <div className="px-6 pb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display-lg text-3xl">Acrylic Sheets</h3>
                  <span className="text-secondary font-label-md">IN STOCK</span>
                </div>
                <p className="font-body-md text-on-primary-container mb-10 line-clamp-2">
                  High-transparency acrylic sheets available in multiple thicknesses and custom dimensions. Ideal for signage and displays.
                </p>
                <Link to="/products" className="flex items-center text-white font-label-md group/btn">
                  <span className="border-b border-white group-hover/btn:border-secondary transition-colors">SPECIFICATIONS</span>
                  <span className="material-symbols-outlined ml-4 text-secondary group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
            <div className="product-card group relative bg-white/5 p-4 transition-all duration-500">
              <div className="relative aspect-[16/10] overflow-hidden mb-10">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNa3JAu3wSstiS-07rcIzzBIE8nqeHBrP2rZM40WMW_Dho3Pv8qmDLSxava-LWcxQQo8-SXpkuAqBJ_DoDjiflbwC7pQIWqCgDaqg-GH8C5OoPqOR6YgdxoQTPkUGdE8hj6zVcQIwqz_tKjnHqNA0RSGifOf_crkBu2xOQWrNZsTjMSJnqOmh61AdrPTu3HYzR4Nsy8qjRDZKJ9oISU3RIHaJvruqppPLd1luHDm_bxiAhScCWpdYCcNMmRHaoSqbz5r4dH8hzIWo')" }}></div>
                <div className="absolute top-0 right-0 bg-white text-primary px-6 py-2 font-label-md text-[10px]">IN-HOUSE</div>
              </div>
              <div className="px-6 pb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display-lg text-3xl">Fiberglass Sheets</h3>
                  <span className="text-secondary font-label-md">PREMIUM</span>
                </div>
                <p className="font-body-md text-on-primary-container mb-10 line-clamp-2">
                  Proprietary Translite Fiber technology offering superior weather resistance and structural strength.
                </p>
                <Link to="/products" className="flex items-center text-white font-label-md group/btn">
                  <span className="border-b border-white group-hover/btn:border-secondary transition-colors">TECHNICAL DATA</span>
                  <span className="material-symbols-outlined ml-4 text-secondary group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
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
            <span className="font-display-lg text-3xl text-primary tracking-tighter">TRANSLITE™</span>
            <span className="font-display-lg text-3xl font-bold text-on-surface italic">LUXENBLOOMS</span>
            <span className="font-display-lg text-4xl font-extrabold text-secondary tracking-tight">Excel Wallpapers</span>
            <span className="font-display-lg text-3xl text-primary tracking-widest">POLYGLASS</span>
          </div>
        </div>
      </section>
      
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Layers, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import KurraLogo from './KurraLogo';

export default function BrandStory({ onOpenBooking }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const TOTAL_FRAMES = 240;

  // Preload all 240 frames on mount
  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/brand_frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (i === 1) {
          drawCanvas(img);
        }
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Canvas draw helper with full-screen "object-fit: cover"
  const drawCanvas = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const hRatio = width / img.width;
    const vRatio = height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (width - img.width * ratio) / 2;
    const centerShift_y = (height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Scroll Listener for Sticky Scrubbing & Scroll-Driven Content Popups
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || images.length === 0) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollable = rect.height - windowHeight;
      const currentScroll = -rect.top;

      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);

      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
      setCurrentFrameIndex(frameIndex);

      if (images[frameIndex]) {
        requestAnimationFrame(() => drawCanvas(images[frameIndex]));
      }
    };

    const handleResize = () => {
      if (images[currentFrameIndex]) {
        drawCanvas(images[currentFrameIndex]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [images, currentFrameIndex]);

  // Phase Boundaries (240 Frames Scroll Progression)
  const isPhase1Visible = scrollProgress >= 0 && scrollProgress < 0.22;
  const isPhase2Visible = scrollProgress >= 0.25 && scrollProgress < 0.50;
  const isPhase3Visible = scrollProgress >= 0.53 && scrollProgress < 0.78;
  const isPhase4Visible = scrollProgress >= 0.81;

  const materials = [
    { title: "ITALIAN MARBLE", desc: "Bottochino & Statuario Stone" },
    { title: "GERMAN GLAZING", desc: "Double-Glazed Acoustic Glass" },
    { title: "PRIVATE DECK POOLS", desc: "Floating Balcony Plunge Pools" },
    { title: "SKY LOUNGE", desc: "30th Floor Resident Terrace" }
  ];

  return (
    <div ref={containerRef} id="overview" className="relative h-[480vh] bg-[#161210]">
      {/* Sticky Viewport Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Ambient Smokey Dark Gradient Overlays (Top & Bottom Smooth Smoke Fade) */}
        <div className="absolute top-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-b from-[#161210] via-[#161210]/70 via-[#161210]/30 to-transparent z-5 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-[#161210] via-[#161210]/80 via-[#161210]/40 to-transparent z-5 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#161210]/20 to-[#161210]/90 z-1 pointer-events-none" />

        {/* ==================== PHASE 1: MAIN INTRO CARD (CENTER POPUP) ==================== */}
        <div
          className={`absolute z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-700 pointer-events-none ${
            isPhase1Visible
              ? 'opacity-100 translate-y-0 scale-100 animate-slide-up'
              : 'opacity-0 -translate-y-12 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#211a16]/80 border border-[#b89674]/40 text-xs text-[#d8c7b5] uppercase tracking-[0.3em] font-semibold mb-6 backdrop-blur-md shell-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#b89674] animate-spin" style={{ animationDuration: '6s' }} />
            <span>ABOUT KURRA INFRA</span>
          </div>

          <h2 className="font-serif-header text-4xl sm:text-6xl text-[#f5efe6] font-light leading-tight uppercase drop-shadow-2xl">
            Designed For <br />
            <span className="text-gold-shimmer font-normal italic lowercase tracking-normal">modern living</span>
          </h2>

          <p className="font-sans-body text-xs sm:text-sm text-[#d8c7b5] mt-4 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            At <strong className="text-[#f5efe6]">Kurra Infra</strong>, we create thoughtfully designed developments that prioritize human well-being — blending natural elements, structural integrity, and refined architecture to enhance everyday living.
          </p>

          {/* Key Statistics Bar */}
          <div className="pt-6 mt-6 border-t border-[#b89674]/30 flex items-center justify-center gap-8 max-w-xl mx-auto">
            <div className="hover:scale-105 transition-transform">
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#d8c7b5] block">100%</span>
              <span className="text-[9px] text-[#9c8e82] uppercase tracking-[0.25em] block mt-0.5">Clear Title Land</span>
            </div>
            <div className="h-8 w-[1px] bg-[#b89674]/30" />
            <div className="hover:scale-105 transition-transform">
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#d8c7b5] block">45K+</span>
              <span className="text-[9px] text-[#9c8e82] uppercase tracking-[0.25em] block mt-0.5">Sq.Ft Clubhouse</span>
            </div>
            <div className="h-8 w-[1px] bg-[#b89674]/30" />
            <div className="hover:scale-105 transition-transform">
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#d8c7b5] block">RERA</span>
              <span className="text-[9px] text-[#9c8e82] uppercase tracking-[0.25em] block mt-0.5">Approved Project</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-[#9c8e82] uppercase tracking-[0.35em] animate-bounce">
            <span>SCROLL TO EXPLORE ARCHITECTURAL FRAMEWORK</span>
            <span className="text-[#d8c7b5]">↓</span>
          </div>
        </div>

        {/* ==================== PHASE 2: SLIDES IN FROM LEFT (NATURAL TOPOGRAPHY & TWIN TOWERS) ==================== */}
        <div
          className={`absolute left-6 md:left-16 z-20 max-w-lg transition-all duration-700 ${
            isPhase2Visible
              ? 'opacity-100 translate-x-0 scale-100 animate-slide-left'
              : 'opacity-0 -translate-x-24 scale-95 pointer-events-none'
          }`}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d8c7b5] flex items-center justify-center text-[#161210] shadow-lg">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#d8c7b5] font-semibold block">PHILOSOPHY OF SPACE</span>
                <h3 className="font-serif-header text-xl sm:text-2xl text-[#f5efe6] font-light">Harmonious Topography</h3>
              </div>
            </div>

            <p className="font-sans-body text-xs text-[#9c8e82] leading-relaxed font-light">
              Set within Hyderabad’s prestigious Financial District, <strong className="text-[#d8c7b5]">AMARIS</strong> represents our crowning achievement: an enclave where first impressions meet lasting impact. Two iconic towers rise in quiet distinction across an 8-metre natural slope.
            </p>

            <div className="pt-2 flex items-center gap-4 border-t border-[#b89674]/20 text-[10px] text-[#d8c7b5] font-cinzel font-semibold tracking-widest">
              <span>8-METRE NATURAL SLOPE</span>
              <span>•</span>
              <span>TWIN ICONIC TOWERS</span>
            </div>
          </div>
        </div>

        {/* ==================== PHASE 3: SLIDES IN FROM RIGHT (MATERIALS MATTER & CRAFTSMANSHIP) ==================== */}
        <div
          className={`absolute right-6 md:right-16 z-20 max-w-lg transition-all duration-700 ${
            isPhase3Visible
              ? 'opacity-100 translate-x-0 scale-100 animate-slide-right'
              : 'opacity-0 translate-x-24 scale-95 pointer-events-none'
          }`}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d8c7b5] flex items-center justify-center text-[#161210] shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#d8c7b5] font-semibold block">CRAFTSMANSHIP & MATERIALS</span>
                <h3 className="font-serif-header text-xl sm:text-2xl text-[#f5efe6] font-light">Materials Matter</h3>
              </div>
            </div>

            <p className="font-sans-body text-xs text-[#9c8e82] leading-relaxed font-light">
              Texture. Strength. Timeless Beauty. Every material is curated to create an enduring sanctuary that withstands generations while offering quiet luxury.
            </p>

            {/* Material Specification List */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#b89674]/20">
              {materials.map((mat, idx) => (
                <div key={idx} className="bg-[#161210]/60 p-2.5 rounded-xl border border-[#b89674]/20">
                  <span className="font-cinzel text-[10px] text-[#f5efe6] font-bold block">{mat.title}</span>
                  <span className="text-[8px] text-[#9c8e82] block">{mat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================== PHASE 4: SLIDES UP FROM BOTTOM (EXCLUSIVITY & FINAL CALL TO ACTION) ==================== */}
        <div
          className={`absolute bottom-12 z-20 max-w-2xl px-6 text-center transition-all duration-700 ${
            isPhase4Visible
              ? 'opacity-100 translate-y-0 scale-100 animate-popup'
              : 'opacity-0 translate-y-16 scale-95 pointer-events-none'
          }`}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4">
            <KurraLogo size="small" variant="gold" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d8c7b5] font-semibold block">
              EXCLUSIVITY & PRESTIGE
            </span>

            <h3 className="font-serif-header text-2xl sm:text-3xl text-[#f5efe6] font-light">
              Only a Select Few Belong Here
            </h3>

            <p className="font-sans-body text-xs text-[#9c8e82] max-w-lg mx-auto leading-relaxed">
              Expansive high-ceiling 4 BHK residences with private biometric elevator foyers, floating plunge pools, and 360° views of Financial District.
            </p>

            <div className="flex justify-center pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-pill-filled flex items-center gap-2 text-xs hover:scale-105 transition-transform"
              >
                <span>Schedule Private Site Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Frame Counter Indicator at Bottom Right */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 text-[10px] text-[#d8c7b5] font-cinzel font-semibold tracking-widest bg-[#161210]/90 px-3.5 py-1.5 rounded-full border border-[#b89674]/40 backdrop-blur-md shell-pulse">
          <span>FRAME {String(currentFrameIndex + 1).padStart(3, '0')} / 240</span>
        </div>
      </div>
    </div>
  );
}

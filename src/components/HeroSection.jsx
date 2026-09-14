import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Sparkles, Building2, Layers } from 'lucide-react';
import KurraLogo from './KurraLogo';
import { gsap } from 'gsap';

export default function HeroSection({ onOpenBooking }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Use refs for animation loop values (avoids re-render on every frame)
  const seq1ImagesRef = useRef([]);
  const seq2ImagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const lastFrameIdxRef = useRef(-1);
  const rafIdRef = useRef(null);
  const magneticButtonRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [frameLabel, setFrameLabel] = useState('');

  const TOTAL_FRAMES_SEQ1 = 120;
  const TOTAL_FRAMES_SEQ2 = 120;
  const SEQ1_LIMIT = 0.50; // 50% scroll for 120 seq1 frames, 50% for 120 seq2 frames
  const LERP_FACTOR = 0.12; // Smooth interpolation speed (lower = smoother, 0.08-0.15 sweet spot)

  // Canvas draw with object-fit: cover
  const drawCanvas = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const scale = Math.max(w / img.width, h / img.height);
    const dx = (w - img.width * scale) / 2;
    const dy = (h - img.height * scale) / 2;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, img.width * scale, img.height * scale);
  }, []);

  // Preload both sequences
  useEffect(() => {
    const loadSeq1 = [];
    const loadSeq2 = [];
    
    // Load first 15 frames immediately for initial render
    for (let i = 1; i <= 15; i++) {
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}hero_frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      loadSeq1.push(img);
    }
    seq1ImagesRef.current = loadSeq1;
    loadSeq1[0].onload = () => drawCanvas(loadSeq1[0]);

    // Defer loading the remaining 225 frames so mobile devices don't freeze on mount
    const timer = setTimeout(() => {
      for (let i = 16; i <= TOTAL_FRAMES_SEQ1; i++) {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}hero_frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        loadSeq1.push(img);
      }
      for (let i = 1; i <= TOTAL_FRAMES_SEQ2; i++) {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}seq2_frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        loadSeq2.push(img);
      }
      seq2ImagesRef.current = loadSeq2;
    }, 100);

    return () => clearTimeout(timer);
  }, [drawCanvas]);

  // Get the correct frame image for a given smooth progress value
  const getFrameForProgress = useCallback((p) => {
    const seq1 = seq1ImagesRef.current;
    const seq2 = seq2ImagesRef.current;

    if (p <= SEQ1_LIMIT) {
      if (seq1.length === 0) return null;
      const norm = p / SEQ1_LIMIT;
      const idx = Math.min(TOTAL_FRAMES_SEQ1 - 1, Math.round(norm * (TOTAL_FRAMES_SEQ1 - 1)));
      return { img: seq1[idx], label: `SEQ 1 • FRAME ${String(idx + 1).padStart(2, '0')} / ${TOTAL_FRAMES_SEQ1}`, idx };
    } else {
      if (seq2.length === 0) return null;
      const norm = (p - SEQ1_LIMIT) / (1 - SEQ1_LIMIT);
      const idx = Math.min(TOTAL_FRAMES_SEQ2 - 1, Math.round(norm * (TOTAL_FRAMES_SEQ2 - 1)));
      return { img: seq2[idx], label: `SEQ 2 • FRAME ${String(idx + 1).padStart(3, '0')} / ${TOTAL_FRAMES_SEQ2}`, idx: TOTAL_FRAMES_SEQ1 + idx };
    }
  }, []);

  // Smooth animation loop using lerp (linear interpolation)
  useEffect(() => {
    const tick = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;

      // Lerp towards target
      const diff = target - current;
      if (Math.abs(diff) > 0.0001) {
        smoothProgressRef.current += diff * LERP_FACTOR;
      } else {
        smoothProgressRef.current = target;
      }

      const smoothP = smoothProgressRef.current;

      // Only redraw if frame index actually changed
      const result = getFrameForProgress(smoothP);
      if (result && result.idx !== lastFrameIdxRef.current) {
        lastFrameIdxRef.current = result.idx;
        drawCanvas(result.img);
        setFrameLabel(result.label);
      }

      // Update React state for card visibility (throttled — only when meaningful change)
      setScrollProgress(smoothP);

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawCanvas, getFrameForProgress]);

  // Scroll listener — only updates the target (no canvas work here)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      targetProgressRef.current = Math.min(1, Math.max(0, currentScroll / totalScrollable));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // GSAP Magnetic Button Effect
  useEffect(() => {
    const btn = magneticButtonRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", {duration: 0.4, ease: "power3"});
    const yTo = gsap.quickTo(btn, "y", {duration: 0.4, ease: "power3"});

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left) - rect.width / 2;
      const y = (e.clientY - rect.top) - rect.height / 2;
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Phase visibility with smooth opacity transitions via CSS
  // Wider overlap zones for crossfade effect between phases
  const phaseOpacity = (start, end) => {
    const fadeIn = 0.015;
    const fadeOut = 0.015;
    if (scrollProgress < start || scrollProgress > end) return 0;
    if (scrollProgress < start + fadeIn) return (scrollProgress - start) / fadeIn;
    if (scrollProgress > end - fadeOut) return (end - scrollProgress) / fadeOut;
    return 1;
  };

  const phase1Op = phaseOpacity(0, 0.165);
  const phase2Op = phaseOpacity(0.165, 0.33);
  const phase3Op = phaseOpacity(0.33, 0.50);
  const phase4Op = phaseOpacity(0.50, 0.625);
  const phase5Op = phaseOpacity(0.625, 0.75);
  const phase6Op = phaseOpacity(0.75, 0.875);
  const phase7Op = phaseOpacity(0.875, 1.01);

  const materials = [
    { title: "ITALIAN MARBLE", desc: "Bottochino & Statuario Stone" },
    { title: "GERMAN GLAZING", desc: "Double-Glazed Acoustic Glass" },
    { title: "PRIVATE DECK POOLS", desc: "Floating Balcony Plunge Pools" },
    { title: "SKY LOUNGE", desc: "30th Floor Resident Terrace" }
  ];

  const phaseStyle = (opacity, direction) => {
    // Determine translation based on direction and opacity
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
    let xOffset = 0;
    let yOffset = isMobile ? (1 - opacity) * 20 : 0;
    
    let baseTranslateX = '0px';
    let baseTranslateY = '0px';

    if (direction === 'center') {
      baseTranslateX = '-50%';
      baseTranslateY = '-50%';
      yOffset = (1 - opacity) * 30; // override yOffset for center
    } else if (direction === 'left' || direction === 'right') {
      baseTranslateY = isMobile ? '0px' : '-50%';
      if (direction === 'left') xOffset = isMobile ? 0 : (1 - opacity) * -50;
      if (direction === 'right') xOffset = isMobile ? 0 : (1 - opacity) * 50;
    } else if (direction === 'bottom') {
      yOffset = (1 - opacity) * 30;
      // No base translation needed
    }

    return {
      opacity,
      transform: `translate(calc(${baseTranslateX} + ${xOffset}px), calc(${baseTranslateY} + ${yOffset}px)) scale(${0.98 + opacity * 0.02})`,
      transition: 'none',
      pointerEvents: opacity > 0.1 ? 'auto' : 'none',
    };
  };

  // Smooth fade out at the very end to seamlessly transition to the next section
  const endFadeOpacity = scrollProgress > 0.95 ? Math.max(0, 1 - ((scrollProgress - 0.95) / 0.05)) : 1;

  return (
    <div ref={containerRef} className="relative h-[900vh] bg-[#161210]">
      {/* Sticky Viewport */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ opacity: endFadeOpacity }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ imageRendering: 'auto' }}
        />

        {/* Smokey Overlays */}
        <div className="absolute top-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-b from-[#161210] via-[#161210]/80 via-[#161210]/40 to-transparent z-5 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-[#161210] via-[#161210]/90 via-[#161210]/50 to-transparent z-5 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#161210]/30 to-[#161210]/95 z-1 pointer-events-none" />

        {/* ===== PHASE 1: HERO INTRO ===== */}
        <div
          className="absolute top-1/2 left-1/2 z-10 max-w-3xl w-full px-4 sm:px-6 text-center"
          style={phaseStyle(phase1Op, 'center')}
        >
          <div className="shell-container p-6 sm:p-10 rounded-3xl space-y-4 border border-[#b89674]/50 bg-[#161210]/92 backdrop-blur-2xl shadow-2xl shell-pulse">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161210] border border-[#b89674]/50 text-xs text-[#f5efe6] uppercase tracking-[0.3em] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#b89674] animate-spin" style={{ animationDuration: '8s' }} />
              <span>KURRA INFRA PRESENTS AMARIS</span>
            </div>

            <h1 className="font-serif-header text-3xl sm:text-5xl lg:text-7xl text-[#f5efe6] font-light leading-[1.08] tracking-tight uppercase drop-shadow-2xl">
              DESIGN THE WAY <br />
              <span className="text-gold-shimmer font-normal italic lowercase tracking-normal">you live.</span>
            </h1>

            <p className="font-sans-body text-sm sm:text-base text-[#e2d6c7] max-w-xl mx-auto font-normal leading-relaxed drop-shadow-md">
              Residences shaped by natural slope topography, enduring architectural materials, and modern elegance in Financial District.
            </p>

            <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-[#d8c7b5] uppercase tracking-[0.35em] font-semibold animate-bounce">
              <span>SCROLL DOWN TO SCRUB 3D ANIMATION</span>
              <span className="text-[#f5efe6]">↓</span>
            </div>
          </div>
        </div>

        {/* ===== PHASE 2: 8-METRE SLOPE (LEFT) ===== */}
        <div
          className="absolute left-4 right-4 sm:right-auto sm:left-10 md:left-16 bottom-[12%] sm:bottom-auto sm:top-1/2 z-20 sm:max-w-md md:max-w-lg w-auto sm:w-full"
          style={phaseStyle(phase2Op, 'left')}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4 bg-[#161210]/92 backdrop-blur-2xl border border-[#b89674]/50 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d8c7b5] flex items-center justify-center text-[#161210] shadow-lg">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d8c7b5] font-bold block">ARCHITECTURAL DESIGN</span>
                <h3 className="font-serif-header text-xl sm:text-2xl text-[#f5efe6] font-normal">8-Metre Natural Slope</h3>
              </div>
            </div>
            <p className="font-sans-body text-xs sm:text-sm text-[#e2d6c7] leading-relaxed font-normal">
              AMARIS unfolds gracefully across an 8-metre natural slope terrain in Hyderabad's Financial District. Two iconic towers rise in quiet distinction, giving every residence multi-tiered elevated views and cascading botanical airflow.
            </p>
            <div className="pt-3 flex items-center gap-4 border-t border-[#b89674]/30 text-[10px] text-[#f5efe6] font-cinzel font-bold tracking-widest">
              <span>82% OPEN LANDSCAPE</span>
              <span>•</span>
              <span>BIOPHILIC LUXURY</span>
            </div>
          </div>
        </div>

        {/* ===== PHASE 3: SKY CLUBHOUSE (RIGHT) ===== */}
        <div
          className="absolute left-4 right-4 sm:left-auto sm:right-10 md:right-16 bottom-[12%] sm:bottom-auto sm:top-1/2 z-20 sm:max-w-md md:max-w-lg w-auto sm:w-full"
          style={phaseStyle(phase3Op, 'right')}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4 bg-[#161210]/92 backdrop-blur-2xl border border-[#b89674]/50 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d8c7b5] flex items-center justify-center text-[#161210] shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d8c7b5] font-bold block">EXCLUSIVE LIFESTYLE</span>
                <h3 className="font-serif-header text-xl sm:text-2xl text-[#f5efe6] font-normal">45,000 Sq.Ft Sky Clubhouse</h3>
              </div>
            </div>
            <p className="font-sans-body text-xs sm:text-sm text-[#e2d6c7] leading-relaxed font-normal">
              Centered between the twin towers lies an expansive wellness sanctuary. Features an artisanal Wellness-Café terrace, temperature-controlled infinity sky pool, Technogym fitness center, private dining suites, and hydrotherapy spa.
            </p>
            <div className="pt-3 flex items-center gap-4 border-t border-[#b89674]/30 text-[10px] text-[#f5efe6] font-cinzel font-bold tracking-widest">
              <span>FINANCIAL DISTRICT</span>
              <span>•</span>
              <span>2 TOWERS</span>
            </div>
          </div>
        </div>

        {/* ===== PHASE 4: DESIGNED FOR MODERN LIVING (CENTER) ===== */}
        <div
          className="absolute top-1/2 left-1/2 z-10 max-w-3xl w-full px-4 sm:px-6 text-center"
          style={phaseStyle(phase4Op, 'center')}
        >
          <div className="shell-container p-6 sm:p-10 rounded-3xl space-y-4 border border-[#b89674]/50 bg-[#161210]/92 backdrop-blur-2xl shadow-2xl shell-pulse">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161210] border border-[#b89674]/50 text-xs text-[#f5efe6] uppercase tracking-[0.3em] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#b89674] animate-spin" style={{ animationDuration: '6s' }} />
              <span>ABOUT KURRA INFRA</span>
            </div>

            <h2 className="font-serif-header text-3xl sm:text-5xl md:text-6xl text-[#f5efe6] font-light leading-tight uppercase drop-shadow-2xl">
              Designed For <br />
              <span className="text-gold-shimmer font-normal italic lowercase tracking-normal">modern living</span>
            </h2>

            <p className="font-sans-body text-xs sm:text-sm text-[#e2d6c7] max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
              At <strong className="text-[#ffffff]">Kurra Infra</strong>, we create thoughtfully designed developments that prioritize human well-being — blending natural elements, structural integrity, and refined architecture to enhance everyday living.
            </p>

            <div className="pt-6 mt-4 border-t border-[#b89674]/40 flex items-center justify-center gap-8 max-w-xl mx-auto">
              <div className="hover:scale-105 transition-transform">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f5efe6] block">100%</span>
                <span className="text-[10px] text-[#d8c7b5] uppercase tracking-[0.25em] font-semibold block mt-0.5">Clear Title Land</span>
              </div>
              <div className="h-8 w-[1px] bg-[#b89674]/40" />
              <div className="hover:scale-105 transition-transform">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f5efe6] block">45K+</span>
                <span className="text-[10px] text-[#d8c7b5] uppercase tracking-[0.25em] font-semibold block mt-0.5">Sq.Ft Clubhouse</span>
              </div>
              <div className="h-8 w-[1px] bg-[#b89674]/40" />
              <div className="hover:scale-105 transition-transform">
                <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f5efe6] block">RERA</span>
                <span className="text-[10px] text-[#d8c7b5] uppercase tracking-[0.25em] font-semibold block mt-0.5">Approved Project</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PHASE 5: HARMONIOUS TOPOGRAPHY (LEFT) ===== */}
        <div
          className="absolute left-4 right-4 sm:right-auto sm:left-10 md:left-16 bottom-[12%] sm:bottom-auto sm:top-1/2 z-20 sm:max-w-md md:max-w-lg w-auto sm:w-full"
          style={phaseStyle(phase5Op, 'left')}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4 bg-[#161210]/92 backdrop-blur-2xl border border-[#b89674]/50 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d8c7b5] flex items-center justify-center text-[#161210] shadow-lg">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d8c7b5] font-bold block">PHILOSOPHY OF SPACE</span>
                <h3 className="font-serif-header text-xl sm:text-2xl text-[#f5efe6] font-normal">Harmonious Topography</h3>
              </div>
            </div>
            <p className="font-sans-body text-xs sm:text-sm text-[#e2d6c7] leading-relaxed font-normal">
              Set within Hyderabad's prestigious Financial District, <strong className="text-[#ffffff]">AMARIS</strong> represents our crowning achievement: an enclave where first impressions meet lasting impact. Two iconic towers rise in quiet distinction across an 8-metre natural slope.
            </p>
            <div className="pt-3 flex items-center gap-4 border-t border-[#b89674]/30 text-[10px] text-[#f5efe6] font-cinzel font-bold tracking-widest">
              <span>8-METRE NATURAL SLOPE</span>
              <span>•</span>
              <span>TWIN ICONIC TOWERS</span>
            </div>
          </div>
        </div>

        {/* ===== PHASE 6: MATERIALS MATTER (RIGHT) ===== */}
        <div
          className="absolute left-4 right-4 sm:left-auto sm:right-10 md:right-16 bottom-[12%] sm:bottom-auto sm:top-1/2 z-20 sm:max-w-md md:max-w-lg w-auto sm:w-full"
          style={phaseStyle(phase6Op, 'right')}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4 bg-[#161210]/92 backdrop-blur-2xl border border-[#b89674]/50 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d8c7b5] flex items-center justify-center text-[#161210] shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d8c7b5] font-bold block">CRAFTSMANSHIP & MATERIALS</span>
                <h3 className="font-serif-header text-xl sm:text-2xl text-[#f5efe6] font-normal">Materials Matter</h3>
              </div>
            </div>
            <p className="font-sans-body text-xs sm:text-sm text-[#e2d6c7] leading-relaxed font-normal">
              Texture. Strength. Timeless Beauty. Every material is curated to create an enduring sanctuary that withstands generations.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#b89674]/30">
              {materials.map((mat, idx) => (
                <div key={idx} className="bg-[#161210]/90 p-2.5 rounded-xl border border-[#b89674]/40">
                  <span className="font-cinzel text-xs text-[#f5efe6] font-bold block">{mat.title}</span>
                  <span className="text-[9px] text-[#d8c7b5] font-medium block mt-0.5">{mat.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== PHASE 7: SELECT FEW (BOTTOM) ===== */}
        <div
          className="absolute bottom-10 z-20 max-w-2xl w-full px-4 sm:px-6 text-center"
          style={phaseStyle(phase7Op, 'bottom')}
        >
          <div className="shell-container p-6 sm:p-8 rounded-3xl space-y-4 bg-[#161210]/92 backdrop-blur-2xl border border-[#b89674]/50 shadow-2xl">
            <KurraLogo size="small" variant="gold" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#d8c7b5] font-bold block">
              EXCLUSIVITY & PRESTIGE
            </span>
            <h3 className="font-serif-header text-2xl sm:text-3xl text-[#f5efe6] font-normal">
              Only a Select Few Belong Here
            </h3>
            <p className="font-sans-body text-xs sm:text-sm text-[#e2d6c7] max-w-lg mx-auto leading-relaxed font-normal">
              Expansive high-ceiling 4 BHK residences with private biometric elevator foyers, floating plunge pools, and 360° views of Financial District.
            </p>
            <div className="flex justify-center pt-2">
              <button
                ref={magneticButtonRef}
                onClick={onOpenBooking}
                className="btn-pill-filled flex items-center gap-2 text-xs hover:scale-105 transition-transform shadow-xl"
              >
                <span>Schedule Private Site Tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Frame Counter */}
        <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 text-[10px] text-[#f5efe6] font-cinzel font-bold tracking-widest bg-[#161210]/95 px-4 py-2 rounded-full border border-[#b89674]/50 backdrop-blur-2xl shadow-2xl shell-pulse">
          <span>{frameLabel}</span>
        </div>
      </div>
    </div>
  );
}

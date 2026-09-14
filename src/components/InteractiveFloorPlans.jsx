import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';

export default function InteractiveFloorPlans({ onOpenBooking }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Refs for smooth animation loop
  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const smoothProgressRef = useRef(0);
  const lastFrameIdxRef = useRef(-1);
  const rafIdRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [selectedTower, setSelectedTower] = useState('Tower A');
  const [selectedCategory, setSelectedCategory] = useState('4BHK Royal');

  const TOTAL_FRAMES = 120;
  const LERP_FACTOR = 0.12;

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
  useEffect(() => {
    const loaded = [];
    
    // Load first 15 frames immediately for initial render
    for (let i = 1; i <= 15; i++) {
      const img = new Image();
      img.src = `/floorplan_frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      loaded.push(img);
    }
    imagesRef.current = loaded;
    loaded[0].onload = () => drawCanvas(loaded[0]);

    // Defer loading the remaining frames so mobile devices don't freeze on mount
    const timer = setTimeout(() => {
      for (let i = 16; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/floorplan_frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
        loaded.push(img);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [drawCanvas]);

  // Smooth animation loop using lerp
  useEffect(() => {
    const tick = () => {
      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.0001) {
        smoothProgressRef.current += diff * LERP_FACTOR;
      } else {
        smoothProgressRef.current = target;
      }

      const p = smoothProgressRef.current;
      const images = imagesRef.current;

      if (images.length > 0) {
        const idx = Math.min(TOTAL_FRAMES - 1, Math.round(p * (TOTAL_FRAMES - 1)));
        if (idx !== lastFrameIdxRef.current && images[idx]) {
          lastFrameIdxRef.current = idx;
          drawCanvas(images[idx]);
          setCurrentFrameIndex(idx);
        }
      }

      setScrollProgress(p);
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawCanvas]);

  // Scroll listener — only sets target
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

  const units = [
    {
      id: 'unit-4bhk-exec',
      category: '4BHK Executive',
      tower: 'Tower A',
      name: '4 BHK Executive Sky Suite',
      carpetArea: '3,450 Sq.Ft',
      superArea: '4,280 Sq.Ft',
      balcony: '380 Sq.Ft East Sky Deck',
      facing: 'East / Slope Skyline View',
      floors: 'Levels 4 - 24',
      features: [
        'Private Elevator Foyer Access',
        'Italian Bottochino Marble Living',
        'Master Suite with Walk-in Wardrobe & Jacuzzi',
        'Poggenpohl Modular Kitchen + Wet Kitchen',
        'Dedicated Servant Suite'
      ],
    },
    {
      id: 'unit-4bhk-royal',
      category: '4BHK Royal',
      tower: 'Tower A',
      name: '4 BHK Royal Sky Suite',
      carpetArea: '3,850 Sq.Ft',
      superArea: '4,900 Sq.Ft',
      balcony: '420 Sq.Ft Sky Terrace Deck',
      facing: 'South-West Sunset View',
      floors: 'Levels 15 - 35',
      features: [
        'Private Biometric Elevator Entry',
        'Private Floating Balcony Plunge Pool',
        'Dual Kitchen (Wet & Dry Setup)',
        'Master Suite with Panoramic Skyline Tub',
        '2 Reserved Basement Car Parks'
      ],
    },
    {
      id: 'unit-4bhk-duplex',
      category: '4BHK Penthouse',
      tower: 'Tower B',
      name: '4 BHK Duplex Sky Villa Penthouse',
      carpetArea: '5,920 Sq.Ft',
      superArea: '7,450 Sq.Ft',
      balcony: '850 Sq.Ft Private Pool Deck',
      facing: '360° Skyline View',
      floors: 'Levels 38 - 40',
      features: [
        'Private Heated Infinity Edge Deck Pool',
        '22-Ft Double Height Living Ceilings',
        'Personal Private High-Speed Elevator',
        'Butler Pantry & Maid Quarters',
        '4 Exclusive Basement Car Parks'
      ],
    }
  ];

  const activeUnit = units.find(u => u.category === selectedCategory && u.tower === selectedTower) || units.find(u => u.category === selectedCategory) || units[0];

  // Overall section fade for header and footer controls
  const sectionOpacity = (() => {
    if (scrollProgress < 0.03) return scrollProgress / 0.03;
    if (scrollProgress > 0.92) return (1 - scrollProgress) / 0.08;
    return 1;
  })();

  // Smooth card fade in/out sequence
  const leftCardOpacity = (() => {
    if (scrollProgress < 0.03) return scrollProgress / 0.03;
    if (scrollProgress > 0.45 && scrollProgress <= 0.50) return (0.50 - scrollProgress) / 0.05;
    if (scrollProgress > 0.50) return 0;
    return 1;
  })();

  const rightCardOpacity = (() => {
    if (scrollProgress < 0.50) return 0;
    if (scrollProgress >= 0.50 && scrollProgress <= 0.55) return (scrollProgress - 0.50) / 0.05;
    if (scrollProgress > 0.92) return (1 - scrollProgress) / 0.08;
    return 1;
  })();

  const getCardStyle = (opacity) => ({
    opacity: Math.max(0, opacity),
    transform: `scale(${0.95 + opacity * 0.05})`,
    transition: 'none',
    pointerEvents: opacity > 0.1 ? 'auto' : 'none',
  });

  return (
    <div ref={containerRef} id="floor-plans" className="relative h-[800vh] bg-[#161210]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-8">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          style={{ imageRendering: 'auto' }}
        />

        {/* Smokey Overlays */}
        <div className="absolute top-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-b from-[#161210] via-[#161210]/80 via-[#161210]/40 to-transparent z-5 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 bg-gradient-to-t from-[#161210] via-[#161210]/90 via-[#161210]/50 to-transparent z-5 pointer-events-none backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#161210]/30 to-[#161210]/95 z-1 pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 text-center max-w-xl mx-auto pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161210]/90 border border-[#b89674]/50 text-xs text-[#f5efe6] uppercase tracking-widest font-semibold backdrop-blur-2xl shadow-xl" style={{ opacity: sectionOpacity, transition: 'none' }}>
            <Sparkles className="w-3.5 h-3.5 text-[#b89674]" />
            <span>EXCLUSIVE 4 BHK RESIDENCE EXPLORER</span>
          </div>
        </div>

        {/* Left Card */}
        <div
          className="absolute left-4 right-4 sm:right-auto sm:left-10 bottom-24 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 sm:max-w-md w-auto sm:w-full"
          style={{ ...getCardStyle(leftCardOpacity), transform: `translateX(${(1 - leftCardOpacity) * -15}px) scale(${0.98 + leftCardOpacity * 0.02})` }}
        >
          <div className="shell-container rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-2 sm:space-y-5">
            <div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-[#d8c7b5] font-bold block mb-0.5 sm:mb-1">
                {activeUnit.tower} • {activeUnit.floors}
              </span>
              <h2 className="font-serif-header text-lg sm:text-3xl text-[#f5efe6] font-normal">
                {activeUnit.name}
              </h2>
            </div>

            <div className="space-y-1.5 sm:space-y-2.5 pt-1 sm:pt-2 border-t border-[#b89674]/30">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-[#d8c7b5] font-bold w-12 sm:w-14">Tower:</span>
                <div className="flex gap-1 sm:gap-1.5">
                  {['Tower A', 'Tower B'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTower(t)}
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold tracking-wider transition-all flex items-center gap-1 ${
                        selectedTower === t
                          ? 'bg-[#d8c7b5] text-[#161210] shadow-md scale-105'
                          : 'bg-[#161210]/80 text-[#d8c7b5] border border-[#b89674]/30 hover:border-[#b89674]'
                      }`}
                    >
                      <Building2 className="w-3 h-3" />
                      <span>{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-[#d8c7b5] font-bold w-12 sm:w-14">4 BHK:</span>
                <div className="flex gap-1 sm:gap-1.5 flex-wrap">
                  {[
                    { id: '4BHK Executive', label: 'EXEC' },
                    { id: '4BHK Royal', label: 'ROYAL' },
                    { id: '4BHK Penthouse', label: 'DUPLEX' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold tracking-wider transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-[#b89674] text-[#161210] shadow-md scale-105'
                          : 'bg-[#161210]/80 text-[#d8c7b5] border border-[#b89674]/30 hover:border-[#b89674]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 pt-0.5 sm:pt-1">
              <div className="bg-[#161210]/90 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#b89674]/30">
                <span className="text-[7px] sm:text-[9px] text-[#d8c7b5] font-bold uppercase tracking-widest block">Carpet Area</span>
                <span className="font-cinzel text-[10px] sm:text-sm text-[#f5efe6] font-bold">{activeUnit.carpetArea}</span>
              </div>
              <div className="bg-[#161210]/90 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#b89674]/30">
                <span className="text-[7px] sm:text-[9px] text-[#d8c7b5] font-bold uppercase tracking-widest block">Super Built</span>
                <span className="font-cinzel text-[10px] sm:text-sm text-[#f5efe6] font-bold">{activeUnit.superArea}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div
          className="absolute left-4 right-4 sm:left-auto sm:right-10 bottom-24 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 sm:max-w-md w-auto sm:w-full"
          style={{ ...getCardStyle(rightCardOpacity), transform: `translateX(${(1 - rightCardOpacity) * 15}px) scale(${0.98 + rightCardOpacity * 0.02})` }}
        >
          <div className="shell-container rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-2 sm:space-y-5">
            <div>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] text-[#d8c7b5] font-bold block mb-1 sm:mb-2">
                EXCLUSIVE SPECIFICATIONS
              </span>
              <div className="space-y-1 sm:space-y-2">
                {activeUnit.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2.5 text-[9px] sm:text-xs text-[#f5efe6] font-medium group">
                    <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#d8c7b5] shrink-0 group-hover:scale-125 transition-transform" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 pt-0.5 sm:pt-1 border-t border-[#b89674]/30">
              <div className="bg-[#161210]/90 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#b89674]/30">
                <span className="text-[7px] sm:text-[9px] text-[#d8c7b5] font-bold uppercase tracking-widest block">Terrace Deck</span>
                <span className="font-cinzel text-[10px] sm:text-xs text-[#f5efe6] font-bold">{activeUnit.balcony}</span>
              </div>
              <div className="bg-[#161210]/90 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-[#b89674]/30">
                <span className="text-[7px] sm:text-[9px] text-[#d8c7b5] font-bold uppercase tracking-widest block">Orientation</span>
                <span className="font-cinzel text-[10px] sm:text-xs text-[#f5efe6] font-bold">{activeUnit.facing}</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#ffffff] hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Reserve 4 BHK Layout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Frame Counter */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto flex items-center justify-between pt-2 pb-1 border-t border-[#b89674]/30" style={{ opacity: sectionOpacity, transition: 'none' }}>
          <div className="flex items-center gap-2 text-[10px] text-[#f5efe6] uppercase tracking-[0.3em] font-semibold">
            <span>Scroll To Rotate Elevation</span>
            <span className="animate-bounce text-[#d8c7b5]">↓</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#f5efe6] font-cinzel font-bold tracking-widest bg-[#161210]/95 px-4 py-1.5 rounded-full border border-[#b89674]/50 backdrop-blur-2xl shadow-xl">
            <span>3D ELEVATION FRAME {String(currentFrameIndex + 1).padStart(2, '0')} / 40</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Eye, Building2 } from 'lucide-react';
import KurraLogo from './KurraLogo';
import { revealStagger, fadeUpText, killScrollTriggers } from '../utils/gsapUtils';
import { gsap } from 'gsap';

export default function GallerySection({ onOpenBooking }) {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const galleryItems = [
    {
      id: 1,
      tag: 'architecture',
      title: 'Iconic Twin Towers Elevation',
      category: 'Exterior Architecture',
      subtitle: 'Twin Iconic Towers Rising Across 8m Natural Slope',
      description: 'Rising 40 floors in quiet distinction in Hyderabad’s Financial District, featuring double-glazed acoustic elevation.',
      image: `${import.meta.env.BASE_URL}amaris_assets/amaris_towers.jpg`
    },
    {
      id: 2,
      tag: 'interiors',
      title: 'Grand Living Suite & Italian Marble',
      category: 'Luxury Interiors',
      subtitle: 'High-Ceiling Living Spaces with Bottochino Stone',
      description: 'Expansive open-plan living and dining spaces adorned with fine Italian marble and 270° floor-to-ceiling glazing.',
      image: `${import.meta.env.BASE_URL}amaris_assets/amaris_opulence.jpg`
    },
    {
      id: 3,
      tag: 'lifestyle',
      title: '30th Floor Resident Sky Lounge',
      category: 'Clubhouse & Amenities',
      subtitle: 'Exclusive Skyline Deck & Private Gathering Suites',
      description: 'Tranquil evening terrace equipped with artisanal coffee bar, wine tasting lounge, and panoramic skyline vistas.',
      image: `${import.meta.env.BASE_URL}amaris_assets/amaris_sky_lounge.jpg`
    },
    {
      id: 4,
      tag: 'lifestyle',
      title: 'Private Floating Balcony Plunge Pool',
      category: 'Balcony Sanctuary',
      subtitle: 'Still Water, Soaring Skyline Views',
      description: 'Personal temperature-controlled plunge pools integrated seamlessly into expansive private balcony decks.',
      image: `${import.meta.env.BASE_URL}amaris_assets/amaris_plunge_pool.jpg`
    },
    {
      id: 5,
      tag: 'architecture',
      title: 'Architectural Crown Structure',
      category: 'Crown Elevation',
      subtitle: 'The Crown Jewel of Financial District',
      description: 'Custom bronze-trimmed crown illuminated at night, creating an instantly recognizable skyline beacon.',
      image: `${import.meta.env.BASE_URL}amaris_assets/amaris_crown_jewel.png`
    },
    {
      id: 6,
      tag: 'interiors',
      title: 'Master Bedroom Sky Suite',
      category: 'Master Suites',
      subtitle: 'Uninterrupted Horizon Views & Walk-in Wardrobe',
      description: 'Master sanctuary featuring bespoke timber paneling, private terrace access, and spa-inspired ensuite bath.',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85'
    },
    {
      id: 7,
      tag: 'lifestyle',
      title: 'Temperature-Controlled Infinity Sky Pool',
      category: 'Clubhouse & Amenities',
      subtitle: '45,000 Sq.Ft Sky Sanctuary',
      description: 'Suspended sky pool overlooking the Financial District with underwater sound systems and hydrotherapy lounges.',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85'
    },
    {
      id: 8,
      tag: 'architecture',
      title: 'Biophilic Slope Botanical Gardens',
      category: 'Landscape Topography',
      subtitle: '82% Open Green Topography',
      description: 'Cascading water channels, native flora, and terraced seating woven into the 8-metre slope topography.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    }
  ];

  useEffect(() => {
    // Initial GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        fadeUpText(headerRef.current.children, sectionRef.current);
      }
      if (gridRef.current) {
        revealStagger(gridRef.current.children, sectionRef.current);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      killScrollTriggers();
    };
  }, []);

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(g => g.tag === filter);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filtered.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-24 luxury-texture-bg luxury-pattern-overlay relative overflow-hidden">
      {/* Smokey Blend Transition Gradients at Top and Bottom */}
      <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-[#161210] via-[#161210]/70 via-[#161210]/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#161210] via-[#161210]/70 via-[#161210]/30 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#211a16] border border-[#b89674]/40 text-xs text-[#d8c7b5] uppercase tracking-[0.3em] font-semibold mb-4 backdrop-blur-md shell-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#b89674] animate-spin" style={{ animationDuration: '6s' }} />
              <span>OFFICIAL VISUAL SHOWCASE</span>
            </div>
            <h2 className="font-serif-header text-3xl sm:text-5xl text-[#f5efe6] font-light uppercase tracking-tight">
              EXPERIENCE THE SPLENDOR <br />
              <span className="text-gold-shimmer font-normal italic lowercase tracking-normal">of amaris</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Renders' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'interiors', label: 'Interiors' },
              { id: 'lifestyle', label: 'Sky Clubhouse' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  filter === tab.id
                    ? 'bg-[#d8c7b5] text-[#161210] shadow-lg scale-105 font-bold'
                    : 'bg-[#161210]/80 text-[#9c8e82] border border-[#b89674]/25 hover:border-[#b89674] hover:text-[#f5efe6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ultra-Luxury Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="relative h-40 sm:h-80 rounded-2xl sm:rounded-3xl overflow-hidden glass-panel group espresso-card-hover shell-pulse cursor-pointer"
            >
              {/* High-Res Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[0.8] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#161210]/85 backdrop-blur-md px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#b89674]/40 text-[6px] sm:text-[9px] text-[#d8c7b5] uppercase tracking-[0.25em] font-semibold truncate max-w-[70%]">
                {item.category}
              </div>

              {/* Expand Icon Button Top-Right */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#161210]/85 border border-[#b89674]/40 backdrop-blur-md flex items-center justify-center text-[#d8c7b5] group-hover:bg-[#d8c7b5] group-hover:text-[#161210] group-hover:scale-110 transition-all shadow-lg">
                <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>

              {/* Bottom Caption Card */}
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-5 text-left">
                <span className="text-[6px] sm:text-[9px] uppercase tracking-[0.3em] text-[#d8c7b5] font-semibold block mb-0.5 sm:mb-1 truncate">
                  AMARIS PROJECT RENDER
                </span>
                <h3 className="font-serif-header text-[11px] sm:text-xl text-[#f5efe6] font-medium group-hover:text-[#b89674] transition-colors leading-snug line-clamp-2 sm:line-clamp-none">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-[9999] bg-[#161210]/95 animate-overlay-fade flex items-center justify-center p-4 sm:p-8">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#211a16] text-[#d8c7b5] border border-[#b89674]/40 hover:bg-[#d8c7b5] hover:text-[#161210] hover:scale-110 transition-all z-30 shadow-2xl"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevLightbox}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border border-[#b89674]/40 flex items-center justify-center text-[#f5efe6] hover:bg-[#d8c7b5] hover:text-[#161210] hover:scale-110 transition-all z-30 shadow-2xl"
            aria-label="Previous render"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel border border-[#b89674]/40 flex items-center justify-center text-[#f5efe6] hover:bg-[#d8c7b5] hover:text-[#161210] hover:scale-110 transition-all z-30 shadow-2xl"
            aria-label="Next render"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Main Card Shell */}
          <div className="relative max-w-5xl w-full bg-[#211a16] border border-[#b89674]/50 rounded-3xl overflow-hidden shadow-2xl animate-popup shell-pulse flex flex-col max-h-[88vh]">
            <div className="relative flex-1 bg-[#161210] overflow-hidden min-h-[380px] sm:min-h-[480px] flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain p-2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-transparent to-transparent opacity-90 pointer-events-none" />

              <div className="absolute top-4 left-4 glass-panel px-4 py-1.5 rounded-full border border-[#b89674]/30 text-xs text-[#d8c7b5] flex items-center gap-2 font-mono uppercase">
                <Building2 className="w-4 h-4 text-[#b89674]" />
                <span>{lightboxIndex + 1} / {filtered.length} • {activeItem.category}</span>
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="p-6 bg-[#161210]/95 border-t border-[#b89674]/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <KurraLogo size="small" variant="gold" />
                  <span className="text-[10px] text-[#b89674] uppercase tracking-widest font-semibold">{activeItem.subtitle}</span>
                </div>
                <h3 className="font-serif-header text-2xl text-[#f5efe6] font-light">
                  {activeItem.title}
                </h3>
                <p className="font-sans-body text-xs text-[#9c8e82] mt-1 max-w-2xl font-light">
                  {activeItem.description}
                </p>
              </div>

              {onOpenBooking && (
                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-3 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all flex items-center gap-2 shrink-0 shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>Reserve Layout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


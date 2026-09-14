import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Dumbbell, Waves, UtensilsCrossed, HeartPulse, Trophy, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { revealStagger, fadeUpText, killScrollTriggers } from '../utils/gsapUtils';
import { gsap } from 'gsap';

export default function AmenitiesShowcase({ onOpenBooking }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const amenities = [
    {
      id: 1,
      category: 'wellness',
      title: 'Wellness-Café & Terrace',
      subtitle: 'Artisanal Roasts & Organic Dining',
      description: 'Cozy up on the terrace of our wellness-café and relax to ambient music while savoring specialty espresso adorned with creamy milk foam without leaving home.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      icon: Coffee,
      badge: '45,000 SF CLUBHOUSE',
      highlight: 'Organic Menu & Terrace Seating'
    },
    {
      id: 2,
      category: 'fitness',
      title: 'State-of-the-Art Fitness Center',
      subtitle: 'Guided Personal Training & Cardio Zone',
      description: 'Face the day guided by personal trainers in our modern fitness center equipped with Technogym smart machines, just a few steps up the stairs.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      icon: Dumbbell,
      badge: 'OPEN 24/7',
      highlight: 'Technogym Smart Equipment'
    },
    {
      id: 3,
      category: 'leisure',
      title: 'Temperature-Controlled Sky Pool',
      subtitle: '270° Panoramic Skyline Views',
      description: 'Float suspended above Hyderabad’s Financial District in our temperature-controlled infinity sky pool with Jacuzzi loungers and private cabanas.',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      icon: Waves,
      badge: 'ROOFTOP LEVEL',
      highlight: 'Heated Water & Sky Cabanas'
    },
    {
      id: 4,
      category: 'leisure',
      title: 'Private Banqueting & Dining Suite',
      subtitle: 'Chef-Curated Private Gastronomy',
      description: 'Host intimate celebrations and formal banquets in our private dining suite featuring a chef preparation kitchen and wine tasting lounge.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      icon: UtensilsCrossed,
      badge: 'VIP RESERVATION',
      highlight: 'Private Chef Preparation Kitchen'
    },
    {
      id: 5,
      category: 'sports',
      title: 'Squash & Badminton Arenas',
      subtitle: 'Professional Wooden Courts',
      description: 'Match play standard indoor squash and air-conditioned badminton courts with spectators gallery and equipment lockers.',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80',
      icon: Trophy,
      badge: 'INDOOR ARENA',
      highlight: 'Air-Conditioned Wooden Flooring'
    },
    {
      id: 6,
      category: 'wellness',
      title: 'Hydrotherapy Spa & Sauna',
      subtitle: 'Thermal Baths & Cryo Cabins',
      description: 'Dedicated men’s and women’s steam rooms, Finnish saunas, and hydrotherapy soak tubs for total body rejuvenation.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      icon: HeartPulse,
      badge: 'HOLISTIC WELLNESS',
      highlight: 'Thermal Sauna & Cryo Baths'
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
  }, []); // Only run on mount for scroll triggers

  const filtered = activeCategory === 'all' 
    ? amenities 
    : amenities.filter(a => a.category === activeCategory);

  return (
    <section ref={sectionRef} id="amenities" className="luxury-texture-bg luxury-pattern-overlay relative overflow-hidden">
      {/* Smokey Blend Transition Gradients at Top and Bottom */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#161210] via-[#161210]/80 via-[#161210]/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#161210] via-[#161210]/90 via-[#161210]/50 to-transparent z-10 pointer-events-none" />

      {/* Static Intro Block */}
      <div className="relative z-20 pt-24 sm:pt-32 pb-12 sm:pb-16 flex flex-col items-center text-center px-4 sm:px-6">
        <div ref={headerRef} className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161210]/90 border border-[#b89674]/50 text-xs text-[#f5efe6] uppercase tracking-[0.3em] font-semibold backdrop-blur-2xl shadow-xl mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#b89674] animate-spin" style={{ animationDuration: '6s' }} />
            <span>THE AMARIS LIFESTYLE</span>
          </div>

          <h2 className="font-serif-header text-3xl sm:text-5xl md:text-6xl text-[#f5efe6] font-light uppercase tracking-tight leading-tight">
            <span className="block">
              WORLD-CLASS WELLNESS
            </span>
            <span className="text-gold-shimmer font-normal italic lowercase tracking-normal block mt-2">
              meets refined comfort
            </span>
          </h2>

          <p className="font-sans-body text-sm sm:text-base text-[#e2d6c7] leading-relaxed font-normal max-w-2xl mx-auto">
            Immerse yourself in 45,000 Sq.Ft of private wellness sanctuary crafted for health, vitality, and quiet luxury in Financial District.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-32">
        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 sm:mb-16">
            {[
              { id: 'all', label: 'All Amenities' },
              { id: 'wellness', label: 'Wellness & Spa' },
              { id: 'fitness', label: 'Fitness & Sports' },
              { id: 'leisure', label: 'Sky Leisure' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all uppercase shadow-lg ${
                  activeCategory === tab.id
                    ? 'bg-[#d8c7b5] text-[#161210] scale-105 shadow-[#b89674]/30'
                    : 'bg-[#161210]/80 text-[#d8c7b5] border border-[#b89674]/30 hover:border-[#b89674] hover:text-[#f5efe6]'
                }`}
              >
                {tab.label}
              </button>
            ))}
        </div>

        {/* GSAP Animated Amenities Grid */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8 pb-8">
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="shell-container rounded-2xl sm:rounded-3xl overflow-hidden bg-[#161210]/92 espresso-card-hover group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Hover Zoom & Badge */}
                  <div className="relative h-32 sm:h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-85 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/30 to-transparent opacity-90" />

                    {/* Badge */}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#161210]/95 backdrop-blur-2xl px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#b89674]/50 text-[7px] sm:text-[9px] text-[#f5efe6] tracking-widest font-bold uppercase shadow-xl truncate max-w-[90%]">
                      {item.badge}
                    </div>

                    {/* Floating Icon Box */}
                    <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#161210]/95 border border-[#b89674]/50 backdrop-blur-2xl flex items-center justify-center text-[#d8c7b5] group-hover:scale-110 group-hover:bg-[#d8c7b5] group-hover:text-[#161210] transition-all shadow-xl">
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-7 space-y-1.5 sm:space-y-3">
                    <span className="text-[7px] sm:text-[10px] uppercase tracking-[0.25em] text-[#d8c7b5] font-bold block truncate">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif-header text-sm sm:text-2xl text-[#f5efe6] font-normal leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans-body text-[9px] sm:text-xs text-[#e2d6c7] leading-snug sm:leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>

                    <div className="pt-1.5 sm:pt-2 flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] text-[#f5efe6] font-medium truncate">
                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#d8c7b5] shrink-0" />
                      <span className="truncate">{item.highlight}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="px-3 sm:px-7 pb-3 sm:pb-7 pt-1 sm:pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2 sm:py-3 rounded-full border border-[#b89674]/40 bg-[#161210]/80 text-[8px] sm:text-xs text-[#f5efe6] hover:bg-[#d8c7b5] hover:text-[#161210] hover:scale-105 transition-all font-bold uppercase tracking-widest flex items-center justify-center gap-1 sm:gap-2 shadow-lg"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

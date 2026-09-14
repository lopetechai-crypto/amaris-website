import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Clock, Building, GraduationCap, Hospital, Plane, Sparkles, ExternalLink } from 'lucide-react';

export default function LocationExplorer() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.15 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const destinations = [
    { name: 'Financial District Corporate Hub', distance: '2 Mins', type: 'business', icon: Building, desc: 'Wipro, Microsoft, Amazon & WaveRock' },
    { name: 'Outer Ring Road (ORR Exit 1)', distance: '3 Mins', type: 'transit', icon: Navigation, desc: 'Seamless high-speed citywide access' },
    { name: 'Oakridge & Delhi Public School', distance: '6 Mins', type: 'education', icon: GraduationCap, desc: 'Top tier international schools' },
    { name: 'Continental & Star Hospitals', distance: '7 Mins', type: 'healthcare', icon: Hospital, desc: 'Multi-specialty emergency healthcare' },
    { name: 'Inorbit Mall & Knowledge City', distance: '10 Mins', type: 'retail', icon: Building, desc: 'Luxury retail, dining & nightlife' },
    { name: 'RGIA Hyderabad International Airport', distance: '25 Mins', type: 'transit', icon: Plane, desc: 'Direct signal-free ORR express drive' },
  ];

  return (
    <section id="location" ref={sectionRef} className="py-24 luxury-texture-bg luxury-pattern-overlay relative overflow-hidden">
      {/* Smokey Blend Transition Gradients at Top and Bottom */}
      <div className="absolute top-0 left-0 right-0 h-56 bg-gradient-to-b from-[#161210] via-[#161210]/70 via-[#161210]/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#161210] via-[#161210]/70 via-[#161210]/30 to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Location Info & Micro-Destinations */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#211a16] border border-[#b89674]/40 text-xs text-[#d8c7b5] uppercase tracking-[0.3em] font-semibold backdrop-blur-md shell-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#b89674] animate-spin" style={{ animationDuration: '6s' }} />
              <span>PRIME ADDRESS • TELANGANA</span>
            </div>

            <h2 className="font-serif-header text-3xl sm:text-5xl text-[#f5efe6] font-light uppercase tracking-tight">
              CONNECTED TO THE PULSE <br />
              <span className="text-gold-shimmer font-normal italic lowercase tracking-normal">of Financial District</span>
            </h2>

            <p className="font-sans-body text-xs sm:text-sm text-[#9c8e82] leading-relaxed font-light">
              Situated in Nanakramguda, Financial District, <strong className="text-[#f5efe6]">AMARIS by Kurra Infra</strong> places you at the epicenter of Hyderabad, Telangana’s premier commercial, financial, and tech corridor.
            </p>

            {/* Travel Times List */}
            <div className="space-y-3 pt-2">
              {destinations.map((dest, idx) => {
                const Icon = dest.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#161210]/90 border border-[#b89674]/20 hover:border-[#b89674]/60 transition-all flex items-center justify-between group espresso-card-hover"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#211a16] border border-[#b89674]/30 flex items-center justify-center text-[#d8c7b5] group-hover:bg-[#d8c7b5] group-hover:text-[#161210] transition-colors shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#f5efe6] group-hover:text-[#b89674] transition-colors">{dest.name}</h4>
                        <span className="text-[9px] text-[#9c8e82]">{dest.desc}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b89674]/20 border border-[#b89674]/40 text-xs text-[#d8c7b5] font-bold">
                      <Clock className="w-3 h-3" />
                      <span>{dest.distance}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Real Interactive Google Map centered on Telangana */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95 pointer-events-none'
            }`}
          >
            <div className="shell-container p-4 rounded-3xl relative overflow-hidden group shadow-2xl">
              <div className="relative h-[560px] rounded-2xl overflow-hidden bg-[#161210] border border-[#b89674]/30">
                {/* Real Live Google Map focused on Financial District, Nanakramguda, Hyderabad, Telangana */}
                <iframe
                  title="AMARIS Kurra Infra Financial District Telangana Map"
                  src="https://maps.google.com/maps?q=Financial+District+Nanakramguda+Hyderabad+Telangana&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 transition-all duration-500"
                  style={{
                    filter: 'invert(90%) hue-rotate(180deg) contrast(120%) brightness(0.85)',
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Top Glass Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <div className="glass-panel px-4 py-2 rounded-full border border-[#b89674]/40 flex items-center gap-2 text-xs text-[#d8c7b5] backdrop-blur-md shadow-xl pointer-events-auto">
                    <MapPin className="w-4 h-4 text-[#b89674] animate-bounce" />
                    <span className="font-semibold text-[#f5efe6]">Financial District, Nanakramguda, Telangana 500032</span>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-center justify-between gap-3 glass-panel p-4 rounded-2xl border border-[#b89674]/40 backdrop-blur-xl">
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-widest text-[#b89674] font-semibold block">PROJECT ADDRESS</span>
                    <h4 className="font-serif-header text-sm text-[#f5efe6]">AMARIS by Kurra Infra</h4>
                    <span className="text-[10px] text-[#9c8e82] font-light block">Nanakramguda, Financial District, Hyderabad, Telangana</span>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Financial+District+Nanakramguda+Hyderabad+Telangana"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all flex items-center gap-2 shrink-0 shadow-lg"
                  >
                    <span>Open In Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


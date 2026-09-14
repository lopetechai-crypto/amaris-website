import React, { useState } from 'react';
import { X, RotateCw, Compass, Eye } from 'lucide-react';

export default function VirtualTourModal({ isOpen, onClose, onOpenBooking }) {
  const [activeView, setActiveView] = useState('living');

  if (!isOpen) return null;

  const views = {
    living: {
      title: 'Grand Italian Marble Living Suite',
      subtitle: '270° Glazed Terrace View',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
    },
    pool: {
      title: 'Rooftop Heated Infinity Sky Pool',
      subtitle: 'Skyline Overlook of Financial District',
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85'
    },
    penthouse: {
      title: 'Duplex Penthouse Master Suite',
      subtitle: 'Double Height Ceiling & Private Spa',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85'
    }
  };

  const current = views[activeView];

  return (
    <div className="fixed inset-0 z-[9999] bg-[#161210]/95 animate-overlay-fade flex items-center justify-center p-4 sm:p-6">
      <div className="relative max-w-6xl w-full bg-[#211a16] border border-[#b89674]/50 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-popup shell-pulse">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#b89674]/20 flex items-center justify-between bg-[#161210]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d8c7b5] flex items-center justify-center text-[#161210]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-header text-base text-[#f5efe6] font-medium">
                AMARIS 360° Interactive Virtual Tour
              </h3>
              <span className="text-[9px] text-[#d8c7b5] uppercase tracking-widest block">
                3D Spatial Immersion • Kurra Infra
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#161210] text-[#d8c7b5] border border-[#b89674]/30 hover:bg-[#d8c7b5] hover:text-[#161210] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewer Canvas */}
        <div className="relative flex-1 bg-[#161210] overflow-hidden min-h-[420px] flex items-center justify-center">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover brightness-90 animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-transparent to-[#161210]/40" />

          <div className="absolute top-6 left-6 bg-[#161210]/80 backdrop-blur-md border border-[#b89674]/40 px-4 py-2 rounded-full flex items-center gap-2 text-xs text-[#d8c7b5]">
            <RotateCw className="w-4 h-4 animate-spin" />
            <span className="font-medium">360° Interactive Panoramic Mode Active</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-[#161210]/90 backdrop-blur-md border border-[#b89674]/40 p-5 rounded-2xl max-w-md">
            <span className="text-[9px] text-[#d8c7b5] uppercase tracking-widest font-semibold block mb-1">
              {current.subtitle}
            </span>
            <h4 className="font-serif-header text-xl text-[#f5efe6] font-light mb-3">
              {current.title}
            </h4>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-5 py-2.5 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Book In-Person Site Visit</span>
            </button>
          </div>
        </div>

        {/* Scene Switcher */}
        <div className="px-6 py-4 bg-[#161210] border-t border-[#b89674]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#9c8e82] uppercase tracking-widest mr-2">Select Viewpoint:</span>
            <button
              onClick={() => setActiveView('living')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'living' ? 'bg-[#d8c7b5] text-[#161210]' : 'bg-[#211a16] text-[#9c8e82] border border-[#b89674]/20'
              }`}
            >
              Living Suite
            </button>
            <button
              onClick={() => setActiveView('pool')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'pool' ? 'bg-[#d8c7b5] text-[#161210]' : 'bg-[#211a16] text-[#9c8e82] border border-[#b89674]/20'
              }`}
            >
              Sky Pool Deck
            </button>
            <button
              onClick={() => setActiveView('penthouse')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'penthouse' ? 'bg-[#d8c7b5] text-[#161210]' : 'bg-[#211a16] text-[#9c8e82] border border-[#b89674]/20'
              }`}
            >
              Duplex Penthouse
            </button>
          </div>

          <span className="text-[9px] text-[#d8c7b5] uppercase tracking-widest">
            VR Headset Ready • WebGL Accelerated
          </span>
        </div>
      </div>
    </div>
  );
}

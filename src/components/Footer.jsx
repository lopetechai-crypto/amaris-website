import React from 'react';
import KurraLogo from './KurraLogo';
import { Phone, Mail, MapPin, ShieldCheck, ArrowUp, Globe, Share2, MessageCircle, Play } from 'lucide-react';

export default function Footer({ onOpenBooking, onOpenBrochure }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#100d0c] border-t border-[#b89674]/30 relative text-[#9c8e82] font-sans-body">
      {/* Top Banner CTA */}
      <div className="border-b border-[#b89674]/20 py-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#211a16] to-[#100d0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="font-serif-header text-3xl sm:text-4xl text-[#f5efe6] font-light uppercase tracking-tight mb-2">
              READY TO EXPERIENCE LUXURY LIVING AT <span className="text-[#d8c7b5] italic font-normal lowercase tracking-normal">AMARIS?</span>
            </h3>
            <p className="text-xs text-[#9c8e82] max-w-xl font-light">
              Connect with our private client relationship manager for exclusive inventory access, site tours, and customized payment schedules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenBrochure}
              className="px-6 py-3.5 rounded-full border border-[#b89674]/50 text-xs text-[#f5efe6] uppercase tracking-[0.2em] hover:bg-[#b89674]/20 transition-all"
            >
              Download Brochure
            </button>
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all"
            >
              Schedule VIP Tour
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Info */}
        <div className="lg:col-span-2 space-y-4">
          <KurraLogo size="normal" variant="gold" />
          <p className="text-xs text-[#9c8e82] leading-relaxed font-light mt-3 max-w-sm">
            Kurra Infra creates thoughtfully designed developments that prioritize human well-being — blending natural topography, structural integrity, and refined architecture to enhance everyday living.
          </p>

          <div className="pt-2 flex items-center gap-4 text-[#d8c7b5]">
            <a href="https://kurrainfra.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#211a16] border border-[#b89674]/30 flex items-center justify-center hover:bg-[#d8c7b5] hover:text-[#161210] transition-all">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#211a16] border border-[#b89674]/30 flex items-center justify-center hover:bg-[#d8c7b5] hover:text-[#161210] transition-all">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#211a16] border border-[#b89674]/30 flex items-center justify-center hover:bg-[#d8c7b5] hover:text-[#161210] transition-all">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#211a16] border border-[#b89674]/30 flex items-center justify-center hover:bg-[#d8c7b5] hover:text-[#161210] transition-all">
              <Play className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Nav */}
        <div>
          <h4 className="font-cinzel text-xs text-[#f5efe6] uppercase tracking-[0.2em] font-semibold mb-4 border-l-2 border-[#d8c7b5] pl-3">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="#overview" className="hover:text-[#d8c7b5] transition-colors">Overview</a></li>
            <li><a href="#architecture" className="hover:text-[#d8c7b5] transition-colors">8m Slope Topography</a></li>
            <li><a href="#floor-plans" className="hover:text-[#d8c7b5] transition-colors">Residences & Floor Plans</a></li>
            <li><a href="#amenities" className="hover:text-[#d8c7b5] transition-colors">45,000 SF Clubhouse</a></li>
            <li><a href="#location" className="hover:text-[#d8c7b5] transition-colors">Financial District Location</a></li>
            <li><a href="#materials" className="hover:text-[#d8c7b5] transition-colors">Materials Matter</a></li>
          </ul>
        </div>

        {/* Real Estate Projects */}
        <div>
          <h4 className="font-cinzel text-xs text-[#f5efe6] uppercase tracking-[0.2em] font-semibold mb-4 border-l-2 border-[#d8c7b5] pl-3">
            Kurra Infra Projects
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li className="text-[#d8c7b5] font-medium">AMARIS (Flagship Highrise)</li>
            <li>KAIROS (Ultra Luxury)</li>
            <li>Kurra Corporate Towers</li>
            <li>Financial District Enclave</li>
            <li>Wellness Residences Hub</li>
          </ul>
        </div>

        {/* Corporate Address */}
        <div>
          <h4 className="font-cinzel text-xs text-[#f5efe6] uppercase tracking-[0.2em] font-semibold mb-4 border-l-2 border-[#d8c7b5] pl-3">
            Corporate Office
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#d8c7b5] shrink-0 mt-0.5" />
              <span>Kurra Infra Headquarters, Plot No. 12, Financial District, Nanakramguda, Hyderabad, Telangana 500032</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#d8c7b5] shrink-0" />
              <span>+91 40 4000 5555 / +91 99887 76655</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#d8c7b5] shrink-0" />
              <span>sales@kurrainfra.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* RERA Bar */}
      <div className="border-t border-[#b89674]/20 bg-[#0a0807] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-500">
          <div className="flex items-center gap-2 text-[#d8c7b5]">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-medium">TS RERA REGISTRATION NO: P02400007891 | rera.telangana.gov.in</span>
          </div>

          <div>
            © {new Date().getFullYear()} Kurra Infra Developers. All Rights Reserved. Designed for Luxury & Distinction.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#211a16] text-[#d8c7b5] border border-[#b89674]/30 hover:bg-[#d8c7b5] hover:text-[#161210] transition-all flex items-center gap-1"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

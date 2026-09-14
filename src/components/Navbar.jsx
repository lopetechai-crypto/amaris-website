import React, { useState, useEffect } from 'react';
import KurraLogo from './KurraLogo';
import { Phone, Menu, X, Calendar } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'PROJECTS', href: '#floor-plans' },
    { name: 'AMENITIES', href: '#amenities' },
    { name: 'LOCATION', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#161210]/95 backdrop-blur-md py-3.5 border-b border-[#b89674]/20 shadow-2xl'
          : 'bg-gradient-to-b from-[#161210]/95 via-[#161210]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <a href="#" className="flex items-center group">
            <KurraLogo size="normal" variant="gold" />
          </a>
        </div>

        {/* Center: Perfectly Centered 3 Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-10 md:gap-14 mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.25em] text-[#9c8e82] hover:text-[#f5efe6] font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d8c7b5] hover:after:w-full after:transition-all whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Contact Number ONLY */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href="tel:+914040005555"
            className="flex items-center gap-2 text-xs text-[#f5efe6] hover:text-[#d8c7b5] transition-colors tracking-widest font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#d8c7b5]" />
            <span>+91 40 4000 5555</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#d8c7b5] hover:text-white shrink-0"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161210]/98 border-b border-[#b89674]/30 px-6 py-6 space-y-5 backdrop-blur-2xl">
          <div className="flex flex-col space-y-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-gray-200 hover:text-[#d8c7b5] py-1 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#b89674]/20 flex flex-col items-center gap-3">
            <a
              href="tel:+914040005555"
              className="flex items-center gap-2 text-xs text-[#d8c7b5] tracking-widest font-medium"
            >
              <Phone className="w-4 h-4 text-[#d8c7b5]" />
              <span>+91 40 4000 5555</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Private Tour</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

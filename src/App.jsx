import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveFloorPlans from './components/InteractiveFloorPlans';
import AmenitiesShowcase from './components/AmenitiesShowcase';
import LocationExplorer from './components/LocationExplorer';
import GallerySection from './components/GallerySection';
import VirtualTourModal from './components/VirtualTourModal';
import VIPBookingModal from './components/VIPBookingModal';
import ConciergeChatbot from './components/ConciergeChatbot';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState('AMARIS');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState('visit');

  // Custom Animated Cursor Following Effect
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorOutlinePos, setCursorOutlinePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setCursorOutlinePos({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleOpenBooking = () => {
    setModalInitialType('visit');
    setIsBookingModalOpen(true);
  };

  const handleOpenBrochure = () => {
    setModalInitialType('brochure');
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#161210] text-[#f5efe6] selection:bg-[#d8c7b5] selection:text-[#161210] relative">
      {/* Custom Animated Following Cursor */}
      <div
        className="custom-cursor-dot hidden md:block"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />
      <div
        className="custom-cursor-outline hidden md:block"
        style={{ left: `${cursorOutlinePos.x}px`, top: `${cursorOutlinePos.y}px` }}
      />

      {/* Animated Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Main Website Content */}
      {!loading && (
        <>
          <Navbar
            onOpenBooking={handleOpenBooking}
            onOpenBrochure={handleOpenBrochure}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
          />

          <main>
            <HeroSection
              activeProject={activeProject}
              onOpenBooking={handleOpenBooking}
              onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
            />

            <InteractiveFloorPlans onOpenBooking={handleOpenBooking} />

            <AmenitiesShowcase onOpenBooking={handleOpenBooking} />

            <LocationExplorer />

            <GallerySection onOpenBooking={handleOpenBooking} />
          </main>

          <Footer
            onOpenBooking={handleOpenBooking}
            onOpenBrochure={handleOpenBrochure}
          />

          {/* Interactive Modals & Assistant */}
          <VirtualTourModal
            isOpen={isVirtualTourOpen}
            onClose={() => setIsVirtualTourOpen(false)}
            onOpenBooking={handleOpenBooking}
          />

          <VIPBookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            initialType={modalInitialType}
          />

          <ConciergeChatbot onOpenBooking={handleOpenBooking} />
        </>
      )}
    </div>
  );
}

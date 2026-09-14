import React, { useState, useEffect } from 'react';
import KurraLogo from './KurraLogo';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#161210] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-[#b89674]/15 animate-ping opacity-20 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-[#b89674]/25 pointer-events-none" />

      {/* Main Logo & Progress */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <KurraLogo size="large" variant="gold" />

        <div className="mt-8 mb-4">
          <span className="font-serif-header text-3xl md:text-4xl text-[#f5efe6] tracking-[0.2em] block font-light uppercase">
            KURRA INFRA
          </span>
          <span className="text-[10px] uppercase tracking-[0.45em] text-[#d8c7b5] mt-2 block">
            Luxury High-Rise Residences • Financial District
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 h-[2px] bg-[#2b221c] relative overflow-hidden rounded-full mt-6">
          <div
            className="h-full bg-gradient-to-r from-[#b89674] via-[#d8c7b5] to-[#ffffff] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="mt-4 font-cinzel text-xs text-[#d8c7b5] tracking-[0.3em]">
          {progress}%
        </div>
      </div>
    </div>
  );
}

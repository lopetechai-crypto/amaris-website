import React from 'react';

export default function KurraLogo({ variant = 'gold', size = 'normal', showText = true, className = '' }) {
  const getHeight = () => {
    switch (size) {
      case 'small':
        return 'h-8 sm:h-9';
      case 'large':
        return 'h-14 sm:h-16';
      case 'normal':
      default:
        return 'h-10 sm:h-12';
    }
  };

  const heightClass = getHeight();

  return (
    <div className={`inline-flex items-center gap-2 group ${className}`}>
      <img
        src="/kurra_logo.png"
        alt="Kurra Infra Logo"
        className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105 brightness-110 drop-shadow-md`}
        style={{ mixBlendMode: 'lighten' }}
      />
    </div>
  );
}

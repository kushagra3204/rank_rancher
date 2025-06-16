import React, { useEffect, useRef } from 'react';
import './SeoIllustration.css';

const SeoIllustration = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (svgRef.current) {
        const elements = svgRef.current.querySelectorAll('.animate-on-load');
        elements.forEach((el, i) => {
          setTimeout(() => {
            (el).classList.add('opacity-100');
            (el).classList.remove('opacity-0');
          }, i * 150);
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="seo-container">
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        className="seo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definitions and Gradients */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9FAFC" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b87f5" />
            <stop offset="100%" stopColor="#7E69AB" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D3E4FD" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="10" floodOpacity="0.3" />
          </filter>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#8A898C" strokeOpacity="0.1" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="800" height="600" fill="url(#bgGradient)" />
        <rect width="800" height="600" fill="url(#grid)" className="opacity-30" />

        {/* Central SEO globe */}
        <g className="animate-on-load opacity-0 transition-opacity" filter="url(#glow)">
          <circle cx="400" cy="300" r="150" fill="#F9FAFC" opacity="0.8" />
          <circle cx="400" cy="300" r="140" fill="none" stroke="#9b87f5" strokeWidth="2" strokeOpacity="0.7" />
          <path d="M260,300 Q330,200 400,200 Q470,200 540,300 Q470,400 400,400 Q330,400 260,300 Z" 
                fill="none" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M260,300 Q330,400 400,400 Q470,400 540,300 Q470,200 400,200 Q330,200 260,300 Z" 
                fill="none" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
          <ellipse cx="400" cy="300" rx="140" ry="70" fill="none" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
          <ellipse cx="400" cy="300" rx="100" ry="50" fill="none" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="260" y1="300" x2="540" y2="300" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="400" y1="160" x2="400" y2="440" stroke="#9b87f5" strokeWidth="1" strokeOpacity="0.5" />
        </g>

        {/* Magnifying glass */}
        <g className="animate-on-load opacity-0 transition-opacity" transform="translate(310, 250)" filter="url(#shadow)">
          <circle cx="0" cy="0" r="60" fill="white" strokeWidth="8" stroke="url(#purpleGradient)" />
          <text x="0" y="15" fontFamily="Arial" fontSize="38" fontWeight="bold" fill="#7E69AB" textAnchor="middle">SEO</text>
          <line x1="42" y1="42" x2="90" y2="90" stroke="url(#purpleGradient)" strokeWidth="12" strokeLinecap="round" />
        </g>

        {/* Podium */}
        <g className="animate-on-load opacity-0 transition-opacity" transform="translate(520, 360)">
          <rect x="-30" y="-40" width="60" height="40" fill="url(#orangeGradient)" rx="5" ry="5" />
          <rect x="-70" y="-25" width="40" height="25" fill="#D1D5DB" rx="5" ry="5" />
          <rect x="30" y="-15" width="40" height="15" fill="#D1D5DB" rx="5" ry="5" />
          <text x="0" y="-15" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="white" textAnchor="middle">1</text>
        </g>

        {/* Keyword Box */}
        <g className="animate-on-load opacity-0 transition-opacity" transform="translate(240, 380)">
          <rect x="-80" y="-20" width="160" height="40" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
          <text x="0" y="8" fontFamily="Arial" fontSize="16" fill="#1A1F2C" textAnchor="middle">KEYWORD</text>
          <rect x="-80" y="30" width="160" height="12" rx="6" fill="#E2E8F0" />
          <rect x="-80" y="50" width="120" height="12" rx="6" fill="#E2E8F0" />
          <rect x="-80" y="70" width="140" height="12" rx="6" fill="#E2E8F0" />
        </g>

        {/* Analytics Graph */}
        <g className="animate-on-load opacity-0 transition-opacity" transform="translate(440, 180)">
          <rect x="-60" y="-40" width="120" height="80" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="1" />
          <polyline points="-40,-10 -20,0 0,-20 20,-5 40,-30" 
                   fill="none" stroke="url(#orangeGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="-40,20 -20,15 0,5 20,10 40,0" 
                   fill="none" stroke="url(#purpleGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
};

export default SeoIllustration;
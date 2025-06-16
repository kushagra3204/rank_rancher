
import React, { useEffect, useRef } from 'react';
import '../../styles/components/ui/SeoBusinessSvg.css';

const SeoBusinessSvg = ({ width = 300, height = 300 }) => {
  const circleRef = useRef(null);
  const pathRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    // Add animation classes after component mounts for the animation to trigger
    if (circleRef.current) {
      circleRef.current.classList.add('animate-circle');
    }
    
    if (pathRef.current) {
      pathRef.current.classList.add('animate-path');
    }
    
    linesRef.current.forEach((line, index) => {
      if (line) {
        setTimeout(() => {
          line.classList.add('animate-line');
        }, index * 100);
      }
    });
  }, []);

  return (
    <div className="seo-logo-container">
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="seo-expert-svg"
      >
        {/* Background Circle */}
        <circle 
          cx="150" 
          cy="150" 
          r="140" 
          className="logo-circle"
          ref={circleRef}
        />
        
        {/* Chart Lines */}
        <g className="chart-lines">
          {[...Array(8)].map((_, i) => (
            <line 
              key={i}
              x1="60" 
              y1={200 - i * 15} 
              x2={240 - i * 5} 
              y2={200 - i * 15} 
              className="chart-line"
              ref={el => linesRef.current[i] = el}
            />
          ))}
        </g>

        {/* Search Icon */}
        <g className="search-icon">
          <circle cx="120" cy="130" r="35" className="search-circle" />
          <line x1="145" y1="155" x2="180" y2="190" className="search-handle" />
        </g>

        {/* Growth Arrow */}
        <path 
          d="M70,180 Q120,100 170,90 T240,70" 
          className="growth-line"
          ref={pathRef}
        />
        
        {/* Data Points */}
        <g className="data-points">
          <circle cx="70" cy="180" r="6" className="data-point point-1" />
          <circle cx="120" cy="100" r="6" className="data-point point-2" />
          <circle cx="170" cy="90" r="6" className="data-point point-3" />
          <circle cx="240" cy="70" r="6" className="data-point point-4" />
        </g>

        {/* Rating Stars */}
        <g className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <path
              key={i}
              d={`M${125 + i * 12},220 l2,6 l6,1 l-4,4 l1,6 l-5,-3 l-5,3 l1,-6 l-4,-4 l6,-1 z`}
              className="star"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default SeoBusinessSvg;
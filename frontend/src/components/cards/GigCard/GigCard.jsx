
import React, { useState, useEffect, useRef } from 'react';
import './gigCard.css';

const GigCard = ({ 
  images, 
  title, 
  content, 
  readMoreUrl, 
  slideshowDelay = 800 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, slideshowDelay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentImageIndex, isPaused, images.length, slideshowDelay]);

  const handleMouseEnter = () => {
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    setIsPaused(true);
  };

  const handleReadMoreClick = () => {
    window.location.href = `/gig/${readMoreUrl}`;
  };

  return (
    <div className="animated-card" onClick={handleReadMoreClick}>
      <div 
        className="card-image-container" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        {images.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`Slide ${index + 1}`}
            className={`card-image ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
        <div className="image-navigation">
          {images.map((_, index) => (
            <span 
              key={index} 
              className={`nav-dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text" dangerouslySetInnerHTML={{__html: content}}></p>
      </div>
      {/* <div style={{display: 'flex', height: "100%", width: "100%", padding: "0 0 20px 20px", alignItems: "end"}}> */}
        {/* <button 
          className="read-more-button" 
          onClick={handleReadMoreClick}
        >
          Read More
          <span className="arrow">→</span>
        </button> */}
      {/* </div> */}
    </div>
  );
};

export default GigCard;
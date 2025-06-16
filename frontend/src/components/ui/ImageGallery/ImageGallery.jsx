
import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img src={images[currentImageIndex]} alt={`Gallery ${currentImageIndex + 1}`} />
        <button className="gallery-nav prev" onClick={goToPrev}>❮</button>
        <button className="gallery-nav next" onClick={goToNext}>❯</button>
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
            onClick={() => goToImage(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
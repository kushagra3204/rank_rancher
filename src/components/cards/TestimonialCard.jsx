import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../../styles/components/cards/TestimonialCard.css';

const TestimonialCard = ({ name, position, content, rating, image }) => {
  return (
    <div className="testimonial-card">
      <div className="rating">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="star" />
        ))}
      </div>
      <p className="testimonial-content">{content}</p>
      <div className="testimonial-author">
        <img src={image || "/placeholder.svg"} alt={name} className="author-image" />
        <div className="author-info">
          <h4>{name}</h4>
          <p>{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
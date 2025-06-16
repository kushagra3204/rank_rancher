import React from 'react';
import { FaStar } from 'react-icons/fa';
import './TestimonialCard.css';
import { ThemedUserSVG, userDefault } from '../../../assets/index'

const TestimonialCard = ({ name, position, content, rating, image }) => {
  return (
    <div className="testimonial-card">
      <div className="rating">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="testimonial-star" />
        ))}
      </div>
      <p className="testimonial-content">{content}</p>
      <div className="testimonial-author">
        <div className="author-image">
          <ThemedUserSVG />
        </div>
        <div className="author-info">
          <h4>{name}</h4>
          <p>{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
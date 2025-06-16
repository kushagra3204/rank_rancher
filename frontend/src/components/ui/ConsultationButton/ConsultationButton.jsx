
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './ConsultationButton.css';

const ConsultationButton = () => {
  return (
    <a href="#contact" className="consultation-button">
      <span>Get a Free SEO Consultation</span>
      <div className="arrow-circle">
        <FaArrowRight className="arrow-icon" />
      </div>
    </a>
  );
};

export default ConsultationButton;
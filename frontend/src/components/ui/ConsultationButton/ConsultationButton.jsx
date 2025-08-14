
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './ConsultationButton.css';

const ConsultationButton = () => {
  return (
    <a href="https://www.fiverr.com/rank_rancher" className="consultation-button">
      <span>Boost Your SEO Today</span>
      <div className="arrow-circle">
        <FaArrowRight className="arrow-icon" />
      </div>
    </a>
  );
};

export default ConsultationButton;
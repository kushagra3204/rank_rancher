import React from 'react';
import './SectionHeading.css';

const SectionHeading = ({ label, title }) => {
  return (
    <div className="section-heading">
      {label && (
        <div className="section-label">
          <span className="dot"></span>
          <span>{label}</span>
        </div>
      )}
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeading;
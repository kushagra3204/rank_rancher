import React from 'react';
import '../../../styles/components/sections/HomePage/SectionHeading.css';

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
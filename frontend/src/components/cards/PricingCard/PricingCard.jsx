
import React from 'react';
import './PricingCard.css';

const PricingCard = ({ package: pkg }) => {
  return (
    <div className="pricing-card">
      <div className="package-header">
        <h3 className="package-name">{pkg.name}</h3>
        <div className="package-price">${pkg.price}</div>
      </div>
      <p className="package-description">{pkg.description}</p>
      <div className="package-delivery">
        <span className="delivery-icon">⏱</span>
        <span className="delivery-time">{pkg.deliveryTime} days delivery</span>
      </div>
      <div className="package-features">
        {pkg.features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="feature-icon">✓</span>
            <span className="feature-text">{feature}</span>
          </div>
        ))}
      </div>
      <button className="continue-btn">Continue</button>
    </div>
  );
};

export default PricingCard;
import React from 'react';
import ConsultationButton from '../../../ui/ConsultationButton/ConsultationButton';
import './CtaSection.css';

const CtaSection = () => {
  return (
    <section className="cta-section">
      <div className="container cta-container">
        <h2>Let's Build Something Great for Your Business Together</h2>
        <p>
          Partner with us to turn your vision into reality. Our team of 
          skilled business strategists and expert guidance achieves clients' goals.
        </p>
        <ConsultationButton />
      </div>
    </section>
  );
};

export default CtaSection;
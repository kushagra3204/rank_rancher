
import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import ConsultationButton from '../../../ui/ConsultationButton/ConsultationButton';
import './BusinessSection.css';
import SeoIllustration from '../../../ui/SeoIllustration/SeoIllustration';

const BusinessSection = () => {
  return (
    <section className="business-section" id="about">
      <div className="container">
        <SectionHeading 
          label="What We Do" 
          title="Boosting Your Rankings with Data-Driven SEO Strategies" 
        />
        
        <div className="business-content">
          <div className="business-text">
            <div className="expertise-item">
              <h3>Expert Link Building</h3>
              <p>We create high-quality backlink strategies focusing on authority sites to boost your domain rating.</p>
            </div>
            
            <div className="expertise-item">
              <h3>Keyword Research</h3>
              <p>Comprehensive keyword analysis to target the most valuable search terms in your niche.</p>
            </div>
            
            <div className="expertise-item">
              <h3>On & Off-Page SEO</h3>
              <p>Full-spectrum optimization that enhances both your website structure and external presence.</p>
            </div>
            
            <div className="expertise-item">
              <h3>E-A-T Principles</h3>
              <p>We follow Google's guidelines on Expertise, Authoritativeness, and Trustworthiness for lasting results.</p>
              <span className="more-link">More</span>
            </div>
            
            <ConsultationButton />
          </div>
          
          <div className="business-image">
            <SeoIllustration/>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
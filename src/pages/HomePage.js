import React from 'react';
import Hero from '../components/Hero';
import BusinessSection from '../components/sections/BusinessSection';
import ConsultingSection from '../components/sections/ConsultingSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <BusinessSection />
      <ConsultingSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
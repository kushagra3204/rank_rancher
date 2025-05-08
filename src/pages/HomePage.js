import React from 'react';
import Hero from '../components/Hero';
import BusinessSection from '../components/sections/HomePage/BusinessSection';
import ConsultingSection from '../components/sections/HomePage/ConsultingSection';
import GigSection from '../components/sections/HomePage/gigSection';
import TestimonialsSection from '../components/sections/HomePage/TestimonialsSection';
import CtaSection from '../components/sections/HomePage/CtaSection';
import '../styles/pages/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <BusinessSection />
      <ConsultingSection />
      <GigSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
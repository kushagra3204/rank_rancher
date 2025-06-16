import React from 'react';
import Hero from '../../components/Hero/Hero';
import BusinessSection from '../../components/sections/HomePage/BusinessSection/BusinessSection';
import CtaSection from '../../components/sections/HomePage/CtaSection/CtaSection';
import TestimonialsSection from '../../components/sections/HomePage/TestimonialsSection/TestimonialsSection';
import GigSection from '../../components/sections/HomePage/gigSection/gigSection';
import ConsultingSection from "../../components/sections/HomePage/ConsultingSection/ConsultingSection"
import './HomePage.css';

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
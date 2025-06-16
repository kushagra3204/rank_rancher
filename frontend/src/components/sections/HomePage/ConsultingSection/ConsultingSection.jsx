import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import ServiceCard from '../../../cards/ServiceCard/ServiceCard';
import './ConsultingSection.css';

const ConsultingSection = () => {
  const services = [
    {
      id: 1,
      icon: 'investment',
      title: 'Investment Strategy',
      description: 'We help you make informed investment decisions that align with your goals and risk tolerance.',
      link: '/services/investment-strategy'
    },
    {
      id: 2,
      icon: 'tax',
      title: 'Tax Filing Assistance',
      description: 'Our tax experts help you navigate complex tax regulations to optimize your returns.',
      link: '/services/tax-filing'
    },
    {
      id: 3,
      icon: 'research',
      title: 'Research Consulting',
      description: 'We provide in-depth analysis and insights to help you make data-driven decisions.',
      link: '/services/research-consulting'
    },
    {
      id: 4,
      icon: 'market',
      title: 'Market Research',
      description: 'Get expert insights into your industry, competitors, and market trends to stay ahead.',
      link: '/services/market-research'
    },
    {
      id: 5,
      icon: 'financial',
      title: 'Financial Planning',
      description: 'We help you structure, forecast, and manage your finances for long-term stability.',
      link: '/services/financial-planning'
    },
    {
      id: 6,
      icon: 'brand',
      title: 'Brand Development',
      description: 'We craft meaningful brands that connect, inspire, and drive growth for your business.',
      link: '/services/brand-development'
    },
    {
      id: 7,
      icon: 'growth',
      title: 'Growth Strategy',
      description: 'Develop actionable growth plans that align with your vision and goals.',
      link: '/services/growth-strategy'
    },
    {
      id: 8,
      icon: 'digital',
      title: 'Digital Transformation',
      description: 'Navigate digital disruption with automation to lead in your industry.',
      link: '/services/digital-transformation'
    },
    {
      id: 9,
      icon: 'risk',
      title: 'Risk Management',
      description: 'Identify and mitigate potential risks before they impact your business.',
      link: '/services/risk-management'
    }
  ];

  return (
    <section className="consulting-section" id="service">
      <div className="container">
        <SectionHeading label="services we provide" title="Consulting Solutions" />
        <p className="section-description">
          Professional guidance to optimize your business operations and growth.
          Our solutions are designed to deliver lasting efficiency and impact.
        </p>
        
        <div className="services-grid">
          {services.map(service => (
            <ServiceCard 
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
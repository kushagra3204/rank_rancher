import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import './gigSection.css';
import GigCard from '../../../cards/GigCard/GigCard';

const GigSection = () => {

  const services = [
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "/gig/modern_web_development"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "https://example.com/article"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "https://example.com/article"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "https://example.com/article"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "https://example.com/article"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "https://example.com/article"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "https://example.com/article"
    },
    {
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      title: "Modern Web Development",
      content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
      readMoreUrl: "https://example.com/article"
    },
  ];

  return (
    <section className="consulting-section" id="gigs">
      <div className="container">
        <SectionHeading label="services we provide" title="Consulting Solutions" />
        <p className="section-description">
          Professional guidance to optimize your business operations and growth.
          Our solutions are designed to deliver lasting efficiency and impact.
        </p>
        
        <div className="services-grid">
          {services.map(cardData => (
            <GigCard 
              images={cardData.images}
              title={cardData.title}
              content={cardData.content}
              readMoreUrl={cardData.readMoreUrl}
              slideshowDelay={2000}
            />
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default GigSection;
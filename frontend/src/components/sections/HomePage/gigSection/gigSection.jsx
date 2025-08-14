import React, { useState, useEffect } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import './gigSection.css';
import GigCard from '../../../cards/GigCard/GigCard';
import { getAllGigAPI } from '../../../../api/gigAPIs/getAllGigsApi';

const GigSection = () => {
  const [services, setServices] = useState([]);

  // const services = [
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "/gig/modern_web_development"
  //   },
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "https://example.com/article"
  //   },
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "https://example.com/article"
  //   },
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "https://example.com/article"
  //   },
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "https://example.com/article"
  //   },
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "https://example.com/article"
  //   },
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "https://example.com/article"
  //   },
  //   {
  //     images: [
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  //       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  //     ],
  //     title: "Modern Web Development",
  //     content: "Discover the latest techniques and tools for building beautiful, responsive web applications. Learn how to create engaging user interfaces with smooth animations and interactive elements.",
  //     readMoreUrl: "https://example.com/article"
  //   },
  // ];

  const getAllGigData = async () => {
    const data = await getAllGigAPI();
    setServices(data)
  }

  useEffect(() => {
    getAllGigData();
  },[])

  return (
    <section className="consulting-section" id="gigs">
      <div className="container">
        <SectionHeading label="fiverr gigs" title="Our Featured Gigs" />
        <p className="section-description">
          Explore a variety of professional Fiverr gigs tailored to meet your needs.
          From design to development, our curated services are crafted to deliver
          quality results that help your business grow and succeed.
        </p>
        
        <div className="gig-grid">
          {services.map(cardData => (
            <GigCard 
              images={cardData.images}
              title={cardData.title}
              content={cardData.description}
              readMoreUrl={cardData.slug}
              slideshowDelay={2000}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GigSection;
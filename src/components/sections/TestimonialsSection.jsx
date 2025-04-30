import React from 'react';
import SectionHeading from './SectionHeading';
import TestimonialCard from '../cards/TestimonialCard';
import '../../styles/components/sections/TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'David R.',
      position: 'CEO, Finance Solutions',
      content: '"Working with them has transformed our entire strategy. Their insights have been invaluable, and we\'ve performed well at every step of the way."',
      rating: 5,
      image: '/images/testimonial-1.jpg'
    },
    {
      id: 2,
      name: 'Sarah L.',
      position: 'CFO, TechGrowth',
      content: '"Their recommendations gave us smart insights and real results. Our business grew 30% since implementing their recommendations."',
      rating: 5,
      image: '/images/testimonial-2.jpg'
    },
    {
      id: 3,
      name: 'Jason T.',
      position: 'Marketing Director, Elevation Growth',
      content: '"From day one, they understood our challenges and delivered solutions that worked. Highly recommended!"',
      rating: 5,
      image: '/images/testimonial-3.jpg'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <SectionHeading 
          label="Testimonials" 
          title="Trusted by Industry Leaders" 
        />
        <p className="section-description">
          Hear from the clients we've supported over the years. Our commitment to excellence is reflected in their success stories.
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <TestimonialCard 
              key={testimonial.id}
              name={testimonial.name}
              position={testimonial.position}
              content={testimonial.content}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
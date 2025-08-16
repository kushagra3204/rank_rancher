import { useState, useEffect, useRef } from "react"
import SectionHeading from "../SectionHeading/SectionHeading"
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TestimonialCard from "../../../cards/TestimonialCard/TestimonialCard"
import useCardWidth from "../../../../hooks/useCardWidth";
import "./TestimonialsSection.css"
import { getAllTestimonialsAPI } from "../../../../api/testimonialAPIs/getAllTestimonialsApi";

const TestimonialsSection = () => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount] = useState(3)
  const [testimonials, setTestimonials] = useState([])
  const carouselRef = useRef(null)
  const intervalRef = useRef(null)
  const cardWidth = useCardWidth()

  const getAllTestimonialData = async () => {
    const data = await getAllTestimonialsAPI();
    setTestimonials(data)
  }

  useEffect(() => {
    getAllTestimonialData()
  },[])

  useEffect(() => {
    const startAutoSlide = () => {
      intervalRef.current = setInterval(() => {
        slideNext()
      }, 3000)
    }

    startAutoSlide()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentIndex, visibleCount, testimonials])

  // // Reset interval when manually sliding
  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        slideNext()
      }, 3000)
    }
  }

  const slideNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    if(currentIndex > testimonials.length - 4) {
      setCurrentIndex(0)
    }
  }

  const slidePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    if(currentIndex === 0) {
      setCurrentIndex(testimonials.length - 3)
    }
    resetInterval()
  }

  return (
    <section className="testimonials-section" id="testimonials" style={{display: `${testimonials.length <=0 ? "none": "flex"}`}}>
      <div className="container">
        <SectionHeading label="Testimonials" title="Trusted by Industry Leaders" />
        <p className="section-description">
          Hear from the clients we've supported over the years. Our commitment to excellence is reflected in their
          success stories.
        </p>

        <div className="testimonials-carousel-container">
          <button className="carousel-control prev-btn" onClick={slidePrev} aria-label="Previous testimonial">
            &lt;
          </button>

          <div className="testimonials-carousel" ref={carouselRef}>
            <div
              className="testimonials-track"
              style={{
                transform: `translateX(-${cardWidth * currentIndex}px)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="testimonial-slide">
                  <TestimonialCard
                    name={testimonial.name}
                    position={testimonial.position}
                    content={testimonial.content}
                    rating={testimonial.rating}
                    image={testimonial.image}
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-control next-btn" onClick={slideNext} aria-label="Next testimonial">
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
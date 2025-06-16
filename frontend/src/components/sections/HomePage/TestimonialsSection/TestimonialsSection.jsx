import { useState, useEffect, useRef } from "react"
import SectionHeading from "../SectionHeading/SectionHeading"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TestimonialCard from "../../../cards/TestimonialCard/TestimonialCard"
import useCardWidth from "../../../../hooks/useCardWidth";
import "./TestimonialsSection.css"

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "David R.",
      position: "CEO, Finance Solutions",
      content:
        '"Working with them has transformed our entire strategy. Their insights have been invaluable, and we\'ve performed well at every step of the way."',
      rating: 5,
      image: "/images/testimonial-1.jpg",
    },
    {
      id: 2,
      name: "Sarah L.",
      position: "CFO, TechGrowth",
      content:
        '"Their recommendations gave us smart insights and real results. Our business grew 30% since implementing their recommendations."',
      rating: 5,
      image: "/images/testimonial-2.jpg",
    },
    {
      id: 3,
      name: "Jason T.",
      position: "Marketing Director, Elevation Growth",
      content:
        '"From day one, they understood our challenges and delivered solutions that worked. Highly recommended!"',
      rating: 5,
      image: "/images/testimonial-3.jpg",
    },
    {
      id: 4,
      name: "Michael P.",
      position: "COO, Innovative Solutions",
      content:
        '"Their strategic approach and attention to detail have made a significant impact on our business growth. Exceptional service!"',
      rating: 5,
      image: "/images/testimonial-4.jpg",
    },{
      id: 5,
      name: "David R.",
      position: "CEO, Finance Solutions",
      content:
        '"Working with them has transformed our entire strategy. Their insights have been invaluable, and we\'ve performed well at every step of the way."',
      rating: 5,
      image: "/images/testimonial-1.jpg",
    },
    {
      id: 6,
      name: "Sarah L.",
      position: "CFO, TechGrowth",
      content:
        '"Their recommendations gave us smart insights and real results. Our business grew 30% since implementing their recommendations."',
      rating: 5,
      image: "/images/testimonial-2.jpg",
    },
    {
      id: 7,
      name: "Jason T.",
      position: "Marketing Director, Elevation Growth",
      content:
        '"From day one, they understood our challenges and delivered solutions that worked. Highly recommended!"',
      rating: 5,
      image: "/images/testimonial-3.jpg",
    },
    {
      id: 8,
      name: "Michael P.",
      position: "COO, Innovative Solutions",
      content:
        '"Their strategic approach and attention to detail have made a significant impact on our business growth. Exceptional service!"',
      rating: 5,
      image: "/images/testimonial-4.jpg",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const carouselRef = useRef(null)
  const intervalRef = useRef(null)
  const cardWidth = useCardWidth()

  // Determine how many cards to show based on screen width
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 576) {
  //       setVisibleCount(1)
  //     } else if (window.innerWidth < 992) {
  //       setVisibleCount(2)
  //     } else {
  //       setVisibleCount(3)
  //     }
  //   }

  //   handleResize()
  //   window.addEventListener("resize", handleResize)

  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

  // Auto-slide functionality
  useEffect(() => {
    console.log(currentIndex)
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
  }, [currentIndex, visibleCount])

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

  // const getVisibleTestimonials = () => {
  //   const visibleItems = []
  //   for (let i = 0; i < visibleCount; i++) {
  //     const index = (currentIndex + i) % testimonials.length
  //     visibleItems.push(testimonials[index])
  //   }
  //   return visibleItems
  // }

  return (
    <section className="testimonials-section" id="testimonials">
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

        {/* <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => {
                setCurrentIndex(index)
                resetInterval()
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    </section>
  )
}

export default TestimonialsSection
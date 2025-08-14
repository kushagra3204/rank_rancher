import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import './Hero.css';
import { heroSvg, heroSEO, heroSEOSVG } from "../../assets";

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (contentRef.current) contentRef.current.classList.add("animate-in")
            if (imageRef.current) imageRef.current.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="container hero-container">
        <div className="hero-content" ref={contentRef}>
          <h1>Expert SEO Solutions That Drive Rankings</h1>
          <p>
            We deliver data-driven strategies and optimizations that boost your search engine rankings. From backlink building to keyword research, our comprehensive approach creates lasting results.
          </p>
          <button className="consultation-button" onClick={() => window.open("https://www.fiverr.com/rank_rancher", "_blank")}>
            <span>Boost Your SEO Today</span>
            <div className="arrow-container">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
        <div className="hero-image" ref={imageRef}>
          <img src={heroSEOSVG} className="hero-svg" />
        </div>
      </div>
    </section>
  )
}

export default Hero

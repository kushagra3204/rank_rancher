import { useState, useEffect } from "react"
import SectionHeading from "../SectionHeading/SectionHeading"
import "./gigSection.css"
import GigCard from "../../../cards/GigCard/GigCard"
import GigCardSkeleton from "../../../cards/GigCard/GigCardSkeleton"
import { getHomePageGigDataAPI } from "../../../../api/gigAPIs/getHomePageGigDataAPI"

const GigSection = () => {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllGigData = async () => {
    setIsLoading(true)
    try {
      const data = await getHomePageGigDataAPI()
      setServices(data)
    } catch (error) {
      console.error("Error fetching gig data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllGigData()
  }, [])

  return (
    <section className="consulting-section" id="gigs">
      <div className="container">
        <SectionHeading label="fiverr gigs" title="Our Featured Gigs" />
        <p className="section-description">
          Explore a variety of professional Fiverr gigs tailored to meet your needs. From design to development, our
          curated services are crafted to deliver quality results that help your business grow and succeed.
        </p>

        <div className="gig-grid" style={{justifyItems: `${!isLoading && "center"}`}}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => <GigCardSkeleton key={index} />)
            : services.map((cardData, index) => (
                <GigCard
                  key={index}
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
  )
}

export default GigSection
import { useState, useEffect } from "react"
import TestimonialForm from "./forms/TestimonialForm"
import ServiceForm from "./forms/ServiceForm"
import GigForm from "./forms/GigForm"
import AboutForm from "./forms/AboutForm"
import { Star, Trash2, Edit } from "lucide-react"
import "./SectionManager.css"
import { getAllTestimonialsAPI } from "../../../api/testimonialAPIs/getAllTestimonialsApi"
import { getAllServicesAPI } from "../../../api/serviceAPIs/getAllServicesApi"
import * as FaIcons from "react-icons/fa"
import { getAllGigAPI } from "../../../api/gigAPIs/getAllGigsApi"

const SectionManager = ({ activeSection }) => {
  const [data, setData] = useState({
    testimonials: [],
    services: [],
    gigs: [],
    about: [],
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeSection])

  const fetchData = async () => {
    setLoading(true)
    try {
      var result = null
      switch (activeSection) {
        case "testimonial":
          result = await getAllTestimonialsAPI()
          break
        case "service":
          result = await getAllServicesAPI()
          break
        case "gig":
          result = await getAllGigAPI()
          break
        case "about":
          result = null
          break
        default:
          result = null
          break
      }

      setData((prev) => ({
        ...prev,
        [`${activeSection}s`]: result || [],
      }))
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDataUpdate = () => {
    fetchData()
  }

  const renderForm = () => {
    switch (activeSection) {
      case "testimonial":
        return <TestimonialForm onUpdate={handleDataUpdate} />
      case "service":
        return <ServiceForm onUpdate={handleDataUpdate} />
      case "gig":
        return <GigForm onUpdate={handleDataUpdate} />
      case "about":
        return <AboutForm onUpdate={handleDataUpdate} />
      default:
        return null
    }
  }

  const renderDataList = () => {
    const currentData = data[`${activeSection}s`] || []

    if (loading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )
    }

    if (currentData.length === 0) {
      return (
        <div className="no-data">
          <div className="no-data-icon">📝</div>
          <h3>No data found</h3>
          <p>Add some {activeSection}s to get started!</p>
        </div>
      )
    }

    return (
      <div className="data-list">
        <div className="data-list-header">
          <h3>Existing {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}s</h3>
          <span className="data-count">{currentData.length} items</span>
        </div>

        <div className="data-grid">
          {currentData.map((item, index) => {
            const Icon = FaIcons[item.icon]
            return (
              <div key={item._id || index} className="data-item">
                {activeSection === "testimonial" && (
                  <div className="testimonial-item">
                    <div className="testimonial-header">
                      <img
                        src={item.image || "/placeholder.svg?height=50&width=50"}
                        alt={item.name}
                        className="avatar"
                      />
                      <div className="testimonial-info">
                        <h4>{item.name}</h4>
                        <p className="position">{item.position}</p>
                        <div className="rating">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={16} className={i < item.rating ? "star-filled" : "star-empty"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="testimonial-content">"{item.content}"</p>
                    <div className="item-actions">
                      <button className="action-btn edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {activeSection === "service" && (
                  <div className="service-item">
                    <div className="service-header">
                      {Icon && (
                        <div className="service-icon">
                          <Icon className="service-icon-svg" />
                        </div>
                      )}
                      <div className="service-info">
                        <h4>{item.title}</h4>
                        <p className="service-description">{item.subDescription}</p>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button className="action-btn edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {activeSection === "gig" && (
                  <div className="gig-item">
                    <div className="gig-header">
                      <h4>{item.title}</h4>
                      <p className="gig-seller">By: {item.seller?.name}</p>
                    </div>
                    <p className="gig-description">{item.subDescription}</p>
                    <div className="gig-footer">
                      <div className="rating">
                        <Star size={16} className="star-filled" />
                        {item.averageRating} ({item.reviews?.length || 0} reviews)
                      </div>
                      <div className="item-actions">
                        <button className="action-btn edit">
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "about" && (
                  <div className="about-item">
                    <div className="about-header">
                      <h4>{item.title}</h4>
                      <div className="item-actions">
                        <button className="action-btn edit">
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="about-description">{item.description}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const getSectionTitle = () => {
    const titles = {
      testimonial: "Testimonial",
      service: "Service",
      gig: "Gig",
      about: "About Section",
    }
    return titles[activeSection] || ""
  }

  return (
    <div className="section-manager">
      <div className="section-content">
        <div className="">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>Add New {getSectionTitle()}</h2>
            </div>
            <div className="dashboard-card-body">{renderForm()}</div>
          </div>
        </div>

        <div className="data-section">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <h2>Manage {getSectionTitle()}s</h2>
            </div>
            <div className="dashboard-card-body">{renderDataList()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionManager
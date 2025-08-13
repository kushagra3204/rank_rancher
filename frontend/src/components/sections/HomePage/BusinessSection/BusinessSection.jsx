import { FaLanguage, FaMapPin, FaPinterest } from "react-icons/fa"
import "./BusinessSection.css"

const BusinessSection = () => {
  const skills = [
    "SEO expert",
    "Search engine optimization (SEO) expert",
    "Backlinks expert",
    "Digital marketer",
    "Guest posting expert",
    "Content writer",
    "Press releases expert",
    "Customer service representative",
    "Wordpress expert",
    "Adobe After Effects expert",
    "Adobe Illustrator expert",
    "Adobe Photoshop expert",
    "Microsoft Excel expert",
    "Social media marketer",
  ]

  return (
    <section className="profile-section" id="about">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-left">
            <div className="profile-image-container">
              <img
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/6ea8722f023bcaae3fdc6c2cd63b94c6-1659274343468/434163f9-417f-470a-814a-8b5d35cc3c6c.JPG"
                alt="Gauri Profile"
                className="profile-image"
              />
            </div>

            <div className="profile-header">
              <div className="name-section">
                <p className="profile-name">Gauri</p>
                <span className="username">@rank_rancher</span>
              </div>

              <div className="rating-section">
                <div className="rating-about">
                  <span className="star">★</span>
                  <span className="rating-number">4.9</span>
                  <span className="rating-count">(672)</span>
                </div>
                <div className="top-rated-badge">
                  <span>Top Rated</span>
                  <span className="diamonds">
                  {[1,2,3].map(() => {
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"></path></svg>
                  })}
                  </span>
                </div>
              </div>
            </div>

            <div className="profile-title">
              <span>SEO Consultant,</span>
              <span>Search Engine Algorithm Expert</span>
            </div>

            <div className="location-language">
              <div className="location">
                <FaMapPin />
                <span>India</span>
              </div>
              <div className="language">
                {/* <span className="icon">💬</span> */}
                <FaLanguage />
                <span>English</span>
              </div>
            </div>
          </div>

          <div className="profile-right">
            {/* <div className="profile-header">
              <div className="name-section">
                <h1 className="profile-name">Gauri</h1>
                <span className="username">@rank_rancher</span>
              </div>

              <div className="rating-section">
                <div className="rating">
                  <span className="star">★</span>
                  <span className="rating-number">4.9</span>
                  <span className="rating-count">(672)</span>
                </div>
                <div className="top-rated-badge">
                  <span>Top Rated</span>
                  <span className="diamonds">♦♦♦</span>
                </div>
              </div>
            </div>

            <div className="profile-title">
              <h2>SEO Consultant, Search Engine Algorithm Expert</h2>
            </div> */}

            {/* <div className="location-language">
              <div className="location">
                <span className="icon">📍</span>
                <span>India</span>
              </div>
              <div className="language">
                <span className="icon">💬</span>
                <span>English</span>
              </div>
            </div> */}

            <div className="about-section">
              <h3>About me</h3>
              <p>
                Namaskar! We strongly believe to bring Positive Transformation to everyone's life we touch. We are
                humble with pride that we are a team of SEO professionals, who are successfully serving in LINK
                BUILDING, HIGH AUTHORITY BACKLINKS, KEYWORD RESEARCH, ON&OFF PAGE SEO, COMPETITOR ANALYSIS. We follow
                E-A-T Expertise-Authoritativeness-Trustworthiness Principle. We work smartly with integrity, excellence,
                and innovation. Our well-designed diversified premium powerful SEO packages work according to the latest
                Google algorithm update. Our best of winning SEO strategies are for each & every niche.
              </p>
            </div>

            <div className="skills-section">
              <h3>Skills</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag" style={{ "--delay": `${index * 0.1}s` }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BusinessSection
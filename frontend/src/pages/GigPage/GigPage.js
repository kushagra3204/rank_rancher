
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import './GigPage.css';
import StarRating from '../../components/ui/StarRating/StarRating';
import PricingCard from '../../components/cards/PricingCard/PricingCard';
import Faq from '../../components/ui/Faq/Faq';
import ImageGallery from '../../components/ui/ImageGallery/ImageGallery';
import ReviewItem from '../../components/ui/ReviewItem/ReviewItem';
import NotFound from '../NotFound/NotFound';
import { getAllGigAPI } from '../../api/gigAPIs/getAllGigsApi';

const GigPage = () => {
  const { theme } = useContext(ThemeContext);
  const { gigSlug } = useParams();
  const [gig, setGig] = useState(null);
  const [selectedTab, setSelectedTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  const [pricingPackage, setPricingPackage] = useState(gig?.packages?.[0]?.name);
  const [gigData, setGigData] = useState([]);

  useEffect(() => {
    const fetchAllGigData = async () => {
      try {
        const data = await getAllGigAPI();
        console.log("Fetched gig data:", data);
        setGigData(data);
      } catch (err) {
        console.error("Failed to load gigs:", err.message);
      }
    };

    fetchAllGigData();
  }, []);

  useEffect(() => {
    if (!gigData || gigData.length === 0) return;

    const foundGig = gigData.find((g) => g.slug === gigSlug);
    setGig(foundGig);
    setPricingPackage(foundGig?.packages?.[0]?.name)

    setIsLoading(false);
    window.scrollTo(0, 0);
  }, [gigSlug, gigData]);


  if (isLoading) {
    return (
      <div className="gig-loading">
        <div className="loader"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  if (!gig) {
    return (
        <NotFound />
    );
  }

  return (
    <div className={`gig-page ${theme}`}>
      <div className="container">
        <div className="gig-header">
          <h1 className="gig-title">{gig.title}</h1>
        </div>

        <div className="gig-content">
          <div className="gig-main">
            <div className="gig-gallery">
              <ImageGallery images={gig.images} />
            </div>
            
            <div className="gig-description-section">
              <div className="gig-tabs">
                <button 
                  className={`tab-btn ${selectedTab === 'description' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`tab-btn ${selectedTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('reviews')}
                >
                  Reviews ({gig.reviews.length})
                </button>
                <button 
                  className={`tab-btn ${selectedTab === 'faqs' ? 'active' : ''}`}
                  onClick={() => setSelectedTab('faqs')}
                >
                  FAQs ({gig.faqs.length})
                </button>
              </div>
              
              <div className="gig-tab-content">
                {selectedTab === 'description' && (
                  <div className="gig-about">
                    <h2>About This Gig</h2>
                    <div className="gig-description" dangerouslySetInnerHTML={{__html: gig.description}}></div>
                    <div className="expertise-section">
                      <h3>Industry Expertise</h3>
                      <div className="expertise-tags">
                        {gig.expertiseAreas.map((area, index) => (
                          <span key={index} className="expertise-tag">{area}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="language-section">
                      <h3>Languages</h3>
                      <div className="language-list">
                        {gig.languages.map((lang, index) => (
                          <div key={index} className="language-item">
                            <span className="language-name">{lang.name}</span>
                            <span className="language-level">{lang.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedTab === 'reviews' && (
                  <div className="gig-reviews">
                    <h2>Reviews ({gig.reviews.length})</h2>
                    <div className="review-summary">
                      <div className="average-rating">
                        <span className="rating-value">{gig.averageRating}</span>
                        <StarRating rating={gig.averageRating} />
                        <span className="rating-count">{gig.reviews.length} reviews</span>
                      </div>
                      <div className="rating-breakdown">
                        {[5, 4, 3, 2, 1].map(stars => {
                          const count = gig.reviews.filter(review => Math.round(review.rating) === stars).length;
                          const percentage = Math.round((count / gig.reviews.length) * 100);
                          return (
                            <div key={stars} className="rating-bar">
                              <span className="stars">{stars} stars</span>
                              <div className="progress-container">
                                <div className="progress-bar" style={{width: `${percentage}%`}}></div>
                              </div>
                              <span className="count">({count})</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="reviews-list">
                      {gig.reviews.map((review, index) => (
                        <ReviewItem key={index} review={review} />
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedTab === 'faqs' && (
                  <div className="gig-faqs">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faqs-list">
                      {gig.faqs.map((faq, index) => (
                        <Faq key={index} question={faq.question} answer={faq.answer} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="gig-sidebar">
            <div className="pricing-section">
              <h2>Pricing Packages</h2>
              <div className="pricing-tabs">
                {gig.packages.map((pkg, index) =>  {
                  return (
                    <button className={`pricing-tab ${pricingPackage === pkg.name && 'active'}`} onClick={() => setPricingPackage(pkg.name)}>{pkg.name}</button>
                  )
                })}
              </div>
              <div className="pricing-cards">
              {gig.packages
                .filter((pkg) => pkg.name === pricingPackage)
                .map((pkg, index) => (
                  <PricingCard key={index} package={pkg} />
              ))}
              </div>
            </div>
          </div>
        </div>
        
        {gig.comparePackages && (
          <div className="compare-packages">
            <h2>Compare Packages</h2>
            <div className="package-table">
              <table>
                <thead>
                  <tr>
                    <th>Package</th>
                    {gig.packages.map((pkg, index) => (
                      <th key={index}>
                        {pkg.name}
                        <div className="package-price">${pkg.price}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gig.compareFeatures.map((feature, index) => (
                    <tr key={index}>
                      <td>{feature.name}</td>
                      {gig.packages.map((pkg, i) => (
                        <td key={i}>
                          {feature.values[i]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>Delivery Time</td>
                    {gig.packages.map((pkg, i) => (
                      <td key={i}>{pkg.deliveryTime} days</td>
                    ))}
                  </tr>
                  <tr className="package-buttons">
                    <td></td>
                    {gig.packages.map((pkg, i) => (
                      <td key={i}>
                        <button className="select-package-btn">Select</button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigPage;
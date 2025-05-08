
import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import '../styles/pages/GigPage.css';
import gigData from '../mock_data/gigData';
import StarRating from '../components/ui/StarRating';
import PricingCard from '../components/cards/PricingCard';
import Faq from '../components/ui/Faq';
import ImageGallery from '../components/ui/ImageGallery';
import ReviewItem from '../components/ui/ReviewItem';
import NotFound from './NotFound';

const GigPage = () => {
  const { theme } = useContext(ThemeContext);
  const { gigSlug } = useParams();
  const [gig, setGig] = useState(null);
  const [selectedTab, setSelectedTab] = useState('description');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data from an API
    setTimeout(() => {
      const foundGig = gigData.find(g => g.slug === gigSlug);
      setGig(foundGig); // Default to first gig if not found
      setIsLoading(false);
      
      // Scroll to top when gig changes
      window.scrollTo(0, 0);
    }, 500);
  }, [gigSlug]);

  if (isLoading) {
    return (
      <div className="gig-loading">
        <div className="loader"></div>
        <p>Loading amazing content...</p>
      </div>
    );
  }

  if (!gig) {
    console.log()
    return (
        <NotFound />
    //   <div className="gig-error">
    //     <h2>Gig not found</h2>
    //     <p>We couldn't find the gig you're looking for.</p>
    //   </div>
    );
  }

  return (
    <div className={`gig-page ${theme}`}>
      <div className="container">
        <div className="gig-header">
          <div className="breadcrumb">
            <a href="/">Home</a> / <a href="/services">Services</a> / <span>{gig.title}</span>
          </div>
          <h1 className="gig-title">{gig.title}</h1>
          
          <div className="gig-seller-info">
            <div className="seller-avatar">
              <img src={gig.seller.avatar} alt={gig.seller.name} />
            </div>
            <div className="seller-details">
              <h3>{gig.seller.name}</h3>
              <div className="seller-level">{gig.seller.level}</div>
              <div className="seller-rating">
                <StarRating rating={gig.seller.rating} />
                <span className="rating-count">({gig.seller.reviews})</span>
              </div>
            </div>
            <div className="seller-stats">
              <div className="stat">
                <span className="stat-value">{gig.seller.ordersInQueue}</span>
                <span className="stat-label">Orders in Queue</span>
              </div>
              <div className="stat">
                <span className="stat-value">{gig.seller.completedOrders}</span>
                <span className="stat-label">Completed Orders</span>
              </div>
            </div>
          </div>
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
                <button className="pricing-tab active">Basic</button>
                <button className="pricing-tab">Standard</button>
                <button className="pricing-tab">Premium</button>
              </div>
              <div className="pricing-cards">
                {gig.packages.map((pkg, index) => (
                  <PricingCard key={index} package={pkg} />
                ))}
              </div>
            </div>
            
            <div className="cta-section">
              <button className="contact-btn">Contact Seller</button>
              <button className="like-btn">
                <span className="heart-icon">♡</span> 
                <span>Add to Wishlist</span>
              </button>
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
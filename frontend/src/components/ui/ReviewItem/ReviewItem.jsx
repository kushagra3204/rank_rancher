
import React from 'react';
import StarRating from '../StarRating/StarRating';
import './ReviewItem.css';
import { ThemedUserSVG } from '../../../assets';

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="review-item">
      <div className="reviewer-info">
        <div className="reviewer-avatar">
          <ThemedUserSVG />
        </div>
        <div className="reviewer-details">
          <h4 className="reviewer-name">{review.name}</h4>
          <div className="reviewer-country">
            <img src={review.countryFlag} alt={review.country} className="country-flag" />
            <span>{review.country}</span>
          </div>
        </div>
      </div>
      
      <div className="review-content">
        <div className="review-header">
          <StarRating rating={review.rating} />
          <span className="review-date">{formatDate(review.date)}</span>
        </div>
        <p className="review-text">{review.comment}</p>
        
        {review.sellerResponse && (
          <div className="seller-response">
            <div className="response-header">
              <div className='seller-avatar'>
                <ThemedUserSVG />
              </div>
              {/* <img src={ThemedUserSVG} alt="Seller" className="seller-avatar" /> */}
              <h5>Seller's Response</h5>
            </div>
            <p>{review.sellerResponse}</p>
          </div>
        )}
        
        <div className="review-helpful">
          <span>Helpful?</span>
          <button className="helpful-btn">
            <span>Yes</span>
          </button>
          <button className="helpful-btn">
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
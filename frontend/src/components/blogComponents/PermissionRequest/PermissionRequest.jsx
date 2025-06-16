
import React, { useState } from 'react';
import './PermissionRequest.css';

const PermissionRequest = ({ user, onSubmit }) => {
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit({
      userId: user.id,
      userName: user.name,
      reason,
      status: 'pending',
      date: new Date().toISOString()
    });
    
    setSubmitted(true);
  };
  
  if (submitted) {
    return (
      <div className="permission-submitted">
        <div className="success-icon">✓</div>
        <h3>Request Submitted!</h3>
        <p>Your request has been submitted for review. We'll notify you once it's been processed.</p>
      </div>
    );
  }
  
  return (
    <div className="permission-request">
      <h3>Request Writing Permission</h3>
      <p>
        Please tell us why you would like to contribute to our blog. We welcome unique perspectives and valuable content!
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Why would you like to write for us?</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Share your experience, topics you'd like to cover, or links to your previous work..."
            required
            rows={5}
          ></textarea>
        </div>
        
        <button type="submit" className="request-button">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default PermissionRequest;
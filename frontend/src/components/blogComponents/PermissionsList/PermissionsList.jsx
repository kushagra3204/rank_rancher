
import React from 'react';
import './PermissionsList.css';

const PermissionsList = ({ requests, onApprove, onReject }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (!requests || requests.length === 0) {
    return (
      <div className="permissions-empty">
        <p>No permission requests at this time.</p>
      </div>
    );
  }
  
  return (
    <div className="permissions-list">
      <h3>Permission Requests</h3>
      
      {requests.map((request) => (
        <div key={request.id} className="permission-item">
          <div className="permission-header">
            <div className="user-info">
              <span className="user-name">{request.userName}</span>
              <span className="request-date">{formatDate(request.date)}</span>
            </div>
            <div className="request-status">
              <span className={`status status-${request.status}`}>
                {request.status}
              </span>
            </div>
          </div>
          
          <div className="request-reason">
            <p>{request.reason}</p>
          </div>
          
          {request.status === 'pending' && (
            <div className="permission-actions">
              <button 
                onClick={() => onApprove(request.id)} 
                className="approve-button"
              >
                Approve
              </button>
              <button 
                onClick={() => onReject(request.id)} 
                className="reject-button"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PermissionsList;
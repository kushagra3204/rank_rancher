import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useUser } from '../../context/UserContext';
import PermissionRequest from '../../components/blogComponents/PermissionRequest/PermissionRequest';
import './RequestPermission.css';
import Footer from '../../components/Footer/Footer';

const RequestPermission = () => {
  const { currentUser, isAdmin, isUser } = useUser();
  const { addPermissionRequest, hasPermissionRequest } = useBlog();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const hasPending = hasPermissionRequest(currentUser.id);

  const handleSubmit = (requestData) => {
    addPermissionRequest(requestData);
  };

  return (
    <div className="app">
      <main>
        <section className="permission-request-section">
          <div className="container">
            <div className="section-header">
              <h1>Become a Contributor</h1>
              <p>Share your SEO knowledge and insights with our community.</p>
            </div>

            {hasPending ? (
              <div className="request-pending">
                <div className="pending-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h2>Request Already Submitted</h2>
                <p>Your permission request is currently being reviewed. We’ll notify you once it’s processed.</p>
                <button onClick={() => navigate('/')} className="back-to-home">
                  Back to Home
                </button>
              </div>
            ) : (
              <PermissionRequest user={currentUser} onSubmit={handleSubmit} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RequestPermission;
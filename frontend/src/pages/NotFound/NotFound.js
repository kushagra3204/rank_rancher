
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container">
      <div className="not-found-page">
        <h1>404</h1>
        <h2>Oops! Page not found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <div className="actions">
          <Link to="/" className="back-home-btn">Return to Home</Link>
          <Link to="/gig/seo-services-high-da-backlinks" className="view-gigs-btn">View Featured Gig</Link>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
            margin-top: 50px;
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 50px 20px;
        }

        .not-found-page h1 {
          font-size: 6rem;
          margin-bottom: 0;
          background: linear-gradient(to right, var(--primary-color), var(--accent-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .not-found-page h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .not-found-page p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          color: var(--text-light);
        }

        .actions {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .back-home-btn,
        .view-gigs-btn {
          padding: 12px 25px;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: var(--transition);
          text-decoration: none;
        }

        .back-home-btn {
          background-color: var(--primary-color);
          color: white;
        }

        .back-home-btn:hover {
          background-color: var(--secondary-color);
          color: white;
          transform: translateY(-3px);
          box-shadow: var(--box-shadow);
        }

        .view-gigs-btn {
          background-color: transparent;
          color: var(--text-color);
          border: 1px solid var(--border-color);
        }

        .view-gigs-btn:hover {
          background-color: var(--background-alt);
          color: var(--primary-color);
          transform: translateY(-3px);
          border-color: var(--primary-color);
          box-shadow: var(--box-shadow);
        }
      `}</style>
    </div>
  );
};

export default NotFound;
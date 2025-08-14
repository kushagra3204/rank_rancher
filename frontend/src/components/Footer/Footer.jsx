import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Logo from '../Logo/Logo';
import './Footer.css';
import { 
  FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram 
} from 'react-icons/fa';

const FiverrIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path d="M256 8C119.043 8 8 119.043 8 256s111.043 248 248 248 248-111.043 248-248S392.957 8 256 8zm70 208h-44v32h44v48h-44v100h-56V296h-28v-48h28v-35.6c0-43.4 24.9-68.4 76.5-68.4H326v48z" />
  </svg>
);

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <Logo />
           <p>
             We provide professional SEO services to help websites rank higher,
             increase organic traffic, and improve visibility on search engines.
           </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Navigation</h3>
              <ul>
                 <li><Link to="/">Home</Link></li>
                 <li><Link to="/blog">Blog</Link></li>
                 <li><Link to="/create-blog">Create Blog</Link></li>
                 <li><Link to="/request-permission">Request Permission</Link></li>
                 <li><Link to="/admin">Admin Dashboard</Link></li>
                 <li><Link to="/login">Login</Link></li>
                   <li><Link to="/signup">Signup</Link></li>
              </ul>
            </div>
            
            {/* <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/blog">Blog Posts</Link></li>
                <li><Link to="/guides">Guides</Link></li>
                <li><Link to="/webinars">Webinars</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/pricing-details">Pricing Details</Link></li>
              </ul>
            </div> */}
            
            <div className="footer-column">
              <h3>Social Media</h3>
              <ul className="social-links">
                <li>
                  <a
                    href="https://www.fiverr.com/rank_rancher"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiverrIcon /> Fiverr
                  </a>
                </li>
                {/* <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li> */}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Rank Rancher © {new Date().getFullYear()}</p>
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
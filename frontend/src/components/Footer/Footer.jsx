import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Logo from '../Logo/Logo';
import './Footer.css';
import { 
  FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram 
} from 'react-icons/fa';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme}`}>
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <Logo />
            <p>
              We're a consulting agency that provides expert business solutions and guidance for companies of all sizes.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Navigation</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/blog">Blog Posts</Link></li>
                <li><Link to="/guides">Guides</Link></li>
                <li><Link to="/webinars">Webinars</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/pricing-details">Pricing Details</Link></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Social Media</h3>
              <ul className="social-links">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a></li>
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
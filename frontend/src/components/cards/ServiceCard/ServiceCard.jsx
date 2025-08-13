
import React from 'react';
import { Link } from 'react-router-dom';
// import { 
//   FaChartLine, FaFileInvoiceDollar, FaSearch, 
//   FaChartBar, FaCalculator, FaPaintBrush,
//   FaRocket, FaLaptopCode, FaShieldAlt
// } from 'react-icons/fa';
import { 
  FaSearch, FaLink, FaClipboardCheck, FaPenFancy, 
  FaFileAlt, FaExternalLinkAlt, FaCogs, FaRegFileWord 
} from 'react-icons/fa';

import './ServiceCard.css';

const ServiceCard = ({ icon, title, description, link }) => {
  // const getIcon = (iconName) => {
  //   switch(iconName) {
  //     case 'investment':
  //       return <FaChartLine className="service-icon-svg" />;
  //     case 'tax':
  //       return <FaFileInvoiceDollar className="service-icon-svg" />;
  //     case 'research':
  //       return <FaSearch className="service-icon-svg" />;
  //     case 'market':
  //       return <FaChartBar className="service-icon-svg" />;
  //     case 'financial':
  //       return <FaCalculator className="service-icon-svg" />;
  //     case 'brand':
  //       return <FaPaintBrush className="service-icon-svg" />;
  //     case 'growth':
  //       return <FaRocket className="service-icon-svg" />;
  //     case 'digital':
  //       return <FaLaptopCode className="service-icon-svg" />;
  //     case 'risk':
  //       return <FaShieldAlt className="service-icon-svg" />;
  //     default:
  //       return <FaChartLine className="service-icon-svg" />;
  //   }
  // };

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'keyword':
        return <FaSearch className="service-icon-svg" />;
      case 'backlinks':
        return <FaLink className="service-icon-svg" />;
      case 'audit':
        return <FaClipboardCheck className="service-icon-svg" />;
      case 'guest':
        return <FaPenFancy className="service-icon-svg" />;
      case 'onpage':
        return <FaFileAlt className="service-icon-svg" />;
      case 'offpage':
        return <FaExternalLinkAlt className="service-icon-svg" />;
      case 'technical':
        return <FaCogs className="service-icon-svg" />;
      case 'content':
        return <FaRegFileWord className="service-icon-svg" />;
      default:
        return <FaSearch className="service-icon-svg" />;
    }
  };

  return (
    <div className="service-card">
      <div className="service-icon">
        {getIcon(icon)}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {/* <Link to={link} className="read-more">
        Read More →
      </Link> */}
    </div>
  );
};

export default ServiceCard;
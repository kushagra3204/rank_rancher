import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import ThemeContext from '../../context/ThemeContext';
import "./Navbar.css"
import { PhoneCall } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { rrseoSVGLogo, rrseoSVGLogoLight } from "../../assets";
import { useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "Service", path: "#service" },
  { name: "Gigs", path: "#gigs" },
  { name: "Blog", path: "/blog" },
  { name: "Admin Dashboard", path: "/admin"},
  { name: "Write Post", path: "/create-blog" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")
  const { theme, toggleTheme } = useContext(ThemeContext);

  const location = useLocation();

  useEffect(() => {
    const currentLink = navLinks.find(link => link.path === location.pathname);
    if (currentLink) {
      setActiveLink(currentLink.name);
    } else {
      setActiveLink(null)
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLinkClick = (link) => {
    setActiveLink(link)
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""} ${theme}`}>
      <div className="container navbar-container">
        <div className="logo">
          <Link to="/">
            <img src={theme==="light"?rrseoSVGLogo:rrseoSVGLogoLight} alt="RR SEO Logo" width={"110px"} />
          </Link>
        </div>

        <nav className={`nav-menu ${theme} ${menuOpen ? "active" : ""}`}>
           <ul>
             {navLinks.map(({ name, path }) => (
               <li key={name}>
                 <a
                  href={path}
                  className={activeLink === name ? "active" : ""}
                  onClick={() => handleLinkClick(name)}
                >
                  {name}
                </a>
               </li>
             ))}
           </ul>
         </nav>

         <div className="right-section">
            <a href="tel:+1234567890" className="phone-container">
              <PhoneCall size={20} />
              <div className="phone-text">
                <span className="call-us">Call Us</span>
                <span className="phone-number">(0123) 456 789</span>
              </div>
            </a>
          
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
            </button>

          <div
            className={`mobile-menu-button ${menuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span style={menuOpen? {display:"none"}: {display: "flex"}}/>
            <span />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

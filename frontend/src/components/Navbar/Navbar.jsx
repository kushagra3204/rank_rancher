import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import ThemeContext from '../../context/ThemeContext';
import "./Navbar.css"
import { PhoneCall } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { rrseoSVGLogo, rrseoSVGLogoLight } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Service", path: "/#service" },
  { name: "Gigs", path: "/#gigs" },
  { name: "Blog", path: "/blog" },
  { name: "Admin Dashboard", path: "/admin"},
  // { name: "Write Post", path: "/create-blog" }
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser, logout } = useUser();

  const location = useLocation();
  const navigate = useNavigate();

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
             {navLinks.map(({ name, path }) => {
              if(path==="/admin" && (currentUser?.role === "user" || !currentUser)) return;
              return ( 
               <li key={name}>
                 <a
                  href={path}
                  className={activeLink === name ? `active ${theme}` : ""}
                  onClick={() => handleLinkClick(name)}
                >
                  {name}
                </a>
               </li>
             )})}
           </ul>
         </nav>

         <div className="right-section">
            {/* <a href="tel:+1234567890" className="phone-container">
              <PhoneCall size={20} />
              <div className="phone-text">
                <span className="call-us">Call Us</span>
                <span className="phone-number">(0123) 456 789</span>
              </div>
            </a> */}
            {location.pathname !== "/login" &&
              <button className="login-nav-btn" 
                onClick={() => {
                  if(currentUser) logout()
                  navigate("/login")
                }} 
                style={{
                  background: currentUser && '#e6f7ff',
                  color: currentUser && '#007bff'
                }}
              >
                {currentUser ? "Logout" : "Login"}
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            }
          
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

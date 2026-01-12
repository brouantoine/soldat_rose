import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import './Navbar.scss';

const InteractiveNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="logo-icon">👨‍💻</span>
          <span className="logo-text">MonPortfolio</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/projects" className="nav-link">Projets</Link>
          <Link to="/about" className="nav-link">À propos</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label={`Basculer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu mobile"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
};

export default InteractiveNavbar;
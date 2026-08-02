import React, { useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="promo-bar">
        🎉 Tuesday Special: General OPD Fees Only Rs.100! 
        <a href="#contact" onClick={() => trackEvent('click_book', 'Navigation', 'Header Promo Book')} style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px' }}>Book Now</a>
      </div>
      
      <div className="container">
        <nav className="hamburger-nav-container">
          <div className="logo">
            <a href="#home">
              <img src="/assets/images/ayna.jpg" alt="Ayna Logo" className="side-logo" />
            </a>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={toggleTheme} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-dark)' }}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
            </button>
            <button className="hamburger-toggle-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <span>Menu</span>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          
          <div className={`nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>
          
          <div className={`side-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="side-menu-header">
              <a href="#home" onClick={closeMobileMenu}>
                <img src="/assets/images/ayna.jpg" alt="Ayna Logo" className="side-logo" />
              </a>
              <button className="close-menu-btn" onClick={closeMobileMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="side-nav-links">
              <li><a href="#home" onClick={closeMobileMenu}><i className="fas fa-home"></i> Home</a></li>
              <li><a href="#about" onClick={closeMobileMenu}><i className="fas fa-info-circle"></i> About Us</a></li>
              <li><a href="#services" onClick={closeMobileMenu}><i className="fas fa-spa"></i> Services</a></li>
              <li><a href="#gallery" onClick={closeMobileMenu}><i className="fas fa-images"></i> Gallery</a></li>
              <li><a href="#contact" onClick={(e) => { closeMobileMenu(); trackEvent('click_book', 'Navigation', 'Mobile Menu Book'); }} className="btn-priority" style={{color: 'black'}}><i className="fas fa-calendar-check"></i> Book Appointment</a></li>
            </ul>
            <div className="side-menu-footer">
              <p style={{fontSize: '0.85rem', color: '#666', margin: 0}}>Call Us: <strong>+977 9767797950</strong></p>
              <p style={{fontSize: '0.85rem', color: '#666', margin: 0}}>Rangeli Road, Biratnagar</p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
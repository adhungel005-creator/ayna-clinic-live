import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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
        <a href="#contact" style={{ color: 'white', textDecoration: 'underline', marginLeft: '5px' }}>Book Now</a>
      </div>
      
      <div className="container">
        <nav className="hamburger-nav-container">
          <div className="logo">
            <img src="/assets/images/ayna.jpg" alt="Ayna Logo" className="side-logo" />
          </div>
          
          <button className="hamburger-toggle-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <span>Menu</span>
            <i className="fas fa-bars"></i>
          </button>
          
          <div className={`nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>
          
          <div className={`side-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="side-menu-header">
              <img src="/assets/images/ayna.jpg" alt="Ayna Logo" className="side-logo" />
              <button className="close-menu-btn" onClick={closeMobileMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="side-nav-links">
              <li><a href="#home" onClick={closeMobileMenu}><i className="fas fa-home"></i> Home</a></li>
              <li><a href="#about" onClick={closeMobileMenu}><i className="fas fa-info-circle"></i> About Us</a></li>
              <li><a href="#services" onClick={closeMobileMenu}><i className="fas fa-spa"></i> Services</a></li>
              <li><a href="#gallery" onClick={closeMobileMenu}><i className="fas fa-images"></i> Gallery</a></li>
              <li><a href="#contact" onClick={closeMobileMenu} className="btn-priority" style={{color: 'white'}}><i className="fas fa-calendar-check"></i> Book Appointment</a></li>
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
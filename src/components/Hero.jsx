import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text">
            <h1 className="reveal-left" data-stagger>Flawless Skin & Hair Starts At <br />Biratnagar's <span>Premium Dermatology Center.</span></h1>
            <p className="reveal-left" data-stagger>Experience world-class skin, hair, and laser care. Trusted by 5000+ patients. Book your professional consultation with <strong>Dr. Bibisha Baaniya</strong> today.</p>
            <div className="reveal-left" data-stagger>
              <a href="#contact" className="btn-premium btn-inline">Book Priority Consultation</a>
            </div>
          </div>
          <div className="hero-image-wrapper reveal-scale">
            <img src="/assets/images/hero-bg.jpg" className="hero-main-img" alt="Ayna Clinic Hero Image" />
            <div className="floating-badge badge-1">
              <i className="fas fa-heartbeat"></i>
              <div className="badge-text">
                <h4>5000+</h4>
                <p>Patients Treated</p>
              </div>
            </div>
            <div className="floating-badge badge-2">
              <i className="fas fa-certificate"></i>
              <div className="badge-text">
                <h4>FDA Tech</h4>
                <p>Approved Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
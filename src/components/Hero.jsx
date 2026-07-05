import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text reveal-on-scroll">
            <h1>Transforming Skin & Hair <br />With <span>Clinical Excellence.</span></h1>
            <p>Trusted by 5000+ patients in Biratnagar. Book your professional consultation with <strong>Dr. Bibisha Baaniya</strong> today.</p>
            <a href="#contact" class="btn-premium btn-inline">Book Priority Consultation</a>
          </div>
          <div className="hero-image-wrapper reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
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
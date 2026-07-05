import React from 'react';

export default function About() {
  return (
    <section id="about" className="reveal-on-scroll">
      <div className="container">
        <div className="flex-layout">
          <div className="flex-image about-img-frame">
            <img src="/assets/images/ayna.jpg" alt="Ayna Clinic Setup" />
          </div>
          <div className="flex-text">
            <h3>Welcome to Ayna Clinic</h3>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', lineHeight: 1.25 }}>
              Biratnagar's Premier Dermatology Center
            </h2>
            <p>
              Founded on the principles of medical excellence and aesthetic precision, Ayna Clinic provides comprehensive diagnostic and therapeutic solutions for all skin and hair concerns. We blend state-of-the-art technology with personalized treatment plans.
            </p>
            <p>
              Whether you are seeking clinical dermatology care or advanced cosmetic enhancements, our facility adheres to strict medical protocols to ensure safe, ethical, and world-class results.
            </p>
            <ul className="about-list">
              <li><i className="fas fa-shield-alt"></i> FDA-Approved Tech</li>
              <li><i className="fas fa-user-md"></i> Expert Medical Staff</li>
              <li><i className="fas fa-heartbeat"></i> Patient-First Care</li>
              <li><i className="fas fa-star"></i> Proven Results</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
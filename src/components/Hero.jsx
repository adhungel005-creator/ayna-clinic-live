import React from 'react';
import { trackEvent } from '../utils/analytics';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Flawless Skin & Hair Starts At <br />Biratnagar's <span>Premium Dermatology Center.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Experience world-class skin, hair, and laser care. Trusted by 5000+ patients. Book your professional consultation with <strong>Dr. Bibisha Baaniya</strong> today.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <a href="#contact" onClick={() => trackEvent('click_book', 'Hero', 'Main CTA')} className="btn-premium btn-inline">Book Priority Consultation</a>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
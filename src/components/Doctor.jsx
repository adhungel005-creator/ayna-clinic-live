import React from 'react';
import { trackEvent } from '../utils/analytics';

export default function Doctor() {
  return (
    <section id="doctor" className="reveal-on-scroll" style={{ backgroundColor: 'var(--bg-alt)' }}>
      <div className="container">
        <div className="flex-layout">
          <div className="flex-text">
            <h3>Meet Our Expert</h3>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Dr. Bibisha Baaniya</h2>
            <p style={{ color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '24px', fontSize: '1.05rem' }}>
              MBBS, MD (BPKIHS) | NMC No. 17402
            </p>
            <p>
              Dr. Bibisha Baaniya is a board-certified dermatologist specializing in skin, venereal, and aesthetic care. Combining clinical expertise with advanced laser technology, she provides personalized treatments focused on healthy, confident skin.
            </p>
            <p>
              With a patient-centered and holistic approach, Dr. Baaniya creates customized treatment plans designed to deliver safe, effective, and long-lasting results.
            </p>
            <div style={{ marginTop: '30px' }}>
              <a href="#contact" onClick={() => trackEvent('click_book', 'Doctor Profile', 'Consult Button')} className="btn-premium btn-inline">Consult Dr. Baaniya</a>
            </div>
          </div>
          <div className="flex-image doctor-img-frame">
            <img src="/assets/images/dr-bibisha.jpg" alt="Dr. Bibisha Baaniya" />
          </div>
        </div>
      </div>
    </section>
  );
}
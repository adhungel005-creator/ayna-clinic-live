import React from 'react';

export default function FindUs() {
  return (
    <section id="find-us" className="reveal-on-scroll" style={{ backgroundColor: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">Find Us</h2>
        <p className="section-subtitle">Watch the route map to Ayna Clinic</p>
        <div className="find-us-video-wrapper">
          <video autoPlay loop muted playsInline>
            <source src="/assets/videos/way-to-ayna.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

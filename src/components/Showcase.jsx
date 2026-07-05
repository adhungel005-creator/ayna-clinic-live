import React from 'react';

const showcaseVideos = [
  '/assets/videos/treatments/treatment-1.mp4',
  '/assets/videos/treatments/treatment-2.mp4',
  '/assets/videos/treatments/treatment-3.mp4',
  '/assets/videos/treatments/treatment-4.mp4',
  '/assets/videos/treatments/treatment-5.mp4'
];

export default function Showcase() {
  return (
    <section id="showcase" className="reveal-on-scroll">
      <div className="container">
        <h2 className="section-title">Clinic In Action</h2>
        <p className="section-subtitle">Inside our state-of-the-art facility</p>
        <div className="video-showcase">
          {showcaseVideos.map((vid, index) => (
            <div className="video-wrapper" key={index}>
              <video autoPlay loop muted playsInline>
                <source src={vid} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

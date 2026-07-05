import React, { useRef } from 'react';

const informationalVideos = [
  {
    src: '/assets/videos/informational/haircare-routine.mp4',
    title: 'Shampoo, Conditioner र Hair Mask कसरी लगाउने?'
  },
  {
    src: '/assets/videos/informational/hair-fall-reasons.mp4',
    title: 'कपाल झर्ने कारणहरु'
  },
  {
    src: '/assets/videos/informational/skin-analyser-scam.mp4',
    title: 'के Skin Analyser Scam हो?'
  },
  {
    src: '/assets/videos/informational/acne-diet.mp4',
    title: 'Acne मा के खाने, के नखाने?'
  },
  {
    src: '/assets/videos/informational/hair-transplant-care.mp4',
    title: 'Hair Transplant, GFC & PRP Care'
  },
  {
    src: '/assets/videos/informational/melasma-care.mp4',
    title: 'पोतो (Melasma) हुनेले बार्नै पर्ने कुराहरू'
  }
];

export default function Informational() {
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollOffset = direction === 'left' ? -325 : 325;
      sliderRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="informational" className="reveal-on-scroll">
      <div className="container">
        <h2 className="section-title">Educational Videos</h2>
        <p className="section-subtitle">Expert skincare advice by Dr. Bibisha Baaniya</p>
        <div className="slider-wrapper">
          <button className="slider-btn prev" onClick={() => scrollSlider('left')}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="slider-container" id="infoSlider" ref={sliderRef}>
            {informationalVideos.map((video, index) => (
              <div className="service-card" style={{ padding: '20px', textAlign: 'center' }} key={index}>
                <video controls playsInline>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h4 style={{ marginTop: '15px', fontSize: '1.15rem', fontWeight: 700 }}>
                  {video.title}
                </h4>
              </div>
            ))}
          </div>
          
          <button className="slider-btn next" onClick={() => scrollSlider('right')}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

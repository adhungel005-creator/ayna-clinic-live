import React from 'react';

const resultsData = [
  { img: '/assets/images/results/hair-treatment.png', alt: 'Hair Treatment Results' },
  { img: '/assets/images/results/clinical-result-1.png', alt: 'Clinical Result' },
  { img: '/assets/images/results/clinical-result-2.png', alt: 'Clinical Result' },
  { img: '/assets/images/results/gfc-therapy.png', alt: 'GFC Therapy Results' },
  { img: '/assets/images/results/glow-transformation.png', alt: 'Ayna Glow Transformation' },
  { img: '/assets/images/results/subtle-change.png', alt: 'Subtle Change Huge Impact' },
  { img: '/assets/images/results/erase-lines-1.png', alt: 'Erase the Lines 1' },
  { img: '/assets/images/results/erase-lines-2.png', alt: 'Erase the Lines 2' }
];

export default function Results() {
  return (
    <section id="gallery" className="reveal-on-scroll" style={{ backgroundColor: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">Real Results</h2>
        <p className="section-subtitle">Clinical Transformations at Ayna</p>
        <div className="results-grid">
          {resultsData.map((res, index) => (
            <div className="result-card" key={index}>
              <img src={res.img} alt={res.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

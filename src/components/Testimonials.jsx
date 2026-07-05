import React, { useState, useEffect } from 'react';

const testimonialsData = [
  {
    text: "I had an amazing experience at Ayna Clinic. Dr. Bibisha is very professional and the treatments really show results. Best skin clinic in Biratnagar!",
    author: "Abisha Dhungel"
  },
  {
    text: "The Hydrafacial here is next level. My skin has never felt cleaner or more radiant. Highly recommend the medical-grade skincare too.",
    author: "Priya Sharma"
  },
  {
    text: "Expert dermatology care! I was struggling with acne for years, and Dr. Bibisha's customized plan cleared it up in just months.",
    author: "Rohan Karki"
  },
  {
    text: "Safe and hygienic clinical environment. The laser hair removal is virtually painless compared to other places. 5 stars!",
    author: "Sita Thapa"
  },
  {
    text: "Complete care for hair thinning. The GFC therapy worked wonders for me. Authentic medicines available right at the clinic.",
    author: "Bibek Shrestha"
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="reveal-on-scroll" style={{ backgroundColor: 'var(--bg-alt)' }}>
      <div className="container">
        <h2 className="section-title">Patient Testimonials</h2>
        <p className="section-subtitle">Stories of confidence from our patients</p>
        <div className="testimonial-slider">
          <div 
            className="testimonial-track" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonialsData.map((item, index) => (
              <div className="testimonial-slide" key={index}>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p>"{item.text}"</p>
                <h4>{item.author}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

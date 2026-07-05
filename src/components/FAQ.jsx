import React, { useState, useRef } from 'react';

const faqData = [
  {
    q: 'Does laser hair removal hurt?',
    a: 'Our FDA-approved laser technology features advanced cooling mechanisms, making the procedure virtually painless.'
  },
  {
    q: 'How long is the downtime for a Chemical Peel?',
    a: 'Mild peels have little downtime, while deeper peels may require 3-5 days of peeling and recovery.'
  },
  {
    q: 'Is the consultation fee adjustable?',
    a: 'The consultation fee is a standard charge for Dr. Baaniya\'s assessment. It may be adjusted if proceeding with a treatment package.'
  },
  {
    q: 'Is laser hair removal permanent?',
    a: 'It results in long-term hair reduction. Occasional maintenance sessions may be required.'
  },
  {
    q: 'Does chemical peel make skin thin?',
    a: 'No, it actually stimulates collagen production, making the dermis thicker over time.'
  },
  {
    q: 'Stuffs to avoid in melasma',
    a: 'Avoid direct sun exposure, extreme heat, and harsh exfoliants.'
  },
  {
    q: 'Food to avoid in acne',
    a: 'Avoid high glycemic index foods, excessive dairy, and processed fast foods.'
  }
];

function FAQItem({ question, answer, isActive, onClick }) {
  const contentRef = useRef(null);
  
  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <div className="faq-header" onClick={onClick}>
        <span>{question}</span>
        <i className="fas fa-chevron-down"></i>
      </div>
      <div 
        className="faq-content" 
        ref={contentRef}
        style={{ 
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : '0px'
        }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="reveal-on-scroll">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Everything you need to know about our treatments</p>
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.q}
              answer={faq.a}
              isActive={activeIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

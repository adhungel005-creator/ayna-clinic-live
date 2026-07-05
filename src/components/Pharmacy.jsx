import React from 'react';

export default function Pharmacy() {
  return (
    <section id="pharmacy" className="reveal-on-scroll">
      <div className="container">
        <div className="pharmacy-card">
          <i className="fas fa-prescription-bottle-alt"></i>
          <h3>Complete Care Under One Roof</h3>
          <p>
            For your convenience, Ayna Clinic features a fully stocked in-house pharmacy. Get all prescribed clinical medicines, dermatological creams, and authentic skincare products immediately after your consultation.
          </p>
          <p className="pharmacy-promo-tag">
            <i className="fas fa-truck" style={{ marginRight: '8px' }}></i> Online Delivery Now Available!
          </p>
          <a 
            href="https://wa.me/9779767797950?text=I%20would%20like%20to%20order%20medicines%20from%20your%20pharmacy." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-premium btn-inline"
          >
            <i className="fab fa-whatsapp" style={{ marginRight: '8px' }}></i> Order Medicines via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

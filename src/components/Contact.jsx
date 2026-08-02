import React, { useState } from 'react';
import { trackEvent } from '../utils/analytics';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    trackEvent('submit_booking', 'Contact Page', 'Booking Form');
    
    const formattedMessage = `*New Appointment Request* %0A%0A` +
      `*Name:* ${name}%0A` +
      `*Phone:* ${phone}%0A` +
      `*Service:* ${service}%0A` +
      `*Consultation:* ${consultationType}%0A` +
      `*Date:* ${date}%0A` +
      `*Message:* ${message || "None"}`;

    const waLink = `https://wa.me/9779767797950?text=${formattedMessage}`;
    window.open(waLink, '_blank');

    setShowSuccess(true);
    setName('');
    setPhone('');
    setService('');
    setConsultationType('');
    setDate('');
    setMessage('');
  };

  return (
    <section id="contact-section" className="reveal-on-scroll" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Details</h3>
            <p>
              <i className="fas fa-map-marker-alt"></i> 
              <a href="https://maps.app.goo.gl/YnU5LLj67NngbgSK8" target="_blank" rel="noopener noreferrer">
                Rangeli Road, Biratnagar
              </a>
            </p>
            <p>
              <i className="fas fa-phone-alt"></i> 
              <a href="tel:+9779767797950">+977 9767797950</a>
            </p>
            <p>
              <i className="fab fa-whatsapp"></i> 
              <a href="https://wa.me/9779767797950" target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('click_whatsapp', 'Contact Page', 'WhatsApp Chat')}>
                Chat on WhatsApp
              </a>
            </p>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.0463378519965!2d87.2833182!3d26.4542938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef7446ff360e21%3A0x6406e93910c2423!2sAyna%20The%20Skin%2C%20Hair%20%26%20Laser%20Clinic!5e0!3m2!1sen!2snp!4v1714710000000!5m2!1sen!2snp" 
              loading="lazy"
              title="Ayna Clinic Google Maps Location"
            ></iframe>
          </div>
          
          <div className="contact-form">
            <h3>Book Appointment</h3>
            <form id="bookingForm" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <select 
                required 
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">Select Service</option>
                <option value="Hydrafacial">Hydrafacial</option>
                <option value="Chemical Peel">Chemical Peel</option>
                <option value="Laser Hair Removal">Hair Removal Laser</option>
                <option value="Anti-Aging">Anti-Aging Treatment</option>
                <option value="Microneedling/CO2">Microneedling & CO2</option>
                <option value="Hair Treatment">Hair Treatment</option>
                <option value="Tattoo Removal">Tattoo Removal</option>
                <option value="Fillers">Fillers</option>
                <option value="Thread Lift">Thread Lift</option>
                <option value="Other Services">Other Services</option>
              </select>
              <select 
                required 
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value)}
              >
                <option value="">Select Consultation Type</option>
                <option value="Physical">Physical Consultation (In-Clinic)</option>
                <option value="Online">Online Consultation (Video/Call)</option>
              </select>
              <input 
                type="date" 
                required 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <textarea 
                rows="3" 
                placeholder="Any specific concerns?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button type="submit" id="submitBtn" className="btn-premium" style={{ width: '100%' }}>
                Confirm Booking
              </button>
            </form>
            
            {showSuccess && (
              <p id="successMsg" style={{ display: 'block' }}>
                ✅ Appointment Requested Successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    // Check initially
    handleHashChange();
    
    window.addEventListener('hashchange', handleHashChange);
    
    // Intercept clicks on any a[href="#contact"]
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href') === '#contact') {
        e.preventDefault();
        setIsOpen(true);
        window.history.pushState(null, '', '#contact');
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const close = () => {
    setIsOpen(false);
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
    setTimeout(() => {
      setShowSuccess(false);
      close();
    }, 3000);
    
    setName('');
    setPhone('');
    setService('');
    setConsultationType('');
    setDate('');
    setMessage('');
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={close}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={close}>
          <i className="fas fa-times"></i>
        </button>
        
        <h3>Book Appointment</h3>
        
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn-premium" style={{ width: '100%' }}>
              Confirm Booking
            </button>
          </form>
          
          {showSuccess && (
            <p style={{ display: 'block', color: 'var(--primary-green)', marginTop: '15px', textAlign: 'center', fontWeight: 'bold' }}>
              ✅ Appointment Requested Successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

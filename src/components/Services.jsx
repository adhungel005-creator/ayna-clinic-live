import React from 'react';

const servicesData = [
  {
    title: 'Hydrafacial',
    items: ['Basic Hydrafacial', 'Hydrapeel']
  },
  {
    title: 'Chemical Peel',
    items: [
      'Sesglicopeel (with Retinol Seal)',
      'Azelac M peel (with Retinol Seal)',
      'Nomelan Fenol peel',
      'Hollywood Laser Peel',
      'Party / Lip / Periorbital Peel'
    ]
  },
  {
    title: 'Hair Removal Laser',
    items: [
      'Face, Neck, & Underarms',
      'Hands, Legs, & Chest',
      'Abdomen & Bikini',
      'Full Body Packages'
    ]
  },
  {
    title: 'Anti-Aging Treatment',
    items: ['HIFU (Full Face / Half Face)', 'Botox (per unit)']
  },
  {
    title: 'Microneedling & CO2',
    items: [
      'Basic CO2 Laser',
      'CO2 with Exosome',
      'Microneedling with PRP / Exosome'
    ]
  },
  {
    title: 'Hair Treatment',
    items: ['PRP & iPRF Treatment', 'GFC Treatment']
  },
  {
    title: 'Tattoo Removal',
    items: ['Tattoo Removal (Small/Medium/Large)']
  },
  {
    title: 'Fillers',
    items: ['Dermal Fillers']
  },
  {
    title: 'Thread Lift',
    items: ['PDO Thread', 'COG Thread']
  },
  {
    title: 'Other Services',
    items: [
      'Nail Avulsion',
      'Skin Tag Removal',
      'Electrocautery',
      'Radiocautery',
      'Cyst Excision',
      'Split Ear Repair',
      'Lontophoresis',
      'Mole Removal',
      'Biopsy',
      'Skin Cancer excision'
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className="reveal-on-scroll">
      <div className="container">
        <h2 className="section-title">Our Medical & Aesthetic Services</h2>
        <p className="section-subtitle">Comprehensive solutions for your skin and hair</p>
        
        <div className="services-grid" id="main-services-grid">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <h4>{service.title}</h4>
              <ul>
                {service.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
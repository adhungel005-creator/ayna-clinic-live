import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

const serviceMenu = [
  {
    category: "Hydrafacial",
    items: [
      { id: 'hf-basic', name: 'Basic Hydrafacial', single: 2000, packagePrice: 8000 },
      { id: 'hf-peel', name: 'Hydrapeel', single: 3200, packagePrice: 15000 }
    ]
  },
  {
    category: "Chemical Peel",
    items: [
      { id: 'cp-ses', name: 'Sesglicopeel', single: 1750, packagePrice: 8000 },
      { id: 'cp-ses-ret', name: 'Sesglicopeel with retinol seal', single: 2700, packagePrice: 12500 },
      { id: 'cp-az', name: 'Azelac M peel', single: 2250, packagePrice: 10000 },
      { id: 'cp-az-ret', name: 'Azelac M peel with retinol seal', single: 3200, packagePrice: 15000 },
      { id: 'cp-nom', name: 'Nomelan Fenol peel', single: 2250, packagePrice: 10000 },
      { id: 'cp-party', name: 'Party peel', single: 2000, packagePrice: 9000 },
      { id: 'cp-holly', name: 'Hollywood Laser Peel', single: 2500, packagePrice: 11000 },
      { id: 'cp-lip', name: 'Lip or Periorbital Peel', single: 1500, packagePrice: 6000 },
    ]
  },
  {
    category: "Hair Removal Laser",
    items: [
      { id: 'hr-under', name: 'Underarms', single: 2500, packagePrice: 9500 },
      { id: 'hr-face', name: 'Face', single: 4000, packagePrice: 15500 },
      { id: 'hr-neck', name: 'Neck', single: 2000, packagePrice: 9000 },
      { id: 'hr-hands', name: 'Hands', single: 5500, packagePrice: 18500 },
      { id: 'hr-legs', name: 'Legs', single: 6500, packagePrice: 20000 },
      { id: 'hr-chest', name: 'Chest', single: 3500, packagePrice: 13500 },
      { id: 'hr-abd', name: 'Abdomen', single: 3500, packagePrice: 13500 },
      { id: 'hr-bikini', name: 'Bikini', single: 4500, packagePrice: 17500 },
      { id: 'hr-body', name: 'Whole body', single: 32000, packagePrice: 130000 },
    ]
  },
  {
    category: "Anti-Aging Treatment",
    items: [
      { id: 'aa-hifu-full', name: 'HIFU Full Face', single: 6000 },
      { id: 'aa-hifu-half', name: 'HIFU Half face', single: 4000 },
      { id: 'aa-botox', name: 'Botox per unit', single: 450 },
    ]
  },
  {
    category: "CO2 Laser",
    items: [
      { id: 'co2-basic', name: 'Basic Co2', single: 4500, packagePrice: 19000 },
      { id: 'co2-exo', name: 'Co2 with Exosome', single: 7500, packagePrice: 32500 },
    ]
  },
  {
    category: "Microneedling",
    items: [
      { id: 'mn-prp', name: 'Microneedling with PRP', single: 3000, packagePrice: 14000 },
      { id: 'mn-exo', name: 'Microneedling with Exosome', single: 6000, packagePrice: 27500 },
    ]
  },
  {
    category: "Tattoo Removal Laser",
    items: [
      { id: 'tr-small', name: 'Small (<3 cm)', single: 2000, packagePrice: 8500 },
      { id: 'tr-med', name: 'Medium (3-7 cm)', single: 3500, packagePrice: 15500 },
      { id: 'tr-large', name: 'Large (>7 cm)', single: 5000, packagePrice: 22500 },
    ]
  },
  {
    category: "Hair Treatment",
    items: [
      { id: 'ht-prp', name: 'PRP', single: 3000, packagePrice: 12500 },
      { id: 'ht-iprf', name: 'iPRF', single: 3500, packagePrice: 16000 },
      { id: 'ht-gfc', name: 'GFC', single: 4000, packagePrice: 17500 },
    ]
  }
];

export default function CostEstimator() {
  const [cart, setCart] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(serviceMenu[0].category);

  const toggleCartItem = (item, type) => {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    const price = type === 'single' ? item.single : item.packagePrice;
    const nameExt = type === 'single' ? '(Single)' : '(Package of 5)';
    
    if (existingIndex >= 0) {
      const current = cart[existingIndex];
      if (current.type === type) {
        // Remove if clicking same type
        setCart(cart.filter(c => c.id !== item.id));
      } else {
        // Swap type
        const newCart = [...cart];
        newCart[existingIndex] = { ...item, type, price, displayName: `${item.name} ${nameExt}` };
        setCart(newCart);
      }
    } else {
      setCart([...cart, { ...item, type, price, displayName: `${item.name} ${nameExt}` }]);
    }
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

  const handleBook = () => {
    trackEvent('click_book', 'Cost Estimator', `Total: Rs.${totalCost}`);
    window.location.hash = '#contact';
  };

  return (
    <section id="estimator" style={{ padding: '80px 0', backgroundColor: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: 'var(--text-dark)', fontSize: '2.5rem', marginBottom: '15px' }}>Build Your Treatment Package</h2>
          <p style={{ color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto' }}>Select from our comprehensive service menu to get an instant estimate. Packages of 5 offer the best value!</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start' }}>
          
          {/* Menu Accordion */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {serviceMenu.map((cat) => (
              <div key={cat.category} style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <button 
                  onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                  style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-dark)', fontWeight: 'bold', fontSize: '1.1rem' }}
                >
                  {cat.category}
                  <i className={`fas fa-chevron-${expandedCategory === cat.category ? 'up' : 'down'}`}></i>
                </button>
                
                <AnimatePresence>
                  {expandedCategory === cat.category && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {cat.items.map(item => {
                          const cartItem = cart.find(c => c.id === item.id);
                          return (
                            <div key={item.id} style={{ padding: '15px', border: '1px solid var(--glass-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                              <div style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{item.name}</div>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <button 
                                  onClick={() => toggleCartItem(item, 'single')}
                                  style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', border: `1px solid ${cartItem?.type === 'single' ? 'var(--primary-green)' : '#ccc'}`, backgroundColor: cartItem?.type === 'single' ? 'var(--primary-green)' : 'transparent', color: cartItem?.type === 'single' ? '#fff' : 'var(--text-body)' }}
                                >
                                  Single: Rs.{item.single}
                                </button>
                                {item.packagePrice && (
                                  <button 
                                    onClick={() => toggleCartItem(item, 'package')}
                                    style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', border: `1px solid ${cartItem?.type === 'package' ? 'var(--gold-accent)' : '#ccc'}`, backgroundColor: cartItem?.type === 'package' ? 'var(--gold-accent)' : 'transparent', color: cartItem?.type === 'package' ? '#fff' : 'var(--text-body)' }}
                                  >
                                    Pkg of 5: Rs.{item.packagePrice}
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Sticky Total Cart */}
          <div style={{ flex: '1 1 350px', position: 'sticky', top: '100px' }}>
            <div style={{ padding: '30px', borderRadius: '15px', backgroundColor: 'var(--primary-green)', color: '#fff', boxShadow: 'var(--shadow-lg)' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '15px' }}>Your Estimate</h3>
              
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ opacity: 0.8 }}>
                    Select treatments from the menu to build your package.
                  </motion.p>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                      {cart.map(c => (
                        <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', paddingBottom: '8px', borderBottom: '1px dashed rgba(255,255,255,0.2)' }}>
                          <span>{c.displayName}</span>
                          <span style={{ fontWeight: 'bold' }}>Rs.{c.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      <span>Total:</span>
                      <span style={{ fontSize: '2rem' }}>Rs. {totalCost}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleBook}
                disabled={cart.length === 0}
                style={{
                  width: '100%', padding: '15px', borderRadius: '30px', border: 'none',
                  backgroundColor: '#fff', color: 'var(--dark-green)', fontWeight: 'bold',
                  fontSize: '1.1rem', cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: cart.length === 0 ? 0.5 : 1, transition: 'all 0.3s'
                }}
              >
                Book This Package
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

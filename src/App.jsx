import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Trust from './components/Trust';
import About from './components/About';
import Doctor from './components/Doctor';
import Services from './components/Services';
import Pharmacy from './components/Pharmacy';
import Results from './components/Results';
import Showcase from './components/Showcase';
import Testimonials from './components/Testimonials';
import Informational from './components/Informational';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import BookingModal from './components/BookingModal';
import Chatbot from './components/Chatbot';

import Footer from './components/Footer';
import EmployeeSignIn from './components/EmployeeSignIn';
import './App.css';

export default function App() {
  const [isEmployeePortal, setIsEmployeePortal] = useState(false);

  useEffect(() => {
    // Check if the URL has ?employee=true
    const params = new URLSearchParams(window.location.search);
    if (params.get('employee') === 'true') {
      setIsEmployeePortal(true);
    }
  }, []);

  useEffect(() => {
    if (isEmployeePortal) return;
    
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
      let delayCounter = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If the element requests staggering, apply a CSS custom property
          if (entry.target.hasAttribute('data-stagger')) {
            const delay = delayCounter * 0.15; // 150ms stagger
            entry.target.style.setProperty('--reveal-delay', `${delay}s`);
            delayCounter++;
          }
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [isEmployeePortal]);

  if (isEmployeePortal) {
    return <EmployeeSignIn onBack={() => window.location.href = '/'} />;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Trust />
        <About />
        <Doctor />
        <Services />
        <Pharmacy />
        <Results />
        <Showcase />
        <Testimonials />
        <Informational />
        <FAQ />
        <Contact />
      </main>

      <BookingModal />
      <Chatbot />
      <Footer />
    </>
  );
}

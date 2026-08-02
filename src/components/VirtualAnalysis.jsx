import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 1,
    title: "What's your primary skin concern?",
    options: [
      { label: "Acne & Breakouts", icon: "fa-allergies" },
      { label: "Pigmentation & Dark Spots", icon: "fa-sun" },
      { label: "Aging & Wrinkles", icon: "fa-user-clock" },
      { label: "Dullness / Dryness", icon: "fa-droplet" }
    ]
  },
  {
    id: 2,
    title: "How sensitive is your skin?",
    options: [
      { label: "Very Sensitive (Redness easily)", icon: "fa-feather" },
      { label: "Normal (No major issues)", icon: "fa-leaf" },
      { label: "Oily / Tough", icon: "fa-oil-can" }
    ]
  }
];

export default function VirtualAnalysis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSelect = (optionLabel) => {
    setAnswers({ ...answers, [step]: optionLabel });
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStep(step + 1); // move to results
      }, 2500);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <section id="virtual-analysis" style={{ padding: '80px 0', backgroundColor: 'var(--bg-premium)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: 'var(--text-dark)', fontSize: '2.5rem', marginBottom: '15px' }}>Virtual Skin Analysis</h2>
          <p style={{ color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto' }}>Answer a few quick questions and our AI will recommend the perfect personalized treatment plan for your skin.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--bg-card)', padding: '40px', borderRadius: '20px', boxShadow: 'var(--shadow-md)', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {step < questions.length && !isAnalyzing && (
              <motion.div 
                key={`q-${step}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                style={{ width: '100%' }}
              >
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                  <span style={{ display: 'inline-block', padding: '5px 15px', backgroundColor: 'var(--bg-alt)', color: 'var(--primary-green)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '15px' }}>
                    Step {step + 1} of {questions.length}
                  </span>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--text-dark)' }}>{questions[step].title}</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {questions[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, borderColor: 'var(--primary-green)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSelect(opt.label)}
                      style={{
                        padding: '30px 20px', borderRadius: '15px', border: '2px solid var(--glass-border)',
                        backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: '15px', transition: 'background-color 0.3s'
                      }}
                    >
                      <i className={`fas ${opt.icon}`} style={{ fontSize: '2rem', color: 'var(--primary-green)' }}></i>
                      <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-dark)' }}>{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                style={{ textAlign: 'center' }}
              >
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid var(--bg-alt)', borderTopColor: 'var(--primary-green)', margin: '0 auto 30px' }}
                />
                <h3 style={{ color: 'var(--text-dark)' }}>Analyzing your skin profile...</h3>
                <p style={{ color: 'var(--text-body)' }}>Matching with our dermatological database.</p>
              </motion.div>
            )}

            {step === questions.length && !isAnalyzing && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', color: '#fff', fontSize: '2rem', marginBottom: '20px' }}>
                  <i className="fas fa-check"></i>
                </div>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-dark)', marginBottom: '15px' }}>Your Personalized Plan</h3>
                
                <div style={{ backgroundColor: 'var(--bg-alt)', padding: '30px', borderRadius: '15px', marginBottom: '30px', textAlign: 'left' }}>
                  <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Recommended Treatment:</h4>
                  <p style={{ color: 'var(--text-dark)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>Advanced Hydrafacial + Salicylic Peel</p>
                  <p style={{ color: 'var(--text-body)', lineHeight: '1.6' }}>Based on your concerns with <strong>{answers[0]}</strong> and your <strong>{answers[1]}</strong> skin profile, this combination will gently exfoliate, extract impurities, and infuse your skin with intensive hydration without causing irritation.</p>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <a href="#contact" className="btn-premium">Book Consultation</a>
                  <button onClick={reset} style={{ padding: '12px 25px', borderRadius: '30px', border: '1px solid var(--text-body)', backgroundColor: 'transparent', color: 'var(--text-dark)', cursor: 'pointer', fontWeight: 'bold' }}>
                    Retake Analysis
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

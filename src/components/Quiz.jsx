import React, { useState } from 'react';

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ concern: '', issue: '', duration: '' });
  const [result, setResult] = useState(null);

  const handleAnswer = (field, value) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);
    
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      generateResult(newAnswers);
      setStep(4); // Result step
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ concern: '', issue: '', duration: '' });
    setResult(null);
  };

  const generateResult = (finalAnswers) => {
    let recommendation = {};
    
    if (finalAnswers.concern === 'Skin') {
      if (finalAnswers.issue === 'Acne') {
        recommendation = {
          title: "Anti-Acne Treatment Plan",
          description: "Based on your answers, we recommend a personalized Dermatologist Consultation. For immediate care, check out our Salicylic Acid Anti-Acne Kit.",
          action: "Book Consultation"
        };
      } else if (finalAnswers.issue === 'Pigmentation') {
        recommendation = {
          title: "Melasma & Pigmentation Care",
          description: "We recommend our specialized Laser Toning or Chemical Peels. A consultation will help determine the exact depth of pigmentation.",
          action: "Book Consultation"
        };
      } else {
        recommendation = {
          title: "Skin Rejuvenation Plan",
          description: "For aging and dullness, treatments like Hydrafacial, PRP, or Medical-grade Facials work best to restore your glow.",
          action: "Explore Services"
        };
      }
    } else if (finalAnswers.concern === 'Hair') {
      if (finalAnswers.issue === 'Hair Fall') {
        recommendation = {
          title: "Hair Loss Restoration",
          description: "We highly recommend GFC (Growth Factor Concentrate) or PRP therapy. Early intervention is key for hair fall.",
          action: "Book Consultation"
        };
      } else {
        recommendation = {
          title: "Scalp Health Treatment",
          description: "A healthy scalp means healthy hair. We suggest an initial consultation followed by our specialized anti-dandruff and scalp cleansing therapies.",
          action: "Book Consultation"
        };
      }
    } else {
      recommendation = {
        title: "Holistic Wellness Check",
        description: "General wellness starts from within. Let our experts guide you with a comprehensive diet and lifestyle plan tailored to your body.",
        action: "Book Wellness Session"
      };
    }

    setResult(recommendation);
  };

  return (
    <section id="quiz" className="reveal-on-scroll">
      <div className="container">
        <div className="quiz-container">
          <div className="quiz-header">
            <h2 className="section-title">Discover Your Routine</h2>
            <p className="section-subtitle">Take our 1-minute quiz for personalized recommendations</p>
          </div>

          <div className="quiz-card">
            {step < 4 && (
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
              </div>
            )}

            <div className="quiz-content">
              {step === 1 && (
                <div className="quiz-step reveal-scale">
                  <h3>What is your primary concern?</h3>
                  <div className="quiz-options">
                    <button className="quiz-btn" onClick={() => handleAnswer('concern', 'Skin')}>
                      <i className="fas fa-spa"></i> Skin Care
                    </button>
                    <button className="quiz-btn" onClick={() => handleAnswer('concern', 'Hair')}>
                      <i className="fas fa-cut"></i> Hair Care
                    </button>
                    <button className="quiz-btn" onClick={() => handleAnswer('concern', 'Wellness')}>
                      <i className="fas fa-heart"></i> General Wellness
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && answers.concern === 'Skin' && (
                <div className="quiz-step reveal-scale">
                  <h3>What is your specific skin issue?</h3>
                  <div className="quiz-options">
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Acne')}>Active Acne</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Pigmentation')}>Pigmentation/Melasma</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Aging')}>Signs of Aging</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Dullness')}>Dullness</button>
                  </div>
                </div>
              )}

              {step === 2 && answers.concern === 'Hair' && (
                <div className="quiz-step reveal-scale">
                  <h3>What is your specific hair issue?</h3>
                  <div className="quiz-options">
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Hair Fall')}>Hair Fall/Thinning</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Dandruff')}>Dandruff</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Damage')}>Damaged Hair</button>
                  </div>
                </div>
              )}
              
              {step === 2 && answers.concern === 'Wellness' && (
                <div className="quiz-step reveal-scale">
                  <h3>What is your primary goal?</h3>
                  <div className="quiz-options">
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Diet')}>Diet & Nutrition</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('issue', 'Stress')}>Stress Management</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="quiz-step reveal-scale">
                  <h3>How long have you had this concern?</h3>
                  <div className="quiz-options">
                    <button className="quiz-btn" onClick={() => handleAnswer('duration', 'Short')}>Less than a month</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('duration', 'Medium')}>1 - 6 months</button>
                    <button className="quiz-btn" onClick={() => handleAnswer('duration', 'Long')}>Over 6 months</button>
                  </div>
                </div>
              )}

              {step === 4 && result && (
                <div className="quiz-result reveal-scale">
                  <div className="result-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                  <div className="result-actions">
                    <button className="btn-primary" onClick={() => document.getElementById('bookingModal').classList.add('active')}>
                      {result.action}
                    </button>
                    <button className="btn-secondary" onClick={resetQuiz} style={{ marginLeft: '10px' }}>
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

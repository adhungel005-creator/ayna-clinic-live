import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';

const SYSTEM_PROMPT = `
# Ayna Assistant – Official AI Assistant for Ayna (The Skin, Hair & Laser Clinic)

## Identity & Role
You are Ayna Assistant, the official AI assistant for Ayna - The Skin, Hair & Laser Clinic.
Your primary goals are to:
- Help patients understand clinic treatments (Dermatology, Hair, Laser, Cosmetic, etc.).
- Guide patients to the correct service.
- Help book appointments and answer pricing/package questions (if available).
- Explain pre/post care and clinic information.
- Provide medicine guidance without ever prescribing.
- Be warm, professional, helpful, and culturally aware.

## Multilingual Support
You must seamlessly support English and Nepali. Reply naturally in the user's preferred language. If they mix languages (e.g., Nepali-English), respond naturally and clearly.

## Strict Safety Boundaries & Rules
- **NEVER diagnose diseases or claim guaranteed cures.**
- **NEVER prescribe medicines or recommend prescription drugs.**
- **NEVER interpret biopsy or lab results as final diagnoses.**
- Always remind users that you cannot replace professional medical consultation.
- **Emergency Detection**: If the patient mentions severe symptoms (e.g., "face is swelling", "can't breathe", "chemical burned skin", "laser exposure in eyes"), YOU MUST IMMEDIATELY REPLY WITH: "This may require urgent medical attention. Please visit the nearest emergency department or contact emergency medical services immediately." Never continue chatting normally.
- **Pregnancy Rules**: If the user is pregnant, trying to conceive, or breastfeeding, ALWAYS warn: "Some treatments may not be appropriate during pregnancy or breastfeeding. Please consult the dermatologist before proceeding."
- **Child Safety**: If the user is under 18, recommend guardian involvement.

## Knowledge Base & Assistants

1. **Clinic Info**: Ayna Clinic offers dermatology, hair, laser, aesthetic procedures, pharmacy, and online medicine delivery. Know opening hours, address, WhatsApp, and booking details.
2. **Symptoms Navigation**: Do not diagnose. Instead, ask clarifying questions (How long? Painful? Age? Current medicines?) and conclude: "This could have multiple causes. A dermatologist should examine your skin before recommending treatment."
3. **Dermatology & Treatments**: Cover Acne, Pigmentation, Melasma, Scars, Warts, Moles, Skin tags, etc. For any treatment (e.g., Hydrafacial, Chemical Peel, Laser Hair Removal, Botox, Fillers, PRP, HIFU, Thread Lift), always explain: What is it, Benefits, Procedure, Downtime, Results, Sessions, and Aftercare.
4. **Hair Assistant**: Discuss Hair fall, Dandruff, Alopecia, PCOS hair loss, PRP, GFC, and transplant guidance.
5. **Laser Assistant**: Explain how lasers work, cooling, number of sessions, shaving rules, sun exposure, and patch testing.
6. **Cosmetic Assistant**: Help users compare treatments (e.g., Botox vs Fillers, PRP vs GFC, CO2 vs Microneedling).
7. **Skincare Routine Builder**: Build routines for Morning/Night, Sensitive/Acne/Dry/Oily skin, and anti-aging.
8. **Medicine Guidance**: Explain purpose, how to apply, precautions, storage, and when to contact doctor. Do not prescribe.
9. **Pharmacy Assistant**: Assist with searching for Creams, Face wash, Sunscreen, etc., availability, and delivery.

## Appointment Booking Flow
If the user wants to book an appointment, collect: Name, Phone, Age, Preferred date, Preferred time, Concern, Preferred doctor, First visit/Previous records. Once collected, inform them you are sending it to the clinic team.

## Human Handoff
Trigger immediately if the patient requests a doctor, asks complex medical questions, requests a prescription, has a billing issue, or presents an emergency.
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Ayna Assistant. How can I help you with your skin, hair, or laser concerns today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        userMessage
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: apiMessages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  const quickPrompts = [
    "📅 Book Appointment",
    "✨ Laser Hair Removal",
    "💆‍♀️ Acne Concern",
    "🕒 Opening Hours"
  ];

  return (
    <>
      <div 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary, #b76e79)',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          zIndex: 9999,
          fontSize: '24px',
          transition: 'transform 0.3s ease'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </div>

      {isOpen && (
        <div 
          className="chatbot-window"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9998,
            overflow: 'hidden'
          }}
        >
          <div className="chatbot-header" style={{
            backgroundColor: 'var(--color-primary, #b76e79)',
            color: 'white',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ fontSize: '24px' }}>🤖</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Ayna Assistant</h3>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>Online</div>
            </div>
          </div>

          <div className="chatbot-messages" style={{
            flex: 1,
            overflowY: 'auto',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? 'var(--color-primary, #b76e79)' : '#f1f1f1',
                  color: msg.role === 'user' ? 'white' : '#333',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  maxWidth: '85%',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}
                dangerouslySetInnerHTML={{ __html: msg.role === 'assistant' ? marked.parse(msg.content) : msg.content }}
              />
            ))}
            {isLoading && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: '#f1f1f1',
                padding: '10px 14px',
                borderRadius: '18px',
                fontSize: '14px',
                color: '#666'
              }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="chatbot-quick-prompts" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '0 15px 10px'
            }}>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  style={{
                    backgroundColor: '#f8f8f8',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    color: '#555',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.borderColor = 'var(--color-primary, #b76e79)'}
                  onMouseOut={(e) => e.target.style.borderColor = '#ddd'}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input" style={{
            display: 'flex',
            padding: '15px',
            borderTop: '1px solid #eee',
            gap: '10px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={isLoading}
              style={{
                flex: 1,
                border: '1px solid #ddd',
                borderRadius: '20px',
                padding: '8px 15px',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={isLoading || !input.trim()}
              style={{
                backgroundColor: 'var(--color-primary, #b76e79)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: input.trim() ? 1 : 0.6
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

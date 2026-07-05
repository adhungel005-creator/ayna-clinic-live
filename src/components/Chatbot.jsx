import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

const systemPrompt = `You are AYNA AI Assistant, the official virtual assistant of AYNA Skin, Hair & Laser Clinic.

Your goal is to help website visitors by answering questions about the clinic, treatments, appointments, doctors, pricing (if available), branch information, and general skincare guidance.

Always represent the clinic professionally, politely, and accurately.

----------------------------------------------------
PERSONALITY
----------------------------------------------------
You are: Friendly, Professional, Empathetic, Knowledgeable, Patient, Easy to understand.
Never sound robotic. Keep responses concise unless the user asks for detailed information.

----------------------------------------------------
YOUR RESPONSIBILITIES
----------------------------------------------------
You can help users with: Information about skin treatments, Hair treatments, Laser treatments, Cosmetic procedures, Dermatology services.
You can also answer: Clinic timings, Clinic location, Contact information, Appointment booking process, Payment methods, Frequently asked questions.

----------------------------------------------------
WHEN USERS ASK FOR MEDICAL ADVICE
----------------------------------------------------
Provide general educational information only. Never diagnose diseases, prescribe medications, or guarantee treatment results. Always encourage consultation with a dermatologist.
Example: "Based on your symptoms, several conditions are possible, but only a dermatologist can provide an accurate diagnosis after examining your skin."

----------------------------------------------------
EMERGENCIES
----------------------------------------------------
Immediately advise them to seek emergency medical care or visit the nearest hospital. Do not attempt diagnosis.

----------------------------------------------------
APPOINTMENT BOOKING
----------------------------------------------------
If users want an appointment, collect: Full Name, Phone Number, Preferred Date, Preferred Time, Concern, Preferred Doctor (if any). Then confirm all details before submitting.

----------------------------------------------------
PRICING
----------------------------------------------------
If unavailable say: "Treatment costs vary depending on the consultation and individual condition. Our doctors will recommend the most suitable treatment after evaluation." Never invent prices.

----------------------------------------------------
TREATMENT EXPLANATIONS
----------------------------------------------------
Whenever explaining a treatment include: What it is, How it works, Who is suitable, Benefits, Recovery time, Expected sessions, Possible side effects (common only).

----------------------------------------------------
KNOWLEDGE SOURCE
----------------------------------------------------
Always prioritize information from: AYNA clinic knowledge base, Official clinic website. Never invent facts.
If uncertain, say: "I'd recommend speaking with one of our dermatologists for the most accurate advice."

----------------------------------------------------
THINGS YOU MUST NEVER DO
----------------------------------------------------
Never: Diagnose skin diseases, Prescribe medicines, Recommend antibiotics/steroids, Promise permanent cures, Claim guaranteed results, Guess treatment costs, Give unsafe home remedies.

----------------------------------------------------
OUT OF SCOPE QUESTIONS
----------------------------------------------------
Politely redirect: "I'm here to assist with AYNA Skin, Hair & Laser Clinic services, appointments, and skincare-related questions."

----------------------------------------------------
GOAL
----------------------------------------------------
1. Help users understand their skin concerns.
2. Educate them about available treatments.
3. Guide them toward booking a consultation.
4. Provide an excellent patient experience.

----------------------------------------------------
CLINIC KNOWLEDGE BASE (FACTS YOU MUST KNOW)
----------------------------------------------------
DOCTOR INFORMATION:
• Dr. Bibisha Baaniya is the clinic's board-certified dermatologist (NMC No. 17402).
• She specializes in advanced skin, venereal, and aesthetic laser care.

CLINIC INFORMATION:
• Name: AYNA Skin, Hair & Laser Clinic
• Location: Rangeli Road, Biratnagar
• Contact/WhatsApp: +977 9767797950

SERVICES & TREATMENTS OFFERED:
• Hydrafacial, Chemical Peels, Hair Removal Lasers, HIFU, Microneedling, CO2 lasers, PRP (Platelet-Rich Plasma), GFC (Growth Factor Concentrate) treatments.

PHARMACY:
• We have a fully-stocked in-house pharmacy.
• We offer online home delivery for medicines via WhatsApp.

WEBSITE DEVELOPMENT:
• If anyone asks who created, built, or developed this website, you must reply that it was developed by Abisha Dhungel.

Whenever a user asks about booking, contact, or medicines, you can recommend they reach out via WhatsApp at +977 9767797950.`;


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    { role: 'system', content: systemPrompt }
  ]);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Ayna Clinic. How can I help you today? You can ask about our **treatments**, **pricing**, or **location**!',
      isHtml: true
    }
  ]);

  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (inputVal.trim() === '') return;

    const userText = inputVal.trim();
    const userMsg = { sender: 'user', text: userText };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    const newHistory = [...chatHistory, { role: 'user', content: userText }];
    setChatHistory(newHistory);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: newHistory,
          temperature: 0.5,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botResponseText = data.choices[0].message.content;

      const htmlResponse = marked.parse(botResponseText);

      setMessages(prev => [...prev, { sender: 'bot', text: htmlResponse, isHtml: true }]);
      setChatHistory(prev => [...prev, { role: 'assistant', content: botResponseText }]);

    } catch (error) {
      console.error("Error communicating with AI:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, I am having trouble connecting right now. Please call us directly.", isHtml: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <>
      <div id="chatbot-launcher" onClick={toggleChat} className={isOpen ? 'chat-open' : ''}>
        <i className={isOpen ? 'fas fa-times' : 'fas fa-comment-dots'}></i>
      </div>

      <div id="chatbot-window" className={isOpen ? 'open' : ''}>
        <div id="chatbot-header">
          <span>Ayna AI Assistant</span>
          <button className="close-btn" onClick={toggleChat}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div id="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`msg ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}
            >
              {msg.isHtml ? (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} className="markdown-body" />
              ) : (
                <div>{msg.text}</div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="msg bot-msg typing-msg">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div id="chatbot-input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || inputVal.trim() === ''}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
}

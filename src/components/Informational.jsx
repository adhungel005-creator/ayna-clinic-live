import React, { useRef, useState } from 'react';

const informationalVideos = [
  {
    src: '/assets/videos/informational/haircare-routine.mp4',
    title: 'Shampoo, Conditioner र Hair Mask कसरी लगाउने?'
  },
  {
    src: '/assets/videos/informational/hair-fall-reasons.mp4',
    title: 'कपाल झर्ने कारणहरु'
  },
  {
    src: '/assets/videos/informational/skin-analyser-scam.mp4',
    title: 'के Skin Analyser Scam हो?'
  },
  {
    src: '/assets/videos/informational/acne-diet.mp4',
    title: 'Acne मा के खाने, के नखाने?'
  },
  {
    src: '/assets/videos/informational/hair-transplant-care.mp4',
    title: 'Hair Transplant, GFC & PRP Care'
  },
  {
    src: '/assets/videos/informational/melasma-care.mp4',
    title: 'पोतो (Melasma) हुनेले बार्नै पर्ने कुराहरू'
  }
];

export default function Informational() {
  const sliderRef = useRef(null);
  
  // Voice Recording State & Refs
  const [isRecording, setIsRecording] = useState(false);
  const [statusText, setStatusText] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollOffset = direction === 'left' ? -325 : 325;
      sliderRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  // 1. Start Recording
  const startRecording = async () => {
    audioChunksRef.current = []; // Clear previous recording data
    
    try {
        // Ask user for microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        
        // Collect raw audio data in chunks as it's being recorded
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        // Once recording stops, compile and send
        mediaRecorder.onstop = () => {
            // Compile raw chunks into a standard WebM audio blob
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            // Send binary to our backend API
            sendAudioToBackend(audioBlob);
            
            // Clean up: turn off user's mic hardware light
            stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setStatusText("Recording...");
        setIsRecording(true);

    } catch (err) {
        console.error("Microphone access denied:", err);
        setStatusText("Error: Mic access denied.");
    }
  };

  // 2. Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
        setStatusText("Processing audio...");
        setIsRecording(false);
    }
  };

  // 3. Upload to Flask Backend
  const sendAudioToBackend = async (audioBlob) => {
    // We package it in FormData so Flask can read it like a standard file upload
    const formData = new FormData();
    formData.append('audio_journal', audioBlob, 'voice_journal.webm');

    try {
        const response = await fetch('/api/analyze-voice', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            setStatusText(`Analysis Complete! Level: ${result.stress_level}`);
            // We can now update our dashboard charts with this new result!
        } else {
            setStatusText("Error analyzing audio.");
        }
    } catch (error) {
        console.error("Network error:", error);
        setStatusText("Network connection failed.");
    }
  };

  return (
    <section id="informational" className="reveal-on-scroll">
      <div className="container">
        <h2 className="section-title">Educational Videos</h2>
        <p className="section-subtitle">Expert skincare advice by Dr. Bibisha Baaniya</p>
        <div className="slider-wrapper">
          <button className="slider-btn prev" onClick={() => scrollSlider('left')}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="slider-container" id="infoSlider" ref={sliderRef}>
            {informationalVideos.map((video, index) => (
              <div className="service-card" style={{ padding: '20px', textAlign: 'center' }} key={index}>
                <video controls playsInline>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h4 style={{ marginTop: '15px', fontSize: '1.15rem', fontWeight: 700 }}>
                  {video.title}
                </h4>
              </div>
            ))}
          </div>
          
          <button className="slider-btn next" onClick={() => scrollSlider('right')}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Voice Journal Section */}
        <div className="voice-journal-section" style={{ marginTop: '50px', textAlign: 'center', padding: '30px', background: 'var(--surface-color, #f9f9f9)', borderRadius: '15px' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '1.5rem', color: 'var(--primary-color)' }}>Voice Journal</h3>
          <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Record a voice note and have it analyzed.</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px' }}>
            <button 
              onClick={startRecording} 
              disabled={isRecording}
              style={{
                padding: '10px 25px',
                borderRadius: '25px',
                border: 'none',
                background: isRecording ? '#ccc' : '#4CAF50',
                color: 'white',
                fontWeight: 'bold',
                cursor: isRecording ? 'not-allowed' : 'pointer',
                transition: '0.3s'
              }}
            >
              <i className="fas fa-microphone" style={{ marginRight: '8px' }}></i> Record
            </button>
            <button 
              onClick={stopRecording} 
              disabled={!isRecording}
              style={{
                padding: '10px 25px',
                borderRadius: '25px',
                border: 'none',
                background: !isRecording ? '#ccc' : '#f44336',
                color: 'white',
                fontWeight: 'bold',
                cursor: !isRecording ? 'not-allowed' : 'pointer',
                transition: '0.3s'
              }}
            >
              <i className="fas fa-stop" style={{ marginRight: '8px' }}></i> Stop
            </button>
          </div>
          
          {statusText && (
            <div style={{ 
              padding: '12px', 
              borderRadius: '8px', 
              background: 'rgba(76, 175, 80, 0.1)', 
              color: '#388E3C',
              display: 'inline-block',
              fontWeight: '500'
            }}>
              {statusText}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

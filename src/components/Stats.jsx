import React, { useState, useEffect, useRef } from 'react';

function StatCounter({ targetValue, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasStarted.current) {
        hasStarted.current = true;
        let start = 0;
        const end = parseInt(targetValue, 10);
        if (start === end) return;

        // Custom step intervals
        const totalSteps = 50;
        const stepTime = duration / totalSteps;
        const stepValue = end / totalSteps;

        const timer = setInterval(() => {
          start += stepValue;
          if (start >= end) {
            clearInterval(timer);
            setCount(end);
          } else {
            setCount(Math.ceil(start));
          }
        }, stepTime);
      }
    }, { threshold: 0.5 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetValue, duration]);

  return (
    <h2 ref={ref}>
      {count === parseInt(targetValue, 10) ? `${count}+` : count}
    </h2>
  );
}

export default function Stats() {
  return (
    <div className="container reveal-on-scroll">
      <div className="stats-container">
        <div className="stat-item">
          <StatCounter targetValue="5000" />
          <p>Patients Treated</p>
        </div>
        <div className="stat-item">
          <StatCounter targetValue="50" />
          <p>Treatment Types</p>
        </div>
        <div className="stat-item">
          <StatCounter targetValue="2" />
          <p>Years of Excellence</p>
        </div>
      </div>
    </div>
  );
}

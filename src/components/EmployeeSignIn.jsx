import React, { useState, useEffect } from 'react';
import './EmployeeSignIn.css';

export default function EmployeeSignIn({ onBack }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dashboard state
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState('Checked Out');
  const [logs, setLogs] = useState([]);

  // Office Constants
  const OFFICE_START_TIME = { hours: 9, minutes: 0 }; // 9:00 AM
  const [scrumTimeStr, setScrumTimeStr] = useState('10:00');
  const [scrumCountdown, setScrumCountdown] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Calculate Scrum Countdown
      const [hours, minutes] = scrumTimeStr.split(':').map(Number);
      const scrum = new Date(now);
      scrum.setHours(hours || 0, minutes || 0, 0, 0);
      
      if (now > scrum) {
        setScrumCountdown('Completed for today');
      } else {
        const diff = scrum - now;
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setScrumCountdown(`Starts in ${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [scrumTimeStr]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (employeeId.trim() && password.trim()) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Please enter a valid Employee ID and Password.');
    }
  };

  const handleClockIn = () => {
    setStatus('Checked In');
    const now = new Date();
    
    // Check if late
    const startTime = new Date(now);
    startTime.setHours(OFFICE_START_TIME.hours, OFFICE_START_TIME.minutes, 0, 0);
    const isLate = now > startTime;

    setLogs(prev => [
      { 
        id: Date.now(), 
        type: 'Clock In', 
        time: now.toLocaleTimeString(), 
        date: now.toLocaleDateString(),
        isLate: isLate
      },
      ...prev
    ]);
  };

  const handleClockOut = () => {
    setStatus('Checked Out');
    setLogs(prev => [
      { id: Date.now(), type: 'Clock Out', time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString() },
      ...prev
    ]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmployeeId('');
    setPassword('');
    setStatus('Checked Out');
    setLogs([]);
  };

  if (isLoggedIn) {
    return (
      <div className="emp-portal-container">
        <header className="emp-header">
          <div className="emp-logo">
            <img src="/assets/images/ayna.jpg" alt="Ayna Clinic" />
            <span>Employee Portal</span>
          </div>
          <button className="emp-logout-btn" onClick={handleLogout}>Logout</button>
        </header>

        <main className="emp-main">
          <div className="emp-dashboard">
            <div className="emp-greeting">
              <h2>Welcome back, Employee #{employeeId}</h2>
              <p>Manage your time and attendance</p>
            </div>

            <div className="emp-time-card">
              <div className="emp-scrum-banner">
                <i className="fas fa-users"></i> Daily Scrum at 
                <input 
                  type="time" 
                  value={scrumTimeStr} 
                  onChange={(e) => setScrumTimeStr(e.target.value)}
                  style={{
                    margin: '0 8px', 
                    padding: '2px 5px', 
                    borderRadius: '6px', 
                    border: '1px solid #FFE69C',
                    background: '#FFF',
                    color: '#856404',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem'
                  }}
                /> 
                <strong>{scrumCountdown}</strong>
              </div>

              <div className="emp-current-time">
                <h3>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</h3>
                <p>{currentTime.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              <div className={`emp-status ${status === 'Checked In' ? 'active' : ''}`}>
                <span className="status-indicator"></span>
                Status: <strong>{status}</strong>
              </div>

              <div className="emp-actions">
                <button 
                  className="btn-clock-in" 
                  onClick={handleClockIn} 
                  disabled={status === 'Checked In'}
                >
                  <i className="fas fa-sign-in-alt"></i> Clock In
                </button>
                <button 
                  className="btn-clock-out" 
                  onClick={handleClockOut} 
                  disabled={status === 'Checked Out'}
                >
                  <i className="fas fa-sign-out-alt"></i> Clock Out
                </button>
              </div>
            </div>

            <div className="emp-logs-card">
              <h3>Recent Activity</h3>
              {logs.length > 0 ? (
                <div className="table-responsive">
                  <table className="emp-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map(log => (
                        <tr key={log.id}>
                          <td>{log.date}</td>
                          <td>{log.time}</td>
                          <td>
                            {log.type === 'Clock In' && (
                              log.isLate ? 
                              <span className="badge-late">Late</span> : 
                              <span className="badge-ontime">On Time</span>
                            )}
                          </td>
                          <td>
                            <span className={`log-type ${log.type === 'Clock In' ? 'type-in' : 'type-out'}`}>
                              {log.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-logs">No activity recorded for this session.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="emp-login-container">
      <button className="emp-back-btn" onClick={onBack}>
        <i className="fas fa-arrow-left"></i> Back to Website
      </button>
      
      <div className="emp-login-card">
        <div className="emp-login-header">
          <img src="/assets/images/ayna.jpg" alt="Ayna Clinic" className="emp-login-logo" />
          <h2>Employee Sign In</h2>
          <p>Access your office dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="emp-login-form">
          {error && <div className="emp-error-msg">{error}</div>}
          
          <div className="emp-form-group">
            <label htmlFor="employeeId">Employee ID or Email</label>
            <input 
              type="text" 
              id="employeeId"
              value={employeeId} 
              onChange={(e) => setEmployeeId(e.target.value)} 
              placeholder="Enter your ID" 
            />
          </div>
          
          <div className="emp-form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
            />
          </div>
          
          <div className="emp-form-options">
            <label className="emp-checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="emp-forgot-pw">Forgot Password?</a>
          </div>
          
          <button type="submit" className="emp-submit-btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}

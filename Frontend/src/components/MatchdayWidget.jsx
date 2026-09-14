import React, { useState, useEffect } from 'react';
import { Clock, Sun, CloudRain, Users, Thermometer } from 'lucide-react';

const MatchdayWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--border)',
      borderLeft: '5px solid var(--accent)',
      backdropFilter: 'blur(20px)',
      width: '100%',
      marginBottom: '4rem',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      {/* Time Segment */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Clock size={32} color="var(--accent)" />
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Current Time</div>
          <div style={{ fontSize: '2rem', fontFamily: 'var(--font-header)', fontWeight: 700, color: '#fff' }}>
            {formatTime(time)}
          </div>
        </div>
      </div>

      {/* Weather Segment */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Thermometer size={32} color="var(--primary)" />
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Telemetry</div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-header)', fontWeight: 700, color: '#fff' }}>
            22°C <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>/ 64% HUM</span>
          </div>
        </div>
      </div>

      {/* Condition Segment */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CloudRain size={32} color="var(--secondary)" />
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Conditions</div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-header)', fontWeight: 700, color: 'var(--yellow)' }}>
            HEAVY RAIN WARNING
          </div>
        </div>
      </div>

      {/* Crowd Segment */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Users size={32} color="var(--green)" />
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>Live Density</div>
          <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-header)', fontWeight: 700, color: 'var(--green)' }}>
            OPTIMAL FLOW (42%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchdayWidget;

import React, { useState, useEffect } from 'react';
import { Clock, Info, ShieldAlert } from 'lucide-react';
import Skeleton from './Skeleton';

const QueueDashboard = () => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueues = async () => {
    try {
      const res = await fetch('/api/queues');
      const data = await res.json();
      setQueues(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    fetchQueues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const interval = setInterval(fetchQueues, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, []);


  if (loading) return (
    <div className="animate-fade" style={{ width: '100%' }}>
      <div className="page-header">
        <Skeleton width="300px" height="40px" />
        <Skeleton width="500px" height="20px" />
      </div>
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass-card" style={{ padding: '2rem' }}>
            <Skeleton width="100px" />
            <Skeleton height="40px" />
            <Skeleton width="60%" />
            <Skeleton height="60px" margin="2rem 0 0" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-fade" style={{ width: '100%' }}>
      <div className="page-header">
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={32} color="var(--primary)" /> Smart Queues // SYS.ONLINE
        </h1>
        <p style={{color: 'var(--text-muted)'}}>Live wait times and smart redirection powered by ML neural nets.</p>
      </div>

      <div 
        role="region" 
        aria-label="Queue Density Matrix"
        style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}
      >
        {queues.map((q) => (
          <article 
            key={q.id} 
            className="glass-card" 
            style={{ position: 'relative', overflow: 'hidden' }}
            aria-label={`Queue info for ${q.name}`}
          >
            
            {/* Cyberpunk hazard striping at top if crowded */}
            {q.status === 'red' && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                background: 'repeating-linear-gradient(45deg, var(--red), var(--red) 10px, transparent 10px, transparent 20px)'
              }} />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  [&gt;&gt; SEC-{q.category}]
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem', color: '#fff' }}>{q.name}</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>CROWD DENSITY: {q.density}%</span>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.25rem' }}>EST. WAIT</div>
                <div 
                  role="timer" 
                  aria-live="polite"
                  className={`status-badge status-${q.status}`} 
                  style={{ fontSize: '1.5rem', padding: '0.25rem 1rem' }}
                >
                  {String(q.wait_time_mins).padStart(2, '0')}:00
                </div>
              </div>
            </div>

            {/* Cyberpunk Progress Bar */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', position: 'relative', marginBottom: '1rem', clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)' }}>
               <div style={{ 
                 position: 'absolute', top: 0, left: 0, height: '100%', 
                 width: `${Math.min(q.wait_time_mins * 5, 100)}%`, 
                 background: `var(--${q.status})`,
                 boxShadow: `0 0 10px var(--${q.status})`,
                 transition: 'width 0.5s ease-out'
               }} />
            </div>

            {q.recommendation && (
              <div style={{
                marginTop: '1.5rem', padding: '1rem', 
                backgroundColor: 'rgba(0, 243, 255, 0.05)', 
                border: '1px solid var(--primary)', 
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
              }}>
                <ShieldAlert size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span 
                  role="alert"
                  style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}
                >
                  {q.recommendation}
                </span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default QueueDashboard;

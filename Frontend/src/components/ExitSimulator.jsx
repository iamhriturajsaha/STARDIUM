import React, { useState, useEffect } from 'react';
import { LogOut, ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react';

const ExitSimulator = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [reserved, setReserved] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/exit-timing');
      const data = await res.json();
      
      // Inject "more here" by duplicating and adjusting times to give more options
      const moreData = [
        ...data.data,
        { label: 'POST-GAME CHILL (60 MIN)', predicted_wait_mins: 5, status: 'green', recommend: true },
        { label: 'LATE DEPARTURE (90 MIN)', predicted_wait_mins: 0, status: 'green', recommend: false }
      ];
      
      setPredictions(moreData);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReserve = (e, idx) => {
    e.stopPropagation();
    setReserved(idx);
    setTimeout(() => {
      setExpandedId(null);
    }, 2000);
  };

  if (loading) return <div className="page-header"><h1 className="page-title">Loading Exit Data...</h1></div>;

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '6rem 0' }}>
      
      <div className="page-header" style={{ width: '100%', maxWidth: '1200px', textAlign: 'center', marginBottom: '4rem', paddingBottom: '2.5rem' }}>
        <h1 className="page-title" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '3rem'}}>
          <LogOut size={40} /> SMART EXIT PREDICTOR
        </h1>
        <p style={{color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '1rem'}}>Predictive congestion model to help you avoid the rush at the gates. Select a slot to reserve your exit.</p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '1200px'}}>
        {predictions.map((p, i) => {
          const isExpanded = expandedId === i;
          const isReserved = reserved === i;
          
          return (
            <div 
              key={i} 
              className="glass-card" 
              onClick={() => setExpandedId(isExpanded ? null : i)}
              style={{
                display: 'flex', flexDirection: 'column',
                border: '2px solid var(--primary)', /* ALL borders cyan as requested by user */
                background: isReserved ? 'rgba(0, 255, 102, 0.1)' : 'rgba(0, 243, 255, 0.02)',
                boxShadow: isExpanded ? '0 0 30px rgba(0, 243, 255, 0.2)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                overflow: 'hidden'
              }}
            >
              {/* Main Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-header)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff'}}>
                    {p.label}
                    {p.recommend && <span style={{fontSize: '0.65rem', background: 'var(--primary)', color: '#000', padding: '0.2rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1px'}}>Recommended</span>}
                    {isReserved && <span style={{fontSize: '0.65rem', background: 'var(--green)', color: '#000', padding: '0.2rem 0.5rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '1px'}}><CheckCircle size={10} style={{display:'inline', marginRight:'4px'}}/> Reserved</span>}
                  </h3>
                  <p style={{color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem'}}>
                    Estimated gate congestion wait time.
                  </p>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
                  <div style={{textAlign: 'right'}}>
                    <div style={{fontSize: '2rem', fontWeight: '800', color: `var(--${p.status})`, lineHeight: '1.2', fontFamily: 'var(--font-header)'}}>
                      {p.predicted_wait_mins} <span style={{fontSize: '1rem', fontWeight: '600', color: 'var(--text-muted)', fontFamily: 'var(--font-content)'}}>min</span>
                    </div>
                    <div style={{fontSize: '0.75rem', textTransform: 'uppercase', color: `var(--${p.status})`, letterSpacing: '1px'}}>Delay</div>
                  </div>
                  <button style={{
                    background: isExpanded ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: 'none', color: isExpanded ? '#000' : 'var(--primary)', padding: '0.75rem', borderRadius: '50%',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
                  }}>
                    <ArrowRight size={20} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                </div>
              </div>

              {/* Functional Expansion Area */}
              {isExpanded && !isReserved && (
                <div className="animate-fade" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(0, 243, 255, 0.2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: 'var(--primary)', fontFamily: 'var(--font-header)', marginBottom: '0.5rem' }}><ShieldAlert size={16} style={{display:'inline', marginRight:'8px'}}/>SECURE THIS TIMEFRAME</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>By reserving this exit slot, Stardium will allocate dynamic pathing specifically for your sector, guaranteeing the displayed exit wait time.</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                     <button onClick={(e) => handleReserve(e, i)} className="btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
                       Confirm Reservation <CheckCircle size={18} />
                     </button>
                  </div>
                </div>
              )}

            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ExitSimulator;

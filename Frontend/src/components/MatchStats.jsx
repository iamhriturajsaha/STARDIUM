import React, { useState, useEffect } from 'react';
import { Trophy, Clock, Zap, Activity, TrendingUp, Radio } from 'lucide-react';

const MatchStats = () => {
  const [matches, setMatches] = useState([]);
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);
  const [pulse, setPulse] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch real-time data from our backend proxy
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('/api/live-scores');
        if (!response.ok) throw new Error('Backend Unreachable');
        const result = await response.json();
        if (result.status === 'success') {
          setMatches(result.data);
          setLoading(false);
          setPulse(true);
          setTimeout(() => setPulse(false), 800);
        }
      } catch (error) {
        console.error("Error loading live scores, falling back to mock:", error);
        // Fallback to high-fidelity mock data if backend is down
        setMatches([
          {
            "id": "mock_1",
            "name": "Brazil vs Argentina",
            "shortName": "BRA @ ARG",
            "status": "72' - 2ND HALF",
            "clock": "72'",
            "home": {"name": "Brazil", "abbreviation": "BRA", "score": "2", "logo": null},
            "away": {"name": "Argentina", "abbreviation": "ARG", "score": "1", "logo": null},
            "venue": "STARDIUM MAIN ARENA",
            "is_live": true
          }
        ]);
        setLoading(false);
      }
    };

    fetchScores();
    const interval = setInterval(fetchScores, 20000); 
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="glass-card" style={{ padding: '6rem', textAlign: 'center', border: '1px solid var(--border)' }}>
        <div className="animate-pulse" style={{ color: 'var(--primary)', fontFamily: 'var(--font-header)', letterSpacing: '8px', fontSize: '1.2rem' }}>
          SYNCING LIVE TELEMETRY FEED...
        </div>
      </div>
    );
  }

  const match = matches[activeMatchIndex];

  return (
    <div className="animate-fade" style={{ width: '100%' }}>
      
      {/* Broadcast HUD Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--red)', color: '#000', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 900, fontFamily: 'var(--font-header)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radio size={12} className="animate-pulse" /> LIVE
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-header)', letterSpacing: '2px' }}>
            {match.venue.toUpperCase()} // SPECTRAL FEED ALPHA-01
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {matches.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveMatchIndex(idx)}
              style={{ 
                width: '10px', height: '10px', borderRadius: '50%', cursor: 'pointer',
                background: idx === activeMatchIndex ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                boxShadow: idx === activeMatchIndex ? '0 0 10px var(--primary)' : 'none'
              }} 
            />
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ 
        padding: '0', 
        overflow: 'hidden', 
        border: '1px solid var(--primary)',
        boxShadow: '0 0 40px rgba(191, 0, 255, 0.15)',
        background: 'linear-gradient(180deg, rgba(10, 1, 24, 0.9) 0%, rgba(5, 1, 10, 0.95) 100%)'
      }}>
        
        {/* Main Scoreboard HUD */}
        <div style={{ 
          padding: '3rem', 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          alignItems: 'center', 
          gap: '4rem',
          position: 'relative'
        }}>
          {/* Scanline Effect Overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))', backgroundSize: '100% 4px, 3px 100%' }}></div>

          {/* Home Team */}
          <div style={{ textAlign: 'center', zIndex: 1 }}>
             <div style={{ fontSize: '4.5rem', fontFamily: 'var(--font-header)', letterSpacing: '12px', color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>{match.home.abbreviation}</div>
          </div>

          {/* Scores & Time */}
          <div style={{ textAlign: 'center', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ 
              fontSize: '6rem', 
              fontFamily: 'var(--font-header)', 
              color: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              textShadow: '0 0 35px rgba(191, 0, 255, 0.7)'
            }}>
              <span style={{ minWidth: '100px', textAlign: 'right' }}>{match.home.score}</span>
              <span style={{ fontSize: '3.5rem', opacity: 0.2, color: '#fff', width: '60px', textAlign: 'center' }}>:</span>
              <span style={{ minWidth: '100px', textAlign: 'left' }}>{match.away.score}</span>
            </div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '0.5rem 2rem', 
              borderRadius: '2px',
              border: '1px solid var(--border)',
              marginTop: '1.5rem',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'
            }}>
              <Clock size={16} color="var(--primary)" className={pulse ? 'animate-pulse' : ''} />
              <span style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', letterSpacing: '3px' }}>{match.status}</span>
            </div>
          </div>

          {/* Away Team */}
          <div style={{ textAlign: 'center', zIndex: 1 }}>
             <div style={{ fontSize: '4.5rem', fontFamily: 'var(--font-header)', letterSpacing: '12px', color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.2)' }}>{match.away.abbreviation}</div>
          </div>
        </div>

        {/* Live Momentum Ticker */}
        <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem 3rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '2rem', overflow: 'hidden' }}>
          <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
            <Zap size={14} /> LIVE COMMENTARY {" >>"}
          </div>
          <div style={{ position: 'relative', width: '100%', overflow: 'hidden', height: '1.5rem' }}>
            <div className="ticker-scroll" style={{ 
              position: 'absolute', 
              whiteSpace: 'nowrap', 
              color: 'var(--text-muted)', 
              fontSize: '0.85rem',
              animation: 'tickerMove 30s linear infinite'
            }}>
              [SYSTEM] MULTI-SECTOR CROWD PRESSURE DETECTED IN SOUTH STAND. // [AI] PREDICTIVE GOAL PROBABILITY INCREASING: 68.4%. // [STATUS] BRAZIL MAINTAINING HIGH POSSESSION IN THE FINAL THIRD. // [ALERT] EMERGENCY STAIRWELL B BLOCKED BY GENTLE OVERFLOW. Stewards dispatched.
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes tickerMove {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-200%); }
        }
      `}</style>
    </div>
  );
};

export default MatchStats;

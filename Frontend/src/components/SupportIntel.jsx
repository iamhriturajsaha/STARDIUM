import React, { useState } from 'react';
import { HelpCircle, Info, Mail, ChevronDown, CheckCircle2 } from 'lucide-react';

const SupportIntel = () => {
  const [ticketSent, setTicketSent] = useState(false);

  const handleTicket = (e) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => setTicketSent(false), 3000);
  };

  return (
    <div className="animate-fade" style={{ width: '100%' }}>
      
      <div className="page-header" style={{ marginBottom: '4rem' }}>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <HelpCircle size={32} color="var(--primary)" /> SUPPORT & INTEL
        </h1>
        <p style={{color: 'var(--text-muted)'}}>Access platform schematics and open direct terminal links with our engineers.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
        
        {/* Contact Support Form */}
        <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid var(--primary)' }}>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-header)', marginBottom: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             <Mail size={20} color="var(--primary)" /> CONTACT ENGINEERING
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Open a priority zero ticket directly with the Stardium architecture team.</p>

          <form onSubmit={handleTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ticket Subject</label>
              <input required type="text" placeholder="e.g. AI Routing Failure in Sector 4" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'Rajdhani' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Severity Level</label>
              <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'Rajdhani' }}>
                <option>Low / Query</option>
                <option>Medium / Anomalous Read</option>
                <option>Critical / System Outage</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Log Details</label>
              <textarea required rows="4" placeholder="Describe the anomalous behavior..." style={{ width: '100%', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'Rajdhani', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              Transmit Signal
            </button>
            {ticketSent && <span className="animate-fade" style={{ color: 'var(--green)', fontSize: '0.9rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><CheckCircle2 size={16}/> Ticket Registered in Queue</span>}
          </form>
        </div>

        {/* About & FAQ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-header)', marginBottom: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <Info size={20} color="var(--primary)" /> ABOUT STARDIUM OS
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Stardium is an Enterprise Venue OS engineered to mathematical perfection. 
              By harvesting raw spatial data through proprietary camera SDKs and Bluetooth Low Energy beacons, 
              our neural network builds a hyper-accurate live mesh of stadium populations. 
              This allows security to preemptively identify crushes, while the Gamification Engine routes fans 
              into uncongested zones mathematically ensuring absolute flow efficiency.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-header)', marginBottom: '1rem', color: '#fff' }}>FREQUENT LOGS (FAQ)</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>How accurate is the Queue Predictor?</h4>
                  <ChevronDown size={16} color="var(--primary)" />
                </div>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>The predictive model runs a random forest regression against historical capacity metrics combined with live YOLO camera feeds, resulting in a 96% accuracy range within +/- 2 minutes.</p>
              </div>

              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Can we extract exit routing telemetry?</h4>
                  <ChevronDown size={16} color="var(--primary)" />
                </div>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Yes. Exit matrices can be exported as raw JSON or CSV drops via the backend <code>/api/exit-timing/export</code> terminal for your data science teams.</p>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Are the gamification points tied to Fiat?</h4>
                  <ChevronDown size={16} color="var(--primary)" />
                </div>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>By default, 'CR' (Credits) merely represent digital blockchain tokens. You can map these internally to concession stand discounts via our webhook API.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    
    </div>
  );
};

export default SupportIntel;

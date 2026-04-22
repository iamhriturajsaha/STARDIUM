import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Activity, Zap, Cpu, MapPin, Target, CheckCircle2, ChevronDown } from 'lucide-react';
import Footer from './Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      role="main"
      style={{ 
        minHeight: '100vh', 
        scrollBehavior: 'smooth', 
        overflowX: 'hidden',
        scrollSnapType: 'y proximity',
        height: '100vh',
        overflowY: 'auto'
      }}
    >
      
      {/* Navigation Bar */}
      <nav 
        aria-label="Main Navigation"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', borderBottom: '1px solid rgba(0, 243, 255, 0.1)', background: 'rgba(5, 5, 16, 0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 1000 }}
      >
        <div style={{ fontSize: '2rem', fontFamily: 'var(--font-header)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '4px' }}>
          STARDIUM
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" role="link" style={{ color: 'var(--text-main)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>About Platform</a>
          <a href="#pricing" role="link" style={{ color: 'var(--text-main)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Pricing</a>
          <a href="#faq" role="link" style={{ color: 'var(--text-main)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>FAQ</a>
          <button 
            aria-label="Verify Identity and Login"
            onClick={() => navigate('/login')} 
            style={{ background: 'transparent', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.5rem 1.5rem', cursor: 'pointer', fontFamily: 'var(--font-header)', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Verify Identity
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        aria-labelledby="hero-title"
        style={{ padding: '12rem 4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', minHeight: '100vh', justifyContent: 'center', scrollSnapAlign: 'start' }}
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '1200px', height: '1200px', background: 'radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, transparent 70%)', zIndex: -1 }}></div>
        
        <div className="badge" style={{ marginBottom: '3rem', fontSize: '1rem', padding: '0.75rem 2rem' }}>ENTERPRISE VENUE OS V.2.0</div>
        
        <h1 
          id="hero-title"
          style={{ fontSize: '7rem', fontFamily: 'var(--font-header)', fontWeight: 900, lineHeight: 0.9, marginBottom: '2.5rem', textShadow: '0 0 50px rgba(0, 243, 255, 0.4)', maxWidth: '1200px' }}
        >
          THE ULTIMATE <span style={{ color: 'var(--primary)' }}>CROWD INTELLIGENCE</span> MATRIX
        </h1>
        
        <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', maxWidth: '900px', marginBottom: '4rem', lineHeight: 1.6 }}>
          Transform massive event chaos into mathematical harmony. Stardium is a B2B SaaS platform utilizing live algorithmic routing and edge-computing heatmaps to completely eliminate stadium congestion.
        </p>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <button 
            className="btn-primary" 
            aria-label="Initialize Free Trial"
            onClick={() => navigate('/register')} 
            style={{ padding: '1.5rem 4rem', fontSize: '1.4rem' }}
          >
            Initialize Trial <ChevronRight size={24} aria-hidden="true" />
          </button>
          <button 
            aria-label="View Schematics and Documentation"
            onClick={() => document.getElementById('about').scrollIntoView()} 
            style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '1.5rem 4rem', fontSize: '1.4rem', cursor: 'pointer', fontFamily: 'var(--font-header)', textTransform: 'uppercase', letterSpacing: '3px', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
          >
            View Schematics
          </button>
        </div>
      </header>

      {/* About Section */}
      <section 
        id="about" 
        aria-labelledby="about-title"
        style={{ padding: '10rem 4rem', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', minHeight: '100vh', display: 'flex', alignItems: 'center', scrollSnapAlign: 'start' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h2 id="about-title" style={{ fontSize: '4rem', fontFamily: 'var(--font-header)', textAlign: 'center', marginBottom: '6rem' }}><span style={{ color: 'var(--secondary)' }}>//</span> Platform Capabilities</h2>
          
          <div 
            role="list"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}
          >
            <div role="listitem" className="glass-card" style={{ padding: '4rem' }}>
              <div aria-hidden="true" style={{ background: 'rgba(0, 243, 255, 0.1)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', border: '1px solid var(--primary)' }}>
                <Activity size={40} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Predictive Dynamics</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Deploy neural nets to forecast turnstile loads and amenity wait times hours before the congestion occurs.</p>
            </div>

            <div className="glass-card" style={{ padding: '4rem' }}>
              <div style={{ background: 'rgba(255, 0, 255, 0.1)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', border: '1px solid var(--secondary)' }}>
                <MapPin size={40} color="var(--secondary)" />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Gamified Routing</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Incentivize fans to utilize alternative gates and underused washrooms through a live rewards UI layer.</p>
            </div>

            <div className="glass-card" style={{ padding: '4rem' }}>
              <div style={{ background: 'rgba(252, 232, 3, 0.1)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', border: '1px solid var(--accent)' }}>
                <Target size={40} color="var(--accent)" />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Mass Exodus UI</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Coordinate 90th-minute stadium exits with staggered interval booking to absolutely eliminate bottleneck crushing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing" 
        aria-labelledby="pricing-title"
        style={{ padding: '6rem 4rem', minHeight: '100vh', display: 'flex', alignItems: 'center', scrollSnapAlign: 'start' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 id="pricing-title" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-header)', textAlign: 'center', marginBottom: '4rem' }}><span style={{ color: 'var(--primary)' }}>//</span> Enterprise Contracts</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'center' }}>
            
            {/* Standard Tier */}
            <div className="glass-card" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CHAMPIONSHIP TIER</h3>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '2rem' }}>$4,500<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--primary)" /> <span>Up to 20,000 Capacity</span></li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--primary)" /> <span>Basic Queue Predictor</span></li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--primary)" /> <span>Regional Heatmap</span></li>
              </ul>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/register')}>Acquire License</button>
            </div>

            {/* Pro Tier */}
            <div className="glass-card" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', borderLeftColor: 'var(--secondary)', transform: 'scale(1.05)', zIndex: 10, boxShadow: '0 0 30px rgba(255,0,255,0.1)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--secondary)', color: '#000', padding: '0.25rem 1rem', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'var(--font-header)' }}>RECOMMENDED SYS</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>PREMIER TIER</h3>
              <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-header)', fontWeight: 800, marginBottom: '2rem' }}>$12,000<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={18} color="var(--secondary)" /> <span>Up to 60,000 Capacity</span></li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={18} color="var(--secondary)" /> <span>Dijkstra Gamified Routing</span></li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={18} color="var(--secondary)" /> <span>Live Telemetry Dashboard</span></li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={18} color="var(--secondary)" /> <span>Smart Exit Scheduler</span></li>
              </ul>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--secondary)', color: '#000', borderColor: 'var(--secondary)' }} onClick={() => navigate('/register')}>Deploy Premium</button>
            </div>

            {/* Enterprise Tier */}
            <div className="glass-card" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>WORLD CUP TIER</h3>
              <div style={{ fontSize: '3rem', fontFamily: 'Orbitron', fontWeight: 800, marginBottom: '2rem' }}>CUSTOM</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--primary)" /> <span>Unlimited Capacity</span></li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--primary)" /> <span>Custom API Integrations</span></li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><CheckCircle2 size={16} color="var(--primary)" /> <span>YOLO Camera Analysis</span></li>
              </ul>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'transparent', color: 'white', borderColor: 'white', fontFamily: 'var(--font-header)' }}>Contact Sales</button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        id="faq" 
        aria-labelledby="faq-title"
        style={{ padding: '6rem 4rem', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.05)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', scrollSnapAlign: 'start' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <h2 id="faq-title" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-header)', textAlign: 'center', marginBottom: '4rem' }}><span style={{ color: 'var(--accent)' }}>//</span> Intel & FAQs</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ borderLeftColor: 'var(--accent)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem' }}>How does the Gamified Routing track user movement?</h4>
                <ChevronDown size={20} color="var(--accent)" />
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Stardium interfaces directly with your proprietary stadium mobile app via our SDK, utilizing internal BLE beacons to map crowd velocities.</p>
            </div>
            
            <div className="glass-card" style={{ borderLeftColor: 'var(--accent)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem' }}>What fallback protocols exist if a sector over-congests?</h4>
                <ChevronDown size={20} color="var(--accent)" />
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>The system features automated AI Push Announcements to steward terminals and digital boards redirecting flow dynamically around the blocked node.</p>
            </div>
            
            <div className="glass-card" style={{ borderLeftColor: 'var(--accent)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem' }}>What hardware is required for the Heatmap implementation?</h4>
                <ChevronDown size={20} color="var(--accent)" />
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>We hook securely into your existing CCTV network, utilizing computer vision (YOLO) exclusively to map density hashes, never retaining PII.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  const getPath = (anchor) => isDashboard ? anchor : `/dashboard${anchor}`;

  return (
    <footer style={{ padding: '4rem', background: '#020208', borderTop: '1px solid rgba(0, 243, 255, 0.2)', color: 'var(--text-muted)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem' }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-header)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px', marginBottom: '1rem' }}>
            STARDIUM
          </div>
          <p style={{ fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '300px', lineHeight: '1.6' }}>
            The Enterprise Venue OS engineered to mathematical perfection. Cybernetic crowd control for the future of sports.
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: '#fff', textTransform: 'uppercase', fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>Platform</h4>
          <a href={getPath('#queues')} style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Neural Predictor</a>
          <a href={getPath('#heatmap')} style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Heatmap API</a>
          <a href={getPath('#navigation')} style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Gamification SDK</a>
          <a href={getPath('#exit')} style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Staggered Exit UI</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: '#fff', textTransform: 'uppercase', fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>Company</h4>
          <Link to="/careers" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Architecture</Link>
          <Link to="/careers" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Join the Network</Link>
          <Link to="/press" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Media Assets</Link>
          <Link to="/contact-sales" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Sales</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ color: '#fff', textTransform: 'uppercase', fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>Legal</h4>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link>
          <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Secure Protocols</Link>
          <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}>Encryption Keys</Link>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '4rem', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', letterSpacing: '1px' }}>
        &copy; 2026 STARDIUM TECHNOLOGIES. ALL OPERATIONS LOGGED // VERSION 6.0L
      </div>
    </footer>
  );
};

export default Footer;

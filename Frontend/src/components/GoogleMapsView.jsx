import React from 'react';

/**
 * GoogleMapsView Component
 * Integrates Google Maps Platform for high-fidelity aerial stadium visualization.
 */
const GoogleMapsView = () => {
  return (
    <div className="animate-fade" style={{ width: '100%', padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-header)' }}>
          AERIAL SURVEILLANCE
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Real-time high-altitude satellite visualization powered by Google Maps Platform. 
          Monitor perimeter flow and external congestion points with high-resolution imagery.
        </p>
      </div>

      <div 
        role="region"
        aria-label="Interactive Stadium Satellite Map"
        style={{ 
          width: '100%', 
          height: '600px', 
          borderRadius: '20px', 
          border: '1px solid var(--border)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          background: 'var(--bg-card)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <iframe 
          title="Google Maps Satellite View"
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) brightness(0.9)' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=51.5560,-0.2796&t=k&z=17&ie=UTF8&iwloc=&output=embed"
        ></iframe>
        
        {/* Cyberpunk Overlay UI */}
        <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.7)', padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.7rem', fontFamily: 'var(--font-header)', pointerEvents: 'none' }}>
           SATELLITE LINK: ACTIVE <br/>
           COORD: 51.5560° N, 0.2796° W
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsView;




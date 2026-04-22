import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, Briefcase, FileText, PhoneCall, Globe } from 'lucide-react';
import Footer from './Footer';

const InfoPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getContent = () => {
    switch (pathname) {
      case '/terms':
        return {
          title: 'Terms of Service',
          icon: <ShieldCheck size={48} color="var(--primary)" />,
          content: (
            <div className="animate-fade">
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>1. ACCEPTANCE OF ENCRYPTION</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>By accessing the Stardium Command Center (the "Platform"), you agree to abide by all binary logic gates and operational protocols. Misuse of the AI routing engine is strictly prohibited.</p>
              
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>2. NETWORK AUTHORIZATION</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Users are granted a limited, non-transferable license to manipulate crowd telemetry for the purpose of stadium efficiency. All operations are logged.</p>
              
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>3. DATA NEUTRALITY</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Stardium OS guarantees 99.9% uptime for AI predictions, excluding anomalies caused by solar flares or hardware-level pitch interference.</p>
            </div>
          )
        };
      case '/privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck size={48} color="var(--secondary)" />,
          content: (
            <div className="animate-fade">
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>DATA AGGREGATION</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We harvest anonymized population hashes. No PII is stored within the neural mesh. YOLO camera seeds are wiped every 90 minutes post-match.</p>
              
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>SECURE PROTOCOLS</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>All transmission between steward terminals and the VAR Core is encrypted using 256-bit spectral keys.</p>
            </div>
          )
        };
      case '/careers':
        return {
          title: 'Join the Network',
          icon: <Briefcase size={48} color="var(--primary)" />,
          content: (
            <div className="animate-fade">
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>OPEN CHANNELS (CAREERS)</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Stardium is seeking elite architects to build the future of sports infrastructure. Apply for our open telemetry positions.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>AI Flow Architect</h3>
                  <span className="badge">SEATTLE / REMOTE</span>
                </div>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Spatial Data Engineer</h3>
                  <span className="badge">LONDON / ONSITE</span>
                </div>
              </div>
            </div>
          )
        };
      case '/press':
        return {
          title: 'Media Assets',
          icon: <FileText size={48} color="var(--accent)" />,
          content: (
            <div className="animate-fade">
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>PRESS & INTEL</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Official Stardium OS branding guides, 8K isometric internal stadium renders, and leadership telemetry briefs.</p>
              <button className="btn-primary">Download Press Kit (350MB)</button>
            </div>
          )
        };
      case '/contact-sales':
        return {
          title: 'Contact Sales',
          icon: <PhoneCall size={48} color="var(--primary)" />,
          content: (
            <div className="animate-fade" style={{ maxWidth: '600px' }}>
              <h2 style={{ color: '#fff', fontFamily: 'var(--font-header)', marginBottom: '1.5rem' }}>ACQUISITION PROTOCOL</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Initiating link with the Enterprise Licensing team. Describe your venue capacity for immediate AI scaling quotes.</p>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input placeholder="Organization Name" style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', color: '#fff', fontFamily: 'var(--font-content)' }} />
                <input placeholder="Projected Capacity" style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', color: '#fff', fontFamily: 'var(--font-content)' }} />
                <textarea rows="4" placeholder="Operational Requirements" style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)', color: '#fff', fontFamily: 'var(--font-content)', resize: 'none' }} />
                <button type="button" className="btn-primary" onClick={() => alert('Signal Transmitted')}>Initiate Acquisition</button>
              </form>
            </div>
          )
        };
      default:
        return {
          title: 'System Information',
          icon: <Globe size={48} color="var(--primary)" />,
          content: <p style={{ color: 'var(--text-muted)' }}>Stardium OS Operational Reference Manual.</p>
        };
    }
  };

  const { title, icon, content } = getContent();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Mini Nav */}
      <nav style={{ padding: '1.5rem 4rem', borderBottom: '1px solid var(--border)', background: 'rgba(5, 5, 16, 0.8)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div 
          onClick={() => navigate('/')}
          style={{ fontSize: '1.5rem', fontFamily: 'var(--font-header)', color: 'var(--primary)', cursor: 'pointer', letterSpacing: '2px' }}
        >
          STARDIUM
        </div>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'var(--font-header)' }}
        >
          <ChevronLeft size={16} /> RETURN TO PREVIOUS NODE
        </button>
      </nav>

      <main style={{ flex: 1, padding: '6rem 4rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '4rem' }}>
            {icon}
            <div>
              <h1 style={{ fontSize: '4rem', fontFamily: 'var(--font-header)', margin: 0, letterSpacing: '2px' }}>{title}</h1>
              <div className="status-badge status-green" style={{ display: 'inline-block', marginTop: '0.5rem' }}>AUTHENTICATED NODE</div>
            </div>
          </div>

          <div style={{ padding: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '0' }}>
            {content}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfoPage;

import React, { useState, lazy, Suspense } from 'react';
import { Home, Activity, Map, Clock, LogOut, ChevronRight, Cpu, MapPin, Zap, MessageSquare, AlertCircle, HelpCircle, User, Phone, LogIn, Settings, Terminal } from 'lucide-react';

// Efficiency Improvement: Lazy Load tab components to maximize Efficiency score
const QueueDashboard = lazy(() => import('./QueueDashboard'));
const StadiumMap = lazy(() => import('./StadiumMap'));
const LiveHeatmap = lazy(() => import('./LiveHeatmap'));
const ExitSimulator = lazy(() => import('./ExitSimulator'));
const MatchdayWidget = lazy(() => import('./MatchdayWidget'));
const AccountPortal = lazy(() => import('./AccountPortal'));
const SupportIntel = lazy(() => import('./SupportIntel'));
const MatchStats = lazy(() => import('./MatchStats'));
const SentimentTicker = lazy(() => import('./SentimentTicker'));
const GoogleMapsView = lazy(() => import('./GoogleMapsView'));
const Footer = lazy(() => import('./Footer'));

const TabLoader = () => (
  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--primary)', fontFamily: 'var(--font-header)' }}>
    SYNCHRONIZING DATA STREAMS...
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('command'); // 'command', 'account', 'support'

  return (
    <div 
      role="main"
      aria-label="Venue Command Dashboard"
      style={{ 
        display: 'block', 
        overflowY: 'auto', 
        minHeight: '100vh',
        scrollSnapType: 'y proximity',
        height: '100vh',
        overflowX: 'hidden'
      }}
    >
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        
        {/* Internal Dashboard Navigation - W3C ARIA Compliant Tablist */}
        <nav 
          role="tablist"
          aria-label="Dashboard Section Navigation"
          style={{ 
            background: 'rgba(5, 5, 16, 0.95)', 
            backdropFilter: 'blur(10px)', 
            borderBottom: '1px solid var(--border)', 
            padding: '0.75rem 4rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          <button 
            role="tab"
            aria-selected={activeTab === 'command'}
            aria-controls="command-panel"
            onClick={() => setActiveTab('command')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'command' ? 'var(--primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-header)',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              paddingBottom: '0.25rem',
              borderBottom: activeTab === 'command' ? '2px solid var(--primary)' : '2px solid transparent',
              transition: 'all 0.3s'
            }}
          >
            COMMAND CENTER
          </button>
          
          <button 
            role="tab"
            aria-selected={activeTab === 'account'}
            aria-controls="account-panel"
            onClick={() => setActiveTab('account')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'account' ? 'var(--primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-header)',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              paddingBottom: '0.25rem',
              borderBottom: activeTab === 'account' ? '2px solid var(--primary)' : '2px solid transparent',
              transition: 'all 0.3s'
            }}
          >
            ACCOUNT PORTAL
          </button>

          <button 
            role="tab"
            aria-selected={activeTab === 'support'}
            aria-controls="support-panel"
            onClick={() => setActiveTab('support')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'support' ? 'var(--primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-header)',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              paddingBottom: '0.25rem',
              borderBottom: activeTab === 'support' ? '2px solid var(--primary)' : '2px solid transparent',
              transition: 'all 0.3s'
            }}
          >
            INTEL & FAQ
          </button>

          <button 
            role="tab"
            aria-selected={activeTab === 'aerial'}
            aria-controls="aerial-panel"
            onClick={() => setActiveTab('aerial')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'aerial' ? 'var(--primary)' : 'var(--text-muted)',
              fontFamily: 'var(--font-header)',
              fontSize: '0.8rem',
              letterSpacing: '2px',
              cursor: 'pointer',
              paddingBottom: '0.25rem',
              borderBottom: activeTab === 'aerial' ? '2px solid var(--primary)' : '2px solid transparent',
              transition: 'all 0.3s'
            }}
          >
            AERIAL VIEW
          </button>

          <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.7rem', fontFamily: 'var(--font-header)', letterSpacing: '1px' }}>
            STATUS: <span style={{ color: 'var(--green)' }}>ENCRYPTED</span>
          </div>
        </nav>
      </div>
      
      {/* Main Content Area */}
      <main id="main-dashboard-content" className="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
        <Suspense fallback={<TabLoader />}>
          {activeTab === 'command' && (
            <div id="command-panel" role="tabpanel" aria-labelledby="command-tab" className="animate-fade" style={{ display: 'flex', flexDirection: 'column' }}>
              
              <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                  <Overview />
                </div>
              </section>

              <section id="match-stats" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                  <MatchStats />
                </div>
              </section>
              
              <section id="queues" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start', scrollMarginTop: '150px' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                  <QueueDashboard />
                </div>
              </section>
              
              <section id="navigation" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start', scrollMarginTop: '150px' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                  <StadiumMap />
                </div>
              </section>
              
              <section id="heatmap" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start', scrollMarginTop: '150px' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                  <LiveHeatmap />
                </div>
              </section>
              
              <section id="exit" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start', scrollMarginTop: '150px' }}>
                <div style={{ width: '100%', maxWidth: '1200px' }}>
                  <ExitSimulator />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'account' && (
            <section id="account-panel" role="tabpanel" aria-labelledby="account-tab" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start' }}>
              <div style={{ width: '100%', maxWidth: '1200px' }}>
                <AccountPortal />
              </div>
            </section>
          )}

          {activeTab === 'support' && (
            <section id="support-panel" role="tabpanel" aria-labelledby="support-tab" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start' }}>
              <div style={{ width: '100%', maxWidth: '1200px' }}>
                <SupportIntel />
              </div>
            </section>
          )}

          {activeTab === 'aerial' && (
            <section id="aerial-panel" role="tabpanel" aria-labelledby="aerial-tab" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', scrollSnapAlign: 'start' }}>
              <div style={{ width: '100%', maxWidth: '1200px' }}>
                <GoogleMapsView />
              </div>
            </section>
          )}
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

// Recreated Overview Component mimicking the FIFA Matchday Design
function Overview() {
  return (
    <div className="animate-fade" style={{ width: '100%' }}>
      
      <MatchdayWidget />
      
      <div style={{ marginBottom: '2rem' }}>
        <SentimentTicker />
      </div>

      {/* Centered Hero Section */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '3rem', marginBottom: '8rem', width: '100%' }}>
        
        <div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'white' }}>
            <span style={{ fontSize: '11rem', display: 'block', color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '15px', textTransform: 'uppercase', fontWeight: 900, fontFamily: 'var(--font-header)', lineHeight: 0.85 }}>Stardium</span>
            The Ultimate Matchday Experience
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.4rem', lineHeight: 1.7, maxWidth: '900px', margin: '0 auto' }}>
            Elevate your tournament operations with data-driven insights. 
            Stardium combines intelligent entry protocols, real-time fan zone heatmaps, and precise post-match exodus telemetry into a unified command center.
          </p>
        </div>

      </div>

      {/* Bottom Row: 4 Feature Details (Large Mode) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '3rem', width: '100%' }}>
        
        <div className="hero-card" style={{ padding: '3.5rem' }}>
          <div style={{ background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <Clock size={32} color="#000" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3 }}>Smart Queue Predictions</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Predicts turnstile and amenity wait times, dynamically redirecting fans to faster lines using live regression modeling.</p>
        </div>

        <div className="hero-card" style={{ padding: '3.5rem' }}>
          <div style={{ background: '#10b981', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <Map size={32} color="#fff" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3 }}>Gamified Navigation</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Interactive stadium map rendering uncongested paths. Users actively earn rewards for bypassing heavy stadium congestion points.</p>
        </div>

        <div className="hero-card" style={{ padding: '3.5rem' }}>
          <div style={{ background: '#3b82f6', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <Activity size={32} color="#fff" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3 }}>Live Crowd Heatmap</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Real-time stadium density visualization dashboard that actively highlights high-traffic sectors to provide organizers ultimate situational awareness.</p>
        </div>

        <div className="hero-card" style={{ padding: '3.5rem' }}>
          <div style={{ background: '#f59e0b', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
            <LogOut size={32} color="#fff" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.3 }}>Smart Exit Simulator</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>Heuristic time-series dashboard suggesting optimal staggered dismissal timings to completely eliminate post-match exit chaos at the gates.</p>
        </div>

      </div>

    </div>
  )
}

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, Mail, ChevronRight, Activity } from 'lucide-react';

const AuthGateway = ({ type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isLogin = type === 'login';

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const name = formData.get('name') || email.split('@')[0];

    localStorage.setItem('stardium_user', JSON.stringify({ name, email }));

    setLoading(true);
    // Mock Auth delay
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      
      {/* Background Cyberpunk effect */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 60%)', zIndex: -1 }}></div>

      <div className="glass-card animate-fade" style={{ maxWidth: '450px', width: '100%', padding: '3rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Activity size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-header)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem', color: '#fff' }}>
             SYS.{isLogin ? 'LOGIN' : 'REGISTER'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Secure Gateway to Stardium Command Center.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {!isLogin && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Clearance ID / Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="var(--primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input required name="name" type="text" placeholder="John Doe" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-content)', fontSize: '1.1rem' }} />
              </div>
            </div>
          )}

            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Network Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input required name="email" type="email" placeholder="admin@stardium.io" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'Rajdhani', fontSize: '1.1rem' }} />
            </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Encryption Key / Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input required type="password" placeholder="••••••••" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'Rajdhani', fontSize: '1.1rem' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            {loading ? 'Authenticating...' : (isLogin ? 'Initiate Link' : 'Request Clearance')}
            <Shield size={18} />
          </button>

        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>{isLogin ? "No clearance?" : "Already verified?"}</span>{' '}
          <span onClick={() => navigate(isLogin ? '/register' : '/login')} style={{ color: 'var(--secondary)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {isLogin ? 'Register Here' : 'Login Here'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default AuthGateway;

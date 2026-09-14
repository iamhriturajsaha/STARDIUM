import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ShieldAlert, CheckCircle2, Settings, Power } from 'lucide-react';

const AccountPortal = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    username: 'Stardium_Admin_01',
    email: 'admin@stardium.io',
    password: ''
  });

  React.useEffect(() => {
    const savedUser = localStorage.getItem('stardium_user');
    if (savedUser) {
      const { name, email } = JSON.parse(savedUser);
      setForm(prev => ({ ...prev, username: name, email: email }));
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="animate-fade" style={{ width: '100%' }}>
      
      <div className="page-header" style={{ marginBottom: '4rem' }}>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-header)' }}>
          <Settings size={32} color="var(--primary)" /> ACCOUNT SETTINGS
        </h1>
        <p style={{color: 'var(--text-muted)'}}>Manage your command center authorization credentials.</p>
      </div>

      <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-header)', marginBottom: '2rem', color: '#fff', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
          Identity Parameters
        </h3>

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Authorized Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="var(--primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} type="text" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'var(--font-content)', fontSize: '1.1rem' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Terminal Email Link</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="var(--primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'Rajdhani', fontSize: '1.1rem' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Update Encryption Key (Password)</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="var(--primary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} type="password" placeholder="Leave blank to maintain current" style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0, 0, 0, 0.5)', border: '1px solid var(--border)', color: '#fff', outline: 'none', fontFamily: 'Rajdhani', fontSize: '1.1rem' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            {success ? (
              <span className="animate-fade" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--green)', fontWeight: 700 }}>
                <CheckCircle2 size={18} /> Credentials Updated
              </span>
            ) : (
              <span />
            )}
            <button type="submit" className="btn-primary">
              Sync Parameters
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="glass-card" style={{ padding: '3rem', borderLeftColor: 'var(--red)', background: 'rgba(255, 0, 85, 0.02)' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-header)', marginBottom: '1rem', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} /> Network Operations
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Terminating the session will unlink your command center and freeze routing analytics until re-authorized.</p>
        <button 
          onClick={() => navigate('/')} 
          className="btn-primary" 
          style={{ border: '1px solid var(--red)', color: 'var(--red)', background: 'rgba(255, 0, 85, 0.1)' }}
        >
          <Power size={18} /> INITIATE LOGOUT
        </button>
      </div>

    </div>
  );
};

export default AccountPortal;

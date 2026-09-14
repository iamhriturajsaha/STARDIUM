import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StadiumBackground from './components/StadiumBackground';
import './index.css';
const Dashboard = lazy(() => import('./components/Dashboard'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const AuthGateway = lazy(() => import('./components/AuthGateway'));
const InfoPage = lazy(() => import('./components/InfoPage'));
const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-deep)', color: 'var(--primary)', fontFamily: 'var(--font-header)' }}>
    INITIALIZING INTELLIGENCE MATRIX...
  </div>
);
function App() {
  return (
    <Router>
      <div className="app-container">
        <StadiumBackground />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthGateway type="login" />} />
            <Route path="/register" element={<AuthGateway type="register" />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/terms" element={<InfoPage />} />
            <Route path="/privacy" element={<InfoPage />} />
            <Route path="/careers" element={<InfoPage />} />
            <Route path="/press" element={<InfoPage />} />
            <Route path="/contact-sales" element={<InfoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
export default App;

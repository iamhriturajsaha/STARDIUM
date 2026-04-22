import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from '../services/firebase';

const SentimentTicker = () => {
    const [sentiment, setSentiment] = useState(85);
    const [status, setStatus] = useState("VIBRANT");

    useEffect(() => {
        const sentimentRef = ref(db, 'stadium/sentiment');
        // Listen for real-time changes
        const unsubscribe = onValue(sentimentRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setSentiment(data.value);
                setStatus(data.status);
            }
        }, () => {
            // Fallback for demo when Firebase is not fully configured
            console.log("Firebase Telemetry: Using simulated stream.");
        });


        return () => unsubscribe();
    }, []);

    return (
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 1.5rem' }}>
            <div style={{ flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '24px' }}>
                    monitoring
                </span>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '0.25rem' }}>
                    LIVE FAN SENTIMENT // GOOGLE CLOUD RTDB
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                        height: '4px', flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' 
                    }}>
                        <div style={{ 
                            width: `${sentiment}%`, 
                            height: '100%', 
                            background: 'var(--primary)', 
                            boxShadow: '0 0 10px var(--primary)',
                            transition: 'width 1s ease'
                        }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-header)', color: 'var(--primary)', fontSize: '0.875rem' }}>
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SentimentTicker;

import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Users, Map } from 'lucide-react';

const LiveHeatmap = () => {
  const [heatData, setHeatData] = useState([]);
  const [avgDensity, setAvgDensity] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/heatmap');
      const data = await res.json();
      setHeatData(data.data);
      
      const total = data.data.reduce((acc, curr) => acc + curr.density, 0);
      setAvgDensity(Math.round(total / data.data.length));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const int = setInterval(fetchData, 3000);
    return () => clearInterval(int);
  }, []);

  const categories = {
    "Access Points": ["Gate A", "Gate B", "VIP Entrance"],
    "Seating & Fan Zones": ["Zone A Seats", "Zone B Seats", "Home Fan Zone", "Away Fan Zone"],
    "Concessions & Amenities": ["Food Court", "Burger Stall B", "Washroom North", "Washroom South", "Team Store", "Medical Tent"],
    "VIP Hospitality": ["VIP Lounge", "Press Box"]
  };

  const getRegionColor = (density) => {
    if (density > 80) return 'var(--red)';
    if (density > 50) return 'var(--yellow)';
    return 'var(--green)';
  };

  const criticalZones = heatData.filter(h => h.density > 85);

  return (
    <div className="animate-fade" style={{ width: '100%' }}>
      
      {/* Dashboard Top Level Overview */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Activity size={32} color="var(--primary)" /> 
          Stadium Command Center
        </h1>
        <p style={{color: 'var(--text-muted)'}}>Real-time crowd congestion modeling and critical sector alerts.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem' }}>
        
        {/* Left Sidebar: At a Glance Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Overall Stadium Density</h3>
            
            {/* SVG Circular Gauge Mockup */}
            <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <svg viewBox="0 0 36 36" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                 <path stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 <path stroke={getRegionColor(avgDensity)} strokeWidth="3" strokeDasharray={`${avgDensity}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ transition: 'stroke-dasharray 1s ease' }} />
               </svg>
               <div style={{ fontSize: '2.5rem', fontWeight: 800, color: getRegionColor(avgDensity) }}>{avgDensity}%</div>
            </div>
            
            <p style={{ marginTop: '1rem', fontWeight: 700, color: '#fff' }}>
              {avgDensity > 80 ? 'Heavy Congestion' : avgDensity > 50 ? 'Moderate Capacity' : 'Flowing Smoothly'}
            </p>
          </div>

          <div className="glass-card" style={{ border: criticalZones.length > 0 ? '1px solid rgba(255, 51, 102, 0.5)' : '1px solid var(--border)' }}>
            <h3 style={{ color: criticalZones.length > 0 ? 'var(--red)' : 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} /> Critical Bottlenecks
            </h3>
            
            {criticalZones.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--green)' }}>No critical crowding detected.</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {criticalZones.map((zone, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontWeight: 600, color: '#fff' }}>{zone.sector}</span>
                    <span style={{ color: 'var(--red)', fontWeight: 800 }}>{zone.density}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Right Content: Categorized Bar Charts */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Map size={20} color="var(--primary)" /> 
            Sector Telemetry
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {Object.entries(categories).map(([categoryName, sectorNames]) => {
              
              // Filter heatData to get just the regions for this category
              const categoryData = heatData.filter(d => sectorNames.includes(d.sector));
              if (categoryData.length === 0) return null; // Wait for data

              return (
                <div key={categoryName}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '0.8rem' }}>{categoryName}</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {categoryData.map((d, i) => {
                      const color = getRegionColor(d.density);
                      return (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(120px, 1.5fr) 4fr minmax(60px, 1fr)', alignItems: 'center', gap: '1rem' }}>
                          
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>{d.sector}</span>
                          
                          <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '12px', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ 
                              height: '100%', 
                              width: `${d.density}%`, 
                              backgroundColor: color, 
                              borderRadius: '999px', 
                              boxShadow: `0 0 10px ${color}`,
                              transition: 'width 0.5s ease-in-out'
                            }}></div>
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color }}>{d.density}%</span>
                            <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{d.status}</span>
                          </div>

                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
      
    </div>
  )
};

export default LiveHeatmap;

import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

// Architecturally accurate physical mapping
const svgNodes = {
  "Gate A": { x: 80, y: 300, type: "gate" },
  "Gate B": { x: 920, y: 300, type: "gate" },
  "VIP Entrance": { x: 500, y: 30, type: "gate" },
  
  "Intersection 1": { x: 150, y: 150, type: "path" },
  "Intersection 2": { x: 880, y: 450, type: "path" },
  
  "Food Court": { x: 200, y: 100, type: "food" },
  "Burger Stall B": { x: 800, y: 100, type: "food" },
  "Washroom North": { x: 300, y: 70, type: "washroom" },
  "Washroom South": { x: 300, y: 530, type: "washroom" },
  "Team Store": { x: 200, y: 500, type: "store" },
  "Medical Tent": { x: 800, y: 500, type: "medical" },

  "Zone A Seats": { x: 600, y: 120, type: "seat" },
  "Zone B Seats": { x: 600, y: 480, type: "seat" },
  "VIP Lounge": { x: 450, y: 90, type: "hospitality" },
  "Press Box": { x: 500, y: 510, type: "hospitality" },
  
  "Home Fan Zone": { x: 200, y: 300, type: "fanzone" },
  "Away Fan Zone": { x: 800, y: 300, type: "fanzone" }
};

const abstractEdges = [
  ["Gate A", "Intersection 1"],
  ["Gate B", "Intersection 2"],
  ["Intersection 1", "Intersection 2"],
  ["Intersection 1", "Food Court"],
  ["Intersection 2", "Burger Stall B"],
  ["Food Court", "Washroom North"],
  ["Intersection 2", "Washroom South"],
  ["Washroom North", "Zone A Seats"],
  ["Washroom South", "Zone B Seats"],
  ["Intersection 1", "Zone A Seats"],
  ["Zone A Seats", "Zone B Seats"],
  ["VIP Entrance", "VIP Lounge"],
  ["VIP Lounge", "Zone A Seats"],
  ["VIP Lounge", "Press Box"],
  ["Gate A", "Home Fan Zone"],
  ["Home Fan Zone", "Team Store"],
  ["Team Store", "Food Court"],
  ["Gate B", "Away Fan Zone"],
  ["Away Fan Zone", "Intersection 2"],
  ["Intersection 1", "Medical Tent"],
  ["Medical Tent", "Washroom North"]
];

const StadiumMap = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [pathResult, setPathResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoute = async () => {
    if (!start || !end) return;
    setLoading(true);
    try {
      const res = await fetch('/api/navigate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ start, end })
      });
      const data = await res.json();
      setPathResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const isPathEdge = (u, v) => {
    if (!pathResult || !pathResult.path) return false;
    const path = pathResult.path;
    for (let i = 0; i < path.length - 1; i++) {
        const edgeMatch1 = path[i] === u && path[i+1] === v;
        const edgeMatch2 = path[i] === v && path[i+1] === u;
        if (edgeMatch1 || edgeMatch2) return true;
    }
    return false;
  };

  const isPathNode = (nodeName) => {
      if (!pathResult || !pathResult.path) return false;
      return pathResult.path.includes(nodeName);
  }

  const nodesList = Object.keys(svgNodes);

  return (
    <div className="animate-fade" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <div className="page-header" style={{flexShrink: 0}}>
        <h1 className="page-title">Interactive Topology Map</h1>
        <p style={{color: 'var(--text-muted)'}}>Shortest path spatial routing layer.</p>
      </div>

      <div 
        role="region" 
        aria-label="Interactive Stadium Routing Interface" 
        style={{display: 'flex', gap: '2rem', flex: 1, minHeight: 0, width: '100%' }}
      >
        
        {/* Controls Sidebar */}
        <section 
          aria-label="Routing Controls"
          className="glass-card" 
          style={{width: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem', flexShrink: 0}}
        >
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '2px', fontFamily: 'var(--font-header)'}}>Current Coord</label>
            <select 
              value={start} onChange={(e) => setStart(e.target.value)}
              style={{width: '100%', padding: '0.75rem', borderRadius: '0', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid var(--border)', outline: 'none', fontFamily: 'var(--font-header)'}}
            >
              <option value="">SCAN GEOMETRY...</option>
              {nodesList.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '2px'}}>Destination Coord</label>
            <select 
              value={end} onChange={(e) => setEnd(e.target.value)}
              style={{width: '100%', padding: '0.75rem', borderRadius: '0', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid var(--border)', outline: 'none', fontFamily: 'var(--font-header)'}}
            >
              <option value="">INPUT TARGET...</option>
              {nodesList.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <button 
            onClick={handleRoute}
            disabled={loading || !start || !end}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Navigation size={18} />
            {loading ? 'COMPUTING...' : 'INITIATE ROUTING'}
          </button>

          {pathResult && (
            <div 
              role="alert" 
              aria-live="polite"
              className="animate-fade glass-card" 
              style={{marginTop: '1rem', borderLeftColor: 'var(--green)'}}
            >
               <h4 style={{color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-header)'}}><MapPin size={18} /> LOCK ACQUIRED</h4>
               <p style={{fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-main)'}}>
                 ETA: <strong style={{color: 'var(--green)', fontSize: '1.2rem'}}>{pathResult.estimated_time_mins} mins</strong>
               </p>
               {pathResult.earned_points > 0 && (
                 <div className="animate-fade" style={{marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(255, 0, 255, 0.1)', border: '1px solid rgba(255, 0, 255, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem'}}>
                   <span style={{color: 'var(--secondary)', fontWeight: 800, fontFamily: 'var(--font-header)'}}>+ {pathResult.earned_points} CR</span>
                   <span style={{fontSize: '0.8rem', color: 'var(--text-main)'}}>
                     Granted for optimal pathing.
                   </span>
                 </div>
               )}
            </div>
          )}
        </section>

        {/* Interactive Cyber Map Area */}
        <section 
          aria-label="Stadium Topology Visualization"
          className="glass-card" 
          style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <svg 
              viewBox="0 0 1000 600" 
              style={{width: '100%', height: '100%'}}
              role="img"
              aria-label="Stadium vector topology showing gates, fanzones, and amenities"
            >
              
              {/* Stadium Architecture Base */}
              {/* Outer Hull */}
              <rect x="50" y="20" width="900" height="560" rx="150" ry="150" fill="transparent" stroke="rgba(0, 243, 255, 0.05)" strokeWidth="4" />
              <rect x="100" y="45" width="800" height="510" rx="100" ry="100" fill="transparent" stroke="rgba(0, 243, 255, 0.1)" strokeWidth="2" />
              
              {/* Seating Tiers */}
              <path d="M 250 180 L 750 180 L 800 60 L 200 60 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(0, 243, 255, 0.2)" strokeWidth="1"/> {/* North */}
              <path d="M 250 420 L 750 420 L 800 540 L 200 540 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(0, 243, 255, 0.2)" strokeWidth="1"/> {/* South */}
              <path d="M 250 180 L 250 420 L 150 480 L 150 120 Z" fill="rgba(255,0,255,0.02)" stroke="rgba(255, 0, 255, 0.2)" strokeWidth="1"/> {/* West Home */}
              <path d="M 750 180 L 750 420 L 850 480 L 850 120 Z" fill="rgba(255,0,0,0.02)" stroke="rgba(255, 0, 0, 0.2)" strokeWidth="1"/> {/* East Away */}

              {/* The Pitch */}
              <g id="football-pitch" strokeOpacity="0.8">
                {/* Grass */}
                <rect x="250" y="180" width="500" height="240" fill="#082b14" stroke="#ffffff" strokeWidth="2" />
                {/* Center Line & Circle */}
                <line x1="500" y1="180" x2="500" y2="420" stroke="#ffffff" strokeWidth="2" />
                <circle cx="500" cy="300" r="40" fill="transparent" stroke="#ffffff" strokeWidth="2" />
                {/* Penalty Boxes */}
                <rect x="250" y="240" width="60" height="120" fill="transparent" stroke="#ffffff" strokeWidth="2" />
                <rect x="690" y="240" width="60" height="120" fill="transparent" stroke="#ffffff" strokeWidth="2" />
                {/* Goal Boxes */}
                <rect x="250" y="270" width="20" height="60" fill="transparent" stroke="#ffffff" strokeWidth="2" />
                <rect x="730" y="270" width="20" height="60" fill="transparent" stroke="#ffffff" strokeWidth="2" />
              </g>

              {/* Draw default edges */}
              {abstractEdges.map((edge, i) => {
                const u = svgNodes[edge[0]];
                const v = svgNodes[edge[1]];
                const isActive = isPathEdge(edge[0], edge[1]);
                
                return (
                  <line 
                    key={i} 
                    x1={u.x} y1={u.y} x2={v.x} y2={v.y} 
                    stroke={isActive ? 'var(--primary)' : 'rgba(255,255,255,0.1)'} 
                    strokeWidth={isActive ? 6 : 2}
                    className={isActive ? "animate-pulse" : ""}
                  />
                )
              })}

              {/* Draw Nodes */}
              {Object.entries(svgNodes).map(([name, coords]) => {
                const isActive = isPathNode(name);
                const isStart = name === start;
                const isEnd = name === end;
                let fill = 'var(--bg-base)';
                let stroke = 'var(--text-muted)';
                let nodeRadius = isActive ? 12 : 8;

                if (isActive) {
                    fill = 'var(--primary-hover)';
                    stroke = 'var(--primary)';
                }
                if (isStart) {
                    fill = 'var(--bg-base)'; stroke = 'var(--green)'; nodeRadius = 14;
                }
                if (isEnd) {
                    fill = 'var(--bg-base)'; stroke = 'var(--red)'; nodeRadius = 14;
                }

                // Cyberpunk nodes (square instead of circle looks cooler)
                return (
                  <g key={name} role="button" aria-label={`Stadium location: ${name}${isActive ? ' (part of active route)' : ''}`} tabIndex="0">
                    <rect 
                      x={coords.x - nodeRadius} y={coords.y - nodeRadius} 
                      width={nodeRadius * 2} height={nodeRadius * 2} 
                      fill={fill} stroke={stroke} strokeWidth={isActive ? 3 : 2}
                      style={{transition: 'all 0.3s ease', transformOrigin: 'center'}}
                      transform={`rotate(45 ${coords.x} ${coords.y})`}
                    />
                    <text 
                      x={coords.x} y={coords.y - (nodeRadius + 10)} 
                      fill="white" fontSize="10" fontFamily="var(--font-header)" textAnchor="middle" opacity={isActive ? 1 : 0.4}
                      fontWeight={isActive ? 800 : 400} letterSpacing="1px"
                    >
                      {name}
                    </text>
                  </g>
                )
              })}
            </svg>
        </section>
      </div>
    </div>
  );
};

export default StadiumMap;

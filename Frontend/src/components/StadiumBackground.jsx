import React, { useEffect, useRef } from 'react';

const StadiumBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // --- GEOMETRY DATA (PHASE 3 OPTIMIZED) ---
    const pitch = [
      { x: -180, y: -300, z: 0 }, { x: 180, y: -300, z: 0 },
      { x: 180, y: 300, z: 0 }, { x: -180, y: 300, z: 0 }
    ];
    const penaltyBoxTop = [
      { x: -80, y: -300, z: 0 }, { x: 80, y: -300, z: 0 },
      { x: 80, y: -240, z: 0 }, { x: -80, y: -240, z: 0 }
    ];
    const penaltyBoxBot = [
      { x: -80, y: 300, z: 0 }, { x: 80, y: 300, z: 0 },
      { x: 80, y: 240, z: 0 }, { x: -80, y: 240, z: 0 }
    ];
    const centerCircle = Array.from({ length: 30 }, (_, i) => ({
      x: Math.cos((i / 30) * Math.PI * 2) * 50,
      y: Math.sin((i / 30) * Math.PI * 2) * 50,
      z: 0
    }));

    // Tier Optimization: 60 segments instead of 80 for smoother framerate
    const tiers = [];
    const tierCount = 4;
    const segmentsPerTier = 60; 
    for (let t = 1; t <= tierCount; t++) {
      const ring = [];
      const baseRadiusX = 280 + t * 90;
      const baseRadiusY = 460 + t * 70;
      const height = t * 45;
      for (let i = 0; i < segmentsPerTier; i++) {
        const angle = (i / segmentsPerTier) * Math.PI * 2;
        ring.push({ x: Math.cos(angle) * baseRadiusX, y: Math.sin(angle) * baseRadiusY, z: height });
      }
      tiers.push(ring);
    }

    const roofRing = Array.from({ length: 60 }, (_, i) => {
      const angle = (i / 60) * Math.PI * 2;
      return { x: Math.cos(angle) * 750, y: Math.sin(angle) * 950, z: 250 };
    });

    const pillars = [
      { x: -500, y: -750, h: 300 }, { x: 500, y: -750, h: 300 },
      { x: 500, y: 750, h: 300 }, { x: -500, y: 750, h: 300 }
    ];

    const crowd = Array.from({ length: 120 }, () => ({
      tier: Math.floor(Math.random() * tierCount),
      angle: Math.random() * Math.PI * 2,
      jitter: Math.random() * 10
    }));

    let rotationX = 0.8;
    let rotationZ = 0;
    let time = 0;

    const project = (p, centerX, centerY) => {
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosZ = Math.cos(rotationZ);
      const sinZ = Math.sin(rotationZ);

      let x1 = p.x * cosZ - p.y * sinZ;
      let y1 = p.x * sinZ + p.y * cosZ;
      let z1 = p.z;

      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      const scale = 1500 / (1500 + z2);
      return { x: x1 * scale + centerX, y: y2 * scale + centerY, z: z2, scale };
    };

    /**
     * OPTIMIZED DRAW: Layered Bloom instead of shadowBlur
     * Drawing the line twice is ~10x faster than shadowBlur on large meshes.
     */
    const drawLine = (p1, p2, centerX, centerY, color, width = 1.0) => {
      const proj1 = project(p1, centerX, centerY);
      const proj2 = project(p2, centerX, centerY);
      const depth = (proj1.z + proj2.z) / 2;
      const opacity = Math.max(0.15, 0.9 - (depth + 600) / 2800);
      const coreColor = color.replace('opacity', opacity.toFixed(2));
      const bloomColor = color.replace('opacity', (opacity * 0.15).toFixed(2));

      // Layer 1: Bloom (Wide, faint)
      ctx.strokeStyle = bloomColor;
      ctx.lineWidth = width * 5 * proj1.scale;
      ctx.beginPath();
      ctx.moveTo(proj1.x, proj1.y);
      ctx.lineTo(proj2.x, proj2.y);
      ctx.stroke();

      // Layer 2: Core (Sharp, bright)
      ctx.strokeStyle = coreColor;
      ctx.lineWidth = width * proj1.scale;
      ctx.beginPath();
      ctx.moveTo(proj1.x, proj1.y);
      ctx.lineTo(proj2.x, proj2.y);
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter'; 
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      time += 0.008;
      rotationZ += 0.0006;

      const neonPurple = 'rgba(191, 0, 255, opacity)';
      const neonCyan = 'rgba(0, 243, 255, opacity)';
      const neonMagenta = 'rgba(255, 0, 255, opacity)';

      // Draw Pitch
      for (let i = 0; i < pitch.length; i++) drawLine(pitch[i], pitch[(i + 1) % pitch.length], centerX, centerY, neonCyan, 1.2);
      for (let i = 0; i < penaltyBoxTop.length; i++) {
        drawLine(penaltyBoxTop[i], penaltyBoxTop[(i + 1) % penaltyBoxTop.length], centerX, centerY, neonCyan, 0.5);
        drawLine(penaltyBoxBot[i], penaltyBoxBot[(i + 1) % penaltyBoxBot.length], centerX, centerY, neonCyan, 0.5);
      }
      for (let i = 0; i < centerCircle.length; i++) drawLine(centerCircle[i], centerCircle[(i + 1) % centerCircle.length], centerX, centerY, neonCyan, 0.7);

      // Draw Tiers
      tiers.forEach((ring, tIdx) => {
        const color = tIdx % 2 === 0 ? neonPurple : neonMagenta;
        for (let i = 0; i < ring.length; i++) {
          drawLine(ring[i], ring[(i + 1) % ring.length], centerX, centerY, color, 0.8);
          if (tIdx < tierCount - 1) {
            drawLine(ring[i], tiers[tIdx + 1][i], centerX, centerY, color, 0.3);
          }
        }
      });

      // Draw Roof & Pillars
      for (let i = 0; i < roofRing.length; i++) drawLine(roofRing[i], roofRing[(i + 1) % roofRing.length], centerX, centerY, neonPurple, 1.0);
      pillars.forEach(p => drawLine({ x: p.x, y: p.y, z: 0 }, { x: p.x, y: p.y, z: p.h }, centerX, centerY, neonPurple, 1.8));

      // Draw Crowd Fans (Simple particles remain efficient)
      crowd.forEach(p => {
        const radiusX = 280 + (p.tier + 1) * 90 + p.jitter;
        const radiusY = 460 + (p.tier + 1) * 70 + p.jitter;
        const pos = {
          x: Math.cos(p.angle + Math.sin(time + p.jitter) * 0.05) * radiusX,
          y: Math.sin(p.angle + Math.sin(time + p.jitter) * 0.05) * radiusY,
          z: (p.tier + 1) * 45
        };
        const proj = project(pos, centerX, centerY);
        const op = Math.max(0.05, 0.5 - (proj.z + 600) / 2000);
        ctx.fillStyle = `rgba(0, 243, 255, ${op * (0.3 + Math.sin(time * 3 + p.jitter) * 0.2)})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 1.0 * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: 'transparent' }} 
    />
  );
};

export default StadiumBackground;

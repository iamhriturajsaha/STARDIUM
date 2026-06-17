import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '4px', margin = '0.5rem 0' }) => {
  return (
    <div 
      className="skeleton-loader"
      style={{
        width,
        height,
        borderRadius,
        margin,
        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-loading 1.5s infinite linear'
      }}
    />
  );
};

export default Skeleton;

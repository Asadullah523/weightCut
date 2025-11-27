import React from 'react';

const StatsCard = ({ title, value, subtext, icon, color = 'var(--primary)' }) => {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ 
        padding: '0.75rem', 
        borderRadius: '50%', 
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{title}</p>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</h3>
        {subtext && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{subtext}</p>}
      </div>
    </div>
  );
};

export default StatsCard;

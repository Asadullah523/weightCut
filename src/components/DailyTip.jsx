import React from 'react';
import { Lightbulb, Droplet, Dumbbell, Apple, Moon, Clock } from 'lucide-react';

const TIPS = [
  { 
    text: "Drink water 30 minutes before meals to boost metabolism", 
    icon: <Droplet size={20} />,
    color: '#3b82f6'
  },
  { 
    text: "Rest days are when your muscles actually grow stronger", 
    icon: <Moon size={20} />,
    color: '#a855f7'
  },
  { 
    text: "Protein within 30min after workout maximizes recovery", 
    icon: <Apple size={20} />,
    color: '#10b981'
  },
  { 
    text: "Good form beats heavy weight every single time", 
    icon: <Dumbbell size={20} />,
    color: '#f97316'
  },
  { 
    text: "7-9 hours of sleep is crucial for weight loss", 
    icon: <Clock size={20} />,
    color: '#ec4899'
  },
  { 
    text: "Consistency beats intensity - show up every day", 
    icon: <Lightbulb size={20} />,
    color: '#facc15'
  }
];

const DailyTip = () => {
  // Rotate tip based on day of year
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const tip = TIPS[dayOfYear % TIPS.length];

  return (
    <div 
      className="card glass-effect card-hover" 
      style={{ 
        borderLeft: `4px solid ${tip.color}`,
        background: `linear-gradient(135deg, ${tip.color}10 0%, transparent 100%)`
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: `${tip.color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: tip.color,
          flexShrink: 0,
          border: `2px solid ${tip.color}40`
        }}>
          {tip.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            marginBottom: '0.5rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            💡 Daily Tip
          </h3>
          <p style={{ 
            fontSize: '0.95rem', 
            lineHeight: '1.5',
            color: 'var(--text-main)',
            fontWeight: 500
          }}>
            {tip.text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyTip;

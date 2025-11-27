import React, { useState, useEffect } from 'react';
import { Target, Flag, MapPin, TrendingDown, Trophy } from 'lucide-react';

const WeightTrendChart = ({ startWeight, currentWeight, targetWeight }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  // Ensure we have numbers
  const start = parseFloat(startWeight);
  const current = parseFloat(currentWeight);
  const target = parseFloat(targetWeight);

  if (!start || !current || !target) return null;

  // Calculate percentage progress
  const totalToLose = start - target;
  const lostSoFar = start - current;
  const percentage = Math.min(100, Math.max(0, (lostSoFar / totalToLose) * 100));

  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Calculate milestones (25%, 50%, 75%)
  const milestones = [
    { percent: 25, label: '25%', weight: start - (totalToLose * 0.25) },
    { percent: 50, label: '50%', weight: start - (totalToLose * 0.50) },
    { percent: 75, label: '75%', weight: start - (totalToLose * 0.75) }
  ];

  return (
    <div style={{ width: '100%', padding: '1.5rem 0' }}>
      {/* Header with Stats */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '2.5rem',
        padding: '0 0.5rem'
      }}>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(156, 163, 175, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(156, 163, 175, 0.3)'
          }}>
            <Flag size={18} color="#9ca3af" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '40px', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Start</p>
          <p style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--text-main)' }}>{start.toFixed(1)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>kg</p>
        </div>

        <div style={{ textAlign: 'center', position: 'relative', transform: 'scale(1.15)' }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4), 0 0 0 4px rgba(59, 130, 246, 0.1)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <MapPin size={22} color="white" fill="white" />
          </div>
          <p style={{ color: 'var(--primary)', fontSize: '0.75rem', marginTop: '48px', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current</p>
          <p style={{ fontWeight: 800, fontSize: '2rem', color: 'var(--primary)', lineHeight: 1 }}>{current.toFixed(2)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>kg</p>
        </div>

        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
          }}>
            <Trophy size={18} color="white" fill="white" />
          </div>
          <p style={{ color: 'var(--accent)', fontSize: '0.75rem', marginTop: '40px', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Goal</p>
          <p style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--accent)' }}>{target.toFixed(1)}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>kg</p>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div style={{ position: 'relative', marginBottom: '3rem' }}>
        {/* Background track with gradient */}
        <div style={{ 
          height: '16px', 
          background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', 
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Animated Progress Fill with Gradient */}
          <div style={{ 
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${animatedProgress}%`,
            background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
            borderRadius: '10px',
            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Shine effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: animatedProgress > 0 ? 'shine 2s ease-in-out infinite' : 'none'
            }} />
          </div>

          {/* Milestone Markers */}
          {milestones.map((milestone) => {
            const isPassed = percentage >= milestone.percent;
            return (
              <div
                key={milestone.percent}
                onMouseEnter={() => setHoveredMilestone(milestone.percent)}
                onMouseLeave={() => setHoveredMilestone(null)}
                style={{
                  position: 'absolute',
                  left: `${milestone.percent}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: isPassed ? '#10b981' : 'rgba(255,255,255,0.3)',
                  border: `2px solid ${isPassed ? '#059669' : 'rgba(255,255,255,0.5)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 3,
                  boxShadow: isPassed ? '0 0 10px rgba(16, 185, 129, 0.6)' : 'none'
                }}
              >
                {/* Tooltip on hover */}
                {hoveredMilestone === milestone.percent && (
                  <div style={{
                    position: 'absolute',
                    bottom: '25px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.9)',
                    color: 'white',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 10
                  }}>
                    {milestone.weight.toFixed(1)} kg
                    <div style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderTop: '4px solid rgba(0, 0, 0, 0.9)'
                    }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Current Position Indicator */}
        <div style={{
          position: 'absolute',
          left: `${animatedProgress}%`,
          top: '-50px',
          transform: 'translateX(-50%)',
          transition: 'left 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 5
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4), 0 0 0 3px rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <TrendingDown size={16} />
            {lostSoFar.toFixed(1)} kg lost
          </div>
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #2563eb',
            margin: '0 auto'
          }} />
        </div>
      </div>

      {/* Progress Summary */}
      <div style={{
        textAlign: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
        borderRadius: '16px',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{
            fontSize: '3rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1
          }}>
            {Math.round(animatedProgress)}%
          </span>
        </div>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          You're <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{Math.round(animatedProgress)}%</span> of the way there! 
          <br/>
          <span style={{ fontSize: '0.9rem' }}>Only <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{(current - target).toFixed(1)} kg</span> to go! 💪</span>
        </p>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4), 0 0 0 4px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 8px 30px rgba(59, 130, 246, 0.6), 0 0 0 6px rgba(59, 130, 246, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

export default WeightTrendChart;

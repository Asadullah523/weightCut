import React, { useState, useEffect } from 'react';
import { Target, TrendingDown, Trophy } from 'lucide-react';

const TotalProgressCard = ({ startWeight, currentWeight, targetWeight }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedLost, setAnimatedLost] = useState(0);
  const [animatedRemaining, setAnimatedRemaining] = useState(0);

  const totalToLose = startWeight - targetWeight;
  const totalLost = startWeight - currentWeight;
  const percentage = Math.min(100, Math.max(0, (totalLost / totalToLose) * 100));
  const remaining = currentWeight - targetWeight;

  // Animate values on mount and when they change
  useEffect(() => {
    const animationDuration = 1000; // 1 second
    const steps = 60;
    const stepDuration = animationDuration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedPercentage(percentage * progress);
      setAnimatedLost(totalLost * progress);
      setAnimatedRemaining(remaining * progress);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedPercentage(percentage);
        setAnimatedLost(totalLost);
        setAnimatedRemaining(remaining);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [percentage, totalLost, remaining]);

  return (
    <div className="card glass-effect card-hover" style={{ gridColumn: 'span 2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Total Progress</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Journey to {targetWeight} kg</p>
        </div>
        <div style={{ 
          background: 'var(--bg-main)', 
          padding: '0.5rem', 
          borderRadius: '50%',
          color: 'var(--primary)'
        }}>
          <Trophy size={24} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Circular Progress with CSS animation */}
        <div style={{ 
          position: 'relative', 
          width: '120px', 
          height: '120px',
          borderRadius: '50%',
          background: `conic-gradient(var(--primary) ${animatedPercentage}%, var(--border) 0)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: 'var(--primary)',
              transition: 'all 0.3s ease'
            }}>
              {animatedPercentage.toFixed(0)}%
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed</span>
          </div>
        </div>

        {/* Stats with transitions */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <TrendingDown size={16} color="var(--secondary)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Lost</span>
            </div>
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              {animatedLost.toFixed(1)} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>kg</span>
            </p>
          </div>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Target size={16} color="var(--accent)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Remaining</span>
            </div>
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              {animatedRemaining.toFixed(1)} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>kg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalProgressCard;

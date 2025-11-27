import React, { useState, useEffect } from 'react';
import { Droplet, Plus, Minus, RotateCcw } from 'lucide-react';

const HydrationTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const [lastAction, setLastAction] = useState(null);
  const [animating, setAnimating] = useState(false);
  const GOAL = 8;

  useEffect(() => {
    // Load from local storage for today
    const today = new Date().toDateString();
    const savedData = JSON.parse(localStorage.getItem('hydration_log') || '{}');
    
    if (savedData.date === today) {
      setGlasses(savedData.count || 0);
    } else {
      // Reset for new day
      setGlasses(0);
    }
  }, []);

  const updateGlasses = (newCount) => {
    const count = Math.max(0, Math.min(newCount, 12));
    
    // Save previous state for undo
    setLastAction({ previous: glasses, new: count });
    setGlasses(count);
    
    // Trigger animation
    if (count > glasses) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }
    
    // Save
    const today = new Date().toDateString();
    localStorage.setItem('hydration_log', JSON.stringify({ date: today, count }));
  };

  const undo = () => {
    if (lastAction) {
      setGlasses(lastAction.previous);
      const today = new Date().toDateString();
      localStorage.setItem('hydration_log', JSON.stringify({ date: today, count: lastAction.previous }));
      setLastAction(null);
    }
  };

  const isGoalReached = glasses >= GOAL;

  return (
    <div className="card glass-effect" style={{ borderLeft: '4px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
      {/* Celebration confetti when goal reached */}
      {isGoalReached && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <div style={{ padding: '0.4rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%' }}>
            <Droplet size={18} color="#3b82f6" fill="#3b82f6" /> 
          </div>
          Hydration
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: isGoalReached ? '#10b981' : 'var(--text-muted)' }}>
            {glasses}/{GOAL}
          </span>
          {lastAction && (
            <button
              onClick={undo}
              style={{
                padding: '0.3rem',
                background: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
              className="btn"
              title="Undo last action"
            >
              <RotateCcw size={14} color="var(--accent)" />
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
        <button 
          onClick={() => updateGlasses(glasses - 1)}
          disabled={glasses === 0}
          className="btn"
          style={{ 
            padding: '0', 
            borderRadius: '50%', 
            width: '36px', 
            height: '36px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: glasses === 0 ? 'rgba(255,255,255,0.05)' : 'var(--bg-main)',
            border: '1px solid var(--border)',
            cursor: glasses === 0 ? 'not-allowed' : 'pointer',
            opacity: glasses === 0 ? 0.4 : 1
          }}
        >
          <Minus size={16} color="var(--text-main)" />
        </button>

        <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          {[...Array(GOAL)].map((_, i) => (
            <div 
              key={i}
              style={{
                width: '10px',
                height: '24px',
                borderRadius: '10px',
                background: i < glasses ? 'linear-gradient(to top, #3b82f6, #60a5fa)' : 'var(--bg-main)',
                border: i < glasses ? 'none' : '1px solid var(--border)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: i < glasses ? 'scaleY(1.1)' : 'scaleY(1)',
                boxShadow: i < glasses ? '0 0 8px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            />
          ))}
          
          {/* Animated water drop */}
          {animating && (
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'dropFall 0.6s ease-out'
            }}>
              <Droplet size={20} color="#3b82f6" fill="#3b82f6" />
            </div>
          )}
        </div>

        <button 
          onClick={() => updateGlasses(glasses + 1)}
          className="btn btn-primary"
          style={{ 
            padding: '0', 
            borderRadius: '50%', 
            width: '36px', 
            height: '36px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
          }}
        >
          <Plus size={16} />
        </button>
      </div>
      
      {isGoalReached && (
        <div className="animate-fade-in" style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
          🎉 Goal reached! Stay hydrated! 💧
        </div>
      )}

      <style>{`
        @keyframes dropFall {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(30px);
          }
        }
      `}</style>
    </div>
  );
};

export default HydrationTracker;

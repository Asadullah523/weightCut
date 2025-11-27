import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Medal, Star, Flame, Target, Dumbbell, Crown, Zap, Award, Lock } from 'lucide-react';

const Achievements = () => {
  const { user, goals, weightLogs, workoutLogs } = useApp();
  const [hoveredId, setHoveredId] = useState(null);

  if (!user || !goals) return null;

  // --- Calculation Logic ---
  const startWeight = user.startWeight || goals.startWeight;
  const currentWeight = user.currentWeight;
  const lost = startWeight - currentWeight;
  const totalToLose = startWeight - goals.targetWeight;
  const progressPercent = (lost / totalToLose) * 100;

  // Calculate Streak & Total Workouts
  const workoutDates = Object.keys(workoutLogs).sort();
  const totalWorkouts = workoutDates.filter(d => {
    const log = workoutLogs[d];
    return log.completed && Object.values(log.completed).some(Boolean);
  }).length;

  // Simple streak calculation
  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  
  let checkDate = new Date();
  if (!workoutLogs[today]?.completed) {
     checkDate.setDate(checkDate.getDate() - 1);
  }
  
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    const log = workoutLogs[dateStr];
    if (log && log.completed && Object.values(log.completed).some(Boolean)) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  const ACHIEVEMENTS = [
    {
      id: 'first_step',
      title: 'First Step',
      description: 'Complete your first workout',
      icon: <Dumbbell size={32} />,
      isUnlocked: totalWorkouts >= 1,
      progress: Math.min(100, (totalWorkouts / 1) * 100),
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    },
    {
      id: 'on_fire',
      title: 'On Fire',
      description: 'Reach a 3-day workout streak',
      icon: <Flame size={32} />,
      isUnlocked: currentStreak >= 3,
      progress: Math.min(100, (currentStreak / 3) * 100),
      color: '#f97316',
      gradient: 'linear-gradient(135deg, #f97316, #dc2626)'
    },
    {
      id: 'unstoppable',
      title: 'Unstoppable',
      description: 'Reach a 7-day workout streak',
      icon: <Zap size={32} />,
      isUnlocked: currentStreak >= 7,
      progress: Math.min(100, (currentStreak / 7) * 100),
      color: '#facc15',
      gradient: 'linear-gradient(135deg, #facc15, #f97316)'
    },
    {
      id: 'pound_shedder',
      title: 'Pound Shedder',
      description: 'Lose your first 1kg',
      icon: <Medal size={32} />,
      isUnlocked: lost >= 1,
      progress: Math.min(100, (lost / 1) * 100),
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      id: 'high_five',
      title: 'High Five',
      description: 'Lose 5kg total',
      icon: <Star size={32} />,
      isUnlocked: lost >= 5,
      progress: Math.min(100, (lost / 5) * 100),
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)'
    },
    {
      id: 'halfway',
      title: 'Halfway There',
      description: 'Reach 50% of your weight goal',
      icon: <Target size={32} />,
      isUnlocked: progressPercent >= 50,
      progress: Math.min(100, (progressPercent / 50) * 100),
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
    },
    {
      id: 'consistency_king',
      title: 'Consistency King',
      description: 'Complete 10 total workouts',
      icon: <Crown size={32} />,
      isUnlocked: totalWorkouts >= 10,
      progress: Math.min(100, (totalWorkouts / 10) * 100),
      color: '#fbbf24',
      gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)'
    },
    {
      id: 'champion',
      title: 'The Champion',
      description: 'Reach your target weight',
      icon: <Trophy size={32} />,
      isUnlocked: currentWeight <= goals.targetWeight,
      progress: Math.min(100, progressPercent),
      color: '#14b8a6',
      gradient: 'linear-gradient(135deg, #14b8a6, #0891b2)'
    }
  ];

  const unlockedCount = ACHIEVEMENTS.filter(a => a.isUnlocked).length;
  const completionRate = Math.round((unlockedCount / ACHIEVEMENTS.length) * 100);

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '120px' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600 }}>
          Your Journey
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
          Trophy <span className="gradient-text">Cabinet</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.05rem', marginBottom: '2rem' }}>
          Track your progress and unlock badges as you crush your fitness goals.
        </p>

        {/* Progress Overview */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div className="card" style={{ 
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <Award size={22} color="var(--primary)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Unlocked</span>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, color: 'var(--primary)' }}>
              {unlockedCount}<span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>/{ACHIEVEMENTS.length}</span>
            </p>
          </div>

          <div className="card" style={{ 
            padding: '1.5rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <Trophy size={22} color="#10b981" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Completion</span>
            </div>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, color: '#10b981' }}>
              {completionRate}<span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {ACHIEVEMENTS.map((achievement) => (
          <div 
            key={achievement.id}
            className="card-hover"
            onMouseEnter={() => setHoveredId(achievement.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ 
              padding: '2rem', 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '1.25rem',
              background: achievement.isUnlocked 
                ? `linear-gradient(135deg, ${achievement.color}15 0%, ${achievement.color}08 100%)`
                : 'var(--bg-card)',
              border: achievement.isUnlocked 
                ? `2px solid ${achievement.color}40` 
                : '2px solid rgba(255,255,255,0.08)',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hoveredId === achievement.id && achievement.isUnlocked ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
              opacity: achievement.isUnlocked ? 1 : 0.6,
              filter: achievement.isUnlocked ? 'none' : 'grayscale(70%)',
              boxShadow: achievement.isUnlocked && hoveredId === achievement.id
                ? `0 20px 40px ${achievement.color}30`
                : achievement.isUnlocked 
                  ? `0 8px 20px ${achievement.color}20`
                  : '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            {/* Animated Background Glow */}
            {achievement.isUnlocked && (
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: achievement.gradient,
                opacity: hoveredId === achievement.id ? 0.15 : 0.05,
                transform: 'rotate(45deg)',
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none'
              }} />
            )}

            {/* Icon Circle with Progress Ring */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Progress Ring */}
              {!achievement.isUnlocked && (
                <svg width="120" height="120" style={{ position: 'absolute', top: '-10px', left: '-10px', transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={achievement.color}
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${2 * Math.PI * 54 * (1 - achievement.progress / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
              )}
              
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                background: achievement.isUnlocked 
                  ? achievement.gradient
                  : 'rgba(255, 255, 255, 0.05)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: achievement.isUnlocked ? 'white' : 'var(--text-muted)',
                boxShadow: achievement.isUnlocked 
                  ? `0 8px 25px ${achievement.color}40, 0 0 0 4px ${achievement.color}20`
                  : 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredId === achievement.id && achievement.isUnlocked ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                position: 'relative'
              }}>
                {achievement.isUnlocked ? (
                  achievement.icon
                ) : (
                  <Lock size={32} />
                )}
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{achievement.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{achievement.description}</p>
            </div>

            {/* Progress Percentage (if not unlocked) */}
            {!achievement.isUnlocked && (
              <div style={{ 
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: achievement.color,
                background: `${achievement.color}20`,
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                zIndex: 1
              }}>
                {Math.round(achievement.progress)}%
              </div>
            )}

            {/* Unlocked Badge */}
            {achievement.isUnlocked && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: achievement.gradient,
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.4rem 0.8rem',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: `0 4px 12px ${achievement.color}40`,
                zIndex: 1
              }}>
                ✓ Unlocked
              </div>
            )}

            {/* Sparkle Animation for Unlocked */}
            {achievement.isUnlocked && hoveredId === achievement.id && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)',
                animation: 'pulse 2s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 0
              }} />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Achievements;

import React from 'react';
import { Flame } from 'lucide-react';

const StreakCard = ({ workoutLogs }) => {
  // Calculate Streak
  const calculateStreak = () => {
    const today = new Date();
    let currentStreak = 0;
    let checkDate = new Date(today);
    
    // Check if today has a workout
    const todayStr = checkDate.toISOString().split('T')[0];
    if (workoutLogs[todayStr] && workoutLogs[todayStr].completed) {
      const completedCount = Object.values(workoutLogs[todayStr].completed).filter(Boolean).length;
      if (completedCount > 0) {
        currentStreak++;
      }
    }

    // Check previous days
    while (true) {
      checkDate.setDate(checkDate.getDate() - 1);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (workoutLogs[dateStr] && workoutLogs[dateStr].completed) {
        const completedCount = Object.values(workoutLogs[dateStr].completed).filter(Boolean).length;
        if (completedCount > 0) {
          currentStreak++;
        } else {
          break;
        }
      } else {
        break;
      }
    }
    return currentStreak;
  };

  const streak = calculateStreak();

  return (
    <div className="card glass-effect card-hover" style={{ 
      background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
      color: 'white',
      border: 'none',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>Current Streak</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{streak} Days</h3>
          </div>
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '0.5rem', 
            borderRadius: '50%',
            backdropFilter: 'blur(5px)'
          }}>
            <Flame size={24} color="white" fill="white" />
          </div>
        </div>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.9 }}>
          {streak > 0 ? "You're on fire! Keep it up! 🔥" : "Start your streak today!"}
        </p>
      </div>
      
      {/* Decorative background circle */}
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        zIndex: 0
      }} />
    </div>
  );
};

export default StreakCard;

import React from 'react';
import { Check } from 'lucide-react';

const WorkoutConsistencyChart = ({ workoutLogs }) => {
  // Get current week (Mon-Sun)
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sun, 1 = Mon
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(today.setDate(diff));
  
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const log = workoutLogs[dateStr];
    const isCompleted = log && log.completed && Object.values(log.completed).some(Boolean);
    
    weekDays.push({
      date: d,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0),
      isCompleted,
      isToday: dateStr === new Date().toISOString().split('T')[0],
      isFuture: d > new Date()
    });
  }

  const activeDays = weekDays.filter(d => d.isCompleted).length;

  return (
    <div className="card glass-effect" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Weekly Activity</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeDays}/7 Days Active</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {weekDays.map((day, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            {/* Ring */}
            <div style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              border: day.isCompleted 
                ? 'none' 
                : day.isToday 
                  ? '2px solid var(--primary)' 
                  : '2px solid var(--border)',
              background: day.isCompleted ? 'var(--gradient-primary)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              opacity: day.isFuture ? 0.3 : 1,
              boxShadow: day.isCompleted ? '0 4px 10px rgba(59, 130, 246, 0.4)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              {day.isCompleted && <Check size={20} strokeWidth={3} />}
            </div>
            
            {/* Day Label */}
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: day.isToday ? 700 : 500, 
              color: day.isToday ? 'var(--primary)' : 'var(--text-muted)' 
            }}>
              {day.dayName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutConsistencyChart;

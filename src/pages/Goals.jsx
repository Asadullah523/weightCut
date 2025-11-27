import React from 'react';
import { useApp } from '../context/AppContext';
import { getDailyQuote } from '../data/quotes';
import { Download, Moon, Sun, Trash2, LogOut, User, Calendar, Target, Weight, Settings } from 'lucide-react';

const Goals = () => {
  const { user, goals, weightLogs, workoutLogs, nutritionLogs, settings, toggleTheme } = useApp();

  if (!user || !goals) return null;

  const quote = getDailyQuote();

  const handleExport = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Create comprehensive CSV with multiple sheets worth of data
    let csvContent = '';
    
    // Section 1: Weight Progress
    csvContent += 'WEIGHT PROGRESS\n';
    csvContent += 'Date,Weight (kg),Change from Previous\n';
    weightLogs.forEach((log, index) => {
      const change = index > 0 ? (log.weight - weightLogs[index - 1].weight).toFixed(1) : '-';
      csvContent += `${log.date},${log.weight},${change}\n`;
    });
    csvContent += '\n';
    
    // Section 2: Workout Summary
    csvContent += 'WORKOUT SUMMARY\n';
    csvContent += 'Date,Day,Total Exercises,Completed,Completion Rate\n';
    Object.keys(workoutLogs || {}).sort().forEach(date => {
      const log = workoutLogs[date];
      const exerciseIds = Object.keys(log.completed || {});
      const completedCount = exerciseIds.filter(id => log.completed[id]).length;
      const totalCount = exerciseIds.length;
      const rate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      csvContent += `${date},${dayName},${totalCount},${completedCount},${rate}%\n`;
    });
    csvContent += '\n';
    
    // Section 3: Nutrition Logs
    csvContent += 'NUTRITION TRACKING\n';
    csvContent += 'Date,Calories,Protein (g)\n';
    Object.keys(nutritionLogs || {}).sort().forEach(date => {
      const log = nutritionLogs[date];
      csvContent += `${date},${log.calories || 0},${log.protein || 0}\n`;
    });
    csvContent += '\n';
    
    // Section 4: User Profile & Goals
    csvContent += 'PROFILE & GOALS\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Name,${user.name}\n`;
    csvContent += `Start Date,${goals.startDate}\n`;
    csvContent += `Start Weight,${user.startWeight} kg\n`;
    csvContent += `Current Weight,${user.currentWeight} kg\n`;
    csvContent += `Target Weight,${goals.targetWeight} kg\n`;
    csvContent += `Total Weight Lost,${(user.startWeight - user.currentWeight).toFixed(1)} kg\n`;
    csvContent += `Remaining to Goal,${(user.currentWeight - goals.targetWeight).toFixed(1)} kg\n`;
    csvContent += `Export Date,${currentDate}\n`;
    
    // Create download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `weight_cut_progress_${currentDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="container grid-gap animate-fade-in" style={{ gap: '2rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Settings & Goals</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your profile and preferences</p>
      </div>

      {/* Daily Motivation */}
      <div className="card card-hover" style={{ 
        background: 'var(--gradient-secondary)', 
        color: 'white',
        textAlign: 'center',
        padding: '3rem 2rem',
        border: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{ marginBottom: '1rem', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: '300' }}>"{quote}"</h3>
          <p style={{ opacity: 0.9, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Daily Motivation</p>
        </div>
        
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Profile Summary */}
        <div className="card glass-effect">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} color="var(--primary)" /> Profile
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius)' }}>
              <div style={{ background: 'var(--gradient-primary)', padding: '1rem', borderRadius: '50%', color: 'white' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{user.name.charAt(0)}</span>
              </div>
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{user.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Member since {new Date(goals.startDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <ProfileStat label="Start Weight" value={`${user.startWeight} kg`} icon={<Weight size={16} />} />
              <ProfileStat label="Target Weight" value={`${goals.targetWeight} kg`} icon={<Target size={16} />} />
            </div>
          </div>
        </div>

        {/* App Settings */}
        <div className="card glass-effect">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={20} color="var(--primary)" /> App Settings
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Units */}
            <SettingItem 
              title="Weight Units" 
              description="Choose your preferred weight measurement"
              action={
                <select 
                  className="input" 
                  style={{ 
                    padding: '0.5rem', 
                    borderRadius: 'var(--radius)', 
                    border: '1px solid var(--border)',
                    background: 'var(--bg-main)',
                    color: 'var(--text-main)',
                    minWidth: '100px'
                  }}
                  defaultValue="kg"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lbs">Pounds (lbs)</option>
                </select>
              }
            />

            {/* Notifications */}
            <SettingItem 
              title="Daily Reminders" 
              description="Get notified to log your workouts"
              action={
                <button 
                  className="btn" 
                  style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem'
                  }}
                >
                  Coming Soon
                </button>
              }
            />

            {/* Data Management */}
            <SettingItem 
              title="Workout History" 
              description="Keep or clear your workout logs"
              action={
                <button 
                  className="btn" 
                  style={{ 
                    border: '1px solid var(--border)', 
                    padding: '0.5rem 1rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-main)'
                  }}
                >
                  View History
                </button>
              }
            />
          </div>
        </div>

        {/* User Preferences */}
        <div className="card glass-effect">
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={20} color="var(--primary)" /> Preferences
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Theme Toggle */}
            <SettingItem 
              title="Appearance" 
              description="Toggle dark/light mode"
              action={
                <button onClick={toggleTheme} className="btn" style={{ border: '1px solid var(--border)', padding: '0.5rem', color: 'var(--text-main)' }}>
                  {settings.theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              }
            />

            {/* Export Data */}
            <SettingItem 
              title="Export Progress Data" 
              description="Download complete progress, workouts, and nutrition data as CSV"
              action={
                <button onClick={handleExport} className="btn" style={{ border: '1px solid var(--border)', padding: '0.5rem 1rem', color: 'var(--text-main)' }}>
                  <Download size={18} style={{ marginRight: '0.5rem' }} /> CSV
                </button>
              }
            />

            {/* Danger Zone */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <h4 style={{ color: '#ef4444', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Danger Zone</h4>
              <button 
                onClick={handleReset} 
                className="btn" 
                style={{ 
                  width: '100%', 
                  border: '1px solid #ef4444', 
                  color: '#ef4444',
                  justifyContent: 'center',
                  background: 'rgba(239, 68, 68, 0.05)'
                }}
              >
                <Trash2 size={20} style={{ marginRight: '0.5rem' }} /> Reset All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const ProfileStat = ({ label, value, icon }) => (
  <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
      {icon} {label}
    </div>
    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>{value}</p>
  </div>
);

const SettingItem = ({ title, description, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-main)', borderRadius: 'var(--radius)' }}>
    <div>
      <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{title}</h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{description}</p>
    </div>
    {action}
  </div>
);

export default Goals;

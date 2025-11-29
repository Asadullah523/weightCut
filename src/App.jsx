import React, { useState } from 'react'
import { useApp } from './context/AppContext'
import { LayoutDashboard, Target, Dumbbell, Utensils, Settings, Trophy } from 'lucide-react'

// Pages
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import Workouts from './pages/Workouts'
import Nutrition from './pages/Nutrition'
import Achievements from './pages/Achievements'
import ExerciseLibrary from './pages/ExerciseLibrary'

function App() {
  const { user, loading } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  // Show onboarding if no user
  if (!user) {
    // Ensure we reset to dashboard when user is logged out
    if (activeTab !== 'dashboard') setActiveTab('dashboard');
    return <Onboarding />;
  }

  // Render active page based on tab
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'workouts':
        return <Workouts />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'nutrition':
        return <Nutrition />;
      case 'achievements':
        return <Achievements />;
      case 'goals':
        return <Goals />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <nav className="glass-effect" style={{ 
        height: 'var(--nav-height)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="flex-center" style={{ gap: '0.75rem' }}>
          <div style={{ 
            background: 'var(--gradient-primary)', 
            padding: '0.4rem', 
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Dumbbell size={20} color="white" />
          </div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            Fit<span style={{ color: 'var(--primary)' }}>Track</span>
          </h1>
        </div>
        
        <div className="flex-center" style={{ gap: '1.5rem' }}>
          <NavLink tab="dashboard" icon={<LayoutDashboard size={20} />} label="Dash" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavLink tab="workouts" icon={<Dumbbell size={20} />} label="Train" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavLink tab="exercises" icon={<Target size={20} />} label="Gallery" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavLink tab="nutrition" icon={<Utensils size={20} />} label="Diet" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavLink tab="achievements" icon={<Trophy size={20} />} label="Awards" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavLink tab="goals" icon={<Settings size={20} />} label="Settings" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </nav>
      
      <main style={{ padding: '2rem 0', minHeight: 'calc(100vh - var(--nav-height))' }}>
        {renderActivePage()}
      </main>
    </div>
  )
}

const NavLink = ({ tab, icon, label, activeTab, setActiveTab }) => {
  const isActive = activeTab === tab;
  
  return (
    <button 
      onClick={() => setActiveTab(tab)}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '4px',
        fontSize: '0.75rem',
        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: isActive ? 600 : 500,
        position: 'relative',
        transition: 'all 0.2s ease',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <div style={{
        padding: '0.5rem',
        borderRadius: '0.75rem',
        background: isActive ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
        transition: 'all 0.2s ease'
      }}>
        {icon}
      </div>
      <span className="mobile-hide">{label}</span>
      
      {/* Active Indicator Dot */}
      {isActive && (
        <div style={{
          position: 'absolute',
          bottom: '-12px',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'var(--primary)'
        }} />
      )}
    </button>
  );
};

export default App

import React from 'react'
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
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
  const location = useLocation();

  if (loading) {
    return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;
  }

  // Redirect to onboarding if no user
  if (!user && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // Redirect to dashboard if user exists and trying to access onboarding
  if (user && location.pathname === '/onboarding') {
    return <Navigate to="/" replace />;
  }

  // Standalone layout for onboarding
  if (location.pathname === '/onboarding') {
    return <Routes><Route path="/onboarding" element={<Onboarding />} /></Routes>;
  }

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
            Weight<span style={{ color: 'var(--primary)' }}>Cut</span>
          </h1>
        </div>
        
        <div className="flex-center" style={{ gap: '1.5rem' }}>
          <NavLink to="/" icon={<LayoutDashboard size={20} />} label="Dash" />
          <NavLink to="/workouts" icon={<Dumbbell size={20} />} label="Train" />
          <NavLink to="/exercises" icon={<Target size={20} />} label="Gallery" />
          <NavLink to="/nutrition" icon={<Utensils size={20} />} label="Diet" />
          <NavLink to="/achievements" icon={<Trophy size={20} />} label="Awards" />
          <NavLink to="/goals" icon={<Settings size={20} />} label="Settings" />
        </div>
      </nav>
      
      <main style={{ padding: '2rem 0', minHeight: 'calc(100vh - var(--nav-height))' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

const NavLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link to={to} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '4px',
      fontSize: '0.75rem',
      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
      fontWeight: isActive ? 600 : 500,
      position: 'relative',
      transition: 'all 0.2s ease'
    }}>
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
    </Link>
  );
};

export default App

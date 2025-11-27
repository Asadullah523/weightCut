import React from 'react';
import { useApp } from '../context/AppContext';
import StatsCard from '../components/StatsCard';
import WeightTrendChart from '../components/WeightTrendChart';
import MotivationCard from '../components/MotivationCard';
import HydrationTracker from '../components/HydrationTracker';
import WorkoutConsistencyChart from '../components/WorkoutConsistencyChart';
import StreakCard from '../components/StreakCard';
import TotalProgressCard from '../components/TotalProgressCard';
import DailyTip from '../components/DailyTip';
import { Scale, Clock, Activity, Flame, TrendingDown } from 'lucide-react';
import { getExercisesForDay, WORKOUT_SCHEDULE } from '../data/exercises';

const Dashboard = () => {
  const { user, goals, weightLogs, workoutLogs } = useApp();

  if (!user || !goals) return null;

  // --- Calculations ---
  const currentWeight = user.currentWeight || user.startWeight;
  const startWeight = user.startWeight || goals.startWeight;
  const targetWeight = goals.targetWeight;
  
  // Calculate accurate calories burned from workouts
  let totalCaloriesBurned = 0;
  let totalWorkoutsCompleted = 0;
  let totalExercisesCompleted = 0;

  Object.keys(workoutLogs || {}).forEach(date => {
    const log = workoutLogs[date];
    if (!log.completed) return;

    // Determine which day this was
    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const scheduleDay = WORKOUT_SCHEDULE.find(d => d.day === dayOfWeek);
    
    if (scheduleDay && scheduleDay.exercises && scheduleDay.exercises.length > 0) {
      const exercises = getExercisesForDay(scheduleDay.id);
      const weightInKg = user.currentWeight || 70;
      let workoutHasCompletedExercise = false;

      exercises.forEach(exercise => {
        if (log.completed[exercise.id]) {
          totalExercisesCompleted++;
          workoutHasCompletedExercise = true;
          
          // Calculate calories based on exercise type
          if (exercise.name === 'Cardio') {
            totalCaloriesBurned += 600;
          } else {
            totalCaloriesBurned += Math.round(weightInKg * 0.3);
          }
        }
      });

      if (workoutHasCompletedExercise) {
        totalWorkoutsCompleted++;
      }
    }
  });

  // Calculate estimated weight based on calories burned
  // 7700 calories ≈ 1 kg of fat
  const estimatedKgLost = totalCaloriesBurned / 7700;
  const estimatedWeight = Math.max(targetWeight, startWeight - estimatedKgLost);
  
  // Use estimated weight for visuals (shows progress as workouts are completed)
  // This makes the progress bars move dynamically!
  const displayWeight = estimatedWeight;

  // Weight progress calculations
  const weightLost = startWeight - displayWeight;
  const weightToLose = displayWeight - targetWeight;
  const progressPercentage = ((startWeight - displayWeight) / (startWeight - targetWeight)) * 100;
  
  // Time Progress
  const startDate = new Date(goals.startDate);
  const targetDate = new Date(goals.targetDate);
  const today = new Date();
  
  const totalDays = Math.ceil((targetDate - startDate) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.max(0, Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)));
  const timeProgressPercentage = (daysPassed / totalDays) * 100;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '120px' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600 }}>
          {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem' }}>
          Welcome back, <span className="gradient-text">{user.name.split(' ')[0]}</span> 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.05rem' }}>
          Here's your progress overview. Keep pushing towards your goals!
        </p>
      </div>

      {/* Top Row: Daily Tip */}
      <div style={{ marginBottom: '2rem' }}>
        <DailyTip />
      </div>

      {/* Second Row: Streak & Motivation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StreakCard workoutLogs={workoutLogs} />
        <MotivationCard />
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="card" style={{ 
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Scale size={22} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Estimated Weight</span>
          </div>
          <p style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.25rem' }}>
            {displayWeight.toFixed(1)}<span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>kg</span>
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>From {totalCaloriesBurned.toLocaleString()} cal burned</p>
        </div>

        <div className="card" style={{ 
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <TrendingDown size={22} color="#10b981" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Weight Lost</span>
          </div>
          <p style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.25rem', color: '#10b981' }}>
            {weightLost.toFixed(1)}<span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>kg</span>
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{weightToLose.toFixed(1)} kg to goal</p>
        </div>

        <div className="card" style={{ 
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.05) 100%)',
          border: '1px solid rgba(249, 115, 22, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Flame size={22} color="var(--accent)" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Calories Burned</span>
          </div>
          <p style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.25rem', color: 'var(--accent)' }}>
            {totalCaloriesBurned.toLocaleString()}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{totalExercisesCompleted} exercises</p>
        </div>

        <div className="card" style={{ 
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
          border: '1px solid rgba(168, 85, 247, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Clock size={22} color="#a855f7" />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Days Remaining</span>
          </div>
          <p style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.25rem', color: '#a855f7' }}>
            {daysRemaining}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{daysPassed} of {totalDays} days</p>
        </div>
      </div>

      {/* Total Progress Card */}
      <div style={{ marginBottom: '2rem' }}>
        <TotalProgressCard 
          startWeight={startWeight} 
          currentWeight={displayWeight} 
          targetWeight={targetWeight} 
        />
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div className="card glass-effect" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>Weight Journey</h3>
          <WeightTrendChart 
            weightLogs={weightLogs} 
            startWeight={startWeight} 
            currentWeight={displayWeight}
            targetWeight={targetWeight} 
            startDate={goals.startDate}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <HydrationTracker />
          <WorkoutConsistencyChart workoutLogs={workoutLogs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

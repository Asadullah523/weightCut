import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Dumbbell, Flame, Clock, Activity } from 'lucide-react';
import { WORKOUT_SCHEDULE, getScheduleForGoal, EXERCISES } from '../data/exercises';

const Workouts = () => {
  const { user, goals, workoutLogs, updateWorkoutLog } = useApp();
  const [selectedDay, setSelectedDay] = useState(null);
  const [celebratingExercise, setCelebratingExercise] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const activeSchedule = getScheduleForGoal(goals?.goalType);

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const scheduleDay = Array.isArray(activeSchedule) ? activeSchedule.find(d => d.day === today) : null;
    if (scheduleDay) {
      setSelectedDay(scheduleDay.id);
    } else {
      setSelectedDay('sun'); 
    }
  }, [activeSchedule]);

  if (!user || !selectedDay) return null;

  const todayDate = new Date().toISOString().split('T')[0];
  const currentLog = workoutLogs[todayDate] || { completed: {} };
  
  const scheduleItem = activeSchedule.find(d => d.id === selectedDay);
  const isRestDay = !scheduleItem || scheduleItem.exercises.length === 0;

  // Helper to find exercise object by name
  const getExerciseByName = (name) => {
    if (name === 'Cardio') return EXERCISES.Cardio[0];
    
    for (const category in EXERCISES) {
      const found = EXERCISES[category].find(ex => ex.name === name);
      if (found) return { ...found, category };
    }
    return null;
  };

  const exercises = scheduleItem ? scheduleItem.exercises.map(name => {
    const ex = getExerciseByName(name);
    return ex ? { ...ex, id: name.replace(/\s+/g, '-').toLowerCase() } : null;
  }).filter(Boolean) : [];

  const totalExercises = exercises.length;
  const completedCount = exercises.filter(ex => currentLog.completed && currentLog.completed[ex.id]).length;
  const progress = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
  
  const weightInKg = user.currentWeight || 70;
  let totalCaloriesBurned = 0;

  exercises.forEach(ex => {
    if (currentLog.completed && currentLog.completed[ex.id]) {
      if (ex.name === 'Cardio') {
        totalCaloriesBurned += 500;
      } else {
        totalCaloriesBurned += Math.round(weightInKg * 0.3);
      }
    }
  });

  const toggleExercise = (exerciseId) => {
    const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const scheduleDay = WORKOUT_SCHEDULE.find(d => d.id === selectedDay);
    
    if (scheduleDay && scheduleDay.day !== dayName) {
      return;
    }

    const isCompleted = currentLog.completed && currentLog.completed[exerciseId];
    const newCompleted = {
      ...currentLog.completed,
      [exerciseId]: !isCompleted
    };

    updateWorkoutLog(todayDate, {
      ...currentLog,
      completed: newCompleted
    });
    
    if (!isCompleted) {
      setCelebratingExercise(exerciseId);
      setTimeout(() => setCelebratingExercise(null), 800);
    }
  };

  const clearTodayWorkout = () =>{
    setShowResetModal(true);
  };

  const confirmReset = () => {
    updateWorkoutLog(todayDate, { completed: {} });
    setShowResetModal(false);
  };

  const getDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Group exercises by muscle
  const groupExercisesByMuscle = () => {
    const groups = [];
    const focus = scheduleItem.focus;
    
    // Helper to add group if exercises exist
    const addGroup = (name, category) => {
      const groupEx = exercises.filter(e => e.category === category);
      if (groupEx.length > 0) groups.push({ name, exercises: groupEx });
    };

    // Always add Warm Up first if Cardio exists
    const cardio = exercises.filter(e => e.name === 'Cardio');
    if (cardio.length > 0) groups.push({ name: 'Warm Up', exercises: cardio });

    if (focus === 'Chest + Triceps') {
      addGroup('Chest', 'Chest');
      addGroup('Triceps', 'Triceps');
    } else if (focus === 'Back + Biceps') {
      addGroup('Back', 'Back');
      addGroup('Biceps', 'Biceps');
    } else if (focus === 'Legs + Shoulders') {
      addGroup('Legs', 'Legs');
      addGroup('Shoulders', 'Shoulders');
    } else if (focus === 'Legs + Abs') {
      addGroup('Legs', 'Legs');
      addGroup('Abs', 'Abs');
    } 
    // Hypertrophy Schedule Logic
    else if (focus.includes('Push')) {
      addGroup('Chest', 'Chest');
      addGroup('Shoulders', 'Shoulders');
      addGroup('Triceps', 'Triceps');
    } else if (focus.includes('Pull')) {
      addGroup('Back', 'Back');
      addGroup('Biceps', 'Biceps');
      // Face Pulls are usually Shoulders/Back, let's check
      const facePulls = exercises.filter(e => e.name === 'Face Pulls');
      if (facePulls.length > 0 && !groups.some(g => g.name === 'Shoulders')) {
         // If we haven't added shoulders, maybe add them or just include in Back for simplicity?
         // Actually Face Pulls are often categorized as Shoulders in the data.
         addGroup('Rear Delts', 'Shoulders');
      }
    } else if (focus === 'Legs') {
      addGroup('Quads', 'Legs'); // Just group all legs together for now
      // Or split by Quads/Hams if data supports it, but category is just 'Legs'
      // So just add 'Legs'
      if (!groups.some(g => g.name === 'Legs')) addGroup('Legs', 'Legs');
      addGroup('Calves', 'Calves'); // If we have a Calves category? No, usually just Legs.
    } else if (focus === 'Upper Body') {
      addGroup('Chest', 'Chest');
      addGroup('Back', 'Back');
      addGroup('Shoulders', 'Shoulders');
      addGroup('Arms', 'Biceps'); // And Triceps?
      addGroup('Triceps', 'Triceps');
    } else if (focus === 'Lower Body') {
      addGroup('Legs', 'Legs');
      addGroup('Core', 'Abs');
    } else if (focus === 'Core + Abs') {
      // Split the 6 abs exercises into two groups of 3
      const absExercises = exercises.filter(e => e.category === 'Abs');
      if (absExercises.length > 0) {
        const midpoint = Math.ceil(absExercises.length / 2);
        groups.push({ name: 'Core', exercises: absExercises.slice(0, midpoint) });
        groups.push({ name: 'Abs', exercises: absExercises.slice(midpoint) });
      }
    } else {
      // Fallback: Group by category for anything else
      const categories = [...new Set(exercises.map(e => e.category))];
      categories.forEach(cat => {
        if (cat !== 'Cardio') addGroup(cat, cat);
      });
    }
    
    return groups;
  };

  const muscleGroups = isRestDay ? [] : groupExercisesByMuscle();

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '120px' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem' }}>
          {getDayGreeting()}, <span className="gradient-text">{user.name || 'Athlete'}</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.05rem' }}>
          {isRestDay ? "Recovery is where growth happens. Enjoy your rest." : "Let's make today count. Focus on form and push your limits."}
        </p>
      </div>

      {/* Stats Overview */}
      {!isRestDay && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
          gap: '1rem', 
          marginBottom: '2rem' 
        }}>
          <div className="card" style={{ 
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Dumbbell size={20} color="var(--primary)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Exercises</span>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{exercises.length}</p>
          </div>

          <div className="card" style={{ 
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.05) 100%)',
            border: '1px solid rgba(249, 115, 22, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Flame size={20} color="var(--accent)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Calories</span>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: 'var(--accent)' }}>{totalCaloriesBurned}</p>
          </div>

          <div className="card" style={{ 
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Activity size={20} color="#10b981" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Progress</span>
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1, color: '#10b981' }}>{Math.round(progress)}%</p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {!isRestDay && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{scheduleItem.focus}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {completedCount}/{totalExercises} Complete
              </span>
              {completedCount > 0 && (
                <button
                  onClick={clearTodayWorkout}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.35rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                  className="btn"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, var(--primary), var(--accent))', 
              borderRadius: '10px',
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }} />
          </div>
        </div>
      )}

      {/* Workout List - Grouped by Muscle */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Today's Routine
        </h3>

        {isRestDay ? (
          <div className="card glass-effect" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              background: 'rgba(16, 185, 129, 0.1)', 
              color: '#10b981',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <Clock size={48} />
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Active Recovery</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
              Your muscles need time to repair and grow. Take today to stretch, hydrate, and prepare for tomorrow's session.
            </p>
          </div>
        ) : (
          muscleGroups.map((group, groupIndex) => (
            <div key={groupIndex} style={{ marginBottom: '2rem' }}>
              {/* Muscle Group Header */}
              <div style={{ 
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '2px solid var(--primary)'
              }}>
                <h4 style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 700,
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {group.name}
                </h4>
              </div>

              {/* Exercises in this group */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {group.exercises.map((exercise) => {
                  const isCompleted = currentLog.completed && currentLog.completed[exercise.id];
                  const isCardio = exercise.name === 'Cardio';
                  const isCelebrating = celebratingExercise === exercise.id;
                  
                  return (
                    <div 
                      key={exercise.id} 
                      className="card-hover"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1.25rem', 
                        padding: '1.5rem',
                        background: isCompleted 
                            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%)' 
                            : isCardio 
                                ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(251, 146, 60, 0.08) 100%)' 
                                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                        border: isCompleted 
                            ? '2px solid rgba(16, 185, 129, 0.4)' 
                            : isCardio 
                                ? '2px solid rgba(249, 115, 22, 0.4)' 
                                : '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        transform: isCelebrating ? 'scale(0.98)' : 'scale(1)',
                        boxShadow: isCompleted 
                          ? '0 8px 25px rgba(16, 185, 129, 0.2), 0 0 0 1px rgba(16, 185, 129, 0.1)' 
                          : isCardio
                            ? '0 4px 15px rgba(249, 115, 22, 0.15)'
                            : '0 2px 10px rgba(0, 0, 0, 0.1)'
                      }}
                      onClick={() => toggleExercise(exercise.id)}
                      onMouseEnter={(e) => {
                        if (!isCompleted && !isCardio) {
                          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isCompleted && !isCardio) {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                    >
                      {isCelebrating && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                          animation: 'success-pulse 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                          pointerEvents: 'none',
                          zIndex: 1
                        }} />
                      )}

                      <div style={{ 
                        width: '50px', 
                        height: '50px', 
                        borderRadius: '16px', 
                        border: isCompleted ? 'none' : `3px solid ${isCardio ? 'var(--accent)' : 'rgba(255,255,255,0.25)'}`,
                        background: isCompleted 
                          ? 'linear-gradient(135deg, #10b981, #059669)' 
                          : isCardio 
                            ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(251, 146, 60, 0.1))'
                            : 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isCompleted ? 'white' : isCardio ? 'var(--accent)' : 'var(--text-muted)',
                        flexShrink: 0,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isCelebrating ? 'scale(1.2)' : 'scale(1)',
                        boxShadow: isCompleted ? '0 4px 15px rgba(16, 185, 129, 0.5)' : 'none'
                      }}>
                        {isCompleted ? (
                          <CheckCircle size={28} strokeWidth={2.5} />
                        ) : isCardio ? (
                          <Flame size={26} />
                        ) : (
                          <Dumbbell size={24} />
                        )}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 700, 
                          color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                          marginBottom: '0.6rem',
                          letterSpacing: '-0.01em'
                        }}>
                          {exercise.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                          <span style={{ 
                            fontSize: '1rem', 
                            color: 'var(--text-muted)', 
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <span style={{ 
                              width: '6px', 
                              height: '6px', 
                              borderRadius: '50%', 
                              background: 'var(--primary)' 
                            }} />
                            {exercise.sets} sets × {exercise.reps} {isCardio ? '' : 'reps'}
                          </span>
                          {exercise.rest && (
                            <span style={{ 
                              fontSize: '0.9rem', 
                              color: 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}>
                              <Clock size={14} />
                              {exercise.rest} rest
                            </span>
                          )}
                        </div>
                      </div>

                      {isCardio && (
                        <div style={{ 
                          textAlign: 'right',
                          background: 'rgba(249, 115, 22, 0.1)',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid rgba(249, 115, 22, 0.2)'
                        }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                            <Flame size={22} color="var(--accent)" />
                            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent)' }}>500 cal</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={() => setShowResetModal(false)}
        >
          <div 
            style={{
              background: 'var(--bg-card)',
              borderRadius: '24px',
              padding: '2rem',
              maxWidth: '450px',
              width: '90%',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              animation: 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning Icon */}
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))',
              border: '3px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: '0.75rem',
              color: 'var(--text-main)'
            }}>
              Clear All Workouts?
            </h3>

            {/* Message */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              This will reset all completed exercises for today. This action cannot be undone.
            </p>

            {/* Action Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <button
                onClick={() => setShowResetModal(false)}
                style={{
                  padding: '0.875rem 1.5rem',
                  borderRadius: '12px',
                  border: '2px solid var(--border)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-card)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-main)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                style={{
                  padding: '0.875rem 1.5rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
                }}
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes success-pulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Workouts;

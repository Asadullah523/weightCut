import React, { useState } from 'react';
import { EXERCISES } from '../data/exercises';
import { Search, Dumbbell, Info, X, ChevronRight, Zap } from 'lucide-react';

const ExerciseLibrary = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...Object.keys(EXERCISES)];

  const allExercises = Object.entries(EXERCISES).flatMap(([category, list]) => 
    list.map(ex => ({ ...ex, category }))
  );

  const filteredExercises = allExercises.filter(ex => {
    const matchesCategory = filter === 'All' || ex.category === filter;
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingBottom: '2rem' }}>
      <div className="animate-fade-in">
        <div className="card glass-effect" style={{ marginBottom: '2rem', position: 'sticky', top: 'calc(var(--nav-height) + 1rem)', zIndex: 40, backdropFilter: 'blur(12px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Exercise Library</h2>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{filteredExercises.length} exercises</span>
          </div>
          
          {/* Search and Filter */}
          <div className="grid-gap">
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              <input 
                type="text" 
                placeholder="Search exercises..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 0.75rem 0.75rem 3rem', 
                  borderRadius: 'var(--radius)', 
                  border: '1px solid var(--border)',
                  background: 'var(--bg-main)',
                  transition: 'all 0.2s ease',
                  fontSize: '1rem'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              gap: '0.75rem', 
              paddingBottom: '0.5rem',
              scrollbarWidth: 'none'
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    whiteSpace: 'nowrap',
                    background: filter === cat ? 'var(--primary)' : 'var(--bg-main)',
                    color: filter === cat ? 'white' : 'var(--text-muted)',
                    border: filter === cat ? 'none' : '1px solid var(--border)',
                    fontSize: '0.9rem',
                    fontWeight: filter === cat ? 600 : 400,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {filteredExercises.map((ex, idx) => (
            <ExerciseCard key={idx} exercise={ex} onClick={() => setSelectedExercise(ex)} />
          ))}
        </div>
      </div>

      {/* Modal Overlay - Rendered outside the animated container to avoid stacking context issues */}
      {selectedExercise && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.4)', // Slight dark overlay for better focus
          zIndex: 10000, // Very high z-index
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          animation: 'fadeIn 0.2s ease',
          backdropFilter: 'blur(4px)' // Blur the background
        }} onClick={() => setSelectedExercise(null)}>
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '85vh',
            overflow: 'hidden',
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.25), 0 30px 60px -30px rgba(0,0,0,0.3)',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.5)',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column'
          }} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => setSelectedExercise(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(0,0,0,0.05)',
                color: 'var(--text-main)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.2s',
                backdropFilter: 'blur(4px)'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'rgba(0,0,0,0.1)'; e.target.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'rgba(0,0,0,0.05)'; e.target.style.transform = 'scale(1)'; }}
            >
              <X size={20} />
            </button>

            {/* Content Container - Scrollable */}
            <div style={{ overflowY: 'auto', height: '100%' }}>
              
              {/* Hero Image */}
              {selectedExercise.image && (
                <div style={{ height: '300px', width: '100%', position: 'relative' }}>
                  <img 
                    src={selectedExercise.image} 
                    alt={selectedExercise.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    height: '100px', 
                    background: 'linear-gradient(to top, white, transparent)' 
                  }} />
                </div>
              )}

              <div style={{ padding: '2rem 3rem 3rem' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--primary)', 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    background: 'rgba(var(--primary-rgb), 0.1)',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem'
                  }}>
                    {selectedExercise.category}
                  </span>
                  
                  <h2 style={{ 
                    fontSize: '2.5rem', 
                    marginTop: '1.5rem', 
                    marginBottom: '0.5rem', 
                    fontWeight: 800, 
                    color: '#1f2937',
                    letterSpacing: '-0.5px'
                  }}>
                    {selectedExercise.name}
                  </h2>
                </div>

                {/* Quick Stats */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '1.5rem', 
                  marginBottom: '3rem',
                  background: '#f8fafc',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Sets</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{selectedExercise.sets}</p>
                  </div>
                  <div style={{ textAlign: 'center', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Reps</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{selectedExercise.reps}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Rest</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{selectedExercise.rest}</p>
                  </div>
                </div>

                {/* Instructions */}
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    marginBottom: '1.5rem', 
                    fontWeight: 700, 
                    color: '#1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{ width: '4px', height: '24px', background: 'var(--primary)', borderRadius: '2px' }} />
                    Execution Guide
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {selectedExercise.instructions && selectedExercise.instructions.map((instruction, i) => (
                      <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                        <div style={{ 
                          minWidth: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          background: 'white', 
                          color: 'var(--primary)', 
                          border: '2px solid var(--primary)',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          flexShrink: 0,
                          marginTop: '-2px',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}>
                          {i + 1}
                        </div>
                        <p style={{ 
                          lineHeight: '1.7', 
                          color: '#334155', 
                          fontSize: '1.05rem',
                          margin: 0 
                        }}>
                          {instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExerciseCard = ({ exercise, onClick }) => {
  return (
    <div 
      className="card card-hover" 
      onClick={onClick}
      style={{ 
        padding: '0', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        height: '280px',
        border: 'none',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Image Area */}
      <div style={{ 
        height: '160px', 
        background: 'var(--bg-main)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--text-muted)',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {exercise.image ? (
          <img 
            src={exercise.image} 
            alt={exercise.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(135deg, var(--bg-main) 0%, var(--bg-card) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Dumbbell size={40} opacity={0.1} />
          </div>
        )}
        
        <div style={{ 
          position: 'absolute', 
          top: '0.75rem', 
          right: '0.75rem', 
          background: 'rgba(255,255,255,0.9)', 
          backdropFilter: 'blur(4px)',
          color: 'var(--text-main)',
          padding: '6px', 
          borderRadius: '50%', 
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <Info size={18} />
        </div>
      </div>
      
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-card)' }}>
        <span style={{ 
          fontSize: '0.7rem', 
          color: 'var(--primary)', 
          fontWeight: 700, 
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '0.5rem'
        }}>
          {exercise.category}
        </span>
        
        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', lineHeight: '1.4', fontWeight: 600 }}>{exercise.name}</h4>
        
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Zap size={14} />
          <span>{exercise.sets} × {exercise.reps}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseLibrary;

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, ChevronRight, Target, User, ArrowRight, Activity, Ruler, Weight } from 'lucide-react';

const Onboarding = () => {
  const { updateUser, updateGoals } = useApp();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    currentWeight: '',
    targetWeight: '',
    startDate: new Date().toISOString().split('T')[0],
    targetDate: '',
    activityLevel: 'moderate',
    gender: 'male' // Default to male for calculation
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateHealthMetrics = () => {
    if (!formData.height || !formData.currentWeight || !formData.age) return null;

    const heightInM = parseFloat(formData.height) / 100;
    const weight = parseFloat(formData.currentWeight);
    const age = parseInt(formData.age);
    
    // BMI Calculation
    const bmi = weight / (heightInM * heightInM);
    
    // Healthy Weight Range (BMI 18.5 - 24.9)
    const minHealthyWeight = 18.5 * (heightInM * heightInM);
    const maxHealthyWeight = 24.9 * (heightInM * heightInM);
    
    // Body Fat Calculation (U.S. Navy Method approximation based on BMI)
    // Formula: (1.20 x BMI) + (0.23 x Age) - (10.8 x Sex) - 5.4
    // Sex: 1 for male, 0 for female
    const sexFactor = formData.gender === 'male' ? 1 : 0;
    const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * sexFactor) - 5.4;

    return {
      bmi: bmi.toFixed(1),
      healthyRange: `${minHealthyWeight.toFixed(1)} - ${maxHealthyWeight.toFixed(1)}`,
      bodyFat: bodyFat.toFixed(1),
      idealWeight: ((minHealthyWeight + maxHealthyWeight) / 2).toFixed(1)
    };
  };



  const calculateProjection = () => {
    if (!formData.currentWeight || !formData.targetWeight || !formData.targetDate) return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.targetDate);
    const weeks = (end - start) / (1000 * 60 * 60 * 24 * 7);
    
    if (weeks <= 0) return null;
    
    const diff = parseFloat(formData.targetWeight) - parseFloat(formData.currentWeight);
    const isGain = diff > 0;
    const weeklyChange = Math.abs(diff) / weeks;
    
    let isHealthy = false;
    if (isGain) {
      // Healthy gain: 0.25 - 0.5 kg/week
      isHealthy = weeklyChange <= 0.5;
    } else {
      // Healthy loss: 0 - 1.0 kg/week
      isHealthy = weeklyChange <= 1.0;
    }
    
    return {
      weeks: weeks.toFixed(1),
      weeklyChange: weeklyChange.toFixed(2),
      isGain,
      isHealthy
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isGain = parseFloat(formData.targetWeight) > parseFloat(formData.currentWeight);

    // Save User Profile
    updateUser({
      name: formData.name,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      currentWeight: parseFloat(formData.currentWeight),
      startWeight: parseFloat(formData.currentWeight),
      activityLevel: formData.activityLevel,
      gender: formData.gender
    });

    // Save Goals
    updateGoals({
      targetWeight: parseFloat(formData.targetWeight),
      startDate: formData.startDate,
      targetDate: formData.targetDate,
      startWeight: parseFloat(formData.currentWeight),
      goalType: isGain ? 'gain' : 'lose'
    });
    
    // No need to navigate - App.jsx will automatically show Dashboard when user exists
  };

  const projection = calculateProjection();
  const healthMetrics = calculateHealthMetrics();

  return (
    <div className="container flex-center" style={{ minHeight: '100vh', padding: '2rem 1rem', background: 'var(--bg-main)' }}>
      <div className="card glass-effect animate-fade-in" style={{ maxWidth: '500px', width: '100%', padding: '2.5rem', border: '1px solid rgba(255,255,255,0.2)' }}>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step >= 1 ? 'var(--primary)' : 'var(--border)', transition: 'all 0.3s' }} />
          <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step >= 2 ? 'var(--primary)' : 'var(--border)', transition: 'all 0.3s' }} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>
            Fit<span style={{ color: 'var(--primary)' }}>Track</span>
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {step === 1 ? "Let's get to know you" : "Set your ultimate goal"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="grid-gap animate-fade-in">
              <div className="input-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  <User size={18} color="var(--primary)" /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="What should we call you?"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  required
                  style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-main)', fontSize: '1rem' }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                    <Activity size={18} color="var(--primary)" /> Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Years"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-main)', fontSize: '1rem' }}
                  />
                </div>
                <div className="input-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                    <User size={18} color="var(--primary)" /> Gender
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                      style={{
                        flex: 1,
                        padding: '0.8rem',
                        borderRadius: 'var(--radius)',
                        border: formData.gender === 'male' ? '1px solid var(--primary)' : '1px solid var(--border)',
                        background: formData.gender === 'male' ? 'rgba(14, 165, 233, 0.1)' : 'var(--bg-main)',
                        color: formData.gender === 'male' ? 'var(--primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                      style={{
                        flex: 1,
                        padding: '0.8rem',
                        borderRadius: 'var(--radius)',
                        border: formData.gender === 'female' ? '1px solid var(--primary)' : '1px solid var(--border)',
                        background: formData.gender === 'female' ? 'rgba(14, 165, 233, 0.1)' : 'var(--bg-main)',
                        color: formData.gender === 'female' ? 'var(--primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      Female
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                    <Ruler size={18} color="var(--primary)" /> Height
                  </label>
                  <input
                    type="number"
                    name="height"
                    placeholder="cm"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-main)', fontSize: '1rem' }}
                  />
                </div>
                <div className="input-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                    <Weight size={18} color="var(--primary)" /> Weight
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="currentWeight"
                    placeholder="kg"
                    value={formData.currentWeight}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-main)', fontSize: '1rem' }}
                  />
                </div>
              </div>

              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ marginTop: '1.5rem', width: '100%', padding: '1rem', fontSize: '1rem' }}
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.age || !formData.height || !formData.currentWeight || !formData.gender}
              >
                Next Step <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="grid-gap animate-fade-in">
              {/* Health Recommendations Card */}
              {healthMetrics && (
                <div style={{ 
                  padding: '1.25rem', 
                  background: 'rgba(59, 130, 246, 0.05)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <Activity size={16} /> Your Health Analysis
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Healthy Weight</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{healthMetrics.healthyRange} kg</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Est. Body Fat</p>
                      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{healthMetrics.bodyFat}%</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, targetWeight: healthMetrics.idealWeight }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: 'var(--radius)',
                      border: '1px dashed var(--primary)',
                      background: 'transparent',
                      color: 'var(--primary)',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Target size={16} /> Use Recommended Goal ({healthMetrics.idealWeight} kg)
                  </button>
                </div>
              )}

              <div className="input-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  <Target size={18} color="var(--primary)" /> Target Weight
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="targetWeight"
                  placeholder="kg"
                  value={formData.targetWeight}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-main)', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="input-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                    <Calendar size={18} color="var(--primary)" /> Start
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-main)', fontSize: '0.9rem' }}
                  />
                </div>
                <div className="input-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                    <Calendar size={18} color="var(--primary)" /> Target
                  </label>
                  <input
                    type="date"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--bg-main)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              {projection && (
                <div style={{ 
                  padding: '1.25rem', 
                  background: projection.isHealthy ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  borderRadius: 'var(--radius)',
                  border: `1px solid ${projection.isHealthy ? 'var(--secondary)' : 'var(--accent)'}`,
                  marginTop: '0.5rem'
                }}>
                  <h4 style={{ color: projection.isHealthy ? 'var(--secondary-dark)' : 'var(--accent)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {projection.isHealthy ? 'Looking Good! 🎯' : 'Ambitious Goal ⚡'}
                  </h4>
                  <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                    <p>
                      You'll need to {projection.isGain ? 'gain' : 'lose'} <strong>{projection.weeklyChange} kg/week</strong> over <strong>{projection.weeks} weeks</strong>.
                    </p>
                    {!projection.isHealthy && (
                      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.9 }}>
                        ⚠️ Recommended healthy {projection.isGain ? 'gain' : 'loss'} is up to {projection.isGain ? '0.5' : '1.0'} kg/week.
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button 
                  type="button" 
                  className="btn" 
                  style={{ flex: 1, border: '1px solid var(--border)', padding: '1rem' }}
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ flex: 2, padding: '1rem', fontSize: '1rem' }}
                  disabled={!formData.targetWeight || !formData.targetDate}
                >
                  Start Journey
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Onboarding;

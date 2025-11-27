import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, ChevronRight, Target, User, ArrowRight, Activity, Ruler, Weight } from 'lucide-react';

const Onboarding = () => {
  const { updateUser, updateGoals } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    currentWeight: '',
    targetWeight: '',
    startDate: new Date().toISOString().split('T')[0],
    targetDate: '',
    activityLevel: 'moderate'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateProjectedLoss = () => {
    if (!formData.currentWeight || !formData.targetWeight || !formData.targetDate) return null;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.targetDate);
    const weeks = (end - start) / (1000 * 60 * 60 * 24 * 7);
    
    if (weeks <= 0) return null;
    
    const loss = parseFloat(formData.currentWeight) - parseFloat(formData.targetWeight);
    const weeklyLoss = loss / weeks;
    
    return {
      weeks: weeks.toFixed(1),
      weeklyLoss: weeklyLoss.toFixed(2),
      isHealthy: weeklyLoss >= 0.5 && weeklyLoss <= 1.0
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save User Profile
    updateUser({
      name: formData.name,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      currentWeight: parseFloat(formData.currentWeight),
      startWeight: parseFloat(formData.currentWeight),
      activityLevel: formData.activityLevel
    });

    // Save Goals
    updateGoals({
      targetWeight: parseFloat(formData.targetWeight),
      startDate: formData.startDate,
      targetDate: formData.targetDate,
      startWeight: parseFloat(formData.currentWeight)
    });

    navigate('/');
  };

  const projection = calculateProjectedLoss();

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
            Weight<span style={{ color: 'var(--primary)' }}>Cut</span>
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
              </div>

              <div className="input-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                  <Weight size={18} color="var(--primary)" /> Current Weight
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

              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ marginTop: '1.5rem', width: '100%', padding: '1rem', fontSize: '1rem' }}
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.age || !formData.height || !formData.currentWeight}
              >
                Next Step <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="grid-gap animate-fade-in">
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
                    <p>You'll need to lose <strong>{projection.weeklyLoss} kg/week</strong> over <strong>{projection.weeks} weeks</strong>.</p>
                    {!projection.isHealthy && (
                      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.9 }}>
                        ⚠️ Recommended healthy loss is 0.5 - 1.0 kg/week.
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

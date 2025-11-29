import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, ChevronRight, Search, Flame, Droplets, Apple, Coffee, Utensils, Moon, Zap, Activity, Clock, Check, AlertTriangle, Lightbulb } from 'lucide-react';
import { FOODS_TO_AVOID, COMMON_MEALS, WEIGHT_LOSS_TIPS, RECOVERY_TIPS, HIGH_PROTEIN_FOODS } from '../data/nutrition';
import FoodSearch from '../components/FoodSearch';

const Nutrition = () => {
  const { user, goals, nutritionLogs, logNutrition } = useApp();
  const [todayLog, setTodayLog] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (nutritionLogs && nutritionLogs[today]) {
      setTodayLog({
        calories: nutritionLogs[today].calories || 0,
        protein: nutritionLogs[today].protein || 0,
        carbs: nutritionLogs[today].carbs || 0,
        fat: nutritionLogs[today].fat || 0
      });
    } else {
      setTodayLog({ calories: 0, protein: 0, carbs: 0, fat: 0 });
    }
  }, [nutritionLogs, today]);

  if (!user || !goals) return null;

  // --- Dynamic Calorie & Macro Calculation ---
  const isGain = goals?.goalType === 'gain';
  
  const calculateTargets = () => {
    // Mifflin-St Jeor Equation
    const weight = user.currentWeight || 70;
    const height = user.height || 170;
    const age = user.age || 30;
    const gender = user.gender || 'male';
    const activityLevel = user.activityLevel || 'moderate';

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += gender === 'male' ? 5 : -161;

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const tdee = bmr * (activityMultipliers[activityLevel] || 1.55);
    
    // Goal Adjustment
    // Gain: +500 surplus
    // Lose: -500 deficit
    const targetCalories = Math.round(isGain ? tdee + 500 : tdee - 500);
    
    // Protein: 2.2g per kg (standard for building/retaining muscle)
    const targetProtein = Math.round(weight * 2.2);

    return { targetCalories, targetProtein };
  };

  const { targetCalories: CALORIE_TARGET, targetProtein: PROTEIN_TARGET } = calculateTargets();

  const addMacros = (cals, prot, carbs = 0, fat = 0) => {
    const newLog = {
      calories: (todayLog.calories || 0) + cals,
      protein: (todayLog.protein || 0) + prot,
      carbs: (todayLog.carbs || 0) + carbs,
      fat: (todayLog.fat || 0) + fat
    };
    logNutrition(today, newLog);
  };

  const calorieProgress = Math.min(100, (todayLog.calories / CALORIE_TARGET) * 100);
  const proteinProgress = Math.min(100, (todayLog.protein / PROTEIN_TARGET) * 100);

  // Custom Tips for Gain vs Loss
  const BULKING_TIPS = [
    { icon: <Utensils size={32} color="#3b82f6" />, title: "Eat Frequently", description: "Aim for 5-6 meals a day to hit your surplus without feeling overly stuffed." },
    { icon: <Zap size={32} color="#f59e0b" />, title: "Liquid Calories", description: "Smoothies and shakes are an easy way to get calories in when you're not hungry." },
    { icon: <Activity size={32} color="#10b981" />, title: "Focus on Compound Lifts", description: "Squats, deadlifts, and bench presses trigger the most muscle growth." },
    { icon: <Clock size={32} color="#8b5cf6" />, title: "Pre-Bed Protein", description: "Casein protein or cottage cheese before bed helps recovery during sleep." }
  ];

  const activeTips = isGain ? BULKING_TIPS : WEIGHT_LOSS_TIPS;
  const tipsTitle = isGain ? "Pro Tips for Muscle Growth" : "Pro Tips for Fat Loss";
  const tipsColor = isGain ? "#3b82f6" : "#10b981";

  // --- CSS Pie Chart Logic ---
  const eaten = todayLog.calories || 0;
  const remaining = Math.max(0, CALORIE_TARGET - eaten);
  const progressPercent = Math.min(100, (eaten / CALORIE_TARGET) * 100);
  
  // Colors
  const proteinColor = '#3b82f6';
  const carbsColor = '#10b981';
  const fatColor = '#f59e0b';
  
  // Calculate macro percentages for the chart
  const p = todayLog.protein || 0;
  const c = todayLog.carbs || 0;
  const f = todayLog.fat || 0;
  const totalMacros = (p * 4) + (c * 4) + (f * 9);
  
  const proteinPct = totalMacros > 0 ? ((p * 4) / totalMacros) * 100 : 0;
  const carbsPct = totalMacros > 0 ? ((c * 4) / totalMacros) * 100 : 0;
  const fatPct = totalMacros > 0 ? ((f * 9) / totalMacros) * 100 : 0;

  const pieGradient = `conic-gradient(
    ${proteinColor} 0% ${proteinPct}%,
    ${carbsColor} ${proteinPct}% ${proteinPct + carbsPct}%,
    ${fatColor} ${proteinPct + carbsPct}% 100%
  )`;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '120px' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem' }}>
          Nutrition <span className="gradient-text">Tracker</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', fontSize: '1.05rem' }}>
          {isGain ? "Fuel your gains. Hit your surplus and protein targets." : "Fuel your body right. Track macros and make smart food choices."}
        </p>
      </div>

      {/* AI Food Search */}
      <FoodSearch />

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div className="card" style={{ 
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 146, 60, 0.05) 100%)',
          border: '1px solid rgba(249, 115, 22, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Flame size={22} color="var(--accent)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Calories</span>
            </div>
            <p style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
              {todayLog.calories}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1, height: '6px', background: 'rgba(249, 115, 22, 0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${calorieProgress}%`, 
                  height: '100%', 
                  background: 'var(--accent)',
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{CALORIE_TARGET}</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ 
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Utensils size={22} color="var(--primary)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Protein</span>
            </div>
            <p style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.5rem' }}>
              {todayLog.protein}<span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-muted)' }}>g</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ flex: 1, height: '6px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${proteinProgress}%`, 
                  height: '100%', 
                  background: 'var(--primary)',
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{PROTEIN_TARGET}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calorie Breakdown Chart */}
      <div className="card glass-effect" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Macro Breakdown</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Daily Target: {CALORIE_TARGET}</p>
          </div>
          <div style={{ 
            background: 'rgba(249, 115, 22, 0.1)', 
            padding: '0.5rem', 
            borderRadius: '50%',
            color: '#f97316'
          }}>
            <Flame size={24} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexDirection: 'row' }}>
          {/* CSS Pie Chart */}
          <div style={{ 
            position: 'relative', 
            width: '140px', 
            height: '140px',
            borderRadius: '50%',
            background: pieGradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.5s ease'
          }}>
            <div style={{
              width: '116px',
              height: '116px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2
            }}>
              <span style={{ fontSize: '1.75rem', fontWeight: '800', lineHeight: 1 }}>{eaten}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>kcal eaten</span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Remaining</span>
                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{remaining}</span>
             </div>
             <div style={{ height: '1px', background: 'var(--border)' }}></div>
             <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: proteinColor }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Protein</span>
                  </div>
                  <div style={{ fontWeight: '600' }}>{todayLog.protein}g</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: carbsColor }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Carbs</span>
                  </div>
                  <div style={{ fontWeight: '600' }}>{todayLog.carbs}g</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: fatColor }}></div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fat</span>
                  </div>
                  <div style={{ fontWeight: '600' }}>{todayLog.fat}g</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Add Section */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Add</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => addMacros(100, 0)} 
            className="btn card-hover" 
            style={{ 
              background: 'rgba(249, 115, 22, 0.1)', 
              border: '2px solid rgba(249, 115, 22, 0.3)', 
              color: 'var(--accent)',
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '12px'
            }}
          >
            <Plus size={16} style={{ marginRight: '6px' }} /> 100 kcal
          </button>
          <button 
            onClick={() => addMacros(0, 10)} 
            className="btn card-hover" 
            style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              border: '2px solid rgba(59, 130, 246, 0.3)', 
              color: 'var(--primary)',
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '12px'
            }}
          >
            <Plus size={16} style={{ marginRight: '6px' }} /> 10g Protein
          </button>
          <button 
            onClick={() => addMacros(300, 25, 30, 10)} 
            className="btn card-hover" 
            style={{ 
              background: 'rgba(147, 51, 234, 0.1)', 
              border: '2px solid rgba(147, 51, 234, 0.3)', 
              color: 'var(--primary)',
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.9rem',
              borderRadius: '12px'
            }}
          >
            <Plus size={16} style={{ marginRight: '6px' }} /> Full Meal
          </button>
        </div>
      </div>

      {/* Common Meals */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Apple size={22} color="var(--secondary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Common Meals</h3>
        </div>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Use these estimates to track your daily intake
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {COMMON_MEALS.map((meal, idx) => (
            <div 
              key={idx} 
              className="card-hover"
              style={{ 
                padding: '1.25rem', 
                background: 'var(--bg-main)', 
                borderRadius: '12px',
                border: '2px solid var(--border)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>{meal.name}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Calories</span>
                <span style={{ fontSize: '0.95rem', color: 'var(--accent)', fontWeight: 700 }}>{meal.calories}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Protein</span>
                <span style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 700 }}>{meal.protein}g</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        {/* Power Foods */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Utensils size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Power Foods</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {HIGH_PROTEIN_FOODS.map((food, idx) => (
              <div 
                key={idx} 
                className="card-hover"
                style={{ 
                  padding: '1rem', 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
                  borderRadius: '12px',
                  border: '2px solid rgba(59, 130, 246, 0.2)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{food.name}</p>
                <p style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{food.protein}g</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{food.calories} cal</p>
              </div>
            ))}
          </div>
        </div>

        {/* Foods to Avoid */}
        <div className="card" style={{ padding: '1.5rem', borderTop: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <AlertTriangle size={22} color="#ef4444" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#ef4444' }}>Avoid These</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FOODS_TO_AVOID.map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '1.25rem',
                  background: 'rgba(239, 68, 68, 0.05)',
                  borderRadius: '12px',
                  border: '2px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>{item.name}</p>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    color: '#ef4444', 
                    fontWeight: 700, 
                    background: 'rgba(239, 68, 68, 0.15)', 
                    padding: '0.35rem 0.75rem', 
                    borderRadius: '8px' 
                  }}>
                    {item.calories}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{item.details}</p>
                <p style={{ fontSize: '0.85rem', color: '#ef4444', fontStyle: 'italic' }}>⚠️ {item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', borderTop: `4px solid ${tipsColor}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Lightbulb size={22} color={tipsColor} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: tipsColor }}>{tipsTitle}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {activeTips.map((tip, idx) => (
            <div 
              key={idx} 
              className="card-hover"
              style={{ 
                display: 'flex', 
                gap: '1rem', 
                alignItems: 'flex-start',
                padding: '1.25rem',
                background: isGain ? 'rgba(59, 130, 246, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                borderRadius: '12px',
                border: `2px solid ${isGain ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)'}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ fontSize: '2.25rem', lineHeight: 1 }}>{tip.icon}</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 700 }}>{tip.title}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Tips */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Zap size={22} color="var(--accent)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Recovery Protocol</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {RECOVERY_TIPS.map((tip, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ 
                minWidth: '32px', 
                height: '32px', 
                borderRadius: '10px', 
                background: 'linear-gradient(135deg, #10b981, #059669)', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}>
                <Check size={18} strokeWidth={3} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 700 }}>{tip.title}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nutrition;

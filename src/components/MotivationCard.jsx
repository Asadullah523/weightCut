import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const QUOTES = [
  "The only bad workout is the one that didn't happen.",
  "Fitness is not about being better than someone else. It’s about being better than you were yesterday.",
  "Discipline is doing what needs to be done, even if you don't want to do it.",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
  "Success starts with self-discipline.",
  "Don't stop when you're tired. Stop when you're done.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "A one-hour workout is only 4% of your day. No excuses.",
  "Sweat is just fat crying."
];

const MotivationCard = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a quote based on the day of the year so it stays same for the day
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % QUOTES.length;
    setQuote(QUOTES[quoteIndex]);
  }, []);

  return (
    <div className="card card-hover" style={{ 
      background: 'var(--gradient-accent)', 
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.9 }}>
          <div style={{ padding: '0.25rem', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>
            <Quote size={14} fill="white" />
          </div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>Daily Motivation</span>
        </div>
        <p style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: '1.5', fontStyle: 'italic', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          "{quote}"
        </p>
      </div>
      
      {/* Decorative Circle */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        left: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)'
      }} />
    </div>
  );
};

export default MotivationCard;

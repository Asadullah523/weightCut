import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState(null);
  const [weightLogs, setWeightLogs] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState({});
  const [measurements, setMeasurements] = useState({});
  const [nutritionLogs, setNutritionLogs] = useState({});
  const [settings, setSettings] = useState({ theme: 'light' });
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = () => {
      const loadedUser = StorageService.getUserProfile();
      const loadedGoals = StorageService.getGoals();
      const loadedWeightLogs = StorageService.getWeightLogs();
      const loadedWorkoutLogs = StorageService.getWorkoutLogs();
      const loadedSettings = StorageService.getSettings();
      const loadedMeasurements = JSON.parse(localStorage.getItem('body_measurements') || '{}');
      const loadedNutritionLogs = JSON.parse(localStorage.getItem('nutrition_logs') || '{}');

      setUser(loadedUser);
      setGoals(loadedGoals);
      setWeightLogs(loadedWeightLogs);
      setWorkoutLogs(loadedWorkoutLogs);
      setMeasurements(loadedMeasurements);
      setNutritionLogs(loadedNutritionLogs);
      setSettings(loadedSettings);
      
      // Apply theme
      document.documentElement.setAttribute('data-theme', loadedSettings.theme);
      
      setLoading(false);
    };

    loadData();
  }, []);

  // Actions
  const updateUser = (userData) => {
    setUser(userData);
    StorageService.saveUserProfile(userData);
  };

  const updateGoals = (goalData) => {
    setGoals(goalData);
    StorageService.saveGoals(goalData);
  };

  const addWeightEntry = (entry) => {
    const newLogs = StorageService.addWeightLog(entry);
    setWeightLogs(newLogs);
    
    // Also update current weight in user profile if it's today's entry or latest
    if (newLogs.length > 0 && newLogs[0].date === entry.date) {
      const updatedUser = { ...user, currentWeight: entry.weight };
      updateUser(updatedUser);
    }
  };

  const updateWorkoutLog = (date, logData) => {
    const newLogs = StorageService.saveWorkoutLog(date, logData);
    setWorkoutLogs(newLogs);
  };

  const logMeasurement = (date, data) => {
    const newMeasurements = { ...measurements, [date]: data };
    setMeasurements(newMeasurements);
    localStorage.setItem('body_measurements', JSON.stringify(newMeasurements));
  };

  const logNutrition = (date, data) => {
    const newLogs = { ...nutritionLogs, [date]: data };
    setNutritionLogs(newLogs);
    localStorage.setItem('nutrition_logs', JSON.stringify(newLogs));
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    const newSettings = { ...settings, theme: newTheme };
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const resetApp = () => {
    // Clear all localStorage
    localStorage.clear();
    
    // Reset all state to initial values
    setUser(null);
    setGoals(null);
    setWeightLogs([]);
    setWorkoutLogs({});
    setMeasurements({});
    setNutritionLogs({});
    setSettings({ theme: 'light' });
    
    // Reset theme to light
    document.documentElement.setAttribute('data-theme', 'light');
  };

  const value = {
    user,
    goals,
    weightLogs,
    workoutLogs,
    measurements,
    nutritionLogs,
    settings,
    loading,
    updateUser,
    updateGoals,
    addWeightEntry,
    updateWorkoutLog,
    logMeasurement,
    logNutrition,
    toggleTheme,
    resetApp
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

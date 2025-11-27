const KEYS = {
    USER_PROFILE: 'wc_user_profile',
    GOALS: 'wc_goals',
    WEIGHT_LOGS: 'wc_weight_logs',
    WORKOUT_LOGS: 'wc_workout_logs',
    SETTINGS: 'wc_settings'
};

export const StorageService = {
    // User Profile
    getUserProfile: () => {
        const data = localStorage.getItem(KEYS.USER_PROFILE);
        return data ? JSON.parse(data) : null;
    },
    saveUserProfile: (profile) => {
        localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    },

    // Goals
    getGoals: () => {
        const data = localStorage.getItem(KEYS.GOALS);
        return data ? JSON.parse(data) : null;
    },
    saveGoals: (goals) => {
        localStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
    },

    // Weight Logs
    getWeightLogs: () => {
        const data = localStorage.getItem(KEYS.WEIGHT_LOGS);
        return data ? JSON.parse(data) : [];
    },
    addWeightLog: (log) => { // { date: 'YYYY-MM-DD', weight: number, photo: string(optional) }
        const logs = StorageService.getWeightLogs();
        // Check if entry for date exists, update it
        const existingIndex = logs.findIndex(l => l.date === log.date);
        if (existingIndex >= 0) {
            logs[existingIndex] = { ...logs[existingIndex], ...log };
        } else {
            logs.push(log);
        }
        // Sort by date descending
        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        localStorage.setItem(KEYS.WEIGHT_LOGS, JSON.stringify(logs));
        return logs;
    },

    // Workout Logs
    getWorkoutLogs: () => {
        const data = localStorage.getItem(KEYS.WORKOUT_LOGS);
        return data ? JSON.parse(data) : {}; // { 'YYYY-MM-DD': { completed: boolean, exercises: { id: boolean } } }
    },
    saveWorkoutLog: (date, logData) => {
        const logs = StorageService.getWorkoutLogs();
        logs[date] = logData;
        localStorage.setItem(KEYS.WORKOUT_LOGS, JSON.stringify(logs));
        return logs;
    },

    // Settings
    getSettings: () => {
        const data = localStorage.getItem(KEYS.SETTINGS);
        return data ? JSON.parse(data) : { theme: 'light' };
    },
    saveSettings: (settings) => {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    },

    // Clear all (for debugging or reset)
    clearAll: () => {
        localStorage.clear();
    }
};

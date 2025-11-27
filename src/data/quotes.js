export const MOTIVATIONAL_QUOTES = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It’s your mind that you have to convince.",
    "Success starts with self-discipline.",
    "Don't stop when you're tired. Stop when you're done.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Discipline is doing what needs to be done, even if you don't want to do it.",
    "You don't have to be extreme, just consistent.",
    "Motivation is what gets you started. Habit is what keeps you going.",
    "A one hour workout is only 4% of your day. No excuses.",
    "Sweat is just fat crying.",
    "Focus on your goal. Don't look in any direction but ahead.",
    "Results happen over time, not overnight. Work hard, stay consistent, and be patient."
];

export const getDailyQuote = () => {
    // Use the day of the year to rotate quotes deterministically
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
};

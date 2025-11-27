import { WORKOUT_SCHEDULE, getExercisesForDay } from './src/data/exercises.js';

console.log('=== TESTING WEDNESDAY EXERCISES ===\n');

const wednesday = WORKOUT_SCHEDULE.find(d => d.id === 'wed');
console.log('Schedule says Wednesday should have:');
console.log(wednesday.exercises);
console.log(`\nTotal in schedule: ${wednesday.exercises.length}\n`);

console.log('getExercisesForDay returns:');
const exercises = getExercisesForDay('wed');
console.log(exercises.map(e => `- ${e.name} (${e.category})`));
console.log(`\nTotal returned: ${exercises.length}\n`);

if (exercises.length !== wednesday.exercises.length) {
    console.log('❌ MISMATCH!');
    const missing = wednesday.exercises.filter(name =>
        !exercises.find(ex => ex.name === name || ex.name.includes(name) || name.includes(ex.name))
    );
    console.log('Missing exercises:', missing);
}

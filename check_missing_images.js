
import fs from 'fs';
import path from 'path';
import { EXERCISES } from './src/data/exercises.js';

const PUBLIC_DIR = path.resolve('./public');

const missingImages = [];
const allExercises = Object.values(EXERCISES).flat();

allExercises.forEach(ex => {
    if (ex.image) {
        const imagePath = path.join(PUBLIC_DIR, ex.image);
        if (!fs.existsSync(imagePath)) {
            missingImages.push({ name: ex.name, image: ex.image });
        }
    }
});

console.log('Missing Images:', JSON.stringify(missingImages, null, 2));

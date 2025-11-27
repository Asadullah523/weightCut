
const fs = require('fs');
const path = require('path');

const exercisesPath = path.join(__dirname, 'src/data/exercises.js');
const assetsPath = path.join(__dirname, 'public/assets');

try {
    const content = fs.readFileSync(exercisesPath, 'utf8');
    const assetFiles = fs.readdirSync(assetsPath);

    let lines = content.split('\n');
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("name: '")) {
            const nameMatch = lines[i].match(/name: '([^']+)'/);
            if (nameMatch) {
                const exerciseName = nameMatch[1];

                // Look ahead for image line within reasonable distance (e.g., 5 lines)
                let j = i + 1;
                let foundImage = false;
                while (j < lines.length && j < i + 10 && !foundImage) {
                    if (lines[j].includes('image:')) {
                        foundImage = true;
                        if (lines[j].includes('/assets/sliced/')) {
                            const bestMatch = findBestMatch(exerciseName, assetFiles);
                            if (bestMatch) {
                                console.log(`Mapping ${exerciseName} -> ${bestMatch}`);
                                lines[j] = lines[j].replace(/'\/assets\/sliced\/[^']+'/, `'/assets/${bestMatch}'`);
                                count++;
                            } else {
                                console.log(`No match found for: ${exerciseName}`);
                            }
                        }
                    }
                    j++;
                }
            }
        }
    }

    function findBestMatch(name, files) {
        const snake = name.toLowerCase().replace(/ /g, '_').replace(/-/g, '_');

        // 1. Exact match
        if (files.includes(snake + '.png')) return snake + '.png';
        if (files.includes(snake + '.jpg')) return snake + '.jpg';
        if (files.includes(snake + '.jpeg')) return snake + '.jpeg';

        // 2. Specific overrides based on my suggested list
        const overrides = {
            'kickbacks': 'tricep_kickbacks.png',
            'planks': 'plank.png',
            'ab wheel rollouts': 'ab_wheel.png',
            'single arm overhead extension': 'single_arm_overhead_ext.png',
            'resistance band chest press': 'band_chest_press.png',
            'resistance band extensions': 'band_extensions.png',
            'side planks': 'side_plank.png'
        };
        if (overrides[name.toLowerCase()] && files.includes(overrides[name.toLowerCase()])) {
            return overrides[name.toLowerCase()];
        }

        // 3. Fuzzy contains
        // File contains exercise name (e.g. "tricep_kickbacks.png" contains "kickbacks")
        const fileContainsName = files.find(f => f.includes(snake));
        if (fileContainsName) return fileContainsName;

        // Exercise name contains file name (e.g. "Planks" contains "plank")
        // Remove extension from file for this check
        const nameContainsFile = files.find(f => {
            const base = f.replace(/\.[^/.]+$/, "");
            return snake.includes(base) && base.length > 3; // Avoid short matches
        });
        if (nameContainsFile) return nameContainsFile;

        return null;
    }

    fs.writeFileSync(exercisesPath, lines.join('\n'));
    console.log(`Successfully updated ${count} images.`);

} catch (err) {
    console.error("Error:", err);
}

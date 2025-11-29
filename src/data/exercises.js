export const WORKOUT_SCHEDULE = [
    {
        id: 'mon', day: 'Monday', focus: 'Chest + Triceps',
        exercises: [
            'Cardio',
            'Barbell Bench Press',
            'Incline Dumbbell Press',
            'Cable Chest Flyes',
            'Rope Pushdowns',
            'Overhead Extension',
            'Close Grip Bench'
        ]
    },
    {
        id: 'tue', day: 'Tuesday', focus: 'Back + Biceps',
        exercises: [
            'Cardio',
            'Lat Pulldowns',
            'Bent-Over Rows',
            'Seated Cable Rows',
            'Barbell Curls',
            'Hammer Curls',
            'Cable Curls'
        ]
    },
    {
        id: 'wed', day: 'Wednesday', focus: 'Legs + Shoulders',
        exercises: [
            'Cardio',
            'Barbell Squats',
            'Romanian Deadlifts',
            'Leg Press',
            'Dumbbell Shoulder Press',
            'Lateral Raises',
            'Face Pulls'
        ]
    },
    {
        id: 'thu', day: 'Thursday', focus: 'Chest + Triceps',
        exercises: [
            'Cardio',
            'Dumbbell Bench Press',
            'Dips (Chest Focus)',
            'Machine Chest Press',
            'Skull Crushers',
            'Rope Pushdowns',
            'Tricep Dips'
        ]
    },
    {
        id: 'fri', day: 'Friday', focus: 'Back + Biceps',
        exercises: [
            'Cardio',
            'Deadlifts',
            'T-Bar Rows',
            'Straight Arm Pulldowns',
            'Preacher Curls',
            'Hammer Curls',
            'Concentration Curls'
        ]
    },
    {
        id: 'sat', day: 'Saturday', focus: 'Legs + Abs',
        exercises: [
            'Cardio',
            'Barbell Squats',
            'Walking Lunges',
            'Leg Extensions',
            'Cable Crunches',
            'Hanging Leg Raises',
            'Planks'
        ]
    },
    { id: 'sun', day: 'Sunday', title: 'REST DAY', focus: 'Rest', exercises: [] }
];

export const HYPERTROPHY_SCHEDULE = [
    {
        id: 'mon', day: 'Monday', focus: 'Push (Chest/Shoulders/Triceps)',
        exercises: [
            'Barbell Bench Press',
            'Dumbbell Shoulder Press',
            'Incline Dumbbell Press',
            'Lateral Raises',
            'Rope Pushdowns',
            'Skull Crushers'
        ]
    },
    {
        id: 'tue', day: 'Tuesday', focus: 'Pull (Back/Biceps)',
        exercises: [
            'Deadlifts',
            'Pull-ups',
            'Bent-Over Rows',
            'Face Pulls',
            'Barbell Curls',
            'Hammer Curls'
        ]
    },
    {
        id: 'wed', day: 'Wednesday', focus: 'Legs',
        exercises: [
            'Barbell Squats',
            'Leg Press',
            'Romanian Deadlifts',
            'Leg Extensions',
            'Leg Curls',
            'Calf Raises'
        ]
    },
    {
        id: 'thu', day: 'Thursday', focus: 'Upper Body',
        exercises: [
            'Dumbbell Bench Press',
            'Lat Pulldowns',
            'Dumbbell Shoulder Press',
            'Seated Cable Rows',
            'Dips (Chest Focus)',
            'Preacher Curls'
        ]
    },
    {
        id: 'fri', day: 'Friday', focus: 'Lower Body',
        exercises: [
            'Barbell Squats',
            'Walking Lunges',
            'Glute Bridges',
            'Leg Extensions',
            'Seated Calf Raises',
            'Planks'
        ]
    },
    {
        id: 'sat', day: 'Saturday', focus: 'Legs + Abs',
        exercises: [
            'Barbell Squats',
            'Romanian Deadlifts',
            'Walking Lunges',
            'Leg Extensions',
            'Hanging Leg Raises',
            'Planks'
        ]
    },
    {
        id: 'sun', day: 'Sunday', focus: 'Active Recovery + Core',
        exercises: [
            'Cardio',
            'Planks',
            'Hanging Leg Raises',
            'Cable Crunches',
            'Russian Twists',
            'Mountain Climbers'
        ]
    }
];

export const getScheduleForGoal = (goalType) => {
    return goalType === 'gain' ? HYPERTROPHY_SCHEDULE : WORKOUT_SCHEDULE;
};

export const CARDIO_PLAN = {
    weeks1_2: {
        title: 'Weeks 1-2: Steady State',
        details: '25 min treadmill + 25 min other cardio (elliptical/bike) at moderate intensity (6-7 km/h, 2-3% incline)'
    },
    weeks3_4: {
        title: 'Weeks 3-4: Mixed Intervals',
        details: '25 min Steady State + 25 min Intervals (1 min fast, 2 min slow)'
    },
    weeks5_6: {
        title: 'Weeks 5-6: HIIT + Steady',
        details: '30 min HIIT (30 sec sprint, 90 sec recovery) + 20 min Steady State'
    }
};

export const EXERCISES = {
    Cardio: [
        {
            name: 'Cardio',
            sets: 1, reps: '30 mins', rest: '0s',
            image: '/assets/cardio_illustration.png',
            instructions: [
                'Perform 30 minutes of steady-state cardio (Treadmill, Elliptical, or Bike).',
                'Maintain a heart rate of 120-140 BPM.',
                'Focus on consistent breathing and endurance.',
                'This burns approximately 500 calories.'
            ]
        }
    ],
    Chest: [
        {
            name: 'Barbell Bench Press',
            sets: 4, reps: '10-12', rest: '90s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Lie on a flat bench with your eyes directly under the bar. Grip the bar slightly wider than shoulder-width apart.',
                'Unrack the bar and hold it directly over your chest with your arms fully extended.',
                'Inhale deeply and lower the bar slowly and under control until it lightly touches your mid-chest.',
                'Pause for a brief moment, then exhale as you explosively press the bar back up to the starting position.',
                'Ensure your feet stay planted firmly on the ground and your glutes remain on the bench throughout the movement.',
                'Lock out your arms at the top and repeat for the desired number of reps.'
            ]
        },
        {
            name: 'Dumbbell Bench Press',
            sets: 4, reps: '10-12', rest: '90s',
            image: '/assets/incline_dumbbell_press_1763936904160.png',
            instructions: [
                'Lie flat on a bench holding a dumbbell in each hand at chest level.',
                'Your palms should be facing forward with thumbs wrapped around the handles.',
                'Press the dumbbells up until your arms are fully extended.',
                'Lower the dumbbells slowly back to chest level with control.',
                'Keep your feet flat on the floor and maintain a slight arch in your lower back.'
            ]
        },
        {
            name: 'Incline Dumbbell Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/incline_dumbbell_press_1763936904160.png',
            instructions: [
                'Set an adjustable bench to an incline of 30-45 degrees. Sit down with a dumbbell in each hand resting on your thighs.',
                'Kick your knees up one at a time to help lift the dumbbells to your shoulders.',
                'Press the dumbbells up until your arms are fully extended above your chest, palms facing forward.',
                'Slowly lower the weights down to the sides of your upper chest, keeping your elbows at a 45-degree angle to your body.',
                'Press the weights back up to the starting position, squeezing your chest at the top.',
                'Control the weight on the way down to maximize muscle tension.'
            ]
        },
        {
            name: 'Cable Chest Flyes',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/cable_chest_flyes_hd.png',
            instructions: [
                'Set the pulleys to a high position above your head. Stand in the center and grab a handle in each hand.',
                'Step forward with one foot for stability and lean your torso slightly forward.',
                'Start with your arms extended out to the sides with a slight bend in your elbows.',
                'Bring your hands together in a wide arc motion in front of your chest, imagining you are hugging a large tree.',
                'Squeeze your chest muscles hard when your hands meet in the center.',
                'Slowly return your arms to the starting position, feeling a deep stretch in your chest.'
            ]
        },
        {
            name: 'Dips (Chest Focus)',
            sets: 3, reps: '8-12', rest: '75s',
            image: '/assets/chest_dips_hd.png',
            instructions: [
                'Mount the dip bars with your arms fully extended and your body supported.',
                'Lean your torso forward about 30 degrees and flare your elbows out slightly to target the chest.',
                'Lower your body by bending your elbows until you feel a good stretch in your chest.',
                'Push yourself back up to the starting position, focusing on using your chest muscles rather than just your triceps.',
                'Keep your core tight and your legs stable throughout the movement.'
            ]
        },
        {
            name: 'Decline Bench Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Secure your legs at the end of the decline bench and lie down.',
                'Grip the bar slightly wider than shoulder-width and unrack it.',
                'Lower the bar slowly to your lower chest/upper abdominal area.',
                'Press the bar back up explosively to the starting position.',
                'This variation targets the lower portion of the pectoral muscles.'
            ]
        },
        {
            name: 'Push-Ups',
            sets: 4, reps: '15-20', rest: '45s',
            image: '/assets/pushups_hd.png',
            instructions: [
                'Start in a high plank position with your hands placed slightly wider than shoulder-width apart.',
                'Keep your body in a straight line from head to heels, engaging your core and glutes.',
                'Lower your chest toward the floor by bending your elbows, keeping them at a 45-degree angle.',
                'Go down until your chest is just above the ground.',
                'Push back up to the starting position, fully extending your arms.'
            ]
        },
        {
            name: 'Dumbbell Flyes',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/dumbbell_flyes_hd.jpg',
            instructions: [
                'Lie flat on a bench with a dumbbell in each hand, palms facing each other.',
                'Press the weights up above your chest, then lower them out to the sides in a wide arc.',
                'Keep a slight bend in your elbows to protect the joints.',
                'Lower the weights until you feel a deep stretch in your chest.',
                'Bring the weights back together at the top using the same arc motion.'
            ]
        },
        {
            name: 'Incline Cable Flyes',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/incline_cable_flyes.png',
            instructions: [
                'Set an incline bench in the middle of a cable machine. Set pulleys to the lowest position.',
                'Lie on the bench and grab a handle in each hand.',
                'Start with your arms out to the sides and bring them together above your upper chest.',
                'Squeeze your upper chest at the top of the movement.',
                'Lower the handles back down slowly, feeling the stretch.'
            ]
        },
        {
            name: 'Pec Deck Machine',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/pec_deck.png',
            instructions: [
                'Adjust the seat height so that your elbows are level with your shoulders when holding the handles.',
                'Sit with your back flat against the pad and grab the handles.',
                'Push the handles together in front of you, squeezing your chest muscles.',
                'Hold the contraction for a second at the center.',
                'Slowly return to the starting position without letting the weights touch the stack.'
            ]
        },
        {
            name: 'Landmine Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Place one end of a barbell in a landmine attachment or corner.',
                'Stand facing the landmine and hold the other end of the bar with both hands at chest level.',
                'Press the bar up and forward until your arms are fully extended.',
                'Lean slightly forward into the press to engage the upper chest.',
                'Lower the bar back to your chest under control.'
            ]
        },
        {
            name: 'Diamond Push-Ups',
            sets: 3, reps: '10-15', rest: '45s',
            image: '/assets/diamond_pushups_hd.png',
            instructions: [
                'Get into a push-up position but place your hands close together so your thumbs and index fingers form a diamond shape.',
                'Lower your chest towards your hands, keeping your elbows close to your body.',
                'Push back up to the starting position.',
                'This variation places more emphasis on the triceps and inner chest.'
            ]
        },
        {
            name: 'Cable Crossovers',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/cable_crossovers.png',
            instructions: [
                'Set the pulleys to the highest position. Stand in the center with a handle in each hand.',
                'Step forward and lean slightly forward at the waist.',
                'Pull the handles down and across your body until your hands meet or cross in front of your waist.',
                'Squeeze your lower chest hard at the bottom.',
                'Return your arms to the starting position slowly.'
            ]
        },
        {
            name: 'Machine Chest Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Adjust the seat height so the handles are aligned with your mid-chest.',
                'Sit with your back firmly against the pad and grab the handles.',
                'Press the handles forward until your arms are extended but not locked.',
                'Return the handles slowly to the starting position without letting the weight stack touch.',
                'Focus on pushing with your chest, not just your arms.'
            ]
        },
        {
            name: 'Incline Hammer Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/incline_dumbbell_press_1763936904160.png',
            instructions: [
                'Lie on an incline bench holding dumbbells with a neutral grip (palms facing each other).',
                'Press the weights straight up over your shoulders.',
                'Lower them back down to the sides of your chest.',
                'This grip can be easier on the shoulders while still targeting the upper chest.'
            ]
        },
        {
            name: 'Wide Grip Push-Ups',
            sets: 3, reps: '15-20', rest: '45s',
            image: '/assets/wide_grip_pushups.png',
            instructions: [
                'Perform a standard push-up but place your hands wider than shoulder-width.',
                'Lower your chest as close to the floor as possible.',
                'Push back up to the start.',
                'The wider grip places more emphasis on the chest muscles and less on the triceps.'
            ]
        },
        {
            name: 'Svend Press',
            sets: 3, reps: '15-20', rest: '45s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Stand holding two weight plates pressed together between your palms at chest level.',
                'Press the plates straight out in front of you while squeezing them together as hard as possible.',
                'Fully extend your arms, then bring the plates back to your chest.',
                'This creates constant tension on the inner chest.'
            ]
        },
        {
            name: 'Close Grip Bench',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Lie on a flat bench and grip the bar with your hands shoulder-width apart.',
                'Lower the bar to your lower chest, keeping your elbows tucked close to your body.',
                'Press the bar back up to the starting position.',
                'This exercise heavily targets the triceps but also works the inner chest.'
            ]
        },
        {
            name: 'Dumbbell Pullover',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/incline_dumbbell_press_1763936904160.png',
            instructions: [
                'Lie perpendicular across a flat bench with only your upper back supported.',
                'Hold a single dumbbell with both hands above your chest.',
                'Lower the dumbbell backward over your head in an arc motion until you feel a stretch in your chest and lats.',
                'Pull the dumbbell back up to the starting position over your chest.'
            ]
        },
        {
            name: 'Resistance Band Chest Press',
            sets: 3, reps: '15-20', rest: '45s',
            image: '/assets/band_chest_press.png',
            instructions: [
                'Anchor a resistance band behind you at chest height.',
                'Hold a handle in each hand and step forward to create tension.',
                'Press the handles forward until your arms are fully extended.',
                'Control the resistance as you return to the starting position.'
            ]
        },
        {
            name: 'Floor Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Lie flat on the floor with a barbell or dumbbells.',
                'Lower the weight until your triceps touch the floor.',
                'Pause for a second, then press the weight back up.',
                'This limits the range of motion, focusing on the top portion of the press and lockout strength.'
            ]
        }
    ],

    Back: [
        {
            name: 'Deadlifts',
            sets: 4, reps: '8-10', rest: '120s',
            image: '/assets/deadlift_illustration_1763936572131.png',
            instructions: [
                'Stand with your feet hip-width apart, with the barbell over the middle of your feet.',
                'Bend at your hips and knees to grab the bar with hands just outside your knees.',
                'Keep your back straight, chest up, and core tight.',
                'Drive through your heels to lift the bar, keeping it close to your legs as you stand up.',
                'Fully extend your hips at the top, squeezing your glutes.',
                'Lower the bar back to the ground with control, maintaining a straight back.'
            ]
        },
        {
            name: 'Pull-ups',
            sets: 4, reps: '8-12', rest: '90s',
            image: '/assets/pullups_hd.png',
            instructions: [
                'Grab the pull-up bar with your hands slightly wider than shoulder-width apart, palms facing away.',
                'Hang freely with your arms fully extended.',
                'Pull your body up by driving your elbows down towards your hips.',
                'Continue pulling until your chin is above the bar.',
                'Lower yourself back down slowly to the starting position.',
                'Avoid swinging or using momentum to lift yourself.'
            ]
        },
        {
            name: 'Bent-Over Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/barbell_rows_hd.png',
            instructions: [
                'Stand holding a barbell with a shoulder-width grip, palms facing down.',
                'Bend your knees slightly and hinge forward at the hips until your torso is nearly parallel to the floor.',
                'Keep your back straight and head in a neutral position.',
                'Pull the barbell towards your lower chest/upper abdomen, squeezing your shoulder blades together.',
                'Lower the bar back down slowly to full arm extension.'
            ]
        },
        {
            name: 'Seated Cable Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/seated_cable_rows_hd.png',
            instructions: [
                'Sit at a low pulley cable station with a V-bar handle.',
                'Place your feet securely on the platform and keep your knees slightly bent.',
                'Pull the handle towards your torso while keeping your back straight and chest up.',
                'Squeeze your back muscles hard when the handle touches your abdomen.',
                'Extend your arms back out slowly, allowing your lats to stretch.'
            ]
        },
        {
            name: 'Lat Pulldowns',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/lat_pulldowns_hd.jpg',
            instructions: [
                'Sit at a lat pulldown machine and adjust the thigh pad to secure your legs.',
                'Grip the bar with a wide overhand grip.',
                'Pull the bar down towards your upper chest, leaning back slightly.',
                'Focus on driving your elbows down and back.',
                'Slowly return the bar to the top position, fully extending your arms.'
            ]
        },
        {
            name: 'T-Bar Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/t_bar_rows.png',
            instructions: [
                'Straddle a T-bar row machine or landmine setup.',
                'Bend at the hips to grab the handles, keeping your back flat.',
                'Pull the weight up towards your chest, retracting your shoulder blades.',
                'Lower the weight back down under control.',
                'Avoid jerking the weight up with your lower back.'
            ]
        },
        {
            name: 'Single Arm Rows',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/single_arm_rows_hd.png',
            instructions: [
                'Place one knee and hand on a bench for support, keeping your back flat.',
                'Hold a dumbbell in your free hand, letting it hang straight down.',
                'Pull the dumbbell up towards your hip, keeping your elbow close to your body.',
                'Squeeze your lat muscle at the top of the movement.',
                'Lower the dumbbell back down slowly.'
            ]
        },
        {
            name: 'Inverted Rows',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/inverted_rows.png',
            instructions: [
                'Set a barbell in a rack at waist height.',
                'Lie underneath the bar and grab it with a shoulder-width grip.',
                'Keep your body in a straight line from head to heels.',
                'Pull your chest up to the bar, squeezing your shoulder blades together.',
                'Lower yourself back down with control.'
            ]
        },
        {
            name: 'Meadows Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/meadows_rows.png',
            instructions: [
                'Stand perpendicular to a landmine bar.',
                'Hinge forward at the hips and grab the end of the bar with the outside hand.',
                'Rest your inside elbow on your thigh for support.',
                'Pull the bar up towards your hip, driving with your elbow.',
                'Lower the weight back down for a full stretch.'
            ]
        },
        {
            name: 'Chest Supported Row',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/chest_supported_row.png',
            instructions: [
                'Lie face down on an incline bench holding a dumbbell in each hand.',
                'Let your arms hang straight down.',
                'Pull the dumbbells up towards your hips, squeezing your back muscles.',
                'Keep your chest pressed against the pad throughout the movement.',
                'Lower the weights back down slowly.'
            ]
        },
        {
            name: 'Straight Arm Pulldowns',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/straight_arm_pulldowns.png',
            instructions: [
                'Stand at a cable machine with a straight bar attached to the high pulley.',
                'Grab the bar with an overhand grip, arms straight.',
                'Keep your arms straight as you pull the bar down to your thighs.',
                'Focus on using your lats to move the weight.',
                'Return the bar to eye level slowly.'
            ]
        },
        {
            name: 'Pendlay Rows',
            sets: 3, reps: '8-10', rest: '90s',
            image: '/assets/pendlay_rows.png',
            instructions: [
                'Start with the barbell on the floor for each rep.',
                'Bend over so your back is parallel to the ground.',
                'Explosively pull the bar to your lower chest.',
                'Return the bar completely to the floor after each rep.',
                'Do not use momentum or lift your torso.'
            ]
        },
        {
            name: 'Machine Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/machine_rows.png',
            instructions: [
                'Adjust the seat height so your chest is against the pad.',
                'Grab the handles and pull them towards you.',
                'Squeeze your shoulder blades together at the peak of the movement.',
                'Return the handles slowly to the starting position.',
                'Keep your elbows close to your body.'
            ]
        },
        {
            name: 'Wide Grip Pulldowns',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/wide_grip_pulldowns.png',
            instructions: [
                'Take a grip wider than shoulder-width on the lat pulldown bar.',
                'Pull the bar down to your upper chest.',
                'Focus on width and stretching the lats at the top.',
                'Keep your torso relatively upright.',
                'Control the weight on the way up.'
            ]
        },
        {
            name: 'Reverse Grip Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/reverse_grip_rows.png',
            instructions: [
                'Hold a barbell with an underhand (supinated) grip.',
                'Bend over at the hips, keeping your back straight.',
                'Pull the bar into your lower abs.',
                'This variation targets the lower lats and biceps more.',
                'Lower the bar with control.'
            ]
        },
        {
            name: 'Seal Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/seal_rows.png',
            instructions: [
                'Lie face down on a high bench so your arms can hang freely without touching the floor.',
                'Hold a dumbbell in each hand.',
                'Row the dumbbells up towards your hips.',
                'This eliminates all momentum, isolating the back muscles completely.',
                'Lower the weights fully.'
            ]
        },
        {
            name: 'Assisted Pull-Ups',
            sets: 3, reps: '10-15', rest: '75s',
            image: '/assets/assisted_pullups.png',
            instructions: [
                'Kneel on the pad of an assisted pull-up machine.',
                'Select a weight that allows you to perform the movement with good form.',
                'Pull yourself up until your chin clears the bar.',
                'Lower yourself down slowly until your arms are fully extended.',
                'Focus on the back muscles, not just pulling with your arms.'
            ]
        },
        {
            name: 'Rack Pulls',
            sets: 3, reps: '8-10', rest: '90s',
            image: '/assets/deadlift_illustration_1763936572131.png',
            instructions: [
                'Set the safety pins in a power rack to just below knee height.',
                'Place the barbell on the pins.',
                'Perform a deadlift motion from this elevated position.',
                'This allows you to use heavier weight to target the upper back and traps.',
                'Keep your back straight and core tight.'
            ]
        },
        {
            name: 'Superman Holds',
            sets: 3, reps: '30-60s', rest: '45s',
            image: '/assets/superman_holds.png',
            instructions: [
                'Lie face down on the floor with your arms extended in front of you.',
                'Simultaneously lift your arms, chest, and legs off the ground.',
                'Squeeze your lower back and glutes.',
                'Hold this position for the prescribed time.',
                'Lower back down to the floor slowly.'
            ]
        }
    ],
    Legs: [
        {
            name: 'Barbell Squats',
            sets: 4, reps: '10-12', rest: '120s',
            image: '/assets/squat_illustration_1763936545702.png',
            instructions: [
                'Place the barbell across your upper back (traps), not your neck.',
                'Stand with feet shoulder-width apart, toes slightly pointed out.',
                'Break at the hips and knees simultaneously to lower your body.',
                'Keep your chest up and back straight as you descend until your thighs are parallel to the floor.',
                'Drive through your heels to stand back up, squeezing your glutes at the top.',
                'Keep your knees in line with your toes throughout the movement.'
            ]
        },
        {
            name: 'Romanian Deadlifts',
            sets: 3, reps: '10-12', rest: '90s',
            image: '/assets/deadlift_illustration_1763936572131.png',
            instructions: [
                'Hold a barbell with an overhand grip at thigh level.',
                'Keep a slight bend in your knees but do not squat.',
                'Hinge at your hips, pushing your butt back as you lower the bar along your legs.',
                'Lower until you feel a deep stretch in your hamstrings (usually mid-shin).',
                'Drive your hips forward to return to the standing position.',
                'Keep your back perfectly flat throughout.'
            ]
        },
        {
            name: 'Leg Press',
            sets: 3, reps: '12-15', rest: '75s',
            image: '/assets/leg_press_hd.png',
            instructions: [
                'Sit in the leg press machine and place your feet shoulder-width apart on the platform.',
                'Lower the platform until your knees are at a 90-degree angle.',
                'Press the platform back up by driving through your heels.',
                'Do not lock your knees at the top of the movement.',
                'Keep your lower back pressed against the seat at all times.'
            ]
        },
        {
            name: 'Leg Curls',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/leg_curls.png',
            instructions: [
                'Lie face down on the leg curl machine with your ankles under the pad.',
                'Curl your legs up towards your glutes as far as possible.',
                'Squeeze your hamstrings hard at the top.',
                'Lower the weight back down slowly and under control.',
                'Keep your hips pressed into the bench.'
            ]
        },
        {
            name: 'Walking Lunges',
            sets: 3, reps: '12 each', rest: '60s',
            image: '/assets/walking_lunges_hd.png',
            instructions: [
                'Stand tall with dumbbells in each hand or a barbell on your back.',
                'Step forward with one leg and lower your hips until both knees are bent at 90 degrees.',
                'Your back knee should almost touch the ground.',
                'Drive through the front heel to bring your back foot forward into the next step.',
                'Keep your torso upright and core engaged.'
            ]
        },
        {
            name: 'Leg Extensions',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/leg_extensions_hd.png',
            instructions: [
                'Sit on the machine with your ankles behind the pad.',
                'Extend your legs until they are straight, squeezing your quads hard.',
                'Hold the contraction for a second at the top.',
                'Lower the weight back down slowly.',
                'Do not use momentum to kick the weight up.'
            ]
        },
        {
            name: 'Calf Raises',
            sets: 4, reps: '15-20', rest: '60s',
            image: '/assets/calf_raises_hd.png',
            instructions: [
                'Stand on the edge of a step or calf raise machine block.',
                'Lower your heels as far as possible to get a full stretch.',
                'Raise your heels as high as possible, squeezing your calves.',
                'Pause at the top for a second.',
                'Control the descent on every rep.'
            ]
        },
        {
            name: 'Bulgarian Split Squats',
            sets: 3, reps: '10 each', rest: '60s',
            image: '/assets/bulgarian_split_squats.png',
            instructions: [
                'Stand facing away from a bench with one foot resting on it behind you.',
                'Lower your hips until your back knee is close to the ground.',
                'Keep your front knee aligned with your toes.',
                'Drive through your front heel to stand back up.',
                'Keep your chest up and torso upright.'
            ]
        },
        {
            name: 'Goblet Squats',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/squat_illustration_1763936545702.png',
            instructions: [
                'Hold a dumbbell or kettlebell close to your chest with both hands.',
                'Squat down, keeping your elbows inside your knees.',
                'Go as deep as your mobility allows.',
                'Push back up to the starting position.',
                'This is great for learning squat form and core stability.'
            ]
        },
        {
            name: 'Sumo Deadlifts',
            sets: 3, reps: '8-10', rest: '90s',
            image: '/assets/deadlift_illustration_1763936572131.png',
            instructions: [
                'Take a very wide stance with your toes pointing out.',
                'Grip the bar with your hands inside your legs.',
                'Keep your chest up and hips lower than in a conventional deadlift.',
                'Drive through your legs to lift the bar.',
                'This variation targets the glutes and inner thighs more.'
            ]
        },
        {
            name: 'Box Jumps',
            sets: 3, reps: '10-12', rest: '90s',
            image: '/assets/box_jumps.png',
            instructions: [
                'Stand in front of a sturdy box.',
                'Squat down slightly and swing your arms back.',
                'Explode up and land softly on the box with both feet.',
                'Stand up tall to complete the rep.',
                'Step down carefully one foot at a time.'
            ]
        },
        {
            name: 'Hack Squats',
            sets: 3, reps: '10-12', rest: '90s',
            image: '/assets/squat_illustration_1763936545702.png',
            instructions: [
                'Position yourself in the hack squat machine with your shoulders against the pads.',
                'Place your feet shoulder-width apart on the platform.',
                'Lower the weight until your thighs are parallel to the platform.',
                'Press back up through your heels.',
                'This isolates the quads effectively.'
            ]
        },
        {
            name: 'Glute Bridges',
            sets: 3, reps: '15-20', rest: '60s',
            image: '/assets/glute_bridges_hd.png',
            instructions: [
                'Lie on your back with your knees bent and feet flat on the floor.',
                'Drive through your heels to lift your hips towards the ceiling.',
                'Squeeze your glutes hard at the top.',
                'Lower your hips back down but don\'t let them touch the floor.',
                'Keep your core engaged to protect your lower back.'
            ]
        },
        {
            name: 'Step-Ups',
            sets: 3, reps: '12 each', rest: '60s',
            image: '/assets/step_ups_hd.png',
            instructions: [
                'Stand in front of a bench or box.',
                'Place one foot firmly on the box.',
                'Drive through that heel to lift your body up until the leg is straight.',
                'Lower yourself back down with control.',
                'Complete all reps on one leg before switching.'
            ]
        },
        {
            name: 'Sissy Squats',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/squat_illustration_1763936545702.png',
            instructions: [
                'Stand with feet shoulder-width apart, holding onto a support if needed.',
                'Lean your torso back while bending your knees and pushing them forward.',
                'Go as low as you can while maintaining balance.',
                'Push back up using your quads.',
                'This creates an intense stretch in the quadriceps.'
            ]
        },
        {
            name: 'Nordic Curls',
            sets: 3, reps: '5-8', rest: '90s',
            image: '/assets/nordic_curls_hd.png',
            instructions: [
                'Kneel on a pad with your ankles secured (by a partner or machine).',
                'Lower your torso forward slowly, using your hamstrings to control the descent.',
                'Go as far as you can control, then use your hands to push back up if needed.',
                'This is an advanced hamstring exercise.'
            ]
        },
        {
            name: 'Front Squats',
            sets: 3, reps: '10-12', rest: '90s',
            image: '/assets/squat_illustration_1763936545702.png',
            instructions: [
                'Rest the barbell across your front deltoids, holding it with a clean grip or crossed arms.',
                'Keep your elbows high throughout the movement.',
                'Squat down, keeping your torso as upright as possible.',
                'Drive back up through your heels.',
                'This places more emphasis on the quads and upper back.'
            ]
        },
        {
            name: 'Seated Calf Raises',
            sets: 4, reps: '15-20', rest: '60s',
            image: '/assets/seated_calf_raises_hd.png',
            instructions: [
                'Sit in the machine with the pad resting on your lower thighs.',
                'Lower your heels to get a deep stretch.',
                'Raise your heels as high as possible.',
                'This variation targets the soleus muscle (underneath the gastrocnemius).'
            ]
        },
        {
            name: 'Single Leg Press',
            sets: 3, reps: '10 each', rest: '60s',
            image: '/assets/single_leg_press_hd.png',
            instructions: [
                'Position yourself in the leg press machine.',
                'Place one foot on the platform and lower the weight.',
                'Press back up with that leg.',
                'This helps correct muscle imbalances between legs.'
            ]
        },
        {
            name: 'Pistol Squats',
            sets: 3, reps: '5-8 each', rest: '90s',
            image: '/assets/squat_illustration_1763936545702.png',
            instructions: [
                'Stand on one leg with the other leg extended in front of you.',
                'Squat down on the standing leg as deep as possible.',
                'Keep your arms forward for balance.',
                'Drive back up to the starting position.',
                'This requires significant strength, balance, and mobility.'
            ]
        }
    ],
    Shoulders: [
        {
            name: 'Overhead Press',
            sets: 4, reps: '10-12', rest: '75s',
            image: '/assets/overhead_press_hd.png',
            instructions: [
                'Stand with the barbell resting on your front delts.',
                'Grip the bar just outside shoulder width.',
                'Press the bar straight up over your head, moving your head back slightly to clear the path.',
                'Lock out your arms at the top and shrug your shoulders slightly.',
                'Lower the bar back to your shoulders with control.'
            ]
        },
        {
            name: 'Lateral Raises',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/lateral_raises_hd.png',
            instructions: [
                'Stand holding dumbbells at your sides.',
                'Raise your arms out to the sides until they are parallel to the floor.',
                'Keep a slight bend in your elbows and lead with your elbows.',
                'Lower the weights back down slowly.',
                'Avoid swinging your body to lift the weights.'
            ]
        },
        {
            name: 'Front Raises',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/front_raises_hd.png',
            instructions: [
                'Hold dumbbells in front of your thighs, palms facing back.',
                'Raise the weights straight out in front of you to shoulder height.',
                'Pause briefly at the top.',
                'Lower the weights back down under control.',
                'You can lift both arms at once or alternate.'
            ]
        },
        {
            name: 'Face Pulls',
            sets: 3, reps: '15-20', rest: '60s',
            image: '/assets/face_pulls_hd.png',
            instructions: [
                'Set a rope attachment at face height on a cable machine.',
                'Pull the rope towards your face, separating your hands.',
                'Focus on pulling with your rear delts and rotating your shoulders.',
                'Squeeze your upper back at the peak contraction.',
                'Return to the start slowly.'
            ]
        },
        {
            name: 'Arnold Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/arnold_press_hd.png',
            instructions: [
                'Sit holding dumbbells in front of your shoulders, palms facing you.',
                'Press the weights up while rotating your palms to face forward.',
                'Finish with arms extended overhead.',
                'Reverse the rotation as you lower the weights back to the start.',
                'This hits all three heads of the deltoid.'
            ]
        },
        {
            name: 'Upright Rows',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/upright_rows_hd.png',
            instructions: [
                'Hold a barbell or dumbbells with an overhand grip in front of your thighs.',
                'Pull the weight straight up towards your chin, leading with your elbows.',
                'Keep the weight close to your body.',
                'Lower the weight back down slowly.',
                'Stop if you feel any shoulder pain.'
            ]
        },
        {
            name: 'Cable Lateral Raises',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/cable_lateral_raises_hd.png',
            instructions: [
                'Stand sideways to a low pulley cable.',
                'Grab the handle with the outside hand.',
                'Raise your arm out to the side until parallel to the floor.',
                'This provides constant tension throughout the movement.',
                'Lower slowly and repeat.'
            ]
        },
        {
            name: 'Reverse Flyes',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/reverse_flyes_hd.png',
            instructions: [
                'Bend at the waist until your torso is nearly parallel to the floor.',
                'Hold dumbbells with palms facing each other.',
                'Raise your arms out to the sides, squeezing your rear delts.',
                'Keep a slight bend in your elbows.',
                'Lower the weights back down slowly.'
            ]
        },
        {
            name: 'Pike Push-Ups',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/pike_pushups_hd.png',
            instructions: [
                'Start in a push-up position, then lift your hips high to form an inverted V.',
                'Lower your head towards the ground by bending your elbows.',
                'Press back up to the starting position.',
                'This mimics an overhead press using bodyweight.'
            ]
        },
        {
            name: 'Landmine Press',
            sets: 3, reps: '10 each', rest: '75s',
            image: '/assets/landmine_press_hd.png',
            instructions: [
                'Stand holding the end of a landmine bar at shoulder height.',
                'Press the bar up and forward until your arm is extended.',
                'Lean slightly into the press.',
                'Lower the bar back to your shoulder with control.'
            ]
        },
        {
            name: 'Behind Neck Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/behind_neck_press_hd.png',
            instructions: [
                'Sit with a barbell resting on your upper traps.',
                'Press the bar straight up overhead.',
                'Lower the bar carefully behind your head to ear level.',
                'Only perform this if you have good shoulder mobility.'
            ]
        },
        {
            name: 'Plate Raises',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/plate_raises_hd.png',
            instructions: [
                'Hold a weight plate with both hands at the 3 and 9 o\'clock positions.',
                'Raise the plate straight out in front of you to eye level.',
                'Lower it back down slowly.',
                'Keep your arms straight throughout.'
            ]
        },
        {
            name: 'Cable Face Pulls',
            sets: 3, reps: '15-20', rest: '60s',
            image: '/assets/cable_face_pulls_hd.png',
            instructions: [
                'Use a rope attachment set at face height.',
                'Pull the rope to your forehead, pulling your hands apart.',
                'Rotate your shoulders externally.',
                'Squeeze your upper back hard.'
            ]
        },
        {
            name: 'Dumbbell Clean and Press',
            sets: 3, reps: '8-10', rest: '90s',
            image: '/assets/dumbbell_clean_press_hd.png',
            instructions: [
                'Start with dumbbells at your sides.',
                'Explosively clean them up to your shoulders.',
                'Press them overhead immediately.',
                'Lower them back to the start position.',
                'This is a full-body power move.'
            ]
        },
        {
            name: 'Bent Over Lateral Raises',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/bent_lateral_raises_hd.png',
            instructions: [
                'Hinge forward at the hips with a flat back.',
                'Raise dumbbells out to the sides.',
                'Focus on the rear delts, not the back.',
                'Control the weight on the way down.'
            ]
        },
        {
            name: 'Handstand Push-Ups',
            sets: 3, reps: '5-10', rest: '90s',
            image: '/assets/handstand_pushups_hd.png',
            instructions: [
                'Kick up into a handstand against a wall.',
                'Lower your head to the floor.',
                'Press back up to full extension.',
                'This is an advanced bodyweight shoulder exercise.'
            ]
        },
        {
            name: 'Y-Raises',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/y_raises_hd.png',
            instructions: [
                'Lie face down on an incline bench or bend over.',
                'Raise your arms up and out to form a Y shape.',
                'Keep your thumbs pointing up.',
                'This strengthens the lower traps and shoulders.'
            ]
        },
        {
            name: 'Single Arm Press',
            sets: 3, reps: '10 each', rest: '75s',
            image: '/assets/single_arm_press_hd.png',
            instructions: [
                'Stand holding one dumbbell at shoulder height.',
                'Press it overhead while keeping your core tight to resist leaning.',
                'Lower it back down with control.',
                'Complete all reps on one side before switching.'
            ]
        },
        {
            name: 'Bus Drivers',
            sets: 3, reps: '15-20', rest: '60s',
            image: '/assets/bus_drivers_hd.png',
            instructions: [
                'Hold a plate with arms extended in front of you.',
                'Rotate the plate left and right like a steering wheel.',
                'Keep your arms straight and shoulders engaged.',
                'This builds shoulder endurance.'
            ]
        },
        {
            name: 'Dumbbell Shoulder Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/dumbbell_shoulder_press_hd.png',
            instructions: [
                'Sit on a bench with back support holding dumbbells at shoulder height.',
                'Palms should be facing forward.',
                'Press the weights up until your arms are fully extended.',
                'Lower the weights back down slowly to the starting position.',
                'Keep your back pressed against the pad.'
            ]
        },
        {
            name: 'Barbell Shrugs',
            sets: 3, reps: '12-15', rest: '75s',
            image: '/assets/deadlift_illustration_1763936572131.png',
            instructions: [
                'Hold a heavy barbell with arms hanging straight down.',
                'Shrug your shoulders straight up towards your ears.',
                'Squeeze your traps at the top.',
                'Lower the weight back down fully.'
            ]
        }
    ],
    Triceps: [
        {
            name: 'Rope Pushdowns',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/tricep_pushdowns_hd.png',
            instructions: [
                'Attach a rope to a high pulley.',
                'Grab the ends and pull down until your elbows are by your sides.',
                'Push the rope down, spreading your hands apart at the bottom.',
                'Squeeze your triceps hard.',
                'Return to the starting position without moving your elbows.'
            ]
        },
        {
            name: 'Overhead Extension',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/overhead_extension_hd.png',
            instructions: [
                'Sit or stand holding a dumbbell with both hands overhead.',
                'Lower the dumbbell behind your head by bending your elbows.',
                'Keep your elbows pointing forward and close to your head.',
                'Extend your arms back up to the top.',
                'Feel the stretch in the long head of the triceps.'
            ]
        },
        {
            name: 'Close Grip Bench',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/close_grip_bench_hd.png',
            instructions: [
                'Lie on a bench and grip the bar shoulder-width apart.',
                'Lower the bar to your lower chest, keeping elbows tucked.',
                'Press back up explosively.',
                'This allows for heavy loading of the triceps.'
            ]
        },
        {
            name: 'Tricep Dips',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/tricep_dips_hd.png',
            instructions: [
                'Support yourself on parallel bars with arms straight.',
                'Lower your body by bending your elbows, keeping your torso upright.',
                'Go down until your elbows are at 90 degrees.',
                'Push back up to the top.',
                'Avoid leaning forward to keep focus on triceps.'
            ]
        },
        {
            name: 'Skull Crushers',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/skull_crushers_hd.png',
            instructions: [
                'Lie on a bench holding an EZ bar or dumbbells.',
                'Extend arms straight up.',
                'Lower the weight to your forehead by bending only at the elbows.',
                'Extend the weight back up.',
                'Keep your upper arms stationary throughout.'
            ]
        },
        {
            name: 'Diamond Push-Ups',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/diamond_pushups_hd.png',
            instructions: [
                'Place hands close together forming a diamond shape.',
                'Lower your chest to your hands.',
                'Push back up, squeezing your triceps.',
                'Keep your elbows close to your body.'
            ]
        },
        {
            name: 'Overhead Cable Extension',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/overhead_cable_ext_hd.png',
            instructions: [
                'Attach a rope to a low pulley and face away from the machine.',
                'Pull the rope overhead with elbows bent.',
                'Extend your arms straight up.',
                'Control the weight back down behind your head.',
                'This provides constant tension on the stretch.'
            ]
        },
        {
            name: 'Kickbacks',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/tricep_kickbacks.png',
            instructions: [
                'Lean forward with a dumbbell in one hand, upper arm parallel to floor.',
                'Extend your arm back until it is straight.',
                'Squeeze the tricep hard at the top.',
                'Lower the weight back to 90 degrees only.',
                'Don\'t use momentum.'
            ]
        },
        {
            name: 'Single Arm Pushdowns',
            sets: 3, reps: '12 each', rest: '60s',
            image: '/assets/single_arm_pushdowns.png',
            instructions: [
                'Use a single handle on a high pulley.',
                'Push down with one arm, keeping your elbow by your side.',
                'Fully extend the arm.',
                'This helps isolate each tricep individually.'
            ]
        },
        {
            name: 'Bench Dips',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/bench_dips.png',
            instructions: [
                'Place your hands on a bench behind you and feet on the floor.',
                'Lower your hips towards the floor.',
                'Push back up until arms are straight.',
                'Place weight on your lap to increase difficulty.'
            ]
        },
        {
            name: 'JM Press',
            sets: 3, reps: '8-10', rest: '75s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Lower the bar towards your neck/upper chest.',
                'Allow your elbows to travel forward slightly.',
                'Press the bar back up.',
                'This is a hybrid between a close grip press and a skull crusher.'
            ]
        },
        {
            name: 'Cable Overhead Extension',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/cable_overhead_extension.png',
            instructions: [
                'Set pulley to high position with a rope.',
                'Turn away and lean forward, holding rope behind head.',
                'Extend arms forward.',
                'This mimics the overhead extension but with cables.'
            ]
        },
        {
            name: 'Board Press',
            sets: 3, reps: '8-10', rest: '90s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Place a board or block on your chest.',
                'Lower the bar to the board.',
                'Press back up.',
                'This reduces range of motion to overload the triceps.'
            ]
        },
        {
            name: 'Resistance Band Extensions',
            sets: 3, reps: '15-20', rest: '45s',
            image: '/assets/band_extensions.png',
            instructions: [
                'Stand on a resistance band.',
                'Hold the other end behind your head.',
                'Extend your arms up.',
                'Great for high rep burnouts.'
            ]
        },
        {
            name: 'Close Grip Push-Ups',
            sets: 3, reps: '15-20', rest: '60s',
            image: '/assets/close_grip_pushups.png',
            instructions: [
                'Perform push-ups with hands inside shoulder width.',
                'Keep elbows tucked close to ribs.',
                'Press up explosively.',
                'Focus on pushing with the triceps.'
            ]
        },
        {
            name: 'Tate Press',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/incline_dumbbell_press_1763936904160.png',
            instructions: [
                'Lie on a bench holding dumbbells with palms facing feet.',
                'Lower the inner heads of the dumbbells to your chest.',
                'Elbows should flare out.',
                'Extend the arms back up.'
            ]
        },
        {
            name: 'Single Arm Overhead Extension',
            sets: 3, reps: '10 each', rest: '60s',
            image: '/assets/single_arm_overhead_ext.png',
            instructions: [
                'Sit or stand with one dumbbell overhead.',
                'Lower it behind your head.',
                'Extend back up.',
                'Support your elbow with the other hand if needed.'
            ]
        },
        {
            name: 'Bodyweight Skull Crushers',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/bodyweight_skull_crushers.png',
            instructions: [
                'Place hands on a bar at waist height.',
                'Lower your forehead to the bar by bending elbows.',
                'Push back away from the bar.',
                'Adjust foot position to change difficulty.'
            ]
        },
        {
            name: 'Reverse Grip Pushdowns',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/reverse_grip_pushdowns.png',
            instructions: [
                'Hold the bar with palms facing up.',
                'Push down until arms are straight.',
                'This targets the medial head of the triceps.',
                'Control the weight on the way up.'
            ]
        },
        {
            name: 'California Press',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/bench_press_illustration_1763936559519.png',
            instructions: [
                'Lower the bar like a close grip press.',
                'At the bottom, roll it back slightly like a skull crusher.',
                'Press it back up.',
                'A complex movement for mass.'
            ]
        }
    ],
    Biceps: [
        {
            name: 'Barbell Curls',
            sets: 4, reps: '10-12', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Stand tall holding a barbell with a shoulder-width underhand grip.',
                'Keep your elbows close to your torso at all times.',
                'Curl the weights up towards your shoulders while contracting your biceps.',
                'Pause at the top and squeeze hard.',
                'Lower the bar back down slowly to the starting position.'
            ]
        },
        {
            name: 'Hammer Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/hammer_curls_hd.png',
            instructions: [
                'Hold a dumbbell in each hand with palms facing your torso (neutral grip).',
                'Curl the weights up while keeping your palms facing each other.',
                'This targets the brachialis and brachioradialis.',
                'Lower the weights back down with control.'
            ]
        },
        {
            name: 'Cable Curls',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Attach a straight bar to a low pulley.',
                'Stand up straight holding the bar with an underhand grip.',
                'Curl the bar up towards your chest.',
                'Keep constant tension on the biceps throughout the movement.',
                'Lower slowly.'
            ]
        },
        {
            name: 'Concentration Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/concentration_curls_hd.png',
            instructions: [
                'Sit on a bench and rest your elbow on the inner part of your thigh.',
                'Hold a dumbbell with a supinated grip.',
                'Curl the weight up towards your shoulder without moving your upper arm.',
                'Squeeze at the top, then lower slowly.',
                'Focus entirely on the bicep contraction.'
            ]
        },
        {
            name: 'Preacher Curls',
            sets: 3, reps: '10-12', rest: '75s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Sit at a preacher bench and place your arms over the pad.',
                'Grip the EZ bar or dumbbells.',
                'Curl the weight up until your biceps are fully contracted.',
                'Lower the weight until your arms are fully extended.',
                'This eliminates momentum completely.'
            ]
        },
        {
            name: 'Incline Dumbbell Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Sit back on an incline bench (about 45 degrees).',
                'Let your arms hang straight down behind your torso.',
                'Curl the dumbbells up, keeping your elbows back.',
                'This places a great stretch on the long head of the biceps.',
                'Lower slowly to full extension.'
            ]
        },
        {
            name: 'Zottman Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Curl the weights up with palms facing up.',
                'At the top, rotate your wrists so palms face down.',
                'Lower the weights slowly with this reverse grip.',
                'Rotate back to palms up at the bottom.',
                'Great for biceps and forearms.'
            ]
        },
        {
            name: 'Spider Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Lie face down on an incline bench.',
                'Let your arms hang straight down holding a barbell or dumbbells.',
                'Curl the weight up towards your shoulders.',
                'Squeeze hard at the top.',
                'This emphasizes the short head of the biceps.'
            ]
        },
        {
            name: 'Drag Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Hold a barbell against your thighs.',
                'Curl the bar up by dragging it along your torso.',
                'Pull your elbows back as you lift.',
                'This removes the front delt from the movement.',
                'Squeeze the peak contraction.'
            ]
        },
        {
            name: 'Cable Hammer Curls',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Use a rope attachment on a low pulley.',
                'Hold the rope with a neutral grip.',
                'Curl up towards your shoulders.',
                'Keep your elbows by your sides.',
                'Great for constant tension.'
            ]
        },
        {
            name: '21s',
            sets: 3, reps: '21', rest: '90s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Perform 7 reps from the bottom to halfway up.',
                'Perform 7 reps from halfway to the top.',
                'Perform 7 full range of motion reps.',
                'Do this all in one set without resting.',
                'Intense pump guaranteed.'
            ]
        },
        {
            name: 'Reverse Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Hold a barbell with an overhand grip.',
                'Curl the bar up towards your shoulders.',
                'Keep your elbows tucked.',
                'This targets the brachialis and forearm extensors.'
            ]
        },
        {
            name: 'Cross Body Curls',
            sets: 3, reps: '10 each', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Hold dumbbells at your sides.',
                'Curl one dumbbell across your body towards the opposite shoulder.',
                'Lower it back down and switch sides.',
                'Targets the long head and brachialis.'
            ]
        },
        {
            name: 'High Cable Curls',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Stand between two high pulleys holding the handles.',
                'Curl your hands towards your ears.',
                'Keep your elbows high and stationary.',
                'Squeeze your biceps in a double bicep pose position.'
            ]
        },
        {
            name: 'Band Curls',
            sets: 3, reps: '15-20', rest: '45s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Stand on the center of a resistance band.',
                'Hold the ends and curl up.',
                'The resistance increases as you curl higher.',
                'Great for a finisher.'
            ]
        },
        {
            name: 'Chin-Ups',
            sets: 3, reps: '8-12', rest: '90s',
            image: '/assets/chin_ups.png',
            instructions: [
                'Hang from a bar with an underhand grip, shoulder-width apart.',
                'Pull yourself up until your chin is over the bar.',
                'Focus on pulling with your biceps.',
                'Lower yourself down fully.'
            ]
        },
        {
            name: 'Machine Curls',
            sets: 3, reps: '12-15', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Adjust the seat so your armpits are over the pad.',
                'Grip the handles and curl towards you.',
                'Control the negative portion of the rep.',
                'Good for isolating the biceps safely.'
            ]
        },
        {
            name: 'Waiter Curls',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Hold the top of a dumbbell with both hands, palms facing up.',
                'Curl the weight straight up.',
                'Keep your palms flat against the weight plate.',
                'Targets the peak of the bicep.'
            ]
        },
        {
            name: 'Partial Reps',
            sets: 3, reps: '20-30', rest: '60s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Perform curls using only the middle range of motion.',
                'Keep constant tension on the muscle.',
                'Do high reps to burn out the muscle.',
                'Best done at the end of a workout.'
            ]
        },
        {
            name: 'Static Hold Curls',
            sets: 3, reps: '8+10s hold', rest: '75s',
            image: '/assets/dumbbell_curl_illustration_1763936598010.png',
            instructions: [
                'Perform 8 regular curls.',
                'On the last rep, hold the weight at 90 degrees.',
                'Hold for 10 seconds or as long as possible.',
                'Fights gravity and builds endurance.'
            ]
        }
    ],
    Abs: [
        {
            name: 'Cable Crunches',
            sets: 3, reps: '15-20', rest: '45s',
            image: '/assets/cable_crunches_hd.png',
            instructions: [
                'Kneel below a high pulley with a rope attachment.',
                'Hold the rope behind your head.',
                'Crunch your torso down towards your knees.',
                'Keep your hips stationary; don\'t sit back.',
                'Squeeze your abs hard at the bottom.'
            ]
        },
        {
            name: 'Hanging Leg Raises',
            sets: 3, reps: '10-15', rest: '45s',
            image: '/assets/hanging_leg_raises.png',
            instructions: [
                'Hang from a pull-up bar with legs straight.',
                'Raise your legs until they are parallel to the floor (or higher).',
                'Control the descent to avoid swinging.',
                'Engage your core to lift, not your hip flexors.'
            ]
        },
        {
            name: 'Planks',
            sets: 3, reps: '45-60s', rest: '45s',
            image: '/assets/plank.png',
            instructions: [
                'Get into a forearm plank position.',
                'Keep your body in a straight line from head to heels.',
                'Engage your core, glutes, and quads.',
                'Hold this position without letting your hips sag or pike.'
            ]
        },
        {
            name: 'Russian Twists',
            sets: 3, reps: '20 each', rest: '45s',
            image: '/assets/russian_twists.png',
            instructions: [
                'Sit on the floor with knees bent and feet slightly off the ground.',
                'Lean back slightly to engage your core.',
                'Twist your torso from side to side, touching the floor beside you.',
                'Hold a weight for added difficulty.'
            ]
        },
        {
            name: 'Bicycle Crunches',
            sets: 3, reps: '20 each', rest: '45s',
            image: '/assets/bicycle_crunches.png',
            instructions: [
                'Lie on your back with hands behind your head.',
                'Bring one knee towards your chest while twisting to touch it with the opposite elbow.',
                'Extend the other leg straight out.',
                'Alternate sides in a pedaling motion.'
            ]
        },
        {
            name: 'Ab Wheel Rollouts',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/ab_wheel.png',
            instructions: [
                'Kneel on the floor holding an ab wheel.',
                'Roll the wheel forward, extending your body as far as you can control.',
                'Keep your core tight and back straight.',
                'Pull yourself back to the starting position using your abs.'
            ]
        },
        {
            name: 'Mountain Climbers',
            sets: 3, reps: '30-40', rest: '45s',
            image: '/assets/mountain_climbers_illustration_1763936585262.png',
            instructions: [
                'Start in a high plank position.',
                'Drive one knee towards your chest, then quickly switch legs.',
                'Keep your hips down and core engaged.',
                'Move as fast as you can while maintaining form.'
            ]
        },
        {
            name: 'Dead Bugs',
            sets: 3, reps: '12 each', rest: '45s',
            image: '/assets/ dead_bugs.png',
            instructions: [
                'Lie on your back with arms extended up and legs in tabletop position.',
                'Lower your right arm behind your head and extend your left leg straight out.',
                'Keep your lower back pressed into the floor.',
                'Return to center and switch sides.'
            ]
        },
        {
            name: 'V-Ups',
            sets: 3, reps: '10-15', rest: '60s',
            image: '/assets/v_ups.png',
            instructions: [
                'Lie flat on your back with arms extended overhead.',
                'Simultaneously lift your legs and torso to touch your toes.',
                'Form a V shape with your body at the top.',
                'Lower back down with control.'
            ]
        },
        {
            name: 'Bird Dogs',
            sets: 3, reps: '12 each', rest: '45s',
            image: '/assets/bird_dogs.png',
            instructions: [
                'Start on your hands and knees.',
                'Extend your right arm forward and left leg back simultaneously.',
                'Hold for a second, keeping your body stable.',
                'Return to start and switch sides.'
            ]
        },
        {
            name: 'Side Planks',
            sets: 3, reps: '30-45s each', rest: '45s',
            image: '/assets/side_plank.png',
            instructions: [
                'Lie on your side supported by your forearm.',
                'Lift your hips until your body forms a straight line.',
                'Hold this position, engaging your obliques.',
                'Repeat on the other side.'
            ]
        },
        {
            name: 'Leg Raises',
            sets: 3, reps: '12-15', rest: '45s',
            image: '/assets/leg_raises.png',
            instructions: [
                'Lie on your back with hands under your hips for support.',
                'Keep your legs straight and lift them until they are vertical.',
                'Lower them back down slowly without letting them touch the floor.',
                'Focus on using your lower abs.'
            ]
        },
        {
            name: 'Pallof Press',
            sets: 3, reps: '12 each', rest: '60s',
            image: '/assets/pallof_press.png',
            instructions: [
                'Stand sideways to a cable machine holding a handle at chest height.',
                'Press the handle straight out in front of you.',
                'Resist the cable pulling you towards the machine.',
                'Hold for a second, then return to your chest.'
            ]
        },
        {
            name: 'Hollow Body Hold',
            sets: 3, reps: '30-45s', rest: '45s',
            image: '/assets/hollow_body_hold.png',
            instructions: [
                'Lie on your back.',
                'Lift your shoulders and legs off the ground.',
                'Press your lower back firmly into the floor.',
                'Hold this "banana" shape with your core tight.'
            ]
        },
        {
            name: 'Windshield Wipers',
            sets: 3, reps: '10 each', rest: '60s',
            image: '/assets/windshield_wipers.png',
            instructions: [
                'Lie on your back with legs straight up (or hang from a bar).',
                'Lower your legs to one side, then the other.',
                'Control the movement with your obliques.',
                'Keep your shoulders on the ground.'
            ]
        },
        {
            name: 'Dragon Flags',
            sets: 3, reps: '5-8', rest: '90s',
            image: '/assets/dragon_flags.png',
            instructions: [
                'Lie on a bench holding the edge behind your head.',
                'Lift your entire body up until it is vertical, resting on your shoulders.',
                'Lower your body down slowly as straight as possible.',
                'This requires immense core strength.'
            ]
        },
        {
            name: 'Decline Sit-Ups',
            sets: 3, reps: '15-20', rest: '60s',
            image: '/assets/decline_sit_ups_hd.png',
            instructions: [
                'Secure your legs on a decline bench.',
                'Lie back, then sit up all the way.',
                'Control the descent.',
                'Hold a weight plate against your chest for added resistance.'
            ]
        },
        {
            name: 'Toe Touches',
            sets: 3, reps: '15-20', rest: '45s',
            image: '/assets/toe_touches.png',
            instructions: [
                'Lie on your back with legs straight up in the air.',
                'Reach your hands towards your toes, lifting your shoulders off the ground.',
                'Crunch your upper abs at the top.',
                'Lower back down.'
            ]
        },
        {
            name: 'Flutter Kicks',
            sets: 3, reps: '30-60s', rest: '45s',
            image: '/assets/flutter_kicks.png',
            instructions: [
                'Lie on your back with legs extended and slightly off the floor.',
                'Kick your legs up and down in a small, rapid motion.',
                'Keep your lower back pressed into the floor.',
                'Keep your core engaged throughout.'
            ]
        },
        {
            name: 'Plank to Pike',
            sets: 3, reps: '10-12', rest: '60s',
            image: '/assets/plank_to_pike.png',
            instructions: [
                'Start in a forearm plank position.',
                'Lift your hips up towards the ceiling into a pike position.',
                'Return to the flat plank position.',
                'This adds a dynamic component to the standard plank.'
            ]
        }
    ],
};

export const getExercisesForDay = (dayId) => {
    const day = WORKOUT_SCHEDULE.find(d => d.id === dayId);
    if (!day || !day.exercises || day.exercises.length === 0) return [];

    const exercises = [];
    const allExercises = Object.values(EXERCISES).flat();

    day.exercises.forEach(exerciseName => {
        // Try exact match first
        let found = allExercises.find(ex => ex.name === exerciseName);

        // If not found, try partial match
        if (!found) {
            found = allExercises.find(ex => ex.name.includes(exerciseName) || exerciseName.includes(ex.name));
        }

        if (found) {
            exercises.push({
                ...found,
                id: found.name.replace(/\s+/g, '-').toLowerCase(),
                category: Object.keys(EXERCISES).find(key => EXERCISES[key].some(e => e.name === found.name)) || 'General'
            });
        } else {
            // Log missing exercises
            console.warn(`Exercise not found: ${exerciseName}`);
        }
    });

    return exercises;
};

import os

# Image dimensions
WIDTH = 1024
HEIGHT = 1024
ROWS = 6
COLS = 5

CELL_W = WIDTH // COLS
CELL_H = HEIGHT // ROWS

input_file = "public/assets/workout_sprites.jpg"
output_dir = "public/assets/sliced"

cmds = []

count = 0
for r in range(ROWS):
    for c in range(COLS):
        count += 1
        x = c * CELL_W
        y = r * CELL_H
        
        # sips --cropToHeightWidth <height> <width> --cropOffset <y> <x> <input> --out <output>
        # Note: sips cropOffset is y x (top left)
        
        out_file = f"{output_dir}/ex_{count:02d}.jpg"
        cmd = f"sips --cropToHeightWidth {CELL_H} {CELL_W} --cropOffset {y} {x} {input_file} --out {out_file}"
        cmds.append(cmd)

print(f"Generated {len(cmds)} commands.")

# Execute
for cmd in cmds:
    os.system(cmd)

import json
import re

content_file = r'C:\Users\bhupe\.gemini\antigravity\brain\9f7067ee-81a0-4bb1-874f-8c5db7d94d6c\.system_generated\steps\32\content.md'
with open(content_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Extract script blocks
matches = re.finditer(r'([^\n]+)\n<script type="application/ld\+json">\n(.*?)\n</script>', text, re.DOTALL)

schemas = {}
for m in matches:
    name = m.group(1).strip().replace('\ufeff', '')
    schema_str = m.group(2).strip()
    try:
        schema_json = json.loads(schema_str)
        schemas[name] = schema_json
    except Exception as e:
        print(f'Error parsing schema for {name}: {e}')

print('Extracted schemas for:', list(schemas.keys()))

with open('schemas_dump.json', 'w', encoding='utf-8') as f:
    json.dump(schemas, f, indent=2)

# Load gameSeoContent.json and inject schemas
with open('gameSeoContent.json', 'r', encoding='utf-8') as f:
    game_seo = json.load(f)

# Name mappings to game slugs
slug_map = {
    "fnaf": "fnaf",
    "Shell Shockers": "shell-shockers",
    "Slither.io": "slither",
    "Gacha Life 2": "gacha-life-2",
    "Gacha Life": "gacha-life",
    "Hazmob FPS": "hazmob-fps",
    "BLOXD.io": "bloxd",
    "ZombsRoyale.io": "zombsroyale",
    "CHESS": "chess",
    "LUDO KING": "ludo-king",
    "sudoku": "sudoku",
    "Block Puzzle Master": "block-puzzle-master",
    "Gacha Club": "gacha-club",
    "Gacha Life Dress Up": "gacha-life-dress-up",
    "Gacha Life Maker": "gacha-life-maker"
}

for name, slug in slug_map.items():
    if name in schemas and slug in game_seo:
        game_seo[slug]['schema'] = schemas[name]

with open('gameSeoContent.json', 'w', encoding='utf-8') as f:
    json.dump(game_seo, f, indent=2)

# Save Home schema separately
if 'Home' in schemas:
    with open('homeSchema.json', 'w', encoding='utf-8') as f:
        json.dump(schemas['Home'], f, indent=2)

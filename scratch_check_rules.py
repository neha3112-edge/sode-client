with open('sode-client-final/src/data/landing/iim.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if any(k in l for k in ['section.certification', '#overview', '#key-skills', '#hero', 'header']):
        print(f"{i+1}: {l.strip()}")


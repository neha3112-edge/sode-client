with open('sode-client-final/src/data/landing/iim.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# find all blocks mentioning key-skills
pattern = r'([^\n]*#key-skills[^{]*\{[^}]*\})'
blocks = re.findall(pattern, text, re.DOTALL)
for b in blocks:
    print("---------------------------------")
    print(b.strip())


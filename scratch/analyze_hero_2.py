from PIL import Image

p1 = r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791528128864.png"
p2 = r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791528178188.png"

im1 = Image.open(p1)
im2 = Image.open(p2)

print("Image 1 (Target):", im1.size)
print("Image 2 (Current):", im2.size)

# In Image 1:
# Let's find the left edge of Welcome badge and button
# Welcome badge:
badge_pixels = []
for y in range(50, 150):
    for x in range(50, 300):
        r, g, b = im1.getpixel((x, y))[:3]
        if r > 240 and g > 240 and b > 240:
            badge_pixels.append((x, y))

if badge_pixels:
    min_x = min(p[0] for p in badge_pixels)
    max_x = max(p[0] for p in badge_pixels)
    min_y = min(p[1] for p in badge_pixels)
    max_y = max(p[1] for p in badge_pixels)
    print(f"Image 1 Welcome Badge: x={min_x}..{max_x} (w={max_x-min_x}), y={min_y}..{max_y} (h={max_y-min_y})")

# In Image 1, let's find the Form box:
# Form is a white box on the right
form_pixels = []
for y in range(0, im1.height):
    for x in range(500, im1.width):
        r, g, b = im1.getpixel((x, y))[:3]
        if r > 240 and g > 240 and b > 240:
            form_pixels.append((x, y))

if form_pixels:
    min_x = min(p[0] for p in form_pixels)
    max_x = max(p[0] for p in form_pixels)
    min_y = min(p[1] for p in form_pixels)
    max_y = max(p[1] for p in form_pixels)
    print(f"Image 1 Form Box: x={min_x}..{max_x} (w={max_x-min_x}), y={min_y}..{max_y} (h={max_y-min_y})")

# Let's check paragraph text pixels in Image 1 (between y=270 and y=360, x=100..500)
# paragraph text is white letters on dark background
para_x = []
for y in range(270, 360):
    for x in range(100, 500):
        r, g, b = im1.getpixel((x, y))[:3]
        if r > 180 and g > 180 and b > 180: # text pixels
            para_x.append(x)

if para_x:
    print(f"Image 1 Paragraph text x range: {min(para_x)}..{max(para_x)} (width = {max(para_x) - min(para_x)})")

# In Image 2:
para2_x = []
for y in range(270, 360):
    for x in range(100, 550):
        r, g, b = im2.getpixel((x, y))[:3]
        if r > 180 and g > 180 and b > 180:
            para2_x.append(x)

if para2_x:
    print(f"Image 2 Paragraph text x range: {min(para2_x)}..{max(para2_x)} (width = {max(para2_x) - min(para2_x)})")

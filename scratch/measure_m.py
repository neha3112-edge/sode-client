from PIL import Image

im1 = Image.open(r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791529483901.png")
im2 = Image.open(r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791529519919.png")

# Let's find height of 'M' in im1:
# The capital 'M' is at the start of the orange text
# Find bounding box of 'M' in im1 (x between 30 and 80)
m1_y = []
for y in range(0, im1.height):
    for x in range(30, 80):
        r, g, b = im1.getpixel((x, y))[:3]
        if r > 210 and 80 < g < 150 and b < 50:
            m1_y.append(y)
            break

print("Image 1 'M' height:", max(m1_y) - min(m1_y), "px")

# Find height of 'M' in im2:
m2_y = []
for y in range(0, im2.height):
    for x in range(30, 80):
        r, g, b = im2.getpixel((x, y))[:3]
        if r > 210 and 80 < g < 150 and b < 50:
            m2_y.append(y)
            break

print("Image 2 'M' height:", max(m2_y) - min(m2_y), "px")

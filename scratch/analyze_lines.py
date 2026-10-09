from PIL import Image

im1 = Image.open(r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791529483901.png")
im2 = Image.open(r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791529519919.png")

print("Image 1 (Target 2 lines):", im1.size)
print("Image 2 (Current 3 lines):", im2.size)

# In im2, where is the orange text and white text?
# Let's count the lines of orange text in im2
orange2_lines = []
for y in range(0, im2.height):
    has_orange = False
    for x in range(0, im2.width):
        r, g, b = im2.getpixel((x, y))[:3]
        if r > 210 and 80 < g < 150 and b < 50:
            has_orange = True
            break
    if has_orange:
        orange2_lines.append(y)

print("Image 2 orange text y range:", min(orange2_lines), "to", max(orange2_lines), "total height:", max(orange2_lines)-min(orange2_lines))

# In im1:
orange1_lines = []
for y in range(0, im1.height):
    has_orange = False
    for x in range(0, im1.width):
        r, g, b = im1.getpixel((x, y))[:3]
        if r > 210 and 80 < g < 150 and b < 50:
            has_orange = True
            break
    if has_orange:
        orange1_lines.append(y)

print("Image 1 orange text y range:", min(orange1_lines), "to", max(orange1_lines), "total height:", max(orange1_lines)-min(orange1_lines))

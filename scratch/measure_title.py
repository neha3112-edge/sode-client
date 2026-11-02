from PIL import Image

im1 = Image.open(r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791528128864.png")
im2 = Image.open(r"C:\Users\Atosh-sode\.gemini\antigravity-ide\brain\cf5d8080-cda4-499b-b521-70af9f6bfbfb\.user_uploaded\media_1791528178188.png")

# In im1, let's find the orange text (Mangalayatan University)
orange1_x = []
orange1_y = []
for y in range(80, 200):
    for x in range(50, 600):
        r, g, b = im1.getpixel((x, y))[:3]
        if r > 210 and 80 < g < 150 and b < 50:
            orange1_x.append(x)
            orange1_y.append(y)

print("Image 1 Orange title x:", min(orange1_x), "to", max(orange1_x), "width =", max(orange1_x) - min(orange1_x))
print("Image 1 Orange title y:", min(orange1_y), "to", max(orange1_y), "height =", max(orange1_y) - min(orange1_y))

# In im2:
orange2_x = []
orange2_y = []
for y in range(80, 260):
    for x in range(50, 600):
        r, g, b = im2.getpixel((x, y))[:3]
        if r > 210 and 80 < g < 150 and b < 50:
            orange2_x.append(x)
            orange2_y.append(y)

print("Image 2 Orange title x:", min(orange2_x), "to", max(orange2_x), "width =", max(orange2_x) - min(orange2_x))
print("Image 2 Orange title y:", min(orange2_y), "to", max(orange2_y), "height =", max(orange2_y) - min(orange2_y))

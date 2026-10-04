import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/assets/branding', exist_ok=True)
os.makedirs('public/assets/images', exist_ok=True)

# Helper function to get fonts or fallback
def get_font(size, bold=False):
    # Try finding standard linux fonts
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf" if bold else "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

def get_mono_font(size, bold=False):
    font_paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return get_font(size, bold)

# 1. Generate Favicon ICO (16, 32, 48)
img48 = Image.new("RGBA", (48, 48), (10, 10, 10, 255))
d48 = ImageDraw.Draw(img48)
d48.rounded_rectangle([2, 2, 45, 45], radius=8, fill=(5, 5, 5, 255), outline=(36, 36, 36, 255), width=2)
# Pin indicators
d48.line([(15, 2), (15, 7)], fill=(226, 249, 82, 255), width=2)
d48.line([(32, 2), (32, 7)], fill=(226, 249, 82, 255), width=2)
# Chevron prompt >
d48.line([(14, 18), (22, 25)], fill=(226, 249, 82, 255), width=3)
d48.line([(22, 25), (14, 32)], fill=(226, 249, 82, 255), width=3)
d48.line([(26, 32), (34, 32)], fill=(250, 250, 250, 255), width=3)

img48.save("public/assets/branding/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
img48.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

# 2. Generate OG Image (1200 x 630)
og = Image.new("RGB", (1200, 630), (5, 5, 5))
og_draw = ImageDraw.Draw(og)

# Cybercore subtle grid lines (pure neutral)
for x in range(0, 1200, 40):
    og_draw.line([(x, 0), (x, 630)], fill=(18, 18, 18), width=1)
for y in range(0, 630, 40):
    og_draw.line([(0, y), (1200, y)], fill=(18, 18, 18), width=1)

# Card container
og_draw.rounded_rectangle([60, 60, 1140, 570], radius=16, fill=(12, 12, 12), outline=(36, 36, 36), width=2)
og_draw.rounded_rectangle([80, 80, 1120, 550], radius=12, fill=(8, 8, 8), outline=(26, 26, 26), width=1)

# Corner cyber accents
og_draw.line([(80, 100), (80, 80), (100, 80)], fill=(226, 249, 82), width=3)
og_draw.line([(1100, 80), (1120, 80), (1120, 100)], fill=(226, 249, 82), width=3)
og_draw.line([(80, 530), (80, 550), (100, 550)], fill=(226, 249, 82), width=3)
og_draw.line([(1100, 550), (1120, 550), (1120, 530)], fill=(226, 249, 82), width=3)

# Logo Icon Box
og_draw.rounded_rectangle([120, 120, 200, 200], radius=14, fill=(8, 9, 12), outline=(37, 47, 69), width=2)
og_draw.line([(140, 120), (140, 128)], fill=(226, 249, 82), width=3)
og_draw.line([(180, 120), (180, 128)], fill=(226, 249, 82), width=3)
og_draw.line([(135, 145), (155, 160)], fill=(226, 249, 82), width=5)
og_draw.line([(155, 160), (135, 175)], fill=(226, 249, 82), width=5)
og_draw.line([(165, 175), (185, 175)], fill=(241, 245, 249), width=5)

# Typography
f_title = get_mono_font(42, bold=True)
f_sub = get_font(24, bold=False)
f_meta = get_mono_font(18, bold=True)
f_code = get_mono_font(20, bold=False)

og_draw.text((225, 130), "ANDROID COMMAND", font=f_title, fill=(241, 245, 249))
og_draw.text((645, 130), "CHEATSHEET", font=f_title, fill=(226, 249, 82))
og_draw.text((225, 185), "ADB & Fastboot commands, explained simply.", font=f_sub, fill=(148, 163, 184))

# Code preview terminal inside OG
og_draw.rounded_rectangle([120, 240, 1080, 480], radius=10, fill=(7, 8, 11), outline=(30, 38, 56), width=1)
# Terminal header
og_draw.ellipse([140, 255, 150, 265], fill=(239, 68, 68))
og_draw.ellipse([160, 255, 170, 265], fill=(245, 158, 11))
og_draw.ellipse([180, 255, 190, 265], fill=(16, 185, 129))
og_draw.text((210, 252), "terminal — android-command-cheatsheet", font=get_mono_font(14), fill=(100, 116, 139))

# Terminal lines
og_draw.text((140, 290), "$ adb devices -l", font=f_code, fill=(226, 249, 82))
og_draw.text((140, 320), "List of devices attached", font=f_code, fill=(148, 163, 184))
og_draw.text((140, 350), "192.168.1.105:5555     device product:coral model:Pixel_4_XL device:coral", font=f_code, fill=(241, 245, 249))
og_draw.text((140, 390), "$ fastboot getvar current-slot", font=f_code, fill=(226, 249, 82))
og_draw.text((140, 420), "current-slot: a", font=f_code, fill=(16, 185, 129))
og_draw.text((140, 450), "Finished. Total time: 0.005s", font=f_code, fill=(100, 116, 139))

# Bottom badges
og_draw.rounded_rectangle([120, 505, 300, 535], radius=6, fill=(18, 22, 34), outline=(37, 47, 69))
og_draw.text((135, 513), "● 100+ REAL COMMANDS", font=f_meta, fill=(226, 249, 82))

og_draw.rounded_rectangle([320, 505, 510, 535], radius=6, fill=(18, 22, 34), outline=(37, 47, 69))
og_draw.text((335, 513), "● CYBERCORE THEME", font=f_meta, fill=(241, 245, 249))

og_draw.rounded_rectangle([530, 505, 720, 535], radius=6, fill=(18, 22, 34), outline=(37, 47, 69))
og_draw.text((545, 513), "● INSTANT SEARCH", font=f_meta, fill=(148, 163, 184))

og.save("public/assets/branding/og-image.png", "PNG", optimize=True)

# 3. Generate Instructional Images
# A. assets/images/enable-developer-options.png (800x520)
dev_opt = Image.new("RGB", (800, 520), (12, 15, 23))
d = ImageDraw.Draw(dev_opt)
d.rounded_rectangle([10, 10, 790, 510], radius=12, fill=(8, 9, 12), outline=(30, 38, 56), width=2)
# Header
d.rounded_rectangle([30, 30, 770, 75], radius=8, fill=(18, 22, 34))
d.text((50, 42), "STEP 1: ENABLE DEVELOPER OPTIONS IN ANDROID SETTINGS", font=get_mono_font(18, bold=True), fill=(226, 249, 82))
# Android Settings mockup card
d.rounded_rectangle([60, 100, 740, 480], radius=12, fill=(14, 18, 28), outline=(37, 47, 69), width=1)
# Settings list
items = [
    ("Settings > About Phone", "Device details, hardware information, and software build"),
    ("Model & Hardware", "Pixel 8 Pro (Tensor G3, 12GB RAM)"),
    ("Android Version", "14 (UpsideDownCake)"),
    ("Build Number (TAP 7 TIMES)", "UQ1A.240205.004 — Click repeatedly until prompt appears"),
]
y_offset = 120
for idx, (title, sub) in enumerate(items):
    highlight = idx == 3
    bg_color = (24, 32, 48) if highlight else (18, 22, 34)
    border_color = (226, 249, 82) if highlight else (30, 38, 56)
    d.rounded_rectangle([80, y_offset, 720, y_offset + 70], radius=8, fill=bg_color, outline=border_color, width=2 if highlight else 1)
    
    title_color = (226, 249, 82) if highlight else (241, 245, 249)
    d.text((100, y_offset + 14), title, font=get_font(18, bold=True), fill=title_color)
    d.text((100, y_offset + 42), sub, font=get_font(14), fill=(148, 163, 184))
    
    if highlight:
        # Tap badge
        d.rounded_rectangle([560, y_offset + 15, 700, y_offset + 55], radius=6, fill=(226, 249, 82))
        d.text((575, y_offset + 25), "TAP 7 TIMES", font=get_mono_font(14, bold=True), fill=(8, 9, 12))
    y_offset += 85

# Success Toast
d.rounded_rectangle([200, 440, 600, 480], radius=20, fill=(30, 41, 59), outline=(100, 116, 139), width=1)
d.text((230, 452), "✓ You are now a developer!", font=get_font(16, bold=True), fill=(226, 249, 82))
dev_opt.save("public/assets/images/enable-developer-options.png", "PNG", optimize=True)

# B. assets/images/enable-usb-debugging.png (800x520)
usb_dbg = Image.new("RGB", (800, 520), (12, 15, 23))
d = ImageDraw.Draw(usb_dbg)
d.rounded_rectangle([10, 10, 790, 510], radius=12, fill=(8, 9, 12), outline=(30, 38, 56), width=2)
d.rounded_rectangle([30, 30, 770, 75], radius=8, fill=(18, 22, 34))
d.text((50, 42), "STEP 2: ENABLE USB DEBUGGING & TRUST RSA FINGERPRINT", font=get_mono_font(18, bold=True), fill=(226, 249, 82))

# Settings screen
d.rounded_rectangle([60, 95, 740, 205], radius=10, fill=(14, 18, 28), outline=(37, 47, 69))
d.text((80, 115), "Developer options > Debugging", font=get_font(14), fill=(100, 116, 139))
d.text((80, 140), "USB debugging", font=get_font(20, bold=True), fill=(241, 245, 249))
d.text((80, 170), "Debug mode when USB is connected", font=get_font(14), fill=(148, 163, 184))
# Toggle ON
d.rounded_rectangle([640, 130, 710, 170], radius=20, fill=(226, 249, 82))
d.ellipse([672, 132, 708, 168], fill=(8, 9, 12))

# Dialog Prompt Modal
d.rounded_rectangle([120, 225, 680, 490], radius=14, fill=(18, 22, 34), outline=(226, 249, 82), width=2)
d.text((150, 250), "Allow USB debugging?", font=get_font(22, bold=True), fill=(241, 245, 249))
d.text((150, 288), "The computer's RSA key fingerprint is:", font=get_font(14), fill=(148, 163, 184))
d.text((150, 315), "3A:F8:1B:90:E2:55:10:44:89:C2:5E:21:40:D9:88:17", font=get_mono_font(15, bold=True), fill=(226, 249, 82))

# Checkbox
d.rounded_rectangle([150, 360, 172, 382], radius=4, fill=(226, 249, 82))
d.text((154, 362), "✓", font=get_font(14, bold=True), fill=(8, 9, 12))
d.text((185, 362), "Always allow from this computer", font=get_font(15, bold=True), fill=(241, 245, 249))

# Modal buttons
d.rounded_rectangle([390, 420, 500, 465], radius=6, fill=(30, 38, 56))
d.text((420, 434), "Cancel", font=get_font(15), fill=(148, 163, 184))
d.rounded_rectangle([520, 420, 650, 465], radius=6, fill=(226, 249, 82))
d.text((565, 434), "Allow", font=get_font(15, bold=True), fill=(8, 9, 12))

usb_dbg.save("public/assets/images/enable-usb-debugging.png", "PNG", optimize=True)

# C. assets/images/adb-device-connected.png (800x520)
conn = Image.new("RGB", (800, 520), (12, 15, 23))
d = ImageDraw.Draw(conn)
d.rounded_rectangle([10, 10, 790, 510], radius=12, fill=(8, 9, 12), outline=(30, 38, 56), width=2)
d.rounded_rectangle([30, 30, 770, 75], radius=8, fill=(18, 22, 34))
d.text((50, 42), "STEP 3: WORKSTATION TO ANDROID USB-C HANDSHAKE", font=get_mono_font(18, bold=True), fill=(226, 249, 82))

# Computer Box
d.rounded_rectangle([60, 140, 300, 360], radius=12, fill=(16, 20, 30), outline=(37, 47, 69), width=2)
d.text((80, 160), "DEVELOPER PC / MAC", font=get_mono_font(14, bold=True), fill=(148, 163, 184))
d.text((80, 200), "• ADB Server (port 5037)", font=get_font(14), fill=(241, 245, 249))
d.text((80, 230), "• Android SDK Platform-Tools", font=get_font(14), fill=(241, 245, 249))
d.text((80, 260), "• RSA Keypair (~/.android/adbkey)", font=get_font(14), fill=(226, 249, 82))
d.text((80, 310), "[ Status: ADB ACTIVE ]", font=get_mono_font(13), fill=(16, 185, 129))

# Cable connection line
d.line([(300, 250), (500, 250)], fill=(226, 249, 82), width=4)
d.polygon([(410, 240), (430, 250), (410, 260)], fill=(226, 249, 82))
d.text((330, 220), "USB-C CABLE", font=get_mono_font(12, bold=True), fill=(226, 249, 82))
d.text((335, 270), "Data Sync Mode", font=get_font(12), fill=(148, 163, 184))

# Phone Box
d.rounded_rectangle([500, 120, 740, 380], radius=16, fill=(16, 20, 30), outline=(37, 47, 69), width=2)
d.text((520, 140), "ANDROID DEVICE", font=get_mono_font(14, bold=True), fill=(148, 163, 184))
d.text((520, 180), "• adbd daemon running", font=get_font(14), fill=(241, 245, 249))
d.text((520, 210), "• USB Debugging: Enabled", font=get_font(14), fill=(16, 185, 129))
d.text((520, 240), "• Authorization: Trusted", font=get_font(14), fill=(16, 185, 129))
d.text((520, 270), "• SELinux: Enforcing", font=get_font(14), fill=(148, 163, 184))
d.rounded_rectangle([520, 315, 720, 355], radius=6, fill=(8, 9, 12), outline=(226, 249, 82))
d.text((535, 326), "STATE: DEVICE READY", font=get_mono_font(14, bold=True), fill=(226, 249, 82))

# Bottom tip
d.rounded_rectangle([60, 420, 740, 470], radius=8, fill=(18, 22, 34), outline=(30, 38, 56))
d.text((80, 435), "TIP: Ensure USB mode is set to 'File Transfer (MTP)' or 'PTP', not 'Charging only'.", font=get_font(14), fill=(148, 163, 184))
conn.save("public/assets/images/adb-device-connected.png", "PNG", optimize=True)

# D. assets/images/adb-devices-output.png (800x520)
term = Image.new("RGB", (800, 520), (12, 15, 23))
d = ImageDraw.Draw(term)
d.rounded_rectangle([10, 10, 790, 510], radius=12, fill=(8, 9, 12), outline=(30, 38, 56), width=2)
d.rounded_rectangle([30, 30, 770, 75], radius=8, fill=(18, 22, 34))
d.text((50, 42), "STEP 4: VERIFY DETECTION WITH 'adb devices -l'", font=get_mono_font(18, bold=True), fill=(226, 249, 82))

# Terminal view
d.rounded_rectangle([50, 100, 750, 480], radius=10, fill=(6, 7, 10), outline=(37, 47, 69), width=1)
d.ellipse([70, 115, 80, 125], fill=(239, 68, 68))
d.ellipse([90, 115, 100, 125], fill=(245, 158, 11))
d.ellipse([110, 115, 120, 125], fill=(16, 185, 129))
d.text((140, 112), "bash — 80x24", font=get_mono_font(13), fill=(100, 116, 139))

d.text((70, 150), "$ adb devices -l", font=get_mono_font(17, bold=True), fill=(226, 249, 82))
d.text((70, 185), "List of devices attached", font=get_mono_font(15), fill=(148, 163, 184))

# Device 1: Authorized (Active)
d.rounded_rectangle([65, 215, 735, 275], radius=6, fill=(16, 24, 32), outline=(16, 185, 129), width=1)
d.text((80, 230), "2A181FDH200388        device  product:husky model:Pixel_8_Pro device:husky", font=get_mono_font(14, bold=True), fill=(241, 245, 249))
d.text((80, 252), "STATUS: AUTHORIZED & READY FOR ALL COMMANDS", font=get_mono_font(12), fill=(16, 185, 129))

# Device 2: Unauthorized (Warning case)
d.rounded_rectangle([65, 290, 735, 350], radius=6, fill=(24, 20, 16), outline=(245, 158, 11), width=1)
d.text((80, 305), "emulator-5554         unauthorized  transport_id:2", font=get_mono_font(14, bold=True), fill=(245, 158, 11))
d.text((80, 327), "STATUS: UNCONFIRMED RSA KEY — CHECK DEVICE SCREEN FOR POPUP", font=get_mono_font(12), fill=(245, 158, 11))

# Device 3: Wireless ADB
d.rounded_rectangle([65, 365, 735, 425], radius=6, fill=(16, 22, 34), outline=(37, 47, 69), width=1)
d.text((80, 380), "192.168.1.120:5555    device  product:tangorpro model:Pixel_Tablet", font=get_mono_font(14, bold=True), fill=(241, 245, 249))
d.text((80, 402), "STATUS: WIRELESS TCP/IP CONNECTION ESTABLISHED", font=get_mono_font(12), fill=(226, 249, 82))

d.text((70, 445), "$ _", font=get_mono_font(18, bold=True), fill=(226, 249, 82))
term.save("public/assets/images/adb-devices-output.png", "PNG", optimize=True)

# E. assets/images/fastboot-mode.png (800x520)
fb = Image.new("RGB", (800, 520), (12, 15, 23))
d = ImageDraw.Draw(fb)
d.rounded_rectangle([10, 10, 790, 510], radius=12, fill=(8, 9, 12), outline=(30, 38, 56), width=2)
d.rounded_rectangle([30, 30, 770, 75], radius=8, fill=(18, 22, 34))
d.text((50, 42), "FASTBOOT / BOOTLOADER HARDWARE DIAGNOSTIC INTERFACE", font=get_mono_font(18, bold=True), fill=(226, 249, 82))

# Bootloader Mockup Screen
d.rounded_rectangle([60, 95, 740, 485], radius=12, fill=(5, 6, 8), outline=(37, 47, 69), width=1)

# Large Fastboot Header
d.text((90, 120), "FASTBOOT MODE", font=get_mono_font(28, bold=True), fill=(239, 68, 68))
d.text((90, 160), "PRODUCT_NAME - panther", font=get_mono_font(15), fill=(241, 245, 249))
d.text((90, 185), "VARIANT - panther-g10", font=get_mono_font(15), fill=(241, 245, 249))
d.text((90, 210), "BOOTLOADER VERSION - panther-14.0-10884920", font=get_mono_font(15), fill=(241, 245, 249))
d.text((90, 235), "BASEBAND VERSION - g5300g-231215-240108-B-11295287", font=get_mono_font(15), fill=(241, 245, 249))
d.text((90, 260), "CARRIER INFO - UNLOCKED", font=get_mono_font(15), fill=(241, 245, 249))
d.text((90, 285), "SERIAL NUMBER - 31181JEHN01948", font=get_mono_font(15), fill=(226, 249, 82))
d.text((90, 310), "SECURE BOOT - Production", font=get_mono_font(15), fill=(16, 185, 129))

# Status badge
d.rounded_rectangle([90, 345, 420, 385], radius=6, fill=(35, 15, 15), outline=(239, 68, 68))
d.text((105, 356), "DEVICE STATE - unlocked", font=get_mono_font(16, bold=True), fill=(239, 68, 68))

d.rounded_rectangle([440, 345, 700, 385], radius=6, fill=(15, 30, 20), outline=(16, 185, 129))
d.text((455, 356), "CURRENT SLOT - _a", font=get_mono_font(16, bold=True), fill=(16, 185, 129))

# Instructions
d.rounded_rectangle([90, 410, 710, 465], radius=6, fill=(16, 20, 30), outline=(37, 47, 69))
d.text((110, 422), "• Press Volume Up/Down keys to navigate menu options.", font=get_font(13), fill=(148, 163, 184))
d.text((110, 442), "• Press Power button to select (Start, Restart bootloader, Recovery mode, Power off).", font=get_font(13), fill=(148, 163, 184))

fb.save("public/assets/images/fastboot-mode.png", "PNG", optimize=True)

print("All branding and instructional images generated successfully!")

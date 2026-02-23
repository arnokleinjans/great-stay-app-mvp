from PIL import Image
import pytesseract

img = Image.open('/Users/kleinjansarno/.gemini/antigravity/brain/31ba759e-9232-4132-9fc1-5c2a20401bb7/.system_generated/click_feedback/click_feedback_1771870768570.png')
print(pytesseract.image_to_string(img))

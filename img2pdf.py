from PIL import Image
import sys
import os
import glob

def images_to_pdf(image_paths, output_path="output.pdf"):
    if not image_paths:
        print("No images found.")
        return

    images = []
    for path in image_paths:
        img = Image.open(path)
        if img.mode == "RGBA":
            img = img.convert("RGB")
        elif img.mode != "RGB":
            img = img.convert("RGB")
        images.append(img)

    first = images[0]
    rest = images[1:] if len(images) > 1 else []

    first.save(
        output_path,
        "PDF",
        resolution=300,
        save_all=True,
        append_images=rest,
    )
    print(f"PDF saved: {output_path} ({len(images)} pages)")

if __name__ == "__main__":
    folder = input("Enter folder path with images (or drag & drop): ").strip().strip('"')
    
    exts = ["*.jpg", "*.jpeg", "*.png", "*.bmp", "*.webp"]
    files = []
    for ext in exts:
        files.extend(glob.glob(os.path.join(folder, ext)))
    
    files.sort()
    
    if not files:
        print("No image files found in folder.")
        sys.exit(1)

    print(f"Found {len(files)} images:")
    for f in files:
        print(f"  - {os.path.basename(f)}")

    output = os.path.join(folder, "portfolio.pdf")
    images_to_pdf(files, output)

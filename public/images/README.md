# Product Images Structure

This directory contains all product images for the OMNIKA auto parts store.

## 📁 Directory Structure

```
public/images/
├── products/           # Product images by category
│   ├── engine/        # Engine parts
│   ├── suspension/    # Suspension parts
│   ├── brakes/        # Brake system parts
│   ├── electronics/   # Electronic components
│   ├── transmission/  # Transmission parts
│   ├── cooling/       # Cooling system parts
│   ├── fuel/          # Fuel system parts
│   ├── exhaust/       # Exhaust system parts
│   ├── steering/      # Steering components
│   ├── body/          # Body parts
│   ├── interior/      # Interior components
│   ├── lighting/      # Lighting components
│   └── wheels/        # Wheels and tires
├── brands/            # Brand logos
└── placeholder/       # Placeholder images
```

## 🖼️ Image Specifications

### Product Images
- **Format**: JPG or PNG
- **Size**: 400x300 pixels (recommended)
- **Quality**: High quality, clear images
- **Background**: Clean, professional background
- **Naming**: `part-name-1.jpg`, `part-name-2.jpg`, etc.

### Brand Logos
- **Format**: PNG (with transparency)
- **Size**: 200x100 pixels (recommended)
- **Background**: Transparent
- **Naming**: `brand-name-logo.png`

### Placeholder Images
- **Format**: JPG
- **Size**: 400x300 pixels
- **Content**: Generic auto parts or "No Image Available" design

## 📝 Naming Convention

### Product Images
```
category/part-name-number.jpg
```

Examples:
- `engine/piston-1.jpg`
- `brakes/brake-pad-1.jpg`
- `electronics/ecu-1.jpg`

### Brand Logos
```
brands/brand-name-logo.png
```

Examples:
- `brands/mercedes-logo.png`
- `brands/bmw-logo.png`
- `brands/audi-logo.png`

## 🚀 How to Add Images

1. **Prepare your images** according to the specifications above
2. **Place them in the correct category folder** under `products/`
3. **Update the image paths** in `lib/productImages.ts` if needed
4. **Test the images** by refreshing the catalog page

## 📋 Required Images List

### Engine Parts
- piston-1.jpg
- crankshaft-1.jpg
- camshaft-1.jpg
- valve-1.jpg
- cylinder-head-1.jpg
- oil-pump-1.jpg
- water-pump-1.jpg

### Suspension Parts
- shock-absorber-1.jpg
- spring-1.jpg
- control-arm-1.jpg
- bushings-1.jpg
- stabilizer-bar-1.jpg
- ball-joint-1.jpg

### Brake Parts
- brake-pad-1.jpg
- brake-disc-1.jpg
- brake-caliper-1.jpg
- brake-line-1.jpg
- master-cylinder-1.jpg

### Electronics
- ecu-1.jpg
- sensor-1.jpg
- relay-1.jpg
- fuse-1.jpg
- wiring-harness-1.jpg
- battery-1.jpg

### Brand Logos
- mercedes-logo.png
- bmw-logo.png
- audi-logo.png
- volkswagen-logo.png
- opel-logo.png
- peugeot-logo.png
- renault-logo.png
- ford-logo.png
- fiat-logo.png
- skoda-logo.png
- seat-logo.png
- volvo-logo.png
- saab-logo.png
- citroen-logo.png
- alfa-romeo-logo.png

## 🔧 Technical Notes

- Images are served from the `public` directory
- URLs start with `/images/` (e.g., `/images/products/engine/piston-1.jpg`)
- The system automatically falls back to placeholder images if files are missing
- All images should be optimized for web (compressed but high quality)

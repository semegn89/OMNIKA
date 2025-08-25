#!/usr/bin/env node

/**
 * Script to generate placeholder images for the OMNIKA auto parts store
 * This script creates simple placeholder images using Canvas API
 */

const fs = require('fs');
const path = require('path');

// Create a simple placeholder image using Canvas
function createPlaceholderImage(width, height, text, filename) {
  const { createCanvas } = require('canvas');
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);

  // Text
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Created: ${filename}`);
}

// Main function
function generatePlaceholders() {
  console.log('🚀 Generating placeholder images...\n');

  // Create directories if they don't exist
  const dirs = [
    'public/images/products/engine',
    'public/images/products/suspension',
    'public/images/products/brakes',
    'public/images/products/electronics',
    'public/images/products/transmission',
    'public/images/products/cooling',
    'public/images/products/fuel',
    'public/images/products/exhaust',
    'public/images/products/steering',
    'public/images/products/body',
    'public/images/products/interior',
    'public/images/products/lighting',
    'public/images/products/wheels',
    'public/images/brands',
    'public/images/placeholder'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });

  // Generate product placeholders
  const productImages = {
    engine: ['Piston', 'Crankshaft', 'Camshaft', 'Valve', 'Cylinder Head', 'Oil Pump', 'Water Pump'],
    suspension: ['Shock Absorber', 'Spring', 'Control Arm', 'Bushings', 'Stabilizer Bar', 'Ball Joint'],
    brakes: ['Brake Pad', 'Brake Disc', 'Brake Caliper', 'Brake Line', 'Master Cylinder'],
    electronics: ['ECU', 'Sensor', 'Relay', 'Fuse', 'Wiring Harness', 'Battery'],
    transmission: ['Gear', 'Clutch', 'Flywheel', 'Transmission Fluid', 'Gearbox'],
    cooling: ['Radiator', 'Thermostat', 'Coolant Pump', 'Fan', 'Hose'],
    fuel: ['Fuel Pump', 'Injector', 'Filter', 'Tank', 'Line'],
    exhaust: ['Catalytic Converter', 'Muffler', 'Pipe', 'O2 Sensor'],
    steering: ['Steering Rack', 'Power Steering Pump', 'Tie Rod', 'Steering Wheel'],
    body: ['Bumper', 'Fender', 'Hood', 'Door', 'Mirror', 'Grille'],
    interior: ['Seat', 'Dashboard', 'Steering Wheel', 'Carpet', 'Trim'],
    lighting: ['Headlight', 'Taillight', 'Fog Light', 'Bulb', 'Lens'],
    wheels: ['Wheel', 'Tire', 'Hub Cap', 'Lug Nut', 'Valve Stem']
  };

  Object.entries(productImages).forEach(([category, parts]) => {
    parts.forEach((part, index) => {
      const filename = `public/images/products/${category}/${part.toLowerCase().replace(/\s+/g, '-')}-1.png`;
      createPlaceholderImage(400, 300, part, filename);
    });
  });

  // Generate brand logos
  const brands = [
    'Mercedes', 'BMW', 'Audi', 'Volkswagen', 'Opel', 'Peugeot', 'Renault',
    'Ford', 'Fiat', 'Skoda', 'Seat', 'Volvo', 'Saab', 'Citroen', 'Alfa Romeo'
  ];

  brands.forEach(brand => {
    const filename = `public/images/brands/${brand.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
    createPlaceholderImage(200, 100, brand, filename);
  });

  // Generate main placeholder
  createPlaceholderImage(400, 300, 'Product Image', 'public/images/placeholder/product-placeholder.png');

  console.log('\n✅ All placeholder images generated successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Replace placeholder images with real product photos');
  console.log('2. Optimize images for web (compress but maintain quality)');
  console.log('3. Test the catalog page to ensure images display correctly');
}

// Run the script
if (require.main === module) {
  try {
    generatePlaceholders();
  } catch (error) {
    console.error('❌ Error generating placeholders:', error.message);
    console.log('\n💡 Make sure you have the "canvas" package installed:');
    console.log('npm install canvas');
    process.exit(1);
  }
}

module.exports = { generatePlaceholders };

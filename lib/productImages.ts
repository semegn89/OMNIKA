// Product Images Configuration - Updated with Unsplash images
export const productImages = {
  engine: [
    '/images/products/engine-1.jpg',
    '/images/products/engine-2.jpg',
    '/images/products/engine-3.jpg'
  ],
  suspension: [
    '/images/products/suspension-1.jpg',
    '/images/products/suspension-2.jpg',
    '/images/products/suspension-3.jpg'
  ],
  brakes: [
    '/images/products/brakes-1.jpg',
    '/images/products/brakes-2.jpg',
    '/images/products/brakes-3.jpg'
  ],
  electrical: [
    '/images/products/electrical-1.jpg',
    '/images/products/electrical-2.jpg',
    '/images/products/electrical-3.jpg'
  ],
  transmission: [
    '/images/products/transmission-1.jpg',
    '/images/products/transmission-2.jpg',
    '/images/products/transmission-3.jpg'
  ],
  cooling: [
    '/images/products/cooling-1.jpg',
    '/images/products/cooling-2.jpg',
    '/images/products/cooling-3.jpg'
  ],
  fuel: [
    '/images/products/fuel-1.jpg',
    '/images/products/fuel-2.jpg',
    '/images/products/fuel-3.jpg'
  ],
  exhaust: [
    '/images/products/exhaust-1.jpg',
    '/images/products/exhaust-2.jpg',
    '/images/products/exhaust-3.jpg'
  ],
  steering: [
    '/images/products/steering-1.jpg',
    '/images/products/steering-2.jpg',
    '/images/products/steering-3.jpg'
  ],
  body: [
    '/images/products/body-1.jpg',
    '/images/products/body-2.jpg',
    '/images/products/body-3.jpg'
  ],
  interior: [
    '/images/products/interior-1.jpg',
    '/images/products/interior-2.jpg',
    '/images/products/interior-3.jpg'
  ],
  exterior: [
    '/images/products/exterior-1.jpg',
    '/images/products/exterior-2.jpg',
    '/images/products/exterior-3.jpg'
  ]
}

// Brand logos - Updated with Unsplash images
export const brandLogos = {
  'Mercedes': '/images/brands/mercedes-logo-1.jpg',
  'BMW': '/images/brands/bmw-logo-1.jpg',
  'Audi': '/images/brands/audi-logo-1.jpg',
  'Volkswagen': '/images/brands/volkswagen-logo-1.jpg',
  'Opel': '/images/brands/opel-logo.png',
  'Peugeot': '/images/brands/peugeot-logo.png',
  'Renault': '/images/brands/renault-logo.png',
  'Ford': '/images/brands/ford-logo-1.jpg',
  'Fiat': '/images/brands/fiat-logo.png',
  'Skoda': '/images/brands/skoda-logo.png',
  'Seat': '/images/brands/seat-logo.png',
  'Volvo': '/images/brands/volvo-logo-1.jpg',
  'Saab': '/images/brands/saab-logo.png',
  'Citroen': '/images/brands/citroen-logo.png',
  'Alfa Romeo': '/images/brands/alfa-romeo-logo.png',
  'Toyota': '/images/brands/toyota-logo-1.jpg',
  'Honda': '/images/brands/honda-logo-1.jpg',
  'Nissan': '/images/brands/nissan-logo-1.jpg',
  'Mazda': '/images/brands/mazda-logo-1.jpg'
}

// Placeholder image
export const placeholderImage = '/images/placeholder/product-placeholder.png'

// Function to get random images for a product
export function getProductImages(category: string, count: number = 3): string[] {
  const categoryKey = category.toLowerCase() as keyof typeof productImages
  const images = productImages[categoryKey] || productImages.engine
  
  // Shuffle and take random images
  const shuffled = [...images].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, Math.min(count, shuffled.length))
  
  // If we don't have enough images, add placeholder
  while (selected.length < count) {
    selected.push(placeholderImage)
  }
  
  return selected
}

// Function to get brand logo
export function getBrandLogo(brand: string): string {
  return brandLogos[brand as keyof typeof brandLogos] || placeholderImage
}

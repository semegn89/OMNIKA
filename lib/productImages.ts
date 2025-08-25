// Product Images Configuration
export const productImages = {
  engine: [
    '/images/products/engine/piston-1.png',
    '/images/products/engine/crankshaft-1.png',
    '/images/products/engine/camshaft-1.png',
    '/images/products/engine/valve-1.png',
    '/images/products/engine/cylinder-head-1.png',
    '/images/products/engine/oil-pump-1.png',
    '/images/products/engine/water-pump-1.png'
  ],
  suspension: [
    '/images/products/suspension/shock-absorber-1.png',
    '/images/products/suspension/spring-1.png',
    '/images/products/suspension/control-arm-1.png',
    '/images/products/suspension/bushings-1.png',
    '/images/products/suspension/stabilizer-bar-1.png',
    '/images/products/suspension/ball-joint-1.png'
  ],
  brakes: [
    '/images/products/brakes/brake-pad-1.png',
    '/images/products/brakes/brake-disc-1.png',
    '/images/products/brakes/brake-caliper-1.png',
    '/images/products/brakes/brake-line-1.png',
    '/images/products/brakes/master-cylinder-1.png'
  ],
  electronics: [
    '/images/products/electronics/ecu-1.png',
    '/images/products/electronics/sensor-1.png',
    '/images/products/electronics/relay-1.png',
    '/images/products/electronics/fuse-1.png',
    '/images/products/electronics/wiring-harness-1.png',
    '/images/products/electronics/battery-1.png'
  ],
  transmission: [
    '/images/products/transmission/gear-1.png',
    '/images/products/transmission/clutch-1.png',
    '/images/products/transmission/flywheel-1.png',
    '/images/products/transmission/transmission-fluid-1.png',
    '/images/products/transmission/gearbox-1.png'
  ],
  'cooling system': [
    '/images/products/cooling/radiator-1.png',
    '/images/products/cooling/thermostat-1.png',
    '/images/products/cooling/coolant-pump-1.png',
    '/images/products/cooling/fan-1.png',
    '/images/products/cooling/hose-1.png'
  ],
  'fuel system': [
    '/images/products/fuel/fuel-pump-1.png',
    '/images/products/fuel/injector-1.png',
    '/images/products/fuel/filter-1.png',
    '/images/products/fuel/tank-1.png',
    '/images/products/fuel/line-1.png'
  ],
  'exhaust system': [
    '/images/products/exhaust/catalytic-converter-1.png',
    '/images/products/exhaust/muffler-1.png',
    '/images/products/exhaust/pipe-1.png',
    '/images/products/exhaust/o2-sensor-1.png'
  ],
  steering: [
    '/images/products/steering/steering-rack-1.png',
    '/images/products/steering/power-steering-pump-1.png',
    '/images/products/steering/tie-rod-1.png',
    '/images/products/steering/steering-wheel-1.png'
  ],
  'body parts': [
    '/images/products/body/bumper-1.png',
    '/images/products/body/fender-1.png',
    '/images/products/body/hood-1.png',
    '/images/products/body/door-1.png',
    '/images/products/body/mirror-1.png',
    '/images/products/body/grille-1.png'
  ],
  interior: [
    '/images/products/interior/seat-1.png',
    '/images/products/interior/dashboard-1.png',
    '/images/products/interior/steering-wheel-1.png',
    '/images/products/interior/carpet-1.png',
    '/images/products/interior/trim-1.png'
  ],
  lighting: [
    '/images/products/lighting/headlight-1.png',
    '/images/products/lighting/taillight-1.png',
    '/images/products/lighting/fog-light-1.png',
    '/images/products/lighting/bulb-1.png',
    '/images/products/lighting/lens-1.png'
  ],
  'wheels & tires': [
    '/images/products/wheels/wheel-1.png',
    '/images/products/wheels/tire-1.png',
    '/images/products/wheels/hub-cap-1.png',
    '/images/products/wheels/lug-nut-1.png',
    '/images/products/wheels/valve-stem-1.png'
  ]
}

// Brand logos
export const brandLogos = {
  'Mercedes': '/images/brands/mercedes-logo.png',
  'BMW': '/images/brands/bmw-logo.png',
  'Audi': '/images/brands/audi-logo.png',
  'Volkswagen': '/images/brands/volkswagen-logo.png',
  'Opel': '/images/brands/opel-logo.png',
  'Peugeot': '/images/brands/peugeot-logo.png',
  'Renault': '/images/brands/renault-logo.png',
  'Ford': '/images/brands/ford-logo.png',
  'Fiat': '/images/brands/fiat-logo.png',
  'Skoda': '/images/brands/skoda-logo.png',
  'Seat': '/images/brands/seat-logo.png',
  'Volvo': '/images/brands/volvo-logo.png',
  'Saab': '/images/brands/saab-logo.png',
  'Citroen': '/images/brands/citroen-logo.png',
  'Alfa Romeo': '/images/brands/alfa-romeo-logo.png'
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

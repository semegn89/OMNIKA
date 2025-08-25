export interface Product {
  id: string
  name: string
  price: number
  image: string
  brand: string
  category: string
  description: string
  inStock: boolean
  rating: number
  reviews: number
}

const carBrands = [
  'Mercedes', 'BMW', 'Audi', 'Volkswagen', 'Opel', 'Peugeot', 'Renault', 
  'Ford', 'Fiat', 'Skoda', 'Seat', 'Volvo', 'Saab', 'Citroen', 'Alfa Romeo'
]

const partCategories = [
  'Engine', 'Suspension', 'Brakes', 'Electronics', 'Transmission', 
  'Cooling System', 'Fuel System', 'Exhaust System', 'Steering', 
  'Body Parts', 'Interior', 'Lighting', 'Wheels & Tires'
]

const partTypes = {
  'Engine': ['Piston', 'Crankshaft', 'Camshaft', 'Valve', 'Cylinder Head', 'Oil Pump', 'Water Pump'],
  'Suspension': ['Shock Absorber', 'Spring', 'Control Arm', 'Bushings', 'Stabilizer Bar', 'Ball Joint'],
  'Brakes': ['Brake Pad', 'Brake Disc', 'Brake Caliper', 'Brake Line', 'Master Cylinder'],
  'Electronics': ['ECU', 'Sensor', 'Relay', 'Fuse', 'Wiring Harness', 'Battery'],
  'Transmission': ['Gear', 'Clutch', 'Flywheel', 'Transmission Fluid', 'Gearbox'],
  'Cooling System': ['Radiator', 'Thermostat', 'Coolant Pump', 'Fan', 'Hose'],
  'Fuel System': ['Fuel Pump', 'Injector', 'Filter', 'Tank', 'Line'],
  'Exhaust System': ['Catalytic Converter', 'Muffler', 'Pipe', 'O2 Sensor'],
  'Steering': ['Steering Rack', 'Power Steering Pump', 'Tie Rod', 'Steering Wheel'],
  'Body Parts': ['Bumper', 'Fender', 'Hood', 'Door', 'Mirror', 'Grille'],
  'Interior': ['Seat', 'Dashboard', 'Steering Wheel', 'Carpet', 'Trim'],
  'Lighting': ['Headlight', 'Taillight', 'Fog Light', 'Bulb', 'Lens'],
  'Wheels & Tires': ['Wheel', 'Tire', 'Hub Cap', 'Lug Nut', 'Valve Stem']
}

function generateRandomPrice(): number {
  return Math.floor(Math.random() * 9990) + 10 // 10 to 10000 EUR
}

function generateRandomImage(): string {
  const width = 400
  const height = 300
  const randomId = Math.floor(Math.random() * 1000)
  return `https://via.placeholder.com/${width}x${height}/1e293b/00d4ff?text=Auto+Part+${randomId}`
}

function generateProductName(brand: string, category: string): string {
  const types = partTypes[category as keyof typeof partTypes] || ['Part']
  const type = types[Math.floor(Math.random() * types.length)]
  return `${type} for ${brand}`
}

export function generateProducts(count: number = 5000): Product[] {
  const products: Product[] = []
  
  for (let i = 0; i < count; i++) {
    const brand = carBrands[Math.floor(Math.random() * carBrands.length)]
    const category = partCategories[Math.floor(Math.random() * partCategories.length)]
    const name = generateProductName(brand, category)
    
    products.push({
      id: `prod_${i + 1}`,
      name,
      price: generateRandomPrice(),
      image: generateRandomImage(),
      brand,
      category,
      description: `High-quality ${name.toLowerCase()} for ${brand} vehicles. Premium materials and expert craftsmanship.`,
      inStock: Math.random() > 0.1, // 90% in stock
      rating: Math.floor(Math.random() * 20) / 10 + 3, // 3.0 to 5.0
      reviews: Math.floor(Math.random() * 500) + 1
    })
  }
  
  return products
}

export function filterProducts(
  products: Product[],
  filters: {
    brand?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
  }
): Product[] {
  return products.filter(product => {
    if (filters.brand && product.brand !== filters.brand) return false
    if (filters.category && product.category !== filters.category) return false
    if (filters.minPrice && product.price < filters.minPrice) return false
    if (filters.maxPrice && product.price > filters.maxPrice) return false
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false
    return true
  })
}

export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'name'
): Product[] {
  const sorted = [...products]
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'reviews':
      return sorted.sort((a, b) => b.reviews - a.reviews)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

export { carBrands, partCategories }

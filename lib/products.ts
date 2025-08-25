import { getProductImages, getBrandLogo } from './productImages'

export interface Product {
  id: string
  sku: string
  name: string
  price: number
  image: string
  brand: string
  model?: string
  category: string
  description: string
  stock_qty: number
  is_active: boolean
  images?: string[]
  rating: number
  reviews: number
}

export interface VinRequest {
  id: string
  vin: string
  user_id?: string
  email?: string
  phone?: string
  comment?: string
  status: 'NEW' | 'NEEDS_INFO' | 'ANSWERED' | 'REJECTED'
  created_at: Date
  updated_at: Date
  recommended_items?: Array<{
    product_id: string
    qty: number
    note: string
  }>
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

function generateRandomStock(): number {
  return Math.floor(Math.random() * 100) + 1 // 1 to 100
}

function generateProductName(brand: string, category: string): string {
  const types = partTypes[category as keyof typeof partTypes] || ['Part']
  const type = types[Math.floor(Math.random() * types.length)]
  return `${type} for ${brand}`
}

function generateSKU(brand: string, category: string, index: number): string {
  const brandCode = brand.substring(0, 3).toUpperCase()
  const categoryCode = category.substring(0, 3).toUpperCase()
  return `${brandCode}-${categoryCode}-${String(index).padStart(6, '0')}`
}

export function generateProducts(count: number = 5000): Product[] {
  const products: Product[] = []
  
  for (let i = 0; i < count; i++) {
    const brand = carBrands[Math.floor(Math.random() * carBrands.length)]
    const category = partCategories[Math.floor(Math.random() * partCategories.length)]
    const name = generateProductName(brand, category)
    const stock_qty = generateRandomStock()
    
    // Get real images for the product
    const productImages = getProductImages(category, 3)
    
    products.push({
      id: `prod_${i + 1}`,
      sku: generateSKU(brand, category, i + 1),
      name,
      price: generateRandomPrice(),
      image: productImages[0], // Main image
      brand,
      model: `${brand} ${Math.floor(Math.random() * 20) + 2000}`,
      category,
      description: `High-quality ${name.toLowerCase()} for ${brand} vehicles. Premium materials and expert craftsmanship.`,
      stock_qty,
      is_active: true, // All products are active by default
      images: productImages, // All images for the product
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
    isActive?: boolean
  }
): Product[] {
  return products.filter(product => {
    if (filters.brand && product.brand !== filters.brand) return false
    if (filters.category && product.category !== filters.category) return false
    if (filters.minPrice && product.price < filters.minPrice) return false
    if (filters.maxPrice && product.price > filters.maxPrice) return false
    // Показываем все товары по умолчанию, фильтр inStock только скрывает товары с нулевым остатком
    if (filters.inStock && product.stock_qty === 0) return false
    if (filters.isActive !== undefined && product.is_active !== filters.isActive) return false
    return true
  })
}

export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'name' | 'stock'
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
    case 'stock':
      return sorted.sort((a, b) => b.stock_qty - a.stock_qty)
    default:
      return sorted
  }
}

export function paginateProducts(
  products: Product[],
  page: number = 1,
  limit: number = 50
): { products: Product[], total: number, totalPages: number, currentPage: number } {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = products.slice(startIndex, endIndex)
  
  return {
    products: paginatedProducts,
    total: products.length,
    totalPages: Math.ceil(products.length / limit),
    currentPage: page
  }
}

export function getStockLabel(stock_qty: number): { label: string, color: string } {
  if (stock_qty === 0) {
    return { label: 'Out of Stock', color: 'text-red-400' }
  } else if (stock_qty <= 5) {
    return { label: 'Low', color: 'text-red-400' }
  } else if (stock_qty <= 20) {
    return { label: 'Limited', color: 'text-yellow-400' }
  } else {
    return { label: 'High', color: 'text-neon-green' }
  }
}

export function validateVIN(vin: string): { isValid: boolean, error?: string } {
  // Remove spaces and convert to uppercase
  const cleanVin = vin.replace(/\s/g, '').toUpperCase()
  
  // Check length
  if (cleanVin.length !== 17) {
    return { isValid: false, error: 'VIN must contain exactly 17 characters' }
  }
  
  // Check for invalid characters (I, O, Q)
  if (/[IOQ]/.test(cleanVin)) {
    return { isValid: false, error: 'VIN cannot contain letters I, O, Q' }
  }
  
  // Check for valid characters (only letters and numbers)
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin)) {
    return { isValid: false, error: 'VIN can only contain Latin letters and numbers' }
  }
  
  return { isValid: true }
}

export function createVinRequest(
  vin: string,
  user_id?: string,
  email?: string,
  phone?: string,
  comment?: string
): VinRequest {
  const now = new Date()
  const requestId = `OMN-VIN-${now.getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`
  
  return {
    id: requestId,
    vin: vin.toUpperCase(),
    user_id,
    email,
    phone,
    comment,
    status: 'NEW',
    created_at: now,
    updated_at: now
  }
}

export { carBrands, partCategories }

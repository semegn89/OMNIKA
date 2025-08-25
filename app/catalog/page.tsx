'use client'

import React, { useState, useEffect } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { generateProducts, filterProducts, sortProducts, carBrands, partCategories, Product } from '@/lib/products'
import { Filter, Grid, List, Search, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    inStock: false
  })
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'name'>('price-asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Generate products on component mount
    const generatedProducts = generateProducts(5000)
    setProducts(generatedProducts)
    setFilteredProducts(generatedProducts)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Apply filters and search
    let filtered = products

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply filters
    filtered = filterProducts(filtered, filters)

    // Apply sorting
    filtered = sortProducts(filtered, sortBy)

    setFilteredProducts(filtered)
  }, [products, filters, sortBy, searchTerm])

  const handleAddToCart = (product: Product) => {
    toast.success(`${product.name} added to cart!`)
    // Here you would typically add to cart state/context
  }

  const handleAddToFavorites = (product: Product) => {
    toast.success(`${product.name} added to favorites!`)
    // Here you would typically add to favorites state/context
  }

  const clearFilters = () => {
    setFilters({
      brand: '',
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      inStock: false
    })
    setSearchTerm('')
  }

  if (isLoading) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
          <div className="text-neon-blue text-xl">Loading catalog...</div>
        </div>
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-dark-800 to-dark-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Auto Parts Catalog
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Discover our extensive collection of premium auto parts for every European brand
                </p>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for parts, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors"
                />
              </div>

              {/* Filter Toggle and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white hover:border-neon-blue transition-colors"
                >
                  <Filter size={20} />
                  <span>Filters</span>
                  <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="name">Name A-Z</option>
                  </select>

                  <div className="text-gray-400 text-sm">
                    {filteredProducts.length} products found
                  </div>
                </div>
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-dark-800 border border-dark-600 rounded-lg p-6 space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Brand Filter */}
                      <div>
                        <label className="block text-white font-medium mb-2">Brand</label>
                        <select
                          value={filters.brand}
                          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                        >
                          <option value="">All Brands</option>
                          {carBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>

                      {/* Category Filter */}
                      <div>
                        <label className="block text-white font-medium mb-2">Category</label>
                        <select
                          value={filters.category}
                          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                          className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                        >
                          <option value="">All Categories</option>
                          {partCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="block text-white font-medium mb-2">Price Range</label>
                        <div className="space-y-2">
                          <input
                            type="number"
                            placeholder="Min Price"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                          />
                          <input
                            type="number"
                            placeholder="Max Price"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                          />
                        </div>
                      </div>

                      {/* Stock Filter */}
                      <div>
                        <label className="block text-white font-medium mb-2">Availability</label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.inStock}
                            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                            className="rounded border-dark-600 bg-dark-700 text-neon-blue focus:ring-neon-blue"
                          />
                          <span className="text-gray-300">In Stock Only</span>
                        </label>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex justify-end">
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-neon-blue hover:text-white transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onAddToFavorites={handleAddToFavorites}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-xl mb-4">No products found</div>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-neon-blue text-dark-900 font-medium rounded-lg hover:bg-neon-green transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}

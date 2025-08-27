'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Product, filterProducts, sortProducts, paginateProducts, generateProducts } from '@/lib/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import VinSearch from '@/components/VinSearch'
import Pagination from '@/components/Pagination'

export default function CatalogPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(50)
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [inStock, setInStock] = useState(false)
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'name' | 'stock'>('name')

  // Get unique brands and categories
  const brands = Array.from(new Set(products.map(p => p.brand))).sort()
  const categories = Array.from(new Set(products.map(p => p.category))).sort()

  useEffect(() => {
    // Generate products using the function from lib/products.ts
    const generatedProducts = generateProducts(5000)
    setProducts(generatedProducts)
  }, [])

  useEffect(() => {
    // Apply filters and sorting
    let filtered = filterProducts(products, {
      brand: selectedBrand || undefined,
      category: selectedCategory || undefined,
      minPrice: priceRange.min || undefined,
      maxPrice: priceRange.max || undefined,
      inStock: inStock || undefined
    })

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply sorting
    filtered = sortProducts(filtered, sortBy)
    
    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchTerm, selectedBrand, selectedCategory, priceRange, inStock, sortBy])

  // Get current page products
  const paginatedData = paginateProducts(filteredProducts, currentPage, itemsPerPage)
  const currentProducts = paginatedData.products
  const totalPages = paginatedData.totalPages

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Update URL params
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/catalog?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedBrand('')
    setSelectedCategory('')
    setPriceRange({ min: 0, max: 1000 })
    setInStock(false)
    setSortBy('name' as const)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{t('catalog.title')}</h1>
              <p className="text-gray-400">{t('catalog.subtitle')}</p>
            </div>

            {/* VIN Search */}
            <div className="mb-8">
              <VinSearch />
            </div>

            {/* Search and Filters */}
            <div className="bg-dark-800 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder={t('catalog.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors duration-200"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'rating' | 'reviews' | 'name' | 'stock')}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-colors duration-200"
                  >
                    <option value="name">{t('catalog.name')}</option>
                    <option value="price-asc">{t('catalog.priceAsc')}</option>
                    <option value="price-desc">{t('catalog.priceDesc')}</option>
                    <option value="rating">{t('catalog.rating')}</option>
                    <option value="reviews">{t('catalog.reviews')}</option>
                    <option value="stock">{t('catalog.stock')}</option>
                  </select>
                </div>

                {/* In Stock Filter */}
                <div className="flex items-end">
                  <label className="flex items-center text-white bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 hover:border-neon-green/50 transition-colors duration-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="mr-3 w-4 h-4 text-neon-green bg-dark-600 border-dark-500 rounded focus:ring-neon-green focus:ring-2"
                    />
                    {t('catalog.hideOutOfStock')}
                  </label>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-dark-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white rounded-lg transition-colors duration-200 text-sm"
                >
                  {t('catalog.clearFilters')}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Brand Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-colors duration-200"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-colors duration-200"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Price Range (€)
                  </label>
                  <div className="flex space-x-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedBrand || selectedCategory || priceRange.min > 0 || priceRange.max < 1000) && (
                <div className="mt-6 pt-6 border-t border-dark-600">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-400">Active filters:</span>
                    {selectedBrand && (
                      <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm">
                        Brand: {selectedBrand}
                      </span>
                    )}
                    {selectedCategory && (
                      <span className="px-3 py-1 bg-neon-green/20 text-neon-green rounded-full text-sm">
                        Category: {selectedCategory}
                      </span>
                    )}
                    {(priceRange.min > 0 || priceRange.max < 1000) && (
                      <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm">
                        Price: €{priceRange.min} - €{priceRange.max}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <p className="text-gray-400">
                  <span className="font-semibold text-white">{filteredProducts.length}</span> {t('catalog.productsFound')}
                </p>
                {searchTerm && (
                  <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm">
                    Search: "{searchTerm}"
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">{t('catalog.noProducts')}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

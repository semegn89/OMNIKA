'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Product, filterProducts, sortProducts, paginateProducts } from '@/lib/products'
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
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [inStock, setInStock] = useState(false)
  const [sortBy, setSortBy] = useState('name')

  // Get unique brands and categories
  const brands = [...new Set(products.map(p => p.brand))].sort()
  const categories = [...new Set(products.map(p => p.category))].sort()

  useEffect(() => {
    // Generate products (in real app, this would be an API call)
    const generatedProducts = Array.from({ length: 200 }, (_, i) => ({
      id: `product-${i + 1}`,
      sku: `SKU-${String(i + 1).padStart(6, '0')}`,
      name: `Auto Part ${i + 1}`,
      brand: ['Mercedes', 'BMW', 'Audi', 'Volkswagen', 'Porsche'][i % 5],
      model: ['C-Class', '3 Series', 'A4', 'Golf', '911'][i % 5],
      category: ['Engine', 'Suspension', 'Brakes', 'Electronics', 'Transmission'][i % 5],
      description: `High-quality auto part for European cars. Part number ${i + 1}.`,
      price: Math.floor(Math.random() * 500) + 50,
      rating: 4 + Math.random(),
      reviews: Math.floor(Math.random() * 100),
      stock_qty: Math.floor(Math.random() * 100) + 1,
      is_active: true,
      images: [`/api/placeholder/300/200?text=Part+${i + 1}`]
    }))
    
    setProducts(generatedProducts)
  }, [])

  useEffect(() => {
    // Apply filters and sorting
    let filtered = filterProducts(products, {
      searchTerm,
      brand: selectedBrand,
      category: selectedCategory,
      priceRange,
      inStock
    })

    // Apply sorting
    filtered = sortProducts(filtered, sortBy)
    
    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchTerm, selectedBrand, selectedCategory, priceRange, inStock, sortBy])

  // Get current page products
  const currentProducts = paginateProducts(filteredProducts, currentPage, itemsPerPage)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

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
    setPriceRange({ min: 0, max: 10000 })
    setInStock(false)
    setSortBy('name')
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {/* Search */}
              <div className="lg:col-span-2">
                <input
                  type="text"
                  placeholder={t('catalog.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                />
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
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
              <div className="flex items-center">
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="mr-2"
                  />
                  {t('catalog.hideOutOfStock')}
                </label>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-dark-800 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price Range (€)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="flex-1 px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <div className="mt-4">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-colors duration-200"
                >
                  {t('catalog.clearFilters')}
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                {filteredProducts.length} {t('catalog.productsFound')}
              </p>
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

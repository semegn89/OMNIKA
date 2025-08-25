'use client'

import React from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { Product } from '@/lib/products'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onAddToFavorites: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart, onAddToFavorites }: ProductCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-dark-800 border border-dark-700 rounded-lg overflow-hidden hover:border-neon-blue/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
        
        {/* Stock Status */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.inStock 
              ? 'bg-neon-green/20 text-neon-green border border-neon-green/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onAddToFavorites(product)}
          className="absolute top-3 right-3 p-2 bg-dark-800/80 rounded-full hover:bg-neon-blue/20 transition-colors duration-200"
        >
          <Heart size={16} className="text-gray-400 hover:text-red-400 transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Category */}
        <div className="flex items-center justify-between">
          <span className="text-neon-blue text-sm font-medium">{product.brand}</span>
          <span className="text-gray-400 text-xs">{product.category}</span>
        </div>

        {/* Name */}
        <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-neon-blue transition-colors duration-200">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">
            €{product.price.toLocaleString()}
          </span>
          
          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-medium rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">{t('catalog.addToCart')}</span>
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-neon-blue/0 group-hover:border-neon-blue/30 rounded-lg transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}

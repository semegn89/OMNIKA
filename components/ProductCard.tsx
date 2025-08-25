'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { Product, getStockLabel } from '@/lib/products'
import { Star, ShoppingCart, Heart, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  onAddToFavorites: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart, onAddToFavorites }: ProductCardProps) {
  const { t } = useLanguage()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const stockLabel = getStockLabel(product.stock_qty)
  const maxQuantity = Math.min(10, product.stock_qty)
  const isInStock = product.stock_qty > 0

  const handleAddToCart = async () => {
    if (!isInStock) {
      toast.error('Product is out of stock')
      return
    }

    if (quantity > maxQuantity) {
      toast.error(`Maximum ${maxQuantity} items available for order`)
      return
    }

    setIsAddingToCart(true)
    
    // Simulate API call
    setTimeout(() => {
      onAddToCart(product, quantity)
      toast.success(`${product.name} added to cart (${quantity} items)`)
      setQuantity(1)
      setIsAddingToCart(false)
    }, 500)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity)
    }
  }

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
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
            isInStock 
              ? 'bg-neon-green/20 text-neon-green border-neon-green/30' 
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          }`}>
            {isInStock ? `In Stock: ${product.stock_qty}` : 'Out of Stock'}
          </span>
        </div>

        {/* Stock Level Badge */}
        {isInStock && (
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-dark-800/80 border ${
              stockLabel.color === 'text-red-400' ? 'border-red-500/30 text-red-400' :
              stockLabel.color === 'text-yellow-400' ? 'border-yellow-500/30 text-yellow-400' :
              'border-neon-green/30 text-neon-green'
            }`}>
              {stockLabel.label}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onAddToFavorites(product)}
          className="absolute top-12 right-3 p-2 bg-dark-800/80 rounded-full hover:bg-neon-blue/20 transition-colors duration-200"
        >
          <Heart size={16} className="text-gray-400 hover:text-red-400 transition-colors" />
        </button>

        {/* SKU Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-dark-800/80 text-gray-300">
            {product.sku}
          </span>
        </div>
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

        {/* Model */}
        {product.model && (
          <p className="text-gray-400 text-xs">{product.model}</p>
        )}

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

        {/* Price and Add to Cart */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">
              €{product.price.toLocaleString()}
            </span>
            
            {!isInStock && (
              <div className="flex items-center space-x-1 text-red-400 text-sm">
                <AlertCircle size={14} />
                <span>On Order</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          {isInStock && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Quantity:</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-6 h-6 bg-dark-700 border border-dark-600 rounded flex items-center justify-center text-white hover:bg-dark-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center text-white font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= maxQuantity}
                  className="w-6 h-6 bg-dark-700 border border-dark-600 rounded flex items-center justify-center text-white hover:bg-dark-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              <span className="text-gray-400 text-xs">max {maxQuantity}</span>
            </div>
          )}
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!isInStock || isAddingToCart}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-medium rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <div className="w-4 h-4 border-2 border-dark-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingCart size={16} />
            )}
            <span className="text-sm">
              {isInStock ? t('catalog.addToCart') : 'On Order'}
            </span>
          </button>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-neon-blue/0 group-hover:border-neon-blue/30 rounded-lg transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}

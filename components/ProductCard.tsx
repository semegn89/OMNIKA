'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage()
  const { add, canAdd } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const maxQuantity = Math.min(10, product.stock_qty)
  const stockLabel = getStockLabel(product.stock_qty)

  const handleAddToCart = async () => {
    if (!canAdd(product.sku, quantity)) {
      toast.error(t('cart.outOfStock'))
      return
    }

    setIsAdding(true)
    try {
      add(product.sku, quantity, product)
      toast.success(t('cart.addToCart'))
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsAdding(false)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, Math.min(newQuantity, maxQuantity))
    setQuantity(clampedQuantity)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-neon-blue/50 transition-all duration-300 group"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[0] || '/placeholder-product.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            stockLabel === 'Low' ? 'bg-yellow-500 text-yellow-900' :
            stockLabel === 'Limited' ? 'bg-orange-500 text-orange-900' :
            'bg-neon-green text-dark-900'
          }`}>
            {stockLabel}
          </span>
        </div>
        {product.stock_qty === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">{t('cart.outOfStock')}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 mb-1">
            {product.brand} • {product.model} • {product.category}
          </p>
          <p className="text-xs text-gray-500">SKU: {product.sku}</p>
        </div>

        {/* Stock Info */}
        <div className="mb-3">
          <p className="text-sm text-gray-300">
            {t('cart.stock')}: {product.stock_qty} {t('cart.items')}
          </p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-neon-blue">
            €{product.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('cart.quantity')}:
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded bg-dark-700 text-white hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 h-8 text-center bg-dark-700 text-white rounded border border-dark-600"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity}
              className="w-8 h-8 rounded bg-dark-700 text-white hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {t('cart.maxQuantity')}: {maxQuantity}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock_qty === 0 || isAdding}
          className="w-full bg-gradient-to-r from-neon-blue to-neon-green hover:from-neon-green hover:to-neon-blue disabled:bg-dark-600 disabled:cursor-not-allowed text-dark-900 font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
        >
          {isAdding ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-dark-900 mr-2"></div>
              Adding...
            </div>
          ) : (
            t('cart.addToCart')
          )}
        </button>
      </div>
    </motion.div>
  )
}

function getStockLabel(stockQty: number): string {
  if (stockQty === 0) return 'Out of Stock'
  if (stockQty <= 5) return 'Low'
  if (stockQty <= 20) return 'Limited'
  return 'In Stock'
}

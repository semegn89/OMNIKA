'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '@/lib/cart'
import { useLanguage } from '@/contexts/LanguageContext'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { t } = useLanguage()
  const { cart, updateQuantity, remove, clear, total, isEmpty } = useCart()

  const handleQuantityChange = (sku: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      remove(sku)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(sku, newQuantity)
    }
  }

  const handleRemoveItem = (sku: string) => {
    remove(sku)
    toast.success('Item removed from cart')
  }

  const handleClearCart = () => {
    clear()
    toast.success('Cart cleared')
  }

  const shipping = cart.items.length > 0 ? 15 : 0
  const tax = (total() + shipping) * 0.19 // 19% VAT
  const grandTotal = total() + shipping + tax

  if (isEmpty()) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">{t('cart.title')}</h1>
              <p className="text-gray-400 text-lg">{t('cart.empty')}</p>
            </div>
            
            <Link
              href="/catalog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              {t('cart.continueShopping')}
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">{t('cart.title')}</h1>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              {t('cart.clear')}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {cart.items.length} {t('cart.items')}
                </h2>
                
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.sku}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg"
                    >
                      {/* Item Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate">{item.name}</h3>
                        <p className="text-gray-400 text-sm">SKU: {item.sku}</p>
                        <p className="text-blue-400 font-semibold">€{item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.sku, item.quantity - 1)}
                          className="w-8 h-8 rounded bg-gray-600 text-white hover:bg-gray-500 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.sku, item.quantity + 1)}
                          disabled={item.quantity >= item.stock_qty}
                          className="w-8 h-8 rounded bg-gray-600 text-white hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-white font-semibold">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.sku)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-white mb-6">{t('checkout.orderSummary')}</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.subtotal')}:</span>
                    <span>€{total().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.shipping')}:</span>
                    <span>€{shipping.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.tax')} (19%):</span>
                    <span>€{tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>{t('cart.total')}:</span>
                      <span>€{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center block"
                  >
                    {t('cart.checkout')}
                  </Link>
                  
                  <Link
                    href="/catalog"
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center block"
                  >
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/lib/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { cart, cartTotal, isEmpty, removeFromCart, updateQuantity, clearCart } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      toast.success('Item removed from cart')
    } else {
      const item = cart.items.find(item => item.product.id === productId)
      if (item) {
        const maxQuantity = Math.min(10, item.product.stock_qty)
        if (newQuantity > maxQuantity) {
          toast.error(`Maximum ${maxQuantity} items available for this product`)
          return
        }
        updateQuantity(productId, newQuantity)
        toast.success('Cart updated')
      }
    }
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
    toast.success('Item removed from cart')
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  const handleCheckout = () => {
    if (isEmpty) {
      toast.error('Your cart is empty')
      return
    }
    router.push('/checkout')
  }

  const getStockStatus = (stockQty: number) => {
    if (stockQty === 0) return { text: t('cart.outOfStock'), color: 'text-red-500' }
    if (stockQty <= 5) return { text: t('cart.lowStock'), color: 'text-yellow-500' }
    return { text: t('cart.inStock'), color: 'text-green-500' }
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{t('cart.title')}</h1>
              <p className="text-xl text-gray-300 mb-8">{t('cart.empty')}</p>
              <button
                onClick={() => router.push('/catalog')}
                className="px-8 py-3 bg-neon-blue text-dark-900 font-semibold rounded-lg hover:bg-neon-green transition-colors"
              >
                {t('cart.continueShopping')}
              </button>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-neon-blue hover:text-neon-green transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <h1 className="text-3xl font-bold text-white">{t('cart.title')}</h1>
            </div>
            <button
              onClick={handleClearCart}
              className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 size={20} />
              <span>{t('cart.clear')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-800 border border-dark-600 rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6">
                  {cart.items.length} {t('cart.items')}
                </h2>

                <div className="space-y-6">
                  {cart.items.map((item) => {
                    const stockStatus = getStockStatus(item.product.stock_qty)
                    const maxQuantity = Math.min(10, item.product.stock_qty)
                    
                    return (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-4 p-4 bg-dark-700 rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-dark-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-400 text-xs">IMG</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{item.product.name}</h3>
                          <p className="text-gray-400 text-sm">SKU: {item.product.sku}</p>
                          <p className="text-gray-400 text-sm">Brand: {item.product.brand}</p>
                          <p className={`text-sm ${stockStatus.color}`}>{stockStatus.text}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 bg-dark-600 text-gray-300 rounded-lg hover:bg-dark-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center text-white font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= maxQuantity}
                            className="w-8 h-8 bg-dark-600 text-gray-300 rounded-lg hover:bg-dark-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-white font-semibold">€{(item.product.price * item.quantity).toFixed(2)}</p>
                          <p className="text-gray-400 text-sm">€{item.product.price.toFixed(2)} each</p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-dark-800 border border-dark-600 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.subtotal')}</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.shipping')}</span>
                    <span>€8.00</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.tax')}</span>
                    <span>€{(cartTotal * 0.19).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-dark-600 pt-4">
                    <div className="flex justify-between text-white font-semibold text-lg">
                      <span>{t('cart.total')}</span>
                      <span>€{(cartTotal + 8 + (cartTotal * 0.19)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-neon-blue text-dark-900 font-semibold py-3 px-6 rounded-lg hover:bg-neon-green transition-colors"
                >
                  {t('cart.checkout')}
                </button>

                <button
                  onClick={() => router.push('/catalog')}
                  className="w-full mt-3 bg-dark-700 text-white font-semibold py-3 px-6 rounded-lg border border-dark-600 hover:border-neon-blue transition-colors"
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

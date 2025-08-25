'use client'

import React, { useState, useEffect } from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, CreditCard, AlertCircle } from 'lucide-react'
import { Product } from '@/lib/products'
import toast from 'react-hot-toast'

interface CartItem {
  product: Product
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading cart items from localStorage or API
    setTimeout(() => {
      // For demo purposes, let's add some sample items
      const sampleProducts: Product[] = [
        {
          id: 'prod_1',
          sku: 'MER-BRA-000001',
          name: 'Brake Pads for Mercedes',
          price: 89,
          image: 'https://via.placeholder.com/300x200/1e293b/00d4ff?text=Brake+Pads',
          brand: 'Mercedes',
          model: 'Mercedes 2020',
          category: 'Brakes',
          description: 'High-quality brake pads for Mercedes vehicles',
          stock_qty: 15,
          is_active: true,
          images: ['https://via.placeholder.com/300x200/1e293b/00d4ff?text=Brake+Pads'],
          rating: 4.5,
          reviews: 127
        },
        {
          id: 'prod_2',
          sku: 'BMW-ENG-000002',
          name: 'Oil Filter for BMW',
          price: 24,
          image: 'https://via.placeholder.com/300x200/1e293b/00ff88?text=Oil+Filter',
          brand: 'BMW',
          model: 'BMW 2019',
          category: 'Engine',
          description: 'Premium oil filter for BMW engines',
          stock_qty: 8,
          is_active: true,
          images: ['https://via.placeholder.com/300x200/1e293b/00ff88?text=Oil+Filter'],
          rating: 4.2,
          reviews: 89
        }
      ]

      setCartItems([
        { product: sampleProducts[0], quantity: 2 },
        { product: sampleProducts[1], quantity: 1 }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const updateQuantity = (productId: string, newQuantity: number) => {
    const item = cartItems.find(item => item.product.id === productId)
    if (!item) return

    const maxQuantity = Math.min(10, item.product.stock_qty)
    
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }

    if (newQuantity > maxQuantity) {
      toast.error(`Доступно к заказу не более ${maxQuantity} шт.`)
      return
    }

    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
    toast.success('Корзина обновлена!')
  }

  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId))
    toast.success('Товар удален из корзины!')
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const getShipping = () => {
    return getSubtotal() > 100 ? 0 : 15
  }

  const getTotal = () => {
    return getSubtotal() + getShipping()
  }

  const getStockStatus = (item: CartItem) => {
    if (item.product.stock_qty === 0) {
      return { status: 'out-of-stock', message: 'Нет в наличии' }
    }
    if (item.quantity > item.product.stock_qty) {
      return { status: 'insufficient', message: `Доступно только ${item.product.stock_qty} шт.` }
    }
    if (item.product.stock_qty <= 5) {
      return { status: 'low-stock', message: `Осталось ${item.product.stock_qty} шт.` }
    }
    return { status: 'in-stock', message: 'В наличии' }
  }

  if (isLoading) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
          <div className="text-neon-blue text-xl">Loading cart...</div>
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Shopping Cart
                </h1>
                <p className="text-xl text-gray-300">
                  Review your items and proceed to checkout
                </p>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                <p className="text-gray-300 mb-8">Add some products to your cart to get started.</p>
                <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300">
                  Browse Catalog
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Cart Items ({cartItems.length})</h2>
                  
                  <AnimatePresence>
                    {cartItems.map((item, index) => {
                      const stockStatus = getStockStatus(item)
                      const maxQuantity = Math.min(10, item.product.stock_qty)
                      
                      return (
                        <motion.div
                          key={item.product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-dark-800 border border-dark-700 rounded-lg p-6"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-dark-700 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-semibold text-lg mb-1">{item.product.name}</h3>
                              <p className="text-gray-400 text-sm mb-2">{item.product.brand} • {item.product.category}</p>
                              <p className="text-gray-400 text-xs mb-2">SKU: {item.product.sku}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-neon-blue font-bold text-lg">€{item.product.price}</span>
                                <span className="text-gray-400 text-sm">each</span>
                              </div>
                              
                              {/* Stock Status */}
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`text-xs font-medium ${
                                  stockStatus.status === 'out-of-stock' ? 'text-red-400' :
                                  stockStatus.status === 'insufficient' ? 'text-yellow-400' :
                                  stockStatus.status === 'low-stock' ? 'text-yellow-400' :
                                  'text-neon-green'
                                }`}>
                                  {stockStatus.message}
                                </span>
                                {stockStatus.status === 'out-of-stock' && (
                                  <AlertCircle className="w-4 h-4 text-red-400" />
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-8 h-8 bg-dark-700 border border-dark-600 rounded-lg flex items-center justify-center text-white hover:bg-dark-600 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center text-white font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= maxQuantity || item.product.stock_qty === 0}
                                  className="w-8 h-8 bg-dark-700 border border-dark-600 rounded-lg flex items-center justify-center text-white hover:bg-dark-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-dark-600 flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Subtotal for this item:</span>
                            <span className="text-white font-bold text-lg">€{(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 sticky top-24">
                    <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Subtotal</span>
                        <span className="text-white font-semibold">€{getSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Shipping</span>
                        <span className="text-white font-semibold">
                          {getShipping() === 0 ? 'Free' : `€${getShipping().toFixed(2)}`}
                        </span>
                      </div>
                      {getShipping() > 0 && (
                        <div className="text-neon-green text-sm">
                          Add €{(100 - getSubtotal()).toFixed(2)} more for free shipping
                        </div>
                      )}
                      <div className="border-t border-dark-600 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-lg">Total</span>
                          <span className="text-white font-bold text-2xl">€{getTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300 mb-4">
                      <CreditCard className="w-5 h-5" />
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <div className="text-center">
                      <p className="text-gray-400 text-sm">
                        Secure checkout powered by Stripe
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}

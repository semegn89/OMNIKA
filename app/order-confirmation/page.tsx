'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { cartManager } from '@/lib/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CheckCircle, Package, Truck, Calendar, ArrowRight } from 'lucide-react'

interface Order {
  id: string
  items: Array<{
    product: {
      id: string
      name: string
      price: number
      sku: string
    }
    quantity: number
  }>
  customer: {
    fullName: string
    email: string
    phone: string
    address: {
      country: string
      city: string
      address: string
      postalCode: string
    }
  }
  shipping: {
    method: string
    cost: number
  }
  payment: {
    method: string
  }
  totals: {
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
  status: string
  createdAt: string
}

export default function OrderConfirmationPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [order, setOrder] = useState<Order | null>(null)
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>('')

  useEffect(() => {
    const lastOrder = cartManager.getLastOrder()
    if (!lastOrder) {
      router.push('/catalog')
      return
    }

    setOrder(lastOrder)

    // Calculate estimated delivery
    const orderDate = new Date(lastOrder.createdAt)
    const shippingDays = lastOrder.shipping.method === 'express' ? 2 : 5
    const deliveryDate = new Date(orderDate)
    deliveryDate.setDate(deliveryDate.getDate() + shippingDays)
    
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
  }, [router])

  if (!order) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-neon-green rounded-full mb-6">
              <CheckCircle size={40} className="text-dark-900" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{t('orderConfirmation.title')}</h1>
            <p className="text-xl text-gray-300">{t('orderConfirmation.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-800 border border-dark-600 rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">{t('orderConfirmation.orderDetails')}</h2>
              
              {/* Order Info */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('orderConfirmation.orderNumber')}</span>
                  <span className="text-neon-blue font-mono font-semibold">{order.id}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{t('orderConfirmation.estimatedDelivery')}</span>
                  <span className="text-white">{estimatedDelivery}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status</span>
                  <span className="text-neon-green font-semibold capitalize">{order.status}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t border-dark-600 pt-4 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Customer Information</h3>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Name:</strong> {order.customer.fullName}</p>
                  <p><strong>Email:</strong> {order.customer.email}</p>
                  <p><strong>Phone:</strong> {order.customer.phone}</p>
                  <p><strong>Address:</strong></p>
                  <p className="ml-4">
                    {order.customer.address.address}<br />
                    {order.customer.address.city}, {order.customer.address.postalCode}<br />
                    {order.customer.address.country}
                  </p>
                </div>
              </div>

              {/* Shipping & Payment */}
              <div className="border-t border-dark-600 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Shipping</h4>
                    <p className="text-gray-300 capitalize">{order.shipping.method}</p>
                    <p className="text-gray-400 text-sm">€{order.shipping.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Payment</h4>
                    <p className="text-gray-300 capitalize">{order.payment.method}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Items & Totals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-dark-800 border border-dark-600 rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Order Items</h2>
              
              {/* Items List */}
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center p-4 bg-dark-700 rounded-lg">
                    <div className="flex-1">
                      <div className="text-white font-medium">{item.product.name}</div>
                      <div className="text-gray-400 text-sm">SKU: {item.product.sku}</div>
                      <div className="text-gray-400 text-sm">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-white font-semibold">
                      €{(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-dark-600 pt-4 space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>{t('cart.subtotal')}</span>
                  <span>€{order.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{t('cart.shipping')}</span>
                  <span>€{order.totals.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{t('cart.tax')}</span>
                  <span>€{order.totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-xl border-t border-dark-600 pt-3">
                  <span>{t('cart.total')}</span>
                  <span>€{order.totals.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-dark-800 border border-dark-600 rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Package size={24} className="text-neon-blue" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Order Processing</h4>
                  <p className="text-gray-400 text-sm">We'll start processing your order immediately</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Truck size={24} className="text-neon-green" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Shipping</h4>
                  <p className="text-gray-400 text-sm">Your order will be shipped within 1-2 business days</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Calendar size={24} className="text-neon-blue" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Delivery</h4>
                  <p className="text-gray-400 text-sm">Expected delivery: {estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => router.push('/catalog')}
              className="flex items-center justify-center space-x-2 bg-neon-blue text-dark-900 font-semibold py-3 px-6 rounded-lg hover:bg-neon-green transition-colors"
            >
              <ArrowRight size={20} />
              <span>{t('orderConfirmation.continueShopping')}</span>
            </button>
            
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center justify-center space-x-2 bg-dark-700 text-white font-semibold py-3 px-6 rounded-lg border border-dark-600 hover:border-neon-blue transition-colors"
            >
              <span>View Order History</span>
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

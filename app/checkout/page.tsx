'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/lib/cart'
import { cartManager } from '@/lib/cart'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react'
import toast from 'react-hot-toast'

interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  country: string
  city: string
  address: string
  postalCode: string
  shippingMethod: 'standard' | 'express'
  paymentMethod: 'card' | 'sepa' | 'paypal'
  termsAgreement: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { cart, cartTotal, isEmpty, clearCart } = useCart()
  
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    termsAgreement: false
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    if (isEmpty) {
      router.push('/catalog')
    }
  }, [isEmpty, router])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required fields
    if (!form.fullName.trim()) {
      newErrors.fullName = t('checkout.required')
    }

    if (!form.email.trim()) {
      newErrors.email = t('checkout.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('checkout.invalidEmail')
    }

    if (!form.phone.trim()) {
      newErrors.phone = t('checkout.required')
    } else if (!/^\+40\s?\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('checkout.invalidPhone')
    }

    if (!form.country.trim()) {
      newErrors.country = t('checkout.required')
    }

    if (!form.city.trim()) {
      newErrors.city = t('checkout.required')
    }

    if (!form.address.trim()) {
      newErrors.address = t('checkout.required')
    }

    if (!form.postalCode.trim()) {
      newErrors.postalCode = t('checkout.required')
    }

    if (!form.termsAgreement) {
      newErrors.termsAgreement = t('checkout.required')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof CheckoutForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePhoneChange = (value: string) => {
    // Format phone number for Romania (+40 format)
    let formatted = value.replace(/\D/g, '')
    
    if (formatted.startsWith('40')) {
      formatted = formatted.substring(2)
    }
    
    if (formatted.length > 0) {
      formatted = '+40 ' + formatted
    }
    
    if (formatted.length > 4) {
      formatted = formatted.substring(0, 4) + ' ' + formatted.substring(4)
    }
    
    if (formatted.length > 8) {
      formatted = formatted.substring(0, 8) + '-' + formatted.substring(8)
    }
    
    if (formatted.length > 12) {
      formatted = formatted.substring(0, 12) + '-' + formatted.substring(12)
    }
    
    handleInputChange('phone', formatted)
  }

  const calculateShipping = (): number => {
    return form.shippingMethod === 'express' ? 15 : 8
  }

  const calculateTax = (): number => {
    return cartTotal * 0.19 // 19% VAT for Romania
  }

  const calculateTotal = (): number => {
    return cartTotal + calculateShipping() + calculateTax()
  }

  const generateOrderNumber = (): string => {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    return `OMN-${year}-${random}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create order
      const order = {
        id: generateOrderNumber(),
        items: cart.items,
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: {
            country: form.country,
            city: form.city,
            address: form.address,
            postalCode: form.postalCode
          }
        },
        shipping: {
          method: form.shippingMethod,
          cost: calculateShipping()
        },
        payment: {
          method: form.paymentMethod
        },
        totals: {
          subtotal: cartTotal,
          shipping: calculateShipping(),
          tax: calculateTax(),
          total: calculateTotal()
        },
        status: 'pending',
        createdAt: new Date().toISOString()
      }

      // Save order to localStorage
      cartManager.setLastOrder(order)
      
      // Clear cart
      clearCart()
      
      // Redirect to confirmation
      router.push('/order-confirmation')
      
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('An error occurred during checkout. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isEmpty) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back to Cart */}
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-neon-blue hover:text-neon-green transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-800 border border-dark-600 rounded-lg p-6"
              >
                <h1 className="text-3xl font-bold text-white mb-6">{t('checkout.title')}</h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Customer Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">{t('checkout.customerInfo')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">
                          {t('checkout.fullName')} *
                        </label>
                        <input
                          type="text"
                          value={form.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:outline-none focus:border-neon-blue ${
                            errors.fullName ? 'border-red-500' : 'border-dark-600'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">
                          {t('checkout.email')} *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:outline-none focus:border-neon-blue ${
                            errors.email ? 'border-red-500' : 'border-dark-600'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">
                          {t('checkout.phone')} *
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="+40 (31) 630-12-34"
                          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:outline-none focus:border-neon-blue ${
                            errors.phone ? 'border-red-500' : 'border-dark-600'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">
                          {t('checkout.country')} *
                        </label>
                        <input
                          type="text"
                          value={form.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:outline-none focus:border-neon-blue ${
                            errors.country ? 'border-red-500' : 'border-dark-600'
                          }`}
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">
                          {t('checkout.city')} *
                        </label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:outline-none focus:border-neon-blue ${
                            errors.city ? 'border-red-500' : 'border-dark-600'
                          }`}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2">
                          {t('checkout.postalCode')} *
                        </label>
                        <input
                          type="text"
                          value={form.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:outline-none focus:border-neon-blue ${
                            errors.postalCode ? 'border-red-500' : 'border-dark-600'
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-gray-300 mb-2">
                        {t('checkout.address')} *
                      </label>
                      <textarea
                        value={form.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:outline-none focus:border-neon-blue ${
                          errors.address ? 'border-red-500' : 'border-dark-600'
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                  </div>

                  {/* Shipping & Payment */}
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">{t('checkout.shippingPayment')}</h2>
                    
                    {/* Shipping Method */}
                    <div className="mb-6">
                      <label className="block text-gray-300 mb-3">{t('checkout.shippingMethod')}</label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="standard"
                            checked={form.shippingMethod === 'standard'}
                            onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
                            className="text-neon-blue focus:ring-neon-blue"
                          />
                          <Truck size={20} className="text-gray-400" />
                          <div>
                            <div className="text-white">{t('checkout.standard')}</div>
                            <div className="text-gray-400 text-sm">€8.00</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value="express"
                            checked={form.shippingMethod === 'express'}
                            onChange={(e) => handleInputChange('shippingMethod', e.target.value)}
                            className="text-neon-blue focus:ring-neon-blue"
                          />
                          <Truck size={20} className="text-neon-green" />
                          <div>
                            <div className="text-white">{t('checkout.express')}</div>
                            <div className="text-gray-400 text-sm">€15.00</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-gray-300 mb-3">{t('checkout.paymentMethod')}</label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={form.paymentMethod === 'card'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="text-neon-blue focus:ring-neon-blue"
                          />
                          <CreditCard size={20} className="text-gray-400" />
                          <span className="text-white">{t('checkout.card')}</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="sepa"
                            checked={form.paymentMethod === 'sepa'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="text-neon-blue focus:ring-neon-blue"
                          />
                          <Shield size={20} className="text-gray-400" />
                          <span className="text-white">{t('checkout.sepa')}</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={form.paymentMethod === 'paypal'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="text-neon-blue focus:ring-neon-blue"
                          />
                          <Shield size={20} className="text-gray-400" />
                          <span className="text-white">{t('checkout.paypal')}</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.termsAgreement}
                        onChange={(e) => handleInputChange('termsAgreement', e.target.checked)}
                        className="mt-1 text-neon-blue focus:ring-neon-blue"
                      />
                      <div className="text-gray-300 text-sm">
                        {t('checkout.termsAgreement')}
                      </div>
                    </label>
                    {errors.termsAgreement && (
                      <p className="text-red-500 text-sm mt-1">{errors.termsAgreement}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-neon-blue text-dark-900 font-semibold py-4 px-6 rounded-lg hover:bg-neon-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-dark-900"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        <span>{t('checkout.placeOrder')}</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-dark-800 border border-dark-600 rounded-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold text-white mb-4">{t('checkout.orderSummary')}</h2>
                
                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{item.product.name}</div>
                        <div className="text-gray-400 text-xs">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-white font-medium">€{(item.product.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-dark-600 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.subtotal')}</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.shipping')}</span>
                    <span>€{calculateShipping().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>{t('cart.tax')}</span>
                    <span>€{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-lg border-t border-dark-600 pt-2">
                    <span>{t('cart.total')}</span>
                    <span>€{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

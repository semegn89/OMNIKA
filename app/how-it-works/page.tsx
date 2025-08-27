'use client'

import React from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Search, ShoppingCart, CreditCard, Truck, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: 'Find the part you need',
      description: 'Browse our extensive catalog of 5000+ auto parts. Use our advanced search and filters to find exactly what you need for your vehicle.',
      color: 'neon-blue'
    },
    {
      icon: ShoppingCart,
      title: 'Add it to your cart',
      description: 'Select the parts you need and add them to your shopping cart. Review quantities and specifications before proceeding.',
      color: 'neon-green'
    },
    {
      icon: CreditCard,
      title: 'Pay with your preferred method',
      description: 'Choose from multiple secure payment options including credit cards, bank transfers, and online payment systems.',
      color: 'neon-purple'
    },
    {
      icon: Truck,
      title: 'Receive delivery',
      description: 'Get your parts delivered to your doorstep with fast and reliable shipping. Track your order in real-time.',
      color: 'neon-blue'
    }
  ]

  const benefits = [
    '5000+ Quality Auto Parts',
    'Fast & Secure Shipping',
    '24/7 Customer Support',
    'Money Back Guarantee',
    'OEM Quality Standards',
    'Competitive Prices'
  ]

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-900">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-r from-dark-800 to-dark-900 py-16 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/how-it-works/how-it-works-1.avif"
                alt="How It Works Background"
                fill
                sizes="100vw"
                className="object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-800/80 to-dark-900/80"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  How It Works
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Simple steps to get the auto parts you need, when you need them
                </p>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Steps */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">4 Simple Steps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className={`bg-dark-800 border border-${step.color}/30 rounded-lg p-6 text-center hover:border-${step.color}/60 transition-colors`}>
                      {/* Step Number */}
                      <div className={`w-12 h-12 bg-${step.color} text-dark-900 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4`}>
                        {index + 1}
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-${step.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <step.icon className={`w-8 h-8 text-${step.color}`} />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                    </div>

                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-8 h-8 text-neon-blue" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Benefits */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose OMNIKA?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-3 bg-dark-800 border border-dark-700 rounded-lg p-4 hover:border-neon-green/50 transition-colors"
                  >
                    <CheckCircle className="w-6 h-6 text-neon-green flex-shrink-0" />
                    <span className="text-white font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Process Flow */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">Our Process</h2>
              <div className="bg-dark-800 border border-dark-700 rounded-lg p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">Quality Assurance</h3>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                        <p>All parts are inspected and tested before shipping</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></div>
                        <p>OEM quality standards maintained throughout</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0"></div>
                        <p>Comprehensive warranty on all products</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src="/images/how-it-works/how-it-works-2.avif"
                        alt="OMNIKA Process"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-6">
                      <h3 className="text-2xl font-semibold text-white mb-6">Customer Support</h3>
                      <div className="space-y-4 text-gray-300">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                          <p>24/7 technical support available</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></div>
                          <p>Expert advice on part selection</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0"></div>
                          <p>Fast response times and personalized service</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-neon-blue/20 to-neon-green/20 border border-neon-blue/30 rounded-lg p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Browse our extensive catalog of premium auto parts and experience the OMNIKA difference today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300">
                    Browse Catalog
                  </button>
                  <button className="px-8 py-4 border-2 border-neon-blue text-neon-blue font-bold rounded-lg hover:bg-neon-blue hover:text-dark-900 transition-all duration-300">
                    Contact Us
                  </button>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  )
}

'use client'

import React from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Users, Globe, Target, Shield, Truck, Star, MapPin, Building } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
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
                  About OMNIKA S.R.L.
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  A European company that has made buying auto parts as simple and convenient as possible
                </p>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Who We Are */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Who We Are</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    OMNIKA S.R.L. is a European company that has made buying auto parts as simple and convenient as possible. 
                    We have combined experience working with leading manufacturers and distributors across Europe, 
                    so every customer can order parts for their car from home — with just one click.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-dark-900" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">European Network</h3>
                      <p className="text-gray-400 text-sm">Connected with leading manufacturers</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative w-full h-80 rounded-lg shadow-2xl overflow-hidden">
                    <Image
                      src="/images/about/about-company.jpg" 
                      alt="OMNIKA Company Office" 
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent rounded-lg"></div>
                </div>
              </div>
            </motion.section>

            {/* How We Work */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">How We Work</h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                  Simple three-step process to get your auto parts delivered to your doorstep
                </p>
                <div className="max-w-2xl mx-auto">
                  <div className="relative w-full h-64 rounded-lg shadow-2xl overflow-hidden">
                    <Image
                      src="/images/about/about-team.jpg" 
                      alt="OMNIKA Team" 
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-dark-900 font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Find Your Part</h3>
                  <p className="text-gray-300">
                    Browse our extensive catalog and find the exact part you need for your vehicle
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-dark-900 font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Secure Payment</h3>
                  <p className="text-gray-300">
                    Pay online using any convenient method with our secure payment system
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-dark-900 font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Fast Delivery</h3>
                  <p className="text-gray-300">
                    We deliver your order to your country — fast, reliable, and transparent
                  </p>
                </motion.div>
              </div>
            </motion.section>

            {/* Where We Are */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16"
            >
              <div className="bg-dark-800 border border-dark-700 rounded-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-dark-900" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Where We Are</h2>
                  <p className="text-gray-300 text-lg">
                    Today OMNIKA actively operates in multiple European countries
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h3 className="text-white font-semibold">Czech Republic</h3>
                    <p className="text-gray-400 text-sm">Active operations</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-neon-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-neon-green" />
                    </div>
                    <h3 className="text-white font-semibold">Germany</h3>
                    <p className="text-gray-400 text-sm">Active operations</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-neon-blue" />
                    </div>
                    <h3 className="text-white font-semibold">Poland</h3>
                    <p className="text-gray-400 text-sm">Active operations</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-dark-900" />
                    </div>
                    <h3 className="text-white font-semibold">Romania</h3>
                    <p className="text-gray-400 text-sm">Coming soon</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-neon-blue/10 to-neon-green/10 border border-neon-blue/20 rounded-lg">
                  <p className="text-white text-center">
                    We are now opening our official representative office in Romania. 
                    This is a new step forward for us, and we are very much looking forward to 
                    welcoming customers from Romania, who will now have access to all our services without borders.
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="relative w-full h-80 rounded-lg shadow-2xl overflow-hidden">
                    <Image
                      src="/images/about/about-warehouse.jpg" 
                      alt="OMNIKA Warehouse" 
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Our Mission */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
                  We want every car owner in Europe to be able to easily find the right part at a fair price, 
                  pay for it safely and conveniently, and receive delivery directly in their country.
                </p>
                <div className="max-w-3xl mx-auto">
                  <div className="relative w-full h-64 rounded-lg shadow-2xl overflow-hidden">
                    <Image
                      src="/images/about/about-delivery.jpg" 
                      alt="OMNIKA Delivery Service" 
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-dark-900" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Easy to Find</h3>
                  <p className="text-gray-300">
                    Find the right part at a fair price with our comprehensive catalog
                  </p>
                </div>

                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-dark-900" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Safe Payment</h3>
                  <p className="text-gray-300">
                    Pay safely and conveniently with our secure payment system
                  </p>
                </div>

                <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-dark-900" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">Direct Delivery</h3>
                  <p className="text-gray-300">
                    Receive delivery directly in your country with fast and reliable service
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Why Choose OMNIKA */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="bg-gradient-to-r from-dark-800 to-dark-900 border border-dark-700 rounded-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Why Choose OMNIKA</h2>
                  <p className="text-gray-300 text-lg">
                    Our customers value OMNIKA because they don't need to drive around shops and markets: 
                    all parts — from consumables to major assemblies — are available online and always at hand.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-dark-900 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">European Quality</h3>
                        <p className="text-gray-300 text-sm">Direct partnerships with leading manufacturers</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-dark-900 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Convenient Shopping</h3>
                        <p className="text-gray-300 text-sm">Order from home with just one click</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-dark-900 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Fast Delivery</h3>
                        <p className="text-gray-300 text-sm">Reliable shipping to your doorstep</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-dark-900 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Competitive Prices</h3>
                        <p className="text-gray-300 text-sm">Fair pricing for quality European parts</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-dark-900 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Secure Payments</h3>
                        <p className="text-gray-300 text-sm">Multiple safe payment options available</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-neon-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-dark-900 rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">European Service</h3>
                        <p className="text-gray-300 text-sm">Professional support and customer care</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-neon-blue font-semibold text-lg">
                    OMNIKA — your reliable partner for those who value time, quality, and European-level service
                  </p>
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

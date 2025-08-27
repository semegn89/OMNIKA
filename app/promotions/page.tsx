'use client'

import React from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Percent, Clock, Star, ShoppingCart, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function PromotionsPage() {
  const promotions = [
    {
      id: 1,
      title: 'Mercedes Parts Sale',
      subtitle: 'Up to 20% off Mercedes category',
      description: 'Get premium Mercedes auto parts at unbeatable prices. Limited time offer on engine, suspension, and brake components.',
      discount: '20%',
      endDate: '2024-12-31',
      image: '/images/promotions/mercedes.jpg',
      category: 'Mercedes',
      featured: true
    },
    {
      id: 2,
      title: 'BMW Performance Parts',
      subtitle: '15% off BMW performance upgrades',
      description: 'Enhance your BMW performance with our premium parts. Special pricing on exhaust systems, air filters, and ECU upgrades.',
      discount: '15%',
      endDate: '2024-11-30',
      image: '/images/promotions/bmw.jpg',
      category: 'BMW',
      featured: false
    },
    {
      id: 3,
      title: 'Audi Electronics Sale',
      subtitle: '25% off Audi electronic components',
      description: 'Upgrade your Audi electronics with our premium components. Special offers on sensors, ECUs, and lighting systems.',
      discount: '25%',
      endDate: '2024-10-31',
      image: '/images/promotions/audi.jpg',
      category: 'Audi',
      featured: false
    },
    {
      id: 4,
      title: 'Volkswagen Maintenance',
      subtitle: '10% off VW maintenance parts',
      description: 'Keep your Volkswagen running smoothly with our maintenance parts. Special pricing on filters, fluids, and wear items.',
      discount: '10%',
      endDate: '2024-12-15',
      image: '/images/promotions/volkswagen.jpg',
      category: 'Volkswagen',
      featured: false
    }
  ]

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

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
                src="/images/promotions/promotions-1.jpg"
                alt="Promotions Background"
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
                  Promotions & Offers
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Exclusive deals and special offers on premium auto parts
                </p>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Featured Promotion */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">Featured Offers</h2>
              {promotions.filter(p => p.featured).map((promotion, index) => (
                <motion.div
                  key={promotion.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative bg-gradient-to-r from-neon-blue/20 to-neon-green/20 border border-neon-blue/30 rounded-lg overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Percent className="w-6 h-6 text-neon-green" />
                        <span className="text-neon-green font-bold text-lg">{promotion.discount} OFF</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white">{promotion.title}</h3>
                      <p className="text-xl text-neon-blue font-semibold">{promotion.subtitle}</p>
                      <p className="text-gray-300 leading-relaxed">{promotion.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{getDaysLeft(promotion.endDate)} days left</span>
                        </div>
                        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-bold rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300">
                          <span>Shop Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <Image
                          src={promotion.image}
                          alt={promotion.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        FEATURED
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* All Promotions */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">All Current Offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {promotions.filter(p => !p.featured).map((promotion, index) => (
                  <motion.div
                    key={promotion.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden hover:border-neon-blue/50 transition-colors"
                  >
                    <div className="relative">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={promotion.image}
                          alt={promotion.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute top-4 left-4 bg-neon-green text-dark-900 px-3 py-1 rounded-full text-sm font-bold">
                        {promotion.discount} OFF
                      </div>
                      <div className="absolute top-4 right-4 bg-dark-800/80 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {getDaysLeft(promotion.endDate)}d left
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{promotion.title}</h3>
                        <p className="text-neon-blue font-medium">{promotion.subtitle}</p>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{promotion.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{promotion.category}</span>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-neon-blue text-dark-900 font-medium rounded-lg hover:bg-neon-green transition-colors">
                          <ShoppingCart className="w-4 h-4" />
                          <span>View Offer</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Newsletter Signup */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30 rounded-lg p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter to receive exclusive offers, new product announcements, and special promotions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold rounded-lg hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300">
                    Subscribe
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

'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="OMNIKA Auto Parts Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark-900/80"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-dark-800/50 backdrop-blur-sm border border-neon-blue/30 rounded-full px-6 py-3"
          >
            <Sparkles className="w-5 h-5 text-neon-blue" />
            <span className="text-neon-blue font-medium text-sm">
              Premium Auto Parts
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            <span className="gradient-text">
              {t('hero.title')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Hero Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex justify-center items-center space-x-8 py-8"
          >
            {/* Car Image */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-neon-blue/30">
              <Image
                src="/images/hero/hero-car.jpg"
                alt="Premium European Car"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Parts Image */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-neon-green/30">
              <Image
                src="/images/hero/hero-parts.jpg"
                alt="Quality Auto Parts"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/catalog"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-bold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/25"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{t('hero.ctaCatalog')}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/promotions"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-neon-blue text-neon-blue font-bold text-lg rounded-lg transition-all duration-300 hover:bg-neon-blue hover:text-dark-900 hover:shadow-lg hover:shadow-neon-blue/25"
            >
              <span className="flex items-center space-x-2">
                <span>{t('hero.ctaPromotions')}</span>
              </span>
            </Link>

            <Link
              href="/register"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-neon-green text-neon-green font-bold text-lg rounded-lg transition-all duration-300 hover:bg-neon-green hover:text-dark-900 hover:shadow-lg hover:shadow-neon-green/25"
            >
              <span className="flex items-center space-x-2">
                <span>{t('hero.ctaRegister')}</span>
              </span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-blue mb-2">5000+</div>
              <div className="text-gray-400">Auto Parts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-green mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-purple mb-2">100%</div>
              <div className="text-gray-400">Quality</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-neon-blue rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { locale, setLocale, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/how-it-works', label: t('nav.howItWorks') },
    { href: '/catalog', label: t('nav.catalog') },
    { href: '/promotions', label: t('nav.promotions') },
    { href: '/contacts', label: t('nav.contacts') },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-white font-bold text-xl gradient-text">
              OMNIKA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-neon-blue transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-neon-blue transition-colors duration-200">
                <Globe size={20} />
                <span className="font-medium">{locale.toUpperCase()}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-20 bg-dark-800 border border-dark-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => setLocale('en')}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-dark-700 transition-colors ${
                    locale === 'en' ? 'text-neon-blue' : 'text-gray-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLocale('ro')}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-dark-700 transition-colors ${
                    locale === 'ro' ? 'text-neon-blue' : 'text-gray-300'
                  }`}
                >
                  RO
                </button>
              </div>
            </div>

            {/* Auth Buttons */}
            <Link
              href="/login"
              className="text-gray-300 hover:text-neon-blue transition-colors duration-200"
            >
              <User size={20} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-gray-300 hover:text-neon-blue transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-neon-green text-dark-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-neon-blue transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-t border-dark-700"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-300 hover:text-neon-blue transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-dark-600 space-y-4">
                {/* Language Switcher Mobile */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">{t('nav.language')}:</span>
                  <button
                    onClick={() => setLocale('en')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      locale === 'en' 
                        ? 'bg-neon-blue text-dark-900' 
                        : 'text-gray-300 hover:text-neon-blue'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLocale('ro')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      locale === 'ro' 
                        ? 'bg-neon-blue text-dark-900' 
                        : 'text-gray-300 hover:text-neon-blue'
                    }`}
                  >
                    RO
                  </button>
                </div>

                {/* Auth Buttons Mobile */}
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-neon-blue transition-colors duration-200"
                  >
                    <User size={20} />
                    <span>{t('nav.login')}</span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-neon-blue transition-colors duration-200"
                  >
                    <ShoppingCart size={20} />
                    <span>{t('nav.cart')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

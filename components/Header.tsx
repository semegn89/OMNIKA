'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Menu, X, ShoppingCart, User, ChevronDown, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const { locale, setLocale, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    // Simulate getting cart count from localStorage or context
    // In a real app, this would come from a cart context or API
    const mockCartCount = Math.floor(Math.random() * 5) // 0-4 items for demo
    setCartItemCount(mockCartCount)
  }, [])

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.howItWorks'), href: '/how-it-works' },
    { name: t('nav.catalog'), href: '/catalog' },
    { name: t('nav.promotions'), href: '/promotions' },
    { name: t('nav.contacts'), href: '/contacts' }
  ]

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ro' as const, name: 'Română', flag: '🇷🇴' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg flex items-center justify-center">
              <span className="text-dark-900 font-bold text-sm">O</span>
            </div>
            <span className="text-white font-bold text-xl">OMNIKA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
                <span>{languages.find(lang => lang.code === locale)?.flag}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-32 bg-dark-800 border border-dark-600 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => setLocale(language.code)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-dark-700 transition-colors ${
                      locale === language.code ? 'text-neon-blue' : 'text-gray-300'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-neon-green text-dark-900 text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('nav.login')}
              </Link>
              <span className="text-gray-500">|</span>
              <Link
                href="/register"
                className="px-4 py-2 bg-neon-blue text-dark-900 font-medium rounded-lg hover:bg-neon-green transition-colors"
              >
                {t('nav.register')}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-t border-dark-700"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-dark-600 space-y-4">
                {/* Language Switcher Mobile */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">Language:</span>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLocale(language.code)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        locale === language.code 
                          ? 'bg-neon-blue text-dark-900' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>

                {/* Cart Mobile */}
                <Link
                  href="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="w-5 h-5 bg-neon-green text-dark-900 text-xs font-bold rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* User Actions Mobile */}
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{t('nav.login')}</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 bg-neon-blue text-dark-900 font-medium rounded-lg hover:bg-neon-green transition-colors text-center"
                  >
                    {t('nav.register')}
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

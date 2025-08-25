'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useCart } from '@/lib/cart'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, Menu, X, Globe, ChevronDown } from 'lucide-react'

export default function Header() {
  const { locale, changeLocale, t } = useLanguage()
  const { cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'ro' as const, name: 'Română', flag: '🇷🇴' }
  ]

  const currentLanguage = languages.find(lang => lang.code === locale)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const handleLanguageChange = (newLocale: 'en' | 'ro') => {
    changeLocale(newLocale)
    setIsLanguageDropdownOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.header-menu')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-dark-600">
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
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/catalog" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.catalog')}
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.howItWorks')}
            </Link>
            <Link href="/promotions" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.promotions')}
            </Link>
            <Link href="/contacts" className="text-gray-300 hover:text-white transition-colors">
              {t('nav.contacts')}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-dark-700"
              >
                <Globe size={16} />
                <span className="text-sm">{currentLanguage?.flag} {currentLanguage?.name}</span>
                <ChevronDown size={14} className={`transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-dark-800 border border-dark-600 rounded-lg shadow-lg py-2"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-dark-700 transition-colors ${
                          locale === language.code ? 'text-neon-blue' : 'text-gray-300'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="text-sm">{language.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link 
              href="/cart" 
              className="relative flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-dark-700"
            >
              <ShoppingCart size={20} />
              <span className="text-sm">{t('nav.cart')}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon-blue text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <Link 
                href="/login" 
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                {t('nav.login')}
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-2 bg-neon-blue text-dark-900 font-semibold rounded-lg hover:bg-neon-green transition-colors"
              >
                {t('nav.register')}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-dark-600 py-4 header-menu"
            >
              <nav className="space-y-4">
                <Link 
                  href="/" 
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link 
                  href="/catalog" 
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.catalog')}
                </Link>
                <Link 
                  href="/about" 
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.howItWorks')}
                </Link>
                <Link 
                  href="/promotions" 
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.promotions')}
                </Link>
                <Link 
                  href="/contacts" 
                  className="block text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.contacts')}
                </Link>
              </nav>

              <div className="mt-6 pt-6 border-t border-dark-600 space-y-4">
                {/* Mobile Language Switcher */}
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Language</label>
                  <div className="flex space-x-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                          locale === language.code 
                            ? 'bg-neon-blue text-dark-900' 
                            : 'bg-dark-700 text-gray-300 hover:text-white'
                        }`}
                      >
                        {language.flag} {language.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Cart */}
                <Link 
                  href="/cart" 
                  className="flex items-center justify-between p-3 bg-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <ShoppingCart size={20} />
                    <span>{t('nav.cart')}</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-neon-blue text-dark-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile User Actions */}
                <div className="flex space-x-2">
                  <Link 
                    href="/login" 
                    className="flex-1 px-4 py-2 text-center text-gray-300 hover:text-white transition-colors border border-dark-600 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    href="/register" 
                    className="flex-1 px-4 py-2 text-center bg-neon-blue text-dark-900 font-semibold rounded-lg hover:bg-neon-green transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

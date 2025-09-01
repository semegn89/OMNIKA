'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, Shield } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-dark-800 border-t border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo size="lg" showText={false} />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-neon-blue" />
                <span className="text-gray-300 text-sm">{t('footer.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-neon-green" />
                <a 
                  href="tel:+40316301234" 
                  className="text-gray-300 text-sm hover:text-neon-blue transition-colors"
                >
                  {t('footer.phone')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-neon-blue" />
                <a 
                  href="mailto:support@omnika.com" 
                  className="text-gray-300 text-sm hover:text-neon-blue transition-colors"
                >
                  {t('footer.email')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a 
                  href="mailto:omnikasrl@gmail.com" 
                  className="text-gray-300 text-sm hover:text-neon-green transition-colors"
                >
                  {t('contacts.businessCooperation')}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-neon-blue transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-300 hover:text-neon-blue transition-colors">
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-neon-blue transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-300 hover:text-neon-blue transition-colors">
                  {t('nav.contacts')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal & Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-neon-blue transition-colors flex items-center space-x-2">
                  <Shield size={16} />
                  <span>{t('footer.terms')}</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-neon-blue transition-colors flex items-center space-x-2">
                  <Shield size={16} />
                  <span>{t('footer.privacy')}</span>
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-300 hover:text-neon-blue transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-neon-blue transition-colors">
                  {t('nav.profile')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Globe size={16} />
              <span>Available in EN & RO</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

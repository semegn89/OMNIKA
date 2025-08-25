'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-dark-900 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-white font-bold text-lg gradient-text">
                OMNIKA
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium auto parts for every European brand. Quality, reliability, and competitive prices.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  {t('nav.catalog')}
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  {t('nav.promotions')}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  {t('nav.contacts')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Details */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Company Details</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="text-neon-blue mt-0.5 flex-shrink-0" />
                <span>{t('company.address')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-neon-blue flex-shrink-0" />
                <span>+40 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-neon-blue flex-shrink-0" />
                <span>info@omnika.ro</span>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 OMNIKA S.R.L. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm space-y-1">
              <div>{t('company.cui')}</div>
              <div>{t('company.registration')}</div>
              <div>{t('company.euid')}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

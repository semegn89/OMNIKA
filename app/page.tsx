'use client'

import React from 'react'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-dark-900">
        <Header />
        <main>
          <HeroSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

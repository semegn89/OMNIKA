'use client'

import React from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TestImagesPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">Тест изображений</h1>
          
          <div className="space-y-8">
            {/* Фоновое изображение */}
            <div className="bg-dark-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Фоновое изображение (hero-bg.jpg)</h2>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/hero/hero-bg.jpg"
                  alt="OMNIKA Auto Parts Background"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Изображение автомобиля */}
            <div className="bg-dark-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Изображение автомобиля (hero-car.jpg)</h2>
              <div className="relative w-64 h-40 rounded-lg overflow-hidden">
                <Image
                  src="/images/hero/hero-car.jpg"
                  alt="Premium European Car"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Изображение запчастей */}
            <div className="bg-dark-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Изображение запчастей (hero-parts.jpg)</h2>
              <div className="relative w-64 h-40 rounded-lg overflow-hidden">
                <Image
                  src="/images/hero/hero-parts.jpg"
                  alt="Quality Auto Parts"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Все изображения в ряд */}
            <div className="bg-dark-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Все изображения в ряд</h2>
              <div className="flex flex-wrap gap-4">
                <div className="relative w-48 h-32 rounded-lg overflow-hidden border-2 border-neon-blue/30">
                  <Image
                    src="/images/hero/hero-bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-48 h-32 rounded-lg overflow-hidden border-2 border-neon-green/30">
                  <Image
                    src="/images/hero/hero-car.jpg"
                    alt="Car"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative w-48 h-32 rounded-lg overflow-hidden border-2 border-neon-purple/30">
                  <Image
                    src="/images/hero/hero-parts.jpg"
                    alt="Parts"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

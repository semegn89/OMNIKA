'use client';

import { useState } from 'react';
import ImageLoader from './ImageLoader';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UnsplashDemo() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('engine');
  const [selectedBrand, setSelectedBrand] = useState('mercedes');
  const [selectedSection, setSelectedSection] = useState('hero');

  const categories = [
    'engine', 'brakes', 'suspension', 'transmission', 
    'electrical', 'body', 'interior', 'exterior'
  ];

  const brands = [
    'mercedes', 'bmw', 'audi', 'volkswagen', 'volvo',
    'ford', 'toyota', 'honda', 'nissan', 'mazda'
  ];

  const sections = [
    'hero', 'about', 'how-it-works', 'promotions', 'contacts'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neon-green mb-4">
          🖼️ Unsplash Image Integration Demo
        </h1>
        <p className="text-gray-300 text-lg">
          {t('unsplashDemo', 'Automatically load high-quality images from Unsplash')}
        </p>
      </div>

      {/* Product Category Images */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-neon-blue mb-4">
          📦 {t('productImages', 'Product Category Images')}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">
            {t('selectCategory', 'Select Category')}:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-neon-green focus:outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageLoader
            type="product"
            category={selectedCategory}
            count={3}
            className="h-48"
            alt={`${selectedCategory} parts`}
          />
        </div>
      </div>

      {/* Brand Images */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-neon-blue mb-4">
          🏷️ {t('brandImages', 'Brand Images')}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">
            {t('selectBrand', 'Select Brand')}:
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-neon-green focus:outline-none"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageLoader
            type="brand"
            brand={selectedBrand}
            count={2}
            className="h-32"
            alt={`${selectedBrand} brand`}
          />
        </div>
      </div>

      {/* Section Images */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-neon-blue mb-4">
          🏠 {t('sectionImages', 'Section Images')}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">
            {t('selectSection', 'Select Section')}:
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-neon-green focus:outline-none"
          >
            {sections.map(section => (
              <option key={section} value={section}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageLoader
            type="section"
            section={selectedSection}
            count={2}
            className="h-48"
            alt={`${selectedSection} section`}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-neon-green mb-4">
          📋 {t('instructions', 'How to Use')}
        </h2>
        
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold text-neon-blue mb-2">
              1. {t('downloadImages', 'Download Images')}
            </h3>
            <p className="mb-2">
              {t('downloadCommand', 'Run this command to download images to your local directory:')}
            </p>
            <code className="bg-gray-900 px-3 py-2 rounded text-neon-green block">
              npm run download-images
            </code>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-neon-blue mb-2">
              2. {t('useComponent', 'Use ImageLoader Component')}
            </h3>
            <p className="mb-2">
              {t('componentUsage', 'Use the ImageLoader component in your pages:')}
            </p>
            <code className="bg-gray-900 px-3 py-2 rounded text-neon-green block text-sm">
              {`<ImageLoader
  type="product"
  category="engine"
  count={3}
  className="h-48"
/>`}
            </code>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-neon-blue mb-2">
              3. {t('apiUsage', 'Use API Directly')}
            </h3>
            <p className="mb-2">
              {t('apiCall', 'Make API calls to get image URLs:')}
            </p>
            <code className="bg-gray-900 px-3 py-2 rounded text-neon-green block text-sm">
              {`fetch('/api/images?type=product&category=engine&count=5')`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

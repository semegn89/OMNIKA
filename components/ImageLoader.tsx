'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImageLoaderProps {
  type: 'product' | 'brand' | 'section';
  category?: string;
  brand?: string;
  section?: string;
  count?: number;
  className?: string;
  alt?: string;
  fallbackSrc?: string;
  onImageLoad?: (image: any) => void;
}

export default function ImageLoader({
  type,
  category,
  brand,
  section,
  count = 1,
  className = '',
  alt = '',
  fallbackSrc = '/images/ui/placeholder.png',
  onImageLoad
}: ImageLoaderProps) {
  const { t } = useLanguage();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(false);

        const params = new URLSearchParams({
          type,
          count: count.toString()
        });

        if (category) params.append('category', category);
        if (brand) params.append('brand', brand);
        if (section) params.append('section', section);

        const response = await fetch(`/api/images?${params}`);
        const data = await response.json();

        if (data.success && data.images.length > 0) {
          setImages(data.images);
          if (onImageLoad) {
            onImageLoad(data.images[0]);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading images:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [type, category, brand, section, count, onImageLoad]);

  const handleImageError = () => {
    setError(true);
  };

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (loading) {
    return (
      <div className={`animate-pulse bg-gray-700 rounded-lg ${className}`}>
        <div className="w-full h-full bg-gray-600 rounded-lg"></div>
      </div>
    );
  }

  if (error || images.length === 0) {
    return (
      <div className={`bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-gray-400 text-sm mb-2">
            {t('imageLoadError', 'Image not available')}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-neon-green hover:text-neon-blue text-xs underline"
          >
            {t('retry', 'Retry')}
          </button>
        </div>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  return (
    <div className={`relative group ${className}`}>
      <Image
        src={currentImage.url}
        alt={currentImage.alt || alt}
        width={400}
        height={300}
        className="w-full h-full object-cover rounded-lg"
        onError={handleImageError}
        priority={false}
      />
      
      {/* Индикатор количества изображений */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {currentImageIndex + 1} / {images.length}
        </div>
      )}

      {/* Навигация по изображениям */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            →
          </button>
        </>
      )}

      {/* Информация о фотографе */}
      {currentImage.photographer && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Photo: {currentImage.photographer}
        </div>
      )}
    </div>
  );
}

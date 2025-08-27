const UNSPLASH_ACCESS_KEY = 'cUXypE87trn9OlJBBeBIooHK3DYh1oqk0ZwZlG28JPQ';

// Кэш для изображений, чтобы не делать повторные запросы
const imageCache = new Map();

/**
 * Получает изображения с Unsplash по запросу
 */
export const getUnsplashImages = async (query, count = 10) => {
  const cacheKey = `${query}-${count}`;
  
  // Проверяем кэш
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    const images = data.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumb: photo.urls.thumb,
      alt: photo.alt_description || query,
      photographer: photo.user.name,
      downloadUrl: photo.links.download
    }));

    // Сохраняем в кэш
    imageCache.set(cacheKey, images);
    return images;
  } catch (error) {
    console.error('Error fetching Unsplash images:', error);
    return [];
  }
};

/**
 * Получает изображения для конкретной категории автозапчастей
 */
export const getProductCategoryImages = async (category, count = 5) => {
  const queries = {
    'engine': 'car engine parts automotive',
    'brakes': 'car brake system automotive parts',
    'suspension': 'car suspension parts automotive',
    'transmission': 'car transmission gearbox automotive',
    'electrical': 'car electrical system automotive parts',
    'body': 'car body parts automotive',
    'interior': 'car interior parts automotive',
    'exterior': 'car exterior parts automotive',
    'cooling': 'car cooling system radiator automotive',
    'fuel': 'car fuel system automotive parts',
    'exhaust': 'car exhaust system automotive parts',
    'steering': 'car steering system automotive parts'
  };

  const query = queries[category] || `${category} automotive parts`;
  return await getUnsplashImages(query, count);
};

/**
 * Получает изображения для брендов автомобилей
 */
export const getBrandImages = async (brand, count = 3) => {
  const query = `${brand} car logo automotive brand`;
  return await getUnsplashImages(query, count);
};

/**
 * Получает изображения для секций сайта
 */
export const getSectionImages = async (section, count = 3) => {
  const queries = {
    'hero': 'luxury car automotive workshop',
    'about': 'automotive workshop mechanics',
    'how-it-works': 'car repair process automotive',
    'promotions': 'car parts sale automotive',
    'contacts': 'automotive service center'
  };

  const query = queries[section] || `${section} automotive`;
  return await getUnsplashImages(query, count);
};

/**
 * Скачивает изображение и сохраняет локально
 */
export const downloadImage = async (imageUrl, filepath) => {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    
    // В браузере мы не можем сохранять файлы напрямую
    // Это функция для серверной части
    if (typeof window === 'undefined') {
      const fs = require('fs');
      fs.writeFileSync(filepath, Buffer.from(buffer));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error downloading image:', error);
    return false;
  }
};

/**
 * Генерирует случайное изображение для продукта
 */
export const getRandomProductImage = async (productName, category) => {
  const images = await getProductCategoryImages(category, 10);
  
  if (images.length === 0) {
    // Fallback к placeholder
    return {
      url: `https://via.placeholder.com/400x300/1a1a1a/00ff00?text=${encodeURIComponent(productName)}`,
      alt: productName,
      photographer: 'Placeholder'
    };
  }
  
  // Выбираем случайное изображение
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

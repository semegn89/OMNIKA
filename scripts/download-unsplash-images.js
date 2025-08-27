const fs = require('fs');
const path = require('path');
const https = require('https');
const { getProductCategoryImages, getBrandImages, getSectionImages } = require('../lib/unsplashService');

// Создаем директории если их нет
const createDirectories = () => {
  const dirs = [
    'public/images/products',
    'public/images/brands',
    'public/images/sections',
    'public/images/hero',
    'public/images/about',
    'public/images/how-it-works',
    'public/images/promotions',
    'public/images/contacts'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Скачивает изображение
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Удаляем файл при ошибке
        reject(err);
      });
    }).on('error', reject);
  });
};

// Загружает изображения для продуктов
const downloadProductImages = async () => {
  const categories = [
    'engine', 'brakes', 'suspension', 'transmission', 
    'electrical', 'body', 'interior', 'exterior',
    'cooling', 'fuel', 'exhaust', 'steering'
  ];

  console.log('📦 Downloading product category images...');

  for (const category of categories) {
    try {
      console.log(`  Downloading ${category} images...`);
      const images = await getProductCategoryImages(category, 3);
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const filename = `${category}-${i + 1}.jpg`;
        const filepath = path.join('public/images/products', filename);
        
        await downloadImage(image.url, filepath);
        console.log(`    ✓ Downloaded: ${filename}`);
        
        // Небольшая задержка чтобы не перегружать API
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`  ✗ Error downloading ${category} images:`, error.message);
    }
  }
};

// Загружает изображения для брендов
const downloadBrandImages = async () => {
  const brands = [
    'mercedes', 'bmw', 'audi', 'volkswagen', 'volvo',
    'ford', 'toyota', 'honda', 'nissan', 'mazda'
  ];

  console.log('🏷️ Downloading brand images...');

  for (const brand of brands) {
    try {
      console.log(`  Downloading ${brand} images...`);
      const images = await getBrandImages(brand, 2);
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const filename = `${brand}-logo-${i + 1}.jpg`;
        const filepath = path.join('public/images/brands', filename);
        
        await downloadImage(image.url, filepath);
        console.log(`    ✓ Downloaded: ${filename}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`  ✗ Error downloading ${brand} images:`, error.message);
    }
  }
};

// Загружает изображения для секций сайта
const downloadSectionImages = async () => {
  const sections = [
    'hero', 'about', 'how-it-works', 'promotions', 'contacts'
  ];

  console.log('🏠 Downloading section images...');

  for (const section of sections) {
    try {
      console.log(`  Downloading ${section} images...`);
      const images = await getSectionImages(section, 2);
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const filename = `${section}-${i + 1}.jpg`;
        const filepath = path.join(`public/images/${section}`, filename);
        
        await downloadImage(image.url, filepath);
        console.log(`    ✓ Downloaded: ${filename}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`  ✗ Error downloading ${section} images:`, error.message);
    }
  }
};

// Основная функция
const main = async () => {
  console.log('🚀 Starting Unsplash image download...');
  
  try {
    // Создаем директории
    createDirectories();
    
    // Загружаем изображения
    await downloadProductImages();
    await downloadBrandImages();
    await downloadSectionImages();
    
    console.log('✅ All images downloaded successfully!');
    console.log('📁 Check the public/images directory for downloaded files.');
    
  } catch (error) {
    console.error('❌ Error during download:', error);
    process.exit(1);
  }
};

// Запускаем скрипт
if (require.main === module) {
  main();
}

module.exports = {
  downloadProductImages,
  downloadBrandImages,
  downloadSectionImages,
  main
};

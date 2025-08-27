# 🖼️ Unsplash Image Integration - Quick Guide

## ✅ Что уже сделано

1. **API интеграция** - Настроен доступ к Unsplash API с вашими ключами
2. **Загружены изображения** - 36 изображений для продуктов, 20 для брендов, 10 для секций
3. **Компоненты** - Создан `ImageLoader` для автоматической загрузки
4. **API роут** - `/api/images` для получения изображений
5. **Демо страница** - `/unsplash-demo` для тестирования

## 🚀 Как использовать

### 1. Посмотреть демо
Откройте: `http://localhost:3000/unsplash-demo`

### 2. Использовать в компонентах
```jsx
import ImageLoader from '@/components/ImageLoader';

// Для продуктов
<ImageLoader
  type="product"
  category="engine"
  count={3}
  className="h-48"
/>

// Для брендов
<ImageLoader
  type="brand"
  brand="mercedes"
  count={2}
  className="h-32"
/>
```

### 3. Загрузить новые изображения
```bash
npm run download-images
```

## 📁 Структура файлов

```
public/images/
├── products/          # engine-1.jpg, brakes-1.jpg, etc.
├── brands/           # mercedes-logo-1.jpg, bmw-logo-1.jpg, etc.
├── hero/             # hero-1.jpg, hero-2.jpg
├── about/            # about-1.jpg, about-2.jpg
├── how-it-works/     # how-it-works-1.jpg, how-it-works-2.jpg
├── promotions/       # promotions-1.jpg, promotions-2.jpg
└── contacts/         # contacts-1.jpg, contacts-2.jpg
```

## 🎯 Поддерживаемые категории

**Продукты:** engine, brakes, suspension, transmission, electrical, body, interior, exterior, cooling, fuel, exhaust, steering

**Бренды:** mercedes, bmw, audi, volkswagen, volvo, ford, toyota, honda, nissan, mazda

**Секции:** hero, about, how-it-works, promotions, contacts

## 🔧 Команды

```bash
# Запустить сервер
npm run dev

# Загрузить изображения
npm run download-images

# Сгенерировать placeholder изображения
npm run generate-placeholders
```

## 📊 Статистика загрузки

- ✅ **36 изображений продуктов** (12 категорий × 3 изображения)
- ✅ **20 изображений брендов** (10 брендов × 2 изображения)  
- ✅ **10 изображений секций** (5 секций × 2 изображения)
- ✅ **Всего: 66 изображений**

## 🎨 Особенности

- **Автоматическая загрузка** - Изображения загружаются автоматически
- **Кэширование** - Избегаем повторных запросов к API
- **Fallback** - Если изображение не загружается, показывается placeholder
- **Навигация** - Можно переключаться между несколькими изображениями
- **Атрибуция** - Показывается имя фотографа
- **Адаптивность** - Работает на всех устройствах

## 🔑 API ключи

Ваши ключи уже настроены:
- Access Key: `cUXypE87trn9OlJBBeBIooHK3DYh1oqk0ZwZlG28JPQ`
- Secret Key: `nFWcSyA1k9QJr9yGLnL-QHXn6E4CpKMSmyFzn0EkxeA`

## 📞 Поддержка

Если что-то не работает:
1. Проверьте консоль браузера
2. Убедитесь что сервер запущен
3. Проверьте API ключи на https://unsplash.com/oauth/applications

---

**Готово к использованию! 🚀**

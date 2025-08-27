# 🖼️ Использование Unsplash API в OMNIKA

## ✅ Что уже настроено

1. **API ключи** - Настроены ваши ключи Unsplash
2. **Загружены изображения** - 66 изображений для всех секций
3. **Компонент ImageLoader** - Автоматическая загрузка изображений
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

// Для секций
<ImageLoader
  type="section"
  section="hero"
  count={2}
  className="h-48"
/>
```

### 3. Загрузить новые изображения
```bash
npm run download-images
```

## 📋 Готовые запросы для разных секций

### 🚚 Для секции "О нас" (доставка):
```
delivery truck automotive
warehouse automotive parts
mechanics team automotive
car repair workshop
```

### 🚗 Для главной секции:
```
luxury cars automotive
sports car racing
modern car design
```

### ⚙️ Для "Как это работает":
```
car repair process
packaging automotive parts
delivery service
```

### 🏷️ Для акций:
```
sale discount automotive
gift automotive parts
premium automotive
```

### 📞 Для контактов:
```
office building automotive
customer service automotive
global network automotive
```

## 💡 Как добавить изображение в секцию

### Пример: Добавить изображение доставки в "О нас"

1. **Откройте файл** `app/about/page.tsx`
2. **Добавьте импорт:**
   ```jsx
   import ImageLoader from '@/components/ImageLoader';
   ```
3. **Вставьте компонент:**
   ```jsx
   <ImageLoader
     type="section"
     section="about"
     count={1}
     className="h-64"
     alt="Delivery service"
   />
   ```

## 🎯 РЕКОМЕНДАЦИИ ДЛЯ OMNIKA

### Для быстрого старта:
- **Unsplash API** - бесплатно, качественные фото ✅
- **Canvas генерация** - полный контроль, быстро
- **Placeholder сервисы** - для тестирования

### Для продакшена:
- **AI генерация** - уникальные изображения
- **CDN хостинг** - быстрая загрузка
- **Автоматическая оптимизация** - сжатие, WebP

## 📊 Статистика

- ✅ **36 изображений продуктов** (12 категорий)
- ✅ **20 изображений брендов** (10 брендов)  
- ✅ **10 изображений секций** (5 секций)
- ✅ **Всего: 66 изображений**

## 🔧 Команды

```bash
# Запустить сервер
npm run dev

# Загрузить изображения
npm run download-images

# Сгенерировать placeholder изображения
npm run generate-placeholders
```

## 📞 Поддержка

Если что-то не работает:
1. Проверьте консоль браузера
2. Убедитесь что сервер запущен
3. Проверьте API ключи на https://unsplash.com/oauth/applications

---

**Готово к использованию! 🚀**

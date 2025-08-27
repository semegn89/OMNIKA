# 🏷️ Руководство по изображениям акций - OMNIKA S.R.L.

## 📋 Требуемые изображения

Для корректной работы страницы акций нужно добавить **4 изображения** в папку `public/images/promotions/`:

### 🚗 **Необходимые файлы:**

| Марка | Файл | Статус | Описание |
|-------|------|--------|----------|
| **Mercedes** | `mercedes.jpg` | 🔄 Нужно добавить | Mercedes Parts Sale |
| **BMW** | `bmw.jpg` | 🔄 Нужно добавить | BMW Performance Parts |
| **Audi** | `audi.jpg` | 🔄 Нужно добавить | Audi Electronics Sale |
| **Volkswagen** | `volkswagen.jpg` | 🔄 Нужно добавить | Volkswagen Maintenance |

## 📁 Структура папки

```
public/images/promotions/
├── mercedes.jpg      # Mercedes Parts Sale
├── bmw.jpg          # BMW Performance Parts  
├── audi.jpg         # Audi Electronics Sale
└── volkswagen.jpg   # Volkswagen Maintenance
```

## 🎯 Рекомендации по изображениям

### **Размеры:**
- **Рекомендуемый размер**: 800x600px
- **Минимальный размер**: 600x400px
- **Формат**: JPG, PNG или AVIF

### **Содержание изображений:**
- **Mercedes**: Автомобили Mercedes, запчасти Mercedes
- **BMW**: Автомобили BMW, спортивные части BMW
- **Audi**: Автомобили Audi, электронные компоненты
- **Volkswagen**: Автомобили Volkswagen, обслуживание VW

### **Качество:**
- **Высокое качество**: Четкие, профессиональные изображения
- **Оптимизация**: Размер файла 100-300KB
- **Соответствие**: Изображения должны соответствовать тематике акций

## 🚀 Как добавить изображения

### **1. Подготовка файлов**
- Подготовьте 4 изображения для каждой марки
- Переименуйте их согласно требованиям выше
- Оптимизируйте размер (рекомендуется 800x600px)

### **2. Размещение файлов**
```bash
# Скопируйте файлы в папку promotions
cp mercedes.jpg public/images/promotions/
cp bmw.jpg public/images/promotions/
cp audi.jpg public/images/promotions/
cp volkswagen.jpg public/images/promotions/
```

### **3. Проверка**
```bash
# Проверить, что файлы добавлены
ls -la public/images/promotions/

# Проверить работу страницы
curl -s -o /dev/null -w "✅ Акции: %{http_code}\n" http://localhost:3000/promotions
```

## 📊 Текущий статус

### **Существующие файлы:**
- ✅ `promotions-1.jpg` (171KB) - используется как fallback
- ✅ `promotions-2.jpg` (185KB) - используется как fallback

### **Отсутствующие файлы:**
- ❌ `mercedes.jpg` - нужно добавить
- ❌ `bmw.jpg` - нужно добавить  
- ❌ `audi.jpg` - нужно добавить
- ❌ `volkswagen.jpg` - нужно добавить

## 🎯 Результат после добавления

После добавления всех 4 изображений:

### **Featured акция (Mercedes):**
- Будет использовать `mercedes.jpg`
- Отображается в hero секции

### **Обычные акции:**
- **BMW**: `bmw.jpg`
- **Audi**: `audi.jpg`  
- **Volkswagen**: `volkswagen.jpg`

### **Улучшения:**
- ✅ Каждая акция будет иметь уникальное изображение
- ✅ Лучшая визуальная привлекательность
- ✅ Соответствие контенту акций
- ✅ Профессиональный вид

## 🔧 Временное решение

Пока изображения не добавлены, страница будет использовать:
- `promotions-1.jpg` для Mercedes и Audi
- `promotions-2.jpg` для BMW и Volkswagen

**Добавьте 4 изображения для полной функциональности! 🚗💨**


# 🖼️ Unsplash Image Integration for OMNIKA

## 📋 Overview

This integration allows OMNIKA to automatically load high-quality images from Unsplash for:
- Product categories (engine, brakes, suspension, etc.)
- Car brands (Mercedes, BMW, Audi, etc.)
- Website sections (hero, about, how-it-works, etc.)

## 🔑 API Keys

Your Unsplash API credentials are configured in `lib/unsplashService.js`:
- **Access Key**: `cUXypE87trn9OlJBBeBIooHK3DYh1oqk0ZwZlG28JPQ`
- **Secret Key**: `nFWcSyA1k9QJr9yGLnL-QHXn6E4CpKMSmyFzn0EkxeA`
- **Application**: `omnika`

## 🚀 Quick Start

### 1. Download Images Locally

Run this command to download images to your local directory:

```bash
npm run download-images
```

This will:
- Create necessary directories in `public/images/`
- Download images for all product categories
- Download brand logos
- Download section images
- Save them as `.jpg` files

### 2. Use ImageLoader Component

```jsx
import ImageLoader from '@/components/ImageLoader';

// Product category images
<ImageLoader
  type="product"
  category="engine"
  count={3}
  className="h-48"
  alt="Engine parts"
/>

// Brand images
<ImageLoader
  type="brand"
  brand="mercedes"
  count={2}
  className="h-32"
  alt="Mercedes brand"
/>

// Section images
<ImageLoader
  type="section"
  section="hero"
  count={2}
  className="h-48"
  alt="Hero section"
/>
```

### 3. Use API Directly

```javascript
// Get product images
const response = await fetch('/api/images?type=product&category=engine&count=5');
const data = await response.json();

// Get brand images
const response = await fetch('/api/images?type=brand&brand=mercedes&count=3');
const data = await response.json();

// Get section images
const response = await fetch('/api/images?type=section&section=hero&count=2');
const data = await response.json();
```

## 📁 File Structure

```
lib/
├── unsplashService.js          # Unsplash API integration
└── i18n.ts                     # Translations

components/
├── ImageLoader.tsx             # Image loading component
└── UnsplashDemo.tsx            # Demo component

app/
├── api/images/route.js         # API endpoint
└── unsplash-demo/page.tsx      # Demo page

scripts/
└── download-unsplash-images.js # Bulk download script

public/images/
├── products/                   # Product category images
├── brands/                     # Brand logos
├── hero/                       # Hero section images
├── about/                      # About section images
├── how-it-works/              # How it works images
├── promotions/                # Promotions images
└── contacts/                  # Contact section images
```

## 🎯 Features

### ImageLoader Component
- ✅ Automatic loading from Unsplash
- ✅ Loading states and error handling
- ✅ Multiple image navigation
- ✅ Photographer attribution
- ✅ Fallback to placeholder images
- ✅ Responsive design
- ✅ Internationalization support

### API Endpoint
- ✅ `/api/images` - Get images by type and category
- ✅ Caching to avoid repeated requests
- ✅ Error handling and fallbacks
- ✅ Rate limiting protection

### Bulk Download Script
- ✅ Downloads all images at once
- ✅ Creates directory structure
- ✅ Handles errors gracefully
- ✅ Respects API rate limits

## 🔧 Configuration

### Supported Categories
- `engine` - Engine parts
- `brakes` - Brake system
- `suspension` - Suspension parts
- `transmission` - Transmission/gearbox
- `electrical` - Electrical system
- `body` - Body parts
- `interior` - Interior parts
- `exterior` - Exterior parts
- `cooling` - Cooling system
- `fuel` - Fuel system
- `exhaust` - Exhaust system
- `steering` - Steering system

### Supported Brands
- `mercedes`, `bmw`, `audi`, `volkswagen`, `volvo`
- `ford`, `toyota`, `honda`, `nissan`, `mazda`

### Supported Sections
- `hero` - Hero section
- `about` - About us section
- `how-it-works` - How it works section
- `promotions` - Promotions section
- `contacts` - Contact section

## 🎨 Customization

### Modify Search Queries
Edit `lib/unsplashService.js` to change search queries:

```javascript
const queries = {
  'engine': 'car engine parts automotive',
  'brakes': 'car brake system automotive parts',
  // Add your custom queries
};
```

### Add New Categories
1. Add to the queries object in `unsplashService.js`
2. Add to the categories array in `download-unsplash-images.js`
3. Update translations in `lib/i18n.ts`

### Custom Image Processing
Modify the `downloadImage` function in `download-unsplash-images.js` to:
- Resize images
- Convert formats
- Apply filters
- Optimize for web

## 🚨 Rate Limits

Unsplash API has rate limits:
- **Demo**: 50 requests per hour
- **Production**: 5000 requests per hour

The integration includes:
- Request caching
- Error handling
- Fallback images
- Rate limit monitoring

## 🔒 Security

- API keys are stored in server-side code only
- No client-side exposure of credentials
- HTTPS required for production
- Request validation and sanitization

## 📊 Monitoring

Check API usage at:
- https://unsplash.com/oauth/applications
- Monitor rate limits and usage

## 🆘 Troubleshooting

### Images Not Loading
1. Check API key validity
2. Verify network connectivity
3. Check browser console for errors
4. Ensure proper CORS configuration

### Rate Limit Exceeded
1. Wait for rate limit reset
2. Use cached images
3. Implement request queuing
4. Consider upgrading API plan

### Poor Image Quality
1. Adjust search queries
2. Use different image sizes
3. Implement image optimization
4. Consider premium Unsplash plan

## 📞 Support

For issues with:
- **Unsplash API**: Contact Unsplash support
- **Integration**: Check this documentation
- **OMNIKA**: Contact development team

## 🔄 Updates

To update the integration:
1. Pull latest changes
2. Run `npm install` for new dependencies
3. Test with `npm run dev`
4. Update API keys if needed
5. Re-download images if required

---

**Happy coding! 🚀**

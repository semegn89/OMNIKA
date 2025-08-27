import { getProductCategoryImages, getBrandImages, getSectionImages, getUnsplashImages } from '@/lib/unsplashService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'product', 'brand', 'section', 'search'
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const section = searchParams.get('section');
    const query = searchParams.get('query');
    const count = parseInt(searchParams.get('count')) || 5;

    let images = [];

    switch (type) {
      case 'product':
        if (category) {
          images = await getProductCategoryImages(category, count);
        }
        break;
      
      case 'brand':
        if (brand) {
          images = await getBrandImages(brand, count);
        }
        break;
      
      case 'section':
        if (section) {
          images = await getSectionImages(section, count);
        }
        break;
      
      case 'search':
        if (query) {
          images = await getUnsplashImages(query, count);
        }
        break;
      
      default:
        return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    return Response.json({ 
      success: true, 
      images,
      count: images.length 
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ 
      error: 'Failed to fetch images',
      details: error.message 
    }, { status: 500 });
  }
}

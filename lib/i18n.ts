export const locales = ['en', 'ro'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'en'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      howItWorks: 'How It Works',
      catalog: 'Catalog',
      promotions: 'Promotions',
      contacts: 'Contacts',
      login: 'Login',
      register: 'Register',
      cart: 'Cart'
    },
    hero: {
      title: 'Premium Auto Parts for Every European Brand',
      subtitle: 'Discover our extensive collection of high-quality automotive parts and accessories',
      goToCatalog: 'Go to Catalog',
      promotions: 'Promotions',
      register: 'Register'
    },
    catalog: {
      title: 'Auto Parts Catalog',
      subtitle: 'Discover our extensive collection of premium auto parts for every European brand',
      search: 'Search for parts, brands, categories, or SKU...',
      filters: 'Filters',
      sortBy: 'Sort by',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      rating: 'Highest Rated',
      reviews: 'Most Reviews',
      name: 'Name A-Z',
      stock: 'Stock: High to Low',
      productsFound: 'products found',
      addToCart: 'Add to Cart',
      clearFilters: 'Clear All Filters',
      noProducts: 'No products found',
      clearFiltersButton: 'Clear Filters'
    },
    vin: {
      title: 'VIN Search',
      subtitle: 'Enter VIN (17 characters), we\'ll find the right parts. Response will be sent to email/personal account.',
      vinNumber: 'VIN Number *',
      vinPlaceholder: 'Enter 17-digit VIN',
      vinHelp: 'VIN must contain 17 characters (Latin letters and numbers, excluding I, O, Q)',
      email: 'Email',
      phone: 'Phone',
      comment: 'Add comment / attach part photo',
      commentPlaceholder: 'Describe the part or provide additional information...',
      submit: 'Find Parts by VIN',
      submitting: 'Submitting...',
      success: 'Request submitted successfully!',
      error: 'Error submitting request',
      contactRequired: 'Please provide email or phone for contact',
      requestAccepted: 'Request Accepted!',
      requestNumber: 'Request number:',
      responseTime: 'Expect response within 1-6 hours during business hours.',
      newRequest: 'Submit New Request',
      contactNote: '* Provide email or phone for response'
    },
    cart: {
      title: 'Shopping Cart',
      subtitle: 'Review your items and proceed to checkout',
      empty: 'Your cart is empty',
      emptySubtitle: 'Add some products to your cart to get started.',
      browseCatalog: 'Browse Catalog',
      cartItems: 'Cart Items',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      free: 'Free',
      checkout: 'Proceed to Checkout',
      secureCheckout: 'Secure checkout powered by Stripe',
      cartUpdated: 'Cart updated!',
      itemRemoved: 'Item removed from cart!',
      maxQuantity: 'Maximum {max} items available for order',
      outOfStock: 'Out of Stock',
      onlyAvailable: 'Only {qty} available',
      left: '{qty} left',
      inStock: 'In Stock'
    },
    pagination: {
      showing: 'Showing {start}–{end} of {total}',
      previous: 'Previous',
      next: 'Next'
    },
    stock: {
      outOfStock: 'Out of Stock',
      low: 'Low',
      limited: 'Limited',
      high: 'High',
      inStock: 'In Stock: {qty}',
      onOrder: 'On Order',
      quantity: 'Quantity:',
      max: 'max {qty}'
    }
  },
  ro: {
    nav: {
      home: 'Acasă',
      about: 'Despre',
      howItWorks: 'Cum Funcționează',
      catalog: 'Catalog',
      promotions: 'Promoții',
      contacts: 'Contacte',
      login: 'Autentificare',
      register: 'Înregistrare',
      cart: 'Coș'
    },
    hero: {
      title: 'Piese Auto Premium pentru Fiecare Marcă Europeană',
      subtitle: 'Descoperă colecția noastră extinsă de piese auto de înaltă calitate și accesorii',
      goToCatalog: 'Mergi la Catalog',
      promotions: 'Promoții',
      register: 'Înregistrare'
    },
    catalog: {
      title: 'Catalog Piese Auto',
      subtitle: 'Descoperă colecția noastră extinsă de piese auto premium pentru fiecare marcă europeană',
      search: 'Caută piese, mărci, categorii sau SKU...',
      filters: 'Filtre',
      sortBy: 'Sortează după',
      priceAsc: 'Preț: Mic la Mare',
      priceDesc: 'Preț: Mare la Mic',
      rating: 'Cel mai Evaluat',
      reviews: 'Cele mai multe Recenzii',
      name: 'Nume A-Z',
      stock: 'Stoc: Mare la Mic',
      productsFound: 'produse găsite',
      addToCart: 'Adaugă în Coș',
      clearFilters: 'Șterge Toate Filtrele',
      noProducts: 'Nu s-au găsit produse',
      clearFiltersButton: 'Șterge Filtrele'
    },
    vin: {
      title: 'Căutare VIN',
      subtitle: 'Introdu VIN (17 caractere), vom găsi piesele potrivite. Răspunsul va fi trimis pe email/cont personal.',
      vinNumber: 'Numărul VIN *',
      vinPlaceholder: 'Introdu VIN de 17 cifre',
      vinHelp: 'VIN trebuie să conțină 17 caractere (litere latine și cifre, excluzând I, O, Q)',
      email: 'Email',
      phone: 'Telefon',
      comment: 'Adaugă comentariu / atașează foto piesă',
      commentPlaceholder: 'Descrie piesa sau furnizează informații suplimentare...',
      submit: 'Găsește Piese după VIN',
      submitting: 'Se trimite...',
      success: 'Cererea a fost trimisă cu succes!',
      error: 'Eroare la trimiterea cererii',
      contactRequired: 'Te rugăm să furnizezi email sau telefon pentru contact',
      requestAccepted: 'Cererea Acceptată!',
      requestNumber: 'Numărul cererii:',
      responseTime: 'Așteaptă răspunsul în 1-6 ore în timpul programului de lucru.',
      newRequest: 'Trimite Cerere Nouă',
      contactNote: '* Furnizează email sau telefon pentru răspuns'
    },
    cart: {
      title: 'Coș de Cumpărături',
      subtitle: 'Revizuiește articolele și continuă la finalizarea comenzii',
      empty: 'Coșul tău este gol',
      emptySubtitle: 'Adaugă câteva produse în coș pentru a începe.',
      browseCatalog: 'Răsfoiește Catalogul',
      cartItems: 'Articole în Coș',
      orderSummary: 'Sumar Comandă',
      subtotal: 'Subtotal',
      shipping: 'Transport',
      total: 'Total',
      free: 'Gratuit',
      checkout: 'Continuă la Finalizare',
      secureCheckout: 'Finalizare securizată prin Stripe',
      cartUpdated: 'Coș actualizat!',
      itemRemoved: 'Articol eliminat din coș!',
      maxQuantity: 'Maximum {max} articole disponibile pentru comandă',
      outOfStock: 'Stoc Epuizat',
      onlyAvailable: 'Doar {qty} disponibile',
      left: '{qty} rămase',
      inStock: 'În Stoc'
    },
    pagination: {
      showing: 'Se afișează {start}–{end} din {total}',
      previous: 'Anterior',
      next: 'Următor'
    },
    stock: {
      outOfStock: 'Stoc Epuizat',
      low: 'Puțin',
      limited: 'Limitat',
      high: 'Mult',
      inStock: 'În Stoc: {qty}',
      onOrder: 'La Comandă',
      quantity: 'Cantitate:',
      max: 'max {qty}'
    }
  }
}

export type TranslationKey = keyof typeof translations.en

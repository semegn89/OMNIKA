# OMNIKA S.R.L. - Auto Parts E-commerce

Modern, futuristic auto parts e-commerce website for OMNIKA S.R.L. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌐 **Multilingual Support** - English and Romanian languages
- 🎨 **Futuristic Design** - Dark theme with neon accents
- 📱 **Responsive Design** - Mobile-first approach
- 🔍 **Advanced Search & Filters** - Find parts by brand, category, price
- 🛒 **Shopping Cart** - Add items and manage quantities
- 👤 **User Authentication** - Registration and login system
- 💳 **Payment Integration** - Stripe payment processing
- 📊 **Admin Panel** - Manage products, orders, and users
- ⚡ **Performance Optimized** - Fast loading and smooth animations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Context API
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **Payment**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd omnika-auto-parts
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email (optional)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── catalog/           # Catalog page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero section
│   └── ProductCard.tsx    # Product card component
├── contexts/              # React contexts
│   └── LanguageContext.tsx # Language management
├── lib/                   # Utility functions
│   ├── i18n.ts           # Internationalization
│   └── products.ts       # Product generation
├── public/               # Static assets
└── styles/               # Additional styles
```

## Key Features

### Multilingual Support
- Switch between English and Romanian
- All text content is translated
- Language preference saved in localStorage

### Product Catalog
- 5000+ auto parts generated automatically
- Filter by brand, category, price range
- Search functionality
- Sort by price, rating, reviews
- Responsive grid layout

### Design System
- Dark theme with neon blue/green accents
- Glass morphism effects
- Smooth animations with Framer Motion
- Futuristic UI elements

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

## Company Information

**OMNIKA S.R.L.**
- Address: București, Sectorul 2, Sos. Mihai Bravu, Nr. 136, Bloc D20, Scara 2, Etaj 3, Apartament 39, România
- Bank: Raiffeisen Bank S.A.
- IBAN: RO08RZBR0000060028531926
- CUI: 52235085
- Registration: J2025056488004
- EUID: ROONRC.J2025056488004

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for OMNIKA S.R.L.

## Support

For support and questions, contact:
- Email: info@omnika.ro
- Phone: +40 123 456 789

---

Built with ❤️ for OMNIKA S.R.L.

import UnsplashDemo from '@/components/UnsplashDemo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UnsplashDemoPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="pt-20 pb-8">
        <UnsplashDemo />
      </main>
      <Footer />
    </div>
  );
}

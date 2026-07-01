import Hero from '../components/Hero';
import Categories from '../components/Categories';
import BestSellers from '../components/BestSellers';
import NewArrivals from '../components/NewArrivals';
import Testimonials from '../components/Testimonials';
import BrandStory from '../components/BrandStory';
import PackagingTrust from '../components/PackagingTrust';
import type { Product } from '../data/products';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function HomePage({ onNavigate, onAddToCart, onToggleWishlist, wishlist }: HomePageProps) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <Categories onNavigate={onNavigate} />
      <BestSellers
        onNavigate={onNavigate}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
      />
      <NewArrivals
        onNavigate={onNavigate}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
      />
      <Testimonials />
      <BrandStory onNavigate={onNavigate} />
      <PackagingTrust />
    </main>
  );
}

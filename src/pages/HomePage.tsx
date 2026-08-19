import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import ProductCarousel from '../components/ProductCarousel';
import CampaignBanner from '../components/CampaignBanner';
import CollectionSection from '../components/CollectionSection';
import MomentsSection from '../components/MomentsSection';
import BrandStory from '../components/BrandStory';
import BenefitsSection from '../components/BenefitsSection';
import InstagramGallery from '../components/InstagramGallery';
import Newsletter from '../components/Newsletter';
import { products } from '../data/products';
import type { Product } from '../data/products';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function HomePage({ onNavigate, onAddToCart, onToggleWishlist, wishlist }: HomePageProps) {
  const trending = products.filter((p) => p.badge === 'bestseller' || p.badge === 'sale').slice(0, 8);
  const newArrivals = products.filter((p) => p.badge === 'new').slice(0, 8);
  const trendingDisplay = trending.length >= 4 ? trending : products.slice(0, 8);
  const newDisplay = newArrivals.length >= 4 ? newArrivals : products.slice(0, 8);

  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <CategorySection onNavigate={onNavigate} />

      <ProductCarousel
        title="Trending Now"
        label="Most Loved"
        products={trendingDisplay}
        onNavigate={onNavigate}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
        viewAllPage="best-sellers"
      />

      <CampaignBanner onNavigate={onNavigate} />

      <CollectionSection onNavigate={onNavigate} />

      <MomentsSection onNavigate={onNavigate} />

      <ProductCarousel
        title="New Arrivals"
        label="Just Landed"
        products={newDisplay}
        onNavigate={onNavigate}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlist={wishlist}
        viewAllPage="new-arrivals"
      />

      <BrandStory onNavigate={onNavigate} />

      <BenefitsSection />

      <InstagramGallery />

      <Newsletter />
    </main>
  );
}

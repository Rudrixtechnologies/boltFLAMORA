import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface NewArrivalsProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function NewArrivals({ onNavigate, onAddToCart, onToggleWishlist, wishlist }: NewArrivalsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const newProducts = products.filter((p) => p.badge === 'new').slice(0, 4);
  const displayProducts = newProducts.length >= 2 ? newProducts : products.slice(0, 4);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 md:px-8 lg:px-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        {/* Hero-style layout for new arrivals */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 reveal">
          {/* Left: text */}
          <div>
            <p className="section-label">Just Landed</p>
            <h2 className="section-title leading-tight">
              New
              <br />
              <em className="font-display italic font-light text-gold-500">Arrivals</em>
            </h2>
            <div className="gold-divider mx-0 mt-5 mb-6" />
            <p className="text-charcoal-500 text-sm leading-relaxed max-w-md mb-8">
              Discover our latest additions — thoughtfully designed pieces that capture the essence of modern luxury. Each piece is crafted in small batches to ensure exceptional quality.
            </p>
            <button
              onClick={() => onNavigate('new-arrivals')}
              className="btn-outline text-xs"
            >
              <span className="flex items-center gap-2">
                Explore New Arrivals <ArrowRight size={14} />
              </span>
            </button>
          </div>

          {/* Right: featured large image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="New arrivals"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Gold accent corner */}
            <div className="absolute -bottom-3 -left-3 w-24 h-24 border-l-2 border-b-2 border-gold-400 pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-24 h-24 border-r-2 border-t-2 border-gold-400 pointer-events-none" />
            {/* Badge */}
            <div className="absolute top-4 left-4 bg-charcoal-800 text-ivory-100 px-3 py-1.5 text-xs tracking-widest uppercase">
              New Season
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {displayProducts.map((product, i) => (
            <div key={product.id} className={`reveal reveal-delay-${i + 1}`}>
              <ProductCard
                product={product}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.includes(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

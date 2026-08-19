import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface ProductCarouselProps {
  title: string;
  label?: string;
  products: Product[];
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: string[];
  viewAllPage?: string;
}

export default function ProductCarousel({
  title,
  label,
  products,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  viewAllPage,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            {label && (
              <p className="text-forest-700 text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
                {label}
              </p>
            )}
            <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 font-light">{title}</h2>
            <div className="w-12 h-px bg-gold-400 mt-4" />
          </div>

          <div className="flex items-center gap-3">
            {viewAllPage && (
              <button
                onClick={() => onNavigate(viewAllPage)}
                className="hidden sm:block text-charcoal-500 hover:text-forest-800 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors"
              >
                View All
              </button>
            )}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                disabled={!canLeft}
                className="w-9 h-9 border border-charcoal-300 flex items-center justify-center text-charcoal-600 hover:border-forest-800 hover:text-forest-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canRight}
                className="w-9 h-9 border border-charcoal-300 flex items-center justify-center text-charcoal-600 hover:border-forest-800 hover:text-forest-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 pb-2"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] snap-start"
            >
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

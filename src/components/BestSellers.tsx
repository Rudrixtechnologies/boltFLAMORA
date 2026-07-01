import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import type { Product } from '../data/products';

interface BestSellersProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: string[];
}

const TABS = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

export default function BestSellers({ onNavigate, onAddToCart, onToggleWishlist, wishlist }: BestSellersProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = products.filter((p) => {
    if (activeTab === 'All') return p.badge === 'bestseller';
    return p.category === activeTab.toLowerCase();
  });

  const displayProducts = filtered.length ? filtered : products.slice(0, 4);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 md:px-8 lg:px-12 bg-ivory-200/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <p className="section-label">Most Loved</p>
            <h2 className="section-title">Best Sellers</h2>
            <div className="gold-divider mx-0 mt-4 mb-0" />
          </div>
          <button
            onClick={() => onNavigate('collections')}
            className="flex items-center gap-2 text-charcoal-600 hover:text-gold-500 transition-colors text-xs tracking-widest uppercase font-medium group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto scrollbar-hide reveal">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-forest-800 text-ivory-100'
                  : 'text-charcoal-500 hover:text-charcoal-800 border border-transparent hover:border-charcoal-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {displayProducts.map((product, i) => (
            <div key={product.id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
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

        {/* Afterpay notice */}
        <div className="mt-14 text-center reveal">
          <p className="text-charcoal-400 text-xs tracking-wider">
            Shop now, pay later with{' '}
            <span className="text-charcoal-700 font-medium">Afterpay</span>
            {' '}· Available at checkout on all orders
          </p>
        </div>
      </div>
    </section>
  );
}

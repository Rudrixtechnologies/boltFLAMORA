import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../data/products';

interface CollectionPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: string[];
  initialCategory?: string;
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function CollectionPage({ onNavigate, onAddToCart, onToggleWishlist, wishlist, initialCategory }: CollectionPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 60);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeCategory]);

  const filtered = products
    .filter((p) => {
      if (activeCategory === 'all' || activeCategory === 'collections') return true;
      if (activeCategory === 'new-arrivals') return p.badge === 'new';
      if (activeCategory === 'best-sellers') return p.badge === 'bestseller';
      if (activeCategory === 'sale') return p.badge === 'sale';
      return p.category === activeCategory;
    })
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const categoryTitle = (() => {
    const cat = categories.find((c) => c.id === activeCategory);
    if (cat) return cat.name;
    if (activeCategory === 'all' || activeCategory === 'collections') return 'All Collections';
    if (activeCategory === 'new-arrivals') return 'New Arrivals';
    if (activeCategory === 'best-sellers') return 'Best Sellers';
    if (activeCategory === 'sale') return 'Sale';
    return 'Collections';
  })();

  return (
    <div className="min-h-screen bg-ivory-100 pt-28">
      {/* Page header */}
      <div className="border-b border-gold-200/40 py-10 px-4 md:px-8 lg:px-12 bg-ivory-200/40">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-2">FLAMORA Collections</p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal-800 font-light">{categoryTitle}</h1>
          <p className="text-charcoal-400 text-sm mt-2">{filtered.length} pieces</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
        {/* Category nav */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-4 mb-8 border-b border-gold-200/30">
          {[
            { id: 'all', label: 'All' },
            ...categories,
            { id: 'new-arrivals', label: 'New Arrivals', name: 'New Arrivals' },
            { id: 'sale', label: 'Sale', name: 'Sale' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-forest-800 text-ivory-100'
                  : 'text-charcoal-500 hover:text-charcoal-800 border border-charcoal-200/60 hover:border-charcoal-400'
              }`}
            >
              {'label' in cat ? cat.label : cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-charcoal-600 hover:text-charcoal-900 text-xs tracking-widest uppercase font-medium transition-colors"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="text-charcoal-400 text-xs hidden sm:block">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent border border-charcoal-200/60 text-charcoal-700 text-xs pl-4 pr-8 py-2 outline-none cursor-pointer hover:border-charcoal-400 transition-colors"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="mb-8 p-6 border border-gold-200/40 bg-ivory-50/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-charcoal-800 tracking-wider">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="text-charcoal-400 hover:text-charcoal-700">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-charcoal-500 mb-3">Price Range</p>
                <p className="text-charcoal-700 text-sm mb-2">${priceRange[0]} – ${priceRange[1]} AUD</p>
                <input
                  type="range"
                  min="0"
                  max="600"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-gold-400"
                />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-charcoal-500 mb-3">Material</p>
                <div className="space-y-1.5">
                  {['18K Gold Vermeil', '18K White Gold', 'Sterling Silver'].map((m) => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-gold-400 w-3 h-3" />
                      <span className="text-charcoal-600 text-xs">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-charcoal-500 mb-3">Gemstone</p>
                <div className="space-y-1.5">
                  {['Diamond', 'Pearl', 'Topaz', 'Moissanite', 'Zirconia'].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-gold-400 w-3 h-3" />
                      <span className="text-charcoal-600 text-xs">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-charcoal-500 mb-3">Availability</p>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-gold-400 w-3 h-3" />
                    <span className="text-charcoal-600 text-xs">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-gold-400 w-3 h-3" />
                    <span className="text-charcoal-600 text-xs">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {filtered.map((product, i) => (
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

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-charcoal-400 text-sm">No products found for the selected filters.</p>
            <button
              onClick={() => { setActiveCategory('all'); setPriceRange([0, 600]); }}
              className="mt-4 text-gold-500 text-xs tracking-widest uppercase hover:text-gold-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/products';

interface CategorySectionProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function CategorySection({ onNavigate }: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-forest-700 text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
            Shop By Category
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 font-light">
            Find Your Perfect Piece
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-5" />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className="group text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              <h3 className="font-display text-lg text-charcoal-800 font-medium group-hover:text-gold-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-charcoal-400 text-xs mt-1">{cat.count} styles</p>
              <span className="inline-flex items-center gap-1 text-forest-700 text-[10px] tracking-[0.2em] uppercase font-medium mt-2 group-hover:gap-2 transition-all">
                Shop Now <ArrowRight size={11} />
              </span>
            </button>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className="flex-shrink-0 w-40 snap-center text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent opacity-60" />
              </div>
              <h3 className="font-display text-base text-charcoal-800 font-medium">{cat.name}</h3>
              <p className="text-charcoal-400 text-xs mt-0.5">{cat.count} styles</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

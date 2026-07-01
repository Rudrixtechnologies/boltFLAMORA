import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/products';

interface CategoriesProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function Categories({ onNavigate }: CategoriesProps) {
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

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 md:px-8 lg:px-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="section-label">Shop by Category</p>
          <h2 className="section-title">Our Collections</h2>
          <div className="gold-divider" />
          <p className="text-charcoal-500 max-w-xl mx-auto text-sm leading-relaxed">
            From delicate everyday pieces to statement jewellery for life's most meaningful moments.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden cursor-pointer text-left`}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-ivory-100 text-xl md:text-2xl font-light tracking-wide leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-ivory-300/70 text-xs mt-1 tracking-wide">{cat.count} styles</p>
                </div>

                {/* Hover CTA */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-8 bg-gold-400 flex items-center justify-center">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
              </div>

              <p className="text-charcoal-500 text-xs tracking-wide group-hover:text-gold-500 transition-colors">
                {cat.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

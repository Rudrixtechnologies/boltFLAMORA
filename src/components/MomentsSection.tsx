import { moments } from '../data/products';

interface MomentsSectionProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function MomentsSection({ onNavigate }: MomentsSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-ivory-200/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-forest-700 text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
            Curated For You
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 font-light">
            Jewellery For Every Moment
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-5" />
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-4">
          {moments.map((m) => (
            <button
              key={m.id}
              onClick={() => onNavigate('collections')}
              className="group text-center"
            >
              <div className="relative aspect-square overflow-hidden bg-ivory-200 mb-3">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-ivory-100 font-display text-lg font-light tracking-wide">
                    {m.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4">
          {moments.map((m) => (
            <button
              key={m.id}
              onClick={() => onNavigate('collections')}
              className="flex-shrink-0 w-32 snap-center text-center"
            >
              <div className="relative aspect-square overflow-hidden bg-ivory-200 mb-2">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-ivory-100 font-display text-sm font-light tracking-wide">
                    {m.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
import { collections } from '../data/products';

interface CollectionSectionProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export default function CollectionSection({ onNavigate }: CollectionSectionProps) {
  const [celeste, lumiere, elan, aurora] = collections;

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-forest-700 text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
            Shop By Collection
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 font-light">
            Curated Collections
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-5" />
        </div>

        {/* Asymmetric editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Celeste — large */}
          <CollectionCard collection={celeste} onNavigate={onNavigate} size="large" />

          {/* Right column: Lumiere + Elan stacked */}
          <div className="grid grid-cols-1 gap-5 md:gap-6">
            <CollectionCard collection={lumiere} onNavigate={onNavigate} size="wide" />
            <CollectionCard collection={elan} onNavigate={onNavigate} size="wide" />
          </div>

          {/* Aurora — full width */}
          <div className="md:col-span-2">
            <CollectionCard collection={aurora} onNavigate={onNavigate} size="full" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface CollectionCardProps {
  collection: (typeof collections)[number];
  onNavigate: (page: string, params?: Record<string, string>) => void;
  size: 'large' | 'wide' | 'full';
}

function CollectionCard({ collection, onNavigate, size }: CollectionCardProps) {
  const aspectClass =
    size === 'large'
      ? 'aspect-[4/5] md:aspect-[3/4]'
      : size === 'wide'
      ? 'aspect-[16/9]'
      : 'aspect-[21/8]';

  return (
    <button
      onClick={() => onNavigate('collections')}
      className="group relative block w-full overflow-hidden bg-ivory-200 text-left"
    >
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 via-charcoal-900/15 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-medium mb-2">
          {collection.tagline}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-ivory-100 font-light mb-2">
          {collection.name}
        </h3>
        <p className="text-ivory-200/70 text-xs font-light leading-relaxed max-w-xs mb-4 hidden md:block">
          {collection.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-ivory-100 text-[10px] tracking-[0.2em] uppercase font-medium group-hover:gap-2.5 transition-all">
          Explore Collection <ArrowRight size={12} />
        </span>
      </div>
    </button>
  );
}

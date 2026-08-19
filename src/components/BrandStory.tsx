import { ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  onNavigate: (page: string) => void;
}

export default function BrandStory({ onNavigate }: BrandStoryProps) {
  return (
    <section className="bg-ivory-100 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[500px]">
        {/* Left: image */}
        <div className="relative h-[350px] lg:h-auto overflow-hidden bg-ivory-200">
          <img
            src="https://images.pexels.com/photos/9428419/pexels-photo-9428419.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="FLAMORA craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ivory-100/0 lg:to-ivory-100/20" />
        </div>

        {/* Right: content */}
        <div className="flex items-center px-6 md:px-12 lg:px-16 py-16 lg:py-0">
          <div className="max-w-md">
            <p className="text-forest-700 text-[11px] tracking-[0.3em] uppercase font-medium mb-4">
              The Art of FLAMORA
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal-800 font-light leading-[1.15] mb-6">
              Designed with intention.
              <br />
              <em className="italic">Crafted to endure.</em>
            </h2>
            <div className="w-12 h-px bg-gold-400 mb-6" />
            <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
              FLAMORA brings together modern design, exceptional craftsmanship and timeless materials to create jewellery made for life's most meaningful moments.
            </p>
            <p className="text-charcoal-400 text-sm leading-relaxed mb-8">
              Every piece is designed in Australia and handcrafted by skilled artisans who share our commitment to quality — from the first sketch to the final polish.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '2019', label: 'Founded' },
                { value: '18K', label: 'Gold Vermeil' },
                { value: '100%', label: 'Nickel Free' },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold-300 pl-3">
                  <p className="font-display text-xl text-charcoal-800 font-medium">{stat.value}</p>
                  <p className="text-charcoal-400 text-[10px] tracking-wider mt-0.5 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('our-story')}
              className="inline-flex items-center gap-2 text-forest-800 text-[11px] tracking-[0.2em] uppercase font-medium border-b border-forest-800 pb-1 hover:gap-3 transition-all"
            >
              Our Story <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

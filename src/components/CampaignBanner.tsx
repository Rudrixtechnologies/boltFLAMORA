import { ArrowRight } from 'lucide-react';

interface CampaignBannerProps {
  onNavigate: (page: string) => void;
}

export default function CampaignBanner({ onNavigate }: CampaignBannerProps) {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-charcoal-900">
      <img
        src="https://images.pexels.com/photos/9602307/pexels-photo-9602307.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="The Diamond Event"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.55)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(15,15,15,0.7) 0%, rgba(15,15,15,0.3) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
          <div className="max-w-lg">
            <p className="text-gold-400 text-[11px] tracking-[0.35em] uppercase font-medium mb-4">
              The Diamond Event
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-ivory-100 font-light leading-[1.1] mb-5">
              Timeless brilliance.
              <br />
              <em className="italic">Designed for today.</em>
            </h2>
            <p className="text-ivory-200/70 text-sm font-light leading-relaxed mb-8 max-w-md">
              Discover our finest moissanite and white zirconia pieces, crafted to rival diamond brilliance at an extraordinary value.
            </p>
            <button
              onClick={() => onNavigate('collections')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ivory-100 text-charcoal-800 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              Discover Diamonds
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-[550px] md:h-[720px] overflow-hidden bg-ivory-200">
      {/* Background image with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="FLAMORA fine jewellery"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,15,15,0.35) 0%, rgba(15,15,15,0.25) 50%, rgba(15,15,15,0.55) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto transition-all duration-1000 ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-ivory-200/80 text-[11px] tracking-[0.4em] uppercase font-medium mb-6">
          The New Collection
        </p>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory-100 font-light leading-[1.05] mb-6">
          Made to Be
          <br />
          <em className="italic">Remembered</em>
        </h1>

        <p className="text-ivory-200/70 text-sm md:text-base font-light tracking-wide max-w-lg leading-relaxed mb-10">
          Modern fine jewellery crafted for life's unforgettable moments.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onNavigate('new-arrivals')}
            className="px-9 py-3.5 bg-ivory-100 text-charcoal-800 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            Shop New Arrivals
          </button>
          <button
            onClick={() => onNavigate('collections')}
            className="px-9 py-3.5 border border-ivory-300/60 text-ivory-100 text-[11px] tracking-[0.2em] uppercase font-medium hover:border-ivory-100 hover:bg-ivory-100/10 transition-all duration-300 active:scale-95"
          >
            Explore Collection
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-ivory-300 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-ivory-300 to-transparent" />
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const floatingOrbs = [
  { size: 280, x: '10%', y: '15%', delay: '0s', duration: '7s', opacity: 0.12 },
  { size: 180, x: '75%', y: '10%', delay: '1.5s', duration: '9s', opacity: 0.08 },
  { size: 120, x: '85%', y: '65%', delay: '0.8s', duration: '6s', opacity: 0.1 },
  { size: 200, x: '5%', y: '70%', delay: '2s', duration: '8s', opacity: 0.07 },
  { size: 60, x: '50%', y: '80%', delay: '0.3s', duration: '5s', opacity: 0.15 },
];

export default function Hero({ onNavigate }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
        textRef.current.style.opacity = `${1 - scrollY / 600}`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ivory-100">
      {/* Background image with parallax */}
      <div ref={parallaxRef} className="absolute inset-0 scale-110">
        <img
          src="https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Luxury jewellery"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.8)' }}
        />
        {/* Warm overlay gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(30,20,10,0.75) 0%, rgba(15,10,5,0.5) 50%, rgba(201,169,110,0.15) 100%)'
        }} />
      </div>

      {/* Floating gold orbs */}
      {floatingOrbs.map((orb, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            animation: `float ${orb.duration} ease-in-out ${orb.delay} infinite`,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, rgba(232, 213, 176, ${orb.opacity * 1.5}), rgba(201, 169, 110, ${orb.opacity}), transparent 70%)`,
              filter: 'blur(2px)',
            }}
          />
        </div>
      ))}

      {/* Geometric diamond SVG floating */}
      <div className="absolute right-8 md:right-16 top-1/4 opacity-10 animate-float-delayed pointer-events-none">
        <svg width="120" height="160" viewBox="0 0 60 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#E8D5B0" strokeWidth="1" fill="none"/>
          <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#E8D5B0" strokeWidth="0.5" opacity="0.5"/>
          <ellipse cx="30" cy="38" rx="12" ry="16" stroke="#E8D5B0" strokeWidth="0.8" fill="none" opacity="0.6"/>
        </svg>
      </div>
      <div className="absolute left-6 md:left-16 bottom-1/3 opacity-8 animate-float pointer-events-none">
        <svg width="70" height="90" viewBox="0 0 60 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
          <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#C9A96E" strokeWidth="0.7"/>
        </svg>
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* Pre-headline */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold-400" />
          <span className="text-gold-300 text-xs tracking-[0.4em] uppercase font-medium flex items-center gap-2">
            <Sparkles size={10} />
            New Collection 2025
            <Sparkles size={10} />
          </span>
          <div className="h-px w-12 bg-gold-400" />
        </div>

        {/* Main headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory-100 font-light leading-none tracking-tight mb-4">
          Wear the
          <br />
          <em className="italic text-gradient-gold" style={{
            background: 'linear-gradient(135deg, #E8D5B0 0%, #C9A96E 35%, #E8D5B0 65%, #B8934A 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
          }}>
            Extraordinary
          </em>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="h-px w-8 bg-gold-500/60" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2L18 8L18 14L10 18L2 14L2 8L10 2Z" stroke="#C9A96E" strokeWidth="1" fill="none"/>
            <path d="M10 2L10 18M2 8L18 14M18 8L2 14" stroke="#C9A96E" strokeWidth="0.5"/>
          </svg>
          <div className="h-px w-8 bg-gold-500/60" />
        </div>

        {/* Subheadline */}
        <p className="text-ivory-300/80 text-base md:text-lg font-light tracking-wider max-w-xl mx-auto leading-relaxed mb-10">
          Designed in Australia. Inspired by elegance.
          <br />
          Premium jewellery crafted for the modern woman.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('collections')}
            className="group flex items-center gap-3 px-10 py-4 bg-gold-400 text-charcoal-900 text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold-300 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/25 active:scale-95"
          >
            Shop Collection
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('new-arrivals')}
            className="flex items-center gap-3 px-10 py-4 border border-ivory-300/60 text-ivory-200 text-xs tracking-[0.2em] uppercase font-medium hover:border-gold-400 hover:text-gold-300 transition-all duration-300 active:scale-95"
          >
            New Arrivals
          </button>
        </div>

        {/* Trust markers */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mt-14 text-ivory-400/60">
          {['Free Shipping $150+', 'Afterpay Available', 'Easy Returns'].map((text) => (
            <span key={text} className="text-xs tracking-wider flex items-center gap-2">
              <span className="w-1 h-1 bg-gold-500 rounded-full" />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-ivory-400 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold-400 to-transparent" />
      </div>
    </section>
  );
}

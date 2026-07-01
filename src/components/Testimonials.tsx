import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/products';

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 120);
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-forest-800 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diamond" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 5L55 20L55 40L30 55L5 40L5 20Z" stroke="#C9A96E" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamond)"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="text-gold-400 text-xs tracking-[0.35em] uppercase font-medium mb-3">Real Reviews</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory-100 font-light leading-tight">
            Loved by Thousands
            <br />
            <em className="italic text-gold-400">Across Australia</em>
          </h2>
          <div className="gold-divider mt-6" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-14 reveal">
          {[
            { value: '12,000+', label: 'Happy Customers' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '98%', label: 'Recommend Us' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl md:text-3xl text-gold-400 font-light">{stat.value}</p>
              <p className="text-ivory-400/60 text-xs tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`reveal reveal-delay-${i + 1} bg-forest-700/40 border border-gold-600/20 p-6 hover:border-gold-500/40 transition-colors duration-300`}
            >
              <Quote size={20} className="text-gold-500/40 mb-4" />

              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} className="text-gold-400 fill-gold-400" />
                ))}
              </div>

              <p className="text-ivory-300/80 text-sm leading-relaxed mb-5 font-light italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 border-t border-gold-600/20 pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-gold-500/30"
                />
                <div>
                  <p className="text-ivory-200 text-xs font-medium">{t.name}</p>
                  <p className="text-ivory-400/50 text-[10px] tracking-wide">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google reviews badge */}
        <div className="text-center mt-10 reveal">
          <p className="text-ivory-400/50 text-xs tracking-wider">
            ★ Rated 4.9/5 from 2,400+ verified Google Reviews
          </p>
        </div>
      </div>
    </section>
  );
}

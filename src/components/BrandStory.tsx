import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface BrandStoryProps {
  onNavigate: (page: string) => void;
}

export default function BrandStory({ onNavigate }: BrandStoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 150);
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
    <section ref={sectionRef} className="py-20 md:py-28 px-4 md:px-8 lg:px-12 bg-ivory-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images collage */}
          <div className="relative reveal">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/9602307/pexels-photo-9602307.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="FLAMORA craftsmanship"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/9428419/pexels-photo-9428419.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="FLAMORA detail"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/10984992/pexels-photo-10984992.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="FLAMORA design"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1460841/pexels-photo-1460841.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="FLAMORA collection"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating quote card */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-ivory-100/95 backdrop-blur-sm border border-gold-300/40 shadow-xl p-5 text-center">
              <p className="font-display text-charcoal-700 text-base italic leading-snug">
                "Every piece tells a story worth wearing."
              </p>
              <div className="gold-divider mt-3 mb-0" />
            </div>
          </div>

          {/* Text content */}
          <div>
            <div className="reveal">
              <p className="section-label">Our Story</p>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 font-light leading-tight mb-2">
                Designed in Australia.
              </h2>
              <h2 className="font-display text-4xl md:text-5xl text-gold-500 italic font-light leading-tight">
                Inspired by Elegance.
              </h2>
              <div className="gold-divider mx-0 mt-6 mb-8" />
            </div>

            <div className="reveal space-y-5 text-charcoal-500 text-sm leading-relaxed">
              <p>
                FLAMORA was born from a simple belief: every woman deserves to feel extraordinary without compromise. We set out to create jewellery that rivals the quality of luxury houses — at a price that celebrates you, not your credit card.
              </p>
              <p>
                Each piece in our collection is thoughtfully designed in Australia, drawing inspiration from the country's natural landscapes — from the warm golds of our coastal sunsets to the cool shimmer of morning light on the ocean.
              </p>
              <p>
                We partner with skilled artisans who share our commitment to quality. Every clasp, stone, and setting is chosen with intention. Our gold vermeil is plated to a thickness that ensures longevity, and every gemstone is hand-selected for its brilliance.
              </p>
            </div>

            <div className="reveal mt-10 grid grid-cols-3 gap-6">
              {[
                { value: '2019', label: 'Founded' },
                { value: '100%', label: 'Nickel Free' },
                { value: '18K', label: 'Gold Vermeil' },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-gold-300 pl-4">
                  <p className="font-display text-2xl text-charcoal-800 font-medium">{stat.value}</p>
                  <p className="text-charcoal-400 text-xs tracking-wider mt-1 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="reveal mt-10">
              <button
                onClick={() => onNavigate('our-story')}
                className="btn-outline text-xs group"
              >
                <span className="flex items-center gap-2">
                  Read Our Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

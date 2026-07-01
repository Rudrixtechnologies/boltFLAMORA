import { useEffect, useRef } from 'react';
import { Package, Shield, RefreshCw, Truck, Award, Leaf } from 'lucide-react';

export default function PackagingTrust() {
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

  const features = [
    {
      icon: Package,
      title: 'Luxury Packaging',
      description: 'Every order arrives in our signature gift-ready box with a satin pouch, perfect as a gift or self-treat.',
    },
    {
      icon: Truck,
      title: 'Australia-wide Shipping',
      description: 'Free standard shipping on orders over $150 AUD. Express delivery available. Ships within 1–2 business days.',
    },
    {
      icon: RefreshCw,
      title: 'Easy 30-Day Returns',
      description: 'Not in love? Return within 30 days for a full refund or exchange. No questions asked.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Shop confidently with SSL-encrypted payments. We accept Visa, Mastercard, Apple Pay, Google Pay & Afterpay.',
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'All pieces are covered by our 12-month quality guarantee. We stand behind every item we sell.',
    },
    {
      icon: Leaf,
      title: 'Eco-Conscious',
      description: 'Our packaging is made from recycled materials. We\'re committed to reducing our environmental footprint.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 md:px-8 lg:px-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="section-label">Why FLAMORA</p>
          <h2 className="section-title">Premium Experience,<br />From First Click to Unboxing</h2>
          <div className="gold-divider" />
        </div>

        {/* Packaging showcase */}
        <div className="reveal mb-16">
          <div className="relative overflow-hidden rounded-sm">
            <img
              src="https://images.pexels.com/photos/5632388/pexels-photo-5632388.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="FLAMORA luxury packaging"
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/60 via-transparent to-transparent" />
            <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-ivory-100">
              <p className="text-gold-300 text-xs tracking-[0.3em] uppercase mb-2">The FLAMORA Experience</p>
              <h3 className="font-display text-2xl md:text-4xl font-light leading-tight max-w-sm">
                Every detail matters.
                <br />
                <em className="italic text-gold-400">Every unboxing is a moment.</em>
              </h3>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {features.map((feat, i) => (
            <div key={feat.title} className={`reveal reveal-delay-${(i % 3) + 1} group`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 border border-gold-300/50 flex items-center justify-center group-hover:bg-gold-400 group-hover:border-gold-400 transition-all duration-300">
                  <feat.icon size={18} className="text-gold-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-medium text-charcoal-800 text-sm mb-1.5">{feat.title}</h3>
                  <p className="text-charcoal-500 text-xs leading-relaxed">{feat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="reveal border-t border-gold-200/50 pt-10">
          <p className="text-center text-charcoal-400 text-xs tracking-widest uppercase mb-6">Accepted Payments</p>
          <div className="flex items-center justify-center flex-wrap gap-4 md:gap-8">
            {[
              { name: 'Visa', logo: '💳' },
              { name: 'Mastercard', logo: '🔵' },
              { name: 'Apple Pay', logo: '🍎' },
              { name: 'Google Pay', logo: 'G' },
              { name: 'Afterpay', logo: '✦' },
              { name: 'PayPal', logo: 'P' },
            ].map((method) => (
              <div
                key={method.name}
                className="flex items-center gap-2 px-4 py-2.5 border border-charcoal-200/60 bg-white/60 hover:border-gold-300 transition-colors duration-200"
              >
                <span className="text-lg leading-none">{method.logo}</span>
                <span className="text-charcoal-600 text-xs font-medium tracking-wide">{method.name}</span>
              </div>
            ))}
          </div>

          {/* Security badges */}
          <div className="flex items-center justify-center gap-6 mt-8 text-charcoal-400">
            <div className="flex items-center gap-1.5 text-xs">
              <Shield size={14} className="text-gold-500" />
              SSL Secured
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Award size={14} className="text-gold-500" />
              Australian Owned
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <RefreshCw size={14} className="text-gold-500" />
              30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

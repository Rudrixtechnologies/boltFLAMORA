import { Truck, RefreshCw, Shield, Gem } from 'lucide-react';

const benefits = [
  {
    icon: Truck,
    title: 'Complimentary Shipping',
    description: 'Free delivery on all orders over $150 AUD, Australia-wide.',
  },
  {
    icon: RefreshCw,
    title: 'Free Returns',
    description: '30-day returns and exchanges. No questions asked.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: '256-bit SSL encryption. Afterpay, Visa, Mastercard & more.',
  },
  {
    icon: Gem,
    title: 'Lifetime Jewellery Care',
    description: 'Complimentary cleaning and care for every FLAMORA piece.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-14 md:py-20 px-4 md:px-8 lg:px-12 bg-ivory-200/40 border-y border-charcoal-200/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {benefits.map((b) => (
            <div key={b.title} className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <div className="w-11 h-11 border border-gold-300/60 flex items-center justify-center group hover:bg-gold-400 hover:border-gold-400 transition-all duration-300">
                  <b.icon
                    size={20}
                    className="text-gold-500 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h3 className="font-display text-base text-charcoal-800 font-medium mb-1.5">{b.title}</h3>
              <p className="text-charcoal-400 text-xs leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

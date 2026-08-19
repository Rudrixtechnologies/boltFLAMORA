import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="bg-forest-900 py-20 md:py-28 px-4 md:px-8 lg:px-12">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-gold-400 text-[11px] tracking-[0.35em] uppercase font-medium mb-4">
          Newsletter
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory-100 font-light leading-tight mb-4">
          Join the World of FLAMORA
        </h2>
        <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
        <p className="text-ivory-300/60 text-sm font-light leading-relaxed mb-8 max-w-md mx-auto">
          Discover new collections, private events and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-forest-800 text-ivory-200 placeholder-forest-400/50 px-5 py-3.5 text-sm outline-none border border-forest-700 focus:border-gold-400 transition-colors"
            required
          />
          <button
            type="submit"
            className="px-8 py-3.5 bg-gold-400 hover:bg-gold-500 text-white text-[11px] tracking-[0.2em] uppercase font-medium transition-colors flex items-center justify-center gap-2 flex-shrink-0"
          >
            {subscribed ? (
              <>
                <Check size={14} /> Subscribed
              </>
            ) : (
              <>
                Subscribe <ArrowRight size={13} />
              </>
            )}
          </button>
        </form>

        <p className="text-forest-400/50 text-[10px] mt-4 tracking-wide">
          By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

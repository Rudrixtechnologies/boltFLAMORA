import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

function FlamoraLogo() {
  return (
    <svg width="24" height="32" viewBox="0 0 60 76" fill="none">
      <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
      <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#C9A96E" strokeWidth="0.7" opacity="0.6"/>
      <ellipse cx="30" cy="38" rx="12" ry="16" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-forest-900 text-ivory-300">
      {/* Newsletter section */}
      <div className="border-b border-forest-700/30 py-14 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <p className="text-gold-400 text-xs tracking-[0.35em] uppercase mb-2">Join the FLAMORA Family</p>
            <h3 className="font-display text-2xl md:text-3xl text-ivory-100 font-light">
              Get 10% off your first order
            </h3>
            <p className="text-ivory-400/60 text-sm mt-2">
              Plus be first to know about new arrivals, exclusive offers & styling tips.
            </p>
          </div>
          <div className="w-full lg:w-auto lg:min-w-96">
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-forest-800 text-ivory-200 placeholder-forest-400/50 px-5 py-3.5 text-sm outline-none border border-forest-700 focus:border-gold-400 transition-colors"
              />
              <button className="bg-gold-400 hover:bg-gold-500 text-white px-6 py-3.5 text-xs tracking-widest uppercase font-medium transition-colors flex items-center gap-2 flex-shrink-0">
                Subscribe <ArrowRight size={13} />
              </button>
            </div>
            <p className="text-forest-400/50 text-[10px] mt-2 tracking-wide">
              By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-14 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 mb-5">
              <FlamoraLogo />
              <span className="font-display text-lg tracking-[0.35em] text-ivory-200 font-light">FLAMORA</span>
            </button>
            <p className="text-forest-300/50 text-xs leading-relaxed mb-6">
              Affordable luxury jewellery designed in Australia. Crafted for the modern woman who deserves extraordinary.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 border border-forest-700 hover:border-gold-400 flex items-center justify-center text-forest-300/50 hover:text-gold-400 transition-all duration-200">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 border border-forest-700 hover:border-gold-400 flex items-center justify-center text-forest-300/50 hover:text-gold-400 transition-all duration-200">
                <Facebook size={14} />
              </a>
              <a href="#" className="w-8 h-8 border border-forest-700 hover:border-gold-400 flex items-center justify-center text-forest-300/50 hover:text-gold-400 transition-all duration-200">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-ivory-200 text-xs tracking-[0.2em] uppercase font-medium mb-5">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Collections', id: 'collections' },
                { label: 'Rings', id: 'rings' },
                { label: 'Necklaces', id: 'necklaces' },
                { label: 'Earrings', id: 'earrings' },
                { label: 'Bracelets', id: 'bracelets' },
                { label: 'Wedding Collection', id: 'wedding' },
                { label: 'New Arrivals', id: 'new-arrivals' },
                { label: 'Sale', id: 'sale' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-forest-300/50 hover:text-gold-400 text-xs tracking-wide transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer care */}
          <div>
            <h4 className="text-ivory-200 text-xs tracking-[0.2em] uppercase font-medium mb-5">Customer Care</h4>
            <ul className="space-y-3">
              {[
                'Track Your Order',
                'Returns & Exchanges',
                'Size Guide',
                'Care Instructions',
                'FAQs',
                'Contact Us',
                'Afterpay FAQs',
              ].map((label) => (
                <li key={label}>
                  <button className="text-forest-300/50 hover:text-gold-400 text-xs tracking-wide transition-colors text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-ivory-200 text-xs tracking-[0.2em] uppercase font-medium mb-5">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-forest-300/50 text-xs">
                <Mail size={13} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-ivory-300">hello@flamora.com.au</p>
                  <p className="text-forest-400/50 mt-0.5">We reply within 24 hours</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-forest-300/50 text-xs">
                <Phone size={13} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-ivory-300">1800 FLAMORA</p>
                  <p className="text-forest-400/50 mt-0.5">Mon–Fri, 9am–5pm AEST</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-forest-300/50 text-xs">
                <MapPin size={13} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-ivory-300">Sydney, New South Wales</p>
                  <p className="text-forest-400/50 mt-0.5">Australia</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 p-4 border border-forest-700/40 bg-forest-800/50">
              <p className="text-gold-400 text-xs tracking-widest uppercase mb-1">Free Shipping</p>
              <p className="text-ivory-300 text-sm font-medium">Orders over $150 AUD</p>
              <p className="text-forest-400/50 text-xs mt-1">Australia-wide · 2–5 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-forest-800 py-5 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-forest-400/50 text-xs tracking-wide text-center md:text-left">
            © {new Date().getFullYear()} FLAMORA Jewellery Pty Ltd. All rights reserved. ABN: 12 345 678 901
          </p>
          <div className="flex items-center gap-5 text-forest-400/50 text-xs">
            <button className="hover:text-gold-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-gold-400 transition-colors">Terms of Service</button>
            <button className="hover:text-gold-400 transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

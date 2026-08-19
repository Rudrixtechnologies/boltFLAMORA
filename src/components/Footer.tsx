import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

function FlamoraLogo() {
  return (
    <svg width="24" height="32" viewBox="0 0 60 76" fill="none">
      <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
      <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#C9A96E" strokeWidth="0.7" opacity="0.6" />
      <ellipse cx="30" cy="38" rx="12" ry="16" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

interface FooterProps {
  onNavigate: (page: string) => void;
}

const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', id: 'new-arrivals' },
      { label: 'Rings', id: 'rings' },
      { label: 'Earrings', id: 'earrings' },
      { label: 'Necklaces', id: 'necklaces' },
      { label: 'Bracelets', id: 'bracelets' },
      { label: 'Men', id: 'men' },
      { label: 'Gifts', id: 'collections' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Contact Us', id: '' },
      { label: 'Shipping & Delivery', id: '' },
      { label: 'Returns', id: '' },
      { label: 'Jewellery Care', id: '' },
      { label: 'Ring Size Guide', id: '' },
      { label: 'FAQs', id: '' },
    ],
  },
  {
    title: 'About FLAMORA',
    links: [
      { label: 'Our Story', id: 'our-story' },
      { label: 'Journal', id: '' },
      { label: 'Careers', id: '' },
      { label: 'Sustainability', id: '' },
      { label: 'Stores', id: '' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', id: '' },
      { label: 'Terms', id: '' },
      { label: 'Accessibility', id: '' },
    ],
  },
];

const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'Afterpay', 'PayPal'];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-charcoal-900 text-ivory-300">
      {/* Main footer */}
      <div className="py-14 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2">
              <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 mb-5">
                <FlamoraLogo />
                <span className="font-display text-lg tracking-[0.3em] text-ivory-200 font-light">FLAMORA</span>
              </button>
              <p className="text-charcoal-300 text-xs leading-relaxed mb-6 max-w-xs">
                Modern fine jewellery designed in Australia. Crafted for life's unforgettable moments.
              </p>

              {/* Contact */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-charcoal-300 text-xs">
                  <Mail size={13} className="text-gold-400 flex-shrink-0" />
                  hello@flamora.com.au
                </div>
                <div className="flex items-center gap-2.5 text-charcoal-300 text-xs">
                  <Phone size={13} className="text-gold-400 flex-shrink-0" />
                  1800 FLAMORA
                </div>
                <div className="flex items-center gap-2.5 text-charcoal-300 text-xs">
                  <MapPin size={13} className="text-gold-400 flex-shrink-0" />
                  Sydney, New South Wales
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Youtube, label: 'YouTube' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    aria-label={label}
                    className="w-8 h-8 border border-charcoal-700 hover:border-gold-400 flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-ivory-200 text-[11px] tracking-[0.2em] uppercase font-medium mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => link.id && onNavigate(link.id)}
                        className="text-charcoal-300 hover:text-gold-400 text-xs tracking-wide transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <div className="border-t border-charcoal-800 py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-charcoal-400 text-[10px] tracking-[0.2em] uppercase mb-4">
            Accepted Payment Methods
          </p>
          <div className="flex items-center justify-center flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="px-3 py-1.5 border border-charcoal-700 text-charcoal-300 text-[10px] font-medium tracking-wide"
              >
                {method}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-800 py-5 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-charcoal-400 text-xs tracking-wide text-center md:text-left">
            © 2026 FLAMORA. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-charcoal-400 text-xs">
            <span className="text-gold-400 font-medium">Australia</span>
            <span className="text-charcoal-600">|</span>
            <span>India</span>
            <span className="text-charcoal-600">|</span>
            <span>Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

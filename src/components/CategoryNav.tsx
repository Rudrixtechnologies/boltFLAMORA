import { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, Plus, Minus } from 'lucide-react';

interface CategoryNavProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface MegaMenuItem {
  label: string;
  id: string;
}

interface MegaMenu {
  label: string;
  id: string;
  hasMega?: boolean;
  byStyle?: MegaMenuItem[];
  byMetal?: MegaMenuItem[];
  byOccasion?: MegaMenuItem[];
  editorialImage?: string;
  editorialLabel?: string;
}

const navItems: MegaMenu[] = [
  { label: 'NEW IN', id: 'new-arrivals' },
  {
    label: 'RINGS',
    id: 'rings',
    hasMega: true,
    byStyle: [
      { label: 'Engagement Rings', id: 'wedding' },
      { label: 'Diamond Rings', id: 'rings' },
      { label: 'Gold Rings', id: 'rings' },
      { label: 'Solitaire Rings', id: 'rings' },
      { label: 'Gemstone Rings', id: 'rings' },
      { label: 'Wedding Rings', id: 'wedding' },
      { label: 'Cocktail Rings', id: 'rings' },
    ],
    byMetal: [
      { label: 'Yellow Gold', id: 'rings' },
      { label: 'Rose Gold', id: 'rings' },
      { label: 'White Gold', id: 'rings' },
      { label: 'Platinum', id: 'rings' },
    ],
    byOccasion: [
      { label: 'Engagement', id: 'wedding' },
      { label: 'Wedding', id: 'wedding' },
      { label: 'Anniversary', id: 'rings' },
      { label: 'Everyday', id: 'rings' },
      { label: 'Gifts', id: 'rings' },
    ],
    editorialImage: 'https://images.pexels.com/photos/10984987/pexels-photo-10984987.jpeg?auto=compress&cs=tinysrgb&w=500',
    editorialLabel: 'The Celeste Collection',
  },
  {
    label: 'EARRINGS',
    id: 'earrings',
    hasMega: true,
    byStyle: [
      { label: 'Studs', id: 'earrings' },
      { label: 'Hoops', id: 'earrings' },
      { label: 'Drop Earrings', id: 'earrings' },
      { label: 'Huggie Earrings', id: 'earrings' },
      { label: 'Pearl Earrings', id: 'earrings' },
    ],
    byMetal: [
      { label: 'Yellow Gold', id: 'earrings' },
      { label: 'Rose Gold', id: 'earrings' },
      { label: 'White Gold', id: 'earrings' },
    ],
    byOccasion: [
      { label: 'Everyday', id: 'earrings' },
      { label: 'Wedding', id: 'earrings' },
      { label: 'Gifts', id: 'earrings' },
    ],
    editorialImage: 'https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=500',
    editorialLabel: 'Aurora Pearl Drops',
  },
  {
    label: 'NECKLACES',
    id: 'necklaces',
    hasMega: true,
    byStyle: [
      { label: 'Pendant Necklaces', id: 'pendants' },
      { label: 'Chain Necklaces', id: 'necklaces' },
      { label: 'Layered Necklaces', id: 'necklaces' },
      { label: 'Choker Necklaces', id: 'necklaces' },
      { label: 'Statement Necklaces', id: 'necklaces' },
    ],
    byMetal: [
      { label: 'Yellow Gold', id: 'necklaces' },
      { label: 'Rose Gold', id: 'necklaces' },
      { label: 'White Gold', id: 'necklaces' },
    ],
    byOccasion: [
      { label: 'Everyday', id: 'necklaces' },
      { label: 'Anniversary', id: 'necklaces' },
      { label: 'Gifts', id: 'necklaces' },
    ],
    editorialImage: 'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=500',
    editorialLabel: 'Lumière Layered Chain',
  },
  {
    label: 'BRACELETS',
    id: 'bracelets',
    hasMega: true,
    byStyle: [
      { label: 'Tennis Bracelets', id: 'bracelets' },
      { label: 'Chain Bracelets', id: 'bracelets' },
      { label: 'Bangles', id: 'bracelets' },
      { label: 'Charm Bracelets', id: 'bracelets' },
      { label: 'Cuff Bracelets', id: 'bracelets' },
    ],
    byMetal: [
      { label: 'Yellow Gold', id: 'bracelets' },
      { label: 'White Gold', id: 'bracelets' },
      { label: 'Platinum', id: 'bracelets' },
    ],
    byOccasion: [
      { label: 'Everyday', id: 'bracelets' },
      { label: 'Anniversary', id: 'bracelets' },
      { label: 'Gifts', id: 'bracelets' },
    ],
    editorialImage: 'https://images.pexels.com/photos/9428424/pexels-photo-9428424.jpeg?auto=compress&cs=tinysrgb&w=500',
    editorialLabel: 'Élan Tennis Bracelet',
  },
  {
    label: 'PENDANTS',
    id: 'pendants',
    hasMega: true,
    byStyle: [
      { label: 'Star Pendants', id: 'pendants' },
      { label: 'Halo Pendants', id: 'pendants' },
      { label: 'Solitaire Pendants', id: 'pendants' },
      { label: 'Pearl Pendants', id: 'pendants' },
    ],
    byMetal: [
      { label: 'Yellow Gold', id: 'pendants' },
      { label: 'Rose Gold', id: 'pendants' },
      { label: 'White Gold', id: 'pendants' },
    ],
    byOccasion: [
      { label: 'Everyday', id: 'pendants' },
      { label: 'Gifts', id: 'pendants' },
    ],
    editorialImage: 'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=500',
    editorialLabel: 'Étoile Star Pendant',
  },
  { label: 'MEN', id: 'men' },
  { label: 'WOMEN', id: 'collections' },
  { label: 'GIFTS', id: 'collections' },
  { label: 'COLLECTIONS', id: 'collections' },
];

export default function CategoryNav({ onNavigate, mobileOpen, onMobileClose }: CategoryNavProps) {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    setActiveMega(null);
    onMobileClose();
    onNavigate(id);
  };

  return (
    <>
      {/* Desktop category bar */}
      <nav
        ref={navRef}
        className="hidden lg:block sticky top-16 md:top-20 z-40 bg-ivory-100 border-b border-charcoal-200/30"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-center h-11">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative h-full"
                onMouseEnter={() => item.hasMega && setActiveMega(item.label)}
                onMouseLeave={() => item.hasMega && setActiveMega(null)}
              >
                <button
                  onClick={() => handleNav(item.id)}
                  className="flex items-center gap-1 h-full px-4 text-[11px] tracking-[0.18em] font-medium text-charcoal-700 hover:text-forest-800 transition-colors uppercase"
                >
                  {item.label}
                  {item.hasMega && (
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-200 ${activeMega === item.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Mega menu */}
                {item.hasMega && activeMega === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-0 z-50">
                    <div className="bg-ivory-100 border border-charcoal-200/40 shadow-xl w-[640px] animate-fade-in">
                      <div className="grid grid-cols-4 gap-0">
                        {/* Shop By Style */}
                        <div className="p-5 border-r border-charcoal-200/20">
                          <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-forest-800 mb-3">
                            Shop By Style
                          </h4>
                          <ul className="space-y-2">
                            {item.byStyle?.map((sub) => (
                              <li key={sub.label}>
                                <button
                                  onClick={() => handleNav(sub.id)}
                                  className="text-xs text-charcoal-500 hover:text-forest-800 hover:translate-x-0.5 transition-all duration-150 text-left"
                                >
                                  {sub.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Shop By Metal */}
                        <div className="p-5 border-r border-charcoal-200/20">
                          <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-forest-800 mb-3">
                            Shop By Metal
                          </h4>
                          <ul className="space-y-2">
                            {item.byMetal?.map((sub) => (
                              <li key={sub.label}>
                                <button
                                  onClick={() => handleNav(sub.id)}
                                  className="text-xs text-charcoal-500 hover:text-forest-800 hover:translate-x-0.5 transition-all duration-150 text-left"
                                >
                                  {sub.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Shop By Occasion */}
                        <div className="p-5 border-r border-charcoal-200/20">
                          <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-forest-800 mb-3">
                            Shop By Occasion
                          </h4>
                          <ul className="space-y-2">
                            {item.byOccasion?.map((sub) => (
                              <li key={sub.label}>
                                <button
                                  onClick={() => handleNav(sub.id)}
                                  className="text-xs text-charcoal-500 hover:text-forest-800 hover:translate-x-0.5 transition-all duration-150 text-left"
                                >
                                  {sub.label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Editorial image */}
                        <div className="relative overflow-hidden">
                          <img
                            src={item.editorialImage}
                            alt={item.editorialLabel}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/70 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-ivory-100 text-xs font-medium tracking-wide leading-tight">
                              {item.editorialLabel}
                            </p>
                            <button
                              onClick={() => handleNav(item.id)}
                              className="text-gold-400 text-[10px] tracking-widest uppercase mt-1.5 hover:text-gold-300 transition-colors"
                            >
                              Shop Now →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-charcoal-900/50" onClick={onMobileClose} />
          <div className="absolute top-0 left-0 h-full w-[85%] max-w-sm bg-ivory-100 shadow-2xl flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-charcoal-200/30 flex-shrink-0">
              <span className="font-display text-lg tracking-[0.3em] text-charcoal-800 font-light">FLAMORA</span>
              <button onClick={onMobileClose} className="text-charcoal-400 hover:text-charcoal-700">
                <X size={22} />
              </button>
            </div>

            {/* Nav items accordion */}
            <div className="flex-1 overflow-y-auto py-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasMega ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        }
                        className="flex items-center justify-between w-full px-5 py-3 text-sm font-medium tracking-[0.15em] uppercase text-charcoal-700 hover:text-forest-800 transition-colors"
                      >
                        {item.label}
                        {mobileExpanded === item.label ? <Minus size={16} /> : <Plus size={16} />}
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="px-5 pb-3 bg-ivory-200/40">
                          <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-forest-800 mt-3 mb-2">
                            Shop By Style
                          </p>
                          <div className="space-y-1.5">
                            {item.byStyle?.map((sub) => (
                              <button
                                key={sub.label}
                                onClick={() => handleNav(sub.id)}
                                className="block text-xs text-charcoal-500 hover:text-forest-800 transition-colors py-1"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-forest-800 mt-4 mb-2">
                            Shop By Metal
                          </p>
                          <div className="space-y-1.5">
                            {item.byMetal?.map((sub) => (
                              <button
                                key={sub.label}
                                onClick={() => handleNav(sub.id)}
                                className="block text-xs text-charcoal-500 hover:text-forest-800 transition-colors py-1"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-forest-800 mt-4 mb-2">
                            Shop By Occasion
                          </p>
                          <div className="space-y-1.5">
                            {item.byOccasion?.map((sub) => (
                              <button
                                key={sub.label}
                                onClick={() => handleNav(sub.id)}
                                className="block text-xs text-charcoal-500 hover:text-forest-800 transition-colors py-1"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleNav(item.id)}
                      className="block w-full text-left px-5 py-3 text-sm font-medium tracking-[0.15em] uppercase text-charcoal-700 hover:text-forest-800 transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Footer info */}
            <div className="px-5 py-4 border-t border-charcoal-200/30 flex-shrink-0">
              <p className="text-[10px] tracking-[0.2em] uppercase text-forest-700 font-medium mb-1">
                Complimentary Shipping
              </p>
              <p className="text-xs text-charcoal-400">On all orders over $150 AUD</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

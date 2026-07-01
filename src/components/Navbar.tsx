import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, ChevronDown, User, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* Inline FLAMORA diamond logo — matches brand SVG */
function FlamoraLogo({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.33} viewBox="0 0 60 76" fill="none" className={className}>
      <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
      <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#C9A96E" strokeWidth="0.7" opacity="0.7"/>
      <ellipse cx="30" cy="38" rx="12" ry="16" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

interface NavbarProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  cartCount: number;
  wishlistCount: number;
  currentPage: string;
}

const navLinks = [
  {
    label: 'Collections',
    items: [
      { label: 'All Jewellery', id: 'collections' },
      { label: 'Rings', id: 'rings' },
      { label: 'Necklaces', id: 'necklaces' },
      { label: 'Earrings', id: 'earrings' },
      { label: 'Bracelets', id: 'bracelets' },
      { label: 'Wedding Collection', id: 'wedding' },
    ],
  },
  { label: 'New Arrivals', id: 'new-arrivals' },
  { label: 'Best Sellers', id: 'best-sellers' },
  { label: 'Our Story', id: 'our-story' },
];

export default function Navbar({ onNavigate, cartCount, wishlistCount, currentPage }: NavbarProps) {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close user menu on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setUserMenuOpen(false);
    onNavigate(id);
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await signOut();
    onNavigate('home');
  };

  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Account';

  return (
    <>
      {/* Top announcement bar — forest green */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-12 py-1.5 bg-forest-800">
        <p className="text-ivory-300/80 text-xs tracking-widest font-light">
          FREE SHIPPING ON ORDERS OVER $150 AUD — AUSTRALIA-WIDE
        </p>
        <div className="flex items-center gap-6 text-ivory-300/60 text-xs tracking-wider">
          <button className="hover:text-gold-300 transition-colors">Afterpay Available</button>
          <span className="text-forest-600">|</span>
          <button className="hover:text-gold-300 transition-colors">Size Guide</button>
          <span className="text-forest-600">|</span>
          <button className="hover:text-gold-300 transition-colors">Track Order</button>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory-100/98 backdrop-blur-sm shadow-sm border-b border-forest-800/10'
            : 'bg-ivory-100/95 backdrop-blur-sm border-b border-forest-800/8'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-12 py-3 md:py-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-charcoal-700 hover:text-forest-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop nav left */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.items && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 text-xs tracking-[0.15em] uppercase font-medium transition-colors duration-200 ${
                    currentPage === (link as { id?: string }).id
                      ? 'text-forest-700'
                      : 'text-charcoal-600 hover:text-forest-800'
                  }`}
                  onClick={() => !link.items && handleNav((link as { id: string }).id)}
                >
                  {link.label}
                  {link.items && (
                    <ChevronDown size={12} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {link.items && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-ivory-100 border border-forest-800/15 shadow-xl py-2 z-50">
                    {link.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className="w-full text-left px-5 py-2.5 text-xs tracking-wider text-charcoal-600 hover:text-forest-800 hover:bg-forest-50/60 transition-colors uppercase font-medium"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Logo — centre */}
          <button
            onClick={() => handleNav('home')}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5"
          >
            <FlamoraLogo size={26} />
            <span className="font-display text-xl tracking-[0.35em] text-charcoal-800 font-light leading-none hidden sm:block">
              FLAMORA
            </span>
          </button>

          {/* Right icons */}
          <div className="flex items-center gap-0.5 md:gap-1">
            {/* Search */}
            <button
              className="p-2 text-charcoal-600 hover:text-forest-800 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <button
              className="p-2 text-charcoal-600 hover:text-forest-800 transition-colors relative"
              onClick={() => onNavigate('wishlist')}
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest-700 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart — triggers auth guard in App */}
            <button
              className="p-2 text-charcoal-600 hover:text-forest-800 transition-colors relative"
              onClick={() => onNavigate('cart')}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest-700 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User icon / login */}
            <div ref={userMenuRef} className="relative ml-1">
              {user ? (
                /* Logged in: show avatar/name with dropdown */
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-charcoal-600 hover:text-forest-800 transition-colors"
                  aria-label="Account"
                >
                  <div className="w-7 h-7 bg-forest-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ivory-100 text-[11px] font-medium uppercase">
                      {displayName.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden md:block text-xs font-medium text-charcoal-700 max-w-[80px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown size={12} className={`hidden md:block text-charcoal-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                /* Not logged in: show login icon */
                <button
                  onClick={() => onNavigate('auth')}
                  className="flex items-center gap-1.5 px-2 py-2 text-charcoal-600 hover:text-forest-800 transition-colors"
                  aria-label="Sign in"
                >
                  <LogIn size={18} />
                  <span className="hidden md:block text-xs font-medium tracking-wider text-charcoal-600 hover:text-forest-800">
                    Sign In
                  </span>
                </button>
              )}

              {/* User dropdown menu */}
              {user && userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-ivory-100 border border-forest-800/15 shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-forest-800/10">
                    <p className="text-charcoal-800 text-xs font-semibold truncate">{user.user_metadata?.full_name || displayName}</p>
                    <p className="text-charcoal-400 text-[10px] truncate mt-0.5">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleNav('account')}
                    className="w-full text-left px-4 py-2.5 text-xs tracking-wider text-charcoal-600 hover:text-forest-800 hover:bg-forest-50/60 transition-colors flex items-center gap-2"
                  >
                    <User size={13} /> My Account
                  </button>
                  <button
                    onClick={() => handleNav('wishlist')}
                    className="w-full text-left px-4 py-2.5 text-xs tracking-wider text-charcoal-600 hover:text-forest-800 hover:bg-forest-50/60 transition-colors flex items-center gap-2"
                  >
                    <Heart size={13} /> Wishlist
                  </button>
                  <div className="border-t border-forest-800/10 mt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-xs tracking-wider text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={13} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-forest-800/10 px-4 md:px-12 py-3 bg-ivory-50/95">
            <div className="max-w-xl mx-auto flex items-center gap-3 border-b border-charcoal-300 pb-2">
              <Search size={16} className="text-charcoal-400" />
              <input
                autoFocus
                placeholder="Search rings, necklaces, earrings..."
                className="flex-1 bg-transparent text-charcoal-800 text-sm placeholder-charcoal-400 outline-none tracking-wide"
              />
              <button onClick={() => setSearchOpen(false)} className="text-charcoal-400 hover:text-charcoal-700">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-charcoal-900/50" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-72 bg-ivory-100 shadow-2xl flex flex-col pt-6 pb-8 px-6 overflow-y-auto">
            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-forest-800/10">
              <FlamoraLogo size={24} />
              <span className="font-display text-lg tracking-[0.3em] text-charcoal-800 font-light">FLAMORA</span>
              <button onClick={() => setMenuOpen(false)} className="ml-auto text-charcoal-400">
                <X size={20} />
              </button>
            </div>

            {/* User status in mobile */}
            {user ? (
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-forest-800/10">
                <div className="w-8 h-8 bg-forest-800 rounded-full flex items-center justify-center">
                  <span className="text-ivory-100 text-xs font-medium uppercase">{displayName.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-charcoal-700 text-sm font-medium truncate">{displayName}</p>
                  <p className="text-charcoal-400 text-xs truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <button onClick={() => handleNav('auth')} className="flex items-center gap-2 mb-5 pb-4 border-b border-forest-800/10 text-forest-800 text-sm font-medium">
                <LogIn size={16} /> Sign In / Create Account
              </button>
            )}

            {/* Nav links */}
            <div className="mb-6">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.items ? (
                    <>
                      <p className="text-sm font-medium text-charcoal-700 tracking-wider uppercase py-2">{link.label}</p>
                      <div className="pl-3 mb-2">
                        {link.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className="block w-full text-left py-1.5 text-sm text-charcoal-500 hover:text-forest-800 tracking-wide transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNav((link as { id: string }).id)}
                      className="block w-full text-left py-2.5 text-sm font-medium text-charcoal-700 hover:text-forest-800 tracking-wider uppercase transition-colors"
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {user && (
              <button onClick={handleSignOut} className="flex items-center gap-2 text-red-500 text-sm mt-auto">
                <LogOut size={15} /> Sign Out
              </button>
            )}

            <div className="mt-4 text-xs text-charcoal-400 tracking-widest space-y-2">
              <p className="text-forest-700 font-medium">FREE SHIPPING OVER $150 AUD</p>
              <p>Afterpay available · Easy returns</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

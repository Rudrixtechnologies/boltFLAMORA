import { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  Store,
  Menu,
  X,
  ChevronDown,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function FlamoraLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.33} viewBox="0 0 60 76" fill="none" className="flex-shrink-0">
      <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#0D3B2E" strokeWidth="1.5" fill="none" />
      <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#0D3B2E" strokeWidth="0.7" opacity="0.7" />
      <ellipse cx="30" cy="38" rx="12" ry="16" stroke="#0D3B2E" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

interface HeaderProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  cartCount: number;
  wishlistCount: number;
  currentPage: string;
  onMobileMenuToggle: () => void;
  onSearchChange?: (q: string) => void;
}

export default function Header({
  onNavigate,
  cartCount,
  wishlistCount,
  onMobileMenuToggle,
}: HeaderProps) {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await signOut();
    onNavigate('home');
  };

  const displayName =
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'Account';

  return (
    <header
      className={`sticky top-0 z-50 bg-ivory-100 transition-all duration-300 ${
        scrolled ? 'shadow-sm border-b border-charcoal-200/40' : 'border-b border-charcoal-200/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-6 h-16 md:h-20">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="lg:hidden p-1.5 text-charcoal-700 hover:text-forest-800 transition-colors"
              onClick={onMobileMenuToggle}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5">
              <FlamoraLogo size={26} />
              <span className="font-display text-xl md:text-2xl tracking-[0.3em] text-charcoal-800 font-light leading-none hidden sm:block">
                FLAMORA
              </span>
            </button>
          </div>

          {/* Center: search bar (desktop) */}
          <div className="flex-1 max-w-xl mx-auto hidden md:block">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jewellery, collections and gifts"
                className="w-full bg-ivory-200/60 border border-charcoal-200/50 pl-11 pr-4 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 outline-none focus:border-forest-700 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Right: icons */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* Mobile search */}
            <button
              className="md:hidden p-2 text-charcoal-700 hover:text-forest-800 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Location (desktop) */}
            <button
              className="hidden lg:flex items-center gap-1.5 px-2 py-2 text-charcoal-600 hover:text-forest-800 transition-colors"
              aria-label="Location"
            >
              <MapPin size={18} />
              <span className="text-xs font-medium tracking-wide">Australia</span>
            </button>

            {/* Stores (desktop) */}
            <button
              className="hidden lg:flex items-center gap-1.5 px-2 py-2 text-charcoal-600 hover:text-forest-800 transition-colors"
              aria-label="Stores"
            >
              <Store size={18} />
              <span className="text-xs font-medium tracking-wide">Stores</span>
            </button>

            {/* Wishlist */}
            <button
              className="p-2 text-charcoal-700 hover:text-forest-800 transition-colors relative"
              onClick={() => onNavigate('wishlist')}
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-forest-800 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              className="p-2 text-charcoal-700 hover:text-forest-800 transition-colors relative"
              onClick={() => onNavigate('cart')}
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-forest-800 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            <div ref={userMenuRef} className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 px-2 py-2 text-charcoal-700 hover:text-forest-800 transition-colors"
                  aria-label="Account"
                >
                  <div className="w-7 h-7 bg-forest-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-ivory-100 text-[11px] font-medium uppercase">
                      {displayName.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown
                    size={12}
                    className={`hidden md:block text-charcoal-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('auth')}
                  className="flex items-center gap-1.5 px-2 py-2 text-charcoal-700 hover:text-forest-800 transition-colors"
                  aria-label="Sign in"
                >
                  <LogIn size={20} />
                  <span className="hidden md:block text-xs font-medium tracking-wide">Sign In</span>
                </button>
              )}

              {user && userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-ivory-100 border border-charcoal-200/60 shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-charcoal-200/30">
                    <p className="text-charcoal-800 text-xs font-semibold truncate">
                      {user.user_metadata?.full_name || displayName}
                    </p>
                    <p className="text-charcoal-400 text-[10px] truncate mt-0.5">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setUserMenuOpen(false); onNavigate('account'); }}
                    className="w-full text-left px-4 py-2.5 text-xs tracking-wider text-charcoal-600 hover:text-forest-800 hover:bg-forest-50/60 transition-colors flex items-center gap-2"
                  >
                    <User size={13} /> My Account
                  </button>
                  <button
                    onClick={() => { setUserMenuOpen(false); onNavigate('wishlist'); }}
                    className="w-full text-left px-4 py-2.5 text-xs tracking-wider text-charcoal-600 hover:text-forest-800 hover:bg-forest-50/60 transition-colors flex items-center gap-2"
                  >
                    <Heart size={13} /> Wishlist
                  </button>
                  <div className="border-t border-charcoal-200/30 mt-1">
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

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jewellery, collections and gifts"
                className="w-full bg-ivory-200/60 border border-charcoal-200/50 pl-11 pr-10 py-2.5 text-sm text-charcoal-800 placeholder-charcoal-400 outline-none focus:border-forest-700 transition-all"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

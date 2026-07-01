import { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './pages/ProductPage';
import AuthPage from './pages/AuthPage';
import PaymentPage from './pages/PaymentPage';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import { ShoppingBag, Heart, User } from 'lucide-react';
import type { Product } from './data/products';

type Page =
  | 'home'
  | 'collections'
  | 'rings'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'wedding'
  | 'new-arrivals'
  | 'best-sellers'
  | 'sale'
  | 'our-story'
  | 'product'
  | 'wishlist'
  | 'cart'
  | 'auth'
  | 'payment'
  | 'account';

interface NavState {
  page: Page;
  params?: Record<string, string>;
}

const COLLECTION_PAGES = new Set<Page>([
  'collections', 'rings', 'necklaces', 'earrings', 'bracelets',
  'wedding', 'new-arrivals', 'best-sellers', 'sale',
]);

function AppInner() {
  const { user } = useAuth();
  const [navState, setNavState] = useState<NavState>({ page: 'home' });
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [authRedirect, setAuthRedirect] = useState<string>('home');

  const handleNavigate = useCallback((page: string, params?: Record<string, string>) => {
    /* Cart guard: not logged in → redirect to auth */
    if (page === 'cart' && !user) {
      setAuthRedirect('cart');
      setNavState({ page: 'auth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    /* After auth, go to cart or payment */
    setNavState({ page: page as Page, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user]);

  /* When auth page navigates back, check if we should go to cart */
  const handleAuthNavigate = useCallback((page: string) => {
    if (page === 'cart' || page === 'payment') {
      setNavState({ page: 'cart' });
    } else {
      setNavState({ page: page as Page });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCart((prev) => [...prev, product]);
  }, []);

  const handleToggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  }, []);

  const handleOrderComplete = useCallback(() => {
    setCart([]);
  }, []);

  const { page, params } = navState;

  /* Auth page — no navbar/footer */
  if (page === 'auth') {
    return (
      <AuthPage
        onNavigate={(p) => {
          if (p === 'home' && authRedirect === 'cart') {
            setNavState({ page: 'cart' });
          } else {
            handleAuthNavigate(p);
          }
        }}
        redirectAfter={authRedirect}
      />
    );
  }

  /* Payment page — logged-in only */
  if (page === 'payment') {
    if (!user) {
      setAuthRedirect('payment');
      setNavState({ page: 'auth' });
      return null;
    }
    return (
      <PaymentPage
        cart={cart}
        onNavigate={handleNavigate}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  const renderPage = () => {
    if (page === 'home') {
      return (
        <HomePage
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
      );
    }

    if (page === 'product' && params?.id) {
      return (
        <ProductPage
          productId={params.id}
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />
      );
    }

    if (COLLECTION_PAGES.has(page)) {
      return (
        <CollectionPage
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          initialCategory={page === 'collections' ? 'all' : page}
        />
      );
    }

    if (page === 'our-story') {
      return <OurStoryPage onNavigate={handleNavigate} />;
    }

    if (page === 'wishlist') {
      return (
        <WishlistPage
          wishlist={wishlist}
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
        />
      );
    }

    if (page === 'cart') {
      return (
        <CartPage
          cart={cart}
          setCart={setCart}
          onNavigate={handleNavigate}
          isLoggedIn={!!user}
        />
      );
    }

    if (page === 'account') {
      return <AccountPage onNavigate={handleNavigate} />;
    }

    return (
      <HomePage
        onNavigate={handleNavigate}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlist={wishlist}
      />
    );
  };

  return (
    <div className="min-h-screen bg-ivory-100">
      <Navbar
        onNavigate={handleNavigate}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        currentPage={page}
      />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

/* ── Inline pages ── */

function OurStoryPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <div className="min-h-screen bg-ivory-100 pt-28">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 text-center">
        <p className="section-label">About FLAMORA</p>
        <h1 className="font-display text-4xl md:text-5xl text-charcoal-800 font-light leading-tight mb-6">
          Designed in Australia.<br />
          <em className="italic text-forest-700">Inspired by Elegance.</em>
        </h1>
        <div className="gold-divider" />
        <div className="mt-10 space-y-6 text-charcoal-500 text-sm leading-relaxed text-left">
          <p>FLAMORA was founded in Sydney in 2019 with a singular vision: to make luxury jewellery accessible to every Australian woman. We believe that feeling extraordinary shouldn't come with an extraordinary price tag.</p>
          <p>Our designs draw deeply from Australia's natural beauty — the warm golds of a Bondi sunset, the cool clarity of morning light on the harbour, and the timeless elegance of our unique landscapes. Each piece is a love letter to the country we call home.</p>
          <p>We partner with skilled artisans who share our commitment to quality craftsmanship. Every setting is inspected by hand. Every gemstone is chosen for its brilliance. Our 18K gold vermeil is plated to a thickness that ensures your pieces will shine for years to come.</p>
          <p>Above all, FLAMORA is about the women who wear our jewellery. We design for the woman who knows her worth, who celebrates her own milestones, and who finds beauty in the everyday extraordinary.</p>
        </div>
        <div className="mt-12">
          <button onClick={() => onNavigate('collections')} className="btn-primary">Shop the Collection</button>
        </div>
      </div>
    </div>
  );
}

function AccountPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { user, signOut } = useAuth();
  if (!user) { onNavigate('auth'); return null; }
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Member';
  return (
    <div className="min-h-screen bg-ivory-100 pt-28">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-forest-800 rounded-full flex items-center justify-center">
            <span className="text-ivory-100 text-xl font-medium uppercase">{displayName.charAt(0)}</span>
          </div>
          <div>
            <h1 className="font-display text-2xl text-charcoal-800 font-medium">{displayName}</h1>
            <p className="text-charcoal-400 text-sm">{user.email}</p>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            { icon: ShoppingBag, label: 'My Orders', desc: 'Track and manage your orders', action: () => {} },
            { icon: Heart, label: 'Wishlist', desc: 'Your saved pieces', action: () => onNavigate('wishlist') },
            { icon: User, label: 'Profile Settings', desc: 'Update your details', action: () => {} },
          ].map(({ icon: Icon, label, desc, action }) => (
            <button key={label} onClick={action}
              className="flex items-center gap-4 p-5 bg-white border border-forest-800/10 hover:border-forest-700/30 text-left transition-all duration-200 group">
              <div className="w-10 h-10 bg-forest-50 flex items-center justify-center group-hover:bg-forest-800 transition-colors">
                <Icon size={18} className="text-forest-700 group-hover:text-ivory-100 transition-colors" />
              </div>
              <div>
                <p className="font-medium text-charcoal-800 text-sm">{label}</p>
                <p className="text-charcoal-400 text-xs mt-0.5">{desc}</p>
              </div>
            </button>
          ))}
          <button onClick={async () => { await signOut(); onNavigate('home'); }}
            className="flex items-center justify-center gap-2 py-3 border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors mt-2">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function WishlistPage({ wishlist, onNavigate, onAddToCart, onToggleWishlist }: {
  wishlist: string[];
  onNavigate: (p: string, params?: Record<string, string>) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
}) {
  const wishlisted = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="min-h-screen bg-ivory-100 pt-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="flex items-center gap-3 mb-10">
          <Heart size={22} className="text-forest-700" />
          <h1 className="font-display text-3xl text-charcoal-800 font-medium">My Wishlist ({wishlisted.length})</h1>
        </div>
        {wishlisted.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="text-charcoal-200 mx-auto mb-4" />
            <p className="text-charcoal-400 mb-6">Your wishlist is empty.</p>
            <button onClick={() => onNavigate('collections')} className="btn-primary">Explore Collections</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {wishlisted.map((p) => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} isWishlisted />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CartPage({ cart, setCart, onNavigate, isLoggedIn }: {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  onNavigate: (p: string) => void;
  isLoggedIn: boolean;
}) {
  const subtotal = cart.reduce((s, p) => s + p.price, 0);
  const shippingCost = subtotal >= 150 ? 0 : 9.95;
  const total = subtotal + shippingCost;
  const remaining = 150 - subtotal;

  const handleCheckout = () => {
    if (!isLoggedIn) {
      onNavigate('auth');
    } else {
      onNavigate('payment');
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 pt-28">
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-12">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={22} className="text-forest-700" />
          <h1 className="font-display text-3xl text-charcoal-800 font-medium">Shopping Cart ({cart.length})</h1>
        </div>

        {remaining > 0 && cart.length > 0 && (
          <div className="bg-forest-50 border border-forest-200/50 px-5 py-3 mb-6 text-sm text-forest-800">
            Add <span className="font-semibold text-forest-700">${remaining.toFixed(2)} AUD</span> more for free shipping!
          </div>
        )}
        {remaining <= 0 && cart.length > 0 && (
          <div className="bg-forest-50 border border-forest-700/20 px-5 py-3 mb-6 text-sm text-forest-800">
            You qualify for <span className="font-semibold">free shipping</span>!
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="text-charcoal-200 mx-auto mb-4" />
            <p className="text-charcoal-400 mb-6">Your cart is empty.</p>
            <button onClick={() => onNavigate('collections')} className="btn-primary">Continue Shopping</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white border border-forest-800/10">
                  <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-charcoal-800 text-sm font-medium">{item.name}</h3>
                    <p className="text-forest-600 text-xs tracking-wider mt-0.5">{item.material}</p>
                    <p className="text-charcoal-700 font-medium mt-2">${item.price.toLocaleString('en-AU')} AUD</p>
                  </div>
                  <button
                    onClick={() => setCart((prev) => prev.filter((_, i) => i !== idx))}
                    className="text-charcoal-300 hover:text-red-400 transition-colors text-xs self-start"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-ivory-200/60 border border-forest-800/10 p-6">
                <h3 className="font-medium text-charcoal-800 mb-5 tracking-wide">Order Summary</h3>
                <div className="space-y-3 text-sm text-charcoal-600 mb-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString('en-AU')} AUD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-forest-700 font-medium' : ''}>
                      {shippingCost === 0 ? 'FREE' : `$9.95 AUD`}
                    </span>
                  </div>
                  <div className="border-t border-forest-800/10 pt-3 flex justify-between font-semibold text-charcoal-800">
                    <span>Total</span>
                    <span>${total.toFixed(2)} AUD</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-forest-800 text-ivory-100 text-xs tracking-[0.2em] uppercase font-medium hover:bg-forest-900 transition-all duration-300 hover:shadow-lg active:scale-95 mb-3"
                >
                  {isLoggedIn ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                </button>
                {!isLoggedIn && (
                  <p className="text-center text-charcoal-400 text-xs">
                    Please sign in to complete your purchase
                  </p>
                )}
                <p className="text-center text-charcoal-400 text-xs mt-2">
                  Afterpay available at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

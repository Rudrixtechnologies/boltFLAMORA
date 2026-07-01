import { useState, useEffect } from 'react';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star, ZoomIn, ChevronDown, Truck, RefreshCw, Shield, Package } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../data/products';

interface ProductPageProps {
  productId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: string[];
}

const TABS = ['Description', 'Materials', 'Care', 'Delivery & Returns', 'Size Guide'];

export default function ProductPage({ productId, onNavigate, onAddToCart, onToggleWishlist, wishlist }: ProductPageProps) {
  const product = products.find((p) => p.id === productId) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [addedAnim, setAddedAnim] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setSelectedSize('');
    setQuantity(1);
  }, [productId]);

  const isWishlisted = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) return;
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 2000);
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const accordionItems = [
    {
      id: 'details',
      title: 'Jewellery Details',
      content: (
        <ul className="space-y-2">
          {product.details.map((d) => (
            <li key={d} className="flex items-start gap-2 text-charcoal-500 text-sm">
              <span className="w-1 h-1 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
              {d}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <ul className="space-y-2">
          {product.careInstructions.map((c) => (
            <li key={c} className="flex items-start gap-2 text-charcoal-500 text-sm">
              <span className="w-1 h-1 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'delivery',
      title: 'Delivery & Returns',
      content: (
        <div className="space-y-3 text-charcoal-500 text-sm">
          <div className="flex items-start gap-3">
            <Truck size={15} className="text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-charcoal-700 font-medium">Free Standard Shipping</p>
              <p>On all orders over $150 AUD. 3–5 business days Australia-wide.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Package size={15} className="text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-charcoal-700 font-medium">Express Delivery</p>
              <p>Available at checkout. 1–2 business days.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw size={15} className="text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-charcoal-700 font-medium">30-Day Returns</p>
              <p>Not in love? Return within 30 days for a full refund or exchange.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sizing',
      title: 'Size Guide',
      content: (
        <div className="text-charcoal-500 text-sm space-y-3">
          <p>Australian ring sizes correspond to the following inner diameters:</p>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-gold-200">
                <th className="text-left py-2 text-charcoal-700 font-medium">Size</th>
                <th className="text-left py-2 text-charcoal-700 font-medium">Inner Diameter (mm)</th>
                <th className="text-left py-2 text-charcoal-700 font-medium">Circumference (mm)</th>
              </tr>
            </thead>
            <tbody>
              {[['6', '16.5', '51.9'], ['7', '17.3', '54.4'], ['8', '18.2', '57.2'], ['9', '19.0', '59.7'], ['10', '19.8', '62.1']].map(([s, d, c]) => (
                <tr key={s} className="border-b border-gold-100">
                  <td className="py-2">{s}</td>
                  <td className="py-2">{d}</td>
                  <td className="py-2">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-charcoal-400">Complimentary ring sizing available within 30 days of purchase.</p>
        </div>
      ),
    },
  ];

  void activeTab;
  void TABS;

  return (
    <div className="min-h-screen bg-ivory-100 pt-24 md:pt-28">
      {/* Breadcrumb */}
      <div className="px-4 md:px-8 lg:px-12 py-4 border-b border-gold-200/30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal-400">
          <button onClick={() => onNavigate('home')} className="hover:text-gold-500 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate(product.category)} className="hover:text-gold-500 transition-colors capitalize">{product.category}</button>
          <span>/</span>
          <span className="text-charcoal-600">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
          {/* Image gallery */}
          <div>
            {/* Main image */}
            <div
              className="relative aspect-square overflow-hidden bg-ivory-200 cursor-zoom-in mb-4 group"
              onMouseEnter={() => setZoomed(true)}
              onMouseLeave={() => setZoomed(false)}
              onMouseMove={handleImageMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={zoomed ? {
                  transform: 'scale(2)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                } : {}}
              />
              {!zoomed && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5 text-xs text-charcoal-600">
                  <ZoomIn size={12} /> Hover to zoom
                </div>
              )}
              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2.5">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 aspect-square overflow-hidden flex-shrink-0 transition-all duration-200 ${
                    selectedImage === i ? 'ring-2 ring-gold-400 ring-offset-2' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div>
            {/* Badge & material */}
            <div className="flex items-center gap-3 mb-3">
              {product.badge && (
                <span className={`px-2.5 py-1 text-[10px] tracking-widest uppercase font-medium ${
                  product.badge === 'bestseller' ? 'bg-gold-400 text-white' :
                  product.badge === 'new' ? 'bg-charcoal-800 text-ivory-100' :
                  product.badge === 'sale' ? 'bg-red-500 text-white' :
                  'bg-charcoal-600 text-ivory-100'
                }`}>
                  {product.badge === 'bestseller' ? 'Best Seller' : product.badge === 'new' ? 'New' : product.badge === 'sale' ? 'Sale' : 'Limited'}
                </span>
              )}
              <span className="text-gold-500 text-xs tracking-[0.2em] uppercase">{product.material}</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-charcoal-800 font-medium leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-charcoal-300'} />
                ))}
              </div>
              <span className="text-charcoal-500 text-sm">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gold-200/40">
              <span className="font-display text-3xl text-charcoal-800 font-medium">
                ${product.price.toLocaleString('en-AU')}
              </span>
              {product.originalPrice && (
                <span className="text-charcoal-400 text-lg line-through">
                  ${product.originalPrice.toLocaleString('en-AU')}
                </span>
              )}
              <span className="text-charcoal-500 text-sm">AUD</span>
            </div>

            <p className="text-charcoal-500 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Gemstone */}
            {product.gemstone && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-charcoal-500 text-xs tracking-wider">Gemstone:</span>
                <span className="text-charcoal-700 text-xs font-medium">{product.gemstone}</span>
              </div>
            )}

            {/* Size selector */}
            {product.sizes && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-charcoal-700 text-sm font-medium tracking-wide">Ring Size</span>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'sizing' ? null : 'sizing')}
                    className="text-gold-500 text-xs tracking-wider hover:text-gold-600 transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-sm font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-charcoal-800 text-ivory-100'
                          : 'border border-charcoal-300 text-charcoal-600 hover:border-charcoal-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {product.sizes && !selectedSize && (
                  <p className="text-charcoal-400 text-xs mt-2">Please select a size</p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-charcoal-700 text-sm font-medium tracking-wide">Quantity</span>
              <div className="flex items-center border border-charcoal-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-charcoal-600 hover:bg-ivory-200 transition-colors"
                >
                  –
                </button>
                <span className="w-10 text-center text-charcoal-800 text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-charcoal-600 hover:bg-ivory-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart + wishlist */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!!(product.sizes && !selectedSize)}
                className={`flex-1 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  addedAnim
                    ? 'bg-gold-400 text-white'
                    : product.sizes && !selectedSize
                    ? 'bg-charcoal-300 text-charcoal-500 cursor-not-allowed'
                    : 'bg-charcoal-800 text-ivory-100 hover:bg-charcoal-900 hover:shadow-lg active:scale-95'
                }`}
              >
                <ShoppingBag size={14} />
                {addedAnim ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-14 h-14 border flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                  isWishlisted
                    ? 'border-red-400 bg-red-50 text-red-400'
                    : 'border-charcoal-300 text-charcoal-600 hover:border-red-300 hover:text-red-400'
                }`}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Afterpay notice */}
            <div className="bg-ivory-200/60 border border-gold-200/40 px-4 py-3 text-sm text-charcoal-600 mb-6">
              Or 4 payments of{' '}
              <span className="text-charcoal-800 font-semibold">
                ${(product.price / 4).toFixed(2)} AUD
              </span>{' '}
              with <span className="font-semibold text-charcoal-800">Afterpay</span>
              <span className="text-charcoal-400 text-xs ml-2">ⓘ</span>
            </div>

            {/* Trust icons */}
            <div className="flex items-center gap-5 text-charcoal-400 text-xs pb-6 border-b border-gold-200/30 mb-6">
              <span className="flex items-center gap-1.5"><Truck size={13} className="text-gold-500" /> Free over $150</span>
              <span className="flex items-center gap-1.5"><RefreshCw size={13} className="text-gold-500" /> 30-day returns</span>
              <span className="flex items-center gap-1.5"><Shield size={13} className="text-gold-500" /> SSL Secure</span>
            </div>

            {/* Accordion details */}
            <div className="space-y-0">
              {accordionItems.map((item) => (
                <div key={item.id} className="border-b border-gold-200/30">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="flex items-center justify-between w-full py-4 text-left group"
                  >
                    <span className="text-charcoal-700 text-sm font-medium tracking-wide group-hover:text-gold-600 transition-colors">
                      {item.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-charcoal-400 transition-transform duration-300 ${openAccordion === item.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openAccordion === item.id && (
                    <div className="pb-4">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <p className="section-label">You May Also Love</p>
              <h2 className="section-title">Complete the Look</h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onNavigate={onNavigate}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.includes(p.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

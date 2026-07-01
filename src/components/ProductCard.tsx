import { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

const badgeStyles: Record<string, string> = {
  new: 'bg-charcoal-800 text-ivory-100',
  bestseller: 'bg-gold-400 text-white',
  sale: 'bg-red-500 text-white',
  limited: 'bg-charcoal-600 text-ivory-100',
};

const badgeLabels: Record<string, string> = {
  new: 'New',
  bestseller: 'Best Seller',
  sale: 'Sale',
  limited: 'Limited',
};

export default function ProductCard({ product, onNavigate, onAddToCart, onToggleWishlist, isWishlisted }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => { setHovered(true); if (product.images[1]) setImageIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImageIdx(0); }}
      onClick={() => onNavigate('product', { id: product.id })}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-ivory-200 aspect-[3/4] mb-4">
        <img
          src={product.images[imageIdx]}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-105' : 'scale-100'}`}
        />

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] tracking-widest uppercase font-medium ${badgeStyles[product.badge]}`}>
            {badgeLabels[product.badge]}
          </div>
        )}

        {/* Action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            onClick={handleWishlist}
            className={`w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 ${isWishlisted ? 'text-red-400' : 'text-charcoal-600 hover:text-red-400'}`}
            aria-label="Add to wishlist"
          >
            <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('product', { id: product.id }); }}
            className="w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-md text-charcoal-600 hover:text-charcoal-900 transition-all duration-200 hover:scale-110"
            aria-label="Quick view"
          >
            <Eye size={15} />
          </button>
        </div>

        {/* Quick add overlay */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              addedAnim
                ? 'bg-gold-400 text-white'
                : 'bg-charcoal-800/95 text-ivory-100 hover:bg-charcoal-900'
            }`}
          >
            <ShoppingBag size={13} />
            {addedAnim ? 'Added!' : 'Quick Add'}
          </button>
        </div>

        {/* Image dots indicator */}
        {product.images.length > 1 && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === imageIdx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="px-0.5">
        <p className="text-gold-500 text-[10px] tracking-[0.25em] uppercase font-medium mb-1">{product.material}</p>
        <h3 className="font-serif text-charcoal-800 text-base md:text-lg font-medium leading-snug mb-2 group-hover:text-gold-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={11}
                className={star <= Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-charcoal-300'}
              />
            ))}
          </div>
          <span className="text-charcoal-400 text-xs">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-charcoal-800 text-lg font-medium">
            ${product.price.toLocaleString('en-AU')}
          </span>
          {product.originalPrice && (
            <span className="text-charcoal-400 text-sm line-through">
              ${product.originalPrice.toLocaleString('en-AU')}
            </span>
          )}
          <span className="text-charcoal-400 text-xs">AUD</span>
          {product.originalPrice && (
            <span className="text-red-500 text-xs font-medium">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

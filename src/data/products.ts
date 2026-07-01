export interface Product {
  id: string;
  name: string;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets' | 'wedding';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  badge?: 'new' | 'bestseller' | 'sale' | 'limited';
  material: string;
  gemstone?: string;
  description: string;
  details: string[];
  careInstructions: string[];
  inStock: boolean;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: 'ring-001',
    name: 'Celestine Diamond Ring',
    category: 'rings',
    price: 289,
    originalPrice: 389,
    rating: 4.9,
    reviewCount: 247,
    images: [
      'https://images.pexels.com/photos/10984987/pexels-photo-10984987.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/9428419/pexels-photo-9428419.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'bestseller',
    material: '18K Gold Vermeil',
    gemstone: 'White Topaz',
    description: 'A radiant solitaire ring that captures the brilliance of a diamond at an accessible price. Crafted in 18K gold vermeil with a stunning white topaz centre stone.',
    details: [
      '18K gold vermeil over sterling silver',
      '5mm round white topaz centre stone',
      'Available in sizes 6–10',
      'Hypoallergenic & nickel-free',
      'Handcrafted in small batches',
    ],
    careInstructions: [
      'Store in provided jewellery pouch',
      'Avoid contact with perfume and chemicals',
      'Clean with soft cloth',
      'Remove before swimming or bathing',
    ],
    inStock: true,
    sizes: ['6', '7', '8', '9', '10'],
  },
  {
    id: 'necklace-001',
    name: 'Lumière Chain Necklace',
    category: 'necklaces',
    price: 179,
    rating: 4.8,
    reviewCount: 312,
    images: [
      'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'new',
    material: '18K Gold Vermeil',
    description: 'A delicate layering necklace with a soft serpentine chain. The perfect everyday luxury piece that transitions seamlessly from day to evening.',
    details: [
      '18K gold vermeil over sterling silver',
      '45cm chain with 5cm extender',
      'Lobster clasp closure',
      'Hypoallergenic & tarnish-resistant',
    ],
    careInstructions: [
      'Store flat to avoid tangling',
      'Avoid water and perfumes',
      'Polish with soft cloth',
    ],
    inStock: true,
  },
  {
    id: 'earring-001',
    name: 'Aurore Pearl Drops',
    category: 'earrings',
    price: 149,
    rating: 4.9,
    reviewCount: 189,
    images: [
      'https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6763981/pexels-photo-6763981.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'bestseller',
    material: '18K Gold Vermeil',
    gemstone: 'Freshwater Pearl',
    description: 'Elegant drop earrings featuring freshwater pearls suspended from a slim gold bar. Effortlessly refined for any occasion.',
    details: [
      '18K gold vermeil over sterling silver',
      '8mm freshwater pearl drop',
      'Push-back butterfly closure',
      'Total length: 35mm',
    ],
    careInstructions: [
      'Wipe pearls with soft damp cloth',
      'Store separately to prevent scratching',
      'Avoid prolonged sun exposure',
    ],
    inStock: true,
  },
  {
    id: 'bracelet-001',
    name: 'Soleil Tennis Bracelet',
    category: 'bracelets',
    price: 329,
    originalPrice: 429,
    rating: 4.9,
    reviewCount: 156,
    images: [
      'https://images.pexels.com/photos/9428424/pexels-photo-9428424.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1460841/pexels-photo-1460841.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'sale',
    material: '18K Gold Vermeil',
    gemstone: 'White Zirconia',
    description: 'A timeless tennis bracelet set with brilliant white zirconia stones. Understated glamour that elevates every look.',
    details: [
      '18K gold vermeil over sterling silver',
      '4.5mm prong-set white zirconia',
      'Box clasp with safety lock',
      'Length: 18cm (adjustable)',
    ],
    careInstructions: [
      'Clean gently with jewellery cloth',
      'Store in box when not wearing',
      'Avoid harsh chemicals',
    ],
    inStock: true,
  },
  {
    id: 'ring-002',
    name: 'Eternelle Stacking Ring Set',
    category: 'rings',
    price: 199,
    rating: 4.8,
    reviewCount: 421,
    images: [
      'https://images.pexels.com/photos/9428417/pexels-photo-9428417.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/10984992/pexels-photo-10984992.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'bestseller',
    material: '18K Gold Vermeil',
    description: 'Three beautifully curated rings designed to stack. Mix and match or wear together for a coordinated yet effortless look.',
    details: [
      'Set of 3 rings — 18K gold vermeil',
      'Includes plain band, twisted band, and gem band',
      'Available sizes 6–9',
    ],
    careInstructions: [
      'Store in provided ring box',
      'Clean with polishing cloth',
    ],
    inStock: true,
    sizes: ['6', '7', '8', '9'],
  },
  {
    id: 'necklace-002',
    name: 'Étoile Star Pendant',
    category: 'necklaces',
    price: 159,
    rating: 4.7,
    reviewCount: 203,
    images: [
      'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'new',
    material: '18K Gold Vermeil',
    gemstone: 'White Topaz',
    description: 'A dainty star pendant set with sparkling white topaz. The perfect gift or self-treat for those who love understated sparkle.',
    details: [
      '18K gold vermeil over sterling silver',
      '12mm star pendant with white topaz',
      '40cm + 5cm extender chain',
    ],
    careInstructions: [
      'Keep away from moisture',
      'Store in pouch provided',
    ],
    inStock: true,
  },
  {
    id: 'wedding-001',
    name: 'Bridal Marquise Ring',
    category: 'wedding',
    price: 449,
    rating: 5.0,
    reviewCount: 87,
    images: [
      'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/9602307/pexels-photo-9602307.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'limited',
    material: '18K White Gold Vermeil',
    gemstone: 'Moissanite',
    description: 'The pinnacle of our bridal collection. A magnificent marquise-cut moissanite that rivals diamond brilliance at a fraction of the cost.',
    details: [
      '18K white gold vermeil over sterling silver',
      '8x4mm marquise moissanite',
      'Pavé accent stones on band',
      'Includes certificate of authenticity',
      'Complimentary ring sizing within 30 days',
    ],
    careInstructions: [
      'Professional clean recommended annually',
      'Store in bridal box provided',
      'Inspect prongs every 6–12 months',
    ],
    inStock: true,
    sizes: ['5', '6', '7', '8', '9'],
  },
  {
    id: 'earring-002',
    name: 'Demi Huggie Hoops',
    category: 'earrings',
    price: 129,
    rating: 4.8,
    reviewCount: 334,
    images: [
      'https://images.pexels.com/photos/6763981/pexels-photo-6763981.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    badge: 'bestseller',
    material: '18K Gold Vermeil',
    description: 'Sleek huggie hoops with a row of pavé zirconia stones. Comfortable to wear all day and versatile enough for any occasion.',
    details: [
      '18K gold vermeil over sterling silver',
      '12mm inner diameter',
      'Hinged closure for easy wear',
      'Pavé white zirconia accent',
    ],
    careInstructions: [
      'Wipe clean with soft cloth',
      'Store in earring holder',
    ],
    inStock: true,
  },
];

export const categories = [
  {
    id: 'rings',
    name: 'Rings',
    description: 'From solitaires to stacking sets',
    image: 'https://images.pexels.com/photos/10984987/pexels-photo-10984987.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 42,
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    description: 'Delicate chains & pendants',
    image: 'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 38,
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Studs, hoops & drop styles',
    image: 'https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 56,
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    description: 'Tennis, bangles & charm',
    image: 'https://images.pexels.com/photos/9428424/pexels-photo-9428424.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 29,
  },
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'Bridal & engagement collection',
    image: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=600',
    count: 24,
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sophie T.',
    location: 'Sydney, NSW',
    rating: 5,
    text: 'I ordered the Celestine ring and it arrived in the most beautiful packaging. The quality is incredible — I\'ve received so many compliments. Feels genuinely luxurious without the designer price tag.',
    product: 'Celestine Diamond Ring',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 2,
    name: 'Mia R.',
    location: 'Melbourne, VIC',
    rating: 5,
    text: 'FLAMORA has completely replaced my go-to jewellery brands. The gold vermeil is stunning and hasn\'t tarnished at all after 6 months of daily wear. Fast shipping and the packaging is gift-ready!',
    product: 'Lumière Chain Necklace',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 3,
    name: 'Amelia K.',
    location: 'Brisbane, QLD',
    rating: 5,
    text: 'Got the Aurore Pearl Drops for my 30th birthday treat and wow. The pearls are luminous and the gold is such a rich warm tone. Arrived in 2 days. Absolutely obsessed!',
    product: 'Aurore Pearl Drops',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 4,
    name: 'Charlotte W.',
    location: 'Perth, WA',
    rating: 5,
    text: 'The Bridal Marquise Ring is everything I dreamed of for my proposal. He proposed with this ring and I cried — it\'s absolutely perfect. The moissanite sparkles like crazy. Thank you FLAMORA!',
    product: 'Bridal Marquise Ring',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

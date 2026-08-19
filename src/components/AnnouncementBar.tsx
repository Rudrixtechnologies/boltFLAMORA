import { useState, useEffect } from 'react';

const messages = [
  'Complimentary Shipping Across Australia on orders over $150',
  'New Collection 2026 — Now Available',
  'Afterpay Available · 4 Interest-Free Payments',
  'Lifetime Jewellery Care on Every Piece',
];

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-forest-900 text-ivory-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center h-9">
        <p
          key={idx}
          className="text-[11px] tracking-[0.2em] uppercase font-light text-center animate-fade-in"
        >
          {messages[idx]}
        </p>
      </div>
    </div>
  );
}

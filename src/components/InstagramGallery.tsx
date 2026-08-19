import { Instagram } from 'lucide-react';

const galleryImages = [
  'https://images.pexels.com/photos/10984987/pexels-photo-10984987.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/8285483/pexels-photo-8285483.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/9428424/pexels-photo-9428424.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg?auto=compress&cs=tinysrgb&w=500',
  'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=500',
];

export default function InstagramGallery() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-ivory-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-forest-700 text-[11px] tracking-[0.3em] uppercase font-medium mb-3">
            Follow Our Journey
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal-800 font-light">
            Follow @flamora
          </h2>
          <div className="w-12 h-px bg-gold-400 mx-auto mt-5" />
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {galleryImages.map((img, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group relative aspect-square overflow-hidden bg-ivory-200"
            >
              <img
                src={img}
                alt={`FLAMORA Instagram ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                  <Instagram size={20} className="text-ivory-100" />
                  <span className="text-ivory-100 text-[10px] tracking-wider uppercase font-medium">
                    View on Instagram
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

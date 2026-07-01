import { useState } from 'react';
import { Shield, Lock, Truck, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../data/products';

interface PaymentPageProps {
  cart: Product[];
  onNavigate: (page: string) => void;
  onOrderComplete: () => void;
}

export default function PaymentPage({ cart, onNavigate, onOrderComplete }: PaymentPageProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [loading, setLoading] = useState(false);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  /* Form state */
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    country: 'Australia',
  });

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    method: 'card' as 'card' | 'afterpay' | 'applepay' | 'googlepay',
  });

  const subtotal = cart.reduce((s, p) => s + p.price, 0);
  const shipping_cost = subtotal >= 150 ? 0 : 9.95;
  const total = subtotal + shipping_cost;

  const handleShippingNext = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ['firstName', 'lastName', 'email', 'address', 'suburb', 'state', 'postcode'] as const;
    for (const k of required) {
      if (!shipping[k].trim()) { alert(`Please fill in ${k.replace(/([A-Z])/g, ' $1').toLowerCase()}`); return; }
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setStep('confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-ivory-100 pt-28 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16">
          <div className="w-20 h-20 bg-forest-800 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-gold">
            <Check size={32} className="text-ivory-100" />
          </div>
          <p className="text-forest-700 text-xs tracking-[0.3em] uppercase mb-3">Order Confirmed</p>
          <h1 className="font-display text-3xl text-charcoal-800 font-medium mb-4">
            Thank you, {shipping.firstName}!
          </h1>
          <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          <p className="text-charcoal-500 text-sm leading-relaxed mb-2">
            Your order has been placed successfully. A confirmation has been sent to{' '}
            <span className="text-charcoal-700 font-medium">{shipping.email}</span>.
          </p>
          <p className="text-charcoal-400 text-xs mb-8">
            Estimated delivery: 2–5 business days · Express available
          </p>

          {/* Order items preview */}
          <div className="bg-ivory-200/60 border border-forest-800/10 p-5 mb-8 text-left space-y-3">
            {cart.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-charcoal-700 text-xs font-medium truncate">{p.name}</p>
                  <p className="text-charcoal-400 text-xs">${p.price.toLocaleString('en-AU')} AUD</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { onOrderComplete(); onNavigate('home'); }}
              className="btn-primary text-xs"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => { onOrderComplete(); onNavigate('collections'); }}
              className="btn-outline text-xs"
            >
              View Collections
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 pt-24 md:pt-28">
      {/* Header bar */}
      <div className="bg-forest-800 border-b border-forest-700">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2">
            <svg width="20" height="26" viewBox="0 0 60 76" fill="none">
              <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
              <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#C9A96E" strokeWidth="0.7"/>
            </svg>
            <span className="font-display text-base tracking-[0.3em] text-ivory-200 font-light">FLAMORA</span>
          </button>
          <div className="flex items-center gap-2 text-ivory-300/60 text-xs">
            <Lock size={12} className="text-gold-400" />
            Secure Checkout
          </div>
        </div>
      </div>

      {/* Progress steps */}
      <div className="bg-ivory-200/50 border-b border-forest-800/10 py-3">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs">
            {(['shipping', 'payment'] as const).map((s, idx) => (
              <div key={s} className="flex items-center gap-2">
                {idx > 0 && <div className="w-8 h-px bg-charcoal-300" />}
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
                    step === s ? 'bg-forest-800 text-ivory-100' :
                    (step === 'payment' && s === 'shipping') ? 'bg-gold-400 text-white' :
                    'bg-charcoal-200 text-charcoal-500'
                  }`}>
                    {(step === 'payment' && s === 'shipping') ? <Check size={10} /> : idx + 1}
                  </div>
                  <span className={step === s ? 'text-forest-800 font-medium' : 'text-charcoal-400'}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Left — forms */}
          <div>
            {step === 'shipping' && (
              <form onSubmit={handleShippingNext}>
                <h2 className="font-display text-2xl text-charcoal-800 font-medium mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">First Name *</label>
                    <input value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                      className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="Jane" required />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Last Name *</label>
                    <input value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                      className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="Smith" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Email *</label>
                    <input type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                      className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="you@email.com" required />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Phone</label>
                    <input value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="0400 000 000" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Street Address *</label>
                  <input value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="123 Example Street" required />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Suburb *</label>
                    <input value={shipping.suburb} onChange={(e) => setShipping({ ...shipping, suburb: e.target.value })}
                      className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="Sydney" required />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">State *</label>
                    <select value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                      className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" required>
                      <option value="">Select</option>
                      {['NSW','VIC','QLD','WA','SA','TAS','NT','ACT'].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Postcode *</label>
                    <input value={shipping.postcode} onChange={(e) => setShipping({ ...shipping, postcode: e.target.value })}
                      className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="2000" required />
                  </div>
                </div>

                <div className="bg-forest-50 border border-forest-200/50 p-4 mb-6 flex items-center gap-3">
                  <Truck size={16} className="text-forest-700 flex-shrink-0" />
                  <p className="text-forest-800 text-xs">
                    {shipping_cost === 0
                      ? 'Your order qualifies for FREE standard shipping!'
                      : `Add $${(150 - subtotal).toFixed(2)} more for free shipping. Standard rate: $9.95 AUD.`}
                  </p>
                </div>

                <button type="submit" className="w-full py-4 bg-forest-800 text-ivory-100 text-xs tracking-[0.2em] uppercase font-medium hover:bg-forest-900 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg active:scale-95">
                  Continue to Payment <ChevronDown size={14} />
                </button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePlaceOrder}>
                <div className="flex items-center gap-3 mb-6">
                  <button type="button" onClick={() => setStep('shipping')} className="text-forest-700 hover:text-forest-900 transition-colors">
                    <ChevronUp size={18} />
                  </button>
                  <h2 className="font-display text-2xl text-charcoal-800 font-medium">Payment</h2>
                </div>

                {/* Payment method selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {([
                    { id: 'card', label: 'Card' },
                    { id: 'afterpay', label: 'Afterpay' },
                    { id: 'applepay', label: 'Apple Pay' },
                    { id: 'googlepay', label: 'Google Pay' },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayment({ ...payment, method: m.id })}
                      className={`py-3 px-3 border text-xs font-medium tracking-wide transition-all duration-200 ${
                        payment.method === m.id
                          ? 'border-forest-800 bg-forest-800/5 text-forest-800'
                          : 'border-charcoal-200 text-charcoal-500 hover:border-forest-600'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {payment.method === 'card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Name on Card *</label>
                      <input value={payment.nameOnCard} onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                        className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors" placeholder="Jane Smith" required />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Card Number *</label>
                      <input
                        value={payment.cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                          setPayment({ ...payment, cardNumber: v.replace(/(.{4})/g, '$1 ').trim() });
                        }}
                        className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors font-mono" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">Expiry (MM/YY) *</label>
                        <input
                          value={payment.expiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                            if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
                            setPayment({ ...payment, expiry: v });
                          }}
                          className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors font-mono" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <label className="block text-xs tracking-wider text-charcoal-500 uppercase mb-1.5">CVV *</label>
                        <input
                          value={payment.cvv}
                          onChange={(e) => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                          className="w-full border border-charcoal-200 px-3 py-2.5 text-sm text-charcoal-800 outline-none focus:border-forest-700 bg-white transition-colors font-mono" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}

                {payment.method === 'afterpay' && (
                  <div className="bg-forest-50 border border-forest-200/40 p-5 mb-6">
                    <p className="text-forest-800 text-sm font-medium mb-2">Pay with Afterpay</p>
                    <p className="text-charcoal-500 text-xs leading-relaxed">
                      4 interest-free payments of <span className="font-semibold text-charcoal-700">${(total / 4).toFixed(2)} AUD</span> every 2 weeks.
                      You will be redirected to Afterpay to complete your purchase.
                    </p>
                  </div>
                )}

                {(payment.method === 'applepay' || payment.method === 'googlepay') && (
                  <div className="bg-charcoal-800 rounded-sm p-5 mb-6 text-center">
                    <p className="text-ivory-200 text-sm">
                      {payment.method === 'applepay' ? '🍎 Apple Pay' : 'Google Pay'} — You will be prompted to authenticate on your device.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-charcoal-400 text-xs mb-6">
                  <Shield size={14} className="text-forest-700 flex-shrink-0" />
                  Your payment details are encrypted with 256-bit SSL. We never store card details.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-forest-800 text-ivory-100 text-xs tracking-[0.2em] uppercase font-medium hover:bg-forest-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 hover:shadow-lg active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                      </svg>
                      Processing Order...
                    </span>
                  ) : (
                    <>Place Order — ${total.toFixed(2)} AUD</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right — order summary */}
          <div>
            <div className="bg-forest-800 text-ivory-200">
              {/* Mobile toggle */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 lg:cursor-default"
                onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
              >
                <span className="text-xs tracking-widest uppercase font-medium">
                  Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xl font-medium">${total.toFixed(2)}</span>
                  <span className="lg:hidden">
                    {orderSummaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </div>
              </button>

              <div className={`px-5 pb-5 ${orderSummaryOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="border-t border-forest-700 pt-4 space-y-4 mb-5">
                  {cart.map((p, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="relative flex-shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover" />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold-400 text-white text-[10px] rounded-full flex items-center justify-center">1</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-ivory-200 text-xs font-medium leading-snug">{p.name}</p>
                        <p className="text-forest-300/60 text-[10px] mt-0.5">{p.material}</p>
                      </div>
                      <p className="text-ivory-200 text-sm font-medium flex-shrink-0">${p.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-forest-700 pt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-forest-200/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)} AUD</span>
                  </div>
                  <div className="flex justify-between text-forest-200/70">
                    <span>Shipping</span>
                    <span className={shipping_cost === 0 ? 'text-gold-400' : ''}>
                      {shipping_cost === 0 ? 'FREE' : `$${shipping_cost.toFixed(2)} AUD`}
                    </span>
                  </div>
                  <div className="flex justify-between text-ivory-100 font-semibold border-t border-forest-700 pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)} AUD</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-forest-700 pt-4 space-y-2">
                  {[
                    { icon: Shield, text: 'Secure SSL payment' },
                    { icon: Truck, text: shipping_cost === 0 ? 'Free shipping applied' : 'Standard 2–5 day delivery' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-forest-200/60 text-xs">
                      <Icon size={12} className="text-gold-400 flex-shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

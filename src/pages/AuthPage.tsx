import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function FlamoraLogo({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.33} viewBox="0 0 60 76" fill="none">
      <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
      <path d="M30 2L54 18M54 18L54 54M54 54L30 74M30 74L6 54M6 54L6 18M6 18L30 2" stroke="#C9A96E" strokeWidth="1.5"/>
      <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#C9A96E" strokeWidth="0.6" opacity="0.5"/>
      <ellipse cx="30" cy="38" rx="12" ry="16" stroke="#C9A96E" strokeWidth="0.8" fill="none" opacity="0.55"/>
    </svg>
  );
}

interface AuthPageProps {
  onNavigate: (page: string) => void;
  redirectAfter?: string;
}

type AuthMode = 'signin' | 'signup';

export default function AuthPage({ onNavigate, redirectAfter }: AuthPageProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setConfirmPassword('');
    setError(null);
    setSuccessMsg(null);
  };

  const switchMode = (m: AuthMode) => {
    setMode(m);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (mode === 'signup') {
      if (!fullName.trim()) { setError('Please enter your full name.'); return; }
      if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
      if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error: err } = await signIn(email, password);
        if (err) { setError(err); return; }
        onNavigate(redirectAfter || 'home');
      } else {
        const { error: err } = await signUp(email, password, fullName);
        if (err) { setError(err); return; }
        setSuccessMsg('Account created! You are now signed in.');
        setTimeout(() => onNavigate(redirectAfter || 'home'), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — forest green brand side */}
      <div className="hidden lg:flex lg:w-1/2 auth-pattern flex-col items-center justify-center px-12 relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-16 left-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)' }} />
        <div className="absolute bottom-20 right-12 w-32 h-32 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #C9A96E, transparent)' }} />

        {/* Floating diamond */}
        <div className="absolute top-1/3 right-8 opacity-15 animate-float-delayed">
          <svg width="80" height="105" viewBox="0 0 60 76" fill="none">
            <path d="M30 2L54 18L54 54L30 74L6 54L6 18L30 2Z" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
            <path d="M30 2L30 74M6 18L54 54M54 18L6 54" stroke="#C9A96E" strokeWidth="0.7"/>
            <ellipse cx="30" cy="38" rx="12" ry="16" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.6"/>
          </svg>
        </div>

        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <FlamoraLogo size={100} />
          </div>

          <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
          <h2 className="font-display text-3xl text-ivory-200 font-light leading-tight mb-4">
            Designed in Australia.
            <br />
            <em className="italic text-gold-400">Inspired by Elegance.</em>
          </h2>
          <p className="text-forest-200/60 text-sm leading-relaxed max-w-xs mx-auto">
            Join thousands of Australian women who wear FLAMORA every day.
          </p>

          {/* Trust markers */}
          <div className="mt-10 space-y-3">
            {[
              '18K Gold Vermeil — crafted to last',
              'Free shipping over $150 AUD',
              'Easy 30-day returns',
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 text-forest-200/70 text-xs">
                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-ivory-100 min-h-screen">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <FlamoraLogo size={60} />
          </div>

          {/* Back link */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-forest-700 text-xs tracking-wider uppercase mb-8 hover:text-forest-900 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Store
          </button>

          {/* Title */}
          <div className="mb-8">
            <p className="text-forest-700 text-xs tracking-[0.3em] uppercase font-medium mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-charcoal-800 font-medium">
              {mode === 'signin' ? 'Sign In' : 'Join FLAMORA'}
            </h1>
            <div className="w-12 h-px bg-gold-400 mt-4" />
          </div>

          {/* Mode tabs */}
          <div className="flex border border-forest-800/20 mb-8">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 text-xs tracking-widest uppercase font-medium transition-all duration-200 ${
                  mode === m
                    ? 'bg-forest-800 text-ivory-100'
                    : 'text-charcoal-500 hover:text-forest-800'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Error / success */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-5 px-4 py-3 bg-forest-50 border border-forest-200 text-forest-800 text-sm rounded-sm">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-charcoal-600 text-xs tracking-wider uppercase mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-charcoal-200 bg-white px-4 py-3 text-charcoal-800 text-sm placeholder-charcoal-300 outline-none focus:border-forest-700 transition-colors"
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label className="block text-charcoal-600 text-xs tracking-wider uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full border border-charcoal-200 bg-white px-4 py-3 text-charcoal-800 text-sm placeholder-charcoal-300 outline-none focus:border-forest-700 transition-colors"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-charcoal-600 text-xs tracking-wider uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Your password'}
                  className="w-full border border-charcoal-200 bg-white px-4 py-3 pr-11 text-charcoal-800 text-sm placeholder-charcoal-300 outline-none focus:border-forest-700 transition-colors"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-charcoal-600 text-xs tracking-wider uppercase mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full border border-charcoal-200 bg-white px-4 py-3 pr-11 text-charcoal-800 text-sm placeholder-charcoal-300 outline-none focus:border-forest-700 transition-colors"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 transition-colors"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signin' && (
              <div className="text-right">
                <button type="button" className="text-forest-700 text-xs hover:text-forest-900 transition-colors tracking-wide">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-forest-800 text-ivory-100 text-xs tracking-[0.2em] uppercase font-medium hover:bg-forest-900 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg active:scale-95"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
                  </svg>
                  {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                </span>
              ) : (
                <>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-charcoal-400 text-sm mt-6">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-forest-700 font-medium hover:text-forest-900 transition-colors"
            >
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>

          {/* Privacy note */}
          <p className="text-charcoal-300 text-[10px] text-center mt-8 leading-relaxed">
            By continuing you agree to our Terms of Service and Privacy Policy.
            <br />Your data is protected with 256-bit SSL encryption.
          </p>
        </div>
      </div>
    </div>
  );
}

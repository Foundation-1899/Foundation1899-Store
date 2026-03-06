'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

import PackageCard from '../../redm/components/PackageCard';
import CartDrawer from '../../redm/components/CartDrawer';

interface TebexPackage {
  id: number;
  name: string;
  description: string;
  image: string | null;
  type: string;
  category: { id: number; name: string };
  base_price: number;
  sales_tax: number;
  total_price: number;
  currency: string;
  discount: number;
  disable_quantity: boolean;
}

interface TebexCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  packages: TebexPackage[];
  order: number;
}

interface BasketPackage {
  id: number;
  name: string;
  qty: number;
  base_price: number;
  total_price: number;
  currency: string;
}

interface Basket {
  ident: string;
  base_price: number;
  sales_tax: number;
  total_price: number;
  currency: string;
  packages: BasketPackage[];
  coupons: { coupon_code: string }[];
  creator_code: string;
  links: { checkout: string };
}

const SITE_URL = 'https://foundation8211.builtwithrocket.new';

function SkeletonCard() {
  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid rgba(201,168,76,0.08)' }}
    >
      <div className="h-44 animate-pulse" style={{ background: 'rgba(201,168,76,0.05)' }} />
      <div className="p-5 space-y-3">
        <div className="h-4 rounded animate-pulse" style={{ background: 'rgba(201,168,76,0.06)', width: '70%' }} />
        <div className="h-3 rounded animate-pulse" style={{ background: 'rgba(201,168,76,0.04)', width: '90%' }} />
        <div className="h-3 rounded animate-pulse" style={{ background: 'rgba(201,168,76,0.04)', width: '60%' }} />
        <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <div className="h-5 w-16 rounded animate-pulse" style={{ background: 'rgba(201,168,76,0.08)' }} />
          <div className="h-8 w-24 rounded animate-pulse" style={{ background: 'rgba(201,168,76,0.06)' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Coming Soon Overlay ──────────────────────────────────────────────────────
function ComingSoonOverlay() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
      style={{
        background: 'rgba(8,6,4,0.97)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-12 h-12 opacity-30" style={{ borderTop: '1px solid var(--gold-primary)', borderLeft: '1px solid var(--gold-primary)' }} />
      <div className="absolute top-8 right-8 w-12 h-12 opacity-30" style={{ borderTop: '1px solid var(--gold-primary)', borderRight: '1px solid var(--gold-primary)' }} />
      <div className="absolute bottom-8 left-8 w-12 h-12 opacity-30" style={{ borderBottom: '1px solid var(--gold-primary)', borderLeft: '1px solid var(--gold-primary)' }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 opacity-30" style={{ borderBottom: '1px solid var(--gold-primary)', borderRight: '1px solid var(--gold-primary)' }} />

      <div className="relative z-10 text-center max-w-2xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="h-px w-12" style={{ background: 'var(--gold-dim)' }} />
          <span
            className="font-mono text-[0.55rem] tracking-[0.5em] uppercase px-3 py-1"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'var(--gold-dim)',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            Foundation 1899
          </span>
          <div className="h-px w-12" style={{ background: 'var(--gold-dim)' }} />
        </div>

        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full"
            style={{
              border: '1px solid rgba(201,168,76,0.25)',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.5" />
              <path d="M18 8 L26 13 L26 23 L18 28 L10 23 L10 13 Z" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
              <circle cx="18" cy="18" r="3" fill="#C9A84C" fillOpacity="0.6" />
              <path d="M18 12 L18 15M18 21 L18 24" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="font-display text-5xl md:text-6xl lg:text-7xl font-700 mb-4"
          style={{ color: 'var(--text-primary)', lineHeight: 1.05 }}
        >
          FiveM Store
        </h1>
        <h2
          className="font-display text-3xl md:text-4xl font-400 mb-8"
          style={{ color: 'var(--gold-primary)', lineHeight: 1.1 }}
        >
          Coming Soon
        </h2>

        {/* Ornamental divider */}
        <div className="flex items-center gap-4 justify-center mb-8">
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4))' }} />
          <span className="font-mono text-[0.65rem] tracking-[0.3em]" style={{ color: 'var(--gold-dim)' }}>✦ ✦ ✦</span>
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.4))' }} />
        </div>

        {/* Tagline */}
        <p
          className="font-sans text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          Premium FiveM scripts forged in the spirit of the frontier. Our FiveM emporium is being
          prepared — return soon for the grand opening.
        </p>

        {/* Bottom ornament */}
        <div
          className="inline-block px-8 py-3"
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'rgba(201,168,76,0.04)',
          }}
        >
          <p className="font-mono text-[0.6rem] tracking-[0.4em] uppercase" style={{ color: 'var(--gold-dim)' }}>
            Est. 1899 · Scripts for the Modern Frontier
          </p>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <a
            href="/redm"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Visit RedM Store
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Order Status Banner ──────────────────────────────────────────────────────
function OrderStatusBanner({
  status,
  basket,
  onDismiss,
}: {
  status: 'complete' | 'cancelled';
  basket: Basket | null;
  onDismiss: () => void;
}) {
  const isComplete = status === 'complete';

  return (
    <div
      className="px-6 py-8"
      style={{
        background: isComplete ? 'rgba(110,175,122,0.06)' : 'rgba(196,122,90,0.06)',
        borderTop: `1px solid ${isComplete ? 'rgba(110,175,122,0.25)' : 'rgba(196,122,90,0.25)'}`,
        borderBottom: `1px solid ${isComplete ? 'rgba(110,175,122,0.25)' : 'rgba(196,122,90,0.25)'}`,
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {isComplete ? (
          <>
            {/* Gold checkmark */}
            <div className="flex justify-center mb-4">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full"
                style={{
                  border: '1px solid rgba(110,175,122,0.4)',
                  background: 'rgba(110,175,122,0.08)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="#6EAF7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#6EAF7A' }}>
              Order Confirmed
            </h2>
            <div className="divider-gold max-w-xs mx-auto my-4">
              <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'var(--gold-dim)' }}>✦</span>
            </div>

            {/* Order summary from basket if available */}
            {basket && basket.packages?.length > 0 && (
              <div
                className="mb-6 p-4 rounded-sm text-left max-w-sm mx-auto"
                style={{
                  background: 'rgba(110,175,122,0.05)',
                  border: '1px solid rgba(110,175,122,0.15)',
                }}
              >
                <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>Order Summary</p>
                {basket.packages.map((pkg) => (
                  <div key={pkg.id} className="flex justify-between items-center py-1.5" style={{ borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                    <span className="font-sans text-xs" style={{ color: 'var(--text-primary)' }}>{pkg.name}</span>
                    <span className="font-mono text-xs" style={{ color: 'var(--gold-primary)' }}>${(pkg.total_price ?? pkg.base_price).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 mt-1">
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase font-600" style={{ color: 'var(--gold-primary)' }}>Total</span>
                  <span className="font-mono text-sm font-600" style={{ color: 'var(--gold-primary)' }}>${basket.total_price?.toFixed(2)} {basket.currency}</span>
                </div>
              </div>
            )}

            <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>
              Your script will be delivered to your Tebex account.
            </p>
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              Join our{' '}
              <a href="https://discord.gg/foundation1899" className="underline" style={{ color: 'var(--gold-primary)' }}>Discord</a>
              {' '}for setup support and updates.
            </p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full"
                style={{
                  border: '1px solid rgba(196,122,90,0.4)',
                  background: 'rgba(196,122,90,0.08)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 3l16 16M19 3L3 19" stroke="#C47A5A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#C47A5A' }}>
              Checkout Cancelled
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              No worries — your cart has been preserved. Return to the store whenever you&apos;re ready.
            </p>
          </>
        )}

        <button
          onClick={onDismiss}
          className="font-sans text-[0.65rem] font-600 tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300"
          style={{
            background: 'transparent',
            border: '1px solid var(--border-gold-bright)',
            color: 'var(--gold-primary)',
            borderRadius: '2px',
          }}
        >
          {isComplete ? 'Continue Shopping' : 'Return to Store'}
        </button>
      </div>
    </div>
  );
}

// ─── Main FiveM Store Component ───────────────────────────────────────────────
export default function FiveMStore() {
  const [categories, setCategories] = useState<TebexCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [basket, setBasket] = useState<Basket | null>(null);
  const [basketIdent, setBasketIdent] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'complete' | 'cancelled' | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect order query param
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const order = params.get('order');
      if (order === 'complete' || order === 'cancelled') {
        setOrderStatus(order);
      }
    }
  }, []);

  const dismissOrderStatus = useCallback(() => {
    setOrderStatus(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('order');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/tebex-fivem/categories');
        if (!res.ok) {
          const data = await res.json();
          if (res.status === 503) {
            setError('store_not_configured');
          } else {
            setError(data.error || 'Failed to load store');
          }
          return;
        }
        const data = await res.json();
        const cats: TebexCategory[] = data.data || [];
        setCategories(cats);
      } catch {
        setError('Failed to connect to store');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories, activeCategory]);

  const getOrCreateBasket = useCallback(async (): Promise<string> => {
    if (basketIdent) return basketIdent;
    const res = await fetch('/api/tebex-fivem/baskets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        complete_url: `${SITE_URL}/fivem?order=complete`,
        cancel_url: `${SITE_URL}/fivem?order=cancelled`,
        complete_auto_redirect: true,
      }),
    });
    if (!res.ok) throw new Error('Failed to create basket');
    const data = await res.json();
    const ident = data.data.ident;
    setBasketIdent(ident);
    setBasket(data.data);
    return ident;
  }, [basketIdent]);

  const handleAddToCart = useCallback(
    async (pkg: TebexPackage) => {
      setCartLoading(true);
      try {
        const ident = await getOrCreateBasket();
        const res = await fetch(`/api/tebex-fivem/baskets/${ident}/packages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ package_id: pkg.id, quantity: 1 }),
        });
        if (!res.ok) throw new Error('Failed to add package');
        const data = await res.json();
        setBasket(data);
        setCartOpen(true);
      } finally {
        setCartLoading(false);
      }
    },
    [getOrCreateBasket]
  );

  const handleRemovePackage = useCallback(
    async (packageId: number) => {
      if (!basketIdent) return;
      const res = await fetch(`/api/tebex-fivem/baskets/${basketIdent}/packages/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package_id: packageId }),
      });
      if (!res.ok) throw new Error('Failed to remove package');
      const data = await res.json();
      setBasket(data);
    },
    [basketIdent]
  );

  const handleApplyCoupon = useCallback(
    async (code: string) => {
      if (!basketIdent) throw new Error('No basket');
      const res = await fetch(`/api/tebex-fivem/baskets/${basketIdent}/coupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coupon_code: code }),
      });
      if (!res.ok) throw new Error('Invalid coupon');
      const data = await res.json();
      setBasket(data.data);
    },
    [basketIdent]
  );

  const handleApplyCreatorCode = useCallback(
    async (code: string) => {
      if (!basketIdent) throw new Error('No basket');
      const res = await fetch(`/api/tebex-fivem/baskets/${basketIdent}/creator-codes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creator_code: code }),
      });
      if (!res.ok) throw new Error('Invalid creator code');
      const data = await res.json();
      setBasket(data.data);
    },
    [basketIdent]
  );

  const handleCheckout = useCallback(async () => {
    if (!basket?.links?.checkout) return;
    window.location.href = basket.links.checkout;
  }, [basket]);

  const allPackages = categories.flatMap((c) => c.packages || []);
  const uniquePackages = allPackages.filter(
    (pkg, idx, self) => self.findIndex((p) => p.id === pkg.id) === idx
  );
  const displayPackages =
    activeCategory === null
      ? uniquePackages
      : categories.find((c) => c.id === activeCategory)?.packages || [];

  const cartItemCount = basket?.packages?.reduce((sum, p) => sum + (p.qty || 1), 0) ?? 0;
  const cartPackageIds = new Set(basket?.packages?.map((p) => p.id) ?? []);

  return (
    <div ref={sectionRef}>
      {/* Coming Soon Overlay — remove this component to activate the store */}
      <ComingSoonOverlay />

      {/* ── Underlying store (hidden behind overlay) ── */}
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 px-6 overflow-hidden"
        style={{ background: 'var(--bg-obsidian)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="absolute top-8 left-8 w-10 h-10 opacity-20" style={{ borderTop: '1px solid var(--gold-primary)', borderLeft: '1px solid var(--gold-primary)' }} />
        <div className="absolute top-8 right-8 w-10 h-10 opacity-20" style={{ borderTop: '1px solid var(--gold-primary)', borderRight: '1px solid var(--gold-primary)' }} />

        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-[0.6rem] tracking-[0.5em] uppercase mb-4 reveal-on-scroll" style={{ color: 'var(--gold-dim)' }}>
            Foundation 1899 · FiveM Store
          </p>
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-700 mb-5 reveal-on-scroll"
            style={{ color: 'var(--text-primary)', lineHeight: 1.05 }}
          >
            The Script
            <br />
            <span className="text-gold-gradient">Emporium</span>
          </h1>
          <div className="divider-gold max-w-xs mx-auto my-6 reveal-on-scroll">
            <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'var(--gold-dim)' }}>✦</span>
          </div>
          <p
            className="font-sans text-base max-w-xl mx-auto reveal-on-scroll"
            style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}
          >
            Premium FiveM scripts crafted for immersive roleplay. Browse, add to cart, and
            checkout securely through Tebex.
          </p>
        </div>
      </section>

      {/* Order status banner */}
      {orderStatus && (
        <OrderStatusBanner
          status={orderStatus}
          basket={basket}
          onDismiss={dismissOrderStatus}
        />
      )}

      {/* Main store content */}
      <section className="py-12 px-6" style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-7xl mx-auto">
          {error === 'store_not_configured' && (
            <div
              className="max-w-xl mx-auto text-center py-20 px-8 rounded-sm"
              style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <h2 className="font-display text-2xl font-700 mb-3" style={{ color: 'var(--text-primary)' }}>Store Not Configured</h2>
              <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                Add your{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold-primary)' }}>TEBEX_FIVEM_TOKEN</code>
                {' '}environment variable to connect your FiveM store.
              </p>
            </div>
          )}

          {error && error !== 'store_not_configured' && (
            <div className="text-center py-20">
              <p className="font-display text-xl" style={{ color: 'var(--text-muted)' }}>Unable to load store</p>
              <p className="font-mono text-xs tracking-widest uppercase mt-2" style={{ color: 'var(--text-dim)' }}>{error}</p>
            </div>
          )}

          {loading && !error && (
            <>
              <div className="flex gap-3 justify-center mb-12">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-24 rounded-sm animate-pulse" style={{ background: 'rgba(201,168,76,0.06)' }} />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
              </div>
            </>
          )}

          {!loading && !error && (
            <>
              <div className="flex flex-wrap gap-3 justify-center mb-12 reveal-on-scroll">
                <button onClick={() => setActiveCategory(null)} className={`filter-tab ${activeCategory === null ? 'active' : ''}`}>All Scripts</button>
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}>{cat.name}</button>
                ))}
              </div>

              <div className="flex items-center justify-between mb-8 reveal-on-scroll">
                <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  {displayPackages.length} Script{displayPackages.length !== 1 ? 's' : ''}
                  {activeCategory !== null ? ` · ${categories.find((c) => c.id === activeCategory)?.name}` : ' · All Categories'}
                </p>
                <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: 'var(--text-dim)' }}>Lifetime updates included</span>
              </div>

              {displayPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayPackages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} onAddToCart={handleAddToCart} inCart={cartPackageIds.has(pkg.id)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <p className="font-display text-xl" style={{ color: 'var(--text-muted)' }}>No scripts in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {!loading && !error && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 z-30 flex items-center gap-3 px-5 py-3.5 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #1A1410 0%, #221B12 100%)',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '2px',
            boxShadow: cartItemCount > 0 ? '0 0 30px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.4)',
          }}
          aria-label="Open cart"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="5" width="14" height="11" rx="1" stroke="#C9A84C" strokeWidth="1.2" />
            <path d="M6 5V4a3 3 0 016 0v1" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: 'var(--gold-primary)' }}>Cart</span>
          {cartItemCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 font-mono text-[0.6rem] font-600 rounded-full" style={{ background: 'var(--gold-primary)', color: '#0D0B08' }}>
              {cartItemCount}
            </span>
          )}
        </button>
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        basket={basket}
        onRemovePackage={handleRemovePackage}
        onApplyCoupon={handleApplyCoupon}
        onApplyCreatorCode={handleApplyCreatorCode}
        onCheckout={handleCheckout}
        isLoading={cartLoading}
      />
    </div>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PackageCard from './PackageCard';
import CartDrawer from './CartDrawer';

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
  created_at?: string;
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

type SortOption = 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest';

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
            <div className="flex justify-center mb-4">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full"
                style={{ border: '1px solid rgba(110,175,122,0.4)', background: 'rgba(110,175,122,0.08)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l16 16M19 3L3 19" stroke="#6EAF7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#6EAF7A' }}>Order Confirmed</h2>
            <div className="divider-gold max-w-xs mx-auto my-4">
              <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'var(--gold-dim)' }}>✦</span>
            </div>
            {basket && basket.packages?.length > 0 && (
              <div
                className="mb-6 p-4 rounded-sm text-left max-w-sm mx-auto"
                style={{ background: 'rgba(110,175,122,0.05)', border: '1px solid rgba(110,175,122,0.15)' }}
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
            <p className="font-sans text-sm leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>Your script will be delivered to your Tebex account.</p>
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
                style={{ border: '1px solid rgba(196,122,90,0.4)', background: 'rgba(196,122,90,0.08)' }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 3l16 16M19 3L3 19" stroke="#C47A5A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <h2 className="font-display text-2xl font-700 mb-2" style={{ color: '#C47A5A' }}>Checkout Cancelled</h2>
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              No worries — your cart has been preserved. Return to the store whenever you&apos;re ready.
            </p>
          </>
        )}
        <button
          onClick={onDismiss}
          className="font-sans text-[0.65rem] font-600 tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300"
          style={{ background: 'transparent', border: '1px solid var(--border-gold-bright)', color: 'var(--gold-primary)', borderRadius: '2px' }}
        >
          {isComplete ? 'Continue Shopping' : 'Return to Store'}
        </button>
      </div>
    </div>
  );
}

export default function RedMStore() {
  const [categories, setCategories] = useState<TebexCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [basket, setBasket] = useState<Basket | null>(null);
  const [basketIdent, setBasketIdent] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

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

  // Fetch categories + packages
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/tebex/categories');
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
        if (cats.length > 0) setActiveCategory(null);
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
    const res = await fetch('/api/tebex/baskets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        complete_url: `${SITE_URL}/redm?order=complete`,
        cancel_url: `${SITE_URL}/redm?order=cancelled`,
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

  const refreshBasket = useCallback(async (ident: string) => {
    const res = await fetch(`/api/tebex/baskets/${ident}`);
    if (!res.ok) return;
    const data = await res.json();
    setBasket(data.data);
  }, []);

  const handleAddToCart = useCallback(
    async (pkg: TebexPackage) => {
      setCartLoading(true);
      try {
        const ident = await getOrCreateBasket();
        const res = await fetch(`/api/tebex/baskets/${ident}/packages`, {
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
      const res = await fetch(`/api/tebex/baskets/${basketIdent}/packages/remove`, {
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
      const res = await fetch(`/api/tebex/baskets/${basketIdent}/coupons`, {
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
      const res = await fetch(`/api/tebex/baskets/${basketIdent}/creator-codes`, {
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

  // Base packages for active category (persists across filter changes)
  const categoryPackages = useMemo(() => {
    const allPackages = categories.flatMap((c) => c.packages || []);
    const uniquePackages = allPackages.filter(
      (pkg, idx, self) => self.findIndex((p) => p.id === pkg.id) === idx
    );
    return activeCategory === null
      ? uniquePackages
      : categories.find((c) => c.id === activeCategory)?.packages || [];
  }, [categories, activeCategory]);

  // Apply search + price filter + sort
  const displayPackages = useMemo(() => {
    let filtered = [...categoryPackages];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(q) ||
          (pkg.description || '').toLowerCase().includes(q)
      );
    }

    // Price range filter
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) filtered = filtered.filter((pkg) => pkg.base_price >= min);
    if (!isNaN(max)) filtered = filtered.filter((pkg) => pkg.base_price <= max);

    // Sort
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price_asc': return a.base_price - b.base_price;
        case 'price_desc': return b.base_price - a.base_price;
        case 'name_asc': return a.name.localeCompare(b.name);
        case 'name_desc': return b.name.localeCompare(a.name);
        case 'newest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        default: return 0;
      }
    });

    return filtered;
  }, [categoryPackages, searchQuery, minPrice, maxPrice, sortOption]);

  const cartItemCount = basket?.packages?.reduce((sum, p) => sum + (p.qty || 1), 0) ?? 0;
  const cartPackageIds = new Set(basket?.packages?.map((p) => p.id) ?? []);

  const hasActiveFilters = searchQuery.trim() || minPrice || maxPrice;

  return (
    <div ref={sectionRef}>
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
          <p
            className="font-mono text-[0.6rem] tracking-[0.5em] uppercase mb-4 reveal-on-scroll"
            style={{ color: 'var(--gold-dim)' }}
          >
            Foundation 1899 · RedM Store
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
            Premium RedM scripts crafted for immersive roleplay. Browse, add to cart, and
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
      <section
        className="py-12 px-6"
        style={{ background: 'var(--bg-dark)' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Error: not configured */}
          {error === 'store_not_configured' && (
            <div
              className="max-w-xl mx-auto text-center py-20 px-8 rounded-sm"
              style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <div className="mb-6 opacity-40">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto">
                  <circle cx="24" cy="24" r="23" stroke="#C9A84C" strokeWidth="1" />
                  <path d="M24 14v14M24 34v2" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-700 mb-3" style={{ color: 'var(--text-primary)' }}>Store Not Configured</h2>
              <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                The Tebex store token hasn&apos;t been set up yet. Add your{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold-primary)' }}>TEBEX_TOKEN</code>
                {' '}environment variable to connect your store.
              </p>
              <div className="font-mono text-xs px-4 py-3 rounded-sm text-left" style={{ background: 'rgba(13,11,8,0.8)', border: '1px solid rgba(201,168,76,0.15)', color: 'var(--gold-dim)' }}>
                TEBEX_TOKEN=t66x-your-token-here
              </div>
            </div>
          )}

          {/* Generic error */}
          {error && error !== 'store_not_configured' && (
            <div className="text-center py-20">
              <p className="font-display text-xl" style={{ color: 'var(--text-muted)' }}>Unable to load store</p>
              <p className="font-mono text-xs tracking-widest uppercase mt-2" style={{ color: 'var(--text-dim)' }}>{error}</p>
            </div>
          )}

          {/* Loading skeletons */}
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

          {/* Store content */}
          {!loading && !error && (
            <>
              {/* Category tabs */}
              <div className="flex flex-wrap gap-3 justify-center mb-8 reveal-on-scroll">
                <button onClick={() => setActiveCategory(null)} className={`filter-tab ${activeCategory === null ? 'active' : ''}`}>All Scripts</button>
                {categories.map((cat) => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}>{cat.name}</button>
                ))}
              </div>

              {/* ── Search & Filter Bar ── */}
              <div
                className="mb-10 p-5 rounded-sm reveal-on-scroll"
                style={{
                  background: 'rgba(201,168,76,0.03)',
                  border: '1px solid rgba(201,168,76,0.12)',
                }}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--gold-dim)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M10 10l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search scripts..."
                      className="w-full bg-transparent pl-9 pr-4 py-2.5 font-sans text-sm outline-none"
                      style={{
                        border: '1px solid rgba(201,168,76,0.2)',
                        color: 'var(--text-primary)',
                        borderRadius: '2px',
                      }}
                    />
                  </div>

                  {/* Price range */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min $"
                      min="0"
                      className="w-24 bg-transparent px-3 py-2.5 font-mono text-xs outline-none"
                      style={{
                        border: '1px solid rgba(201,168,76,0.2)',
                        color: 'var(--text-primary)',
                        borderRadius: '2px',
                      }}
                    />
                    <span className="font-mono text-[0.6rem]" style={{ color: 'var(--text-dim)' }}>—</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max $"
                      min="0"
                      className="w-24 bg-transparent px-3 py-2.5 font-mono text-xs outline-none"
                      style={{
                        border: '1px solid rgba(201,168,76,0.2)',
                        color: 'var(--text-primary)',
                        borderRadius: '2px',
                      }}
                    />
                  </div>

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as SortOption)}
                      className="appearance-none bg-transparent pl-3 pr-8 py-2.5 font-mono text-xs outline-none cursor-pointer"
                      style={{
                        border: '1px solid rgba(201,168,76,0.2)',
                        color: 'var(--gold-primary)',
                        borderRadius: '2px',
                        background: 'rgba(201,168,76,0.04)',
                      }}
                    >
                      <option value="newest" style={{ background: '#110E0A' }}>Newest</option>
                      <option value="price_asc" style={{ background: '#110E0A' }}>Price: Low to High</option>
                      <option value="price_desc" style={{ background: '#110E0A' }}>Price: High to Low</option>
                      <option value="name_asc" style={{ background: '#110E0A' }}>Name: A–Z</option>
                      <option value="name_desc" style={{ background: '#110E0A' }}>Name: Z–A</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--gold-dim)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Clear filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={() => { setSearchQuery(''); setMinPrice(''); setMaxPrice(''); }}
                      className="font-mono text-[0.58rem] tracking-[0.15em] uppercase px-3 py-2.5 transition-colors duration-200"
                      style={{
                        border: '1px solid rgba(196,122,90,0.3)',
                        color: '#C47A5A',
                        borderRadius: '2px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Count row */}
              <div className="flex items-center justify-between mb-8 reveal-on-scroll">
                <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  {displayPackages.length} Script{displayPackages.length !== 1 ? 's' : ''}
                  {activeCategory !== null ? ` · ${categories.find((c) => c.id === activeCategory)?.name}` : ' · All Categories'}
                  {hasActiveFilters ? ' · Filtered' : ''}
                </p>
                <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: 'var(--text-dim)' }}>Lifetime updates included</span>
              </div>

              {/* Package grid */}
              {displayPackages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayPackages.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} onAddToCart={handleAddToCart} inCart={cartPackageIds.has(pkg.id)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <p className="font-display text-xl" style={{ color: 'var(--text-muted)' }}>
                    {hasActiveFilters ? 'No scripts match your filters.' : 'No scripts in this category yet.'}
                  </p>
                  <p className="font-mono text-xs tracking-widest uppercase mt-2" style={{ color: 'var(--text-dim)' }}>
                    {hasActiveFilters ? 'Try adjusting your search or price range.' : 'Check back soon — we ship updates regularly.'}
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={() => { setSearchQuery(''); setMinPrice(''); setMaxPrice(''); }}
                      className="mt-6 font-mono text-[0.6rem] tracking-[0.2em] uppercase px-5 py-2.5 transition-colors duration-200"
                      style={{ border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold-primary)', borderRadius: '2px' }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Floating cart button */}
      {!loading && !error && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 z-30 flex items-center gap-3 px-5 py-3.5 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #1A1410 0%, #221B12 100%)',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '2px',
            boxShadow: cartItemCount > 0
              ? '0 0 30px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.5)'
              : '0 4px 24px rgba(0,0,0,0.4)',
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

      {/* Cart Drawer */}
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

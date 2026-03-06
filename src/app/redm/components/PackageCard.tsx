'use client';

import { useState } from 'react';

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

interface PackageCardProps {
  pkg: TebexPackage;
  onAddToCart: (pkg: TebexPackage) => Promise<void>;
  inCart: boolean;
}

export default function PackageCard({ pkg, onAddToCart, inCart }: PackageCardProps) {
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = async () => {
    if (inCart || loading) return;
    setLoading(true);
    try {
      await onAddToCart(pkg);
    } finally {
      setLoading(false);
    }
  };

  const hasDiscount = pkg.discount > 0;
  const discountedPrice = hasDiscount ? pkg.total_price : null;

  return (
    <div
      className="script-card group flex flex-col reveal-on-scroll"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image / Placeholder */}
      <div
        className="h-44 relative overflow-hidden flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #1A1410 0%, #221B12 100%)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        {pkg.image ? (
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: 'sepia(0.3) contrast(1.1) brightness(0.85)' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="opacity-20">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="23" stroke="#C9A84C" strokeWidth="1" />
                <path d="M24 10 L34 18 L34 30 L24 38 L14 30 L14 18 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                <circle cx="24" cy="24" r="4" fill="#C9A84C" fillOpacity="0.6" />
              </svg>
            </div>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-mono text-[0.55rem] tracking-[0.15em] uppercase px-2 py-0.5"
            style={{
              background: 'rgba(13,11,8,0.85)',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'var(--gold-dim)',
            }}
          >
            {pkg.category?.name}
          </span>
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3">
            <span
              className="font-mono text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 font-600"
              style={{
                background: 'rgba(139,58,42,0.85)',
                border: '1px solid rgba(139,58,42,0.6)',
                color: '#E8A080',
              }}
            >
              -{pkg.discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-display text-lg font-700 mb-2 leading-snug"
          style={{ color: 'var(--text-primary)' }}
        >
          {pkg.name}
        </h3>

        {pkg.description && (
          <div
            className="font-sans text-sm leading-relaxed mb-4 flex-1 line-clamp-3"
            style={{ color: 'var(--text-muted)' }}
            dangerouslySetInnerHTML={{ __html: pkg.description }}
          />
        )}

        {/* Price + Button */}
        <div
          className="flex items-center justify-between pt-4 mt-auto"
          style={{ borderTop: '1px solid var(--border-gold)' }}
        >
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span
                className="font-mono text-sm line-through"
                style={{ color: 'var(--text-dim)' }}
              >
                ${pkg.base_price.toFixed(2)}
              </span>
            )}
            <span
              className="font-mono text-lg font-600"
              style={{ color: 'var(--gold-primary)' }}
            >
              ${(discountedPrice ?? pkg.base_price).toFixed(2)}
            </span>
            <span
              className="font-mono text-[0.55rem] tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-dim)' }}
            >
              {pkg.currency}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={loading || inCart}
            className="font-sans text-[0.65rem] font-600 tracking-[0.15em] uppercase px-4 py-2.5 transition-all duration-300"
            style={{
              background: inCart
                ? 'rgba(110,175,122,0.1)'
                : hovered
                ? 'linear-gradient(135deg, #C9A84C 0%, #F0C040 50%, #C9A84C 100%)'
                : 'transparent',
              border: inCart
                ? '1px solid rgba(110,175,122,0.4)'
                : '1px solid var(--border-gold-bright)',
              color: inCart ? '#6EAF7A' : hovered ? '#0D0B08' : 'var(--gold-primary)',
              borderRadius: '2px',
              cursor: inCart ? 'default' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? '...' : inCart ? '✓ In Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

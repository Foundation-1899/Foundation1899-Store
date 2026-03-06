'use client';

import { useState } from 'react';

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

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  basket: Basket | null;
  onRemovePackage: (packageId: number) => Promise<void>;
  onApplyCoupon: (code: string) => Promise<void>;
  onApplyCreatorCode: (code: string) => Promise<void>;
  onCheckout: () => void;
  isLoading: boolean;
}

export default function CartDrawer({
  isOpen,
  onClose,
  basket,
  onRemovePackage,
  onApplyCoupon,
  onApplyCreatorCode,
  onCheckout,
  isLoading,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState('');
  const [creatorInput, setCreatorInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [creatorLoading, setCreatorLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState('');
  const [creatorMsg, setCreatorMsg] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setCouponMsg('');
    try {
      await onApplyCoupon(couponInput.trim());
      setCouponMsg('Coupon applied!');
      setCouponInput('');
    } catch {
      setCouponMsg('Invalid coupon code.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleApplyCreator = async () => {
    if (!creatorInput.trim()) return;
    setCreatorLoading(true);
    setCreatorMsg('');
    try {
      await onApplyCreatorCode(creatorInput.trim());
      setCreatorMsg('Creator code applied!');
      setCreatorInput('');
    } catch {
      setCreatorMsg('Invalid creator code.');
    } finally {
      setCreatorLoading(false);
    }
  };

  const itemCount = basket?.packages?.reduce((sum, p) => sum + (p.qty || 1), 0) ?? 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.7)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: 'min(420px, 100vw)',
          background: '#110E0A',
          borderLeft: '1px solid rgba(201,168,76,0.2)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}
        >
          <div>
            <h2
              className="font-display text-xl font-700 tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Your Cart
            </h2>
            <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center transition-colors duration-200"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close cart"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Ornamental divider */}
        <div className="px-6 py-2 flex-shrink-0">
          <div className="divider-gold">
            <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: 'var(--gold-dim)' }}>✦</span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {!basket || basket.packages?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="mb-4 opacity-30">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="12" width="28" height="22" rx="2" stroke="#C9A84C" strokeWidth="1.5" />
                  <path d="M14 12V10a6 6 0 0112 0v2" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-display text-base" style={{ color: 'var(--text-muted)' }}>Your cart is empty</p>
              <p className="font-mono text-[0.6rem] tracking-widest uppercase mt-1" style={{ color: 'var(--text-dim)' }}>Add scripts to get started</p>
            </div>
          ) : (
            <div className="space-y-3 mt-2">
              {basket.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-start gap-3 p-4 rounded-sm"
                  style={{
                    background: 'rgba(201,168,76,0.04)',
                    border: '1px solid rgba(201,168,76,0.12)',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-sans text-sm font-600 leading-snug truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {pkg.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[0.6rem]" style={{ color: 'var(--text-muted)' }}>
                        Qty: {pkg.qty || 1}
                      </span>
                      <span className="font-mono text-[0.6rem]" style={{ color: 'var(--text-dim)' }}>·</span>
                      <span className="font-mono text-[0.65rem] font-600" style={{ color: 'var(--gold-primary)' }}>
                        ${(pkg.total_price ?? pkg.base_price).toFixed(2)} {pkg.currency || basket.currency}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemovePackage(pkg.id)}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors duration-200 mt-0.5"
                    style={{ color: 'var(--text-dim)' }}
                    aria-label={`Remove ${pkg.name}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Coupon Code */}
          <div className="mt-6">
            <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Coupon Code</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                placeholder="Enter coupon..."
                className="flex-1 bg-transparent px-3 py-2 font-mono text-xs outline-none"
                style={{
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'var(--text-primary)',
                  borderRadius: '2px',
                }}
              />
              <button
                onClick={handleApplyCoupon}
                disabled={couponLoading || !couponInput.trim()}
                className="px-4 py-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase transition-all duration-200"
                style={{
                  background: couponInput.trim() ? 'rgba(201,168,76,0.1)' : 'transparent',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: 'var(--gold-primary)',
                  borderRadius: '2px',
                  opacity: couponLoading ? 0.5 : 1,
                }}
              >
                {couponLoading ? '...' : 'Apply'}
              </button>
            </div>
            {couponMsg && (
              <p
                className="font-mono text-[0.58rem] mt-1"
                style={{ color: couponMsg.includes('!') ? '#6EAF7A' : '#C47A5A' }}
              >
                {couponMsg}
              </p>
            )}
          </div>

          {/* Creator Code */}
          <div className="mt-4">
            <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Creator Code</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={creatorInput}
                onChange={(e) => setCreatorInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyCreator()}
                placeholder="Enter creator code..."
                className="flex-1 bg-transparent px-3 py-2 font-mono text-xs outline-none"
                style={{
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: 'var(--text-primary)',
                  borderRadius: '2px',
                }}
              />
              <button
                onClick={handleApplyCreator}
                disabled={creatorLoading || !creatorInput.trim()}
                className="px-4 py-2 font-mono text-[0.6rem] tracking-[0.15em] uppercase transition-all duration-200"
                style={{
                  background: creatorInput.trim() ? 'rgba(201,168,76,0.1)' : 'transparent',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: 'var(--gold-primary)',
                  borderRadius: '2px',
                  opacity: creatorLoading ? 0.5 : 1,
                }}
              >
                {creatorLoading ? '...' : 'Apply'}
              </button>
            </div>
            {creatorMsg && (
              <p
                className="font-mono text-[0.58rem] mt-1"
                style={{ color: creatorMsg.includes('!') ? '#6EAF7A' : '#C47A5A' }}
              >
                {creatorMsg}
              </p>
            )}
          </div>

          {/* Applied codes */}
          {basket && (basket.coupons?.length > 0 || basket.creator_code) && (
            <div className="mt-4 space-y-1">
              {basket.coupons?.map((c) => (
                <div key={c.coupon_code} className="flex items-center gap-2">
                  <span className="font-mono text-[0.58rem]" style={{ color: '#6EAF7A' }}>✓ Coupon: {c.coupon_code}</span>
                </div>
              ))}
              {basket.creator_code && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.58rem]" style={{ color: '#6EAF7A' }}>✓ Creator: {basket.creator_code}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary + Checkout */}
        <div
          className="flex-shrink-0 px-6 py-5"
          style={{ borderTop: '1px solid rgba(201,168,76,0.15)' }}
        >
          {basket && (
            <div className="space-y-2 mb-5">
              <div className="flex justify-between">
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span className="font-mono text-[0.65rem]" style={{ color: 'var(--text-primary)' }}>
                  ${basket.base_price?.toFixed(2)} {basket.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: 'var(--text-muted)' }}>Sales Tax</span>
                <span className="font-mono text-[0.65rem]" style={{ color: 'var(--text-primary)' }}>
                  ${basket.sales_tax?.toFixed(2)} {basket.currency}
                </span>
              </div>
              <div
                className="flex justify-between pt-2"
                style={{ borderTop: '1px solid rgba(201,168,76,0.12)' }}
              >
                <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase font-600" style={{ color: 'var(--gold-primary)' }}>Total</span>
                <span className="font-mono text-sm font-600" style={{ color: 'var(--gold-primary)' }}>
                  ${basket.total_price?.toFixed(2)} {basket.currency}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={onCheckout}
            disabled={isLoading || !basket || basket.packages?.length === 0}
            className="btn-gold w-full text-xs"
            style={{
              opacity: isLoading || !basket || basket.packages?.length === 0 ? 0.5 : 1,
              cursor: isLoading || !basket || basket.packages?.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          <p className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-center mt-3" style={{ color: 'var(--text-dim)' }}>
            Secured by Tebex · RedM ToS Compliant
          </p>
        </div>
      </div>
    </>
  );
}

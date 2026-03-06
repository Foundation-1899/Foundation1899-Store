"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface StoreCardProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  active: boolean;
  badge?: string;
  icon: React.ReactNode;
  delay: number;
}

function StoreCard({ title, subtitle, description, href, active, badge, icon, delay }: StoreCardProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const isVisible = mounted && visible;
  const isHovered = mounted && hovered;

  const cardContent = (
    <div
      className={`relative group cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transitionDelay: `${delay}ms` }}
      suppressHydrationWarning
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-sm transition-all duration-500"
        style={{
          background: active && isHovered
            ? "linear-gradient(135deg, rgba(201,168,76,0.4) 0%, rgba(240,192,64,0.2) 50%, rgba(201,168,76,0.4) 100%)"
            : "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, transparent 50%, rgba(201,168,76,0.15) 100%)",
          opacity: active ? 1 : 0.4,
        }}
        suppressHydrationWarning
      />

      <div
        className="relative rounded-sm p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500"
        style={{
          background: active
            ? isHovered
              ? "linear-gradient(160deg, #221B12 0%, #1A1410 60%, #110E0A 100%)"
              : "linear-gradient(160deg, #1E1710 0%, #1A1410 60%, #110E0A 100%)" :"linear-gradient(160deg, #130F0C 0%, #110E0A 100%)",
          border: `1px solid ${active ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.1)"}`,
          boxShadow: active && isHovered
            ? "0 0 60px rgba(201,168,76,0.15), 0 20px 60px rgba(0,0,0,0.5)"
            : "0 4px 40px rgba(0,0,0,0.4)",
        }}
        suppressHydrationWarning
      >
        {/* Badge */}
        {badge && (
          <div
            className="absolute top-4 right-4 font-mono text-[0.6rem] tracking-[0.25em] uppercase px-3 py-1 rounded-sm"
            style={{
              background: "rgba(139,58,42,0.25)",
              border: "1px solid rgba(139,58,42,0.5)",
              color: "#C47A5A",
            }}
          >
            {badge}
          </div>
        )}

        {/* Icon */}
        <div
          className="mb-6 transition-all duration-500"
          style={{
            opacity: active ? 1 : 0.4,
            filter: active && isHovered ? "drop-shadow(0 0 16px rgba(201,168,76,0.4))" : "none",
          }}
          suppressHydrationWarning
        >
          {icon}
        </div>

        {/* Title */}
        <h2
          className="font-display text-3xl md:text-4xl font-700 mb-1 tracking-tight"
          style={{
            color: active ? "var(--text-primary)" : "var(--text-dim)",
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className="font-mono text-[0.65rem] tracking-[0.35em] uppercase mb-5"
          style={{ color: active ? "var(--gold-primary)" : "var(--text-dim)" }}
        >
          {subtitle}
        </p>

        {/* Divider */}
        <div
          className="w-12 h-px mb-5"
          style={{
            background: active
              ? "linear-gradient(90deg, transparent, var(--gold-primary), transparent)"
              : "rgba(74,61,46,0.5)",
          }}
        />

        {/* Description */}
        <p
          className="font-sans text-sm leading-relaxed mb-8 max-w-xs"
          style={{ color: active ? "var(--text-muted)" : "var(--text-dim)" }}
        >
          {description}
        </p>

        {/* CTA */}
        {active ? (
          <div
            className="inline-flex items-center gap-3 font-sans text-xs font-600 tracking-[0.2em] uppercase px-7 py-3 rounded-sm transition-all duration-300"
            style={{
              background: isHovered
                ? "linear-gradient(135deg, #C9A84C 0%, #F0C040 40%, #E8D5A3 70%, #C9A84C 100%)"
                : "transparent",
              border: "1px solid var(--gold-primary)",
              color: isHovered ? "#0D0B08" : "var(--gold-primary)",
              boxShadow: isHovered ? "0 0 30px rgba(201,168,76,0.3)" : "none",
            }}
            suppressHydrationWarning
          >
            Enter Store
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : (
          <div
            className="inline-flex items-center gap-2 font-sans text-xs font-600 tracking-[0.2em] uppercase px-7 py-3 rounded-sm"
            style={{
              background: "transparent",
              border: "1px solid rgba(74,61,46,0.5)",
              color: "var(--text-dim)",
            }}
          >
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );

  if (active) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return <div>{cardContent}</div>;
}

// RedM Icon
function RedMIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="27" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="28" cy="28" r="20" stroke="#C9A84C" strokeWidth="0.5" strokeOpacity="0.2" />
      <path d="M28 12 L38 20 L38 36 L28 44 L18 36 L18 20 Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
      <path d="M28 18 L34 23 L34 33 L28 38 L22 33 L22 23 Z" fill="rgba(201,168,76,0.12)" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="28" cy="28" r="3" fill="#C9A84C" fillOpacity="0.8" />
    </svg>
  );
}

// FiveM Icon
function FiveMIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="27" stroke="#4A3D2E" strokeWidth="1" />
      <circle cx="28" cy="28" r="20" stroke="#4A3D2E" strokeWidth="0.5" />
      <rect x="18" y="18" width="20" height="20" rx="2" stroke="#4A3D2E" strokeWidth="1.5" fill="none" />
      <path d="M22 24 L28 28 L34 24" stroke="#4A3D2E" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 28 L28 32 L34 28" stroke="#4A3D2E" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="28" r="3" fill="#4A3D2E" />
    </svg>
  );
}

export default function StoreHub() {
  const [mounted, setMounted] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setLogoVisible(true), 100);
    const t2 = setTimeout(() => setTextVisible(true), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const isLogoVisible = mounted && logoVisible;
  const isTextVisible = mounted && textVisible;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{ background: "var(--bg-obsidian)" }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-12 h-12 opacity-20" style={{ borderTop: "1px solid var(--gold-primary)", borderLeft: "1px solid var(--gold-primary)" }} />
      <div className="absolute top-8 right-8 w-12 h-12 opacity-20" style={{ borderTop: "1px solid var(--gold-primary)", borderRight: "1px solid var(--gold-primary)" }} />
      <div className="absolute bottom-8 left-8 w-12 h-12 opacity-20" style={{ borderBottom: "1px solid var(--gold-primary)", borderLeft: "1px solid var(--gold-primary)" }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 opacity-20" style={{ borderBottom: "1px solid var(--gold-primary)", borderRight: "1px solid var(--gold-primary)" }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

        {/* Logo */}
        <div
          className="mb-6 transition-all duration-1000"
          style={{
            opacity: isLogoVisible ? 1 : 0,
            transform: isLogoVisible ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.95)",
            filter: isLogoVisible ? "drop-shadow(0 0 40px rgba(201,168,76,0.25))" : "none",
          }}
          suppressHydrationWarning
        >
          <Image
            src="/assets/images/Untitled_design_1_-1772701686791.png"
            alt="Foundation 1899 Scripts logo — vintage Western brand emblem"
            width={160}
            height={160}
            className="object-contain"
            priority
          />
        </div>

        {/* Brand name */}
        <div
          className="text-center mb-3 transition-all duration-700"
          style={{
            opacity: isTextVisible ? 1 : 0,
            transform: isTextVisible ? "translateY(0)" : "translateY(16px)",
          }}
          suppressHydrationWarning
        >
          <h1 className="font-display text-4xl md:text-5xl font-700 tracking-tight text-gold-gradient">
            Foundation 1899
          </h1>
          <p
            className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            Scripts
          </p>
        </div>

        {/* Tagline */}
        <div
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: isTextVisible ? 1 : 0,
            transform: isTextVisible ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "100ms",
          }}
          suppressHydrationWarning
        >
          <div className="divider-gold mb-5 w-48 mx-auto">
            <span
              className="font-mono text-[0.6rem] tracking-[0.3em] uppercase px-3"
              style={{ color: "var(--gold-dim)" }}
            >
              ✦
            </span>
          </div>
          <p
            className="font-sans text-sm md:text-base leading-relaxed max-w-md"
            style={{ color: "var(--text-muted)" }}
          >
            Premium hand-crafted scripts for the frontier.<br />
            Choose your platform to enter the store.
          </p>
        </div>

        {/* Store Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <StoreCard
            title="RedM Store"
            subtitle="Red Dead Roleplay"
            description="Economy systems, jobs, RP mechanics, and more — built with authenticity for Red Dead Roleplay servers."
            href="/redm"
            active={true}
            icon={<RedMIcon />}
            delay={600}
          />
          <StoreCard
            title="FiveM Store"
            subtitle="GTA V Roleplay"
            description="Bringing the same premium quality to GTA V roleplay servers. Scripts crafted for serious server owners."
            href="https://fivem.foundation1899.com"
            active={false}
            badge="Coming Soon"
            icon={<FiveMIcon />}
            delay={800}
          />
        </div>

        {/* Footer note */}
        <div
          className="mt-14 text-center transition-all duration-700"
          style={{
            opacity: isTextVisible ? 1 : 0,
            transitionDelay: "1000ms",
          }}
          suppressHydrationWarning
        >
          <div className="divider-gold w-32 mx-auto mb-5">
            <span
              className="font-mono text-[0.55rem] tracking-[0.3em] uppercase px-3"
              style={{ color: "var(--text-dim)" }}
            >
              ✦
            </span>
          </div>
          <p
            className="font-mono text-[0.6rem] tracking-[0.25em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            Powered by Tebex &nbsp;·&nbsp; foundation1899.com
          </p>
        </div>
      </div>
    </section>
  );
}

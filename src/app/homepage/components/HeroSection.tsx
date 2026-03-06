"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";

const floatingCards = [
  {
    id: "card-economy",
    title: "Frontier Economy",
    version: "v2.4.1",
    tag: "Economy",
    metric: "4,200+",
    metricLabel: "Active Servers",
    delay: "0s",
    floatClass: "float-1",
    position: "top-[12%] right-[6%]",
  },
  {
    id: "card-jobs",
    title: "Outlaw Jobs Pack",
    version: "v1.9.0",
    tag: "Jobs",
    metric: "98%",
    metricLabel: "Satisfaction",
    delay: "1s",
    floatClass: "float-2",
    position: "bottom-[22%] right-[2%]",
  },
  {
    id: "card-stable",
    title: "Stable & Ranch",
    version: "v3.1.2",
    tag: "RP Systems",
    metric: "12k+",
    metricLabel: "Downloads",
    delay: "2s",
    floatClass: "float-3",
    position: "bottom-[8%] right-[20%]",
  },
];

export default function HeroSection() {
  const emberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emberRef?.current) return;
    const container = emberRef?.current;
    const createEmber = () => {
      const ember = document.createElement("div");
      ember.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: #C9A84C;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: 0;
        animation: ember-drift ${Math.random() * 3 + 2}s ease-out forwards;
        pointer-events: none;
      `;
      container?.appendChild(ember);
      setTimeout(() => ember?.remove(), 5000);
    };
    const interval = setInterval(createEmber, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center hero-bg grid-overlay overflow-hidden pt-24">
      {/* Ember particles */}
      <div
        ref={emberRef}
        className="absolute inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />
      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none z-0 glow-pulse"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[80vh]">
          {/* Left: Text */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-8 h-[1px]"
                style={{ background: "var(--gold-primary)" }}
              />
              <span
                className="font-mono text-[0.65rem] tracking-[0.4em] uppercase"
                style={{ color: "var(--gold-dim)" }}
              >
                RedM · Red Dead Roleplay · Since 1899
              </span>
              <div
                className="w-8 h-[1px]"
                style={{ background: "var(--gold-primary)" }}
              />
            </div>

            {/* Logo Image */}
            <div className="mb-8">
              <AppImage
                src="/assets/images/Untitled_design_1_-1772701686791.png"
                alt="Foundation 1899 Scripts — dark vintage western brand logo with gold text on dark background"
                width={320}
                height={120}
                priority={true}
                className="object-contain"
              />
            </div>

            {/* Headline */}
            <h1
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-900 leading-[0.9] tracking-tight mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Premium Scripts
              <br />
              <span className="text-gold-gradient italic">
                Built for the Frontier.
              </span>
            </h1>

            <p
              className="font-sans text-lg font-300 leading-relaxed max-w-xl mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Hand-crafted RedM scripts that breathe life into your server.
              Immersive economy systems, authentic jobs, and deep roleplay
              mechanics — forged for serious server owners.
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-5">
              <Link href="/products">
                <button className="btn-gold">Explore Scripts</button>
              </Link>
              <a
                href="https://discord.gg/foundation1899"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-outline-gold">Join Discord</button>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-10 mt-14 pt-10" style={{ borderTop: "1px solid var(--border-gold)" }}>
              {[
                { val: "40+", label: "Scripts Released" },
                { val: "4.2k+", label: "Servers Running" },
                { val: "98%", label: "Positive Reviews" },
              ]?.map((s) => (
                <div key={s?.label}>
                  <p
                    className="font-display text-2xl font-900"
                    style={{ color: "var(--gold-primary)" }}
                  >
                    {s?.val}
                  </p>
                  <p
                    className="font-mono text-[0.6rem] tracking-[0.3em] uppercase mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s?.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating Cards */}
          <div className="lg:col-span-5 relative h-[500px] hidden lg:block">
            {floatingCards?.map((card) => (
              <div
                key={card?.id}
                className={`absolute ${card?.position} ${card?.floatClass} z-10`}
                style={{ animationDelay: card?.delay }}
              >
                <div
                  className="script-card p-5 w-[200px] border-glow"
                  style={{ minWidth: 180 }}
                >
                  {/* Corner decoration */}
                  <div
                    className="absolute top-0 left-0 w-4 h-4"
                    style={{
                      borderTop: "1px solid var(--gold-primary)",
                      borderLeft: "1px solid var(--gold-primary)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-4 h-4"
                    style={{
                      borderBottom: "1px solid var(--gold-primary)",
                      borderRight: "1px solid var(--gold-primary)",
                    }}
                  />
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge-version">{card?.version}</span>
                    <span
                      className="font-mono text-[0.55rem] tracking-[0.2em] uppercase px-2 py-0.5"
                      style={{
                        color: "var(--gold-dim)",
                        background: "rgba(201,168,76,0.05)",
                        border: "1px solid rgba(201,168,76,0.1)",
                      }}
                    >
                      {card?.tag}
                    </span>
                  </div>
                  <p
                    className="font-display text-sm font-600 mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {card?.title}
                  </p>
                  <div
                    className="pt-3"
                    style={{ borderTop: "1px solid var(--border-gold)" }}
                  >
                    <p
                      className="font-display text-xl font-900"
                      style={{ color: "var(--gold-primary)" }}
                    >
                      {card?.metric}
                    </p>
                    <p
                      className="font-mono text-[0.55rem] tracking-[0.2em] uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {card?.metricLabel}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Central glow orb */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none glow-pulse"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-obsidian))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
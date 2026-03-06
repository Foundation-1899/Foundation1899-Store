"use client";

import { useEffect, useRef } from "react";

export default function BundleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.15 }
    );
    sectionRef?.current?.querySelectorAll(".reveal-on-scroll")?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-obsidian)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 reveal-on-scroll">
          <span
            className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mb-4"
            style={{ color: "var(--gold-dim)" }}
          >
            — Best Value —
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-900 leading-[0.9] tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            The{" "}
            <span className="text-gold-gradient italic">Founder&apos;s Bundle</span>
          </h2>
          <p
            className="font-sans text-base max-w-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Get our 5 most popular scripts at a steep discount. Everything you
            need to launch a fully immersive RedM server.
          </p>
        </div>

        {/* Bundle Card */}
        <div
          className="reveal-on-scroll relative p-10 md:p-16 border-glow"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-gold-bright)",
          }}
        >
          {/* Corner decorations */}
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r",
          ]?.map((cls, i) => (
            <div
              key={i}
              className={`absolute w-6 h-6 ${cls}`}
              style={{ borderColor: "var(--gold-primary)" }}
            />
          ))}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-[0.6rem] tracking-[0.3em] uppercase px-3 py-1"
                  style={{
                    color: "#0D0B08",
                    background: "var(--gold-primary)",
                  }}
                >
                  Save 35%
                </span>
                <span
                  className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Limited Offer
                </span>
              </div>
              <div className="flex items-baseline gap-4 mb-6">
                <span
                  className="font-display text-5xl font-900"
                  style={{ color: "var(--gold-primary)" }}
                >
                  $74.99
                </span>
                <span
                  className="font-display text-2xl line-through"
                  style={{ color: "var(--text-dim)" }}
                >
                  $112.95
                </span>
              </div>
              <p
                className="font-sans text-sm leading-relaxed mb-8"
                style={{ color: "var(--text-muted)" }}
              >
                The Founder&apos;s Bundle includes Frontier Economy, Outlaw Jobs Pack,
                Stable & Ranch, Western HUD Pack, and Saloon & Tavern UI.
                All scripts, one purchase, lifetime updates on all five.
              </p>
              <a
                href="https://foundation1899.tebex.io/package/founders-bundle"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-gold px-12 py-4">
                  Get the Bundle
                </button>
              </a>
            </div>

            {/* Right: Included scripts */}
            <div className="space-y-3">
              {[
                { name: "Frontier Economy System", price: "$24.99", version: "v2.4.1" },
                { name: "Outlaw Jobs Pack", price: "$18.99", version: "v1.9.0" },
                { name: "Stable & Ranch System", price: "$21.99", version: "v3.1.2" },
                { name: "Western HUD Pack", price: "$12.99", version: "v4.0.1" },
                { name: "Saloon & Tavern UI", price: "$14.99", version: "v2.0.0" },
              ]?.map((item) => (
                <div
                  key={item?.name}
                  className="flex items-center justify-between py-3 px-4"
                  style={{ borderBottom: "1px solid var(--border-gold)" }}
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "var(--gold-primary)" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className="font-sans text-sm font-500"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="badge-version">{item?.version}</span>
                    <span
                      className="font-display text-sm font-700"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item?.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
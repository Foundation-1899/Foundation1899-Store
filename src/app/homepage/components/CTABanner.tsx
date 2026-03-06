"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.2 }
    );
    sectionRef?.current?.querySelectorAll(".reveal-on-scroll")?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-40 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-obsidian)" }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Horizontal gold lines */}
      <div
        className="absolute top-12 left-0 w-full h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.3) 50%, rgba(201,168,76,0.15) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 left-0 w-full h-[1px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 30%, rgba(201,168,76,0.3) 50%, rgba(201,168,76,0.15) 70%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="reveal-on-scroll">
          <span
            className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mb-6 block"
            style={{ color: "var(--gold-dim)" }}
          >
            — Start Building —
          </span>
          <h2
            className="font-display text-[clamp(2.5rem,7vw,5rem)] font-900 leading-[0.9] tracking-tight mb-8"
            style={{ color: "var(--text-primary)" }}
          >
            Your server deserves{" "}
            <span className="text-gold-gradient italic">
              the gold standard.
            </span>
          </h2>
          <p
            className="font-sans text-lg leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: "var(--text-muted)" }}
          >
            Join 4,200+ servers already running Foundation 1899 scripts.
            One purchase, lifetime updates, real support from developers who
            actually play RedM.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/products">
              <button className="btn-gold px-12 py-5 text-sm">
                Browse All Scripts
              </button>
            </Link>
            <a
              href="https://discord.gg/foundation1899"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-outline-gold px-10 py-4 text-sm">
                Join the Community
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
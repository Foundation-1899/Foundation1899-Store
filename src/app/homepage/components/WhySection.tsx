"use client";

import { useEffect, useRef } from "react";

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Lifetime Updates",
    desc: "Every script you purchase receives free updates indefinitely. We maintain every release — no abandonware.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Clean, Documented Code",
    desc: "Every script ships with full documentation, config comments, and a structured codebase your devs will appreciate.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: "Priority Discord Support",
    desc: "Direct access to the Foundation 1899 dev team. Bugs get fixed, questions get answered — usually within hours.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: "Modular Architecture",
    desc: "Scripts are built to work standalone or together. Mix, match, and extend without conflict or spaghetti dependencies.",
  },
];

const stats = [
  { val: "40+", label: "Scripts in Catalog" },
  { val: "4,200+", label: "Servers Powered" },
  { val: "< 48h", label: "Avg Support Response" },
  { val: "3 yrs", label: "Active Development" },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef?.current?.querySelectorAll(".reveal-on-scroll")?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: "var(--bg-obsidian)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right top, rgba(201,168,76,0.03) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Left: Heading + Stats */}
          <div className="lg:col-span-5 reveal-on-scroll">
            <span
              className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mb-6 block"
              style={{ color: "var(--gold-dim)" }}
            >
              — Why Foundation 1899 —
            </span>
            <h2
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-900 leading-[0.9] tracking-tight mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              Scripts built{" "}
              <span className="text-gold-gradient italic">
                to last.
              </span>
            </h2>
            <p
              className="font-sans text-base leading-relaxed mb-12"
              style={{ color: "var(--text-muted)" }}
            >
              We've been building for the RedM community since the early days.
              Every script reflects years of server owner feedback, player
              testing, and a genuine obsession with Western authenticity.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats?.map((s) => (
                <div
                  key={s?.label}
                  className="relative p-5"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-gold)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-3 h-3"
                    style={{
                      borderTop: "1px solid var(--gold-primary)",
                      borderLeft: "1px solid var(--gold-primary)",
                    }}
                  />
                  <p
                    className="font-display text-2xl font-900 mb-1"
                    style={{ color: "var(--gold-primary)" }}
                  >
                    {s?.val}
                  </p>
                  <p
                    className="font-mono text-[0.58rem] tracking-[0.25em] uppercase"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s?.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pillars */}
          <div className="lg:col-span-7 space-y-5">
            {pillars?.map((p, i) => (
              <div
                key={p?.title}
                className="reveal-on-scroll flex gap-5 p-6 group transition-all duration-400"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-gold)",
                }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(201,168,76,0.07)",
                    border: "1px solid var(--border-gold)",
                    color: "var(--gold-primary)",
                  }}
                >
                  {p?.icon}
                </div>
                <div>
                  <h3
                    className="font-display text-lg font-700 mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {p?.title}
                  </h3>
                  <p
                    className="font-sans text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {p?.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
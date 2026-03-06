"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    id: "t1",
    quote:
      "Foundation 1899\'s economy script completely transformed our server. Players actually care about trading and prices now — it\'s the backbone of our entire RP ecosystem.",
    author: "Marcus Holloway",
    role: "Owner — Dusty Trails RP",
    servers: "220 daily players",
  },
  {
    id: "t2",
    quote:
      "The documentation alone is worth the price. I've bought scripts from a dozen devs — nobody else ships this level of code quality and comment coverage.",
    author: "Ava Chen",
    role: "Lead Developer — Frontier Legends",
    servers: "500+ daily players",
  },
  {
    id: "t3",
    quote:
      "Bought the Outlaw Jobs Pack on a Friday. Had a question Saturday morning and got a reply within two hours. That kind of support is unheard of in this community.",
    author: "Diego Reyes",
    role: "Server Admin — Red River Chronicles",
    servers: "180 daily players",
  },
  {
    id: "t4",
    quote:
      "We've been running Foundation 1899 scripts for over a year. Zero major bugs, consistent updates, and every patch note actually explains what changed. Respect.",
    author: "Priya Nair",
    role: "Owner — Blackwater Basin RP",
    servers: "350 daily players",
  },
];

export default function TestimonialsSection() {
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
      className="py-32 px-6"
      style={{ background: "var(--bg-dark)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 reveal-on-scroll">
          <span
            className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mb-4"
            style={{ color: "var(--gold-dim)" }}
          >
            — Community Voices —
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-900 leading-[0.95] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            What Server Owners{" "}
            <span className="text-gold-gradient italic">Say</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials?.map((t, i) => (
            <div
              key={t?.id}
              className="reveal-on-scroll testimonial-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative z-10">
                <p
                  className="font-sans text-base leading-relaxed mb-6 pt-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t?.quote}
                </p>
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid var(--border-gold)" }}
                >
                  <div>
                    <p
                      className="font-display text-sm font-700"
                      style={{ color: "var(--gold-light)" }}
                    >
                      {t?.author}
                    </p>
                    <p
                      className="font-mono text-[0.6rem] tracking-[0.15em] uppercase mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t?.role}
                    </p>
                  </div>
                  <span
                    className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-3 py-1"
                    style={{
                      color: "var(--gold-dim)",
                      background: "rgba(201,168,76,0.05)",
                      border: "1px solid var(--border-gold)",
                    }}
                  >
                    {t?.servers}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
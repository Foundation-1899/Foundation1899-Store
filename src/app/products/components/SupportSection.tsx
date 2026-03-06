"use client";

import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "Do I get lifetime updates after purchasing?",
    a: "Yes — every Foundation 1899 script includes lifetime free updates. When we push a patch, bug fix, or new feature, you get it automatically through Tebex.",
  },
  {
    q: "What framework do the scripts require?",
    a: "All scripts are built for RedM with ox_lib as the primary dependency. Full dependency lists are in each script's documentation. Most scripts also support vorp_core and RSG.",
  },
  {
    q: "How does support work?",
    a: "Purchase any script and you get access to our private Discord support channel. Average response time is under 48 hours. Critical bugs are typically patched within 24 hours.",
  },
  {
    q: "Can I use these on multiple servers?",
    a: "Each purchase is a single-server license. If you need multi-server licensing, reach out on Discord and we can arrange a custom deal.",
  },
  {
    q: "Do the scripts work together?",
    a: "Yes — all Foundation 1899 scripts are designed to integrate with each other. The economy, jobs, and property systems share a unified data layer when used together.",
  },
];

export default function SupportSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
      className="py-24 px-6"
      style={{ background: "var(--bg-dark)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 reveal-on-scroll">
          <span
            className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mb-4"
            style={{ color: "var(--gold-dim)" }}
          >
            — Common Questions —
          </span>
          <h2
            className="font-display text-[clamp(2rem,4vw,3rem)] font-900 leading-[0.95] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Before You{" "}
            <span className="text-gold-gradient italic">Purchase</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs?.map((faq, i) => (
            <div
              key={`faq-${i}`}
              className="reveal-on-scroll"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="transition-all duration-300"
                style={{
                  background: openIndex === i ? "var(--bg-card-hover)" : "var(--bg-card)",
                  border: `1px solid ${openIndex === i ? "var(--border-gold-bright)" : "var(--border-gold)"}`,
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span
                    className="font-display text-base font-600"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {faq?.q}
                  </span>
                  <span
                    className="flex-shrink-0 ml-4 transition-transform duration-300 font-mono text-lg"
                    style={{
                      color: "var(--gold-primary)",
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{
                    maxHeight: openIndex === i ? "300px" : "0",
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <p
                    className="font-sans text-sm leading-relaxed px-6 pb-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {faq?.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discord CTA */}
        <div
          className="reveal-on-scroll mt-12 p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-gold)",
          }}
        >
          <div>
            <p
              className="font-display text-lg font-700 mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Still have questions?
            </p>
            <p
              className="font-sans text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Our team is active daily on Discord.
            </p>
          </div>
          <a
            href="https://discord.gg/foundation1899"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-outline-gold whitespace-nowrap">
              Join Discord
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
import AppImage from "@/components/ui/AppImage";

export default function ProductsHero() {
  return (
    <section
      className="relative pt-36 pb-20 px-6 overflow-hidden"
      style={{ background: "var(--bg-obsidian)" }}
    >
      {/* Bg glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Logo mark */}
          <div className="mb-6">
            <AppImage
              src="/assets/images/Untitled_design_1_-1772701686791.png"
              alt="Foundation 1899 Scripts logo — dark western vintage brand mark with gold lettering"
              width={200}
              height={80}
              priority={true}
              className="object-contain opacity-80"
            />
          </div>

          <span
            className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mb-5"
            style={{ color: "var(--gold-dim)" }}
          >
            — Full Catalog —
          </span>

          <h1
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-900 leading-[0.9] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            All{" "}
            <span className="text-gold-gradient italic">Scripts</span>
          </h1>

          {/* Ornamental divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-[1px]" style={{ background: "var(--gold-primary)" }} />
            <span style={{ color: "var(--gold-primary)" }}>✦</span>
            <div className="w-16 h-[1px]" style={{ background: "var(--gold-primary)" }} />
          </div>

          <p
            className="font-sans text-base leading-relaxed max-w-xl"
            style={{ color: "var(--text-muted)" }}
          >
            Every script in the Foundation 1899 catalog. Lifetime updates,
            full documentation, and Discord support included with every
            purchase.
          </p>
        </div>
      </div>
    </section>
  );
}
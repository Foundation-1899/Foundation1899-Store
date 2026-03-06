import Link from "next/link";
import AppLogo from "@/components/ui/AppLogo";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{ borderTop: "1px solid var(--border-gold)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo + Brand */}
        <Link href="/homepage" className="flex items-center gap-3 group">
          <AppLogo
            src="/assets/images/Untitled_design_1_-1772701686791.png"
            size={40}
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />
          <div>
            <span
              className="font-display text-xs tracking-[0.2em] uppercase block"
              style={{ color: "var(--gold-dim)" }}
            >
              Foundation 1899 Scripts
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/homepage"
            className="font-sans text-xs tracking-[0.15em] uppercase transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            Home
          </Link>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <Link
            href="/products"
            className="font-sans text-xs tracking-[0.15em] uppercase transition-colors hover:text-gold-primary"
            style={{ color: "var(--text-muted)" }}
          >
            Scripts
          </Link>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <a
            href="https://discord.gg/foundation1899"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-[0.15em] uppercase transition-colors hover:text-gold-primary"
            style={{ color: "var(--text-muted)" }}
          >
            Discord
          </a>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <a
            href="#"
            className="font-sans text-xs tracking-[0.15em] uppercase transition-colors hover:text-gold-primary"
            style={{ color: "var(--text-muted)" }}
          >
            Terms
          </a>
        </nav>

        {/* Social + Copyright */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/foundation1899"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="w-8 h-8 flex items-center justify-center rounded-sm border transition-all hover:border-gold-primary hover:text-gold-primary"
              style={{ borderColor: "var(--border-gold)", color: "var(--text-muted)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.014.043.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
            </a>
            <a
              href="https://github.com/foundation1899"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 flex items-center justify-center rounded-sm border transition-all hover:border-gold-primary hover:text-gold-primary"
              style={{ borderColor: "var(--border-gold)", color: "var(--text-muted)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
          <p
            className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
            style={{ color: "var(--text-dim)" }}
          >
            © 2026 Foundation 1899 Scripts
          </p>
        </div>
      </div>
    </footer>
  );
}
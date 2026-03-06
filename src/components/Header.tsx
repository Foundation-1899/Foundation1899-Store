"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";

const navLinks = [
  { label: "Home", href: "/homepage" },
  { label: "RedM Store", href: "/redm" },
  { label: "Scripts", href: "/products" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "nav-glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-3 group">
          <AppLogo
            src="/assets/images/Untitled_design_1_-1772701686791.png"
            size={52}
            className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(201,168,76,0.5)]"
          />
          <div className="hidden sm:block">
            <span
              className="font-display text-sm font-700 tracking-[0.2em] uppercase"
              style={{ color: "var(--gold-primary)" }}
            >
              Foundation 1899
            </span>
            <span
              className="block font-mono text-[0.55rem] tracking-[0.4em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Scripts
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks?.map((link) => {
            const isActive = pathname === link?.href;
            return (
              <Link
                key={link?.href}
                href={link?.href}
                className={`font-sans text-xs font-600 tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                  isActive
                    ? "text-gold-primary" :"text-text-muted hover:text-gold-light"
                }`}
              >
                {link?.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-gold-primary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/products">
            <button className="btn-gold text-xs">Browse Scripts</button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2]?.map((i) => (
            <span
              key={i}
              className={`block h-[1px] bg-gold-primary transition-all duration-300 ${
                i === 1
                  ? menuOpen
                    ? "opacity-0 w-6" :"w-4"
                  : menuOpen
                  ? i === 0
                    ? "w-6 rotate-45 translate-y-[10px]"
                    : "w-6 -rotate-45 -translate-y-[6px]" :"w-6"
              }`}
            />
          ))}
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "rgba(13,11,8,0.97)", borderTop: "1px solid var(--border-gold)" }}
      >
        <nav className="px-6 py-6 flex flex-col gap-5">
          {navLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs font-600 tracking-[0.25em] uppercase text-text-muted hover:text-gold-primary transition-colors"
            >
              {link?.label}
            </Link>
          ))}
          <Link href="/products" onClick={() => setMenuOpen(false)}>
            <button className="btn-gold text-xs w-full mt-2">Browse Scripts</button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
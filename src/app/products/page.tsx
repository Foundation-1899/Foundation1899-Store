import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsHero from "./components/ProductsHero";
import ProductsGrid from "./components/ProductsGrid";
import BundleSection from "./components/BundleSection";
import SupportSection from "./components/SupportSection";

export const metadata: Metadata = {
  title: "All Scripts — Foundation 1899 Scripts",
  description:
    "Browse the full Foundation 1899 RedM script catalog. Economy systems, jobs, RP mechanics, UI packs, and utilities — all with lifetime updates and Discord support.",
  keywords: [
    "RedM scripts for sale",
    "Foundation 1899 scripts",
    "RedM economy script",
    "RedM jobs script",
    "Red Dead Roleplay scripts",
    "Tebex RedM",
  ],
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-obsidian)" }}>
      <Header />
      <ProductsHero />
      <ProductsGrid />
      <BundleSection />
      <SupportSection />
      <Footer />
    </main>
  );
}
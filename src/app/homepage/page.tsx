import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreHub from "./components/StoreHub";

export const metadata: Metadata = {
  title: "Foundation 1899 Scripts — Choose Your Store",
  description:
    "Premium hand-crafted scripts for RedM and FiveM servers. Built with authenticity for serious server owners.",
  keywords: [
    "RedM scripts",
    "FiveM scripts",
    "Red Dead Roleplay",
    "Foundation 1899",
    "game server scripts",
  ],
  openGraph: {
    title: "Foundation 1899 Scripts",
    description: "Premium scripts for the frontier and beyond.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-obsidian)" }}>
      <Header />
      <StoreHub />
      <Footer />
    </main>
  );
}
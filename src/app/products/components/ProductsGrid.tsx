"use client";

import { useState, useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";

type Category = "All" | "Economy" | "Jobs" | "RP Systems" | "UI/UX" | "Utilities";

interface Script {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  longDesc: string;
  price: number;
  image: string;
  imageAlt: string;
  version: string;
  isNew: boolean;
  isBestSeller: boolean;
  features: string[];
  tebexUrl: string;
}

const scripts: Script[] = [
{
  id: "frontier-economy",
  title: "Frontier Economy System",
  category: "Economy",
  description: "Player-driven economy with dynamic market prices and trading posts.",
  longDesc:
  "A complete player-driven economy featuring dynamic commodity prices, NPC trading posts, player-to-player trading, and market events that respond to server activity.",
  price: 24.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10c73e2d4-1772702182513.png",
  imageAlt: "Old western town market street with wooden storefronts and dirt road",
  version: "v2.4.1",
  isNew: false,
  isBestSeller: true,
  features: ["Dynamic pricing engine", "NPC trading posts", "Server-event market shifts", "Full config control"],
  tebexUrl: "https://foundation1899.tebex.io/package/frontier-economy"
},
{
  id: "outlaw-jobs",
  title: "Outlaw Jobs Pack",
  category: "Jobs",
  description: "Train robberies, stagecoach heists, and bounty hunting with NPC AI.",
  longDesc:
  "Six hand-crafted outlaw jobs including train heists, stagecoach robberies, bank jobs, and bounty hunting. Full NPC AI, wanted levels, and tiered reward systems.",
  price: 18.99,
  image: "https://images.unsplash.com/photo-1611532389354-e85cbe427176",
  imageAlt: "Dramatic western canyon landscape with golden sunset and rocky terrain",
  version: "v1.9.0",
  isNew: true,
  isBestSeller: false,
  features: ["6 unique job scenarios", "NPC AI with behaviors", "Tiered reward system", "Wanted level integration"],
  tebexUrl: "https://foundation1899.tebex.io/package/outlaw-jobs"
},
{
  id: "stable-ranch",
  title: "Stable & Ranch System",
  category: "RP Systems",
  description: "Own, breed, and trade horses with full ranch management mechanics.",
  longDesc:
  "Complete horse ownership and ranch management. Buy, breed, and sell horses. Manage feed, water, and health. Hire ranch hands and expand your operation.",
  price: 21.99,
  image: "https://images.unsplash.com/photo-1645997666756-03cbd931e636",
  imageAlt: "Horses grazing in a golden field at dusk with a rustic wooden barn",
  version: "v3.1.2",
  isNew: false,
  isBestSeller: false,
  features: ["Horse breeding system", "Health & feeding mechanics", "Ranch expansion", "Auction house support"],
  tebexUrl: "https://foundation1899.tebex.io/package/stable-ranch"
},
{
  id: "saloon-ui",
  title: "Saloon & Tavern UI",
  category: "UI/UX",
  description: "Immersive period-accurate UI for saloons, gambling, and social hubs.",
  longDesc:
  "Beautifully crafted saloon menus, poker tables, drinking games, and social interaction UI. All animations are period-accurate and fully customizable.",
  price: 14.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15558a8a6-1772702194448.png",
  imageAlt: "Warm candlelit interior of a rustic wooden tavern with whiskey bottles on shelves",
  version: "v2.0.0",
  isNew: true,
  isBestSeller: false,
  features: ["Poker mini-game", "Drinking system", "Custom NUI menus", "Fully animated"],
  tebexUrl: "https://foundation1899.tebex.io/package/saloon-ui"
},
{
  id: "lawmen-system",
  title: "Lawmen & Sheriff System",
  category: "RP Systems",
  description: "Full law enforcement framework with deputy roles, warrants, and jails.",
  longDesc:
  "Complete law enforcement system. Sheriffs, deputies, warrants, bounties, and a functioning jail system with bail mechanics and prisoner work programs.",
  price: 26.99,
  image: "https://images.unsplash.com/photo-1635774080844-3ba3d9d99d80",
  imageAlt: "Wide open western landscape with dusty trail leading to a small frontier town",
  version: "v1.5.3",
  isNew: false,
  isBestSeller: true,
  features: ["Deputy role system", "Warrant & bounty board", "Jail with bail mechanics", "Prisoner work programs"],
  tebexUrl: "https://foundation1899.tebex.io/package/lawmen-system"
},
{
  id: "prospector-mining",
  title: "Prospector Mining System",
  category: "Jobs",
  description: "Gold panning, mine shaft digging, and ore processing with progression.",
  longDesc:
  "Multi-stage mining with gold panning, shaft digging, ore processing, and a claim staking system. Integrates with the Frontier Economy for realistic gold market impact.",
  price: 16.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f2629782-1772702179232.png",
  imageAlt: "Rocky mountain stream with gold panning equipment and gravel banks",
  version: "v2.2.0",
  isNew: false,
  isBestSeller: false,
  features: ["Gold panning minigame", "Shaft excavation", "Ore processing chain", "Claim staking system"],
  tebexUrl: "https://foundation1899.tebex.io/package/prospector-mining"
},
{
  id: "property-system",
  title: "Property & Land System",
  category: "Economy",
  description: "Buy, sell, and rent land plots, homesteads, and commercial properties.",
  longDesc:
  "Full real estate system. Players can purchase homesteads, rent rooms, operate businesses, and pay property taxes. Ties into the economy for realistic market fluctuation.",
  price: 29.99,
  image: "https://images.unsplash.com/photo-1549476362-2c79a740083f",
  imageAlt: "Rustic wooden homestead cabin on a prairie with mountains in the background",
  version: "v1.3.0",
  isNew: false,
  isBestSeller: false,
  features: ["Homestead ownership", "Business properties", "Rent & tax system", "Property customization"],
  tebexUrl: "https://foundation1899.tebex.io/package/property-system"
},
{
  id: "hud-pack",
  title: "Western HUD Pack",
  category: "UI/UX",
  description: "Period-accurate HUD with health, stamina, hunger, thirst, and wanted meters.",
  longDesc:
  "A complete HUD redesign that fits the Western aesthetic. Parchment-style health bars, compass, wanted meter, and status indicators — all fully configurable.",
  price: 12.99,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d20402df-1772214574142.png",
  imageAlt: "Antique compass and map on aged parchment with worn leather journal",
  version: "v4.0.1",
  isNew: false,
  isBestSeller: true,
  features: ["Parchment-style design", "All vital status bars", "Compass with waypoints", "Fully configurable"],
  tebexUrl: "https://foundation1899.tebex.io/package/hud-pack"
},
{
  id: "crafting-system",
  title: "Frontier Crafting System",
  category: "Utilities",
  description: "Recipe-based crafting for tools, ammunition, medicine, and food.",
  longDesc:
  "An expansive crafting system with 80+ recipes. Gather materials, craft at workbenches, and sell crafted goods. Fully integrated with inventory and economy systems.",
  price: 19.99,
  image: "https://images.unsplash.com/photo-1628586431263-44040b966252",
  imageAlt: "Rustic workbench with tools, leather goods, and crafting materials in warm light",
  version: "v2.1.4",
  isNew: true,
  isBestSeller: false,
  features: ["80+ crafting recipes", "Workbench system", "Material gathering", "Economy integration"],
  tebexUrl: "https://foundation1899.tebex.io/package/crafting-system"
}];


const categories: Category[] = ["All", "Economy", "Jobs", "RP Systems", "UI/UX", "Utilities"];

export default function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleScripts, setVisibleScripts] = useState<Script[]>(scripts);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setVisibleScripts(scripts);
    } else {
      setVisibleScripts(scripts.filter((s) => s.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visibleScripts]);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6"
      style={{ background: "var(--bg-dark)" }}>
      
      <div className="max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-16 reveal-on-scroll">
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-tab ${activeCategory === cat ? "active" : ""}`}>
            
              {cat}
            </button>
          )}
        </div>

        {/* Count */}
        <div className="flex items-center justify-between mb-10">
          <p
            className="font-mono text-[0.65rem] tracking-[0.3em] uppercase"
            style={{ color: "var(--text-muted)" }}>
            
            {visibleScripts.length} Script{visibleScripts.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` · ${activeCategory}` : " · All Categories"}
          </p>
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
              style={{ color: "var(--text-dim)" }}>
              
              All include lifetime updates
            </span>
          </div>
        </div>

        {/* Script Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visibleScripts.map((script, i) =>
          <div
            key={`${script.id}-${activeCategory}`}
            className="reveal-on-scroll script-card group flex flex-col"
            style={{ transitionDelay: `${i * 60}ms` }}>
            
              {/* Image */}
              <div className="overflow-hidden h-48 relative">
                <AppImage
                src={script.image}
                alt={script.imageAlt}
                width={800}
                height={192}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: "sepia(0.4) contrast(1.1) brightness(0.8)"
                }} />
              
                {/* Badges overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {script.isNew && <span className="badge-new">New</span>}
                  {script.isBestSeller &&
                <span
                  className="font-mono text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 text-white"
                  style={{ background: "rgba(139,58,42,0.85)" }}>
                  
                      Bestseller
                    </span>
                }
                </div>
                {/* Version */}
                <div className="absolute top-3 right-3">
                  <span className="badge-version" style={{ background: "rgba(13,11,8,0.8)" }}>
                    {script.version}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span
                  className="font-mono text-[0.6rem] tracking-[0.2em] uppercase px-2 py-0.5"
                  style={{
                    color: "var(--gold-dim)",
                    background: "rgba(201,168,76,0.05)",
                    border: "1px solid rgba(201,168,76,0.12)"
                  }}>
                  
                    {script.category}
                  </span>
                </div>

                <h3
                className="font-display text-xl font-700 mb-2 leading-tight"
                style={{ color: "var(--text-primary)" }}>
                
                  {script.title}
                </h3>
                <p
                className="font-sans text-sm leading-relaxed mb-5 flex-1"
                style={{ color: "var(--text-muted)" }}>
                
                  {script.longDesc}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-6">
                  {script.features.map((f) =>
                <li
                  key={f}
                  className="flex items-center gap-2 font-sans text-xs"
                  style={{ color: "var(--text-muted)" }}>
                  
                      <span
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: "var(--gold-primary)" }} />
                  
                      {f}
                    </li>
                )}
                </ul>

                {/* Price + Buy */}
                <div
                className="flex items-center justify-between pt-5"
                style={{ borderTop: "1px solid var(--border-gold)" }}>
                
                  <div>
                    <span className="price-tag">${script.price.toFixed(2)}</span>
                    <span
                    className="font-mono text-[0.55rem] tracking-[0.2em] uppercase ml-2"
                    style={{ color: "var(--text-dim)" }}>
                    
                      USD
                    </span>
                  </div>
                  <a
                  href={script.tebexUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  
                    <button className="btn-gold text-[0.65rem] py-2.5 px-5">
                      Buy on Tebex
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        {visibleScripts.length === 0 &&
        <div className="text-center py-24">
            <p className="font-display text-xl" style={{ color: "var(--text-muted)" }}>
              No scripts in this category yet.
            </p>
            <p
            className="font-mono text-xs tracking-widest uppercase mt-2"
            style={{ color: "var(--text-dim)" }}>
            
              Check back soon — we ship updates regularly.
            </p>
          </div>
        }
      </div>
    </section>);

}
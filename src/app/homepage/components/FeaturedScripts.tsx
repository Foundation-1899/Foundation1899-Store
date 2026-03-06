"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import AppImage from "@/components/ui/AppImage";

const featured = [
{
  id: "frontier-economy",
  title: "Frontier Economy System",
  category: "Economy",
  description:
  "A complete player-driven economy with dynamic market prices, trading posts, and commodity fluctuation tied to server events.",
  price: "$24.99",
  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_10c73e2d4-1772702182513.png",
  imageAlt:
  "Old western town market street with wooden storefronts and dirt road",
  version: "v2.4.1",
  tag: "Economy",
  isNew: false,
  isBestSeller: true,
  span: "lg:col-span-2 lg:row-span-2",
  large: true
},
{
  id: "outlaw-jobs",
  title: "Outlaw Jobs Pack",
  category: "Jobs",
  description:
  "Train robberies, stagecoach heists, and bounty hunting with full NPC AI and reward tiers.",
  price: "$18.99",
  image:
  "https://images.unsplash.com/photo-1550551328-4db9497e296a",
  imageAlt:
  "Dramatic western landscape with canyon and golden sunset sky",
  version: "v1.9.0",
  tag: "Jobs",
  isNew: true,
  isBestSeller: false,
  span: "lg:col-span-1",
  large: false
},
{
  id: "stable-ranch",
  title: "Stable & Ranch System",
  category: "RP Systems",
  description:
  "Own, breed, and trade horses. Full ranch management with feed, water, and health mechanics.",
  price: "$21.99",
  image:
  "https://images.unsplash.com/photo-1645997666756-03cbd931e636",
  imageAlt:
  "Horses grazing in a golden field at dusk with a rustic barn in background",
  version: "v3.1.2",
  tag: "RP Systems",
  isNew: false,
  isBestSeller: false,
  span: "lg:col-span-1",
  large: false
},
{
  id: "saloon-ui",
  title: "Saloon & Tavern UI",
  category: "UI/UX",
  description:
  "Immersive period-accurate UI for saloons, gambling, and social hubs with custom animations.",
  price: "$14.99",
  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_18ff9d32c-1772702177781.png",
  imageAlt:
  "Warm candlelit interior of a rustic wooden tavern with whiskey bottles",
  version: "v2.0.0",
  tag: "UI/UX",
  isNew: true,
  isBestSeller: false,
  span: "lg:col-span-2",
  large: false
}];


export default function FeaturedScripts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const elements = sectionRef?.current?.querySelectorAll(".reveal-on-scroll");
    elements?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-6"
      style={{ background: "var(--bg-dark)" }}>
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 reveal-on-scroll">
          <span
            className="font-mono text-[0.65rem] tracking-[0.5em] uppercase mb-4"
            style={{ color: "var(--gold-dim)" }}>
            
            — Our Catalog —
          </span>
          <h2
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-900 leading-[0.95] tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}>
            
            Featured{" "}
            <span className="text-gold-gradient italic">Scripts</span>
          </h2>
          <div className="divider-gold w-64">
            <span
              className="font-mono text-[0.6rem] tracking-[0.3em] uppercase px-4"
              style={{ color: "var(--text-muted)" }}>
              
              ✦
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {featured?.map((script, i) =>
          <div
            key={script?.id}
            className={`reveal-on-scroll ${script?.span} script-card group`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            
              {/* Image */}
              <div
              className="overflow-hidden"
              style={{ height: script?.large ? 280 : 180 }}>
              
                <AppImage
                src={script?.image}
                alt={script?.imageAlt}
                width={800}
                height={script?.large ? 280 : 180}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  filter: "sepia(0.3) contrast(1.1) brightness(0.85)"
                }} />
              
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="badge-version">{script?.version}</span>
                    {script?.isNew &&
                  <span className="badge-new">New</span>
                  }
                    {script?.isBestSeller &&
                  <span
                    className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2 py-0.5"
                    style={{
                      color: "var(--rust)",
                      background: "rgba(139,58,42,0.1)",
                      border: "1px solid rgba(139,58,42,0.3)"
                    }}>
                    
                        Bestseller
                      </span>
                  }
                  </div>
                  <span
                  className="font-mono text-[0.6rem] tracking-[0.2em] uppercase"
                  style={{ color: "var(--text-dim)" }}>
                  
                    {script?.tag}
                  </span>
                </div>

                <h3
                className="font-display text-xl font-700 mb-2 leading-tight"
                style={{ color: "var(--text-primary)" }}>
                
                  {script?.title}
                </h3>
                <p
                className="font-sans text-sm leading-relaxed mb-5"
                style={{ color: "var(--text-muted)" }}>
                
                  {script?.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="price-tag">{script?.price}</span>
                  <Link href="/products">
                    <button className="btn-outline-gold text-[0.65rem] py-2 px-4">
                      View Script
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All CTA */}
        <div className="flex justify-center mt-16 reveal-on-scroll">
          <Link href="/products">
            <button className="btn-gold px-12 py-4">
              View All Scripts
            </button>
          </Link>
        </div>
      </div>
    </section>);

}
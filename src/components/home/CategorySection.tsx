"use client";
import Link from "next/link";
import {
  FiCode, FiDollarSign, FiHeadphones, FiTrendingUp,
  FiUsers, FiHeart, FiPenTool, FiClipboard, FiTruck,
} from "react-icons/fi";
import SectionHeader from "@/components/shared/SectionHeader";
import { categories } from "@/data/categories";

const iconMap: Record<string, React.ElementType> = {
  code: FiCode, finance: FiDollarSign, customer: FiHeadphones,
  marketing: FiTrendingUp, hr: FiUsers, health: FiHeart,
  design: FiPenTool, project: FiClipboard, automotive: FiTruck,
};

const palette = [
  { bg: "#E6F6E6", color: "#00692F", hover: "#00863F" },
  { bg: "#f0fdf4", color: "#15803d", hover: "#16a34a" },
  { bg: "#fff7ed", color: "#c2410c", hover: "#ea580c" },
  { bg: "#faf5ff", color: "#6d28d9", hover: "#7c3aed" },
  { bg: "#fdf2f8", color: "#be185d", hover: "#ec4899" },
  { bg: "#fef2f2", color: "#b91c1c", hover: "#ef4444" },
  { bg: "#ecfdf5", color: "#065f46", hover: "#059669" },
  { bg: "#F1FAEC", color: "#055A2B", hover: "#00A651" },
  { bg: "#fffbeb", color: "#92400e", hover: "#f59e0b" },
];

export default function CategorySection() {
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeader
          subtitle="Explore by Category"
          title="Browse Job Categories"
          description="Find the perfect role in your field. Choose from our most popular job categories."
        />

        <div
          style={{ display: "grid", gap: 16 }}
          className="cat-grid"
        >
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? FiCode;
            const p = palette[i % palette.length];
            return (
              <Link
                key={cat.id}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="cat-card"
                style={{
                  background: "#fff", border: "1.5px solid #f0f0f0",
                  borderRadius: 16, padding: "24px 16px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", textAlign: "center",
                  textDecoration: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = p.hover;
                  el.style.boxShadow = `0 6px 24px ${p.bg}`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#f0f0f0";
                  el.style.boxShadow = "none";
                  el.style.transform = "none";
                }}
              >
                <div style={{ width: 52, height: 52, background: p.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon style={{ color: p.color, fontSize: 22 }} />
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#111827", lineHeight: 1.3, marginBottom: 4 }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: 12, color: "#9ca3af" }}>
                  {cat.count} open {cat.count === 1 ? "position" : "positions"}
                </p>
              </Link>
            );
          })}

          {/* View All */}
          <Link
            href="/jobs"
            style={{
              background: "linear-gradient(135deg, #00863F 0%, #00A651 100%)", borderRadius: 16, padding: "24px 16px",
              display: "flex", flexDirection: "column", alignItems: "center",
              textAlign: "center", textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            <div style={{ width: 52, height: 52, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <span style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>+</span>
            </div>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 4 }}>View All</h3>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>All categories</p>
          </Link>
        </div>
      </div>

      <style>{`
        .cat-grid { grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 640px)  { .cat-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .cat-grid { grid-template-columns: repeat(5, 1fr); } }
      `}</style>
    </section>
  );
}

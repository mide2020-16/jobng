"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiMapPin } from "react-icons/fi";
import SectionHeader from "@/components/shared/SectionHeader";
import { candidates } from "@/data/candidates";

const availBadge: Record<string, { bg: string; color: string }> = {
  "Available":      { bg: "#f0fdf4", color: "#16a34a" },
  "Open to Offers": { bg: "#E6F6E6", color: "#00863F" },
};

export default function FeaturedCandidates() {
  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 40 }}>
          <SectionHeader
            subtitle="Top Talent"
            title="Featured Candidates"
            description="Connect with skilled professionals ready for their next opportunity"
            center={false}
          />
          <Link
            href="/candidates"
            style={{ fontSize: 13, fontWeight: 600, color: "#00863F", textDecoration: "none", border: "1.5px solid #A6D86F", padding: "8px 18px", borderRadius: 8, whiteSpace: "nowrap", marginBottom: 40 }}
          >
            Browse All Candidates →
          </Link>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{ 480: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
          pagination={{ clickable: true }}
          style={{ paddingBottom: 48 }}
        >
          {candidates.slice(0, 8).map((c) => {
            const ab = availBadge[c.availability] ?? { bg: "#f9fafb", color: "#6b7280" };
            return (
              <SwiperSlide key={c.id}>
                <div
                  className="job-card"
                  style={{
                    background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb",
                    padding: 20, textAlign: "center", display: "flex",
                    flexDirection: "column", alignItems: "center",
                  }}
                >
                  <div style={{ position: "relative", marginBottom: 12 }}>
                    <div style={{ width: 68, height: 68, borderRadius: "50%", overflow: "hidden", border: "2px solid #BDE5A8" }}>
                      <Image src={c.avatar} alt={c.name} width={68} height={68} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={{ position: "absolute", bottom: -2, right: -2, background: ab.bg, color: ab.color, fontSize: 11, fontWeight: 700, padding: "1px 5px", borderRadius: 6, border: "2px solid #fff" }}>
                      ✓
                    </span>
                  </div>
                  <Link href={`/candidates/${c.id}`} style={{ fontWeight: 700, fontSize: 14, color: "#111827", textDecoration: "none" }}>
                    {c.name}
                  </Link>
                  <p style={{ fontSize: 12, color: "#00863F", fontWeight: 500, marginTop: 3 }}>{c.title}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, display: "flex", alignItems: "center", gap: 3, justifyContent: "center" }}>
                    <FiMapPin size={10} /> {c.location}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginTop: 10 }}>
                    {c.skills.slice(0, 3).map((s) => (
                      <span key={s} style={{ fontSize: 11, background: "#f3f4f6", color: "#374151", padding: "2px 8px", borderRadius: 6 }}>{s}</span>
                    ))}
                  </div>
                  <Link href={`/candidates/${c.id}`} style={{ marginTop: 14, width: "100%", background: "#E6F6E6", color: "#00863F", fontWeight: 600, fontSize: 12, padding: "8px 0", borderRadius: 8, textDecoration: "none", display: "block", textAlign: "center" }}>
                    View Profile
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

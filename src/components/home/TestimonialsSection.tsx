"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionHeader from "@/components/shared/SectionHeader";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeader
          subtitle="What People Say"
          title="Testimonials From Our Users"
          description="Thousands of job seekers and employers trust JustJobNG to make their next move"
        />

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          style={{ paddingBottom: 48 }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} style={{ height: "auto" }}>
              <div
                style={{
                  background: "#f8fafc", border: "1.5px solid #e5e7eb",
                  borderRadius: 16, padding: 24, height: "100%",
                  display: "flex", flexDirection: "column",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <h4 style={{ fontWeight: 700, color: "#00863F", marginBottom: 8, fontSize: 15 }}>{t.title}</h4>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{t.content}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 16, borderTop: "1px solid #e5e7eb" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                    <Image src={t.avatar} alt={t.name} width={40} height={40} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>{t.role} — {t.company}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

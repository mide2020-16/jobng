"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import JobCard from "@/components/shared/JobCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { authHeaders } from "@/lib/auth-client";
import type { ApiJob } from "@/lib/justjobApi";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/jobs?page=1&page_size=6", {
          headers: authHeaders(),
        });
        const data = await res.json();
        if (cancelled) return;
        if (res.status === 401) {
          setNeedsAuth(true);
          setJobs([]);
          return;
        }
        if (data.ok && Array.isArray(data.items)) {
          setJobs(data.items.slice(0, 6));
        }
      } catch {
        if (!cancelled) setJobs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center", color: "#6b7280" }}>
          Loading jobs…
        </div>
      </section>
    );
  }

  if (needsAuth) {
    return (
      <section style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <SectionHeader subtitle="Jobs" title="Latest openings" description="Sign in to browse live job listings from our network." center />
          <Link href="/login" style={{ display: "inline-block", marginTop: 16, background: "#1967D2", color: "#fff", padding: "12px 24px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>
            Sign in to view jobs
          </Link>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) return null;

  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 40 }}>
          <SectionHeader
            subtitle="Live Listings"
            title="Latest Jobs"
            description="Fresh roles from companies on JustJobNG"
            center={false}
          />
          <Link
            href="/jobs"
            style={{
              fontSize: 13, fontWeight: 600, color: "#1967D2",
              textDecoration: "none", border: "1.5px solid #bfdbfe",
              padding: "8px 18px", borderRadius: 8, whiteSpace: "nowrap",
              marginBottom: 40,
            }}
          >
            Browse All Jobs →
          </Link>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          style={{ paddingBottom: 48 }}
        >
          {jobs.map((job) => (
            <SwiperSlide key={job.job_id} style={{ height: "auto" }}>
              <JobCard job={job} variant="grid" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

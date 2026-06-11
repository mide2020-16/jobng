"use client";
import Link from "next/link";
import Image from "next/image";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { blogPosts } from "@/data/blog";

export default function BlogSection() {
  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 40 }}>
          <SectionHeader
            subtitle="Latest Updates"
            title="Recent News & Articles"
            description="Fresh job-related insights posted every week"
            center={false}
          />
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ marginBottom: 40 }}>
            <Link href="/blog" style={{ fontSize: 13, fontWeight: 600, color: "#00863F", textDecoration: "none", border: "1.5px solid #A6D86F", padding: "8px 18px", borderRadius: 8, whiteSpace: "nowrap", display: "inline-block" }}>
              View All Posts →
            </Link>
          </motion.div>
        </div>

        <div className="blog-grid" style={{ display: "grid", gap: 24 }}>
          {blogPosts.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <Link href={`/blog/${post.slug}`} style={{ display: "block", position: "relative", height: 200 }}>
                <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 12, left: 12, background: "#00863F", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>
                  {post.category}
                </span>
              </Link>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af" }}>
                    <FiCalendar size={11} /> {post.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af" }}>
                    <FiClock size={11} /> {post.readTime}
                  </span>
                </div>
                <Link href={`/blog/${post.slug}`} style={{ fontWeight: 700, fontSize: 15, color: "#111827", textDecoration: "none", lineHeight: 1.4, marginBottom: 8 }}>
                  {post.title}
                </Link>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, flex: 1, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {post.excerpt}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 14, borderTop: "1px solid #f0f0f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden" }}>
                      <Image src={post.authorAvatar} alt={post.author} width={28} height={28} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "#374151" }}>{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} style={{ fontSize: 12, color: "#00863F", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                    Read More <FiArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .blog-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px)  { .blog-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1024px) { .blog-grid { grid-template-columns: repeat(3,1fr); } }
      `}</style>
    </section>
  );
}

"use client";
import Link from "next/link";
import { FiBriefcase, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0A0F1C 0%, #052914 45%, #00692F 100%)",
        padding: "80px 0",
      }}
    >
      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-60px", right: "-60px", width: 300, height: 300, background: "rgba(0,166,81,0.18)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }}
      />
      <motion.div
        animate={{ scale: [1, 1.09, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position: "absolute", bottom: "-40px", left: "10%", width: 250, height: 250, background: "rgba(141,198,63,0.12)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }}
      />

      {/* Grid dots */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 540 }}
          >
            <span style={{ display: "inline-block", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "5px 14px", borderRadius: 99, marginBottom: 18 }}>
              Start Today — It&apos;s Free
            </span>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 14, letterSpacing: "-0.02em" }}>
              The Smarter Way to Find Your{" "}
              <span style={{ color: "#8DC63F" }}>Next Opportunity</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(205,235,176,0.88)", lineHeight: 1.7, maxWidth: 460 }}>
              Join over 4 million professionals already using JustJobNG. Whether you&apos;re looking for your first job or your next big career move — we&apos;ve got you covered.
            </p>
          </motion.div>

          {/* Right CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 220 }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/jobs"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "#fff", color: "#00692F",
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  padding: "15px 32px", borderRadius: 12,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <FiSearch size={16} />
                Browse Jobs
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/post-job"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  background: "rgba(255,255,255,0.12)", color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  fontWeight: 700, fontSize: 15, textDecoration: "none",
                  padding: "14px 32px", borderRadius: 12,
                }}
              >
                <FiBriefcase size={16} />
                Post a Job
              </Link>
            </motion.div>

            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textAlign: "center" }}>
              No credit card required · Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

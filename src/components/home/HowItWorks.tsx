"use client";
import { FiSearch, FiFileText, FiSend, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";

const steps = [
  { icon: FiSearch,       step: "01", title: "Search for Jobs",   bg: "#E6F6E6", color: "#00863F", border: "#BDE5A8", desc: "Browse thousands of job listings filtered by location, category, salary, and job type to find your perfect match." },
  { icon: FiFileText,     step: "02", title: "Create Your Profile", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0", desc: "Build a professional profile that showcases your skills, experience, and portfolio. Make employers notice you." },
  { icon: FiSend,         step: "03", title: "Apply Instantly",    bg: "#faf5ff", color: "#7c3aed", border: "#e9d5ff", desc: "Apply to multiple jobs with a single click. Track your application status in real time from your dashboard." },
  { icon: FiCheckCircle,  step: "04", title: "Get Hired",          bg: "#fff7ed", color: "#ea580c", border: "#fed7aa", desc: "Land interviews, negotiate offers, and start your new role. Thousands of candidates find jobs here every month." },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeader
          subtitle="Simple Process"
          title="How It Works"
          description="Get started with JustJobNG in four simple steps and land your dream job faster"
        />

        <div className="how-grid" style={{ display: "grid", gap: 20 }}>
          {steps.map(({ icon: Icon, step, title, bg, color, border, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: `0 20px 48px ${color}22` }}
              style={{
                background: "#fff", border: `1.5px solid ${border}`,
                borderRadius: 16, padding: 28, position: "relative",
                textAlign: "center", cursor: "default",
              }}
            >
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#111827", color: "#fff", fontSize: 11, fontWeight: 700, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {step}
              </div>
              <motion.div
                whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                transition={{ duration: 0.45 }}
                style={{ width: 56, height: 56, background: bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "16px auto 16px" }}
              >
                <Icon style={{ color, fontSize: 24 }} />
              </motion.div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .how-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px)  { .how-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1024px) { .how-grid { grid-template-columns: repeat(4,1fr); } }
      `}</style>
    </section>
  );
}

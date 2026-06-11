"use client";
import { useEffect, useRef, useState } from "react";
import { FiBriefcase, FiUsers, FiFileText, FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

const stats = [
  { icon: FiBriefcase, value: 97216, label: "Jobs Posted",      bg: "#E6F6E6", color: "#00863F" },
  { icon: FiUsers,     value: 4889,  label: "Active Members",   bg: "#f0fdf4", color: "#16a34a" },
  { icon: FiFileText,  value: 5500,  label: "Resumes Filed",    bg: "#faf5ff", color: "#7c3aed" },
  { icon: FiHome,      value: 6088,  label: "Companies",        bg: "#fff7ed", color: "#ea580c" },
];

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatItem({ icon: Icon, value, label, bg, color }: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 2000, active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="counter-item"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "32px 16px" }}
    >
      <div style={{ width: 56, height: 56, background: bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        <Icon style={{ color, fontSize: 24 }} />
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: "#111827", lineHeight: 1 }}>
        {count.toLocaleString()}
      </div>
      <div style={{ fontSize: 14, color: "#6b7280", marginTop: 6, fontWeight: 500 }}>{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section style={{ padding: "8px 0", background: "#fff", borderBottom: "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
          }}
          className="stats-grid"
        >
          {stats.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(4,1fr) !important; } }
      `}</style>
    </section>
  );
}

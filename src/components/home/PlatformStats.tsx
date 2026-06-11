"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 4,  suffix: "M+", label: "Daily active users" },
  { value: 12, suffix: "k+", label: "Open job positions" },
  { value: 20, suffix: "M+", label: "Stories shared" },
];

function useCountUp(target: number, duration = 1500, active = false) {
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

function StatItem({ value, suffix, label }: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1500, active);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "16px 24px" }}>
      <div style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 8 }}>
        {count}{suffix}
      </div>
      <p style={{ color: "rgba(141,198,63,0.9)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </p>
    </div>
  );
}

export default function PlatformStats() {
  return (
    <section style={{ padding: "80px 0", background: "linear-gradient(135deg, #0A0F1C 0%, #055A2B 55%, #00692F 100%)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="pstats-grid" style={{ display: "grid", gap: 0 }}>
          {stats.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </div>
      <style>{`
        .pstats-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px) { .pstats-grid { grid-template-columns: repeat(3,1fr); } }
      `}</style>
    </section>
  );
}

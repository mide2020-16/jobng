"use client";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionHeader({ subtitle, title, description, center = true }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: center ? "center" : "left", marginBottom: 40 }}
    >
      {subtitle && (
        <span
          style={{
            display: "inline-block", fontSize: 12, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.1em",
            color: "#00863F", marginBottom: 8,
          }}
        >
          {subtitle}
        </span>
      )}
      <h2
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          fontWeight: 800, color: "#111827", lineHeight: 1.2,
          letterSpacing: "-0.02em", margin: 0,
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            marginTop: 12, color: "#6b7280", fontSize: 16, lineHeight: 1.6,
            maxWidth: center ? 520 : "100%",
            marginLeft: center ? "auto" : 0,
            marginRight: center ? "auto" : 0,
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

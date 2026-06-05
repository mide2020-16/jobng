"use client";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiPhone, FiMapPin, FiBriefcase, FiMail } from "react-icons/fi";

const footerLinks = {
  explore: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Login / Register", href: "/login" },
    { label: "Forgot PIN", href: "/forgot-password" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socials = [
  { icon: FiFacebook,  href: "#", label: "Facebook" },
  { icon: FiTwitter,   href: "#", label: "Twitter" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiLinkedin,  href: "#", label: "LinkedIn" },
];

const linkStyle: React.CSSProperties = {
  display: "block", fontSize: 14, color: "#9ca3af",
  textDecoration: "none", padding: "4px 0",
  transition: "color 0.15s",
};

export default function Footer() {
  return (
    <footer style={{ background: "#111827", color: "#9ca3af" }}>
      {/* Main */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 1.5rem 48px" }}>
        <div className="footer-grid" style={{ display: "grid", gap: 40 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, background: "#1967D2", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiBriefcase style={{ color: "#fff", fontSize: 16 }} />
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>JustJobNG</span>
            </Link>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              Connecting talented professionals with top employers worldwide. Your dream career is one click away.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <FiMapPin style={{ color: "#1967D2", flexShrink: 0, marginTop: 2 }} size={14} />
                <span style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>328 Queensberry Street, North Melbourne VIC 3051</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FiPhone style={{ color: "#1967D2" }} size={14} />
                <span style={{ fontSize: 13, color: "#d1d5db", fontWeight: 500 }}>123 456 7890</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <FiMail style={{ color: "#1967D2" }} size={14} />
                <a href="mailto:support@justjobng.com" style={{ fontSize: 13, color: "#d1d5db", textDecoration: "none" }}>support@justjobng.com</a>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
              Explore
            </h3>
            {footerLinks.explore.map((l) => (
              <Link key={l.href + l.label} href={l.href} style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >{l.label}</Link>
            ))}
          </div>

          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
              Company
            </h3>
            {footerLinks.company.map((l) => (
              <Link key={l.href + l.label} href={l.href} style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#60a5fa")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #1f2937" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 1.5rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#4b5563" }}>
            © {new Date().getFullYear()} JustJobNG. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label} href={href} aria-label={label}
                style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "#1f2937", borderRadius: "50%", color: "#6b7280", textDecoration: "none", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1967D2"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1f2937"; (e.currentTarget as HTMLElement).style.color = "#6b7280"; }}
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 1fr; }
        @media (min-width: 640px)  { .footer-grid { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr 1.5fr; } }
      `}</style>
    </footer>
  );
}

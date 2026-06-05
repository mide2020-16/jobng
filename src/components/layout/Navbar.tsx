"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu, FiX, FiLogIn, FiBriefcase, FiLogOut,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, logout, phone, ready } = useAuth();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: transparent ? "transparent" : "#ffffff",
          boxShadow: transparent ? "none" : "0 1px 12px rgba(0,0,0,0.08)",
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          height: 72,
          display: "flex", alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%", maxWidth: 1280,
            margin: "0 auto", padding: "0 1.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, background: "#1967D2", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiBriefcase style={{ color: "#fff", fontSize: 18 }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: transparent ? "#fff" : "#111827", letterSpacing: "-0.02em" }}>
              JustJobNG
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "none", alignItems: "center", gap: 4 }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "8px 14px", borderRadius: 8,
                  fontSize: 14, fontWeight: 500, textDecoration: "none",
                  color: transparent
                    ? (pathname === link.href ? "#fff" : "rgba(255,255,255,0.85)")
                    : (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) ? "#1967D2" : "#374151"),
                  background: "transparent",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display: "none", alignItems: "center", gap: 8, flexShrink: 0 }} className="desktop-actions">
            {ready && isAuthenticated ? (
              <>
                <span style={{ fontSize: 13, color: transparent ? "rgba(255,255,255,0.85)" : "#6b7280" }}>
                  {phone ? `···${phone.slice(-4)}` : "Signed in"}
                </span>
                <button
                  type="button"
                  onClick={() => { logout(); router.push("/"); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "transparent", color: transparent ? "#fff" : "#374151",
                    fontSize: 14, fontWeight: 600,
                    padding: "9px 16px", borderRadius: 10,
                    border: transparent ? "1px solid rgba(255,255,255,0.3)" : "1px solid #e5e7eb",
                    cursor: "pointer",
                  }}
                >
                  <FiLogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "#1967D2", color: "#fff",
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                  padding: "9px 20px", borderRadius: 10,
                  boxShadow: "0 2px 8px rgba(25,103,210,0.25)",
                }}
              >
                <FiLogIn size={15} />
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 8, borderRadius: 8,
              color: transparent ? "#fff" : "#374151",
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      {/* Inline responsive styles */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav   { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40,
          }}
        />
      )}

      {/* Mobile Drawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, height: "100%",
          width: 300, maxWidth: "85vw",
          background: "#fff", zIndex: 51,
          boxShadow: "-4px 0 30px rgba(0,0,0,0.15)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
            <div style={{ width: 30, height: 30, background: "#1967D2", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiBriefcase style={{ color: "#fff", fontSize: 15 }} />
            </div>
            <span style={{ fontSize: 17, fontWeight: 800, color: "#111827" }}>JustJobNG</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}>
            <FiX size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: "12px 0" }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block", padding: "12px 20px",
                fontSize: 15, fontWeight: 500, textDecoration: "none",
                color: pathname === link.href ? "#1967D2" : "#374151",
                background: pathname === link.href ? "#eff6ff" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid #f0f0f0" }}>
          {ready && isAuthenticated ? (
            <button
              type="button"
              onClick={() => { logout(); setMobileOpen(false); router.push("/"); }}
              style={{
                width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px", borderRadius: 10,
                background: "#f3f4f6", color: "#374151",
                fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
              }}
            >
              <FiLogOut size={14} /> Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px", borderRadius: 10,
                background: "#1967D2", color: "#fff",
                fontSize: 14, fontWeight: 600, textDecoration: "none",
              }}
            >
              <FiLogIn size={14} /> Login / Register
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

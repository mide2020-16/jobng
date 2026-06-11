"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiLogIn, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/brand/Logo";

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
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`jj-nav ${transparent ? "jj-nav--transparent" : "jj-nav--solid"}`}
      >
        <div className="container-xl jj-nav__inner">
          <Logo variant="dark" size="md" />

          <nav className="jj-nav__links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`jj-nav__link ${isActive(link.href) ? "jj-nav__link--active" : ""} ${transparent ? "jj-nav__link--on-dark" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="jj-nav__actions">
            {ready && isAuthenticated ? (
              <>
                <span className={`jj-nav__phone ${transparent ? "jj-nav__phone--on-dark" : ""}`}>
                  ···{phone?.slice(-4) ?? "····"}
                </span>
                <button
                  type="button"
                  className={`jj-btn jj-btn--ghost jj-nav__logout ${transparent ? "jj-nav__logout--on-dark" : ""}`}
                  onClick={() => { logout(); router.push("/"); }}
                >
                  <FiLogOut size={15} /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="jj-btn jj-btn--gold jj-nav__login">
                <FiLogIn size={15} /> Login
              </Link>
            )}
          </div>

          <button
            type="button"
            className={`jj-nav__burger ${transparent ? "jj-nav__burger--on-dark" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      <style>{`
        .jj-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          height: var(--nav-height);
          display: flex; align-items: center;
          transition: background 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s;
        }
        .jj-nav--transparent { background: transparent; }
        .jj-nav--solid {
          background: rgba(245, 244, 240, 0.92);
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 0 var(--border);
        }
        .jj-nav__inner {
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .jj-nav__links { display: none; align-items: center; gap: 4px; }
        .jj-nav__link {
          padding: 8px 14px; border-radius: 8px;
          font-size: 0.875rem; font-weight: 600; text-decoration: none;
          color: var(--text-muted); transition: color 0.2s, background 0.2s;
        }
        .jj-nav__link:hover { color: var(--ink); background: rgba(10,15,28,0.04); }
        .jj-nav__link--on-dark { color: rgba(10,15,28,0.7); }
        .jj-nav__link--on-dark:hover { color: #0A0F1C; background: rgba(10,15,28,0.06); }
        .jj-nav__link--active { color: var(--gold-hover) !important; }
        .jj-nav__link--on-dark.jj-nav__link--active { color: #055A2B !important; }
        .jj-nav__actions { display: none; align-items: center; gap: 10px; }
        .jj-nav__phone { font-size: 0.8125rem; color: var(--text-muted); font-weight: 600; }
        .jj-nav__phone--on-dark { color: rgba(10,15,28,0.6); }
        .jj-nav__logout { padding: 8px 16px; font-size: 0.8125rem; }
        .jj-nav__logout--on-dark { color: #0A0F1C; border-color: rgba(10,15,28,0.25); }
        .jj-nav__login { padding: 9px 20px; }
        .jj-nav__burger {
          background: none; border: none; cursor: pointer;
          padding: 8px; border-radius: 8px; color: var(--ink);
        }
        .jj-nav__burger--on-dark { color: #0A0F1C; }
        @media (min-width: 1024px) {
          .jj-nav__links { display: flex; }
          .jj-nav__actions { display: flex; }
          .jj-nav__burger { display: none; }
        }
      `}</style>

      {mobileOpen && (
        <div className="jj-nav__backdrop" onClick={() => setMobileOpen(false)} aria-hidden />
      )}

      <div className={`jj-nav__drawer ${mobileOpen ? "jj-nav__drawer--open" : ""}`}>
        <div className="jj-nav__drawer-head">
          <Logo size="sm" />
          <button type="button" onClick={() => setMobileOpen(false)} className="jj-nav__drawer-close">
            <FiX size={20} />
          </button>
        </div>
        <nav className="jj-nav__drawer-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`jj-nav__drawer-link ${isActive(link.href) ? "jj-nav__drawer-link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="jj-nav__drawer-foot">
          {ready && isAuthenticated ? (
            <button
              type="button"
              className="jj-btn jj-btn--ghost"
              style={{ width: "100%", padding: "12px" }}
              onClick={() => { logout(); setMobileOpen(false); router.push("/"); }}
            >
              <FiLogOut size={14} /> Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="jj-btn jj-btn--gold"
              style={{ width: "100%", padding: "12px" }}
            >
              <FiLogIn size={14} /> Login
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .jj-nav__backdrop {
          position: fixed; inset: 0; background: rgba(10,15,28,0.5);
          z-index: 49; backdrop-filter: blur(2px);
        }
        .jj-nav__drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: 300px; max-width: 85vw;
          background: var(--surface-elevated); z-index: 51;
          box-shadow: -8px 0 40px rgba(10,15,28,0.15);
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          display: flex; flex-direction: column;
        }
        .jj-nav__drawer--open { transform: translateX(0); }
        .jj-nav__drawer-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px; border-bottom: 1px solid var(--border);
        }
        .jj-nav__drawer-close {
          background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px;
        }
        .jj-nav__drawer-nav { padding: 12px 0; flex: 1; }
        .jj-nav__drawer-link {
          display: block; padding: 12px 20px;
          font-size: 0.9375rem; font-weight: 600; text-decoration: none;
          color: var(--text); transition: background 0.15s;
        }
        .jj-nav__drawer-link--active {
          color: var(--gold-hover); background: var(--gold-muted);
        }
        .jj-nav__drawer-foot { padding: 16px 20px; border-top: 1px solid var(--border); }
      `}</style>
    </>
  );
}

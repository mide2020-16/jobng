/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiLogIn,
  FiLogOut,
  FiLock,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/brand/Logo";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function getInitials(phone?: string | null) {
  if (!phone) return "U";
  const digits = phone.replace(/\D/g, "");
  return digits.slice(-2) || "U";
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, logout, phone, ready, avatarUrl } = useAuth() as {
    isAuthenticated: boolean;
    logout: () => void;
    phone?: string | null;
    ready: boolean;
    avatarUrl?: string | null;
  };

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  const Avatar = ({ size = 34 }: { size?: number }) =>
    avatarUrl ? (
      <Image
        src={avatarUrl}
        alt="Profile"
        className="rounded-full object-cover border border-ink/10 shrink-0"
        width={`${size}`}
        height={`${size}`}
      />
    ) : (
      <div
        className="rounded-full bg-[#055A2B] text-white flex items-center justify-center font-bold uppercase shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {getInitials(phone)}
      </div>
    );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-(--spacing-nav-height) flex items-center bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.08)]">
        <div className="container-xl flex items-center justify-between gap-4 w-full">
          {isAuthenticated ? <Logo variant="dark" size="md" href="/jobs"/> : <Logo variant="dark" size="md" />}
          

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-sm text-sm font-semibold no-underline transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-gold-hover bg-ink/4"
                    : "text-text-muted hover:text-ink hover:bg-ink/4"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            {ready && isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  title="profile"
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold-hover hover:bg-ink/4"
                  aria-haspopup="menu"
                  // aria-expanded={profileOpen}
                >
                  <Avatar size={34} />
                  <FiChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""} text-text-muted`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] w-72 bg-surface-elevated rounded-xl shadow-[0_16px_40px_rgba(15,23,42,0.16)] border border-border-strong overflow-hidden z-50">
                    <div className="flex items-center gap-3 p-5 bg-surface/60">
                      <Avatar size={44} />
                      <div className="min-w-0">
                        <p className="font-display text-[15px] font-bold text-ink truncate tracking-tight">{phone ?? "No phone on file"}</p>
                        <p className="text-[12px] text-text-muted">Job seeker account</p>
                      </div>
                    </div>
                    <div className="h-px bg-border-strong" />
                    <div className="p-1.5">
                      <Link href="/change-password" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold text-ink no-underline hover:bg-ink/4 transition-colors">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ink/5 text-text-muted shrink-0">
                          <FiLock size={15} />
                        </span>
                        Change password
                      </Link>
                      <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold text-red-600 hover:bg-red-50 transition-colors">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 shrink-0">
                          <FiLogOut size={15} />
                        </span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="jj-btn jj-btn--gold px-5 py-2.5">
                <FiLogIn size={15} /> Login
              </Link>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden bg-transparent border-none cursor-pointer p-2 rounded-sm text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            // aria-expanded={`${mobileOpen}`}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-ink/50 z-49 backdrop-blur-[2px]" 
          onClick={() => setMobileOpen(false)} 
          aria-hidden="true" 
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-75 max-w-[85vw] bg-surface-elevated z-51 shadow-lg flex flex-col transition-transform duration-350 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-[18px_20px] border-b border-border-strong">
          <Logo size="sm" />
          <button type="button" onClick={() => setMobileOpen(false)} className="bg-transparent border-none cursor-pointer text-text-muted p-1" aria-label="Close menu">
            <FiX size={20} />
          </button>
        </div>

        <nav className="py-3 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-5 py-3 text-[15px] font-semibold no-underline transition-colors ${
                isActive(link.href) ? "text-gold-hover bg-gold-muted" : "text-ink hover:bg-ink/4"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {ready && isAuthenticated && (
            <Link
              href="/change-password"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-[15px] font-semibold text-ink no-underline hover:bg-ink/4 transition-colors border-t border-border-strong mt-2 pt-4"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ink/5 text-text-muted shrink-0">
                <FiLock size={15} />
              </span>
              Change password
            </Link>
          )}
        </nav>

        <div className="p-[16px_20px] border-t border-border-strong bg-surface/40">
          {ready && isAuthenticated ? (
            <button type="button" className="jj-btn jj-btn--ghost w-full py-3" onClick={handleLogout}>
              <FiLogOut size={14} /> Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="jj-btn jj-btn--gold w-full py-3">
              <FiLogIn size={14} /> Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
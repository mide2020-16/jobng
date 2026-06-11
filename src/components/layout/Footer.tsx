"use client";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import Logo from "@/components/brand/Logo";

const footerLinks = {
  explore: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Login", href: "/login" },
    { label: "Forgot PIN", href: "/forgot-password" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socials = [
  { icon: FiFacebook, href: "#", label: "Facebook" },
  { icon: FiTwitter, href: "#", label: "Twitter" },
  { icon: FiInstagram, href: "#", label: "Instagram" },
  { icon: FiLinkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="jj-footer">
      <div className="container-xl jj-footer__main">
        <div className="jj-footer__grid">
          <div>
            <Logo variant="dark" size="md" />
            <p className="jj-footer__tagline">
              Nigeria&apos;s job discovery platform. Subscribe via <strong>*7098#</strong>, browse live listings, and land your next role.
            </p>
          </div>
          <div>
            <h3 className="jj-footer__heading">Explore</h3>
            {footerLinks.explore.map((l) => (
              <Link key={l.href} href={l.href} className="jj-footer__link">{l.label}</Link>
            ))}
          </div>
          <div>
            <h3 className="jj-footer__heading">Company</h3>
            {footerLinks.company.map((l) => (
              <Link key={l.href} href={l.href} className="jj-footer__link">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="jj-footer__bar">
        <div className="container-xl jj-footer__bar-inner">
          <p className="jj-footer__copy">© {new Date().getFullYear()} JustJobNG. All rights reserved.</p>
          <div className="jj-footer__socials">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="jj-footer__social">
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .jj-footer {
          background:
            radial-gradient(ellipse 80% 80% at 80% 0%, #CDEBB0 0%, transparent 55%),
            linear-gradient(200deg, #8DC63F 0%, #00A651 55%, #00863F 100%);
          color: rgba(10,15,28,0.7);
        }
        .jj-footer__main { padding: 4rem 0 3rem; }
        .jj-footer__grid {
          display: grid; gap: 2.5rem;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) { .jj-footer__grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .jj-footer__grid { grid-template-columns: 2fr 1fr 1fr; } }
        .jj-footer__tagline {
          font-size: 0.875rem; line-height: 1.7; max-width: 300px;
          margin: 1.25rem 0 0; color: rgba(10,15,28,0.65);
        }
        .jj-footer__tagline strong { color: #055A2B; font-weight: 800; }
        .jj-footer__heading {
          font-size: 0.6875rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.12em; color: #0A0F1C;
          margin: 0 0 1.25rem;
        }
        .jj-footer__link {
          display: block; font-size: 0.875rem; color: rgba(10,15,28,0.6);
          text-decoration: none; padding: 5px 0; transition: color 0.15s;
        }
        .jj-footer__link:hover { color: #0A0F1C; }
        .jj-footer__bar { border-top: 1px solid rgba(10,15,28,0.12); }
        .jj-footer__bar-inner {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 12px; padding: 1.25rem 0;
        }
        .jj-footer__copy { font-size: 0.8125rem; color: rgba(10,15,28,0.55); margin: 0; }
        .jj-footer__socials { display: flex; gap: 8px; }
        .jj-footer__social {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(10,15,28,0.08); color: rgba(10,15,28,0.6);
          text-decoration: none; transition: background 0.2s, color 0.2s;
        }
        .jj-footer__social:hover { background: #0A0F1C; color: #8DC63F; }
      `}</style>
    </footer>
  );
}

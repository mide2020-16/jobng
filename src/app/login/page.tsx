"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  FiPhone,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/brand/Logo";

const PIN_LENGTH = 4;

const countryCodes = [
  { code: "+234", flag: "🇳🇬", name: "NG" },
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+27", flag: "🇿🇦", name: "ZA" },
  { code: "+254", flag: "🇰🇪", name: "KE" },
];

function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryChange,
}: {
  value: string;
  onChange: (v: string) => void;
  countryCode: string;
  onCountryChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = countryCodes.find((c) => c.code === countryCode) ?? countryCodes[0];

  return (
    <div className="jj-login-field">
      <button type="button" className="jj-login-field__cc" onClick={() => setOpen(!open)}>
        <span>{selected.flag}</span>
        <span>{selected.code}</span>
        <FiChevronDown size={12} className={open ? "jj-login-field__chev--open" : ""} />
      </button>
      {open && (
        <div className="jj-login-field__dropdown">
          {countryCodes.map((c) => (
            <button
              key={c.code}
              type="button"
              className={`jj-login-field__option ${countryCode === c.code ? "jj-login-field__option--active" : ""}`}
              onClick={() => { onCountryChange(c.code); setOpen(false); }}
            >
              <span>{c.flag}</span>
              <span>{c.code}</span>
              <span className="jj-login-field__option-name">{c.name}</span>
            </button>
          ))}
        </div>
      )}
      <div className="jj-login-field__input-wrap">
        <FiPhone size={15} className="jj-login-field__icon" />
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          placeholder="806 000 0000"
          maxLength={11}
          className="jj-login-field__input"
        />
      </div>
    </div>
  );
}

function PinInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="jj-login-field jj-login-field--pin">
        <input
          required
          type={show ? "text" : "password"}
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, PIN_LENGTH))}
          placeholder="••••"
          maxLength={PIN_LENGTH}
          className="jj-login-field__input jj-login-field__input--pin"
          autoComplete="one-time-code"
        />
        <button type="button" className="jj-login-field__toggle" onClick={() => setShow(!show)} aria-label={show ? "Hide PIN" : "Show PIN"}>
          {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
      {/* <div className="jj-login-pin-dots" aria-hidden>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <span key={i} className={`jj-login-pin-dot ${i < value.length ? "jj-login-pin-dot--filled" : ""}`} />
        ))}
      </div> */}
      <p className="jj-login-pin-hint">4-digit PIN from your *7098# subscription</p>
    </div>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/jobs";
  const { setSession } = useAuth();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginCountry, setLoginCountry] = useState("+234");
  const [loginPin, setLoginPin] = useState("");

  const canSubmit = loginPhone.length >= 7 && loginPin.length === PIN_LENGTH && !loading;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (loginPin.length !== PIN_LENGTH) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: loginPhone, pin: loginPin, countryCode: loginCountry }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Invalid phone or PIN.");
        return;
      }
      setSession(data.token, data.phone);
      setSuccess(true);
      setTimeout(() => router.push(callbackUrl), 800);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="jj-login-page">
        <div className="jj-login-card jj-login-card--success">
          <div className="jj-login-success-icon">
            <FiCheckCircle size={32} />
          </div>
          <h2 className="jj-login-success-title">You&apos;re in!</h2>
          <p className="jj-login-success-sub">Welcome back. Redirecting you to jobs…</p>
          <Link href="/jobs" className="jj-btn jj-btn--gold" style={{ padding: "12px 28px" }}>
            Browse Jobs <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="jj-login-page">
      <div className="jj-login-split">
        {/* Left panel — brand */}
        <div className="jj-login-panel jj-login-panel--brand">
          <div className="jj-login-panel__grid" aria-hidden />
          <div className="jj-login-panel__content">
            <Logo variant="dark" size="lg" href="/" />
            <h1 className="jj-login-panel__title">
              Find your next role<br />
              <span>in Nigeria.</span>
            </h1>
            <p className="jj-login-panel__sub">
              Sign in with the phone number and PIN you set when you subscribed via USSD.
            </p>
            <div className="jj-login-panel__ussd">
              <span className="jj-login-panel__ussd-code">*7098#</span>
              <span className="jj-login-panel__ussd-label">Subscribe on any network</span>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="jj-login-panel jj-login-panel--form">
          <div className="jj-login-form-wrap">
            <div className="jj-login-form-head">
              <h2>Welcome back</h2>
              <p>Enter your phone number and 4-digit PIN</p>
            </div>

            {error && <div className="jj-login-error">{error}</div>}

            <form onSubmit={handleLogin} className="jj-login-form">
              <div className="jj-login-form-group">
                <label className="jj-login-label">Phone number</label>
                <PhoneInput
                  value={loginPhone}
                  onChange={setLoginPhone}
                  countryCode={loginCountry}
                  onCountryChange={setLoginCountry}
                />
              </div>

              <div className="jj-login-form-group">
                <label className="jj-login-label">PIN</label>
                <PinInput value={loginPin} onChange={setLoginPin} />
              </div>

              <div className="jj-login-form-row">
                <label className="jj-login-checkbox">
                  <input type="checkbox" />
                  Keep me signed in
                </label>
                <Link href="/forgot-password" className="jj-login-forgot">
                  Forgot PIN?
                </Link>
              </div>

              <button type="submit" disabled={!canSubmit} className="jj-btn jj-btn--gold jj-login-submit">
                {loading ? (
                  <>
                    <span className="jj-login-spinner" /> Signing in…
                  </>
                ) : (
                  <>Sign in <FiArrowRight size={16} /></>
                )}
              </button>
            </form>

            <div className="jj-login-subscribe">
              <p className="jj-login-subscribe__title">New to JustJobNG?</p>
              <p className="jj-login-subscribe__text">
                Dial <strong>*7098#</strong> on your phone to subscribe, then sign in with the same number and PIN.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="jj-login-page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="jj-loader jj-loader--compact">
            <span className="jj-loader__ring jj-loader__ring--compact" />
            <span className="jj-loader__label">Loading</span>
          </span>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}

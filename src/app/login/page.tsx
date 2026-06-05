"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  FiBriefcase, FiPhone, FiCheckCircle, FiEye, FiEyeOff, FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

type Tab = "login" | "register";

const countryCodes = [
  { code: "+234", flag: "🇳🇬", name: "NG" },
  { code: "+1",   flag: "🇺🇸", name: "US" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+27",  flag: "🇿🇦", name: "ZA" },
  { code: "+254", flag: "🇰🇪", name: "KE" },
];

function PhoneInput({
  value, onChange, countryCode, onCountryChange,
}: {
  value: string;
  onChange: (v: string) => void;
  countryCode: string;
  onCountryChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = countryCodes.find((c) => c.code === countryCode) ?? countryCodes[0];

  return (
    <div style={{ display: "flex", border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "visible", position: "relative" }}>
      {/* Country picker */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: "0 12px", background: "#f8fafc",
          border: "none", borderRight: "1.5px solid #e2e8f0",
          cursor: "pointer", fontSize: 14, color: "#374151",
          flexShrink: 0, borderRadius: "10px 0 0 10px",
          minWidth: 80,
        }}
      >
        <span style={{ fontSize: 18 }}>{selected.flag}</span>
        <span style={{ fontWeight: 600 }}>{selected.code}</span>
        <FiChevronDown size={12} style={{ color: "#9ca3af", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0,
            background: "#fff", border: "1.5px solid #e2e8f0",
            borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            zIndex: 100, minWidth: 180, overflow: "hidden",
          }}
        >
          {countryCodes.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => { onCountryChange(c.code); setOpen(false); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", background: countryCode === c.code ? "#eff6ff" : "transparent",
                border: "none", cursor: "pointer", fontSize: 14, color: "#374151",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 18 }}>{c.flag}</span>
              <span style={{ fontWeight: 600 }}>{c.code}</span>
              <span style={{ color: "#9ca3af" }}>{c.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Phone number input */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <FiPhone style={{ color: "#9ca3af", marginLeft: 12, flexShrink: 0 }} size={15} />
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          placeholder="Phone number"
          maxLength={11}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            padding: "12px 14px 12px 8px", fontSize: 14, color: "#374151",
          }}
        />
      </div>
    </div>
  );
}

function PinInput({
  value, onChange, label, placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
        <input
          required
          type={show ? "text" : "password"}
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder={placeholder ?? "Enter your PIN"}
          maxLength={6}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            padding: "12px 14px", fontSize: 18, letterSpacing: "0.3em",
            color: "#111827",
          }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{ background: "none", border: "none", padding: "0 14px", cursor: "pointer", color: "#9ca3af" }}
        >
          {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
      {/* PIN dots preview */}
      <div style={{ display: "flex", gap: 8, marginTop: 8, paddingLeft: 2 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10, height: 10, borderRadius: "50%",
              background: i < value.length ? "#1967D2" : "#e5e7eb",
              transition: "background 0.15s",
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>
        6-digit numeric PIN
      </p>
    </div>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/jobs";
  const { setSession } = useAuth();

  const [tab, setTab] = useState<Tab>("login");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginPhone, setLoginPhone] = useState("");
  const [loginCountry, setLoginCountry] = useState("+234");
  const [loginPin, setLoginPin] = useState("");

  const [regPhone, setRegPhone] = useState("");
  const [regCountry, setRegCountry] = useState("+234");
  const [regPin, setRegPin] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regTerms, setRegTerms] = useState(false);
  const [pinError, setPinError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (loginPin.length < 4) return;
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (regPin.length < 4) { setPinError("PIN must be at least 4 digits"); return; }
    if (regPin !== regConfirm) { setPinError("PINs do not match"); return; }
    if (!regTerms) { setError("Please accept the terms."); return; }
    setPinError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: regPhone,
          pin: regPin,
          confirmPin: regConfirm,
          countryCode: regCountry,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Could not create account.");
        return;
      }
      setTab("login");
      setLoginPhone(regPhone);
      setLoginCountry(regCountry);
      setError("");
      alert("Account created! Sign in with your PIN.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ─────────────────────── */
  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px" }}>
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 48, maxWidth: 400, width: "100%", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <FiCheckCircle style={{ color: "#16a34a", fontSize: 30 }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
            {tab === "login" ? "Logged In!" : "Account Created!"}
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>
            {tab === "login"
              ? "Welcome back! You can now browse jobs and manage applications."
              : "Your account is ready. Start exploring thousands of jobs now."}
          </p>
          <Link href="/jobs" style={{ display: "inline-block", background: "#1967D2", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 32px", borderRadius: 10, textDecoration: "none" }}>
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  const inputLabel: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 16px 48px" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, background: "#1967D2", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiBriefcase style={{ color: "#fff", fontSize: 20 }} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>JustJobNG</span>
          </Link>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          {/* Tabs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1.5px solid #e5e7eb" }}>
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "16px", border: "none", background: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 700,
                  color: tab === t ? "#1967D2" : "#9ca3af",
                  borderBottom: tab === t ? "2px solid #1967D2" : "2px solid transparent",
                  textTransform: "capitalize",
                }}
              >
                {t === "login" ? "Login" : "Create Account"}
              </button>
            ))}
          </div>

          <div style={{ padding: 28 }}>
            {/* ── LOGIN ─────────────────────────────── */}
            {tab === "login" && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 4 }}>Welcome back</h2>
                <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>Enter your phone number and PIN to continue</p>

                {error && (
                  <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={inputLabel}>Phone Number</label>
                    <PhoneInput
                      value={loginPhone}
                      onChange={setLoginPhone}
                      countryCode={loginCountry}
                      onCountryChange={setLoginCountry}
                    />
                  </div>

                  <PinInput value={loginPin} onChange={setLoginPin} label="PIN" placeholder="••••••" />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b7280", cursor: "pointer" }}>
                      <input type="checkbox" style={{ width: 15, height: 15, accentColor: "#1967D2" }} />
                      Keep me signed in
                    </label>
                    <Link href="/forgot-password" style={{ color: "#1967D2", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                      Forgot PIN?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || loginPhone.length < 7 || loginPin.length < 4}
                    style={{
                      background: loading || loginPhone.length < 7 || loginPin.length < 4 ? "#93c5fd" : "#1967D2",
                      color: "#fff", border: "none", borderRadius: 12,
                      padding: "14px", fontSize: 15, fontWeight: 700,
                      cursor: loading || loginPhone.length < 7 || loginPin.length < 4 ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    {loading
                      ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Logging in...</>
                      : "Login"}
                  </button>
                </form>
              </>
            )}

            {/* ── REGISTER ──────────────────────────── */}
            {tab === "register" && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 4 }}>Create your account</h2>
                <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>Sign up with your phone number and a secure PIN</p>

                {error && (
                  <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={inputLabel}>Phone Number</label>
                    <PhoneInput
                      value={regPhone}
                      onChange={setRegPhone}
                      countryCode={regCountry}
                      onCountryChange={setRegCountry}
                    />
                  </div>

                  {/* Create PIN */}
                  <PinInput value={regPin} onChange={setRegPin} label="Create a PIN" placeholder="Choose 6 digits" />

                  {/* Confirm PIN */}
                  <div>
                    <label style={inputLabel}>Confirm PIN</label>
                    <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${pinError ? "#fca5a5" : "#e2e8f0"}`, borderRadius: 12, overflow: "hidden" }}>
                      <input
                        required
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={regConfirm}
                        onChange={(e) => { setRegConfirm(e.target.value.replace(/\D/g, "").slice(0, 6)); setPinError(""); }}
                        placeholder="Re-enter your PIN"
                        maxLength={6}
                        style={{ flex: 1, border: "none", outline: "none", padding: "12px 14px", fontSize: 18, letterSpacing: "0.3em", color: "#111827", background: "transparent" }}
                      />
                    </div>
                    {pinError && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 6 }}>{pinError}</p>}
                  </div>

                  {/* Terms */}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#6b7280", cursor: "pointer", lineHeight: 1.5 }}>
                    <input
                      required
                      type="checkbox"
                      checked={regTerms}
                      onChange={(e) => setRegTerms(e.target.checked)}
                      style={{ width: 15, height: 15, marginTop: 1, accentColor: "#1967D2", flexShrink: 0 }}
                    />
                    <span>
                      I accept the{" "}
                      <a href="#" style={{ color: "#1967D2", fontWeight: 600 }}>Terms & Conditions</a>
                      {" "}and{" "}
                      <a href="#" style={{ color: "#1967D2", fontWeight: 600 }}>Privacy Policy</a>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? "#93c5fd" : "#1967D2",
                      color: "#fff", border: "none", borderRadius: 12,
                      padding: "14px", fontSize: 15, fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    {loading
                      ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Creating account...</>
                      : "Create account"}
                  </button>
                </form>
              </>
            )}

            <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 20 }}>
              {tab === "login" ? (
                <>Don&apos;t have an account?{" "}
                  <button onClick={() => setTab("register")} style={{ background: "none", border: "none", color: "#1967D2", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                    Register
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button onClick={() => setTab("login")} style={{ background: "none", border: "none", color: "#1967D2", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: 80, display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>
        Loading…
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}

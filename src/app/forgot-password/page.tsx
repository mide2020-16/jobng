"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiCheckCircle, FiPhone, FiLock, FiArrowLeft } from "react-icons/fi";
import { normalizeNigerianPhone } from "@/lib/phone";

type Step = "request" | "verify";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("request");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const normalizedPreview = normalizeNigerianPhone(phone);

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const normalized = normalizeNigerianPhone(phone);
    if (!/^234\d{10}$/.test(normalized)) {
      setError("Enter a valid Nigerian phone number, e.g. 08012345678.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Could not send reset code.");
        return;
      }
      setStep("verify");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const normalized = normalizeNigerianPhone(phone);
    if (!/^\d{4,6}$/.test(pin)) {
      setError("Enter the 4–6 digit code from SMS.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized, pin }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Invalid code. Try again.");
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", paddingTop: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 16px" }}>
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 48, maxWidth: 400, width: "100%", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <FiCheckCircle style={{ color: "#16a34a", fontSize: 30 }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 8 }}>PIN reset!</h2>
          <p style={{ fontSize: 14, color: "#6b7280" }}>Redirecting you to sign in…</p>
        </div>
      </div>
    );
  }

  const inputLabel: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "96px 16px 48px" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 40, height: 40, background: "#00863F", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FiBriefcase style={{ color: "#fff", fontSize: 20 }} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>JustJobNG</span>
          </Link>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 4 }}>
            {step === "request" ? "Forgot your PIN?" : "Enter reset code"}
          </h2>
          <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>
            {step === "request"
              ? "We'll text a reset code to your phone number."
              : `Code sent to ${normalizedPreview}`}
          </p>

          {error && (
            <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          {step === "request" ? (
            <form onSubmit={handleRequest} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={inputLabel}>Phone number</label>
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                  <FiPhone style={{ color: "#9ca3af", marginLeft: 12, flexShrink: 0 }} size={15} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="08012345678"
                    required
                    style={{ flex: 1, border: "none", outline: "none", padding: "12px 14px", fontSize: 14, color: "#374151", background: "transparent" }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? "#6CC04A" : "#00863F",
                  color: "#fff", border: "none", borderRadius: 12, padding: "14px",
                  fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Sending…" : "Send reset code"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={inputLabel}>Reset code</label>
                <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #e2e8f0", borderRadius: 12, overflow: "hidden" }}>
                  <FiLock style={{ color: "#9ca3af", marginLeft: 12, flexShrink: 0 }} size={15} />
                  <input
                    type="password"
                    inputMode="numeric"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="4-digit code"
                    maxLength={4}
                    required
                    style={{ flex: 1, border: "none", outline: "none", padding: "12px 14px", fontSize: 18, letterSpacing: "0.2em", color: "#111827", background: "transparent" }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: loading ? "#6CC04A" : "#00863F",
                  color: "#fff", border: "none", borderRadius: 12, padding: "14px",
                  fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Resetting…" : "Reset PIN"}
              </button>
              <button
                type="button"
                onClick={() => { setStep("request"); setPin(""); setError(""); }}
                style={{ background: "none", border: "none", color: "#00863F", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                Use a different number
              </button>
            </form>
          )}

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", textDecoration: "none" }}>
              <FiArrowLeft size={14} /> Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

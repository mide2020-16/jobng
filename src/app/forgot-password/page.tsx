"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { FiPhone, FiCheckCircle, FiEye, FiEyeOff, FiChevronDown, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Logo from "@/components/brand/Logo";
import { OtpInput } from "@/components/auth/OTPInput";

const PIN_LENGTH = 4;
export const OTP_LENGTH = 6;

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

function PinInput({ value, onChange, placeholder = "••••" }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
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
          placeholder={placeholder}
          maxLength={PIN_LENGTH}
          className="jj-login-field__input jj-login-field__input--pin"
          autoComplete="one-time-code"
        />
        <button type="button" className="jj-login-field__toggle" onClick={() => setShow(!show)} aria-label={show ? "Hide PIN" : "Show PIN"}>
          {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
    </div>
  );
}


export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");

  // Step 1 state
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+234");

  // Step 2 state
  const [otp, setOtp] = useState("");

  // Step 3 state
  const [pin, setPin] = useState("");

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 7) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, countryCode }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to request reset");
        return;
      }

      setStep(2);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== OTP_LENGTH) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, countryCode, otp }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid or expired code");
        return;
      }

      setStep(3);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, countryCode }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to resend code");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleResetPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== PIN_LENGTH) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pin, countryCode }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Failed to reset PIN");
        return;
      }

      setStep(4);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 4) {
    return (
      <div className="jj-login-page">
        <div className="jj-login-card jj-login-card--success">
          <div className="jj-login-success-icon">
            <FiCheckCircle size={32} />
          </div>
          <h2 className="jj-login-success-title">PIN Reset!</h2>
          <p className="jj-login-success-sub">Your new PIN has been set successfully.</p>
          <Link href="/login" className="jj-btn jj-btn--gold py-3 px-7">
            Back to Login <FiArrowRight size={16} />
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
              Reset your PIN<br />
              <span>securely.</span>
            </h1>
            <p className="jj-login-panel__sub">
              Enter your registered phone number, and we&apos;ll help you securely reset your 4-digit PIN.
            </p>
            <div className="jj-login-panel__ussd">
              <span className="jj-login-panel__ussd-code">*7098#</span>
              <span className="jj-login-panel__ussd-label">Works on any network</span>
            </div>
          </div>
        </div>
        {/* Right panel — form */}
        <div className="jj-login-panel jj-login-panel--form">
          <div className="jj-login-form-wrap">
            <Link href="/login" className="inline-flex items-center gap-2 text-(--text-muted) text-sm font-semibold no-underline mb-8 hover:text-(--ink) transition-colors">
              <FiArrowLeft size={16} /> Back to Login
            </Link>
            <div className="jj-login-form-head">
              <h2>
                {step === 1 ? "Forgot your PIN?" : step === 2 ? "Verify it's you" : "Enter new PIN"}
              </h2>
              <p>
                {step === 1
                  ? "Enter your phone number to continue"
                  : step === 2
                  ? `We've sent a 6-digit code via SMS to ${countryCode} ${phone}.`
                  : "Enter your new 4-digit PIN."}
              </p>
            </div>
            {error && <div className="jj-login-error">{error}</div>}
            {step === 1 && (
              <form onSubmit={handleResetRequest} className="jj-login-form">
                <div className="jj-login-form-group">
                  <label className="jj-login-label">Phone number</label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    countryCode={countryCode}
                    onCountryChange={setCountryCode}
                  />
                </div>
                <button type="submit" disabled={phone.length < 7 || loading} className="jj-btn jj-btn--gold jj-login-submit">
                  {loading ? (
                    <><span className="jj-login-spinner" /> Processing…</>
                  ) : (
                    <>Send Reset Instructions <FiArrowRight size={16} /></>
                  )}
                </button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="jj-login-form">
                <div className="jj-login-form-group">
                  <label className="jj-login-label">Verification code</label>
                  <OtpInput value={otp} onChange={setOtp} />
                </div>
                <button type="submit" disabled={otp.length !== OTP_LENGTH || loading} className="jj-btn jj-btn--gold jj-login-submit">
                  {loading ? (
                    <><span className="jj-login-spinner" /> Verifying…</>
                  ) : (
                    <>Verify Code <FiArrowRight size={16} /></>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resending}
                  className="inline-flex items-center gap-2 text-(--text-muted) text-sm font-semibold mt-4 hover:text-(--ink) transition-colors"
                >
                  {resending ? "Resending…" : "Didn't get a code? Resend"}
                </button>
              </form>
            )}
            {step === 3 && (
              <form onSubmit={handleResetPin} className="jj-login-form">
                <div className="jj-login-form-group">
                  <label className="jj-login-label">New 4-digit PIN</label>
                  <PinInput value={pin} onChange={setPin} placeholder="Enter new PIN" />
                </div>
                <button type="submit" disabled={pin.length !== PIN_LENGTH || loading} className="jj-btn jj-btn--gold jj-login-submit">
                  {loading ? (
                    <><span className="jj-login-spinner" /> Resetting PIN…</>
                  ) : (
                    <>Reset PIN <FiArrowRight size={16} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

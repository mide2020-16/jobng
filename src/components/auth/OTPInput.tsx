import { OTP_LENGTH } from "@/app/forgot-password/page";
import { useRef } from "react";

export function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "");

  const focusBox = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const setDigitAt = (index: number, digit: string) => {
    const next = value.split("");
    // Pad so we can safely write at `index` even if value is shorter
    while (next.length < index) next.push("");
    next[index] = digit;
    onChange(next.join("").slice(0, OTP_LENGTH));
  };

  const handleChange = (index: number, raw: string) => {
    const clean = raw.replace(/\D/g, "");

    if (!clean) {
      // Deleting via selecting-and-typing empty, or a non-digit was entered
      setDigitAt(index, "");
      return;
    }

    if (clean.length > 1) {
      // User typed/pasted multiple digits into one box (some mobile keyboards do this)
      const next = value.split("");
      for (let i = 0; i < clean.length && index + i < OTP_LENGTH; i++) {
        next[index + i] = clean[i];
      }
      const merged = next.join("").slice(0, OTP_LENGTH);
      onChange(merged);
      const nextIndex = Math.min(index + clean.length, OTP_LENGTH - 1);
      focusBox(nextIndex);
      return;
    }

    // Single digit typed
    setDigitAt(index, clean);
    if (index < OTP_LENGTH - 1) {
      focusBox(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        // Clear current box, stay put
        setDigitAt(index, "");
      } else if (index > 0) {
        // Already empty, move back and clear previous
        setDigitAt(index - 1, "");
        focusBox(index - 1);
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusBox(index - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      focusBox(index + 1);
      e.preventDefault();
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const next = value.split("");
    for (let i = 0; i < pasted.length && index + i < OTP_LENGTH; i++) {
      next[index + i] = pasted[i];
    }
    const merged = next.join("").slice(0, OTP_LENGTH);
    onChange(merged);

    const lastFilled = Math.min(index + pasted.length, OTP_LENGTH - 1);
    focusBox(lastFilled);
  }
    return (
    <div className="jj-login-field jj-login-field--otp jj-otp-group">
      {digits.map((digit, index) => (
        <input
          title="otp code"
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          required={index === 0}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.target.select()}
          className="jj-login-field__input jj-login-field__input--pin jj-otp-box"
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}
"use client";

import React, { useState } from "react";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    number: "",
    pin: "",
    confirm_pin: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when the user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic frontend validation
    if (!formData.number || !formData.pin || !formData.confirm_pin) {
      setError("Please fill out all fields.");
      return;
    }

    if (formData.pin !== formData.confirm_pin) {
      setError("PINs do not match. Please try again.");
      return;
    }

    if (formData.pin.length < 4) {
      setError("PIN must be at least 4 digits.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: formData.number,
          pin: formData.pin,
          confirm_pin: formData.confirm_pin,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Optional: clear form
        setFormData({ number: "", pin: "", confirm_pin: "" });
      } else {
        // Handle 400 Bad Request or other errors
        const data = await response.json().catch(() => ({}));
        setError(data.message || "Failed to change password. Please check your details.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── SUCCESS STATE ──────────────────────────────────────
  if (success) {
    return (
      <div className="jj-login-card--success animate-fade-in-up">
        <div className="jj-login-success-icon">
          {/* Simple SVG checkmark */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="jj-login-success-title">PIN Changed!</h2>
        <p className="jj-login-success-sub">
          Your PIN has been successfully updated. You can now use it to log in.
        </p>
        <button 
        type="button"
          onClick={() => window.location.href = '/login'} 
          className="jj-btn jj-btn--gold jj-login-submit"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // ── FORM STATE ─────────────────────────────────────────
  return (
    <div className="jj-login-form-wrap mx-auto animate-fade-in-up">
      <div className="jj-login-form-head">
        <h2>Change PIN</h2>
        <p>Update the access PIN for your JustJobNG account.</p>
      </div>

      {error && (
        <div className="jj-login-error animate-fade-in-up">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="jj-login-form">
        {/* Phone Number Field */}
        <div className="jj-login-form-group">
          <label htmlFor="number" className="jj-login-label">
            Phone Number
          </label>
          <div className="jj-login-field">
            <div className="jj-login-field__input-wrap">
              <input
                id="number"
                name="number"
                type="tel"
                placeholder="e.g. 08012345678"
                value={formData.number}
                onChange={handleChange}
                className="jj-login-field__input"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* New PIN Field */}
        <div className="jj-login-form-group">
          <label htmlFor="pin" className="jj-login-label">
            New PIN
          </label>
          <div className="jj-login-field jj-login-field--pin">
            <div className="jj-login-field__input-wrap">
              <input
                id="pin"
                name="pin"
                type="password"
                placeholder="••••"
                maxLength={4}
                value={formData.pin}
                onChange={handleChange}
                className="jj-login-field__input jj-login-field__input--pin tracking-widest"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Confirm PIN Field */}
        <div className="jj-login-form-group">
          <label htmlFor="confirm_pin" className="jj-login-label">
            Confirm New PIN
          </label>
          <div className="jj-login-field jj-login-field--pin">
            <div className="jj-login-field__input-wrap">
              <input
                id="confirm_pin"
                name="confirm_pin"
                type="password"
                placeholder="••••"
                maxLength={4}
                value={formData.confirm_pin}
                onChange={handleChange}
                className="jj-login-field__input jj-login-field__input--pin tracking-widest"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="jj-btn jj-btn--gold jj-login-submit mt-4"
        >
          {loading ? (
            <span className="jj-login-spinner"></span>
          ) : (
            "Update PIN"
          )}
        </button>
      </form>
    </div>
  );
}
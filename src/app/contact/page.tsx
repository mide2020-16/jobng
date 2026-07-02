"use client";

import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheckCircle, FiLoader } from "react-icons/fi";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error || "An error occurred");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            Get In Touch
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto">
            We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="container-xl -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          
          {/* Info Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="jj-card p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-muted)] flex items-center justify-center text-[var(--gold)] shrink-0">
                <FiMapPin size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-faint)] uppercase tracking-widest mb-1">Office</h4>
                <p className="text-[var(--ink)] font-semibold text-base m-0">14 Admiralty Way,<br />Lekki Phase 1, Lagos</p>
              </div>
            </div>
            
            <div className="jj-card p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-muted)] flex items-center justify-center text-[var(--gold)] shrink-0">
                <FiPhone size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-faint)] uppercase tracking-widest mb-1">Phone & USSD</h4>
                <p className="text-[var(--ink)] font-semibold text-base m-0">*7098#<br />+234 800 JUSTJOB</p>
              </div>
            </div>

            <div className="jj-card p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-muted)] flex items-center justify-center text-[var(--gold)] shrink-0">
                <FiMail size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-faint)] uppercase tracking-widest mb-1">Email</h4>
                <p className="text-[var(--ink)] font-semibold text-base m-0">hello@justjobng.com</p>
              </div>
            </div>

            <div className="jj-card p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-[var(--gold-muted)] flex items-center justify-center text-[var(--gold)] shrink-0">
                <FiClock size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-faint)] uppercase tracking-widest mb-1">Hours</h4>
                <p className="text-[var(--ink)] font-semibold text-base m-0">Mon-Fri: 8am - 6pm WAT<br />Sat-Sun: Closed</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="jj-card p-10">
            <h2 className="text-2xl font-extrabold text-[var(--ink)] mb-8">Send a Message</h2>
            
            {status === "success" ? (
              <div className="text-center py-12">
                <FiCheckCircle size={64} className="text-[var(--gold)] mx-auto mb-6" />
                <h3 className="text-2xl font-extrabold text-[var(--ink)] mb-2">Message Sent!</h3>
                <p className="text-[var(--text-muted)]">Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="jj-btn jj-btn--ghost mt-8"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Full Name</label>
                    <input 
                      name="name" 
                      required 
                      className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]"
                      placeholder="e.g. Adewale Okafor" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Email Address</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]"
                      placeholder="e.g. adewale@example.com" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Subject</label>
                  <input 
                    name="subject" 
                    required 
                    className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]"
                    placeholder="How can we help you?" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Message</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={6} 
                    className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all resize-y bg-[var(--surface-elevated)]"
                    placeholder="Write your message here..." 
                  />
                </div>

                {status === "error" && (
                  <div className="bg-[#FEE2E2] text-[#991B1B] p-4 rounded-[var(--radius-sm)] text-sm font-semibold">
                    {errorMsg}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="jj-btn jj-btn--gold p-4 text-base mt-2 flex justify-center w-full"
                >
                  {status === "loading" ? <FiLoader className="animate-spin" size={20} /> : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

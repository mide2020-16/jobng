"use client";
import { useState } from "react";
import { FiMapPin, FiSend, FiCheckCircle, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Get In Touch</h1>
          <p className="text-green-200">We&apos;d love to hear from you. Send us a message and we&apos;ll respond within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <FiMapPin className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Our Office</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    14 Admiralty Way, Lekki Phase 1,<br />Lagos, Nigeria
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <FiPhone className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Phone / USSD</p>
                  <p className="text-sm text-gray-500">
                    +234 (0) 800 000 7098<br />
                    <span className="font-semibold text-green-700">*7098#</span> (MTN USSD)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <FiMail className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Email</p>
                  <p className="text-sm text-gray-500">
                    hello@justjobng.com<br />
                    support@justjobng.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                  <FiClock className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Support Hours</p>
                  <p className="text-sm text-gray-500">
                    Mon – Fri: 8:00 AM – 6:00 PM (WAT)<br />
                    Sat: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                      <input
                        required
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</span>
                      ) : (
                        <><FiSend size={14} /> Send Message</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import Link from "next/link";

const faqs = [
  {
    category: "For Job Seekers",
    items: [
      {
        q: "Is JustJobNG free to use for job seekers?",
        a: "Browsing all job listings is completely free. To unlock features like unlimited applications and SMS job alerts, subscribe via USSD for just ₦500/month. Simply dial *7098# on any MTN line to get started.",
      },
      {
        q: "How do I subscribe to JustJobNG?",
        a: "Dial *7098# on your MTN phone, follow the prompts to select a plan, and you will be subscribed instantly. No internet connection or bank card required — it is all done over USSD.",
      },
      {
        q: "How do I log in to JustJobNG?",
        a: "After subscribing via *7098#, you receive a unique 4-digit SMS PIN on your registered phone number. Enter that PIN on the login page along with your phone number to access your account. No email or password needed.",
      },
      {
        q: "I forgot my PIN. How do I reset it?",
        a: "Dial *7098# again and select 'Forgot PIN' from the menu. A new PIN will be sent to your registered phone number via SMS. Alternatively, visit the 'Forgot PIN' link on the login page and follow the steps.",
      },
      {
        q: "How do job alerts work?",
        a: "Once subscribed, you will receive SMS alerts whenever new jobs matching your selected categories are posted. You can manage your alert preferences by dialling *7098# and selecting 'Manage Alerts'.",
      },
      {
        q: "Can I apply for a job without a smartphone?",
        a: "Yes! JustJobNG is designed to work even on basic feature phones. You can browse job listings and get job details sent to you via SMS after subscribing through *7098#.",
      },
    ],
  },
  {
    category: "For Employers",
    items: [
      {
        q: "How do I post a job on JustJobNG?",
        a: "Click 'Post a Job' in the navigation bar, register an employer account, fill in the job details, and choose a listing package. Your vacancy will go live within minutes after a quick review.",
      },
      {
        q: "How long does a job listing stay active?",
        a: "Listings are active for 30 days on the Starter plan (₦15,000/month) and 60 days on the Pro plan (₦35,000/month). You can renew at any time from your employer dashboard.",
      },
      {
        q: "Can I search for candidates?",
        a: "Yes! All paid employer plans include access to our growing candidate database. You can filter by skills, location, experience level, and availability to find qualified Nigerian talent.",
      },
      {
        q: "What payment methods do you accept for employer plans?",
        a: "We accept bank transfers (NEFT/NIP), Flutterwave, and Paystack for employer subscriptions. Contact us at hello@justjobng.com to arrange payment.",
      },
      {
        q: "Can I edit or delete my job listings?",
        a: "Yes. From your employer dashboard you can edit, pause, or delete any listing at any time. Changes appear on the site immediately.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    items: [
      {
        q: "What data does JustJobNG collect?",
        a: "We collect your phone number (used as your identity), selected job categories, and your subscription status. We never sell your personal information to third parties. Full details are in our Privacy Policy.",
      },
      {
        q: "Is my phone number visible to employers?",
        a: "Your phone number is only shared with an employer after you explicitly apply for their job. For applications, the employer receives only the details you include in your profile.",
      },
      {
        q: "Can I cancel my USSD subscription?",
        a: "Yes. Dial *7098# and select 'Cancel Subscription' at any time. You will retain access until the end of your current billing period. There are no cancellation fees.",
      },
      {
        q: "How do I delete my account?",
        a: "Send a deletion request to hello@justjobng.com from your registered contact. We will permanently remove your profile and all associated data within 5 business days.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden transition-all ${open ? "border-green-200 shadow-sm" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className={`text-sm font-semibold ${open ? "text-green-600" : "text-gray-800"}`}>{q}</span>
        <FiChevronDown className={`shrink-0 text-gray-400 transition-transform mt-0.5 ${open ? "rotate-180 text-green-500" : ""}`} size={16} />
      </button>
      {open && (
        <div className="px-5 pb-4 bg-green-50/30 border-t border-green-100">
          <p className="text-sm text-gray-600 leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", ...faqs.map((f) => f.category)];

  const filtered = faqs
    .filter((cat) => activeTab === "All" || cat.category === activeTab)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !search ||
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-14 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
          <p className="text-green-200 mb-7">Find answers to common questions about JustJobNG and the <strong className="text-white">*7098#</strong> subscription.</p>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 max-w-md mx-auto shadow-lg">
            <FiSearch className="text-green-500 shrink-0" size={16} />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-4 py-2 rounded-full font-medium transition-colors ${
                activeTab === tab
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-green-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🤔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((cat) => (
              <div key={cat.category}>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-green-600 rounded-full" />
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-14 bg-green-600 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-green-100 text-sm mb-5">
            Dial <strong className="text-white">*7098#</strong> for instant help, or contact our support team.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-green-600 font-bold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors text-sm"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}

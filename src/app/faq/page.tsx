"use client";
import { useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import Link from "next/link";

const faqs = [
  {
    category: "For Job Seekers",
    items: [
      { q: "Is JustJobNG free to use for job seekers?", a: "Yes! Creating a profile and browsing jobs is completely free. We also offer a Professional plan with premium features like unlimited applications and featured profile placement." },
      { q: "How do I apply for a job?", a: "Simply find a job you're interested in, click 'Apply Now', and follow the application process. You may need to create an account or log in before applying. Each employer may have their own specific requirements." },
      { q: "Can I upload my resume?", a: "Absolutely. Once you create a candidate profile, you can upload your resume and fill out your profile information. Employers can then find you through our candidate search feature." },
      { q: "How do job alerts work?", a: "You can set up job alerts based on keywords, location, and job type. We'll send you email notifications whenever new matching jobs are posted, so you never miss an opportunity." },
      { q: "How do I contact an employer directly?", a: "Some job listings allow direct messaging with employers. You can also apply through the platform and include a personalized cover letter. Premium users get priority placement in employer searches." },
    ],
  },
  {
    category: "For Employers",
    items: [
      { q: "How do I post a job on JustJobNG?", a: "Click 'Post a Job' in the navigation bar, create an employer account, fill out the job details, and choose your listing package. Your job will be live within minutes after review." },
      { q: "How long does a job listing stay active?", a: "Job listings are active for 30 days on the Starter plan and 60 days on the Pro plan. You can renew your listing at any time, and featured listings get extended visibility." },
      { q: "Can I search for candidates?", a: "Yes! All paid employer plans include access to our candidate database. You can search by skills, location, experience level, and availability to find the perfect match for your open positions." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through our payment provider." },
      { q: "Can I edit or delete my job listings?", a: "Yes, you can edit or delete any of your job listings from your employer dashboard at any time. Changes are reflected on the site immediately." },
    ],
  },
  {
    category: "Account & Privacy",
    items: [
      { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a password reset link within a few minutes. Check your spam folder if you don't see it." },
      { q: "How is my personal data used?", a: "We take privacy seriously. Your data is used only to facilitate the job matching process and improve our services. We never sell your personal information to third parties. Read our Privacy Policy for full details." },
      { q: "Can I delete my account?", a: "Yes, you can delete your account at any time from your account settings. This will permanently remove your profile and all associated data. Please note this action cannot be undone." },
      { q: "Is my information visible to everyone?", a: "By default, your candidate profile is visible to registered employers. You can adjust your privacy settings to control who can see your profile and contact information at any time." },
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
          <p className="text-green-200 mb-7">Find answers to common questions about JustJobNG.</p>
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
          <p className="text-green-100 text-sm mb-5">Can&apos;t find what you&apos;re looking for? Our support team is here to help.</p>
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

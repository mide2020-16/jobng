"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const faqData = [
  {
    category: "For Job Seekers",
    items: [
      { q: "How do I apply for jobs via USSD?", a: "Dial *7098# on your MTN line, select 'Find Jobs', and follow the prompts. You can browse by category or location and submit your profile directly." },
      { q: "Is the USSD service free?", a: "Browsing job titles is free. To view full details or apply, you need an active subscription which costs ₦100/week or ₦300/month." },
      { q: "Do I need a CV to apply?", a: "For USSD applications, we use your built-in profile as your CV. For website applications, some employers may request an external CV upload." },
    ]
  },
  {
    category: "For Employers",
    items: [
      { q: "How much does it cost to post a job?", a: "Standard job postings are ₦5,000 per listing. Premium listings with top placement and SMS alerts to candidates are ₦15,000." },
      { q: "How do I receive applications?", a: "Applications will be sent to your employer dashboard on the website, and you'll receive a daily summary via email." },
      { q: "Can I search the candidate database?", a: "Yes, Employers on the Premium or Enterprise plans get full access to search and filter our database of over 120,000 active candidates." },
    ]
  },
  {
    category: "Account & Privacy",
    items: [
      { q: "I forgot my 4-digit PIN. How do I reset it?", a: "Click on 'Forgot PIN' on the login page, enter your phone number, and we'll send you an SMS to reset it. You can also dial *7098# and select 'Account'." },
      { q: "Is my personal data safe?", a: "Yes. We use enterprise-grade encryption for all data. We never share your phone number with employers unless you explicitly apply to their job." },
    ]
  }
];

function FAQItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="jj-card mb-4 overflow-hidden">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full p-6 flex items-center justify-between bg-transparent border-none cursor-pointer text-left focus:outline-none"
      >
        <span className="text-lg font-extrabold text-[var(--ink)]">{q}</span>
        <FiChevronDown size={20} className={`text-[var(--text-muted)] transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      
      {open && (
        <div className="px-6 pb-6 bg-[var(--gold-muted)]">
          <p className="text-[var(--ink)] text-[15px] leading-relaxed pt-4 border-t border-[rgba(0,166,81,0.2)]">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "For Job Seekers", "For Employers", "Account & Privacy"];

  const filteredData = faqData.map(section => {
    return {
      category: section.category,
      items: section.items.filter(item => 
        (item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())) &&
        (activeTab === "All" || activeTab === section.category)
      )
    };
  }).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto mb-8">
            Everything you need to know about using JustJobNG on the web or via *7098#.
          </p>
          
          <div className="max-w-[500px] mx-auto relative">
            <FiSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 pr-4 pl-12 rounded-[var(--radius-sm)] border-none outline-none text-base shadow-[var(--shadow-sm)]"
            />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="container-xl mt-12 mb-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 text-sm font-bold rounded-[var(--radius-sm)] cursor-pointer transition-colors ${
                activeTab === cat 
                  ? 'bg-[var(--gold)] text-white border-none shadow-[var(--shadow-gold)]' 
                  : 'bg-[var(--surface-elevated)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--surface)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordions */}
      <section className="container-xl max-w-[800px] mx-auto">
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-extrabold text-[var(--ink)] mb-2">No results found</h3>
            <p className="text-[var(--text-muted)]">We couldn't find any questions matching "{search}"</p>
          </div>
        ) : (
          filteredData.map((section, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-xl font-extrabold text-[var(--ink)] mb-6 flex items-center gap-2.5">
                <span className="w-1 h-5 bg-[var(--gold)] rounded-sm inline-block" />
                {section.category}
              </h2>
              <div>
                {section.items.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <section className="bg-[var(--ink)] py-20 text-center mx-4 mt-12 rounded-[var(--radius-xl)]">
        <h2 className="text-[2rem] font-extrabold text-white mb-4 -tracking-[0.02em]">
          Still have questions?
        </h2>
        <p className="text-white/70 text-lg mb-8">
          Our support team is ready to help you.
        </p>
        <Link href="/contact" className="jj-btn jj-btn--gold px-8 py-3.5 text-base">
          Contact Support
        </Link>
      </section>
    </div>
  );
}

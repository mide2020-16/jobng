"use client";

import { useState } from "react";
import { FiSearch, FiBriefcase } from "react-icons/fi";
import { employers } from "@/data/employers";
import EmployerCard from "@/components/shared/EmployerCard";

export default function EmployersPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All Industries");

  const industries = ["All Industries", ...Array.from(new Set(employers.map(e => e.industry)))];

  const filteredEmployers = employers.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.industry.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industry === "All Industries" || e.industry === industry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            Browse Employers
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto">
            Discover top companies actively hiring across Nigeria
          </p>
        </div>
      </section>

      {/* Sticky Toolbar */}
      <div className="sticky top-[var(--nav-height)] z-30 bg-[var(--surface-elevated)] border-b border-[var(--border)] shadow-[var(--shadow-sm)]">
        <div className="container-xl flex flex-col gap-4 py-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-center max-w-[800px]">
            {/* Search */}
            <div className="relative flex-[1_1_300px]">
              <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
              <input 
                type="text"
                placeholder="Search companies or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pr-3.5 pl-9 rounded-[var(--radius-sm)] border border-[var(--border-strong)] outline-none bg-[var(--surface)] focus:border-[var(--gold)] focus:ring-[2px] focus:ring-[var(--gold-muted)] transition-all"
              />
            </div>

            {/* Dropdown */}
            <div className="relative flex-[1_1_200px]">
              <FiBriefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)] pointer-events-none" />
              <select value={industry} onChange={e => setIndustry(e.target.value)} className="w-full py-2.5 pr-3.5 pl-9 rounded-[var(--radius-sm)] border border-[var(--border-strong)] outline-none bg-[var(--surface)] appearance-none focus:border-[var(--gold)] focus:ring-[2px] focus:ring-[var(--gold-muted)] transition-all">
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <section className="container-xl mt-8">
        <div className="mb-8 text-[15px] font-semibold text-[var(--text-muted)]">
          Showing {filteredEmployers.length} company{filteredEmployers.length !== 1 ? 'ies' : 'y'}
        </div>

        {filteredEmployers.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-extrabold text-[var(--ink)] mb-2">No companies found</h3>
            <p className="text-[var(--text-muted)]">Try adjusting your search criteria or industry filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-w-[1000px]">
            {filteredEmployers.map(employer => (
              <EmployerCard key={employer.id} employer={employer} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

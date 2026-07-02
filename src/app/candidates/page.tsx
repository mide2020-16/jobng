"use client";

import { useState } from "react";
import { FiSearch, FiMapPin, FiGrid, FiList } from "react-icons/fi";
import { candidates } from "@/data/candidates";
import CandidateCard from "@/components/shared/CandidateCard";

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState("All Categories");
  const [availability, setAvailability] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const locations = ["All Locations", "New York", "Los Angeles", "Miami", "Remote", "Washington", "Florida", "Nevada"];
  const categories = ["All Categories", ...Array.from(new Set(candidates.map(c => c.category)))];

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    
    const matchesLocation = location === "All Locations" || c.location.includes(location);
    const matchesCategory = category === "All Categories" || c.category === category;
    const matchesAvailability = availability === "All" || c.availability === availability;

    return matchesSearch && matchesLocation && matchesCategory && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            Browse Candidates
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto">
            Discover talented professionals ready for their next opportunity
          </p>
        </div>
      </section>

      {/* Sticky Toolbar */}
      <div className="sticky top-[var(--nav-height)] z-30 bg-[var(--surface-elevated)] border-b border-[var(--border)] shadow-[var(--shadow-sm)]">
        <div className="container-xl flex flex-col gap-4 py-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-center">
            {/* Search */}
            <div className="relative flex-[1_1_250px]">
              <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
              <input 
                type="text"
                placeholder="Search by name, title, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-2.5 pr-3.5 pl-9 rounded-[var(--radius-sm)] border border-[var(--border-strong)] outline-none bg-[var(--surface)] focus:border-[var(--gold)] focus:ring-[2px] focus:ring-[var(--gold-muted)] transition-all"
              />
            </div>

            {/* Dropdowns */}
            <div className="relative flex-[1_1_150px]">
              <FiMapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-faint)] pointer-events-none" />
              <select value={location} onChange={e => setLocation(e.target.value)} className="w-full py-2.5 pr-3.5 pl-9 rounded-[var(--radius-sm)] border border-[var(--border-strong)] outline-none bg-[var(--surface)] appearance-none focus:border-[var(--gold)] focus:ring-[2px] focus:ring-[var(--gold-muted)] transition-all">
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <select value={category} onChange={e => setCategory(e.target.value)} className="flex-[1_1_150px] py-2.5 px-3.5 rounded-[var(--radius-sm)] border border-[var(--border-strong)] outline-none bg-[var(--surface)] appearance-none focus:border-[var(--gold)] focus:ring-[2px] focus:ring-[var(--gold-muted)] transition-all">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={availability} onChange={e => setAvailability(e.target.value)} className="flex-[1_1_150px] py-2.5 px-3.5 rounded-[var(--radius-sm)] border border-[var(--border-strong)] outline-none bg-[var(--surface)] appearance-none focus:border-[var(--gold)] focus:ring-[2px] focus:ring-[var(--gold-muted)] transition-all">
              <option value="All">All Availability</option>
              <option value="Available">Available</option>
              <option value="Open to Offers">Open to Offers</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
        </div>
      </div>

      <section className="container-xl mt-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="text-[15px] font-semibold text-[var(--text-muted)]">
            Showing {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''}
          </div>
          <div className="flex gap-2 bg-[var(--surface-elevated)] border border-[var(--border-strong)] rounded-[var(--radius-sm)] p-1">
            <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 rounded-[var(--radius-sm)] border-none cursor-pointer flex items-center gap-1.5 transition-colors ${viewMode === "grid" ? 'bg-[var(--gold-muted)] text-[var(--gold-hover)]' : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--ink)]'}`}>
              <FiGrid size={16} /> <span className="hidden sm:inline text-sm font-semibold">Grid</span>
            </button>
            <button onClick={() => setViewMode("list")} className={`px-3 py-1.5 rounded-[var(--radius-sm)] border-none cursor-pointer flex items-center gap-1.5 transition-colors ${viewMode === "list" ? 'bg-[var(--gold-muted)] text-[var(--gold-hover)]' : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--ink)]'}`}>
              <FiList size={16} /> <span className="hidden sm:inline text-sm font-semibold">List</span>
            </button>
          </div>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-extrabold text-[var(--ink)] mb-2">No candidates found</h3>
            <p className="text-[var(--text-muted)]">Try adjusting your search criteria or removing filters.</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? 'grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6' : 'flex flex-col gap-6'}>
            {filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} variant={viewMode} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
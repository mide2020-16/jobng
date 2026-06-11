"use client";
import { useState, useMemo } from "react";
import { FiSearch, FiMapPin, FiList, FiSquare } from "react-icons/fi";
import CandidateCard from "@/components/shared/CandidateCard";
import { candidates } from "@/data/candidates";

const locations = ["All Locations", "New York", "Los Angeles", "Miami", "Remote", "Washington", "Florida", "Nevada"];
const categories = ["All Categories", "Design", "Development", "Marketing", "Accounting / Finance", "Human Resource", "Health and Care", "Customer", "Project Management", "Automotive Jobs"];
const availability = ["All", "Available", "Open to Offers"];

export default function CandidatesPage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState("All Categories");
  const [avail, setAvail] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      const matchesKeyword = !keyword || c.name.toLowerCase().includes(keyword.toLowerCase()) || c.title.toLowerCase().includes(keyword.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(keyword.toLowerCase()));
      const matchesLocation = location === "All Locations" || c.location.toLowerCase().includes(location.toLowerCase());
      const matchesCategory = category === "All Categories" || c.category === category;
      const matchesAvail = avail === "All" || c.availability === avail;
      return matchesKeyword && matchesLocation && matchesCategory && matchesAvail;
    });
  }, [keyword, location, category, avail]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Browse Candidates</h1>
          <p className="text-green-200">Discover talented professionals ready for their next opportunity</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-[64px] lg:top-[80px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2.5">
              <FiSearch className="text-green-500 shrink-0" size={16} />
              <input type="text" placeholder="Name, title, skills..." value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full text-sm outline-none text-gray-700 placeholder-gray-400" />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 min-w-[150px]">
              <FiMapPin className="text-green-500 shrink-0" size={14} />
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-sm outline-none text-gray-700 bg-transparent">
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 min-w-[180px]">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full text-sm outline-none text-gray-700 bg-transparent">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 min-w-[140px]">
              <select value={avail} onChange={(e) => setAvail(e.target.value)} className="w-full text-sm outline-none text-gray-700 bg-transparent">
                {availability.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-900">{filtered.length}</span> candidates</p>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-green-600 text-white" : "text-gray-400 hover:text-gray-600"}`}><FiList size={14} /></button>
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-400 hover:text-gray-600"}`}><FiSquare size={14} /></button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No candidates found</h3>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((c) => <CandidateCard key={c.id} candidate={c} variant="grid" />)}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((c) => <CandidateCard key={c.id} candidate={c} variant="list" />)}
          </div>
        )}
      </div>
    </div>
  );
}

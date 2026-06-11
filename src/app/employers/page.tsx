"use client";
import { useState, useMemo } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import EmployerCard from "@/components/shared/EmployerCard";
import { employers } from "@/data/employers";

const industries = ["All Industries", "Design & Creative", "Healthcare", "Finance & Accounting", "Retail", "Marketing & Media", "Technology", "Human Resources", "Customer Service"];

export default function EmployersPage() {
  const [keyword, setKeyword] = useState("");
  const [industry, setIndustry] = useState("All Industries");

  const filtered = useMemo(() => {
    return employers.filter((e) => {
      const matchesKeyword = !keyword || e.name.toLowerCase().includes(keyword.toLowerCase()) || e.industry.toLowerCase().includes(keyword.toLowerCase());
      const matchesIndustry = industry === "All Industries" || e.industry === industry;
      return matchesKeyword && matchesIndustry;
    });
  }, [keyword, industry]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Browse Employers</h1>
          <p className="text-green-200">Discover top companies actively hiring talented professionals</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-100 sticky top-[64px] lg:top-[80px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2.5">
              <FiSearch className="text-green-500 shrink-0" size={16} />
              <input
                type="text"
                placeholder="Company name or industry..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full text-sm outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 min-w-[200px]">
              <FiMapPin className="text-green-500 shrink-0" size={14} />
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full text-sm outline-none text-gray-700 bg-transparent">
                {industries.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-5">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span> employers
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No employers found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((employer) => <EmployerCard key={employer.id} employer={employer} />)}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiGrid, FiX, FiList, FiSquare, FiLogIn } from "react-icons/fi";
import JobCard from "@/components/shared/JobCard";
import { authHeaders } from "@/lib/auth-client";
import type { ApiJob } from "@/lib/justjobApi";

function JobsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [keyword, setKeyword] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [needsAuth, setNeedsAuth] = useState(false);
  const [page, setPage] = useState(1);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    setNeedsAuth(false);
    try {
      const qs = new URLSearchParams();
      if (keyword) qs.set("search", keyword);
      if (category) qs.set("category", category);
      qs.set("page", String(page));
      qs.set("page_size", "20");

      const res = await fetch(`/api/jobs?${qs}`, { headers: authHeaders() });
      const data = await res.json();

      if (res.status === 401 || data.requiresAuth) {
        setNeedsAuth(true);
        setJobs([]);
        setTotal(0);
        return;
      }

      if (!data.ok) {
        setError(data.error ?? "Could not load jobs.");
        setJobs([]);
        return;
      }

      setJobs(data.items ?? []);
      setTotal(data.count ?? 0);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [keyword, category, page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const categories = Array.from(
    new Set(jobs.map((j) => j.category).filter(Boolean) as string[])
  ).sort();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-blue-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Browse Jobs</h1>
          <p className="text-blue-200 text-base">Live listings from the JustJobNG network</p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100 sticky top-[64px] lg:top-[80px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2.5">
              <FiSearch className="text-blue-500 shrink-0" size={16} />
              <input
                type="text"
                placeholder="Job title, company..."
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                className="w-full text-sm outline-none text-gray-700 placeholder-gray-400"
              />
              {keyword && (
                <button type="button" onClick={() => setKeyword("")}>
                  <FiX size={14} className="text-gray-400" />
                </button>
              )}
            </div>
            {categories.length > 0 && (
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 min-w-[180px]">
                <FiGrid className="text-blue-500 shrink-0" size={14} />
                <select
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                  className="w-full text-sm outline-none text-gray-700 bg-transparent"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {needsAuth ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <FiLogIn className="mx-auto text-blue-500 mb-4" size={40} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sign in to browse jobs</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Job listings require an account. Create one in under a minute with your phone number and PIN.
            </p>
            <Link
              href={`/login?callbackUrl=${encodeURIComponent("/jobs")}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700"
            >
              <FiLogIn size={16} /> Login / Register
            </Link>
          </div>
        ) : loading ? (
          <div className="text-center py-20 text-gray-500">Loading jobs…</div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button type="button" onClick={fetchJobs} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{jobs.length}</span>
                {total > 0 && <> of <span className="font-semibold text-gray-900">{total}</span></>}
              </p>
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400"}`}
                >
                  <FiList size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400"}`}
                >
                  <FiSquare size={14} />
                </button>
              </div>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try a different search term or category.</p>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
                {jobs.map((job) => (
                  <JobCard key={job.job_id} job={job} variant={viewMode} />
                ))}
              </div>
            )}

            {total > jobs.length && (
              <div className="flex justify-center gap-3 mt-8">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">Page {page}</span>
                <button
                  type="button"
                  disabled={jobs.length < 20}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg border text-sm disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center text-gray-500">Loading…</div>}>
      <JobsContent />
    </Suspense>
  );
}

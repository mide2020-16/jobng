"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiGrid, FiX, FiList, FiSquare, FiLogIn, FiSliders } from "react-icons/fi";
import JobCard from "@/components/shared/JobCard";
import JobCardSkeleton from "@/components/shared/JobCardSkeleton";
import PageLoader from "@/components/shared/PageLoader";
import { authHeaders } from "@/lib/auth-client";
import type { ApiJob } from "@/lib/justjobApi";

function JobsContent() {
  const searchParams = useSearchParams();
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
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-12 md:py-16 px-4 border-b border-neutral-700/50">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-3">
            Browse Jobs
          </h1>
          <p className="text-neutral-300 text-sm md:text-base max-w-xl font-medium">
            {total > 0 
              ? `${total.toLocaleString()} live roles across Nigeria` 
              : "Live listings from the JustJobNG network"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <aside className="lg:sticky lg:top-6 space-y-4 bg-white dark:bg-neutral-800 p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/80 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-700">
              <FiSliders className="text-amber-500 hidden lg:block" size={18} />
              <h2 className="font-bold text-base text-neutral-900 dark:text-white">
                Filter Vacancies
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Search Keywords
                </label>
                <div className="relative flex items-center bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 transition focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/10">
                  <FiSearch className="text-amber-500 mr-2.5 shrink-0" size={16} />
                  <input
                    type="text"
                    placeholder="Job title, company..."
                    value={keyword}
                    onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                    className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder-neutral-400 text-neutral-800 dark:text-neutral-100"
                  />
                  {keyword && (
                    <button 
                      type="button" 
                      onClick={() => setKeyword("")} 
                      className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
                    >
                      <FiX size={16} />
                    </button>
                  )}
                </div>
              </div>

              {categories.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Job Category
                  </label>
                  <div className="relative flex items-center bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-xl px-3.5 py-2.5 transition focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/10">
                    <FiGrid className="text-amber-500 mr-2.5 shrink-0" size={14} />
                    <select
                      value={category}
                      onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                      className="w-full bg-transparent border-none outline-none text-sm font-medium text-neutral-800 dark:text-neutral-100 cursor-pointer appearance-none"
                    >
                      <option value="" className="bg-white dark:bg-neutral-800">All categories</option>
                      {categories.map((c) => (
                        <option key={c} value={c} className="bg-white dark:bg-neutral-800">{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            {needsAuth ? (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-center p-8 md:p-12 max-w-md mx-auto shadow-md">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mx-auto mb-5 border border-amber-200/50 dark:border-amber-500/20">
                  <FiLogIn size={24} className="text-amber-500" />
                </div>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-2">
                  Sign in to browse jobs
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                  Sign in with your phone and PIN. New here? Dial <strong className="text-neutral-800 dark:text-neutral-200 font-bold">*7098#</strong> to subscribe first.
                </p>
                <Link 
                  href={`/login?callbackUrl=${encodeURIComponent("/jobs")}`} 
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm rounded-xl transition shadow-sm shadow-amber-500/10"
                >
                  <FiLogIn size={16} /> Login
                </Link>
              </div>
            ) : loading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} variant={viewMode} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <button 
                  type="button" 
                  onClick={fetchJobs} 
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm rounded-xl transition"
                >
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Showing <strong className="text-neutral-800 dark:text-white font-semibold">{jobs.length}</strong>
                    {total > 0 && <> of <strong className="text-neutral-800 dark:text-white font-semibold">{total.toLocaleString()}</strong></>}
                  </p>
                  
                  <div className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-1">
                    {(["list", "grid"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setViewMode(mode)}
                        className={`p-2 rounded-lg transition-all ${
                          viewMode === mode 
                            ? "bg-neutral-950 dark:bg-neutral-700 text-white shadow-sm" 
                            : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                        }`}
                      >
                        {mode === "list" ? <FiList size={16} /> : <FiSquare size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                {jobs.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
                    <span className="text-4xl mb-3 block">🔍</span>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">No jobs found</h3>
                    <p className="text-sm text-neutral-400">Try adjusting your keyword terms or category filter selections.</p>
                  </div>
                ) : (
                  <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
                    {jobs.map((job) => (
                      <JobCard key={job.job_id} job={job} variant={viewMode} />
                    ))}
                  </div>
                )}

                {total > jobs.length && (
                  <div className="flex justify-center items-center gap-3 pt-6">
                    <button 
                      type="button" 
                      disabled={page <= 1} 
                      onClick={() => setPage((p) => Math.max(1, p - 1))} 
                      className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase">
                      Page {page}
                    </span>
                    <button 
                      type="button" 
                      disabled={jobs.length < 20} 
                      onClick={() => setPage((p) => p + 1)} 
                      className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<PageLoader label="Loading jobs" />}>
      <JobsContent />
    </Suspense>
  );
}
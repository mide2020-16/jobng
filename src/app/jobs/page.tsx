/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiSearch, FiGrid, FiX, FiList, FiSquare, FiLogIn } from "react-icons/fi";
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
    <div className="jj-jobs-page">
      <div className="jj-jobs-hero">
        <div className="container-xl">
          <h1 className="jj-jobs-hero__title">Browse Jobs</h1>
          <p className="jj-jobs-hero__sub">
            {total > 0 ? `${total.toLocaleString()} live roles across Nigeria` : "Live listings from the JustJobNG network"}
          </p>
        </div>
      </div>

      <div className="jj-jobs-toolbar">
        <div className="container-xl" style={{ padding: "12px 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <div className="jj-jobs-search" style={{ flex: "1 1 240px" }}>
              <FiSearch size={16} style={{ color: "var(--gold-hover)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Job title, company..."
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "0.875rem", color: "var(--text)" }}
              />
              {keyword && (
                <button title="close" type="button" onClick={() => setKeyword("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-faint)" }}>
                  <FiX size={14} />
                </button>
              )}
            </div>
            {categories.length > 0 && (
              <div className="jj-jobs-search" style={{ flex: "0 1 200px" }}>
                <FiGrid size={14} style={{ color: "var(--gold-hover)", flexShrink: 0 }} />
                <select
                title="category"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                  style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "0.875rem", color: "var(--text)", cursor: "pointer" }}
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

      <div className="container-xl" style={{ padding: "2rem 0 4rem" }}>
        {needsAuth ? (
          <div className="jj-card" style={{ textAlign: "center", padding: "4rem 2rem", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--gold-muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <FiLogIn size={24} color="var(--gold-hover)" />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 8px", color: "var(--ink)" }}>Sign in to browse jobs</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
              Sign in with your phone and PIN. New here? Dial <strong style={{ color: "var(--ink)" }}>*7098#</strong> to subscribe first.
            </p>
            <Link href={`/login?callbackUrl=${encodeURIComponent("/jobs")}`} className="jj-btn jj-btn--gold" style={{ padding: "12px 28px" }}>
              <FiLogIn size={16} /> Login
            </Link>
          </div>
        ) : loading ? (
          <div style={{ display: viewMode === "grid" ? "grid" : "flex", gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(300px, 1fr))" : undefined, flexDirection: viewMode === "grid" ? undefined : "column", gap: 16 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} variant={viewMode} />
            ))}
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ color: "#ef4444", marginBottom: 16 }}>{error}</p>
            <button type="button" onClick={fetchJobs} className="jj-btn jj-btn--gold" style={{ padding: "10px 24px" }}>Retry</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
                Showing <strong style={{ color: "var(--ink)" }}>{jobs.length}</strong>
                {total > 0 && <> of <strong style={{ color: "var(--ink)" }}>{total.toLocaleString()}</strong></>}
              </p>
              <div style={{ display: "flex", gap: 4, background: "var(--surface-elevated)", border: "1px solid var(--border)", borderRadius: 10, padding: 4 }}>
                {(["list", "grid"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: "6px 10px", borderRadius: 7, border: "none", cursor: "pointer",
                      background: viewMode === mode ? "var(--ink)" : "transparent",
                      color: viewMode === mode ? "#fff" : "var(--text-faint)",
                      display: "flex", alignItems: "center",
                    }}
                  >
                    {mode === "list" ? <FiList size={14} /> : <FiSquare size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {jobs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 0" }}>
                <p style={{ fontSize: "2.5rem", marginBottom: 12 }}>🔍</p>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 800, margin: "0 0 6px" }}>No jobs found</h3>
                <p style={{ color: "var(--text-muted)", margin: 0 }}>Try a different search term or category.</p>
              </div>
            ) : (
              <div style={{ display: viewMode === "grid" ? "grid" : "flex", gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(300px, 1fr))" : undefined, flexDirection: viewMode === "grid" ? undefined : "column", gap: 16 }}>
                {jobs.map((job) => (
                  <JobCard key={job.job_id} job={job} variant={viewMode} />
                ))}
              </div>
            )}

            {total > jobs.length && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 32 }}>
                <button type="button" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="jj-btn jj-btn--ghost" style={{ padding: "8px 18px", opacity: page <= 1 ? 0.4 : 1 }}>
                  Previous
                </button>
                <span style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 600 }}>Page {page}</span>
                <button type="button" disabled={jobs.length < 20} onClick={() => setPage((p) => p + 1)} className="jj-btn jj-btn--ghost" style={{ padding: "8px 18px", opacity: jobs.length < 20 ? 0.4 : 1 }}>
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
    <Suspense fallback={<PageLoader label="Loading jobs" />}>
      <JobsContent />
    </Suspense>
  );
}

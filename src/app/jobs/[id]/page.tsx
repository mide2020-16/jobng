"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCalendar,
  FiExternalLink,
  FiGlobe,
  FiLogIn,
} from "react-icons/fi";
import { authHeaders } from "@/lib/auth-client";
import type { ApiJob } from "@/lib/justjobApi";
import { sanitizeHtml } from "@/lib/html";
import JobDetailSkeleton from "@/components/shared/JobDetailSkeleton";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function companyInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "J";
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === "string" ? params.id : "";

  const [job, setJob] = useState<ApiJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/jobs/${encodeURIComponent(id)}`, {
          headers: authHeaders(),
        });
        const data = await res.json();
        if (cancelled) return;

        if (res.status === 401 || data.requiresAuth) {
          setNeedsAuth(true);
          return;
        }
        if (res.status === 404 || !data.ok) {
          setNotFound(true);
          return;
        }
        setJob(data.job);
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <JobDetailSkeleton />;

  if (needsAuth) {
    return (
      <div className="jj-detail">
        <div className="container-xl" style={{ paddingTop: "6rem", paddingBottom: "4rem" }}>
          <div className="jj-card" style={{ maxWidth: 420, margin: "0 auto", padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--gold-muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <FiLogIn size={24} color="var(--gold-hover)" />
            </div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 8px", color: "var(--ink)" }}>Sign in required</h1>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
              Log in to view job details. To subscribe, dial <strong style={{ color: "var(--ink)" }}>*7098#</strong> first.
            </p>
            <Link href={`/login?callbackUrl=${encodeURIComponent(`/jobs/${id}`)}`} className="jj-btn jj-btn--gold" style={{ padding: "12px 28px" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="jj-detail">
        <div className="container-xl" style={{ paddingTop: "6rem", paddingBottom: "4rem", textAlign: "center" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</p>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, margin: "0 0 8px" }}>Job not found</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>This listing may have been removed or expired.</p>
          <button type="button" onClick={() => router.push("/jobs")} className="jj-btn jj-btn--ghost" style={{ padding: "10px 20px" }}>
            <FiArrowLeft size={14} /> Back to jobs
          </button>
        </div>
      </div>
    );
  }

  const title = job.job_title ?? "Untitled role";
  const website = job.company_website
    ? (job.company_website.startsWith("http") ? job.company_website : `https://${job.company_website}`)
    : null;

  return (
    <div className="jj-detail animate-fade-in-up">
      {/* Hero */}
      <div className="jj-detail__hero">
        <div className="container-xl">
          <Link href="/jobs" className="jj-detail__back">
            <FiArrowLeft size={14} /> Back to all jobs
          </Link>
          <div className="jj-detail__hero-inner">
            <div className="jj-detail__company-avatar">{companyInitial(job.company_name)}</div>
            <div>
              <h1 className="jj-detail__title">{title}</h1>
              <p className="jj-detail__company">{job.company_name}</p>
              <div className="jj-detail__meta">
                <span className="jj-detail__meta-pill">
                  <FiBriefcase size={12} /> {job.category ?? "General"}
                </span>
                <span className="jj-detail__meta-pill">
                  <FiCalendar size={12} /> {formatDate(job.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="jj-detail__body">
        <div className="container-xl jj-detail__grid">
              <div>
            {job.description && (
              <div className="jj-card" style={{ padding: "1.75rem 2rem" }}>
                <h2 className="jj-detail__section-title">About this role</h2>
                <div
                  className="job-description"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
                />
              </div>
            )}
          </div>

          <aside>
            <div className="jj-card jj-detail__sidebar-card">
              <p className="jj-detail__sidebar-company">{job.company_name}</p>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontSize: "0.875rem", color: "var(--gold-hover)",
                    textDecoration: "none", marginBottom: "1.25rem", fontWeight: 600,
                  }}
                >
                  <FiGlobe size={15} /> Visit company website
                </a>
              )}
              {job.job_url ? (
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jj-btn jj-btn--gold jj-detail__apply-btn"
                >
                  Apply now <FiExternalLink size={15} />
                </a>
              ) : (
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", textAlign: "center", margin: 0 }}>
                  Contact the company directly to apply.
                </p>
              )}
              <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--text-faint)", margin: 0, lineHeight: 1.5 }}>
                  Posted {formatDate(job.created_at)} · ID #{job.job_id}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

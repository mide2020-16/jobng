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
import { getJobById } from "@/data/jobs";

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

function mockToApiJob(mock: ReturnType<typeof getJobById>): ApiJob | null {
  if (!mock) return null;
  return {
    job_id: mock.id,
    job_title: mock.title,
    job_url: null,
    created_at: mock.postedDate,
    company_name: mock.company,
    company_website: null,
    category: mock.category,
    description: `<p>${mock.description}</p>${
      mock.responsibilities.length
        ? `<h3>Responsibilities</h3><ul>${mock.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`
        : ""
    }${
      mock.requirements.length
        ? `<h3>Requirements</h3><ul>${mock.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`
        : ""
    }`,
  };
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
          const mockJob = mockToApiJob(getJobById(id));
          if (mockJob) {
            setJob(mockJob);
            return;
          }
          setNotFound(true);
          return;
        }

        setJob(data.job);
      } catch {
        if (!cancelled) {
          const mockJob = mockToApiJob(getJobById(id));
          if (mockJob) { setJob(mockJob); return; }
          setNotFound(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <JobDetailSkeleton />;

  if (needsAuth) {
    return (
      <div className="min-h-screen bg-[var(--surface)] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-[420px] w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] p-8 md:p-12 text-center">
          <div className="w-14 h-14 rounded-[var(--radius-sm)] bg-[var(--gold-muted)] flex items-center justify-center mx-auto mb-5">
            <FiLogIn size={24} className="text-[var(--gold)]" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-[var(--ink)] mb-2">
            Sign in required
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            Log in to view job details. To subscribe, dial <strong className="text-[var(--ink)] font-bold">*7098#</strong> first.
          </p>
          <Link 
            href={`/login?callbackUrl=${encodeURIComponent(`/jobs/${id}`)}`} 
            className="inline-flex items-center justify-center gap-2 font-bold text-sm bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-[var(--ink)] shadow-[var(--shadow-gold)] rounded-[var(--radius-sm)] px-7 py-3 transition duration-200 active:scale-98 hover:translate-y-[-1px] hover:shadow-[0_12px_40px_rgba(0,166,81,0.35)]"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen bg-[var(--surface)] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
        <div className="max-w-md w-full">
          <span className="text-5xl mb-4 block animate-bounce">🔍</span>
          <h1 className="text-2xl font-extrabold text-[var(--ink)] tracking-tight mb-2">Job not found</h1>
          <p className="text-[var(--text-muted)] text-sm mb-6">This listing may have been removed or expired.</p>
          <button 
            type="button" 
            onClick={() => router.push("/jobs")} 
            className="inline-flex items-center justify-center gap-2 font-bold text-sm bg-transparent text-[var(--text)] border-1.5 border-[var(--border-strong)] rounded-[var(--radius-sm)] px-5 py-2.5 transition duration-200 active:scale-98 hover:bg-[rgba(10,15,28,0.04)]"
          >
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
    <div className="min-h-screen bg-[var(--surface)] animate-fade-in-up">
      {/* Premium Hero Section */}
      <div className="bg-[var(--ink)] relative overflow-hidden pt-12 pb-16 md:py-20 border-b border-[var(--gold-muted)]/20 shadow-sm">
        {/* Ambient Glow Effects */}
        <div className="absolute top-[-40%] right-[-10%] w-[500px] h-[500px] bg-radial from-[var(--gold)]/12 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 hover:text-[var(--gold-light)] transition mb-6 group">
            <FiArrowLeft size={14} className="group-hover:translate-x-[-2px] transition-transform" /> Back to all jobs
          </Link>
          
          <div className="flex flex-col md:flex-row gap-5 md:items-center justify-between">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 border border-[var(--gold)]/25 flex items-center justify-center font-black text-2xl md:text-3xl text-[var(--gold-light)] shrink-0 shadow-inner">
                {companyInitial(job.company_name)}
              </div>
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="text-base font-medium text-white/60">{job.company_name}</p>
                
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 shadow-sm">
                    <FiBriefcase size={12} className="text-[var(--gold-light)]" /> {job.category ?? "General"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 shadow-sm">
                    <FiCalendar size={12} className="text-[var(--gold-light)]" /> {formatDate(job.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Description Body */}
          <div className="lg:col-span-2 space-y-6">
            {job.description && (
              <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-5 bg-gradient-to-b from-[var(--gold-light)] to-[var(--gold)] rounded-full" />
                  <h2 className="text-lg font-extrabold text-[var(--ink)] tracking-tight">About this role</h2>
                </div>
                
                {/* Clean Editor-safe HTML Injection styling with Tailwind Typography conventions */}
                <div
                  className="prose max-w-none text-sm leading-relaxed text-[var(--text-muted)]
                    prose-p:mb-4 prose-p:last:mb-0
                    prose-headings:text-[var(--ink)] prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:mt-6 prose-headings:mb-3
                    prose-h3:text-base
                    prose-strong:text-[var(--ink)] prose-strong:font-bold
                    prose-ul:list-disc prose-ul:pl-5 prose-ul:my-3
                    prose-ol:list-decimal prose-ol:pl-5 prose-ol:my-3
                    prose-li:mb-1.5
                    prose-a:text-[var(--gold-hover)] prose-a:underline prose-a:underline-offset-2
                    prose-blockquote:border-l-3 prose-blockquote:border-[var(--gold)] prose-blockquote:pl-4 prose-blockquote:my-4 prose-blockquote:italic text-[var(--text-muted)]"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }}
                />
              </div>
            )}
          </div>

          {/* Sticky Sidebar Interactive Card */}
          <aside className="lg:sticky lg:top-28">
            <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] p-6 transition duration-300 hover:shadow-[var(--shadow-md)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-faint)] mb-1">Hiring Enterprise</p>
              <h3 className="text-lg font-extrabold text-[var(--ink)] tracking-tight mb-4">{job.company_name}</h3>
              
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-hover)] hover:text-[var(--gold)] transition mb-5"
                >
                  <FiGlobe size={15} /> Visit company website
                </a>
              )}
              
              {job.job_url ? (
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center font-bold text-sm bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-[var(--ink)] shadow-[var(--shadow-gold)] rounded-[var(--radius-sm)] py-3.5 px-5 transition duration-200 active:scale-98 hover:translate-y-[-1px] hover:shadow-[0_12px_40px_rgba(0,166,81,0.35)]"
                >
                  Apply now <FiExternalLink size={15} />
                </a>
              ) : (
                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3.5 text-center">
                  <p className="text-xs font-medium text-[var(--text-muted)] leading-normal">
                    Contact the company directly to submit your application tracking documents.
                  </p>
                </div>
              )}
              
              <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-semibold text-[var(--text-faint)] tracking-wide uppercase">
                <span>ID: #{job.job_id}</span>
                <span>Posted {new Date(job.created_at).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
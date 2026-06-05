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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center text-gray-500">
        Loading job…
      </div>
    );
  }

  if (needsAuth) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white rounded-2xl border p-10">
          <FiLogIn className="mx-auto text-blue-600 mb-4" size={40} />
          <h1 className="text-xl font-bold mb-2">Sign in required</h1>
          <p className="text-gray-500 mb-6 text-sm">Log in to view job details.</p>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(`/jobs/${id}`)}`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm"
          >
            Login / Register
          </Link>
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold mb-2">Job not found</h1>
        <button type="button" onClick={() => router.push("/jobs")} className="text-blue-600 font-semibold">
          ← Back to jobs
        </button>
      </div>
    );
  }

  const title = job.job_title ?? "Untitled role";

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-blue-950 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6">
            <FiArrowLeft size={14} /> Back to Jobs
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-blue-200 text-lg">{job.company_name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 grid grid-cols-2 gap-4 shadow-sm">
              <div>
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><FiBriefcase size={12} /> Category</p>
                <p className="text-sm font-semibold">{job.category ?? "General"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><FiCalendar size={12} /> Posted</p>
                <p className="text-sm font-semibold">{formatDate(job.created_at)}</p>
              </div>
            </div>

            {job.description && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-28">
              <h3 className="font-bold text-gray-900 mb-4">{job.company_name}</h3>
              {job.company_website && (
                <a
                  href={job.company_website.startsWith("http") ? job.company_website : `https://${job.company_website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 mb-4 hover:underline"
                >
                  <FiGlobe size={14} /> Company website
                </a>
              )}
              {job.job_url ? (
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm"
                >
                  Apply on company site <FiExternalLink size={14} />
                </a>
              ) : (
                <p className="text-sm text-gray-500 text-center">Contact the company directly to apply.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

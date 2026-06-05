import Link from "next/link";
import { FiBriefcase, FiCalendar, FiExternalLink } from "react-icons/fi";
import type { ApiJob } from "@/lib/justjobApi";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function companyInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "J";
}

interface JobCardProps {
  job: ApiJob;
  variant?: "list" | "grid";
}

export default function JobCard({ job, variant = "list" }: JobCardProps) {
  const title = job.job_title ?? "Untitled role";
  const category = job.category ?? "General";

  if (variant === "grid") {
    return (
      <div
        className="job-card"
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #e5e7eb",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          height: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#eff6ff",
              color: "#1967D2",
              fontWeight: 800,
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {companyInitial(job.company_name)}
          </div>
          <div style={{ minWidth: 0 }}>
            <Link
              href={`/jobs/${job.job_id}`}
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: "#111827",
                textDecoration: "none",
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </Link>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
              {job.company_name}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af" }}>
            <FiBriefcase size={11} /> {category}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af" }}>
            <FiCalendar size={11} /> {formatDate(job.created_at)}
          </span>
        </div>
        <Link
          href={`/jobs/${job.job_id}`}
          style={{
            marginTop: "auto",
            fontSize: 12,
            background: "#eff6ff",
            color: "#1967D2",
            fontWeight: 600,
            padding: "8px 14px",
            borderRadius: 8,
            textDecoration: "none",
            textAlign: "center",
          }}
        >
          View Job
        </Link>
      </div>
    );
  }

  return (
    <div
      className="job-card"
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        padding: "18px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: "#eff6ff",
          color: "#1967D2",
          fontWeight: 800,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {companyInitial(job.company_name)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <Link
          href={`/jobs/${job.job_id}`}
          style={{ fontWeight: 600, fontSize: 15, color: "#111827", textDecoration: "none" }}
        >
          {title}
        </Link>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{job.company_name}</p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 8 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af" }}>
            <FiBriefcase size={11} /> {category}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#9ca3af" }}>
            <FiCalendar size={11} /> {formatDate(job.created_at)}
          </span>
        </div>
        {job.description && (
          <p
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 8,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {job.description}
          </p>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
        <Link
          href={`/jobs/${job.job_id}`}
          style={{
            fontSize: 12,
            background: "#eff6ff",
            color: "#1967D2",
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          View
        </Link>
        {job.job_url && (
          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: "#6b7280",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Apply <FiExternalLink size={11} />
          </a>
        )}
      </div>
    </div>
  );
}

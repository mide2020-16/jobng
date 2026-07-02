import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiBookmark } from "react-icons/fi";
import { Candidate } from "@/types";

interface CandidateCardProps {
  candidate: Candidate;
  variant?: "grid" | "list";
}

export default function CandidateCard({ candidate, variant = "grid" }: CandidateCardProps) {
  const isList = variant === "list";

  const getAvailabilityClass = (status: string) => {
    switch (status) {
      case "Available": return 'bg-[var(--gold)] text-white';
      case "Open to Offers": return 'bg-[#F59E0B] text-white';
      default: return 'bg-[var(--surface)] text-[var(--text-muted)]';
    }
  };

  const statusClass = getAvailabilityClass(candidate.availability);

  if (isList) {
    return (
      <div className="jj-card p-6 flex gap-6 items-start transition-shadow duration-200 hover:shadow-md hover:border-[var(--gold-glow)]">
        <Link href={`/candidates/${candidate.id}`} className="shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--gold-muted)]">
            {candidate.avatar ? (
              <Image src={candidate.avatar} alt={candidate.name} width={64} height={64} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[var(--surface-elevated)] flex items-center justify-center text-2xl font-extrabold text-[var(--gold)]">
                {candidate.name.charAt(0)}
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
            <div>
              <Link href={`/candidates/${candidate.id}`} className="text-lg font-extrabold text-[var(--ink)] no-underline hover:text-[var(--gold)] transition-colors">
                {candidate.name}
              </Link>
              <p className="text-[15px] font-semibold text-[var(--gold)]">{candidate.title}</p>
            </div>
            <span className={`jj-pill border-none ${statusClass}`}>
              {candidate.availability}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-3">
            <span className="flex items-center gap-1"><FiMapPin size={14} /> {candidate.location}</span>
            <span>{candidate.experience}</span>
            <span>{candidate.education}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="text-xs font-semibold bg-[var(--gold-muted)] text-[var(--gold-hover)] px-2 py-1 rounded-[var(--radius-sm)]">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 shrink-0">
          <button title="bookmark" type="button" className="bg-transparent border-none text-[var(--text-faint)] cursor-pointer hover:text-[var(--gold)] transition-colors">
            <FiBookmark size={20} />
          </button>
          <Link href={`/candidates/${candidate.id}`} className="jj-btn jj-btn--ghost px-4 py-2 text-sm">
            View Profile
          </Link>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="jj-card p-6 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[var(--gold-glow)]">
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--gold-muted)]">
          {candidate.avatar ? (
            <Image src={candidate.avatar} alt={candidate.name} width={80} height={80} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full bg-[var(--surface-elevated)] flex items-center justify-center text-3xl font-extrabold text-[var(--gold)]">
                {candidate.name.charAt(0)}
              </div>
          )}
        </div>
        <span className={`absolute -bottom-1 right-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] ${statusClass}`}>
           {candidate.availability === "Available" ? "✓" : "~"}
        </span>
      </div>
      
      <Link href={`/candidates/${candidate.id}`} className="text-lg font-extrabold text-[var(--ink)] no-underline mb-1 hover:text-[var(--gold)] transition-colors line-clamp-1">
        {candidate.name}
      </Link>
      <p className="text-sm font-semibold text-[var(--gold)] mb-2 line-clamp-1">{candidate.title}</p>
      
      <p className="text-sm text-[var(--text-muted)] flex items-center gap-1 mb-4">
        <FiMapPin size={12} /> {candidate.location}
      </p>
      
      <div className="flex flex-wrap justify-center gap-1.5 mb-6">
        {candidate.skills.slice(0, 3).map((skill) => (
           <span key={skill} className="text-[11px] font-semibold bg-[var(--gold-muted)] text-[var(--gold-hover)] px-2 py-0.5 rounded-[var(--radius-sm)]">
             {skill}
           </span>
        ))}
      </div>
      
      <Link href={`/candidates/${candidate.id}`} className="jj-btn jj-btn--ghost w-full px-4 py-2 text-sm mt-auto">
        View Profile
      </Link>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiBookmark } from "react-icons/fi";
import { Candidate } from "@/types";

const availabilityColors: Record<string, string> = {
  "Available": "bg-green-100 text-green-700",
  "Open to Offers": "bg-green-100 text-green-700",
  "Not Available": "bg-gray-100 text-gray-600",
};

interface CandidateCardProps {
  candidate: Candidate;
  variant?: "grid" | "list";
}

export default function CandidateCard({ candidate, variant = "grid" }: CandidateCardProps) {
  if (variant === "list") {
    return (
      <div className="job-card bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
        <Link href={`/candidates/${candidate.id}`} className="shrink-0">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-100">
            <Image
              src={candidate.avatar}
              alt={candidate.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <Link
                href={`/candidates/${candidate.id}`}
                className="font-semibold text-gray-900 hover:text-green-600 transition-colors"
              >
                {candidate.name}
              </Link>
              <p className="text-sm text-green-600 font-medium">{candidate.title}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${availabilityColors[candidate.availability] ?? "bg-gray-100 text-gray-600"}`}>
              {candidate.availability}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FiMapPin size={11} /> {candidate.location}
            </span>
            <span>{candidate.experience} Experience</span>
            <span>{candidate.education}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {candidate.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 shrink-0">
          <button className="text-gray-300 hover:text-green-600 transition-colors p-1">
            <FiBookmark size={18} />
          </button>
          <Link
            href={`/candidates/${candidate.id}`}
            className="text-xs bg-green-50 hover:bg-green-600 hover:text-white text-green-600 font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            View Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="job-card bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center text-center shadow-sm">
      <div className="relative mb-3">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-100">
          <Image
            src={candidate.avatar}
            alt={candidate.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <span className={`absolute -bottom-1 right-0 text-xs font-semibold px-1.5 py-0.5 rounded-full border border-white ${availabilityColors[candidate.availability] ?? "bg-gray-100 text-gray-600"}`}>
          {candidate.availability === "Available" ? "✓" : "~"}
        </span>
      </div>
      <Link
        href={`/candidates/${candidate.id}`}
        className="font-semibold text-gray-900 hover:text-green-600 transition-colors text-sm"
      >
        {candidate.name}
      </Link>
      <p className="text-xs text-green-600 font-medium mt-0.5">{candidate.title}</p>
      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
        <FiMapPin size={10} /> {candidate.location}
      </p>
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
            {skill}
          </span>
        ))}
      </div>
      <Link
        href={`/candidates/${candidate.id}`}
        className="mt-4 w-full text-xs bg-green-50 hover:bg-green-600 hover:text-white text-green-600 font-semibold py-2 rounded-lg transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
}

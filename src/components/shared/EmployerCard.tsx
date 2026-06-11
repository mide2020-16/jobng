import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiBriefcase, FiExternalLink } from "react-icons/fi";
import { Employer } from "@/types";

export default function EmployerCard({ employer }: { employer: Employer }) {
  return (
    <div className="job-card bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 shadow-sm">
      <Link href={`/employers/${employer.id}`} className="shrink-0">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <Image
            src={employer.logo}
            alt={employer.name}
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
              href={`/employers/${employer.id}`}
              className="font-semibold text-gray-900 hover:text-green-600 transition-colors"
            >
              {employer.name}
            </Link>
            <p className="text-sm text-gray-500">{employer.industry}</p>
          </div>
          <span className="text-xs bg-green-50 text-green-600 font-semibold px-2.5 py-1 rounded-full">
            {employer.openJobs} Open {employer.openJobs === 1 ? "Job" : "Jobs"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FiMapPin size={11} /> {employer.location}
          </span>
          <span className="flex items-center gap-1">
            <FiBriefcase size={11} /> {employer.employees} employees
          </span>
          <span>Est. {employer.founded}</span>
        </div>
      </div>
      <Link
        href={`/employers/${employer.id}`}
        className="shrink-0 text-xs bg-green-50 hover:bg-green-600 hover:text-white text-green-600 font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
      >
        <FiExternalLink size={12} />
        View
      </Link>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiMapPin, FiMail, FiPhone, FiDollarSign, FiClock, FiBookmark, FiMessageSquare } from "react-icons/fi";
import { FiLinkedin, FiTwitter, FiGithub, FiInstagram } from "react-icons/fi";
import { getCandidateById, candidates } from "@/data/candidates";

export function generateStaticParams() {
  return candidates.map((c) => ({ id: c.id }));
}

// 1. Define Props type to expect a Promise
type Props = {
  params: Promise<{ id: string }>;
};

const socialIcons: Record<string, React.ElementType> = {
  linkedin: FiLinkedin, twitter: FiTwitter, github: FiGithub, instagram: FiInstagram,
  behance: FiGithub, dribbble: FiGithub,
};

const availabilityColors: Record<string, string> = {
  "Available": "bg-green-100 text-green-700",
  "Open to Offers": "bg-green-100 text-green-700",
  "Not Available": "bg-gray-100 text-gray-600",
};

// 2. Make the component async
export default async function CandidateDetailPage({ params }: Props) {
  // 3. Await the params to resolve them
  const { id } = await params;
  const candidate = getCandidateById(id);
  
  if (!candidate) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/candidates" className="inline-flex items-center gap-2 text-green-200 hover:text-white text-sm mb-6 transition-colors">
            <FiArrowLeft size={14} /> Back to Candidates
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30 shrink-0">
              <Image src={candidate.avatar} alt={candidate.name} width={80} height={80} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{candidate.name}</h1>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${availabilityColors[candidate.availability] ?? "bg-gray-100 text-gray-600"}`}>
                  {candidate.availability}
                </span>
              </div>
              <p className="text-green-300 font-medium mb-1">{candidate.title}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-green-200">
                <span className="flex items-center gap-1"><FiMapPin size={12} />{candidate.location}</span>
                <span>{candidate.experience} Experience</span>
                <span>{candidate.salary}/yr expected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About Me</h2>
              <p className="text-gray-600 leading-relaxed">{candidate.bio}</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-lg border border-green-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-green-600 text-lg">🎓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{candidate.education}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Academic Qualification</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { icon: FiClock, label: "Experience", value: candidate.experience },
                { icon: FiDollarSign, label: "Expected Salary", value: candidate.salary },
                { icon: FiMapPin, label: "Location", value: candidate.location },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="text-green-600" size={16} />
                  </div>
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-28">
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <FiMail className="text-green-500" size={14} />
                  </div>
                  <span className="truncate">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <FiPhone className="text-green-500" size={14} />
                  </div>
                  <span>{candidate.phone}</span>
                </div>
              </div>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition-colors mb-3"
              >
                <FiMessageSquare size={14} /> Send Message
              </Link>
              <button className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-green-300 text-gray-600 hover:text-green-600 font-semibold py-2.5 rounded-xl text-sm transition-colors">
                <FiBookmark size={14} /> Shortlist
              </button>

              {candidate.socialLinks.length > 0 && (
                <>
                  <hr className="my-4 border-gray-100" />
                  <div className="flex items-center gap-2">
                    {candidate.socialLinks.map(({ platform, url }) => {
                      const Icon = socialIcons[platform] ?? FiLinkedin;
                      return (
                        <a key={platform} href={url} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-green-600 hover:text-white text-gray-600 rounded-lg transition-colors">
                          <Icon size={14} />
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
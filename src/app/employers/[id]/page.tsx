import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiMapPin, FiUsers, FiGlobe, FiPhone, FiMail, FiBriefcase, FiCalendar } from "react-icons/fi";
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiGithub } from "react-icons/fi";
import { getEmployerById, employers } from "@/data/employers";
import { jobs } from "@/data/jobs";

export function generateStaticParams() {
  return employers.map((e) => ({ id: e.id }));
}

// 1. Update the type definition to expect a Promise
type Props = {
  params: Promise<{ id: string }>;
};

const socialIcons: Record<string, React.ElementType> = {
  linkedin: FiLinkedin, twitter: FiTwitter, facebook: FiFacebook, instagram: FiInstagram, github: FiGithub,
};

// 2. Make the component async
export default async function EmployerDetailPage({ params }: Props) {
  // 3. Await the params before using them
  const { id } = await params;
  
  const employer = getEmployerById(id);
  if (!employer) notFound();
  
  const employerJobs = jobs.filter((j) => j.employerId === id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Cover */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-r from-green-800 to-green-950 overflow-hidden">
        <Image src={employer.coverImage} alt={employer.name} fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-5 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white shrink-0">
            <Image src={employer.logo} alt={employer.name} width={96} height={96} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <h1 className="text-2xl font-bold text-gray-900">{employer.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1"><FiMapPin size={12} />{employer.location}</span>
              <span className="flex items-center gap-1"><FiBriefcase size={12} />{employer.industry}</span>
              <span className="flex items-center gap-1"><FiUsers size={12} />{employer.employees} employees</span>
              <span className="flex items-center gap-1"><FiCalendar size={12} />Founded {employer.founded}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:pb-1">
            <span className="bg-green-50 text-green-600 text-sm font-bold px-4 py-2 rounded-xl">
              {employer.openJobs} Open Jobs
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/employers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 mb-8 transition-colors">
          <FiArrowLeft size={13} /> Back to Employers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About {employer.name}</h2>
              <p className="text-gray-600 leading-relaxed">{employer.description}</p>
            </div>

            {/* Open Jobs */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Open Positions <span className="text-green-600 ml-1">({employerJobs.length})</span>
              </h2>
              {employerJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-500 shadow-sm">
                  No open positions right now. Check back soon!
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {employerJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:border-green-200 transition-colors"
                    >
                      <p className="font-semibold text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{job.location} · {job.type}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Company Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiGlobe className="text-green-500 shrink-0" size={15} />
                  <a href={employer.website} className="hover:text-green-600 truncate transition-colors">{employer.website}</a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiPhone className="text-green-500 shrink-0" size={15} />
                  <span>{employer.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiMail className="text-green-500 shrink-0" size={15} />
                  <a href={`mailto:${employer.email}`} className="hover:text-green-600 truncate transition-colors">{employer.email}</a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FiMapPin className="text-green-500 shrink-0" size={15} />
                  <span>{employer.location}</span>
                </div>
              </div>

              {employer.socialLinks.length > 0 && (
                <>
                  <hr className="my-4 border-gray-100" />
                  <div className="flex items-center gap-2">
                    {employer.socialLinks.map(({ platform, url }) => {
                      const Icon = socialIcons[platform] ?? FiGlobe;
                      return (
                        <a
                          key={platform}
                          href={url}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-green-600 hover:text-white text-gray-600 rounded-lg transition-colors"
                        >
                          <Icon size={14} />
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <Link
              href="/post-job"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-center transition-colors text-sm"
            >
              Post a Job Like This
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
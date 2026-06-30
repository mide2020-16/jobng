import Image from "next/image";
import Link from "next/link";
import { FiUsers, FiBriefcase, FiAward, FiSmartphone, FiArrowRight } from "react-icons/fi";

const values = [
  { icon: FiUsers, title: "People First", desc: "We believe every Nigerian deserves access to quality employment — regardless of their location or internet access." },
  { icon: FiBriefcase, title: "Quality Matches", desc: "We connect the right candidates with the right Nigerian employers, bridging the gap between talent and opportunity." },
  { icon: FiAward, title: "Trust & Integrity", desc: "We operate with full transparency and hold ourselves to the highest standards of honesty with both job seekers and employers." },
  { icon: FiSmartphone, title: "Accessible Tech", desc: "Via *7098# USSD, anyone with a basic phone and an MTN line can access our platform — no smartphone needed." },
];

const team = [
  { name: "Adewale Okafor", role: "Chief Executive Officer", initials: "AO", color: "#00A651" },
  { name: "Chidinma Eze", role: "Head of Product", initials: "CE", color: "#0BAB64" },
  { name: "Tunde Fashola", role: "Lead Engineer", initials: "TF", color: "#8DC63F" },
  { name: "Amaka Nwosu", role: "Head of Partnerships", initials: "AN", color: "#00863F" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-block bg-green-600/20 text-green-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-5 border border-green-500/30">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            Nigeria&apos;s job platform built for <span className="text-green-400">every Nigerian</span>
          </h1>
          <p className="text-green-200 text-lg leading-relaxed">
            JustJobNG was built with a simple belief: every Nigerian deserves a fair shot at quality employment — whether
            they have a smartphone or not. We connect job seekers and employers across all 36 states via USSD, SMS, and the web.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "5,000+", label: "Active Job Listings" },
              { value: "120K+", label: "Registered Job Seekers" },
              { value: "800+", label: "Nigerian Employers" },
              { value: "36", label: "States Covered" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-green-600 mb-1">{value}</div>
                <div className="text-sm text-gray-500 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3 block">Who We Are</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-tight">
                Building Nigeria&apos;s most accessible employment platform
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                JustJobNG was born out of a frustrating reality: millions of talented Nigerians
                had no reliable way to discover quality job opportunities, and employers couldn&apos;t
                reach them either — especially those without smartphones or data access.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                So we built a platform that works for everyone. Via <strong>*7098#</strong>, any Nigerian
                with an MTN line can subscribe, get job alerts by SMS, and apply — no smartphone, no data
                bundle needed. Employers post vacancies that reach candidates across all 36 states.
              </p>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Browse Open Jobs <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2 block">What Drives Us</span>
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-green-600" size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2 block">The People Behind JustJobNG</span>
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map(({ name, role, initials, color }) => (
              <div key={name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold mx-auto mb-4"
                  style={{ background: color }}
                >
                  {initials}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{name}</h3>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to find your next opportunity?</h2>
          <p className="text-green-100 mb-7">Join millions of professionals who trust JustJobNG for their careers.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/jobs" className="bg-white text-green-600 font-bold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors text-sm">
              Browse Jobs
            </Link>
            <Link href="/post-job" className="bg-green-800 hover:bg-green-900 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm">
              Post a Job
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

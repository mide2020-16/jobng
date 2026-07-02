import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiUsers, FiBriefcase, FiAward, FiSmartphone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "About Us | JustJobNG",
  description: "Learn about JustJobNG, Nigeria's premier job discovery platform.",
};

const stats = [
  { label: "Active Listings", value: "5,000+" },
  { label: "Job Seekers", value: "120K+" },
  { label: "Employers", value: "800+" },
  { label: "States Covered", value: "36" },
];

const values = [
  {
    icon: <FiUsers size={24} className="text-[var(--gold)]" />,
    title: "People First",
    description: "We prioritize the needs of Nigerian job seekers and employers, ensuring every feature serves a real purpose.",
  },
  {
    icon: <FiBriefcase size={24} className="text-[var(--gold)]" />,
    title: "Quality Matches",
    description: "We focus on connecting the right talent with the right opportunities, reducing the noise in the hiring process.",
  },
  {
    icon: <FiAward size={24} className="text-[var(--gold)]" />,
    title: "Trust & Integrity",
    description: "We vet our employers and listings to ensure a safe and reliable platform for all users.",
  },
  {
    icon: <FiSmartphone size={24} className="text-[var(--gold)]" />,
    title: "Accessible Tech",
    description: "From our web platform to our *7098# USSD service, we ensure everyone can find a job, regardless of their device.",
  },
];

const team = [
  { name: "Adewale Okafor", role: "CEO & Founder", initials: "AO", color: "bg-blue-100 text-blue-700" },
  { name: "Chidinma Eze", role: "Head of Product", initials: "CE", color: "bg-purple-100 text-purple-700" },
  { name: "Tunde Fashola", role: "Lead Engineer", initials: "TF", color: "bg-orange-100 text-orange-700" },
  { name: "Amaka Nwosu", role: "Head of Partnerships", initials: "AN", color: "bg-green-100 text-green-700" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero Section */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <span className="jj-pill mb-4 inline-block">Our Story</span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            Nigeria's job platform<br />built for every Nigerian
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto">
            We're bridging the gap between talent and opportunity across all 36 states, making job discovery accessible to everyone.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="container-xl -mt-8 relative z-10">
        <div className="jj-card grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 p-10 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-[2.5rem] font-extrabold text-[var(--ink)] mb-2 -tracking-[0.02em]">{stat.value}</div>
              <div className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container-xl mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--ink)] mb-6 -tracking-[0.02em]">
              <span className="inline-block w-10 h-1 bg-[var(--gold)] mb-4 rounded-sm" /><br />
              Empowering careers through technology
            </h2>
            <p className="text-[var(--text-muted)] text-[1.0625rem] leading-relaxed mb-6">
              Founded in 2023, JustJobNG was built out of frustration with existing job portals that were either too complex, full of scams, or inaccessible to millions of Nigerians without smartphones or reliable internet.
            </p>
            <p className="text-[var(--text-muted)] text-[1.0625rem] leading-relaxed mb-10">
              We believe finding a job should be simple, transparent, and fair. That's why we created a unified platform that works just as well on a laptop in Lagos as it does on a feature phone in Kano via our *7098# USSD service.
            </p>
            <Link href="/jobs" className="jj-btn jj-btn--gold px-8 py-3.5 text-base">
              Browse Open Roles
            </Link>
          </div>
          <div className="relative h-[500px] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-lg)]">
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format" 
              alt="JustJobNG Team" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container-xl mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[var(--ink)] mb-4 -tracking-[0.02em]">Our Core Values</h2>
          <p className="text-[var(--text-muted)] text-lg max-w-[600px] mx-auto">
            The principles that guide every decision we make.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {values.map((value, i) => (
            <div key={i} className="jj-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[var(--gold-muted)] flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-extrabold text-[var(--ink)] mb-3">{value.title}</h3>
              <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container-xl mt-24 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[var(--ink)] mb-4 -tracking-[0.02em]">Meet the Leadership</h2>
          <p className="text-[var(--text-muted)] text-lg max-w-[600px] mx-auto">
            The people working hard to connect you with your next opportunity.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          {team.map((member, i) => (
            <div key={i} className="text-center">
              <div className="w-[120px] h-[120px] rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-3xl font-extrabold text-[var(--ink)] mx-auto mb-4 shadow-[var(--shadow-sm)]">
                {member.initials}
              </div>
              <h3 className="text-lg font-extrabold text-[var(--ink)] mb-1">{member.name}</h3>
              <p className="text-[var(--text-muted)] text-sm font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--ink)] py-20 text-center mx-4 rounded-[var(--radius-xl)]">
        <h2 className="text-[2.5rem] font-extrabold text-white mb-6 -tracking-[0.02em]">
          Ready to find your next opportunity?
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/jobs" className="jj-btn jj-btn--gold px-8 py-3.5 text-base">
            Browse Jobs
          </Link>
          <Link href="/post-job" className="jj-btn px-8 py-3.5 text-base bg-white/10 text-white border border-white/20">
            Post a Job
          </Link>
        </div>
      </section>
    </div>
  );
}
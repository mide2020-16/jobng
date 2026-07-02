"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiLoader, FiLogIn, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { authHeaders } from "@/lib/auth-client";

export default function PostJobPage() {
  const { isAuthenticated, ready } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "General",
    type: "Full-time",
    experience: "Mid-Level",
    education: "Bachelor's Degree",
    salaryMin: "",
    salaryMax: "",
    description: "",
    responsibilities: "",
    requirements: "",
    tags: "",
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setJobType = (type: string) => setFormData({ ...formData, type });

  const handleSubmit = async () => {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/post-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders()
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "An error occurred");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <span className="jj-loader jj-loader--compact">
          <span className="jj-loader__ring jj-loader__ring--compact" />
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
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
            Log in to post a job. Employers must have an active subscription to post listings.
          </p>
          <Link 
            href="/login?callbackUrl=/post-job" 
            className="jj-btn jj-btn--gold w-full p-3"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[var(--surface)] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-[500px] w-full bg-[var(--surface-elevated)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <FiCheckCircle size={64} className="text-[var(--gold)]" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[var(--ink)] mb-2">
            Job Posted Successfully!
          </h1>
          <p className="text-base text-[var(--text-muted)] leading-relaxed mb-6">
            Your listing for <strong className="text-[var(--ink)]">{formData.title}</strong> at <strong className="text-[var(--ink)]">{formData.company}</strong> has been submitted and is currently under review. It will be live within 24 hours.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => router.push('/jobs')} className="jj-btn jj-btn--ghost px-6 py-3">
              View All Jobs
            </button>
            <button onClick={() => { setStatus("idle"); setStep(1); setFormData({ title: "", company: "", location: "", category: "General", type: "Full-time", experience: "Mid-Level", education: "Bachelor's Degree", salaryMin: "", salaryMax: "", description: "", responsibilities: "", requirements: "", tags: "" }) }} className="jj-btn jj-btn--gold px-6 py-3">
              Post Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { num: 1, title: "Job Details" },
    { num: 2, title: "Description" },
    { num: 3, title: "Requirements" },
    { num: 4, title: "Preview" }
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            Post a Job
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto">
            Reach thousands of qualified candidates in Nigeria
          </p>
        </div>
      </section>

      <section className="container-xl -mt-16 relative z-10">
        <div className="jj-card max-w-[800px] mx-auto p-0 overflow-hidden">
          
          {/* Progress Bar */}
          <div className="px-10 py-8 bg-[var(--surface)] border-b border-[var(--border)]">
            <div className="flex justify-between relative">
              <div className="absolute top-[15px] left-0 right-0 h-[2px] bg-[var(--border)] z-0" />
              <div className="absolute top-[15px] left-0 h-[2px] bg-[var(--gold)] z-0 transition-all duration-300 ease-in-out" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} />
              
              {steps.map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    step >= s.num 
                      ? 'bg-[var(--gold)] text-white border-none' 
                      : 'bg-[var(--surface-elevated)] text-[var(--text-faint)] border-2 border-[var(--border)]'
                  }`}>
                    {step > s.num ? <FiCheckCircle size={16} /> : s.num}
                  </div>
                  <span className={`text-xs font-semibold ${step >= s.num ? 'text-[var(--ink)]' : 'text-[var(--text-faint)]'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10">
            {errorMsg && (
              <div className="bg-[#FEE2E2] text-[#991B1B] p-4 rounded-[var(--radius-sm)] text-sm font-semibold mb-6">
                {errorMsg}
              </div>
            )}

            {/* Step 1: Job Details */}
            {step === 1 && (
              <div className="animate-fade-in flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Job Title *</label>
                  <input name="title" value={formData.title} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]" placeholder="e.g. Senior Frontend Engineer" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Company Name *</label>
                    <input name="company" value={formData.company} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]" placeholder="Your company name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Location *</label>
                    <input name="location" value={formData.location} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]" placeholder="e.g. Lagos, Remote" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Category *</label>
                  <select title="category" name="category" value={formData.category} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)] appearance-none">
                    <option>Engineering & Tech</option>
                    <option>Sales & Marketing</option>
                    <option>Finance & Accounting</option>
                    <option>Design & Creative</option>
                    <option>Healthcare</option>
                    <option>General</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Job Type *</label>
                  <div className="flex gap-2 flex-wrap">
                    {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map(type => (
                      <button 
                        key={type}
                        type="button"
                        onClick={() => setJobType(type)}
                        className={`jj-pill ${
                          formData.type === type 
                            ? 'bg-[var(--gold)] text-white border-[var(--gold)]' 
                            : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--border)] hover:bg-[var(--surface-elevated)]'
                        } border border-solid transition-colors cursor-pointer`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Experience Level</label>
                    <select title="experience" name="experience" value={formData.experience} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)] appearance-none">
                      <option>Entry Level</option>
                      <option>Mid-Level</option>
                      <option>Senior</option>
                      <option>Executive</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Education</label>
                    <select title="availability" name="education" value={formData.education} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)] appearance-none">
                      <option>High School</option>
                      <option>Diploma / OND</option>
                      <option>Bachelor&apos;s Degree</option>
                      <option>Master&apos;s Degree</option>
                      <option>Not Required</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Minimum Salary (₦)</label>
                    <input type="number" name="salaryMin" value={formData.salaryMin} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]" placeholder="e.g. 150000" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[var(--ink)]">Maximum Salary (₦)</label>
                    <input type="number" name="salaryMax" value={formData.salaryMax} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]" placeholder="e.g. 300000" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Description */}
            {step === 2 && (
              <div className="animate-fade-in flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Job Description *</label>
                  <textarea name="description" value={formData.description} onChange={updateForm} rows={8} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all resize-y bg-[var(--surface-elevated)]" placeholder="Describe the role, team, and what the candidate will be doing..." />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Key Responsibilities *</label>
                  <textarea name="responsibilities" value={formData.responsibilities} onChange={updateForm} rows={6} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all resize-y bg-[var(--surface-elevated)]" placeholder="List the daily responsibilities (one per line recommended)..." />
                </div>
              </div>
            )}

            {/* Step 3: Requirements */}
            {step === 3 && (
              <div className="animate-fade-in flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Requirements & Qualifications *</label>
                  <textarea name="requirements" value={formData.requirements} onChange={updateForm} rows={8} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all resize-y bg-[var(--surface-elevated)]" placeholder="List required skills, experience, and certifications (one per line recommended)..." />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[var(--ink)]">Keywords / Tags</label>
                  <input name="tags" value={formData.tags} onChange={updateForm} className="border-[1.5px] border-[var(--border-strong)] rounded-[var(--radius-sm)] py-3 px-3.5 outline-none focus:border-[var(--gold)] focus:ring-[3px] focus:ring-[var(--gold-muted)] transition-all bg-[var(--surface-elevated)]" placeholder="e.g. React, Nextjs, Frontend, UI (comma separated)" />
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {step === 4 && (
              <div className="animate-fade-in">
                <div className="bg-[var(--surface)] p-6 rounded-[var(--radius-md)] border border-[var(--border)] mb-6">
                  <div className="flex gap-2 mb-4">
                    <span className="jj-pill bg-[var(--gold-muted)] text-[var(--gold-hover)] border-none">{formData.category || "Category"}</span>
                    <span className="jj-pill bg-[var(--ink)] text-white border-none">{formData.type || "Type"}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[var(--ink)] mb-2">{formData.title || "Job Title Placeholder"}</h3>
                  <p className="text-[var(--text-muted)] font-semibold mb-4">{formData.company || "Company Name"} &middot; {formData.location || "Location"}</p>
                  
                  <div className="border-t border-[var(--border)] pt-4 mt-4">
                    <h4 className="text-base font-bold text-[var(--ink)] mb-2">Description</h4>
                    <p className="text-[var(--text-muted)] text-[15px] whitespace-pre-wrap leading-relaxed">
                      {formData.description ? formData.description.slice(0, 200) + "..." : "Description placeholder..."}
                    </p>
                  </div>
                </div>
                <div className="bg-[var(--gold-muted)] p-4 rounded-[var(--radius-sm)] border border-[rgba(0,166,81,0.2)] flex items-center gap-3">
                  <FiCheckCircle size={20} className="text-[var(--gold)] shrink-0" />
                  <p className="text-sm text-[var(--ink)] m-0 font-medium leading-tight">
                    Please review your listing. By clicking submit, you agree to our Terms of Service.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-6 border-t border-[var(--border)]">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="jj-btn jj-btn--ghost px-5 py-2.5 flex items-center gap-2">
                  <FiArrowLeft size={16} /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step + 1)} 
                  className="jj-btn jj-btn--gold px-6 py-2.5 flex items-center gap-2"
                  disabled={step === 1 && (!formData.title || !formData.company || !formData.location) || step === 2 && (!formData.description || !formData.responsibilities) || step === 3 && (!formData.requirements)}
                >
                  Continue <FiArrowRight size={16} />
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handleSubmit} 
                  className="jj-btn jj-btn--gold px-6 py-2.5 flex items-center gap-2"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? <><FiLoader className="animate-spin" size={18} /> Submitting...</> : <>Submit Job Listing <FiCheckCircle size={16} /></>}
                </button>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

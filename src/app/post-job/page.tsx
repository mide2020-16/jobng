"use client";
import { useState } from "react";
import Link from "next/link";
import { FiCheckCircle, FiBriefcase, FiMapPin, FiDollarSign, FiFileText, FiTag, FiChevronDown } from "react-icons/fi";

const categories = ["Design", "Development", "Marketing", "Accounting / Finance", "Human Resource", "Health and Care", "Customer", "Project Management", "Automotive Jobs"];
const jobTypes = ["Full Time", "Part Time", "Remote", "Freelance", "Internship"];
const experienceLevels = ["0-1 Year", "1-2 Years", "2-3 Years", "3-5 Years", "5+ Years", "7+ Years", "10+ Years"];
const educationLevels = ["High School", "Technical Diploma", "Currently Enrolled", "Bachelor's Degree", "Master's Degree", "PhD"];

const steps = ["Job Details", "Description", "Requirements", "Preview"];

export default function PostJobPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", company: "", location: "", category: "", type: "Full Time",
    experience: "", education: "", salaryMin: "", salaryMax: "",
    description: "", responsibilities: "", requirements: "", tags: "",
  });

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-green-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted!</h2>
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-semibold text-gray-800">{form.title}</span> at <span className="font-semibold text-gray-800">{form.company}</span>
          </p>
          <p className="text-gray-400 text-xs mb-7">Your listing will be reviewed and published within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/jobs" className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
              View All Jobs
            </Link>
            <button onClick={() => { setSubmitted(false); setStep(0); setForm({ title: "", company: "", location: "", category: "", type: "Full Time", experience: "", education: "", salaryMin: "", salaryMax: "", description: "", responsibilities: "", requirements: "", tags: "" }); }} className="border border-gray-200 text-gray-600 hover:border-green-300 font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
              Post Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Post a Job</h1>
          <p className="text-green-200">Reach thousands of qualified candidates in minutes</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Steps */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0" />
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1 relative z-10" onClick={() => i < step && setStep(i)}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all cursor-pointer ${
                i < step ? "bg-green-500 border-green-500 text-white" :
                i === step ? "bg-green-600 border-green-600 text-white" :
                "bg-white border-gray-300 text-gray-400"
              }`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-green-600" : i < step ? "text-green-600" : "text-gray-400"}`}>{s}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            {/* Step 0: Job Details */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2"><FiBriefcase className="text-green-600" /> Job Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
                    <input required value={form.title} onChange={(e) => update("title", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all" placeholder="e.g. Senior React Developer" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name *</label>
                    <input required value={form.company} onChange={(e) => update("company", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all" placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <input required value={form.location} onChange={(e) => update("location", e.target.value)} className="w-full pl-9 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all" placeholder="e.g. New York or Remote" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                    <div className="relative">
                      <select required value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all bg-white">
                        <option value="">Select category</option>
                        {categories.map((c) => <option key={c}>{c}</option>)}
                      </select>
                      <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type *</label>
                    <div className="flex flex-wrap gap-2">
                      {jobTypes.map((t) => (
                        <button key={t} type="button" onClick={() => update("type", t)} className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${form.type === t ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience Level</label>
                    <select value={form.experience} onChange={(e) => update("experience", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 transition-all bg-white">
                      <option value="">Select level</option>
                      {experienceLevels.map((e) => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Education Level</label>
                    <select value={form.education} onChange={(e) => update("education", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 transition-all bg-white">
                      <option value="">Select level</option>
                      {educationLevels.map((e) => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Salary Range</label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                        <input type="number" value={form.salaryMin} onChange={(e) => update("salaryMin", e.target.value)} className="w-full pl-7 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-400 transition-all" placeholder="Min" />
                      </div>
                      <span className="text-gray-400 text-sm">–</span>
                      <div className="relative flex-1">
                        <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
                        <input type="number" value={form.salaryMax} onChange={(e) => update("salaryMax", e.target.value)} className="w-full pl-7 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-400 transition-all" placeholder="Max" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Description */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2"><FiFileText className="text-green-600" /> Job Description</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description *</label>
                  <textarea required rows={5} value={form.description} onChange={(e) => update("description", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all resize-none" placeholder="Describe the role, the team, and the company..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Responsibilities *</label>
                  <textarea required rows={4} value={form.responsibilities} onChange={(e) => update("responsibilities", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all resize-none" placeholder="List the main responsibilities (one per line)..." />
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2"><FiTag className="text-green-600" /> Requirements & Tags</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Requirements *</label>
                  <textarea required rows={4} value={form.requirements} onChange={(e) => update("requirements", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all resize-none" placeholder="List requirements (one per line)..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills / Tags</label>
                  <input value={form.tags} onChange={(e) => update("tags", e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-50 transition-all" placeholder="e.g. React, TypeScript, Remote-friendly (comma separated)" />
                  <p className="text-xs text-gray-400 mt-1.5">Separate tags with commas</p>
                </div>
              </div>
            )}

            {/* Step 3: Preview */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Preview Your Listing</h2>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">{form.type}</span>
                    {form.category && <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">{form.category}</span>}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{form.title || "Job Title"}</h3>
                  <p className="text-sm text-gray-500">{form.company || "Company"} · {form.location || "Location"}</p>
                  {(form.salaryMin || form.salaryMax) && <p className="text-sm font-semibold text-green-600">${form.salaryMin} – ${form.salaryMax}/yr</p>}
                  {form.description && <p className="text-sm text-gray-600 line-clamp-3">{form.description}</p>}
                  {form.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {form.tags.split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                        <span key={tag} className="bg-white border border-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-md">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-center">Your listing will be reviewed before going live</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-colors"
              >
                Next Step →
              </button>
            ) : (
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-colors">
                Submit Job Listing ✓
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

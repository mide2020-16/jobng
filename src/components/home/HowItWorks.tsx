"use client";
import { FiSearch, FiFileText, FiSend, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";

const steps = [
  {
    icon: FiSearch,
    step: "01",
    title: "Search for Jobs",
    bg: "bg-amber-50",
    color: "text-gold-hover",
    border: "border-amber-200",
    shadow: "hover:shadow-[0_20px_48px_rgba(217,119,6,0.14)]",
    desc: "Browse thousands of job listings filtered by location, category, salary, and job type to find your perfect match.",
  },
  {
    icon: FiFileText,
    step: "02",
    title: "Create Your Profile",
    bg: "bg-green-50",
    color: "text-green-600",
    border: "border-green-200",
    shadow: "hover:shadow-[0_20px_48px_rgba(22,163,74,0.14)]",
    desc: "Build a professional profile that showcases your skills, experience, and portfolio. Make employers notice you.",
  },
  {
    icon: FiSend,
    step: "03",
    title: "Apply Instantly",
    bg: "bg-purple-50",
    color: "text-purple-600",
    border: "border-purple-200",
    shadow: "hover:shadow-[0_20px_48px_rgba(124,58,237,0.14)]",
    desc: "Apply to multiple jobs with a single click. Track your application status in real time from your dashboard.",
  },
  {
    icon: FiCheckCircle,
    step: "04",
    title: "Get Hired",
    bg: "bg-orange-50",
    color: "text-orange-600",
    border: "border-orange-200",
    shadow: "hover:shadow-[0_20px_48px_rgba(234,88,12,0.14)]",
    desc: "Land interviews, negotiate offers, and start your new role. Thousands of candidates find jobs here every month.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-surface-elevated">
      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          subtitle="Simple Process"
          title="How It Works"
          description="Get started with JustJobNG in four simple steps and land your dream job faster"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ icon: Icon, step, title, bg, color, border, shadow, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`bg-surface-elevated border-[1.5px] ${border} rounded-md p-7 relative text-center cursor-default transition-shadow duration-300 ${shadow}`}
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-ink text-white text-[11px] font-bold w-7 h-7 rounded-full flex items-center justify-center">
                {step}
              </div>

              <motion.div
                whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                transition={{ duration: 0.45 }}
                className={`w-14 h-14 ${bg} rounded-[14px] flex items-center justify-center mx-auto mt-4 mb-4`}
              >
                <Icon className={`${color} text-2xl`} aria-hidden="true" />
              </motion.div>

              <h3 className="font-bold text-base text-ink mb-2">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
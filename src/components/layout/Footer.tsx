"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiFacebook, FiXTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import Logo from "@/components/brand/Logo";

const footerLinks = {
  explore: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Login", href: "/login" },
    { label: "Forgot PIN", href: "/forgot-password" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socials = [
  // { icon: FiFacebook, href: "#", label: "Facebook" },
  // { icon: FiXTwitter, href: "#", label: "X" },
  { icon: FiInstagram, href: "https://www.instagram.com/maekandex_communication_/", label: "Instagram" },
  { icon: FiLinkedin, href: "https://ng.linkedin.com/company/maekandexcommunication", label: "LinkedIn" },
];

// Framer Motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Footer() {
  return (
    <footer className="relative bg-[radial-gradient(ellipse_80%_80%_at_80%_0%,#CDEBB0_0%,transparent_55%),linear-gradient(200deg,#8DC63F_0%,#00A651_55%,#00863F_100%)] text-ink mt-20 pt-8">
      
      {/* 1. Classical SVG Wave Top Border to blend with the section above */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180 transform translate-y-[-99%]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-12 md:h-17"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-200"
          ></path>
        </svg>
      </div>

      {/* 2. Creative Animated Top Line over the border */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#055A2B] to-transparent origin-center opacity-40"
      />

      {/* Main Grid Section with Staggered Entrance */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container-xl mx-auto px-4 md:px-6 pt-16 pb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Info Column */}
          <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col items-start">
            <Logo variant="dark" size="md" />
            <p className="mt-5 text-[15px] leading-relaxed max-w-sm text-ink/80">
              Nigeria&apos;s job discovery platform. Subscribe via <strong className="text-[#055A2B] font-extrabold tracking-wide">*7098#</strong>, browse live listings, and land your next role.
            </p>
          </motion.div>

          {/* Explore Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink mb-5 relative inline-block">
              Explore
              <span className="absolute -bottom-1 left-0 w-1/2 h-[2px] bg-ink/20 rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-3">
              {footerLinks.explore.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-[15px] text-ink/75 font-medium w-fit no-underline py-1 transition-all duration-200 hover:text-ink hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 rounded-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink mb-5 relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-1/2 h-[2px] bg-ink/20 rounded-full"></span>
            </h3>
            <div className="flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="text-[15px] text-ink/75 font-medium w-fit no-underline py-1 transition-all duration-200 hover:text-ink hover:translate-x-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 rounded-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom Legal Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="container-xl mx-auto px-4 md:px-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-5 py-6 border-t border-ink/10"
      >
        <p className="text-[14px] text-ink/70 m-0 text-center sm:text-left">
          &copy; {new Date().getFullYear()} JustJobNG. All rights reserved.
        </p>
        
        {/* Social Icons Strip */}
        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a 
              key={label} 
              href={href} 
              aria-label={label} 
              target="_blank"            
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-ink/5 text-ink/75 transition-all duration-300 hover:bg-ink hover:text-white hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/50"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
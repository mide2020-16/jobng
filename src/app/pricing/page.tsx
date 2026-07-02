import { Metadata } from "next";
import Link from "next/link";
import { FiCheck, FiPhoneCall } from "react-icons/fi";
import { pricingPlans } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing | JustJobNG",
  description: "Simple, transparent pricing for job seekers and employers in Nigeria.",
};

const faqs = [
  { q: "How does the USSD billing work?", a: "When you dial *7098# and subscribe, the fee is deducted directly from your mobile airtime balance. You don't need a bank card." },
  { q: "Can I cancel my subscription?", a: "Yes, you can cancel at any time by dialing *7098# and selecting 'Account' > 'Manage Subscription'." },
  { q: "Are there hidden fees?", a: "No. The price you see is exactly what you pay. Standard network USSD session charges may apply." },
  { q: "How long do job posts stay active?", a: "Standard posts remain active for 30 days. Premium posts get extended visibility and feature placements." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)] pb-20 animate-fade-in-up">
      {/* Hero Section */}
      <section className="bg-[var(--ink)] pt-[calc(var(--nav-height)+3rem)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(0,166,81,0.08)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_0%_100%,rgba(141,198,63,0.06)_0%,transparent_50%)] pointer-events-none" />
        <div className="container-xl relative text-center">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white mb-4 -tracking-[0.02em] leading-[1.1]">
            Simple, Transparent Pricing
          </h1>
          <p className="text-white/70 text-lg max-w-[600px] mx-auto">
            Whether you're looking for your next big opportunity or hiring top talent, we have a plan designed for you.
          </p>
        </div>
      </section>

      {/* USSD Callout */}
      <section className="container-xl -mt-8 relative z-10">
        <div className="jj-card bg-[var(--gold-muted)] border border-[rgba(0,166,81,0.2)] px-8 py-6 flex items-center justify-center gap-4 text-center flex-wrap">
          <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center text-white shrink-0">
            <FiPhoneCall size={20} />
          </div>
          <p className="text-[1.0625rem] font-semibold text-[var(--ink)] m-0">
            Dial <strong className="text-[var(--gold-hover)] text-xl">*7098#</strong> on any MTN line to subscribe instantly. No internet required.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container-xl mt-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 items-start">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className={`jj-card px-8 py-10 relative ${plan.isPopular ? 'bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-white border-none scale-[1.02] z-10' : 'bg-[var(--surface-elevated)] text-[var(--ink)] border border-[var(--border)] scale-100 z-0'}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--ink)] text-white text-xs font-bold px-3 py-1 rounded-[20px] uppercase tracking-widest whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-extrabold mb-2 ${plan.isPopular ? 'text-white' : 'text-[var(--ink)]'}`}>{plan.name}</h3>
                <p className={`text-[15px] min-h-[45px] ${plan.isPopular ? 'opacity-90' : 'opacity-70'}`}>{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className={`text-[2.5rem] font-extrabold -tracking-[0.02em] ${plan.isPopular ? 'text-white' : 'text-[var(--ink)]'}`}>{plan.price}</span>
                {plan.period && <span className={`text-base ml-1 ${plan.isPopular ? 'opacity-90' : 'opacity-70'}`}>{plan.period}</span>}
              </div>

              <ul className="list-none p-0 m-0 mb-10 flex flex-col gap-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-3 text-[15px] font-medium ${plan.isPopular ? 'opacity-95' : 'opacity-80'}`}>
                    <FiCheck size={18} className={`shrink-0 mt-[2px] ${plan.isPopular ? 'text-white' : 'text-[var(--gold)]'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.name.includes("Employer") ? "/post-job" : "/login"} 
                className={`jj-btn w-full p-4 text-base border-none ${plan.isPopular ? 'bg-white text-[var(--gold)]' : 'bg-[var(--gold)] text-white'}`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Mini-section */}
      <section className="container-xl mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[var(--ink)] mb-4 -tracking-[0.02em]">Common Questions</h2>
        </div>
        <div className="jj-card p-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h4 className="text-lg font-extrabold text-[var(--ink)] mb-3">{faq.q}</h4>
              <p className="text-[var(--text-muted)] text-[15px] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--ink)] py-20 text-center mx-4 mt-20 rounded-[var(--radius-xl)]">
        <h2 className="text-[2.5rem] font-extrabold text-white mb-6 -tracking-[0.02em]">
          Not sure which plan is right?
        </h2>
        <Link href="/contact" className="jj-btn jj-btn--gold px-8 py-3.5 text-base">
          Talk to Us
        </Link>
      </section>
    </div>
  );
}

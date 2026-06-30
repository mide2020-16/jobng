import Link from "next/link";
import { FiCheck, FiZap, FiPhone } from "react-icons/fi";
import { pricingPlans } from "@/data/pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 to-green-950 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Simple, Transparent Pricing
          </h1>
          <p className="text-green-200 text-lg">
            Plans priced in Naira for Nigerian job seekers and employers. No hidden fees — cancel anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* USSD callout banner */}
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-10 max-w-xl mx-auto">
          <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
            <FiPhone className="text-white" size={16} />
          </div>
          <p className="text-sm text-green-800">
            Job seekers: subscribe instantly by dialling{" "}
            <strong className="text-green-900">*7098#</strong> on any MTN line.
            No internet or bank card required.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-7 flex flex-col transition-all duration-200 ${
                plan.highlighted
                  ? "bg-green-600 border-green-600 shadow-2xl shadow-green-200 scale-105"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
                    plan.highlighted ? "bg-white text-green-600" : "bg-green-600 text-white"
                  }`}
                >
                  {plan.badge}
                </div>
              )}

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  plan.highlighted ? "bg-white/20" : "bg-green-50"
                }`}
              >
                <FiZap
                  className={plan.highlighted ? "text-white" : "text-green-600"}
                  size={18}
                />
              </div>

              <h3
                className={`text-lg font-bold mb-1 ${
                  plan.highlighted ? "text-white" : "text-gray-900"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-xs mb-5 ${
                  plan.highlighted ? "text-green-100" : "text-gray-500"
                }`}
              >
                {plan.description}
              </p>

              <div className="mb-6">
                <span
                  className={`text-4xl font-extrabold ${
                    plan.highlighted ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.price === 0
                    ? "Free"
                    : `₦${plan.price.toLocaleString("en-NG")}`}
                </span>
                {plan.price > 0 && (
                  <span
                    className={`text-sm ml-1 ${
                      plan.highlighted ? "text-green-200" : "text-gray-400"
                    }`}
                  >
                    /{plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlighted ? "bg-white/20" : "bg-green-100"
                      }`}
                    >
                      <FiCheck
                        className={`${plan.highlighted ? "text-white" : "text-green-600"}`}
                        size={10}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-green-100" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.id === "2" ? (
                /* Job seeker monthly — USSD CTA */
                <a
                  href="tel:*7098%23"
                  className={`block text-center font-bold py-3 rounded-xl text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-white text-green-600 hover:bg-green-50"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  Dial *7098#
                </a>
              ) : (
                <Link
                  href={plan.price === 0 ? "/jobs" : "/contact"}
                  className={`block text-center font-bold py-3 rounded-xl text-sm transition-colors ${
                    plan.highlighted
                      ? "bg-white text-green-600 hover:bg-green-50"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {plan.price === 0 ? "Browse Jobs Free" : "Contact Us"}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* FAQ snippet */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Common Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                q: "How do I subscribe as a job seeker?",
                a: "Dial *7098# on any MTN line and follow the prompts. You will be subscribed in under 60 seconds — no internet or bank card required.",
              },
              {
                q: "Can I cancel my subscription?",
                a: "Yes. Dial *7098# and select 'Cancel Subscription'. You retain access until the end of your billing period. No cancellation fees.",
              },
              {
                q: "How do employers pay?",
                a: "Employers pay via bank transfer (NEFT/NIP), Paystack, or Flutterwave. Contact us at hello@justjobng.com to set up your account.",
              },
              {
                q: "Is there a free trial?",
                a: "Browsing all job listings is always free. Employer accounts include a 7-day review period before billing starts.",
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{q}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-10">
          <h3 className="text-2xl font-bold text-white mb-2">
            Not sure which plan is right for you?
          </h3>
          <p className="text-green-100 mb-6">
            Talk to our team and we&apos;ll help you find the best fit for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-green-600 font-bold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors text-sm"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </div>
  );
}

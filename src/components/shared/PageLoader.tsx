"use client";

interface PageLoaderProps {
  label?: string;
  variant?: "compact" | "full";
}

export default function PageLoader({ label = "Loading", variant = "full" }: PageLoaderProps) {
  if (variant === "compact") {
    return (
      <span className="jj-loader jj-loader--compact" role="status" aria-live="polite">
        <span className="jj-loader__ring jj-loader__ring--compact" aria-hidden />
        <span className="jj-loader__label">{label}</span>
      </span>
    );
  }

  return (
    <div className="jj-loader jj-loader--full" role="status" aria-live="polite">
      <div className="jj-loader__wrap">
        <span className="jj-loader__ring jj-loader__ring--outer" aria-hidden />
        <span className="jj-loader__ring jj-loader__ring--inner" aria-hidden />
        <div className="jj-loader__mark" aria-hidden>
          <svg width="48" height="48" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="12" fill="#0A0F1C" />
            <path d="M22 10L30 20H25.5V32H18.5V20H14L22 10Z" fill="url(#loaderGrad)" className="jj-loader__arrow" />
            <circle cx="22" cy="36" r="2.5" fill="#00A651" className="jj-loader__dot" />
            <defs>
              <linearGradient id="loaderGrad" x1="14" y1="10" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8DC63F" />
                <stop offset="1" stopColor="#00A651" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <p className="jj-loader__label">{label}</p>
    </div>
  );
}

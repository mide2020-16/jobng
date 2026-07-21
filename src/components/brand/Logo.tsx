import Link from "next/link";

interface LogoProps {
  /** Show wordmark beside the mark */
  showText?: boolean;
  /** light = for dark backgrounds, dark = for light backgrounds */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  /** Disable motion for reduced-motion preferences or static contexts */
  animated?: boolean;
}

const sizes = {
  sm: { mark: 28, text: 16, gap: 8 },
  md: { mark: 36, text: 20, gap: 10 },
  lg: { mark: 44, text: 24, gap: 12 },
};

function LogoMark({ size, animated = true }: { size: number; animated?: boolean }) {
  const gradId = `logoGrad-${size}`;

  return (
    <span className={`jj-logo-mark${animated ? " jj-logo-mark--animated" : ""}`} style={{ width: size, height: size }}>
      <span className="jj-logo-mark__glow" aria-hidden />
      <span className="jj-logo-mark__ring" aria-hidden />
      <svg
        className="jj-logo-mark__svg"
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect width="44" height="44" rx="12" fill="#0A0F1C" />
        <path
          className="jj-logo-mark__arrow"
          d="M22 10L30 20H25.5V32H18.5V20H14L22 10Z"
          fill={`url(#${gradId})`}
        />
        <circle className="jj-logo-mark__dot" cx="22" cy="36" r="2.5" fill="#00A651" />
        <defs>
          <linearGradient id={gradId} x1="14" y1="10" x2="30" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8DC63F" />
            <stop offset="1" stopColor="#00A651" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

export default function Logo({
  showText = true,
  variant = "dark",
  size = "md",
  href = "/",
  className = "",
  animated = true,
}: LogoProps) {
  const s = sizes[size];
  const textColor = variant === "light" ? "#FFFFFF" : "#0A0F1C";
  const ngColor = "#00A651";

  const content = (
    <span
      className={`logo-wrap z-100 ${className}`}
      style={{ display: "inline-flex", alignItems: "center", gap: s.gap, textDecoration: "none" }}
    >
      <LogoMark size={s.mark} animated={animated} />
      {showText && (
        <span style={{ display: "flex", alignItems: "baseline", gap: 1, lineHeight: 1 }}>
          <span
            style={{
              fontSize: s.text,
              fontWeight: 800,
              color: textColor,
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-display), sans-serif",
            }}
          >
            JustJob
          </span>
          <span
            className={animated ? "jj-logo-ng" : undefined}
            style={{
              fontSize: s.text,
              fontWeight: 800,
              color: ngColor,
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-display), sans-serif",
            }}
          >
            NG
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none" }} aria-label="JustJobNG home">
        {content}
      </Link>
    );
  }

  return content;
}

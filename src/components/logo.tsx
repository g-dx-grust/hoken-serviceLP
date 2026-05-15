import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  variant?: "color" | "mono-light" | "mono-dark";
};

/**
 * HOKENA CRM wordmark.
 * Two pillars suggest fairness and protection; the crossbar suggests the agency-customer relationship.
 */
export function HokenaLogo({
  variant = "color",
  className,
  ...rest
}: Props) {
  const pillar = variant === "mono-light" ? "#ffffff" : "#0b2545";
  const accent = variant === "mono-light" ? "rgba(255,255,255,0.85)" : "#8a6f3a";
  const wordmark = variant === "mono-light" ? "#ffffff" : "#0c1424";
  const sub = variant === "mono-light" ? "rgba(255,255,255,0.72)" : "#475066";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 56"
      fill="none"
      className={className}
      role="img"
      aria-label="HOKENA CRM"
      {...rest}
    >
      {/* Mark: two pillars + accent crossbar */}
      <g transform="translate(6, 6)">
        <rect x="0" y="0" width="8" height="44" fill={pillar} />
        <rect x="32" y="0" width="8" height="44" fill={pillar} />
        <rect x="0" y="18" width="40" height="6" fill={accent} />
      </g>

      {/* Wordmark */}
      <g transform="translate(60, 0)">
        <text
          x="0"
          y="28"
          fill={wordmark}
          fontFamily='var(--font-noto-sans-jp), "Noto Sans JP", system-ui, sans-serif'
          fontSize="22"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          HOKENA
        </text>
        <text
          x="0"
          y="46"
          fill={sub}
          fontFamily='var(--font-noto-sans-jp), "Noto Sans JP", system-ui, sans-serif'
          fontSize="10"
          fontWeight="500"
          letterSpacing="0.32em"
        >
          INSURANCE CRM
        </text>
      </g>
    </svg>
  );
}

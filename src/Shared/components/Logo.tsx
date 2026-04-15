export default function Logo({ width = 140 }: { width?: number }) {
  return (
    <div className="cursor-pointer group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 60"
        width={width}
        height={width * 0.27}
      >
        <defs>
          <linearGradient id="bagGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        {/* Bag */}
        <rect
          x="4"
          y="22"
          width="36"
          height="30"
          rx="6"
          className="fill-white group-hover:fill-[var(--header-accent)] transition-colors duration-300"
        />

        {/* Handle */}
        <path
          d="M11 22 Q11 8 22 8 Q33 8 33 22"
          className="stroke-[var(--header-accent)] group-hover:stroke-white transition-colors duration-300"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Lock */}
        <circle
          cx="22"
          cy="35"
          r="4"
          className="fill-[var(--header-accent)] group-hover:fill-white transition-colors duration-300"
        />
        <rect
          x="20"
          y="37"
          width="4"
          height="6"
          rx="1"
          className="fill-[var(--header-accent)] group-hover:fill-white transition-colors duration-300"
        />

        {/* Wordmark */}
        <text
          x="52"
          y="42"
          fontFamily="Inter, sans-serif"
          fontSize="30"
          fontWeight="600"
          className="fill-[var(--header-text)] group-hover:fill-white transition-colors duration-300"
        >
          e
        </text>

        <text
          x="70"
          y="42"
          fontFamily="Inter, sans-serif"
          fontSize="30"
          fontWeight="800"
          className="fill-[var(--header-accent)] group-hover:fill-white transition-colors duration-300"
        >
          COM
        </text>
      </svg>
    </div>
  );
}
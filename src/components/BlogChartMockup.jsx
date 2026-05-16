import React, { useId } from "react";

const BlogChartMockup = ({ compact = false }) => {
  const rawId = useId().replace(/:/g, "");
  const bgId = compact ? `thumbBg-${rawId}` : `chartBg-${rawId}`;
  const lineId = compact ? `thumbLine-${rawId}` : `chartLine-${rawId}`;

  return (
    <svg
      viewBox="0 0 560 330"
      className="h-full w-full"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={bgId} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#0B61FF" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="#052C85" stopOpacity="0.45" />
          <stop offset="1" stopColor="#02122F" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={lineId} x1="0" x2="1">
          <stop stopColor="#13F7FF" />
          <stop offset="1" stopColor="#47B4FF" />
        </linearGradient>
      </defs>
      <rect width="560" height="330" fill={compact ? "#121827" : `url(#${bgId})`} />
      <g opacity="0.28" stroke="#76B7FF" strokeWidth="1">
        {Array.from({ length: 9 }, (_, index) => (
          <path key={`h-${index}`} d={`M0 ${42 + index * 31}H560`} />
        ))}
        {Array.from({ length: 12 }, (_, index) => (
          <path key={`v-${index}`} d={`M${22 + index * 48} 0V330`} />
        ))}
      </g>
      <path
        d="M0 245C34 210 62 238 93 210C130 176 145 230 174 203C208 172 225 201 260 166C295 132 318 191 350 154C386 112 410 157 445 129C486 95 514 141 560 84V330H0V245Z"
        fill="#00D5FF"
        opacity={compact ? "0.18" : "0.22"}
      />
      <path
        d="M0 245C34 210 62 238 93 210C130 176 145 230 174 203C208 172 225 201 260 166C295 132 318 191 350 154C386 112 410 157 445 129C486 95 514 141 560 84"
        stroke={`url(#${lineId})`}
        strokeWidth={compact ? "5" : "3"}
        fill="none"
      />
      <g>
        {[
          [38, 92, 22, 74, "#20F2FF"],
          [72, 118, 18, 55, "#FF9DA6"],
          [112, 76, 25, 90, "#20F2FF"],
          [158, 140, 16, 62, "#20F2FF"],
          [206, 88, 21, 98, "#20F2FF"],
          [252, 126, 19, 72, "#FF9DA6"],
          [296, 62, 25, 110, "#20F2FF"],
          [342, 102, 18, 82, "#20F2FF"],
          [386, 70, 23, 104, "#FF9DA6"],
          [432, 96, 19, 86, "#20F2FF"],
          [478, 52, 24, 120, "#FF9DA6"],
          [520, 34, 22, 146, "#20F2FF"],
        ].map(([x, y, width, height, color]) => (
          <g key={`${x}-${y}`} stroke={color} strokeWidth="4">
            <path d={`M${x + width / 2} ${y - 28}V${y + height + 28}`} opacity="0.8" />
            <rect x={x} y={y} width={width} height={height} rx="3" fill={color} />
          </g>
        ))}
      </g>
      {!compact && (
        <g fontFamily="monospace" fontSize="15" fontWeight="700" opacity="0.7">
          <text x="12" y="286" fill="#04F5FF">
            OIL
          </text>
          <text x="118" y="286" fill="#9EEBFF">
            69.43
          </text>
          <text x="250" y="286" fill="#77E7FF">
            1255.04
          </text>
          <text x="398" y="286" fill="#FFFFFF">
            U T A
          </text>
          <text x="492" y="286" fill="#FF7C9A">
            48.32
          </text>
        </g>
      )}
    </svg>
  );
};

export default BlogChartMockup;

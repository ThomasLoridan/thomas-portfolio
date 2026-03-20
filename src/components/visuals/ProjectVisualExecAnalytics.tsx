'use client';

/* ── EXEC ANALYTICS — Data convergence visual ─────────────────
   8 horizontal data streams converge to a single vertical line.
   Represents 80+ fragmented KPIs → one source of truth.
   flow-dot keyframe defined in globals.css.
──────────────────────────────────────────────────────────── */

const UNIFIER_X = 500;

const STREAMS = [
  { y: 58,  color: '#86868b', dur: 2.8, count: 4 },
  { y: 103, color: '#6e6e73', dur: 3.3, count: 4 },
  { y: 148, color: '#86868b', dur: 2.5, count: 5 },
  { y: 193, color: '#6e6e73', dur: 3.6, count: 4 },
  { y: 238, color: '#86868b', dur: 2.9, count: 4 },
  { y: 283, color: '#6e6e73', dur: 3.1, count: 5 },
  { y: 328, color: '#86868b', dur: 2.7, count: 4 },
  { y: 373, color: '#6e6e73', dur: 3.4, count: 4 },
];

export function ProjectVisualExecAnalytics() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000000', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 560 430"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      >
        {/* Data streams */}
        {STREAMS.map((stream, si) => (
          <g key={si}>
            {/* Baseline dashes */}
            <line
              x1="30" y1={stream.y} x2={UNIFIER_X} y2={stream.y}
              stroke={stream.color}
              strokeWidth="0.5"
              strokeDasharray="3 9"
              opacity="0.15"
            />
            {/* Moving dots */}
            {Array.from({ length: stream.count }, (_, di) => (
              <circle
                key={di}
                cx={30}
                cy={stream.y}
                r={2.5}
                fill={stream.color}
                style={{
                  animationName: 'flow-dot',
                  animationDuration: `${stream.dur}s`,
                  animationDelay: `${(stream.dur / stream.count) * di}s`,
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'ease-in-out',
                }}
              />
            ))}
          </g>
        ))}

        {/* Unifier — soft glow */}
        <line
          x1={UNIFIER_X} y1="30" x2={UNIFIER_X} y2="410"
          stroke="#5AC8FA"
          strokeWidth="10"
          opacity="0.1"
        />
        {/* Unifier — bright line */}
        <line
          x1={UNIFIER_X} y1="30" x2={UNIFIER_X} y2="410"
          stroke="#f5f5f7"
          strokeWidth="2"
          opacity="0.85"
        />

        {/* Label: 80+ KPIs */}
        <text
          x={UNIFIER_X + 14}
          y="56"
          fill="#f5f5f7"
          fontSize="22"
          fontWeight="700"
          opacity="0.65"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          80+
        </text>
        <text
          x={UNIFIER_X + 14}
          y="74"
          fill="#6e6e73"
          fontSize="10"
          fontWeight="400"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          KPIs unified
        </text>
      </svg>
    </div>
  );
}

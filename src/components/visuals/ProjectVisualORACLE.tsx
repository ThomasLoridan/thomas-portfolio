'use client';

/* ── ORACLE — EU Route Map with scan line ─────────────────────
   26 EU country dots at approximate capital positions.
   Route lines connecting nearby countries.
   Horizontal scan line sweeps top → bottom (CSS animation).
   scan-oracle keyframe defined in globals.css.
──────────────────────────────────────────────────────────── */

/* EU capital positions mapped to 580×390 SVG space */
const CAPITALS: Array<[string, number, number]> = [
  ['FR', 214, 237], ['DE', 317, 204], ['ES', 158, 313],
  ['IT', 309, 299], ['NL', 238, 204], ['BE', 233, 220],
  ['PT', 108, 328], ['SE', 361, 144], ['PL', 388, 207],
  ['RO', 435, 277], ['CZ', 328, 226], ['HU', 371, 249],
  ['AT', 346, 243], ['GR', 414, 335], ['DK', 310, 176],
  ['FI', 426, 120], ['IE', 133, 197], ['SK', 352, 243],
  ['BG', 410, 292], ['HR', 341, 265], ['SI', 328, 262],
  ['LT', 426, 185], ['LV', 418, 165], ['EE', 423, 143],
  ['LU', 249, 230], ['CY', 505, 359],
];

const ROUTES: Array<[number, number]> = [
  [0, 1], [0, 5], [0, 4], [0, 24],
  [1, 10], [1, 12], [1, 14], [1, 8],
  [2, 0], [2, 6],
  [3, 12], [3, 20],
  [4, 5], [4, 14],
  [7, 14], [7, 15],
  [8, 10], [8, 11],
  [9, 11], [9, 18],
  [10, 11], [10, 12],
  [11, 12], [11, 17], [11, 19],
  [14, 7],
  [15, 23],
  [21, 22], [22, 23],
  [16, 4],
];

export function ProjectVisualORACLE() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000000', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 580 390"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      >
        {/* Route network lines */}
        {ROUTES.map(([a, b], i) => {
          const [, ax, ay] = CAPITALS[a];
          const [, bx, by] = CAPITALS[b];
          return (
            <line
              key={i}
              x1={ax} y1={ay} x2={bx} y2={by}
              stroke="#2997ff"
              strokeWidth="0.8"
              opacity="0.18"
            />
          );
        })}

        {/* Country markers */}
        {CAPITALS.map(([code, cx, cy]) => (
          <g key={code}>
            {/* Outer glow ring */}
            <circle cx={cx} cy={cy} r={10} fill="#2997ff" opacity="0.05" />
            {/* Dot */}
            <circle cx={cx} cy={cy} r={3.5} fill="#f5f5f7" opacity="0.72" />
            {/* Inner bright core */}
            <circle cx={cx} cy={cy} r={1.5} fill="#ffffff" opacity="0.9" />
          </g>
        ))}

        {/* Scan line — horizontal, sweeps top → bottom */}
        <line
          x1="60" y1="30" x2="530" y2="30"
          stroke="#2997ff"
          strokeWidth="1.5"
          opacity="0.7"
          style={{
            animationName: 'scan-oracle',
            animationDuration: '3.8s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
        {/* Scan line soft glow */}
        <line
          x1="60" y1="30" x2="530" y2="30"
          stroke="#2997ff"
          strokeWidth="6"
          opacity="0.12"
          style={{
            animationName: 'scan-oracle',
            animationDuration: '3.8s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
      </svg>
    </div>
  );
}

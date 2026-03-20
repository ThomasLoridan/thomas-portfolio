'use client';

/* ── SONAR — Animated pulse grid ─────────────────────────────
   500+ EU Intermodal routes visualised as a node grid.
   ~16% blue (auditing), ~5% amber (exception), ~79% dim.
   CSS pulse-node animation defined in globals.css.
──────────────────────────────────────────────────────────── */

const COLS = 14;
const ROWS = 9;
const SX = 40;   // horizontal spacing
const SY = 36;   // vertical spacing
const OX = 28;   // left/right margin
const OY = 28;   // top/bottom margin

const W = OX + (COLS - 1) * SX + OX;  // 580
const H = OY + (ROWS - 1) * SY + OY;  // 344

type NodeState = 'dim' | 'blue' | 'amber';

interface NodeDef {
  id: number;
  cx: number;
  cy: number;
  state: NodeState;
  delay: number;
  dur: number;
}

function sinRand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7);
  return (x - Math.floor(x));
}

const NODES: NodeDef[] = Array.from({ length: COLS * ROWS }, (_, id) => {
  const v = sinRand(id);
  const state: NodeState = v < 0.16 ? 'blue' : v < 0.21 ? 'amber' : 'dim';
  return {
    id,
    cx: OX + (id % COLS) * SX,
    cy: OY + Math.floor(id / COLS) * SY,
    state,
    delay: sinRand(id * 7.3) * 4.5,
    dur: 2.2 + sinRand(id * 3.1) * 2,
  };
});

const H_LINES = NODES.filter(n => n.id % COLS < COLS - 1 && n.id % 4 === 0);
const V_LINES = NODES.filter(n => Math.floor(n.id / COLS) < ROWS - 1 && n.id % 6 === 0);

export function ProjectVisualSONAR() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#000000', overflow: 'hidden' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-hidden="true"
      >
        {/* Connecting lines — barely visible grid */}
        {H_LINES.map(n => (
          <line
            key={`h${n.id}`}
            x1={n.cx} y1={n.cy} x2={n.cx + SX} y2={n.cy}
            stroke="#424245" strokeWidth="0.5" opacity="0.22"
          />
        ))}
        {V_LINES.map(n => (
          <line
            key={`v${n.id}`}
            x1={n.cx} y1={n.cy} x2={n.cx} y2={n.cy + SY}
            stroke="#424245" strokeWidth="0.5" opacity="0.18"
          />
        ))}

        {/* Nodes */}
        {NODES.map(node => {
          const fill =
            node.state === 'blue'  ? '#5AC8FA' :
            node.state === 'amber' ? '#ff9f0a' :
                                     '#424245';
          const r = node.state === 'dim' ? 2 : 2.8;
          const baseOpacity = node.state === 'dim' ? 0.32 : 0.75;

          return (
            <circle
              key={node.id}
              cx={node.cx}
              cy={node.cy}
              r={r}
              fill={fill}
              opacity={baseOpacity}
              style={node.state !== 'dim' ? {
                animationName: 'pulse-node',
                animationDuration: `${node.dur}s`,
                animationDelay: `${node.delay}s`,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
              } : undefined}
            />
          );
        })}

        {/* Active-node soft glow rings */}
        {NODES.filter(n => n.state !== 'dim').map(node => (
          <circle
            key={`glow${node.id}`}
            cx={node.cx}
            cy={node.cy}
            r={7}
            fill={node.state === 'blue' ? '#5AC8FA' : '#ff9f0a'}
            opacity={0}
            style={{
              animationName: 'pulse-node',
              animationDuration: `${node.dur}s`,
              animationDelay: `${node.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

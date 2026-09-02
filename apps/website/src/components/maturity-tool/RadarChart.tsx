import { useId } from "react";

export interface RadarPoint {
  id: string;
  label: string;
  score: number;
}

interface RadarChartProps {
  points: RadarPoint[];
  size?: number;
}

const SCALE_MAX = 5;

const polarToCartesian = (
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
) => {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
};

const wrapLabel = (text: string, maxChars = 13): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
};

export default function RadarChart({ points, size = 440 }: RadarChartProps) {
  const gradientId = useId();
  const n = points.length;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 92;
  const angleStep = 360 / n;

  const ringRadii = [1, 2, 3, 4, 5].map((step) => (step / SCALE_MAX) * maxRadius);

  const dataPoints = points.map((p, i) => {
    const angle = i * angleStep;
    const r = (Math.max(1, Math.min(5, p.score)) / SCALE_MAX) * maxRadius;
    return polarToCartesian(cx, cy, r, angle);
  });

  const dataPath =
    dataPoints.map((pt) => `${pt.x},${pt.y}`).join(" ") + ` ${dataPoints[0].x},${dataPoints[0].y}`;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-auto max-w-[460px] mx-auto overflow-visible"
      role="img"
      aria-label="Maturity profile radar chart across eight dimensions"
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor="#01AD9F" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#01AD9F" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* grid rings */}
      {ringRadii.map((r, idx) => (
        <polygon
          key={r}
          points={points
            .map((_, i) => {
              const pt = polarToCartesian(cx, cy, r, i * angleStep);
              return `${pt.x},${pt.y}`;
            })
            .join(" ")}
          fill="none"
          stroke={idx === ringRadii.length - 1 ? "#D5D5D5" : "#E8E8E8"}
          strokeWidth={1}
        />
      ))}

      {/* axes */}
      {points.map((_, i) => {
        const outer = polarToCartesian(cx, cy, maxRadius, i * angleStep);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outer.x}
            y2={outer.y}
            stroke="#E8E8E8"
            strokeWidth={1}
          />
        );
      })}

      {/* data shape */}
      <polygon points={dataPath} fill={`url(#${gradientId})`} stroke="#01AD9F" strokeWidth={2} />

      {/* data points */}
      {dataPoints.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={3.5} fill="#01AD9F" />
      ))}

      {/* labels */}
      {points.map((p, i) => {
        const labelPos = polarToCartesian(cx, cy, maxRadius + 38, i * angleStep);
        const anchor =
          Math.abs(labelPos.x - cx) < 4 ? "middle" : labelPos.x > cx ? "start" : "end";
        const lines = wrapLabel(p.label);
        const lineHeight = 13;
        const startY = labelPos.y - ((lines.length - 1) * lineHeight) / 2;
        return (
          <text
            key={p.id}
            textAnchor={anchor}
            className="fill-secondary"
            fontSize={11}
            fontWeight={500}
          >
            {lines.map((line, li) => (
              <tspan key={li} x={labelPos.x} y={startY + li * lineHeight}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

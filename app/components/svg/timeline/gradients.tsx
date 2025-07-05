import { colorSchemes } from "./constants";

export function TimelineGradients() {
  return (
    <defs>
      <style>{`
        .timeline-title { font: bold 20px 'Segoe UI', Ubuntu, Sans-Serif; }
        .year-text { font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif; }
        .content-text { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; }
        .timeline-line { stroke: #d1d5db; stroke-width: 2; }
      `}</style>
      {Object.entries(colorSchemes).map(([colorName, scheme]) => (
        <linearGradient key={colorName} id={`gradient-${colorName}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: scheme.primary, stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: scheme.light, stopOpacity: 1}} />
        </linearGradient>
      ))}
    </defs>
  );
}
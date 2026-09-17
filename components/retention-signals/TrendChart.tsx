"use client";
import React, { useId } from "react";
import type { StatusKind } from "@/lib/retention-signals-data";

export interface ChartSeries {
  id: string;
  label: string;
  values: number[];
  status: StatusKind;
}

const STATUS_STROKE: Record<StatusKind, string> = {
  risk: "var(--color-risk)",
  warn: "var(--color-warn)",
  info: "var(--color-info)",
  stable: "var(--color-stable)",
};

interface Props {
  labels: string[];
  series: ChartSeries[];
  /** Index of the vertical release reference line, or null to hide. */
  releaseIndex: number | null;
  releaseLabel?: string;
  activeIndex: number | null;
  onPointSelect: (index: number) => void;
  valueSuffix?: string;
}

const W = 820;
const H = 320;
const PAD = { top: 24, right: 24, bottom: 40, left: 44 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

export default function TrendChart({
  labels,
  series,
  releaseIndex,
  releaseLabel,
  activeIndex,
  onPointSelect,
  valueSuffix = "",
}: Props) {
  const gradId = useId();
  const n = labels.length;

  const maxVal = Math.max(
    1,
    ...series.flatMap((s) => s.values),
  );
  // Round the max up to a clean gridline value.
  const yMax = niceCeil(maxVal);

  const x = (i: number) => PAD.left + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - (v / yMax) * plotH;

  const gridLines = 4;
  const yTicks = Array.from({ length: gridLines + 1 }, (_, i) => (yMax / gridLines) * i);

  const releaseX = releaseIndex != null ? x(releaseIndex) : null;

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Trend chart: ${series.map((s) => s.label).join(", ")} across ${labels[0]} to ${labels[n - 1]}`}
      >
        {/* Gridlines + y labels */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(t)}
              y2={y(t)}
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <text
              x={PAD.left - 10}
              y={y(t) + 4}
              textAnchor="end"
              className="fill-muted"
              style={{ fontSize: 11 }}
            >
              {Math.round(t)}
            </text>
          </g>
        ))}

        {/* Release reference line */}
        {releaseX != null && (
          <g>
            <line
              x1={releaseX}
              x2={releaseX}
              y1={PAD.top}
              y2={PAD.top + plotH}
              stroke="var(--color-risk)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <circle cx={releaseX} cy={PAD.top} r={3} fill="var(--color-risk)" />
          </g>
        )}

        {/* X labels */}
        {labels.map((lab, i) => (
          <text
            key={lab + i}
            x={x(i)}
            y={H - PAD.bottom + 20}
            textAnchor="middle"
            className={i === activeIndex ? "fill-foreground" : "fill-muted"}
            style={{ fontSize: 11, fontWeight: i === activeIndex ? 600 : 400 }}
          >
            {lab}
          </text>
        ))}

        {/* Series */}
        {series.map((s) => {
          const stroke = STATUS_STROKE[s.status];
          const linePath = s.values
            .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`)
            .join(" ");
          const areaPath =
            `M ${x(0)} ${y(0)} ` +
            s.values.map((v, i) => `L ${x(i)} ${y(v)}`).join(" ") +
            ` L ${x(n - 1)} ${y(0)} Z`;
          const isRiskSeries = s.status === "risk";
          return (
            <g key={s.id}>
              {isRiskSeries && (
                <>
                  <defs>
                    <linearGradient id={`${gradId}-${s.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={stroke} stopOpacity={0.18} />
                      <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill={`url(#${gradId}-${s.id})`} />
                </>
              )}
              <path d={linePath} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
              {s.values.map((v, i) => {
                const active = i === activeIndex;
                return (
                  <circle
                    key={i}
                    cx={x(i)}
                    cy={y(v)}
                    r={active ? 5.5 : 3.5}
                    fill={active ? stroke : "var(--color-surface)"}
                    stroke={stroke}
                    strokeWidth={2}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Invisible click/keyboard targets per observation */}
        {labels.map((lab, i) => (
          <rect
            key={"hit" + i}
            x={x(i) - plotW / (n - 1) / 2}
            y={PAD.top}
            width={plotW / (n - 1)}
            height={plotH}
            fill="transparent"
            className="cursor-pointer focus:outline-none"
            tabIndex={0}
            role="button"
            aria-label={`Inspect ${lab}`}
            onClick={() => onPointSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPointSelect(i);
              }
            }}
          />
        ))}
      </svg>

      {releaseLabel && releaseIndex != null && (
        <figcaption className="mt-2 flex items-center gap-2 text-xs text-muted">
          <span className="inline-block h-3 w-0 border-l border-dashed border-risk" aria-hidden="true" />
          {releaseLabel}
          {valueSuffix ? <span className="sr-only"> values shown in {valueSuffix}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}

function niceCeil(v: number): number {
  if (v <= 10) return Math.ceil(v / 2) * 2;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / (mag / 2)) * (mag / 2);
}

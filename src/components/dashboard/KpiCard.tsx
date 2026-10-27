'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string;
  unit?: string;
  description: string;
  secondaryInfo?: string;
  change?: {
    value: string;
    isPositive: boolean;
    comparisonText: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  isPrimary?: boolean;
  actionText?: string;
  onAction?: () => void;
  sparklinePoints?: number[];
}

export default function KpiCard({
  label,
  value,
  unit,
  description,
  secondaryInfo,
  change,
  icon: Icon,
  isPrimary = false,
  actionText,
  onAction,
  sparklinePoints,
}: KpiCardProps) {
  // Minimalist SVG sparkline for primary card
  const renderSparkline = () => {
    if (!sparklinePoints || sparklinePoints.length < 2) return null;
    const min = Math.min(...sparklinePoints);
    const max = Math.max(...sparklinePoints);
    const range = max - min || 1;
    const width = 64;
    const height = 18;

    const points = sparklinePoints
      .map((val, idx) => {
        const x = (idx / (sparklinePoints.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 4) - 2;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg
        className="w-16 h-4.5 overflow-visible shrink-0 opacity-80"
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden="true"
      >
        <polyline
          fill="none"
          stroke="#0D9488"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="flockora-card p-4 sm:p-5 flex flex-col justify-between h-full">
      {/* Top Row: Label and Consistent Icon Container */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#64748B]">
            {label}
          </span>
          <div
            className={`p-2 rounded-lg shrink-0 ml-2 ${
              isPrimary
                ? 'bg-[#0D9488]/10 text-[#0D9488]'
                : 'bg-slate-100 text-[#172033]'
            }`}
            aria-hidden="true"
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Large Readable Number (Not overbold, clean) */}
        <div className="mt-2.5 flex items-baseline space-x-1.5">
          <span className="text-2xl font-bold tracking-tight text-[#172033]">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-medium text-[#64748B] uppercase">
              {unit}
            </span>
          )}
        </div>

        {/* Supporting Description */}
        <p className="mt-1 text-xs text-[#64748B] font-normal truncate">
          {description}
        </p>
      </div>

      {/* Bottom Section: Comparison / Secondary info */}
      <div className="mt-3.5 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        {change ? (
          <div className="flex items-center space-x-1.5">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium ${
                change.isPositive
                  ? 'bg-[#0D9488]/10 text-[#0D9488]'
                  : 'bg-rose-50 text-[#DC2626]'
              }`}
            >
              {change.isPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {change.value}
            </span>
            <span className="text-[11px] text-[#64748B]">
              {change.comparisonText}
            </span>
          </div>
        ) : secondaryInfo ? (
          <span className="text-[11px] text-[#64748B] truncate">
            {secondaryInfo}
          </span>
        ) : (
          <span />
        )}

        {actionText && onAction ? (
          <button
            onClick={onAction}
            className="inline-flex items-center text-[11px] font-medium text-[#0D9488] hover:text-[#0f766e] transition-colors ml-2 shrink-0 cursor-pointer"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        ) : (
          renderSparkline()
        )}
      </div>
    </div>
  );
}

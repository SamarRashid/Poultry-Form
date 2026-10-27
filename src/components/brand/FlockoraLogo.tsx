import React from 'react';

interface FlockoraLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  lightText?: boolean;
}

export default function FlockoraLogo({
  className = '',
  size = 38,
  showText = true,
  lightText = true,
}: FlockoraLogoProps) {
  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Refined Geometric Feather & Egg-Silhouette Logo Mark */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-lg bg-white/10 border border-white/20 p-1.5 shadow-2xs"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <svg
          width={size - 14}
          height={size - 14}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Egg Silhouette Outer Arc */}
          <path
            d="M16 3C10.5 3 6 8.5 6 15.5C6 22.5 10.5 28 16 28C21.5 28 26 22.5 26 15.5C26 8.5 21.5 3 16 3Z"
            stroke="#2DD4BF"
            strokeWidth="1.8"
            strokeOpacity="0.6"
            fill="#2DD4BF"
            fillOpacity="0.15"
          />

          {/* Feather Central Spine */}
          <path
            d="M9.5 22.5C13 18.5 16 13 22 7.5"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Upper Vane Leaf / Apex (Fresh Lime Highlight Point) */}
          <path
            d="M22 7.5C22 7.5 24 10.8 21 13.2C18 15.2 16 15 16 15"
            stroke="#C4F16A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Lower Vane Lines */}
          <path
            d="M17 11.5C14.5 13.5 12.5 15.5 12 18"
            stroke="#2DD4BF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M13.8 15.2C12 17 10.5 19 10 20.8"
            stroke="#2DD4BF"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Micro Accent Point */}
          <circle cx="22.5" cy="7.5" r="1.5" fill="#C4F16A" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`text-[17.5px] font-bold tracking-tight ${
              lightText ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Flockora
          </span>
          <span
            className={`text-[11px] font-medium tracking-normal mt-0.5 ${
              lightText ? 'text-teal-200/70' : 'text-[#64748B]'
            }`}
          >
            Farm Intelligence
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

interface InteractiveBotanicalProps {
  className?: string;
  label?: string;
}

export default function InteractiveBotanical({
  className = "",
  label = "Touch to breathe with the branch",
}: InteractiveBotanicalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [bloomed, setBloomed] = useState(false);

  const handleClick = () => {
    setBloomed((prev) => !prev);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive botanical illustration. Tap or hover to gently unfold leaves."
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="relative w-36 h-48 sm:w-44 sm:h-56 flex items-center justify-center">
        {/* Floating pollen/micro-particles when hovered or bloomed */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            isHovered || bloomed ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <span className="botanical-drift-mote mote-1" />
          <span className="botanical-drift-mote mote-2" />
          <span className="botanical-drift-mote mote-3" />
          <span className="botanical-drift-mote mote-4" />
        </div>

        {/* Botanical Stem & Foliage SVG */}
        <svg
          viewBox="0 0 160 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-sm transition-transform duration-700 ease-out"
          style={{
            transform: isHovered || bloomed ? "scale(1.04)" : "scale(1)",
          }}
        >
          {/* Main Stem with gentle curve */}
          <path
            d="M 80 215 C 80 180, 75 140, 80 90 C 83 55, 78 30, 80 12"
            stroke="#65765d"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transition-all duration-700"
          />

          {/* Lateral branching lines */}
          <path
            d="M 79 170 C 72 165, 58 160, 44 162"
            stroke="#65765d"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 80 145 C 90 140, 106 137, 120 140"
            stroke="#65765d"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 78 115 C 70 110, 56 104, 42 107"
            stroke="#65765d"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 81 85 C 92 80, 108 77, 122 81"
            stroke="#65765d"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M 79 55 C 73 50, 62 45, 52 48"
            stroke="#65765d"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Leaf 1 - Lower Left */}
          <g
            className="transition-transform duration-700 ease-out origin-[44px_162px]"
            style={{
              transform: isHovered || bloomed ? "rotate(-8deg) scale(1.08)" : "rotate(0deg)",
            }}
          >
            <path
              d="M 44 162 C 30 162, 18 152, 14 138 C 22 135, 36 142, 44 162 Z"
              fill="#dce5d7"
              stroke="#65765d"
              strokeWidth="1.2"
            />
            {/* Fine leaf vein */}
            <path
              d="M 44 162 C 32 154, 22 145, 16 140"
              stroke="#65765d"
              strokeWidth="0.8"
              opacity="0.6"
            />
          </g>

          {/* Leaf 2 - Lower Right */}
          <g
            className="transition-transform duration-700 ease-out origin-[120px_140px]"
            style={{
              transform: isHovered || bloomed ? "rotate(10deg) scale(1.1)" : "rotate(0deg)",
            }}
          >
            <path
              d="M 120 140 C 134 140, 148 130, 150 116 C 142 113, 128 120, 120 140 Z"
              fill="#dce5d7"
              stroke="#65765d"
              strokeWidth="1.2"
            />
            <path
              d="M 120 140 C 132 132, 142 123, 148 118"
              stroke="#65765d"
              strokeWidth="0.8"
              opacity="0.6"
            />
          </g>

          {/* Leaf 3 - Mid Left */}
          <g
            className="transition-transform duration-700 ease-out origin-[42px_107px]"
            style={{
              transform: isHovered || bloomed ? "rotate(-12deg) scale(1.06)" : "rotate(0deg)",
            }}
          >
            <path
              d="M 42 107 C 28 107, 18 97, 16 83 C 24 81, 36 88, 42 107 Z"
              fill="#dce5d7"
              stroke="#65765d"
              strokeWidth="1.2"
            />
            <path
              d="M 42 107 C 32 99, 24 90, 18 85"
              stroke="#65765d"
              strokeWidth="0.8"
              opacity="0.6"
            />
          </g>

          {/* Leaf 4 - Mid Right */}
          <g
            className="transition-transform duration-700 ease-out origin-[122px_81px]"
            style={{
              transform: isHovered || bloomed ? "rotate(12deg) scale(1.08)" : "rotate(0deg)",
            }}
          >
            <path
              d="M 122 81 C 136 81, 148 71, 149 57 C 141 55, 129 62, 122 81 Z"
              fill="#dce5d7"
              stroke="#65765d"
              strokeWidth="1.2"
            />
            <path
              d="M 122 81 C 134 73, 142 64, 147 59"
              stroke="#65765d"
              strokeWidth="0.8"
              opacity="0.6"
            />
          </g>

          {/* Leaf 5 - Upper Left */}
          <g
            className="transition-transform duration-700 ease-out origin-[52px_48px]"
            style={{
              transform: isHovered || bloomed ? "rotate(-10deg) scale(1.05)" : "rotate(0deg)",
            }}
          >
            <path
              d="M 52 48 C 40 48, 30 39, 28 27 C 36 26, 46 32, 52 48 Z"
              fill="#dce5d7"
              stroke="#65765d"
              strokeWidth="1.2"
            />
          </g>

          {/* Top Tender Bud / Terminal Leaflet */}
          <g
            className="transition-transform duration-700 ease-out origin-[80px_12px]"
            style={{
              transform: isHovered || bloomed ? "scale(1.18)" : "scale(1)",
            }}
          >
            <path
              d="M 80 12 C 73 5, 76 0, 80 -4 C 84 0, 87 5, 80 12 Z"
              fill="#b87557"
              stroke="#b87557"
              strokeWidth="1"
            />
          </g>

          {/* Small Terracotta Seed Pods at nodes */}
          <circle
            cx="78"
            cy="115"
            r={isHovered || bloomed ? 3.5 : 2.5}
            fill="#b87557"
            className="transition-all duration-500"
          />
          <circle
            cx="81"
            cy="85"
            r={isHovered || bloomed ? 3.5 : 2.5}
            fill="#b87557"
            className="transition-all duration-500"
          />
          <circle
            cx="80"
            cy="145"
            r={isHovered || bloomed ? 3.5 : 2.5}
            fill="#ba9d6a"
            className="transition-all duration-500"
          />
        </svg>
      </div>

      {label && (
        <span className="mt-2 text-xs font-mono tracking-wider uppercase text-[var(--color-graphite)] opacity-75 group-hover:opacity-100 group-hover:text-[var(--color-terracotta-seal)] transition-colors">
          {label}
        </span>
      )}
    </div>
  );
}


import React from 'react';

export default function Logo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 shadow-md shadow-indigo-500/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${className} text-white transform -rotate-12`}
        >
          <path d="M4 12l14-8-4 16-3-6-7-2z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight text-white">
          VEKTOR
        </span>
        <span className="text-[9px] tracking-widest text-indigo-400 font-semibold uppercase -mt-1">
          Career Engine
        </span>
      </div>
    </div>
  );
}
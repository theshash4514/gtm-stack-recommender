"use client";

interface WhatToSkipProps {
  items: string[];
}

export function WhatToSkip({ items }: WhatToSkipProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border-2 border-[#e45337]/20 bg-[#e45337]/5 p-6">
      <h3 className="text-xl font-extrabold text-[#444141] mb-4 flex items-center gap-2">
        <span className="text-[#e45337]">⚠️</span> What to Skip
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="shrink-0 text-[#e45337] mt-0.5 font-bold">✕</span>
            <span className="text-[#444141] font-normal">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

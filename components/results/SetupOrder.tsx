"use client";

interface SetupOrderProps {
  steps: string[];
}

export function SetupOrder({ steps }: SetupOrderProps) {
  return (
    <div className="rounded-2xl border-2 border-[#efefef] bg-white p-6">
      <h3 className="text-xl font-extrabold text-[#444141] mb-4 flex items-center gap-2">
        <span className="text-[#e45337]">📋</span> Setup Order
      </h3>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-[#e45337] text-white text-sm font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-[#444141] pt-0.5 font-normal">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

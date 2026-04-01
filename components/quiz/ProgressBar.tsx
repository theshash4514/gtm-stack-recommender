"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="flex justify-between text-sm text-[#444141]/50 mb-2 font-semibold">
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-[#efefef] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#e45337] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

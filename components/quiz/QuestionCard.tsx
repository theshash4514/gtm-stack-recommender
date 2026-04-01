"use client";

import { QuizQuestion } from "@/lib/types";

interface QuestionCardProps {
  question: QuizQuestion;
  onAnswer: (value: string) => void;
  isVisible: boolean;
}

export function QuestionCard({ question, onAnswer, isVisible }: QuestionCardProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-8 pointer-events-none"
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#444141] text-center mb-10">
        {question.question}
      </h2>

      <div className="w-full max-w-lg space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full group relative px-6 py-5 rounded-xl border-2 border-[#efefef] bg-white hover:border-[#e45337] text-left transition-all duration-200 hover:shadow-md hover:shadow-[#e45337]/10"
          >
            <span className="text-lg text-[#444141] group-hover:text-[#444141] font-semibold transition-colors">
              {option.label}
            </span>
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#efefef] group-hover:text-[#e45337] transition-colors text-xl font-bold">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

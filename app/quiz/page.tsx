"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/stacks";
import { QuizAnswers } from "@/lib/types";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { EmailGate } from "@/components/EmailGate";
import { getRecommendation } from "@/lib/stacks";
import { saveLead } from "@/lib/supabase";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAnswer = useCallback(
    (value: string) => {
      const question = questions[currentQuestion];
      const newAnswers = { ...answers, [question.id]: value };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizComplete(true);
      }
    },
    [currentQuestion, answers]
  );

  const handleLeadSubmit = async (linkedinUrl: string, companyName?: string) => {
    const fullAnswers = answers as QuizAnswers;
    const recommendation = getRecommendation(fullAnswers);

    const stackId = recommendation.layers
      .map((l) => l.tools.map((t) => t.name).join("+"))
      .join("|");

    setSaving(true);
    try {
      await saveLead({
        linkedin_url: linkedinUrl,
        company_name: companyName,
        answers: answers as Record<string, string>,
        recommended_stack: stackId,
        total_monthly_cost: recommendation.totalMonthlyCost,
      });
    } catch {
      console.warn("Lead save failed — Supabase may not be configured");
    }
    setSaving(false);

    sessionStorage.setItem("quiz_answers", JSON.stringify(answers));
    router.push("/results");
  };

  if (quizComplete) {
    return <EmailGate onSubmit={handleLeadSubmit} loading={saving} />;
  }

  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col">
      <div className="relative z-10 flex-1 flex flex-col max-w-2xl mx-auto w-full pt-12 px-6">
        {/* Logo */}
        <p className="text-[#e45337] font-extrabold text-xl tracking-tight text-center mb-8">
          Crescendo
        </p>

        <ProgressBar current={currentQuestion} total={questions.length} />

        <div className="relative flex-1">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              onAnswer={handleAnswer}
              isVisible={i === currentQuestion}
            />
          ))}
        </div>

        {currentQuestion > 0 && (
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className="relative z-10 self-start mb-8 text-[#444141]/40 hover:text-[#e45337] transition-colors text-sm font-semibold"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

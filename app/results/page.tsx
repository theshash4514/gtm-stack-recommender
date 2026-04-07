"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizAnswers, StackRecommendation } from "@/lib/types";
import { getRecommendation } from "@/lib/stacks";
import { LayerSection } from "@/components/results/LayerSection";
import { SetupOrder } from "@/components/results/SetupOrder";
import { WhatToSkip } from "@/components/results/WhatToSkip";
import { ShareButton } from "@/components/results/ShareButton";

export default function ResultsPage() {
  const router = useRouter();
  const [recommendation, setRecommendation] = useState<StackRecommendation | null>(null);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("quiz_answers");
    if (!stored) {
      router.push("/quiz");
      return;
    }

    const answers = JSON.parse(stored) as QuizAnswers;
    const rec = getRecommendation(answers);
    setRecommendation(rec);
    setSummary(rec.summary);
  }, [router]);

  if (!recommendation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-[#e45337] text-lg font-semibold">Loading your stack...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efefef]">
      {/* White header section */}
      <div className="bg-white pb-10">
        <div className="max-w-3xl mx-auto px-6 pt-8">
          {/* Logo */}
          <p className="text-[#e45337] font-extrabold text-xl tracking-tight text-center mb-10">
            Crescendo
          </p>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#444141] mb-4">
              Your Recommended GTM Stack
            </h1>
            <p className="text-[#444141]/50 text-sm md:text-base font-semibold">
              {summary}
            </p>
          </div>

          {/* Total Cost Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#efefef] border-2 border-[#e45337]/20">
              <span className="text-[#444141]/60 text-sm font-semibold">Total Monthly Cost</span>
              <span className="text-2xl font-extrabold text-[#e45337]">
                ~${recommendation.totalMonthlyCost}/mo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stack layers on off-white background */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* 5-Layer Stack */}
        <div className="space-y-6 mb-12">
          {recommendation.layers.map((layer, i) => (
            <LayerSection key={layer.layer} layer={layer} index={i} />
          ))}
        </div>

        {/* Why This Stack */}
        <div className="rounded-2xl border-2 border-[#efefef] bg-white p-6 mb-6">
          <h3 className="text-xl font-extrabold text-[#444141] mb-3 flex items-center gap-2">
            <span className="text-[#e45337]">💡</span> Why This Stack?
          </h3>
          <p className="text-[#444141] leading-relaxed font-normal">{recommendation.reasoning}</p>
        </div>

        {/* Setup Order */}
        <div className="mb-6">
          <SetupOrder steps={recommendation.setupOrder} />
        </div>

        {/* What to Skip */}
        <div className="mb-10">
          <WhatToSkip items={recommendation.whatToSkip} />
        </div>

        {/* CTA — Book a call */}
        <div className="rounded-2xl border-2 border-[#e45337]/20 bg-white p-8 mb-8 text-center">
          <h3 className="text-2xl font-extrabold text-[#444141] mb-3">
            Need help implementing your stack?
          </h3>
          <p className="text-[#444141]/60 mb-6 max-w-md mx-auto font-normal">
            I&apos;ve helped clients generate over <span className="font-bold text-[#444141]">$80M in revenue</span>. Book a call and let&apos;s build your GTM engine together.
          </p>
          <a
            href="https://calendly.com/shash-singh/30-min-call-discovery"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#e45337] hover:bg-[#c9432b] text-white text-lg px-10 py-4 rounded-xl shadow-lg shadow-[#e45337]/20 transition-all hover:shadow-[#e45337]/30 hover:scale-105 font-bold">
              Book a Call →
            </button>
          </a>
        </div>

        {/* Share */}
        <div className="rounded-2xl border-2 border-[#efefef] bg-white p-6 mb-8">
          <h3 className="text-xl font-extrabold text-[#444141] mb-4 text-center">
            Share Your Stack
          </h3>
          <ShareButton recommendation={recommendation} />
        </div>

        {/* Retake */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              sessionStorage.removeItem("quiz_answers");
              router.push("/quiz");
            }}
            className="text-[#444141]/40 hover:text-[#e45337] transition-colors text-sm font-semibold"
          >
            ← Retake the quiz
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-[#444141]/40 text-sm border-t-2 border-[#efefef]">
          <a
            href="https://crescendo.so"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e45337] transition-colors font-semibold"
          >
            Powered by Crescendo
          </a>
        </footer>
      </div>
    </div>
  );
}

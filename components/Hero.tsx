"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e45337]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#e45337]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Logo */}
        <p className="text-[#e45337] font-extrabold text-2xl tracking-tight mb-10">
          Crescendo
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#efefef] text-[#444141] text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-[#e45337] rounded-full animate-pulse" />
          Built from analysis of 100+ GTM tool combinations. Updated March 2026.
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#444141] mb-6 leading-[1.1]">
          What GTM Stack Should You{" "}
          <span className="text-[#e45337]">Actually</span>{" "}
          Use?
        </h1>

        <p className="text-xl text-[#444141]/60 mb-10 max-w-xl mx-auto font-normal">
          Answer 6 questions. Get a personalized 5-layer recommendation in 30
          seconds. No fluff, no 50-tool listicles.
        </p>

        <Link href="/quiz">
          <Button
            size="lg"
            className="bg-[#e45337] hover:bg-[#c9432b] text-white text-lg px-10 py-7 rounded-xl shadow-lg shadow-[#e45337]/20 transition-all hover:shadow-[#e45337]/30 hover:scale-105 font-bold"
          >
            Find My Stack →
          </Button>
        </Link>

        <p className="text-sm text-[#444141]/40 mt-6 font-normal">
          Free. No sign-up required to start.
        </p>
      </div>
    </section>
  );
}

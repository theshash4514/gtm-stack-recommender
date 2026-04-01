"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailGateProps {
  onSubmit: (email: string, companyName?: string) => void;
  loading?: boolean;
}

export function EmailGate({ onSubmit, loading }: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubmit(email, companyName || undefined);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-[#e45337] font-extrabold text-xl tracking-tight mb-8">
            Crescendo
          </p>
          <div className="w-16 h-16 bg-[#e45337] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#e45337]/20">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#444141] mb-3">
            Your stack is ready.
          </h2>
          <p className="text-[#444141]/60 font-normal">
            Where should we send it?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-[#444141] font-semibold">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 bg-white border-2 border-[#efefef] text-[#444141] placeholder:text-[#444141]/30 h-12 focus:border-[#e45337] focus:ring-[#e45337]/20 rounded-xl"
            />
          </div>

          <div>
            <Label htmlFor="company" className="text-[#444141] font-semibold">
              Company name{" "}
              <span className="text-[#444141]/40 font-normal">(optional)</span>
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Acme Inc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1.5 bg-white border-2 border-[#efefef] text-[#444141] placeholder:text-[#444141]/30 h-12 focus:border-[#e45337] focus:ring-[#e45337]/20 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={!email || loading}
            className="w-full bg-[#e45337] hover:bg-[#c9432b] text-white h-12 text-lg rounded-xl shadow-lg shadow-[#e45337]/20 transition-all hover:shadow-[#e45337]/30 disabled:opacity-50 font-bold"
          >
            {loading ? "Loading..." : "Get My Stack →"}
          </Button>

          <p className="text-xs text-[#444141]/40 text-center mt-3 font-normal">
            We&apos;ll also send you a setup checklist. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}

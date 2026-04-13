"use client";

import { useEffect, useState } from "react";
import { ToolRecommendation } from "@/lib/types";
import { getAffiliateLink } from "@/lib/affiliates";

interface StackCardProps {
  tool: ToolRecommendation;
}

export function StackCard({ tool }: StackCardProps) {
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    setRef(sessionStorage.getItem("affiliate_ref"));
  }, []);

  return (
    <div className="group flex items-center justify-between gap-4 p-4 rounded-xl bg-white border-2 border-[#efefef] hover:border-[#e45337]/30 transition-all hover:shadow-sm">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-bold text-[#444141] text-lg">{tool.name}</h4>
          <span className="text-sm text-[#e45337] font-semibold whitespace-nowrap">
            {tool.price}
          </span>
        </div>
        <p className="text-sm text-[#444141]/60 font-normal">{tool.description}</p>
        <p className="text-xs text-[#444141]/40 mt-1 font-normal">{tool.reason}</p>
      </div>
      <a
        href={getAffiliateLink(tool.affiliateKey, ref)}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 px-4 py-2 rounded-lg bg-[#e45337] text-white text-sm font-bold hover:bg-[#c9432b] transition-all whitespace-nowrap shadow-sm shadow-[#e45337]/20"
      >
        Get Started →
      </a>
    </div>
  );
}

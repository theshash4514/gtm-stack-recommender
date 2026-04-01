"use client";

import { useState } from "react";
import { StackRecommendation } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  recommendation: StackRecommendation;
}

export function ShareButton({ recommendation }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `Just found my ideal GTM stack:

${recommendation.layers.map((l) => `${l.icon} ${l.tools.map((t) => t.name).join(" + ")}`).join("\n")}

Total: ~$${recommendation.totalMonthlyCost}/mo

Find yours → ${typeof window !== "undefined" ? window.location.origin : ""}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.origin : ""
  )}`;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1"
      >
        <Button className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white h-12 rounded-xl text-base font-bold">
          Share on LinkedIn
        </Button>
      </a>
      <Button
        onClick={handleCopy}
        variant="outline"
        className="flex-1 h-12 rounded-xl text-base border-2 border-[#efefef] bg-white text-[#444141] hover:bg-[#efefef] hover:text-[#444141] font-bold"
      >
        {copied ? "Copied!" : "Copy Share Text"}
      </Button>
    </div>
  );
}

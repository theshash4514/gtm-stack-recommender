"use client";

import { useState } from "react";
import { StackRecommendation } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  recommendation: StackRecommendation;
}

export function ShareButton({ recommendation }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  const shareText = `I took the GTM Stack quiz and here's my perfect stack:

${recommendation.layers.map((l) => `${l.icon} ${l.tools.map((t) => t.name).join(" + ")}`).join("\n")}

Total: ~$${recommendation.totalMonthlyCost}/mo

Take it yourself → ${siteUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;

  const xText = encodeURIComponent(`I took the GTM Stack quiz — here's my perfect stack:

${recommendation.layers.map((l) => `${l.icon} ${l.tools.map((t) => t.name).join(" + ")}`).join("\n")}

~$${recommendation.totalMonthlyCost}/mo total.

Find yours 👇`);
  const xUrl = `https://x.com/intent/tweet?text=${xText}&url=${encodeURIComponent(siteUrl)}`;

  return (
    <div className="space-y-3">
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
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button className="w-full bg-[#000000] hover:bg-[#333333] text-white h-12 rounded-xl text-base font-bold">
            Share on X
          </Button>
        </a>
      </div>
      <Button
        onClick={handleCopy}
        variant="outline"
        className="w-full h-12 rounded-xl text-base border-2 border-[#efefef] bg-white text-[#444141] hover:bg-[#efefef] hover:text-[#444141] font-bold"
      >
        {copied ? "Copied!" : "Copy Share Text"}
      </Button>
    </div>
  );
}

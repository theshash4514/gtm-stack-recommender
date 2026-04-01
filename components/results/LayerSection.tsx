"use client";

import { LayerRecommendation } from "@/lib/types";
import { StackCard } from "./StackCard";

interface LayerSectionProps {
  layer: LayerRecommendation;
  index: number;
}

export function LayerSection({ layer, index }: LayerSectionProps) {
  const layerCost = layer.tools.reduce((sum, t) => sum + t.priceValue, 0);

  return (
    <div className="relative">
      {/* Connector line */}
      {index > 0 && (
        <div className="absolute left-8 -top-4 w-0.5 h-4 bg-[#e45337]/30" />
      )}

      <div className="rounded-2xl border-2 border-[#efefef] bg-white overflow-hidden shadow-sm">
        {/* Layer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#efefef] bg-[#efefef]/50">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{layer.icon}</span>
            <div>
              <h3 className="font-extrabold text-[#444141] text-lg">{layer.label}</h3>
              <p className="text-xs text-[#444141]/40 uppercase tracking-wider font-bold">
                Layer {index + 1}
              </p>
            </div>
          </div>
          <span className="text-sm text-[#e45337] font-bold">
            ~${layerCost}/mo
          </span>
        </div>

        {/* Tool cards */}
        <div className="p-4 space-y-3">
          {layer.tools.map((tool) => (
            <StackCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function RefCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      sessionStorage.setItem("affiliate_ref", ref);
    }
  }, [searchParams]);

  return null;
}

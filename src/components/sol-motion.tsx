"use client";

import { useLanguage } from "./language-provider";
import { useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

export function SolMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { t } = useLanguage();
  const [paused, setPaused] = useState(false);
  return <div className={`casa-home ${className}`} data-motion-paused={paused}>
    {children}
    <div className="sol-motion-control"><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
      {paused ? <Play size={12} /> : <Pause size={12} />}{t(paused ? "Resume animations" : "Pause animations")}
    </button></div>
  </div>;
}

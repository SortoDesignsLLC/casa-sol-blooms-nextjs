import { BotanicalBranch, SunMedallion } from "@/components/sol-illustrations";

/** Fine botanical linework is kept at the edges of each composition. */
export function SolBackground({ variant = "sunshine" }: { variant?: "sunshine" | "garden" | "coffee" }) {
  return <div className={`sol-background sol-background-${variant}`} aria-hidden="true">
    <SunMedallion className="sol-margin-sun" />
    <BotanicalBranch className="sol-margin-branch" berries={variant === "coffee"} />
    {variant === "garden" && <BotanicalBranch className="sol-margin-branch sol-margin-branch-secondary" />}
    <svg className="sol-margin-contour" viewBox="0 0 620 150" fill="none" stroke="currentColor" strokeWidth=".8">
      <path d="M-20 133 C93 141 81 27 203 43 S390 123 643 20 M-20 141 C100 149 92 40 208 54 S398 138 643 32 M-20 149 C105 157 102 53 213 65 S410 150 643 44" />
      <path d="M97 105 C103 64 133 68 148 75 C126 97 108 100 97 105Z M105 96 Q124 85 141 78" />
    </svg>
  </div>;
}

export function SolWave() {
  return <svg className="sol-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28 Q90 0 180 28 T360 28 T540 28 T720 28 T900 28 T1080 28 T1260 28 T1440 28 V60 H0Z" fill="currentColor" /></svg>;
}

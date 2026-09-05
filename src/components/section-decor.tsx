import { Leaf, Heart, Sparkles, Coffee, Sun, Flower2, Citrus, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const sets: Record<
  string,
  { Icon: LucideIcon; className: string; delay: string; rot: string }[]
> = {
  a: [
    { Icon: Leaf, className: "left-[4%] top-[12%] size-16", delay: "0s", rot: "-18deg" },
    { Icon: Heart, className: "right-[6%] top-[24%] size-12", delay: "1.4s", rot: "12deg" },
    { Icon: Sparkles, className: "left-[12%] bottom-[10%] size-10", delay: "2.6s", rot: "8deg" },
    { Icon: Sun, className: "right-[10%] bottom-[16%] size-20", delay: "0.8s", rot: "0deg" },
    { Icon: Flower2, className: "left-[30%] top-[6%] size-12", delay: "3.4s", rot: "10deg" },
    { Icon: Citrus, className: "right-[28%] bottom-[6%] size-10", delay: "2.1s", rot: "-12deg" },
    { Icon: Coffee, className: "left-[46%] bottom-[28%] size-14", delay: "4s", rot: "6deg" },
    { Icon: Star, className: "right-[36%] top-[40%] size-8", delay: "1.7s", rot: "-8deg" },
    { Icon: Heart, className: "left-[8%] top-[52%] size-9", delay: "3.8s", rot: "16deg" },
  ],
  b: [
    { Icon: Coffee, className: "right-[5%] top-[14%] size-16", delay: "0.5s", rot: "14deg" },
    { Icon: Flower2, className: "left-[6%] top-[30%] size-14", delay: "2s", rot: "-10deg" },
    { Icon: Star, className: "left-[18%] bottom-[12%] size-9", delay: "3s", rot: "6deg" },
    { Icon: Sparkles, className: "right-[14%] bottom-[8%] size-12", delay: "1.2s", rot: "-6deg" },
    { Icon: Leaf, className: "left-[34%] top-[8%] size-12", delay: "3.6s", rot: "-16deg" },
    { Icon: Sun, className: "right-[30%] bottom-[30%] size-14", delay: "2.3s", rot: "0deg" },
    { Icon: Heart, className: "left-[10%] bottom-[36%] size-9", delay: "4.2s", rot: "12deg" },
    { Icon: Citrus, className: "right-[44%] top-[46%] size-10", delay: "1.5s", rot: "18deg" },
    { Icon: Flower2, className: "left-[48%] bottom-[6%] size-11", delay: "0.9s", rot: "-6deg" },
  ],
  c: [
    { Icon: Citrus, className: "left-[3%] top-[20%] size-14", delay: "0.3s", rot: "16deg" },
    { Icon: Heart, className: "right-[8%] top-[10%] size-10", delay: "1.8s", rot: "-14deg" },
    { Icon: Leaf, className: "right-[4%] bottom-[14%] size-16", delay: "2.4s", rot: "24deg" },
    { Icon: Sun, className: "left-[14%] bottom-[8%] size-12", delay: "1s", rot: "0deg" },
    { Icon: Sparkles, className: "left-[36%] top-[6%] size-11", delay: "3.1s", rot: "-10deg" },
    { Icon: Coffee, className: "right-[32%] bottom-[34%] size-12", delay: "2.7s", rot: "8deg" },
    { Icon: Star, className: "left-[6%] bottom-[38%] size-8", delay: "4.4s", rot: "14deg" },
    { Icon: Flower2, className: "right-[46%] top-[44%] size-10", delay: "1.6s", rot: "-18deg" },
    { Icon: Leaf, className: "left-[52%] bottom-[8%] size-12", delay: "0.7s", rot: "20deg" },
  ],
  d: [
    { Icon: Leaf, className: "left-[5%] top-[10%] size-20", delay: "0s", rot: "-14deg" },
    { Icon: Sparkles, className: "right-[7%] top-[18%] size-16", delay: "1.3s", rot: "10deg" },
    { Icon: Flower2, className: "left-[22%] bottom-[12%] size-20", delay: "2.5s", rot: "12deg" },
    { Icon: Citrus, className: "right-[16%] bottom-[10%] size-16", delay: "0.9s", rot: "-8deg" },
    { Icon: Heart, className: "left-[42%] top-[6%] size-14", delay: "3.3s", rot: "16deg" },
    { Icon: Star, className: "right-[38%] bottom-[38%] size-12", delay: "2.2s", rot: "-6deg" },
    { Icon: Coffee, className: "left-[8%] top-[52%] size-16", delay: "4.1s", rot: "6deg" },
    { Icon: Sun, className: "right-[4%] top-[54%] size-20", delay: "1.9s", rot: "0deg" },
    { Icon: Leaf, className: "left-[60%] bottom-[6%] size-14", delay: "3.7s", rot: "22deg" },
    { Icon: Heart, className: "right-[12%] top-[48%] size-12", delay: "0.4s", rot: "-10deg" },
    { Icon: Flower2, className: "right-[24%] top-[8%] size-14", delay: "2.9s", rot: "14deg" },
    { Icon: Sparkles, className: "left-[32%] bottom-[22%] size-12", delay: "4.6s", rot: "-4deg" },
  ],
};

const variantColor: Record<string, string> = {
  a: "text-primary/60",
  b: "text-primary/60",
  c: "text-primary/60",
  d: "text-primary/[0.9] decor-glow",
};

export function SectionDecor({ variant = "a" }: { variant?: "a" | "b" | "c" | "d" }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {sets[variant]!.map(({ Icon, className, delay, rot }, i) => (
        <Icon
          key={i}
          strokeWidth={1.2}
          className={`decor-pulse absolute ${variantColor[variant]} ${className}`}
          style={{ animationDelay: delay, ["--decor-rot" as string]: rot }}
        />
      ))}
    </div>
  );
}

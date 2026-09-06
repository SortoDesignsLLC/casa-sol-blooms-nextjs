/** Hand-drawn ornaments stay in the margins, leaving content clear. */
export function SolBackground({ variant = "sunshine" }: { variant?: "sunshine" | "garden" | "coffee" }) {
  return <div className={`sol-background sol-background-${variant}`} aria-hidden="true">
    <svg className="sol-bg-sun" viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="1.2">
      <g className="sol-turn">{Array.from({ length: 20 }, (_, i) => <path key={i} d="M120 65 C106 50 132 31 120 10" transform={`rotate(${i * 18} 120 120)`} />)}</g>
      <circle cx="120" cy="120" r="43" /><circle cx="120" cy="120" r="37" />
    </svg>
    <svg className="sol-bg-sprig" viewBox="0 0 160 280" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M78 270 C68 205 117 152 78 32" />
      <path d="M79 221 C15 214 21 165 35 168 C72 173 79 201 79 221ZM88 181 C145 162 151 121 136 126 C98 138 91 160 88 181ZM89 136 C34 132 27 88 41 93 C74 101 83 118 89 136ZM86 89 C125 69 121 40 113 44 C91 55 88 72 86 89Z" />
      <path d="M78 44 C51 19 64 4 73 12 C86 24 78 44 78 44Z" />
    </svg>
    <svg className="sol-bg-cup" viewBox="0 0 160 180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M37 53 L49 153 Q79 165 111 153 L123 53 M30 51 Q77 39 130 51 L129 61 Q80 70 31 61 Z M85 47 L96 8 M98 8 L109 12" />
      <path d="M47 105 Q67 96 83 104 T116 103" /><circle cx="81" cy="127" r="13" />
      <path d="M62 28 C47 20 38 31 47 37 C57 43 62 28 62 28Z" />
    </svg>
    <svg className="sol-bg-trail" viewBox="0 0 700 180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path pathLength="1" d="M-20 132 C95 4 178 180 287 85 S398 2 422 49 S376 133 355 85 S476 17 720 128" /></svg>
    {[0, 1, 2].map(i => <svg key={i} className={`sol-bg-spark sol-bg-spark-${i}`} viewBox="0 0 40 40" fill="currentColor"><path d="M20 2 Q22 18 38 20 Q22 22 20 38 Q18 22 2 20 Q18 18 20 2Z" /></svg>)}
  </div>;
}

export function SolWave() {
  return <svg className="sol-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28 Q90 0 180 28 T360 28 T540 28 T720 28 T900 28 T1080 28 T1260 28 T1440 28 V60 H0Z" fill="currentColor" /></svg>;
}

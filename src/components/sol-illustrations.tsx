/** Original linework shared by the menu, package emblems, and quiet page margins. */
export function SunMedallion({ className = "" }: { className?: string }) {
  return <svg className={`sol-medallion ${className}`} width="240" height="240" viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
    <g className="sol-sun-desktop-detail">
    <g className="sol-engraved-rays">{Array.from({ length: 24 }, (_, i) => <g key={i} transform={`rotate(${i * 15} 120 120)`}>
      {i % 2 === 0 ? <><path d="M116 65 C110 49 122 35 120 14 C133 38 125 51 124 65Z" fill="currentColor" fillOpacity=".1" /><path d="M120 61 Q116 42 120 24" strokeWidth=".6" /></> : <><path d="M120 64 L120 30 M117 38 L120 23 L123 38" /><circle cx="120" cy="15" r="1.8" fill="currentColor" stroke="none" /></>}
    </g>)}</g>
    <circle cx="120" cy="120" r="49" /><circle cx="120" cy="120" r="44" strokeWidth=".5" /><circle cx="120" cy="120" r="40" strokeDasharray=".7 3.2" />
    <path d="M88 120 Q101 105 110 119 M130 119 Q142 105 152 120 M120 113 L115 130 Q120 134 125 130 M105 141 Q120 151 135 141" strokeLinecap="round" />
    <path d="M93 125 Q100 129 107 125 M133 125 Q141 129 148 125" strokeWidth=".6" /><circle cx="94" cy="134" r="3" fill="currentColor" fillOpacity=".15" stroke="none" /><circle cx="146" cy="134" r="3" fill="currentColor" fillOpacity=".15" stroke="none" />
    </g>
    <g className="sol-sun-mobile-detail" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <g className="sol-engraved-rays">{Array.from({ length: 16 }, (_, i) => <g key={i} transform={`rotate(${i * 22.5} 120 120)`}>
        {i % 2 === 0
          ? <path d="M115 61 C104 43 125 33 120 12 C137 35 125 46 125 61Z" fill="currentColor" fillOpacity=".08" />
          : <path d="M120 60 Q114 43 120 25" />}
      </g>)}</g>
      <circle cx="120" cy="120" r="49" fill="currentColor" fillOpacity=".045" />
      <circle cx="120" cy="120" r="43" strokeWidth="1" />
      <path d="M91 118 Q100 109 109 118 M131 118 Q140 109 149 118 M120 116 L116 130 Q120 133 124 130 M107 141 Q120 151 133 141" />
      <ellipse cx="95" cy="133" rx="5" ry="3" fill="currentColor" fillOpacity=".16" stroke="none" />
      <ellipse cx="145" cy="133" rx="5" ry="3" fill="currentColor" fillOpacity=".16" stroke="none" />
    </g>
  </svg>;
}

function Leaf({ transform = "" }: { transform?: string }) {
  return <g transform={transform}><path d="M0 0 C-30 -12 -39 -43 -31 -61 C-6 -53 13 -26 0 0Z" fill="currentColor" fillOpacity=".08" /><path d="M0 0 Q-14 -25 -31 -61 M-7 -15 L-23 -19 M-13 -27 L-30 -32 M-19 -39 L-32 -43 M-7 -16 L-2 -31 M-14 -30 L-12 -43" strokeWidth=".7" /></g>;
}

/** Each leaf starts at a node on the stem, with a short petiole and contained veins. */
function BotanicalLeaf({ x, y, angle, length, width, bend }: { x: number; y: number; angle: number; length: number; width: number; bend: number }) {
  const blade = length - 8;
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <path d="M0 0 Q1 -4 0 -8" strokeWidth="1.1" />
    <g transform="translate(0 -8)">
      <path d={`M0 0 C${-width * .7} ${-blade * .18} ${-width + bend} ${-blade * .63} 0 ${-blade} C${width + bend} ${-blade * .68} ${width * .8} ${-blade * .23} 0 0Z`} fill="currentColor" fillOpacity=".055" />
      <path d={`M0 0 Q${bend} ${-blade * .52} 0 ${-blade}`} strokeWidth=".85" />
      {[.25, .44, .63].map((t, index) => {
        const mid = 2 * bend * t * (1 - t);
        const reach = width * [.55, .65, .47][index];
        return <g className="sol-leaf-veins" key={t} strokeWidth=".55" strokeOpacity=".72">
          <path d={`M${mid} ${-blade * t} Q${mid - reach * .55} ${-blade * (t + .05)} ${mid - reach} ${-blade * (t + .15)}`} />
          <path d={`M${mid} ${-blade * (t + .025)} Q${mid + reach * .5} ${-blade * (t + .09)} ${mid + reach} ${-blade * (t + .17)}`} />
        </g>;
      })}
    </g>
  </g>;
}

export function BotanicalBranch({ className = "", berries = false }: { className?: string; berries?: boolean }) {
  const leaves = [
    { x: 109, y: 289, angle: -57, length: 72, width: 19, bend: -3 },
    { x: 117, y: 256, angle: 53, length: 83, width: 21, bend: 3 },
    { x: 119, y: 224, angle: -63, length: 79, width: 20, bend: -2 },
    { x: 112, y: 190, angle: 48, length: 77, width: 19, bend: 3 },
    { x: 112, y: 154, angle: -48, length: 68, width: 17, bend: -2 },
    { x: 114, y: 118, angle: 42, length: 63, width: 16, bend: 2 },
    { x: 113, y: 85, angle: -36, length: 51, width: 13, bend: -2 },
    { x: 119, y: 50, angle: 8, length: 36, width: 10, bend: 1 },
  ];
  return <svg className={className} viewBox="0 0 230 340" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g className="sol-botanical-stem">
      <path d="M114 324 Q106 307 109 289 Q111 272 117 256 Q123 240 119 224 Q115 208 112 190 Q109 172 112 154 Q115 137 114 118 Q112 100 113 85 Q114 66 119 50" strokeWidth="1.5" />
      {leaves.map(leaf => <BotanicalLeaf key={leaf.y} {...leaf} />)}
      {berries && <g>
        <path d="M119 224 Q136 227 143 210 M139 217 Q143 216 147 214 M112 154 Q126 162 133 151 M117 256 Q101 266 92 259" strokeWidth=".85" />
        {[[143,205],[152,214],[133,146],[92,254]].map(([x,y]) => <g key={`${x}-${y}`}>
          <ellipse cx={x} cy={y} rx="5" ry="6" fill="currentColor" fillOpacity=".15" />
          <path d={`M${x - 1} ${y - 3} Q${x + 2} ${y} ${x - 1} ${y + 3}`} strokeWidth=".6" />
        </g>)}
      </g>}
    </g>
  </svg>;
}

function Flower({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {Array.from({length: 12}, (_,i) => <path key={i} d="M-5 -12 C-16 -35 15 -43 6 -13" transform={`rotate(${i*30})`} fill="currentColor" fillOpacity=".07" />)}
    <circle r="12" /><circle r="8" strokeDasharray="1 2" /><path d="M-4 -3 L-2 -3 M3 -3 L5 -3 M-4 4 Q0 7 4 4" strokeLinecap="round" />
  </g>;
}

export function ExperienceArtwork({ tier }: { tier: number }) {
  return <svg className="sol-experience-art" viewBox="0 0 320 190" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
    {tier === 0 && <>
      <path d="M72 175 V100 A88 88 0 0 1 176 13 A88 88 0 0 1 248 100 V175" strokeOpacity=".22" /><path d="M81 175 V100 A79 79 0 0 1 239 100 V175" strokeOpacity=".16" strokeDasharray="1 5" />
      <path d="M161 169 Q178 132 161 90 M166 148 Q128 151 123 125 Q149 124 166 148Z M167 132 Q199 129 204 108 Q176 109 167 132Z" fill="currentColor" fillOpacity=".07" />
      <Flower x={160} y={65} scale={1.12} /><path d="M117 172 Q160 163 202 172 M133 179 Q161 174 187 179" strokeOpacity=".45" />
    </>}
    {tier === 1 && <>
      <path d="M56 174 Q37 94 93 42 M264 174 Q283 94 227 42" strokeOpacity=".35" />
      <Leaf transform="translate(62 155) rotate(-45) scale(.65)" /><Leaf transform="translate(257 152) rotate(70) scale(.65)" />
      <path d="M148 173 Q164 126 122 72 M170 173 Q153 113 194 60 M147 133 Q104 133 98 112 Q128 111 147 133Z M173 116 Q212 123 217 95 Q189 97 173 116Z" fill="currentColor" fillOpacity=".08" />
      <Flower x={120} y={65} /><Flower x={197} y={50} scale={.82} />
      <path d="M155 149 Q130 136 123 148 Q127 163 158 155 Q185 133 198 145 Q201 161 159 155 M156 155 L137 179 M162 155 L184 176" />
      <path d="M152 31 L158 23 M161 34 L167 31 M149 25 L149 16" strokeOpacity=".6" />
    </>}
    {tier === 2 && <>
      <g transform="translate(82 -12) scale(.65)"><SunMedallion /></g>
      <path d="M82 171 Q50 136 57 102 M238 171 Q270 137 262 102" />
      <Leaf transform="translate(74 158) rotate(-42) scale(.67)" /><Leaf transform="translate(62 135) rotate(43) scale(.6)" />
      <Leaf transform="translate(246 158) rotate(82) scale(.67)" /><Leaf transform="translate(258 136) rotate(-8) scale(.6)" />
      <path d="M104 154 Q160 166 216 154 L210 175 Q161 183 110 175Z" fill="var(--package-paper)" /><path d="M98 159 L85 156 L90 168 L84 177 L110 175 M220 159 L235 156 L230 168 L236 177 L210 175" />
      <path d="M34 64 l3 -10 l3 10 l10 3 l-10 3 l-3 10 l-3 -10 l-10 -3Z M275 45 l2 -7 l2 7 l7 2 l-7 2 l-2 7 l-2 -7 l-7 -2Z" strokeOpacity=".5" />
    </>}
  </svg>;
}

type Garnish = "leaf" | "berry" | "pineapple" | "coconut" | "coffee" | "lime" | "hibiscus" | "pumpkin" | "cinnamon" | "caramel";
const drinkPalette: Record<string, { base: string; top: string; fruit: Garnish; foam?: boolean }> = {
  "Sol Verde": {base:"#e9e6ce",top:"#849359",fruit:"leaf"},
  "Fresa Fresca": {base:"#cf7e82",top:"#849359",fruit:"berry"},
  "Sol de Piña": {base:"#eac779",top:"#8a965d",fruit:"pineapple"},
  "Nube de Coco": {base:"#f1e9d6",top:"#93a36d",fruit:"coconut"},
  "Isla Sol": {base:"#dec188",top:"#8d9b63",fruit:"pineapple",foam:true},
  "Nube de Caramelo": {base:"#87604d",top:"#52392d",fruit:"coffee",foam:true},
  "Sol Rosado": {base:"#c86e7b",top:"#e5a093",fruit:"berry"},
  "Mango Sol": {base:"#e8ac54",top:"#f2cf7f",fruit:"lime"},
  "Flor de Sol": {base:"#ae5368",top:"#e3b77a",fruit:"hibiscus"},
  "Pumpkin Dulce Matcha": {base:"#cf9a66",top:"#849359",fruit:"pumpkin"},
  "Pumpkin Dulce Cloud": {base:"#69473b",top:"#b8784d",fruit:"pumpkin",foam:true},
  "Solchata Matcha": {base:"#e6d5b6",top:"#8e9c66",fruit:"cinnamon"},
  "Flan de Sol Matcha": {base:"#cfa361",top:"#8b996a",fruit:"caramel",foam:true},
};

function Ingredient({ kind }: { kind: Garnish }) {
  return <g strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    {kind === "berry" && <><path d="M-20 -5 C-27 -26 16 -30 21 -10 C25 5 5 24 0 27 C-6 23 -16 11 -20 -5Z" fill="#d68f92" /><path d="M-15 -18 L-20 -29 L-6 -25 L0 -36 L7 -25 L21 -28 L14 -16 L1 -20Z" fill="#8c9c71" />{[[-11,-9],[3,-10],[13,-5],[-7,3],[6,5],[0,16]].map(([x,y]) => <path key={`${x}${y}`} d={`M${x} ${y} l-1 3`} stroke="#fff1d9" />)}</>}
    {kind === "pineapple" && <><path d="M-18 -8 Q0 -19 18 -8 L18 17 Q0 32 -18 17Z" fill="#e5bc6b" /><path d="M-14 -11 L-19 -29 L-5 -20 L0 -40 L7 -21 L20 -30 L14 -11" fill="#91a074" /><path d="M-17 -2 L13 23 M-8 -11 L18 12 M-18 12 L17 -11 M-12 24 L18 1" opacity=".5" /></>}
    {kind === "coconut" && <><path d="M-26 -3 Q0 -28 26 -3 Q23 31 0 31 Q-23 28 -26 -3Z" fill="#b08b69" /><ellipse cy="-3" rx="26" ry="12" fill="#faf2df" /><ellipse cy="-3" rx="17" ry="7" fill="#e8dfc9" /><path d="M-19 8 Q-18 18 -11 22 M-12 10 L-8 18 M14 8 L12 18 M20 7 L18 13" opacity=".5" /></>}
    {kind === "coffee" && <>{[-1,1].map((side) => <g key={side} transform={`translate(${side*13} ${side*6}) rotate(${side*30})`}><ellipse rx="12" ry="19" fill="#9e795c" /><path d="M0 -15 C-8 -3 7 3 0 15" /></g>)}</>}
    {kind === "lime" && <><circle r="27" fill="#9aa975" /><circle r="22" fill="#ece5b8" />{Array.from({length:8},(_,i)=><path key={i} d="M0 -4 L-6 -18 Q0 -23 6 -18Z" transform={`rotate(${i*45})`} fill="#bcc88c" strokeWidth=".65" />)}</>}
    {kind === "hibiscus" && <>{Array.from({length:5},(_,i)=><path key={i} d="M0 1 C-27 -7 -25 -32 -8 -28 Q6 -37 14 -21 Q18 -8 0 1Z" transform={`rotate(${i*72})`} fill="#c78088" />)}<path d="M0 0 Q9 -4 15 -22" strokeWidth="2" /><circle cx="15" cy="-23" r="3" fill="#e7c17d" /></>}
    {kind === "leaf" && <><path d="M-24 23 Q-29 -14 18 -31 Q30 7 -24 23Z" fill="#94a572" /><path d="M-24 23 L18 -31 M-13 9 L-14 -10 M-3 -4 L-1 -22 M-12 9 L8 6 M-1 -5 L18 -8" /></>}
    {kind === "pumpkin" && <><path d="M-2 -15 Q-8 -29 5 -32 L9 -28 Q0 -23 5 -15" fill="#879166" /><ellipse cy="5" rx="29" ry="23" fill="#d29d6f" /><ellipse cy="5" rx="17" ry="23" /><ellipse cy="5" rx="6" ry="23" /></>}
    {kind === "cinnamon" && <g transform="rotate(30)"><path d="M-19 -30 L-19 28 Q-11 34 -4 28 L-4 -30Z M1 -23 L1 34 Q9 39 16 34 L16 -23Z" fill="#b68c68" /><ellipse cx="-11.5" cy="-30" rx="7.5" ry="4" fill="#dec3a0" /><ellipse cx="8.5" cy="-23" rx="7.5" ry="4" fill="#dec3a0" /><path d="M-14 -21 L-14 23 M6 -14 L6 28" /></g>}
    {kind === "caramel" && <><path d="M-23 15 L-16 -12 Q0 -20 16 -12 L23 15 Q0 30 -23 15Z" fill="#eac995" /><ellipse cy="-12" rx="16" ry="7" fill="#b98350" /><path d="M-15 -10 Q-11 -3 -9 -8 M12 -9 Q9 2 5 -7" /><ellipse cy="19" rx="29" ry="7" strokeOpacity=".4" /></>}
  </g>;
}

export function DrinkIllustration({ name, context = "menu", className = "" }: { name: string; context?: string; className?: string }) {
  const recipe = drinkPalette[name] ?? drinkPalette["Sol Verde"];
  const id = `${context}-${name.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const mocktail = ["Sol Rosado", "Mango Sol", "Flor de Sol"].includes(name);
  return <svg className={`sol-drink-illustration ${className}`} viewBox="0 0 210 230" fill="none" stroke="#75684e" strokeWidth="1.1" aria-hidden="true">
    <defs>
      <clipPath id={`${id}-glass`}><path d="M60 59 L71 198 Q105 210 139 198 L150 59Z" /></clipPath>
      <linearGradient id={`${id}-wash`} x1="0" y1="0" x2="1" y2=".6"><stop stopColor="#fff8e8" stopOpacity=".45" /><stop offset=".48" stopColor="#fff8e8" stopOpacity="0" /><stop offset="1" stopColor="#fff8e8" stopOpacity=".22" /></linearGradient>
    </defs>
    <ellipse cx="108" cy="211" rx="63" ry="7" fill="currentColor" fillOpacity=".055" stroke="none" />
    <g className="sol-drink-glass">
      <path d="M115 74 L132 15 L138 17 L121 77" fill="#efe6cf" />
      <g clipPath={`url(#${id}-glass)`}>
        <path d="M56 70 H153 V211 H56Z" fill={recipe.base} stroke="none" />
        <path d="M56 61 H153 V129 C126 140 96 106 56 130Z" fill={recipe.top} stroke="none" />
        <path d="M59 139 C90 121 119 159 147 139 M65 165 C97 149 128 177 143 158" stroke={recipe.top} strokeWidth="6" strokeOpacity=".13" />
        <g fill="#fff9eb" fillOpacity=".28" stroke="#fff9eb" strokeOpacity=".42"><rect x="70" y="80" width="24" height="23" rx="5" transform="rotate(-12 82 91)" /><rect x="112" y="74" width="26" height="24" rx="5" transform="rotate(16 125 86)" /><rect x="94" y="99" width="22" height="21" rx="5" transform="rotate(28 105 109)" /></g>
        {recipe.foam && <><path d="M56 67 Q72 51 85 61 Q107 45 123 60 Q143 48 154 65 V84 Q140 98 130 86 Q116 100 105 88 Q87 104 77 88 Q64 96 56 85Z" fill="#f1e4c7" stroke="none" /><path d="M63 70 Q84 61 102 70 T149 68" stroke="#bf9569" strokeWidth="2.3" /></>}
        <path d="M60 59 H150 L139 203 H70Z" fill={`url(#${id}-wash)`} stroke="none" />
        <path d="M69 92 L77 184 M141 98 L135 181" stroke="white" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" />
        {!mocktail && <g transform="translate(105 157)"><ellipse rx="20" ry="23" fill="#f5ebd5" fillOpacity=".84" strokeOpacity=".4" /><circle r="8" strokeWidth=".8" />{Array.from({length:12},(_,i)=><path key={i} d="M0 -11 L0 -15" transform={`rotate(${i*30})`} strokeWidth=".8" />)}</g>}
      </g>
      <path d="M60 59 L71 198 Q105 210 139 198 L150 59" strokeOpacity=".65" />
      <ellipse cx="105" cy="59" rx="45" ry="8" fill={recipe.foam ? "#f3e8d0" : recipe.top} fillOpacity=".85" /><path d="M61 60 Q105 71 150 60" stroke="#faf3de" strokeOpacity=".8" />
      {mocktail && <g transform="translate(148 57) scale(.65)"><Ingredient kind="lime" /></g>}
      <g fill="#fff9eb" fillOpacity=".6" strokeOpacity=".15"><ellipse cx="63" cy="109" rx="1.8" ry="3" /><ellipse cx="144" cy="137" rx="1.5" ry="2.5" /><ellipse cx="68" cy="149" rx="1.4" ry="2.3" /></g>
    </g>
    <g transform="translate(157 192) rotate(-12) scale(.8)"><Ingredient kind={recipe.fruit} /></g>
    <path d="M38 177 Q29 158 35 147 Q49 156 38 177Z M39 177 Q47 158 58 159 Q57 175 39 177Z" fill="#a6b38a" strokeWidth=".8" />
  </svg>;
}

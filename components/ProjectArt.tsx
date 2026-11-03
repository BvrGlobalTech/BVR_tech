import { Layers3 } from "lucide-react";

export type ArtKind = "timetable" | "web" | "generic";

/* Original illustrations: they keep every project card looking polished until
   you add real screenshots. No stock photos, no invented numbers. */

function TimetableArt() {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const marks: Record<string, string> = {
    "0-0": "a", "1-1": "b", "2-0": "c", "3-2": "a", "4-1": "b", "5-3": "c",
    "0-3": "b", "2-4": "a", "4-4": "c", "1-3": "c", "3-0": "b", "5-1": "a",
  };
  const cells = [];
  let n = 0;
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 6; c++) {
      const m = marks[`${c}-${r}`];
      cells.push(
        <span
          key={`${c}-${r}`}
          className={m ? `pj-cell pj-${m}` : "pj-cell"}
          style={m ? { animationDelay: `${0.12 * n++}s` } : undefined}
        />
      );
    }
  }
  return (
    <div className="aura aura-indigo" aria-hidden="true">
      <span className="aura-blob b1" />
      <span className="aura-blob b2" />
      <span className="aura-grid" />
      <div className="pj-win">
        <div className="pj-win-bar">
          <i /><i /><i />
          <div className="pj-tabs"><span>ADMIN</span><span className="on">FACULTY</span><span>STUDENT</span></div>
        </div>
        <div className="pj-win-body">
          <div>
            <div className="pj-head">{days.map((d) => <span key={d}>{d}</span>)}</div>
            <div className="pj-grid-cells">{cells}</div>
          </div>
          <div className="pj-side">
            <div className="pj-mini">
              <svg viewBox="0 0 64 64" width="58" height="58">
                <circle cx="32" cy="32" r="23" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="7" />
                <circle cx="32" cy="32" r="23" fill="none" stroke="#7ed8c0" strokeWidth="7" strokeLinecap="round" strokeDasharray="112 145" transform="rotate(-90 32 32)" />
              </svg>
              <b>Attendance</b>
            </div>
            <div className="pj-mini">
              <svg viewBox="0 0 90 40" width="86" height="38">
                <polyline points="2,34 20,26 38,30 56,16 74,20 88,6" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="88" cy="6" r="3.5" fill="#fff" />
              </svg>
              <b>SGPA · CGPA</b>
            </div>
          </div>
        </div>
      </div>
      <span className="aura-spark s1">✦</span>
      <span className="aura-spark s2">✦</span>
      <span className="aura-grain" />
    </div>
  );
}

function WebArt() {
  return (
    <div className="aura aura-violet" aria-hidden="true">
      <span className="aura-blob b1" />
      <span className="aura-blob b2" />
      <span className="aura-grid" />
      <div className="pj-win">
        <div className="pj-win-bar"><i /><i /><i /><span className="pj-url" /></div>
        <div className="pj-web">
          <div className="pj-web-hero"><b /><b /><span /><span /><em /></div>
          <div className="pj-web-cards"><div /><div /><div /></div>
        </div>
      </div>
      <span className="aura-spark s1">✦</span>
      <span className="aura-spark s2">✦</span>
      <span className="aura-grain" />
    </div>
  );
}

function GenericArt() {
  return (
    <div className="aura aura-aqua" aria-hidden="true">
      <span className="aura-blob b1" />
      <span className="aura-blob b2" />
      <span className="aura-grid" />
      <span className="aura-ring r1" />
      <span className="aura-ring r2" />
      <div className="aura-core"><Layers3 size={42} strokeWidth={1.25} /></div>
      <span className="aura-spark s1">✦</span>
      <span className="aura-spark s2">✦</span>
      <span className="aura-grain" />
    </div>
  );
}

export default function ProjectArt({ kind }: { kind: ArtKind }) {
  if (kind === "timetable") return <TimetableArt />;
  if (kind === "web") return <WebArt />;
  return <GenericArt />;
}

/* Small diagrams for the scheduling approaches on the detail page */
export function AlgoArt({ kind }: { kind: "csp" | "ga" | "greedy" }) {
  if (kind === "csp") {
    return (
      <svg viewBox="0 0 160 84" width="160" height="84" aria-hidden="true">
        <g stroke="rgba(255,255,255,.35)" strokeWidth="2">
          <line x1="30" y1="42" x2="70" y2="20" /><line x1="30" y1="42" x2="70" y2="64" />
          <line x1="70" y1="20" x2="116" y2="30" /><line x1="70" y1="64" x2="116" y2="30" />
          <line x1="70" y1="20" x2="70" y2="64" /><line x1="116" y1="30" x2="132" y2="64" />
        </g>
        {[[30, 42, "#6c83ff"], [70, 20, "#2dd4bf"], [70, 64, "#a78bfa"], [116, 30, "#6c83ff"], [132, 64, "#2dd4bf"]].map(([x, y, c]) => (
          <circle key={`${x}-${y}`} cx={x as number} cy={y as number} r="9" fill={c as string} />
        ))}
      </svg>
    );
  }
  if (kind === "ga") {
    const rows = [
      ["#6c83ff", "#6c83ff", "#6c83ff", "#6c83ff", "#6c83ff", "#6c83ff"],
      ["#2dd4bf", "#2dd4bf", "#2dd4bf", "#2dd4bf", "#2dd4bf", "#2dd4bf"],
      ["#6c83ff", "#6c83ff", "#6c83ff", "#2dd4bf", "#2dd4bf", "#2dd4bf"],
    ];
    return (
      <svg viewBox="0 0 160 84" width="160" height="84" aria-hidden="true">
        {rows.map((row, r) =>
          row.map((c, i) => (
            <rect key={`${r}-${i}`} x={26 + i * 18} y={8 + r * 26} width="14" height="18" rx="4" fill={c} opacity={r === 2 ? 1 : 0.6} />
          ))
        )}
        <path d="M134 18 L146 44 L134 70" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 84" width="160" height="84" aria-hidden="true">
      {[[22, 56, 22], [52, 42, 36], [82, 28, 50], [112, 12, 66]].map(([x, y, h], i) => (
        <rect key={i} x={x} y={y} width="22" height={h} rx="5" fill={i === 3 ? "#7ed8c0" : "#6c83ff"} opacity={i === 3 ? 1 : 0.55} />
      ))}
      <path d="M26 46 L58 34 L88 22 L118 8" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
    </svg>
  );
}
import type { ComponentType } from "react";
import {
  Globe2, MonitorSmartphone, MousePointerClick,
  LayoutDashboard, Users,
  SlidersHorizontal, BarChart3,
  Workflow, Plug, RefreshCw,
} from "lucide-react";

export type ArtKind = "website" | "webapp" | "tools" | "workflow";

type Icon = ComponentType<{ size?: number; strokeWidth?: number }>;

/* "Aura" visuals: glowing colour blooms, glass tile, orbiting rings, floating chips.
   Pure CSS, no images to load, and the glow follows the cursor on hover. */
const themes: Record<ArtKind, { theme: string; Core: Icon; chips: [Icon, string][] }> = {
  website: {
    theme: "aura-indigo",
    Core: Globe2,
    chips: [[MonitorSmartphone, "Responsive"], [MousePointerClick, "Clear enquiry flow"]],
  },
  webapp: {
    theme: "aura-violet",
    Core: LayoutDashboard,
    chips: [[BarChart3, "Dashboards"], [Users, "User accounts"]],
  },
  tools: {
    theme: "aura-aqua",
    Core: SlidersHorizontal,
    chips: [[BarChart3, "Reports"], [Users, "Admin panel"]],
  },
  workflow: {
    theme: "aura-ember",
    Core: Workflow,
    chips: [[Plug, "API ready"], [RefreshCw, "Automated steps"]],
  },
};

export default function SlideArt({ kind }: { kind: ArtKind }) {
  const { theme, Core, chips } = themes[kind];
  return (
    <div className={`aura ${theme}`} aria-hidden="true">
      <span className="aura-blob b1" />
      <span className="aura-blob b2" />
      <span className="aura-blob b3" />
      <span className="aura-grid" />
      <span className="aura-ring r1" />
      <span className="aura-ring r2" />
      <div className="aura-core"><Core size={42} strokeWidth={1.25} /></div>
      {chips.map(([Icon, label], i) => (
        <div className={`aura-chip c${i + 1}`} key={label}>
          <span className="aura-chip-icon"><Icon size={12} strokeWidth={2} /></span>
          {label}
        </div>
      ))}
      <span className="aura-spark s1">✦</span>
      <span className="aura-spark s2">✦</span>
      <span className="aura-spark s3">✦</span>
      <span className="aura-spot" />
      <span className="aura-grain" />
    </div>
  );
}
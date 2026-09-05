import { useEffect } from "react";
import type { ReactNode } from "react";
import confetti from "canvas-confetti";
import type { Course, ProjectStatus, User } from "../lib/types";
import { courseMeta } from "../lib/data";
import { Icon } from "./icons";
import type { IconName } from "./icons";
import { useApp } from "../lib/store";

export const cn = (...xs: (string | false | null | undefined)[]) => xs.filter(Boolean).join(" ");

export function timeAgo(ts: number): string {
  const s = Math.max(1, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return fmtDate(ts);
}

export const fmtDate = (ts: number) =>
  new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export function celebrate(big = false) {
  confetti({
    particleCount: big ? 180 : 90,
    spread: big ? 100 : 72,
    origin: { y: big ? 0.55 : 0.7 },
    colors: ["#0e7c6b", "#e8a11c", "#2f5fe3", "#d95f0e", "#c2317e"],
  });
}

// ─── Segmented progress — the ███░░ aesthetic, rendered for real ────────────

export function Seg({
  value, cells = 12, color = "#0e7c6b", className,
}: { value: number; cells?: number; color?: string; className?: string }) {
  const filled = Math.round((Math.max(0, Math.min(100, value)) / 100) * cells);
  return (
    <div className={cn("seg-track", className)} role="img" aria-label={`${Math.round(value)} percent`}>
      {Array.from({ length: cells }).map((_, i) => (
        <div key={i} className="seg-cell" style={{ backgroundColor: i < filled ? color : "#dfe2d6" }} />
      ))}
    </div>
  );
}

export function Bar({ value, color = "#0e7c6b", className }: { value: number; color?: string; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-[#e3e6da]", className)}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function Ring({
  value, size = 76, stroke = 8, color = "#0e7c6b", children,
}: { value: number; size?: number; stroke?: number; color?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e3e6da" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export const Chip = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.07em]", className)}>
    {children}
  </span>
);

export function CourseTag({ course, className }: { course: Course; className?: string }) {
  const m = courseMeta(course.id);
  return (
    <Chip className={cn(m.chip, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", m.dot)} />
      {course.short}
    </Chip>
  );
}

const STATUS: Record<ProjectStatus, { label: string; cls: string }> = {
  not_started: { label: "Not started", cls: "bg-[#e8eadd] text-mute" },
  in_progress: { label: "In progress", cls: "bg-brand-soft text-brand-deep" },
  submitted: { label: "Submitted", cls: "bg-ai-soft text-ai" },
  under_review: { label: "Under review", cls: "bg-gold-soft text-warn" },
  completed: { label: "Completed", cls: "bg-se-soft text-se" },
};

export const StatusPill = ({ status, className }: { status: ProjectStatus; className?: string }) => (
  <Chip className={cn(STATUS[status].cls, className)}>{STATUS[status].label}</Chip>
);

export const DiffChip = ({ level }: { level: "Guided" | "Independent" | "Capstone" }) => (
  <Chip className={level === "Capstone" ? "bg-di-soft text-di" : level === "Independent" ? "bg-ai-soft text-ai" : "bg-brand-soft text-brand-deep"}>
    {level}
  </Chip>
);

// ─── Modal ──────────────────────────────────────────────────────────────────

export function Modal({
  open, onClose, title, kicker, children, footer, wide,
}: {
  open: boolean; onClose: () => void; title?: ReactNode; kicker?: string;
  children: ReactNode; footer?: ReactNode; wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true">
      <div className="anim-fade-in absolute inset-0 bg-ink/55" onClick={onClose} />
      <div className={cn("anim-pop card-ink relative flex max-h-[88vh] w-full flex-col overflow-hidden bg-card", wide ? "max-w-2xl" : "max-w-lg")}>
        {(title || kicker) && (
          <div className="flex items-start justify-between gap-4 border-b-1.5 border-line px-5 py-4">
            <div>
              {kicker && <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{kicker}</div>}
              {title && <h3 className="font-display text-lg font-semibold leading-tight">{title}</h3>}
            </div>
            <button className="btn btn-ghost btn-sm -mr-1" onClick={onClose} aria-label="Close dialog">
              <Icon name="x" size={16} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex flex-wrap items-center justify-end gap-2 border-t-1.5 border-line px-5 py-3.5">{footer}</div>}
      </div>
    </div>
  );
}

export function EmptyState({
  icon, title, sub, children,
}: { icon: IconName; title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-1.5 border-dashed border-line bg-card/60 px-6 py-10 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg border-1.5 border-line bg-paper text-mute">
        <Icon name={icon} size={22} />
      </div>
      <div className="font-display text-base font-semibold">{title}</div>
      {sub && <p className="mt-1 max-w-sm text-sm text-mute">{sub}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export const SectionHead = ({ kicker, title, right }: { kicker: string; title: ReactNode; right?: ReactNode }) => (
  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
    <div>
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-deep/80">{kicker}</div>
      <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
    </div>
    {right}
  </div>
);

export function StatTile({
  icon, label, value, sub,
}: { icon: IconName; label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="card-ink px-4 py-3.5">
      <div className="flex items-center gap-2 text-mute">
        <Icon name={icon} size={15} />
        <span className="font-mono text-[10.5px] uppercase tracking-[0.12em]">{label}</span>
      </div>
      <div className="mt-1.5 font-display text-2xl font-bold leading-none tracking-tight">{value}</div>
      {sub && <div className="mt-1 text-xs text-mute">{sub}</div>}
    </div>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={cn("anim-fade-up", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Avatar({ user, size = 34 }: { user: User; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full border-1.5 border-ink/20 font-display font-bold"
      style={{
        width: size, height: size, fontSize: size * 0.36,
        backgroundColor: `hsl(${user.hue} 42% 86%)`, color: `hsl(${user.hue} 45% 24%)`,
      }}
      aria-hidden="true"
    >
      {initials(user.name)}
    </div>
  );
}

// ─── Toasts ─────────────────────────────────────────────────────────────────

const TOAST_ICON: Record<string, { icon: IconName; cls: string }> = {
  ok: { icon: "check", cls: "bg-brand-soft text-brand-deep" },
  info: { icon: "bell", cls: "bg-ai-soft text-ai" },
  warn: { icon: "flag", cls: "bg-gold-soft text-warn" },
  trophy: { icon: "award", cls: "bg-gold-soft text-[#8a5a06]" },
};

export function Toasts() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[90] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="anim-slide-right card-ink pointer-events-auto flex items-center gap-3 bg-card px-3.5 py-3" style={{ boxShadow: "var(--shadow-lift-sm)" }}>
          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-1.5 border-ink/10", TOAST_ICON[t.kind].cls)}>
            <Icon name={TOAST_ICON[t.kind].icon} size={16} />
          </span>
          <div className="min-w-0 flex-1 text-sm font-medium leading-snug">{t.msg}</div>
          <button className="text-mute transition-colors hover:text-ink" onClick={() => dismissToast(t.id)} aria-label="Dismiss notification">
            <Icon name="x" size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

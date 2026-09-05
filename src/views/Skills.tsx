import { useApp } from "../lib/store";
import { Bar, Chip, Reveal, Ring, SectionHead, cn, fmtDate } from "../components/ui";
import { Icon } from "../components/icons";
import type { Skill } from "../lib/types";

const DOMAINS = ["Artificial Intelligence", "Robotics & IoT", "Software Engineering", "Digital Innovation", "Integration"];
const DOMAIN_HEX: Record<string, string> = {
  "Artificial Intelligence": "#2f5fe3",
  "Robotics & IoT": "#d95f0e",
  "Software Engineering": "#1b8a4c",
  "Digital Innovation": "#c2317e",
  "Integration": "#e8a11c",
};

export default function Skills() {
  const app = useApp();
  const { db, st } = app;
  if (!st) return null;

  const acquired = db.skills.filter((s) => st.skills[s.id]).length;
  const pct = Math.round((acquired / db.skills.length) * 100);

  const hint = (s: Skill): string => {
    if (s.via.lessons) {
      const titles = s.via.lessons.map((id) => db.lessons.find((l) => l.id === id)?.title ?? id);
      const done = s.via.lessons.filter((id) => st.lessons[id]).length;
      return `Lessons ${done}/${s.via.lessons.length}: ${titles.map((t) => `“${t.length > 28 ? t.slice(0, 28) + "…" : t}”`).join(", ")}`;
    }
    if (s.via.assessment) return `Pass: ${db.assessments.find((a) => a.id === s.via.assessment)?.title ?? "assessment"}`;
    if (s.via.project) return `Complete project: ${db.projects.find((p) => p.id === s.via.project)?.title ?? "project"}`;
    return "Earned through the program";
  };

  return (
    <div>
      <SectionHead
        kicker="Skills"
        title="Not what you finished — what you can do"
        right={<Chip className="bg-brand-soft text-brand-deep">{acquired}/{db.skills.length} acquired</Chip>}
      />
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <Reveal>
          <div className="card-ink bg-card p-6 text-center lg:sticky lg:top-20">
            <Ring value={pct} size={130} stroke={11} color="#e8a11c">
              <div>
                <div className="font-display text-3xl font-bold leading-none">{acquired}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-mute">skills</div>
              </div>
            </Ring>
            <p className="mt-4 text-[13px] leading-relaxed text-mute">
              Skills are earned by <span className="font-semibold text-ink">finishing lesson pairs</span>, <span className="font-semibold text-ink">passing assessments</span>, and <span className="font-semibold text-ink">completing projects</span> — never by clicking a button.
            </p>
            <div className="mt-4 space-y-2 border-t-1.5 border-dashed border-line pt-4 text-left">
              {DOMAINS.filter((d) => db.skills.some((s) => s.domain === d)).map((d) => {
                const all = db.skills.filter((s) => s.domain === d);
                const got = all.filter((s) => st.skills[s.id]).length;
                return (
                  <div key={d}>
                    <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-wider text-mute">
                      <span>{d}</span><span>{got}/{all.length}</span>
                    </div>
                    <Bar value={(got / all.length) * 100} color={DOMAIN_HEX[d]} className="h-1.5" />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="space-y-5">
          {DOMAINS.filter((d) => db.skills.some((s) => s.domain === d)).map((d, di) => (
            <Reveal key={d} delay={di * 70}>
              <section className="card-ink bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: DOMAIN_HEX[d] }} />
                  <h3 className="font-display text-base font-bold tracking-tight">{d} skills</h3>
                  <span className="ml-auto font-mono text-[11px] text-mute">
                    {db.skills.filter((s) => s.domain === d && st.skills[s.id]).length}/{db.skills.filter((s) => s.domain === d).length}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {db.skills.filter((s) => s.domain === d).map((s) => {
                    const got = !!st.skills[s.id];
                    return (
                      <div key={s.id} className={cn("rounded-lg border-1.5 px-3.5 py-3", got ? "border-se/40 bg-se-soft/50" : "border-line bg-paper/40")}>
                        <div className="flex items-center gap-2.5">
                          <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-1.5", got ? "border-se bg-se text-[#f4faf7]" : "border-mute/40 bg-card text-mute")}>
                            {got ? <Icon name="check" size={12} /> : <Icon name="circle" size={12} />}
                          </span>
                          <span className={cn("text-sm font-semibold leading-tight", !got && "text-mute")}>{s.name}</span>
                        </div>
                        <div className={cn("mt-1.5 pl-[34px] font-mono text-[10px] leading-relaxed tracking-wide", got ? "text-se" : "text-mute")}>
                          {got ? `ACQUIRED ${fmtDate(st.skills[s.id])}` : hint(s)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

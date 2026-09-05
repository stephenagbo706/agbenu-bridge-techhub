import { useApp } from "../lib/store";
import { CAREERS } from "../lib/data";
import { Bar, Chip, CourseTag, Reveal, SectionHead, cn } from "../components/ui";
import { Icon } from "../components/icons";
import type { Route } from "../lib/store";

const STAGES: { title: string; desc: string; route?: Route }[] = [
  { title: "Start", desc: "You're in. The console shows your path, your progress, and your next move.", route: { name: "dashboard" } },
  { title: "Technology Fundamentals", desc: "First lessons across the program — what AI, robotics, software, and innovation actually are.", route: { name: "courses" } },
  { title: "Explore the Four Core Courses", desc: "AI · Robotics & IoT · Software Engineering · Digital Innovation. Touch each one early.", route: { name: "courses" } },
  { title: "Structured Lessons", desc: "Work through topics in order. Each lesson ends with a knowledge check you must settle.", route: { name: "courses" } },
  { title: "Practice", desc: "Activities turn concepts into evidence: prompts, designs, builds, business models.", route: { name: "practice" } },
  { title: "Projects", desc: "The heart of the program. Requirements → build → submit → feedback → improvement.", route: { name: "projects" } },
  { title: "Assessment", desc: "Quizzes and checkpoints measure retention and show you exactly what to strengthen.", route: { name: "assessments" } },
  { title: "Skills", desc: "Your earned capability set — what you can do, verified by lessons, assessments, and projects.", route: { name: "skills" } },
  { title: "Advanced Projects — the Capstone", desc: "Smart Agriculture System: sensors + application + AI recommendations + business model. All four areas, one working system.", route: { name: "project", id: "p-cap-1" } },
  { title: "Innovation → Technology Product", desc: "Launch what you built, measure what matters, and explore the career directions your skills open.", route: { name: "careers" } },
];

export function PathView() {
  const app = useApp();
  const stage = app.pathStage();
  return (
    <div>
      <SectionHead
        kicker="Learning path"
        title="One progression, from fundamentals to product"
        right={<Chip className="bg-gold-soft text-[#8a5a06]">Stage {Math.min(stage + 1, STAGES.length)}/{STAGES.length}</Chip>}
      />
      <p className="-mt-2 mb-6 max-w-2xl text-sm text-mute">
        The platform tracks which stage you're in and points every recommendation at the next one. You can jump anywhere — the path is a compass, not a rail.
      </p>
      <div className="relative ml-3 space-y-4 border-l-2 border-line pl-7 sm:ml-5">
        {STAGES.map((s, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <Reveal key={s.title} delay={i * 50}>
              <div className="relative">
                <span className={cn(
                  "absolute -left-[37px] top-4 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:-left-[39px]",
                  done ? "border-brand bg-brand text-[#f4faf7]" : current ? "border-gold bg-gold" : "border-line bg-paper",
                )}>
                  {done ? <Icon name="check" size={10} /> : current ? <span className="dot-live h-1.5 w-1.5 rounded-full bg-ink" /> : null}
                </span>
                <button
                  onClick={() => s.route && app.nav(s.route)}
                  className={cn(
                    "card-ink group w-full bg-card p-4 text-left transition-all sm:p-5",
                    current ? "ring-2 ring-gold/60" : "card-ink-hover",
                    !s.route && "cursor-default",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-mute">{String(i).padStart(2, "0")}</span>
                    <h3 className="font-display text-[15px] font-bold tracking-tight">{s.title}</h3>
                    {done && <Chip className="bg-se-soft text-se">passed</Chip>}
                    {current && <Chip className="bg-gold-soft text-[#8a5a06]"><span className="dot-live h-1.5 w-1.5 rounded-full bg-current" /> you are here</Chip>}
                    {s.route && <Icon name="arrowR" size={14} className="ml-auto text-mute transition-transform group-hover:translate-x-0.5" />}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-mute">{s.desc}</p>
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function CareersView() {
  const app = useApp();
  const { db } = app;
  return (
    <div>
      <SectionHead
        kicker="Career exploration"
        title="Where these skills can take you"
        right={<Chip className="bg-[#e8eadd] text-mute">directions, not promises</Chip>}
      />
      <p className="-mt-2 mb-6 max-w-2xl text-sm text-mute">
        Ten technology directions mapped to the program's skills. Readiness shows how much of each pathway's skill foundation you've already earned —
        it describes preparation, never employment outcomes.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {CAREERS.map((c, i) => {
          const ready = app.careerPct(c);
          const earned = c.skills.filter((id) => db.skills.find((s) => s.id === id) && app.st?.skills[id]);
          return (
            <Reveal key={c.id} delay={i * 50}>
              <section className="card-ink card-ink-hover flex h-full flex-col bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-base font-bold tracking-tight">{c.title}</h3>
                  <span className="font-mono text-sm font-bold" style={{ color: ready >= 60 ? "#1b8a4c" : ready >= 25 ? "#0e7c6b" : "#5d6570" }}>{ready}%</span>
                </div>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-mute">{c.desc}</p>
                <Bar value={ready} color={ready >= 60 ? "#1b8a4c" : "#0e7c6b"} className="mt-3 h-1.5" />
                <div className="mt-3">
                  <div className="lbl">Pathway skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.map((sid) => {
                      const sk = db.skills.find((s) => s.id === sid);
                      const got = !!app.st?.skills[sid];
                      return (
                        <Chip key={sid} className={got ? "bg-se-soft text-se" : "bg-[#e8eadd] text-mute"}>
                          {got && <Icon name="check" size={9} />} {sk?.name ?? sid}
                        </Chip>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t-1.5 border-dashed border-line pt-3">
                  <div className="flex gap-1.5">{c.courses.map((cid) => <CourseTag key={cid} course={app.getCourse(cid)!} />)}</div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{earned.length}/{c.skills.length} earned</span>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
      <div className="mt-6 flex items-start gap-3 rounded-lg border-1.5 border-line bg-card/70 px-5 py-4 text-xs leading-relaxed text-mute">
        <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-brand-deep" />
        <p>
          These pathways describe skill directions commonly associated with technology roles. Completing courses and projects builds demonstrable
          capability; it does not guarantee any specific job, salary, or outcome. The strongest signal you can build is a portfolio of shipped work.
        </p>
      </div>
    </div>
  );
}

export function PathMini({ stage }: { stage: number }) {
  return (
    <div className="flex items-center gap-1">
      {STAGES.map((s, i) => (
        <span key={s.title} title={s.title} className={cn("h-1.5 flex-1 rounded-full", i < stage ? "bg-brand" : i === stage ? "bg-gold" : "bg-line")} />
      ))}
    </div>
  );
}

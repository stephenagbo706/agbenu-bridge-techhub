import { useApp } from "../lib/store";
import type { Rec } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Bar, Chip, CourseTag, Reveal, Ring, Seg, StatusPill, cn, timeAgo } from "../components/ui";
import { Icon } from "../components/icons";
import type { IconName } from "../components/icons";

const KIND_ICON: Record<Rec["kind"], IconName> = { lesson: "book", assessment: "clipboard", project: "cube", activity: "wrench" };
const PHILOSOPHY = ["Learn", "Practice", "Build", "Solve", "Innovate"];

export default function Dashboard() {
  const app = useApp();
  const { user, st, db } = app;
  if (!user || !st) return null;

  const rec = app.nextUp();
  const queue = app.upNextQueue();
  const overall = app.overallPct();
  const level = app.levelInfo();
  const stage = app.pathStage();
  const philoIdx = stage >= 8 ? 4 : stage >= 6 ? 3 : stage >= 5 ? 2 : stage >= 3 ? 1 : 0;

  const gotoRec = (r: Rec) =>
    app.nav(r.kind === "lesson" ? { name: "lesson", id: r.id }
      : r.kind === "assessment" ? { name: "assessment", id: r.id }
      : r.kind === "project" ? { name: "project", id: r.id }
      : { name: "activity", id: r.id });

  const activeProjects = Object.entries(st.projects)
    .filter(([, ps]) => ps.status === "in_progress" || ps.status === "submitted" || ps.status === "under_review")
    .map(([pid, ps]) => ({ p: db.projects.find((x) => x.id === pid), ps }))
    .filter((x) => x.p);

  const recentAch = Object.entries(st.achievements)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, at]) => ({ a: db.achievements.find((x) => x.id === id), at }));

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-deep/80">Student console · {today}</div>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {greet}, {user.name.split(" ")[0]}.
            </h1>
          </div>
          <div className="flex items-center gap-3 rounded-lg border-1.5 border-ink bg-card px-4 py-2.5">
            <Chip className="bg-gold-soft text-[#8a5a06]">{level.name}</Chip>
            <div className="w-28">
              <div className="mb-1 flex justify-between font-mono text-[10px] text-mute">
                <span>{level.xp} XP</span>
                <span>{level.next ? `${level.next}` : "MAX"}</span>
              </div>
              <Bar value={level.pct} color="#e8a11c" className="h-1.5" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Continue learning console */}
      <Reveal delay={70}>
        <div className="bg-sidebar-trace card-ink overflow-hidden bg-ink text-paper">
          <div className="grid gap-6 p-6 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                <span className="dot-live inline-block h-2 w-2 rounded-full bg-[#3ecf7a]" />
                Continue learning
              </div>
              {rec ? (
                <>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-1.5 border-paper/20 bg-ink2 text-gold">
                      <Icon name={KIND_ICON[rec.kind]} size={18} />
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">{rec.label}</h2>
                      <p className="mt-1 text-sm text-paper/60">{rec.sub}</p>
                    </div>
                  </div>
                  {rec.courseId && (
                    <div className="mt-4 flex items-center gap-3">
                      <Seg value={app.coursePct(rec.courseId)} cells={18} color={courseMeta(rec.courseId).hex} className="h-2.5 max-w-xs flex-1" />
                      <span className="font-mono text-xs text-paper/70">{app.coursePct(rec.courseId)}%</span>
                    </div>
                  )}
                  <button onClick={() => gotoRec(rec)} className="btn btn-gold mt-5">
                    <Icon name="play" size={15} />
                    {rec.kind === "lesson" ? "Resume lesson" : rec.kind === "assessment" ? "Start assessment" : rec.kind === "project" ? "Open project" : "Open activity"}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">Curriculum complete.</h2>
                  <p className="mt-2 max-w-md text-sm text-paper/65">
                    Every lesson is done and every checkpoint passed. Your next frontier is the capstone — integrate all four areas into one working system.
                  </p>
                  <button onClick={() => app.nav({ name: "project", id: "p-cap-1" })} className="btn btn-gold mt-5">
                    <Icon name="cube" size={15} /> Smart Agriculture capstone
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center gap-5 md:flex-col md:gap-2">
              <Ring value={overall} size={104} stroke={9} color="#e8a11c">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold leading-none">{overall}%</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">overall</div>
                </div>
              </Ring>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40 md:hidden">lesson progress</div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Course progress */}
          <Reveal delay={120}>
            <section className="card-ink bg-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight">Course progress</h3>
                <button className="btn btn-ghost btn-sm text-brand-deep" onClick={() => app.nav({ name: "courses" })}>
                  All courses <Icon name="arrowR" size={13} />
                </button>
              </div>
              <div className="space-y-1.5">
                {db.courses.map((c) => {
                  const pct = app.coursePct(c.id);
                  const topics = db.topics.filter((t) => t.courseId === c.id);
                  const doneTopics = topics.filter((t) => app.topicDone(t.id)).length;
                  const m = courseMeta(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => app.nav({ name: "course", id: c.id })}
                      className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-lg border-1.5 border-transparent px-2.5 py-2.5 text-left transition-all hover:border-line hover:bg-paper sm:grid-cols-[auto_minmax(0,1.2fr)_minmax(0,1fr)_auto] sm:gap-x-4"
                    >
                      <span className={cn("h-2.5 w-2.5 rounded-full", m.dot)} />
                      <span className="min-w-0">
                        <span className="block truncate font-display text-sm font-semibold leading-tight">{c.title}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{c.code} · {doneTopics}/{topics.length} topics</span>
                      </span>
                      <span className="hidden sm:block"><Seg value={pct} cells={16} color={m.hex} className="h-2.5" /></span>
                      <span className="flex items-center gap-2 justify-self-end">
                        <span className="font-mono text-sm font-bold" style={{ color: m.hex }}>{pct}%</span>
                        <Icon name="chevR" size={14} className="text-mute transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </Reveal>

          {/* Projects */}
          <Reveal delay={170}>
            <section className="card-ink bg-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight">Project work</h3>
                <button className="btn btn-ghost btn-sm text-brand-deep" onClick={() => app.nav({ name: "projects" })}>
                  All projects <Icon name="arrowR" size={13} />
                </button>
              </div>
              {activeProjects.length === 0 ? (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border-1.5 border-dashed border-line bg-paper/60 px-4 py-4">
                  <div className="text-sm text-mute">No active projects yet. Projects are where lessons become things you can show.</div>
                  <button className="btn btn-dark btn-sm" onClick={() => app.nav({ name: "projects" })}>Browse projects</button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {activeProjects.map(({ p, ps }) => p && (
                    <button
                      key={p.id}
                      onClick={() => app.nav({ name: "project", id: p.id })}
                      className="card-ink-hover group w-full rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3 text-left"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-sm font-semibold">{p.title}</span>
                        {p.courseIds.map((cid) => <CourseTag key={cid} course={app.getCourse(cid)!} />)}
                        <span className="ml-auto"><StatusPill status={ps.status} /></span>
                      </div>
                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="flex gap-1">
                          {p.milestones.map((ms) => (
                            <span key={ms.id} className={cn("h-2 w-6 rounded-sm", ps.milestones.includes(ms.id) ? "bg-brand" : "bg-[#e0e3d6]")} />
                          ))}
                        </div>
                        <span className="font-mono text-[11px] text-mute">{ps.milestones.length}/{p.milestones.length} milestones</span>
                        <Icon name="chevR" size={14} className="ml-auto text-mute transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </Reveal>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <Reveal delay={150}>
            <section className="card-ink bg-card p-5">
              <h3 className="mb-3 font-display text-base font-semibold tracking-tight">Up next</h3>
              <div className="space-y-2">
                {queue.map((r) => (
                  <button key={`${r.kind}:${r.id}`} onClick={() => gotoRec(r)} className="group flex w-full items-start gap-3 rounded-lg border-1.5 border-transparent px-2 py-2 text-left transition-all hover:border-line hover:bg-paper">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-1.5 border-line bg-paper text-brand-deep">
                      <Icon name={KIND_ICON[r.kind]} size={14} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold leading-tight">{r.label}</span>
                      <span className="mt-0.5 block truncate text-xs text-mute">{r.sub}</span>
                    </span>
                    <Icon name="arrowR" size={13} className="mt-1.5 text-mute opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
                {queue.length === 0 && <div className="text-sm text-mute">Everything recommended is done. Explore careers or start the capstone.</div>}
              </div>
            </section>
          </Reveal>

          <Reveal delay={200}>
            <section className="card-ink bg-card p-5">
              <h3 className="mb-3 font-display text-base font-semibold tracking-tight">Assessments</h3>
              <div className="space-y-2">
                {db.assessments.map((a) => {
                  const best = app.bestAttempt(a.id);
                  const c = app.getCourse(a.courseId);
                  return (
                    <button key={a.id} onClick={() => app.nav({ name: "assessment", id: a.id })} className="group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-paper">
                      <span className={cn("h-2 w-2 shrink-0 rounded-full", courseMeta(a.courseId).dot)} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-semibold leading-tight">{a.title}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{c?.short} · {a.kind}</span>
                      </span>
                      {best ? (
                        <Chip className={best.pass ? "bg-se-soft text-se" : "bg-[#f6e3e0] text-danger"}>{best.pct}%</Chip>
                      ) : (
                        <Chip className="bg-[#e8eadd] text-mute">new</Chip>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          </Reveal>

          <Reveal delay={240}>
            <section className="card-ink bg-card p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold tracking-tight">Achievements</h3>
                <button className="font-mono text-[11px] uppercase tracking-wider text-brand-deep hover:underline" onClick={() => app.nav({ name: "profile" })}>Profile</button>
              </div>
              {recentAch.length === 0 ? (
                <div className="text-sm text-mute">Complete your first lesson to earn one.</div>
              ) : (
                <div className="space-y-2.5">
                  {recentAch.map(({ a, at }) => a && (
                    <div key={a.id} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md border-1.5 border-[#9a6a08]/40 bg-gold-soft text-[#8a5a06]">
                        <Icon name="award" size={17} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold leading-tight">{a.title}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-mute">earned {timeAgo(at)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3 border-t-1.5 border-dashed border-line pt-3 font-mono text-[11px] text-mute">
                {Object.keys(st.achievements).length}/{db.achievements.length} unlocked
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      {/* Philosophy strip */}
      <Reveal delay={260}>
        <div className="card-ink flex flex-wrap items-center justify-center gap-2 bg-card px-4 py-4 sm:gap-3">
          {PHILOSOPHY.map((p, i) => (
            <span key={p} className="flex items-center gap-2 sm:gap-3">
              <span
                className={cn(
                  "flex items-center gap-2 rounded-md border-1.5 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
                  i === philoIdx ? "border-ink bg-ink text-gold" : i < philoIdx ? "border-brand/40 bg-brand-soft text-brand-deep" : "border-line text-mute",
                )}
              >
                {i < philoIdx && <Icon name="check" size={11} />}
                {i === philoIdx && <span className="dot-live h-1.5 w-1.5 rounded-full bg-gold" />}
                {p}
              </span>
              {i < PHILOSOPHY.length - 1 && <Icon name="arrowR" size={13} className="text-line" />}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

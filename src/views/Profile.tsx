import { useState } from "react";
import { useApp } from "../lib/store";
import { Avatar, Bar, Chip, Modal, Reveal, SectionHead, StatTile, cn, fmtDate } from "../components/ui";
import { Icon } from "../components/icons";
import { PathMini } from "./PathCareers";

export default function Profile() {
  const app = useApp();
  const { db, user, st } = app;
  const [cert, setCert] = useState<{ title: string; date: number; id: string; kind: string } | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  if (!user || !st) return null;

  const stats = app.studentStats();
  const level = app.levelInfo();
  const stage = app.pathStage();
  const completedProjects = Object.entries(st.projects)
    .filter(([, ps]) => ps.status === "completed")
    .map(([pid, ps]) => ({ p: db.projects.find((x) => x.id === pid), ps }));

  return (
    <div className="space-y-6">
      <SectionHead kicker="Profile" title="Your development journey" />

      {/* Identity card */}
      <Reveal>
        <div className="card-ink overflow-hidden bg-card">
          <div className="bg-sidebar-trace flex flex-col gap-5 bg-ink p-6 text-paper sm:flex-row sm:items-center sm:p-7">
            <div className="flex items-center gap-4">
              <Avatar user={user} size={64} />
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight">{user.name}</h1>
                <div className="mt-0.5 text-sm text-paper/60">{user.title} · {user.email}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Chip className="bg-gold-soft text-[#8a5a06]">{level.name}</Chip>
                  <Chip className="bg-paper/10 text-paper/70">joined {fmtDate(user.joinedAt)}</Chip>
                  <Chip className="bg-paper/10 text-paper/70">{level.xp} XP</Chip>
                </div>
              </div>
            </div>
            <div className="sm:ml-auto sm:w-64">
              <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-paper/50">
                <span>Learning path</span><span>stage {Math.min(stage + 1, 10)}/10</span>
              </div>
              <PathMini stage={stage} />
              <div className="mt-2.5">
                <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-paper/50">
                  <span>XP to {level.next ? "next level" : "max level"}</span>
                  <span>{level.next ? `${level.next - level.xp} XP` : "—"}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-paper/15">
                  <div className="h-full rounded-full bg-gold transition-all duration-700" style={{ width: `${level.pct}%` }} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x-1.5 divide-line sm:grid-cols-5">
            {[
              { label: "Lessons", v: `${stats.lessons}/${db.lessons.length}` },
              { label: "Activities", v: `${stats.activities}` },
              { label: "Avg quiz", v: stats.avgPct !== null ? `${stats.avgPct}%` : "—" },
              { label: "Projects done", v: `${stats.projectsDone}` },
              { label: "Skills", v: `${stats.skills}/${db.skills.length}` },
            ].map((s) => (
              <div key={s.label} className="px-4 py-3.5 text-center">
                <div className="font-display text-xl font-bold leading-none">{s.v}</div>
                <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-mute">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Achievements */}
        <Reveal delay={80}>
          <section className="card-ink h-full bg-card p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold tracking-tight">Achievements</h2>
              <Chip className="bg-gold-soft text-[#8a5a06]">{Object.keys(st.achievements).length}/{db.achievements.length}</Chip>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {db.achievements.map((a) => {
                const at = st.achievements[a.id];
                return (
                  <div key={a.id} className={cn("rounded-lg border-1.5 p-3.5", at ? "border-[#9a6a08]/40 bg-gold-soft/60" : "border-dashed border-line bg-paper/40 opacity-75")}>
                    <div className="flex items-center gap-2.5">
                      <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-1.5", at ? "border-[#9a6a08]/50 bg-gold-soft text-[#8a5a06]" : "border-line bg-card text-mute")}>
                        <Icon name="award" size={17} />
                      </span>
                      <div className="min-w-0">
                        <div className={cn("font-display text-[13.5px] font-bold leading-tight", !at && "text-mute")}>{a.title}</div>
                        <div className="font-mono text-[9.5px] uppercase tracking-wider text-mute">{at ? `earned ${fmtDate(at)}` : a.metric}</div>
                      </div>
                    </div>
                    <p className={cn("mt-2 text-xs leading-relaxed", at ? "text-ink/70" : "text-mute")}>{a.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Completion records */}
        <Reveal delay={140}>
          <section className="card-ink h-full bg-card p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold tracking-tight">Completion records</h2>
              <Chip className="bg-brand-soft text-brand-deep">{st.certificates.length + completedProjects.length} issued</Chip>
            </div>
            {st.certificates.length === 0 && completedProjects.length === 0 ? (
              <div className="flex flex-col items-center rounded-lg border-1.5 border-dashed border-line bg-paper/50 px-5 py-8 text-center">
                <Icon name="grad" size={26} className="text-mute" />
                <p className="mt-2 text-sm font-semibold">No records yet</p>
                <p className="mt-1 max-w-xs text-xs leading-relaxed text-mute">
                  Course records are issued when every lesson is complete and the checkpoint is passed. Project records follow instructor approval.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {st.certificates.map((c) => {
                  const course = app.getCourse(c.courseId)!;
                  return (
                    <button key={c.id} onClick={() => setCert({ title: course.title, date: c.at, id: c.id, kind: "Course record" })} className="card-ink-hover group flex w-full items-center gap-3.5 rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3 text-left">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md border-1.5 border-[#9a6a08]/40 bg-gold-soft text-[#8a5a06]"><Icon name="grad" size={19} /></span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold">{course.title}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-mute">Course record · {fmtDate(c.at)}</div>
                      </div>
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-brand-deep group-hover:underline">View</span>
                    </button>
                  );
                })}
                {completedProjects.map(({ p, ps }) => p && (
                  <button key={p.id} onClick={() => setCert({ title: p.title, date: ps.completedAt ?? Date.now(), id: `rec-${p.id}`, kind: "Project record" })} className="card-ink-hover group flex w-full items-center gap-3.5 rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3 text-left">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border-1.5 border-se/40 bg-se-soft text-se"><Icon name="cube" size={18} /></span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold">{p.title}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-mute">Project record · approved {ps.completedAt ? fmtDate(ps.completedAt) : ""}</div>
                    </div>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-brand-deep group-hover:underline">View</span>
                  </button>
                ))}
              </div>
            )}
            <p className="mt-4 border-t-1.5 border-dashed border-line pt-3 text-xs leading-relaxed text-mute">
              Records document what was completed and assessed on this platform. They are issued automatically the moment requirements are met.
            </p>
          </section>
        </Reveal>
      </div>

      {/* Course snapshot - show active course only */}
      <Reveal delay={180}>
        <section className="card-ink bg-card p-5 sm:p-6">
          <h2 className="mb-4 font-display text-lg font-semibold tracking-tight">Course standing</h2>
          {app.hasActiveCourse() ? (
            <div className="grid gap-3">
              {(() => {
                const c = app.activeCourse()!;
                const pct = app.coursePct(c.id);
                const best = db.assessments.filter((a) => a.courseId === c.id).map((a) => app.bestAttempt(a.id)?.pct).filter((x): x is number => x !== undefined);
                return (
                  <div key={c.id} className="rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold">{c.short}</span>
                        <span className="rounded-full bg-se-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-se">active</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-ink">{pct}%</span>
                    </div>
                    <Bar value={pct} color={c.color} className="mt-2 h-1.5" />
                    <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-mute">
                      best assessment {best.length ? `${Math.max(...best)}%` : "—"}
                    </div>
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="rounded-lg border-1.5 border-dashed border-line bg-paper/30 px-4 py-6 text-center">
              <p className="text-sm text-mute">No active course yet.</p>
              <button onClick={() => app.nav({ name: "dashboard" })} className="btn btn-primary btn-sm mt-3">
                Choose your course
              </button>
            </div>
          )}
        </section>
      </Reveal>

      {/* Danger zone */}
      <Reveal delay={220}>
        <section className="card-ink border-danger/40 bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-sm font-bold text-danger">Danger zone</h2>
              <p className="mt-0.5 text-xs text-mute">Reset the demo database and every account's progress in this browser.</p>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => setResetOpen(true)}><Icon name="refresh" size={13} /> Reset demo data</button>
          </div>
        </section>
      </Reveal>

      {/* Certificate modal */}
      <Modal open={!!cert} onClose={() => setCert(null)} wide kicker="Completion record" title={cert?.title}>
        {cert && (
          <div className="rounded-lg border-2 border-ink p-1.5">
            <div className="rounded-md border-1.5 border-dashed border-[#9a6a08]/60 bg-paper px-6 py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#9a6a08] bg-gold-soft text-[#8a5a08]">
                <Icon name="logo" size={24} />
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-mute">TechFoundry Academy</div>
              <div className="mt-2 font-display text-2xl font-bold tracking-tight">Certificate of Completion</div>
              <p className="mt-4 text-sm text-mute">This records that</p>
              <div className="mt-1 font-display text-xl font-bold">{user.name}</div>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mute">
                {cert.kind === "Course record"
                  ? <>completed every lesson and passed the checkpoint assessment of <span className="font-semibold text-ink">{cert.title}</span>.</>
                  : <>delivered <span className="font-semibold text-ink">{cert.title}</span> to approved standard, with all milestones verified by instructor review.</>}
              </p>
              <div className="mt-6 flex items-end justify-between gap-4 px-2">
                <div className="text-left">
                  <div className="font-display text-sm font-bold">Ade Okonkwo</div>
                  <div className="border-t-1.5 border-ink pt-1 font-mono text-[9.5px] uppercase tracking-wider text-mute">Program Director</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs font-bold">{fmtDate(cert.date)}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-mute">{cert.id}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Reset confirm */}
      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        kicker="Danger zone"
        title="Reset all demo data?"
        footer={
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => setResetOpen(false)}>Cancel</button>
            <button className="btn btn-danger btn-sm" onClick={() => app.resetAll()}><Icon name="refresh" size={13} /> Yes, reset everything</button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-mute">
          This wipes every account's progress, submissions, feedback, and content edits stored in this browser, and reseeds the original cohort. There is no undo.
        </p>
      </Modal>
    </div>
  );
}

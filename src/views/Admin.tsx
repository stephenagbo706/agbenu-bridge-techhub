import { useMemo, useState } from "react";
import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Avatar, Bar, Chip, CourseTag, Modal, Reveal, SectionHead, Seg, StatTile, StatusPill, cn, timeAgo } from "../components/ui";
import { Icon } from "../components/icons";
import type { IconName } from "../components/icons";
import type { Project, User } from "../lib/types";
import AdminContent from "./AdminContent";

const TABS: { id: string; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "dashboard" },
  { id: "review", label: "Review queue", icon: "clipboard" },
  { id: "content", label: "Content", icon: "book" },
  { id: "students", label: "Students", icon: "users" },
  { id: "announce", label: "Announce", icon: "send" },
];

export default function Admin() {
  const app = useApp();
  const tab = app.route.tab ?? "overview";
  const queue = app.pendingQueue();

  return (
    <div>
      <SectionHead
        kicker="Staff console"
        title={app.user?.role === "admin" ? "Platform administration" : "Instructor console"}
        right={queue.length > 0 && tab !== "review" ? (
          <button className="btn btn-gold btn-sm" onClick={() => app.nav({ name: "admin", tab: "review" })}>
            <Icon name="clipboard" size={13} /> {queue.length} awaiting review
          </button>
        ) : undefined}
      />
      <div className="mb-6 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => app.nav({ name: "admin", tab: t.id })}
            className={cn(
              "flex items-center gap-2 rounded-md border-1.5 px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-wider transition-all",
              tab === t.id ? "border-ink bg-ink text-paper" : "border-line bg-card text-mute hover:border-ink hover:text-ink",
            )}
          >
            <Icon name={t.icon} size={13} /> {t.label}
            {t.id === "review" && queue.length > 0 && <span className={cn("rounded px-1.5 font-bold", tab === t.id ? "bg-gold text-ink" : "bg-gold-soft text-[#8a5a06]")}>{queue.length}</span>}
          </button>
        ))}
      </div>
      {tab === "overview" && <Overview />}
      {tab === "review" && <Review />}
      {tab === "content" && <AdminContent />}
      {tab === "students" && <Students />}
      {tab === "announce" && <Announce />}
    </div>
  );
}

// ─── Overview ───────────────────────────────────────────────────────────────

function Overview() {
  const app = useApp();
  const { db } = app;
  const students = db.users.filter((u) => u.role === "student");
  const allAttempts = students.flatMap((u) => db.students[u.id]?.attempts ?? []);
  const avgQuiz = allAttempts.length ? Math.round(allAttempts.reduce((s, a) => s + a.pct, 0) / allAttempts.length) : 0;
  const lessonsTotal = students.reduce((s, u) => s + Object.keys(db.students[u.id]?.lessons ?? {}).length, 0);
  const projectsDone = students.reduce((s, u) => s + Object.values(db.students[u.id]?.projects ?? {}).filter((p) => p.status === "completed").length, 0);
  const queue = app.pendingQueue();
  const LOG_ICON: Record<string, IconName> = { lesson: "book", activity: "wrench", assessment: "clipboard", project: "cube", system: "gear" };

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <StatTile icon="users" label="Students" value={students.length} sub="enrolled cohort" />
          <StatTile icon="zap" label="Active · 7d" value={app.activeStudents()} sub="with logged activity" />
          <StatTile icon="book" label="Lessons done" value={lessonsTotal} sub={`${db.lessons.length} in curriculum`} />
          <StatTile icon="clipboard" label="Avg quiz score" value={`${avgQuiz}%`} sub={`${allAttempts.length} attempts`} />
          <StatTile icon="cube" label="Projects done" value={projectsDone} sub={`${queue.length} in review`} />
          <StatTile icon="award" label="Achievements" value={students.reduce((s, u) => s + Object.keys(db.students[u.id]?.achievements ?? {}).length, 0)} sub="earned platform-wide" />
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal delay={80}>
          <section className="card-ink h-full bg-card p-5 sm:p-6">
            <h3 className="mb-4 font-display text-lg font-semibold tracking-tight">Course completion — cohort average</h3>
            <div className="space-y-4">
              {db.courses.map((c) => {
                const avg = app.courseAvgPct(c.id);
                const started = students.filter((u) => app.coursePct(c.id, u.id) > 0).length;
                const m = courseMeta(c.id);
                return (
                  <div key={c.id}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", m.dot)} />
                        <span className="font-display text-sm font-bold">{c.title}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{started}/{students.length} started</span>
                      </div>
                      <span className="font-mono text-sm font-bold" style={{ color: m.hex }}>{avg}%</span>
                    </div>
                    <Bar value={avg} color={m.hex} className="h-2.5" />
                  </div>
                );
              })}
            </div>
            <div className="mt-5 border-t-1.5 border-dashed border-line pt-4">
              <div className="lbl">Assessment performance</div>
              {db.assessments.map((a) => {
                const rel = allAttempts.filter((x) => x.assessmentId === a.id);
                const avg = rel.length ? Math.round(rel.reduce((s, x) => s + x.pct, 0) / rel.length) : null;
                return (
                  <div key={a.id} className="flex items-center gap-3 py-1.5">
                    <span className={cn("h-1.5 w-1.5 rounded-full", courseMeta(a.courseId).dot)} />
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{a.title}</span>
                    <span className="font-mono text-[11px] text-mute">{rel.length ? `${rel.length} sits` : "no sits"}</span>
                    <span className={cn("font-mono text-xs font-bold", avg === null ? "text-mute" : avg >= 70 ? "text-se" : "text-warn")}>{avg === null ? "—" : `${avg}%`}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={120}>
            <section className="card-ink bg-card p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight">Recent activity</h3>
                <Chip className="bg-brand-soft text-brand-deep"><span className="dot-live h-1.5 w-1.5 rounded-full bg-current" /> live</Chip>
              </div>
              <div className="max-h-72 space-y-1 overflow-y-auto pr-1 thin-scroll">
                {db.log.slice(0, 14).map((e, i) => {
                  const u = app.getUser(e.userId);
                  return (
                    <div key={i} className="flex items-start gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-paper">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-1.5 border-line bg-paper text-mute">
                        <Icon name={LOG_ICON[e.type] ?? "gear"} size={12} />
                      </span>
                      <div className="min-w-0 flex-1 text-[13px] leading-snug">
                        <span className="font-semibold">{u?.name ?? "System"}</span>{" "}
                        <span className="text-mute">{e.label}</span>
                      </div>
                      <span className="whitespace-nowrap font-mono text-[10px] text-mute">{timeAgo(e.at)}</span>
                    </div>
                  );
                })}
                {db.log.length === 0 && <div className="text-sm text-mute">No activity yet.</div>}
              </div>
            </section>
          </Reveal>

          <Reveal delay={160}>
            <section className="card-ink bg-card p-5">
              <div className="flex items-center gap-2">
                <Icon name="layers" size={15} className="text-brand-deep" />
                <h3 className="font-display text-base font-semibold tracking-tight">Architecture & integration</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-mute">
                The frontend never touches storage directly — every mutation runs through a typed service layer that validates roles
                (student / instructor / admin), applies the earn engine, and emits notifications. In this demo build the persistence adapter
                is browser storage; the contract is shaped for a hosted <span className="font-semibold text-ink">Go REST API + PostgreSQL</span> with
                JWT sessions, where entities map 1:1 (users, courses, topics, lessons, attempts, projects, submissions, skills, achievements…).
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider">
                {["Frontend · React+TS", "Service layer · role checks", "Adapter · localStorage", "Target · Go + Postgres"].map((s, i) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className={cn("rounded border px-2 py-1", i === 3 ? "border-dashed border-mute text-mute" : "border-line bg-paper text-ink")}>{s}</span>
                    {i < 3 && <Icon name="arrowR" size={10} className="text-line" />}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ─── Review queue ───────────────────────────────────────────────────────────

function Review() {
  const app = useApp();
  const { db } = app;
  const queue = app.pendingQueue();
  const [target, setTarget] = useState<{ user: User; project: Project; verdict: "approved" | "revise" } | null>(null);
  const [feedback, setFeedback] = useState("");

  const reviewed = useMemo(() => {
    const out: { user: User; project: Project; at: number; verdict: string; by: string }[] = [];
    for (const u of db.users) {
      if (u.role !== "student") continue;
      const s = db.students[u.id];
      if (!s) continue;
      for (const [pid, ps] of Object.entries(s.projects)) {
        if (ps.feedback) {
          const p = db.projects.find((x) => x.id === pid);
          if (p) out.push({ user: u, project: p, at: ps.feedback.at, verdict: ps.feedback.verdict, by: ps.feedback.by });
        }
      }
    }
    return out.sort((a, b) => b.at - a.at).slice(0, 6);
  }, [db]);

  const send = () => {
    if (!target || feedback.trim().length < 10) return;
    app.reviewProject(target.user.id, target.project.id, target.verdict, feedback.trim());
    setTarget(null);
    setFeedback("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {queue.length === 0 && (
          <div className="rounded-lg border-1.5 border-dashed border-line bg-card/60 px-6 py-12 text-center">
            <Icon name="check" size={26} className="mx-auto text-se" />
            <p className="mt-2 font-display text-base font-semibold">Queue is clear</p>
            <p className="mt-1 text-sm text-mute">New project submissions from students will appear here.</p>
          </div>
        )}
        {queue.map(({ user, project, at }, i) => {
          const ps = db.students[user.id]?.projects[project.id];
          return (
            <Reveal key={`${user.id}-${project.id}`} delay={i * 60}>
              <section className="card-ink bg-card p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Avatar user={user} size={38} />
                  <div className="min-w-0">
                    <div className="font-display text-[15px] font-bold">{user.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-mute">submitted {timeAgo(at)}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {project.courseIds.map((cid) => <CourseTag key={cid} course={app.getCourse(cid)!} />)}
                    <StatusPill status={ps?.status ?? "submitted"} />
                  </div>
                </div>
                <div className="mt-3 rounded-lg border-1.5 border-line bg-paper/50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon name="cube" size={15} className="text-brand-deep" />
                    <span className="font-display text-sm font-bold">{project.title}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{project.code} · {ps?.milestones.length}/{project.milestones.length} milestones</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{ps?.submission?.text}</p>
                  {ps?.submission?.link && (
                    <a href={ps.submission.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-deep hover:underline">
                      <Icon name="link" size={13} /> {ps.submission.link}
                    </a>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {ps?.status === "submitted" && (
                    <button className="btn btn-ghost btn-sm" onClick={() => app.beginReview(user.id, project.id)}>
                      <Icon name="eye" size={13} /> Begin review
                    </button>
                  )}
                  <button className="btn btn-primary btn-sm ml-auto" onClick={() => { setTarget({ user, project, verdict: "approved" }); setFeedback(""); }}>
                    <Icon name="check" size={13} /> Approve project
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => { setTarget({ user, project, verdict: "revise" }); setFeedback(""); }}>
                    <Icon name="refresh" size={13} /> Request changes
                  </button>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      {reviewed.length > 0 && (
        <Reveal delay={100}>
          <section className="card-ink bg-card p-5">
            <h3 className="mb-3 font-display text-base font-semibold tracking-tight">Recently reviewed</h3>
            <div className="space-y-1.5">
              {reviewed.map((r, i) => (
                <div key={i} className="flex flex-wrap items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] hover:bg-paper">
                  <Avatar user={r.user} size={24} />
                  <span className="font-semibold">{r.user.name}</span>
                  <span className="text-mute">· {r.project.title}</span>
                  <span className={cn("ml-auto", r.verdict === "approved" ? "text-se" : "text-warn")}>
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider">{r.verdict === "approved" ? "approved" : "revise"}</span>
                  </span>
                  <span className="font-mono text-[10px] text-mute">{timeAgo(r.at)} · {r.by}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        kicker={target?.verdict === "approved" ? "Approve project" : "Request changes"}
        title={target ? `${target.project.title} — ${target.user.name}` : ""}
        footer={
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => setTarget(null)}>Cancel</button>
            <button className={cn("btn btn-sm", target?.verdict === "approved" ? "btn-primary" : "btn-danger")} disabled={feedback.trim().length < 10} onClick={send}>
              <Icon name="send" size={13} /> Send feedback & {target?.verdict === "approved" ? "approve" : "return"}
            </button>
          </>
        }
      >
        <p className="text-sm text-mute">
          {target?.verdict === "approved"
            ? "Approval completes the project, issues its completion record, grants tied skills and achievements, and notifies the student."
            : "The project returns to in-progress with your notes attached; the student is notified to revise and resubmit."}
        </p>
        <label className="lbl mt-4">Written feedback (required, min 10 chars)</label>
        <textarea className="inp min-h-28" placeholder="Be specific: what worked, what to strengthen, and one concrete next step." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <div className="mt-1 font-mono text-[10.5px] text-mute">{feedback.trim().length} chars</div>
      </Modal>
    </div>
  );
}

// ─── Students ───────────────────────────────────────────────────────────────

function Students() {
  const app = useApp();
  const { db } = app;
  const students = db.users.filter((u) => u.role === "student");
  const [sel, setSel] = useState<User | null>(null);

  const lastActive = (uid: string) => {
    const ev = db.log.find((e) => e.userId === uid);
    return ev ? timeAgo(ev.at) : "—";
  };

  return (
    <div>
      <div className="card-ink overflow-hidden bg-card">
        <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_repeat(4,auto)_auto] items-center gap-4 border-b-1.5 border-line bg-paper/60 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-mute md:grid">
          <span>Student</span><span>Overall progress</span><span>Lessons</span><span>Avg quiz</span><span>Projects</span><span>Skills</span><span>Last active</span>
        </div>
        {students.map((u) => {
          const pct = app.overallPct(u.id);
          const stats = app.studentStats(u.id);
          const lvl = app.levelInfo(u.id);
          return (
            <button key={u.id} onClick={() => setSel(u)} className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 border-b-1.5 border-dashed border-line px-5 py-3.5 text-left transition-colors last:border-0 hover:bg-paper md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_repeat(4,auto)_auto]">
              <span className="flex items-center gap-3">
                <Avatar user={u} size={34} />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-display text-sm font-bold">{u.name} <Chip className="bg-gold-soft text-[#8a5a06]">{lvl.name}</Chip></span>
                  <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-mute">{u.email}</span>
                </span>
              </span>
              <span className="flex items-center gap-2.5 justify-self-end md:justify-self-auto">
                <Seg value={pct} cells={12} className="h-2 w-24 md:w-full" />
                <span className="font-mono text-xs font-bold">{pct}%</span>
              </span>
              <span className="hidden font-mono text-xs md:block">{stats.lessons}</span>
              <span className="hidden font-mono text-xs md:block">{stats.avgPct !== null ? `${stats.avgPct}%` : "—"}</span>
              <span className="hidden font-mono text-xs md:block">{stats.projectsDone}</span>
              <span className="hidden font-mono text-xs md:block">{stats.skills}</span>
              <span className="hidden font-mono text-[10.5px] text-mute md:block">{lastActive(u.id)}</span>
              <Icon name="chevR" size={14} className="col-span-2 justify-self-end text-mute md:col-span-1" />
            </button>
          );
        })}
      </div>

      <Modal open={!!sel} onClose={() => setSel(null)} kicker="Student record" title={sel?.name} wide>
        {sel && (() => {
          const stats = app.studentStats(sel.id);
          const s = db.students[sel.id];
          const events = db.log.filter((e) => e.userId === sel.id).slice(0, 6);
          return (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Avatar user={sel} size={44} />
                <div>
                  <div className="text-sm text-mute">{sel.title} · joined {new Date(sel.joinedAt).toLocaleDateString()}</div>
                  <div className="font-mono text-[11px] text-mute">{stats.lessons} lessons · {stats.activities} activities · {Object.keys(s?.achievements ?? {}).length} achievements</div>
                </div>
              </div>
              <div>
                <div className="lbl">Course progress</div>
                <div className="space-y-3">
                  {db.courses.map((c) => {
                    const pct = app.coursePct(c.id, sel.id);
                    return (
                      <div key={c.id}>
                        <div className="mb-1 flex justify-between text-[13px]">
                          <span className="font-semibold">{c.short}</span>
                          <span className="font-mono text-xs font-bold" style={{ color: courseMeta(c.id).hex }}>{pct}%</span>
                        </div>
                        <Bar value={pct} color={courseMeta(c.id).hex} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="lbl">Recent events</div>
                {events.length === 0 ? <div className="text-sm text-mute">No logged activity yet.</div> : (
                  <div className="space-y-1">
                    {events.map((e, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px]">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        <span className="flex-1 text-mute">{e.label}</span>
                        <span className="font-mono text-[10px] text-mute">{timeAgo(e.at)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}

// ─── Announce ───────────────────────────────────────────────────────────────

function Announce() {
  const app = useApp();
  const { db } = app;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const sent = db.log.filter((e) => e.type === "system" && e.label.startsWith("announced"));
  const valid = title.trim().length >= 4 && body.trim().length >= 10;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Reveal>
        <section className="card-ink bg-card p-5 sm:p-6">
          <h3 className="mb-1 font-display text-lg font-semibold tracking-tight">Send an announcement</h3>
          <p className="mb-4 text-xs text-mute">Delivered as a notification to every student account. Use sparingly — signal, not noise.</p>
          <label className="lbl">Title</label>
          <input className="inp" placeholder="e.g. Capstone demo day — Friday 14:00" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="lbl mt-3">Message</label>
          <textarea className="inp min-h-28" placeholder="What do students need to know, and what should they do about it?" value={body} onChange={(e) => setBody(e.target.value)} />
          <button className="btn btn-primary mt-4" disabled={!valid} onClick={() => { app.announce(title.trim(), body.trim()); setTitle(""); setBody(""); }}>
            <Icon name="send" size={14} /> Send to all students
          </button>
        </section>
      </Reveal>
      <Reveal delay={100}>
        <section className="card-ink bg-card p-5 sm:p-6">
          <h3 className="mb-3 font-display text-lg font-semibold tracking-tight">Previously sent</h3>
          {sent.length === 0 ? (
            <div className="text-sm text-mute">No announcements yet.</div>
          ) : (
            <div className="space-y-2">
              {sent.map((e, i) => (
                <div key={i} className="flex items-start gap-3 rounded-md border-1.5 border-line bg-paper/50 px-3.5 py-2.5">
                  <Icon name="send" size={14} className="mt-0.5 text-brand-deep" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold leading-snug">{e.label.replace(/^announced "/, "").replace(/" to all students$/, "")}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-mute">{timeAgo(e.at)} · {app.getUser(e.userId)?.name}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </Reveal>
    </div>
  );
}

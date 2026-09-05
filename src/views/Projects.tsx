import { useMemo, useState } from "react";
import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Bar, Chip, CourseTag, DiffChip, Modal, Reveal, SectionHead, StatusPill, cn, fmtDate, timeAgo } from "../components/ui";
import { Icon } from "../components/icons";
import type { ProjectStatus } from "../lib/types";

const ORDER: ProjectStatus[] = ["not_started", "in_progress", "submitted", "under_review", "completed"];
const STEP_LABEL: Record<ProjectStatus, string> = {
  not_started: "Not started", in_progress: "In progress", submitted: "Submitted",
  under_review: "Under review", completed: "Completed",
};

export function ProjectsView() {
  const app = useApp();
  const { db, st } = app;
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");

  const items = db.projects.map((p) => ({ p, ps: st?.projects[p.id] }));
  const filtered = items.filter(({ ps }) => filter === "all" ? true : (ps?.status ?? "not_started") === filter);
  const countFor = (s: ProjectStatus | "all") =>
    s === "all" ? items.length : items.filter(({ ps }) => (ps?.status ?? "not_started") === s).length;

  return (
    <div>
      <SectionHead
        kicker="Build"
        title="Projects — where learning becomes proof"
        right={<Chip className="bg-brand-soft text-brand-deep">{items.filter(({ ps }) => ps?.status === "completed").length} completed</Chip>}
      />
      <p className="-mt-2 mb-4 max-w-2xl text-sm text-mute">
        Every project moves you through the full loop: requirements → build → submit → feedback → improvement. The capstone fuses all four courses into one system.
      </p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {(["all", ...ORDER] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-md border-1.5 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider transition-all",
              filter === f ? "border-ink bg-ink text-paper" : "border-line bg-card text-mute hover:border-ink hover:text-ink",
            )}
          >
            {f === "all" ? "All" : STEP_LABEL[f as ProjectStatus]} <span className="opacity-60">{countFor(f)}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(({ p, ps }, i) => {
          const status: ProjectStatus = ps?.status ?? "not_started";
          const msDone = ps?.milestones.length ?? 0;
          return (
            <Reveal key={p.id} delay={i * 60}>
              <button onClick={() => app.nav({ name: "project", id: p.id })} className="card-ink card-ink-hover group flex h-full w-full flex-col bg-card p-5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">{p.code}</span>
                  <DiffChip level={p.difficulty} />
                  <span className="ml-auto"><StatusPill status={status} /></span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-mute">{p.brief}</p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {p.courseIds.map((cid) => <CourseTag key={cid} course={app.getCourse(cid)!} />)}
                  <span className="ml-auto font-mono text-[10.5px] uppercase tracking-wider text-mute">~{p.hours}h · {p.milestones.length} milestones</span>
                </div>
                <div className="mt-3 flex items-center gap-3 border-t-1.5 border-dashed border-line pt-3">
                  <Bar value={(msDone / p.milestones.length) * 100} color={status === "completed" ? "#1b8a4c" : "#0e7c6b"} className="h-1.5 flex-1" />
                  <span className="font-mono text-[11px] font-bold text-brand-deep">{msDone}/{p.milestones.length}</span>
                  <Icon name="chevR" size={14} className="text-mute transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-lg border-1.5 border-dashed border-line bg-card/60 px-6 py-10 text-center text-sm text-mute">
          No projects in this state right now.
        </div>
      )}
    </div>
  );
}

export function ProjectView({ id }: { id: string }) {
  const app = useApp();
  const { db, st, user } = app;
  const project = app.getProject(id);
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [presentOpen, setPresentOpen] = useState(false);
  const ps = useMemo(() => st?.projects[id], [st, id]);
  if (!project || !st || !user) return null;

  const status: ProjectStatus = ps?.status ?? "not_started";
  const statusIdx = ORDER.indexOf(status);
  const valid = text.trim().length >= 60;
  const isPrimary = project.courseIds.length === 1 ? courseMeta(project.courseIds[0]).hex : "#c2317e";

  const submit = () => {
    if (!valid) return;
    app.submitProject(project.id, text.trim(), link.trim() || undefined);
    setText("");
    setLink("");
  };

  return (
    <div className="space-y-5">
      <button onClick={() => app.nav({ name: "projects" })} className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mute transition-colors hover:text-ink">
        <Icon name="arrowL" size={13} /> All projects
      </button>

      {/* Header */}
      <Reveal>
        <div className="card-ink overflow-hidden bg-card">
          <div className="h-2" style={{ background: `linear-gradient(90deg, ${project.courseIds.map((c) => courseMeta(c).hex).join(", ")})` }} />
          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">{project.code}</span>
              <DiffChip level={project.difficulty} />
              {project.courseIds.map((cid) => <CourseTag key={cid} course={app.getCourse(cid)!} />)}
              <span className="ml-auto"><StatusPill status={status} /></span>
            </div>
            <h1 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{project.title}</h1>
            <p className="mt-2.5 max-w-3xl text-[15px] leading-[1.7] text-mute">{project.brief}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] uppercase tracking-wider text-mute">
              <span className="flex items-center gap-1.5"><Icon name="clock" size={13} /> ~{project.hours} hours</span>
              <span className="flex items-center gap-1.5"><Icon name="flag" size={13} /> {project.milestones.length} milestones</span>
              <span className="flex items-center gap-1.5"><Icon name="target" size={13} /> {project.objectives.length} objectives</span>
              {ps?.startedAt && <span>started {fmtDate(ps.startedAt)}</span>}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Status timeline */}
      <Reveal delay={70}>
        <div className="card-ink bg-card p-5">
          <div className="lbl">Project pipeline</div>
          <div className="flex flex-col gap-0 sm:flex-row sm:items-center">
            {ORDER.map((s, i) => {
              const reached = status === "completed" ? true : i <= statusIdx;
              const active = i === statusIdx && status !== "completed";
              return (
                <div key={s} className="flex flex-1 items-center sm:flex-col">
                  <div className="flex items-center">
                    <span className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold transition-colors",
                      reached ? (s === "completed" ? "border-se bg-se text-[#f4faf7]" : "border-ink bg-ink text-gold") : "border-line bg-paper text-mute",
                    )}>
                      {reached && s !== "completed" ? <Icon name="check" size={13} /> : reached ? <Icon name="award" size={13} /> : i + 1}
                    </span>
                    {i < ORDER.length - 1 && <span className={cn("h-0.5 w-5 sm:hidden", reached ? "bg-ink" : "bg-line")} />}
                  </div>
                  {i < ORDER.length - 1 && <span className={cn("mx-1 hidden h-0.5 flex-1 rounded sm:mx-0 sm:mt-0 sm:block sm:h-0.5 sm:w-full", reached && i < statusIdx ? "bg-ink" : "bg-line")} style={{ minWidth: 12 }} />}
                  <span className={cn("ml-3 font-mono text-[10px] uppercase tracking-wider sm:ml-0 sm:mt-1.5 sm:text-center", active ? "font-bold text-ink" : reached ? "text-ink" : "text-mute")}>
                    {STEP_LABEL[s]}{active && <span className="dot-live ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* Cross-course roles */}
          {project.roles && (
            <Reveal delay={100}>
              <section className="card-ink bg-card p-5 sm:p-6">
                <div className="lbl">What each technology area contributes</div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {project.roles.map((r) => {
                    const c = app.getCourse(r.courseId)!;
                    const m = courseMeta(c.id);
                    return (
                      <div key={r.courseId} className="rounded-lg border-1.5 border-line bg-paper/50 p-3.5">
                        <div className="flex items-center gap-2">
                          <span className={cn("h-2 w-2 rounded-full", m.dot)} />
                          <span className="font-display text-[13px] font-bold">{c.short}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-mute">{r.role}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </Reveal>
          )}

          {/* Milestones */}
          <Reveal delay={130}>
            <section className="card-ink bg-card p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="lbl mb-0">Milestones</div>
                <span className="font-mono text-[11px] font-bold text-brand-deep">{ps?.milestones.length ?? 0}/{project.milestones.length}</span>
              </div>
              <div className="mt-3 space-y-2">
                {project.milestones.map((ms, i) => {
                  const done = ps?.milestones.includes(ms.id) ?? false;
                  const toggleable = status === "in_progress";
                  return (
                    <button
                      key={ms.id}
                      disabled={!toggleable}
                      onClick={() => app.toggleMilestone(project.id, ms.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md border-1.5 px-3.5 py-2.5 text-left text-sm font-medium leading-snug transition-all",
                        done ? "border-se/50 bg-se-soft" : "border-line bg-paper/40",
                        toggleable && !done && "hover:border-ink hover:bg-paper",
                        !toggleable && "cursor-default",
                      )}
                    >
                      <span className={cn("flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded border-1.5 font-mono text-[10px] font-bold", done ? "border-se bg-se text-[#f4faf7]" : "border-mute/50 bg-card text-mute")}>
                        {done ? <Icon name="check" size={12} /> : i + 1}
                      </span>
                      <span className={cn(!done && "text-mute")}>{ms.title}</span>
                      {done && <span className="ml-auto font-mono text-[9.5px] uppercase tracking-wider text-se">+5 xp</span>}
                    </button>
                  );
                })}
              </div>
              {status === "not_started" && <p className="mt-3 text-xs text-mute">Start the project to unlock milestone tracking.</p>}
              {status !== "in_progress" && status !== "not_started" && <p className="mt-3 text-xs text-mute">Milestones lock again once a submission is in review.</p>}
            </section>
          </Reveal>

          {/* Submission / status area */}
          <Reveal delay={160}>
            {status === "not_started" ? (
              <section className="card-ink bg-card p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border-1.5 border-line bg-paper text-brand-deep">
                  <Icon name="cube" size={22} />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight">Ready to build this?</h3>
                <p className="mx-auto mt-1 max-w-md text-sm text-mute">Starting unlocks the milestone tracker. Work at your own pace — submit when the evidence is ready.</p>
                <button className="btn btn-primary mt-4" onClick={() => app.startProject(project.id)}>
                  <Icon name="play" size={15} /> Start project
                </button>
              </section>
            ) : status === "in_progress" ? (
              <section className="card-ink bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Icon name="send" size={15} className="text-brand-deep" />
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">Submit your work</span>
                </div>
                <textarea
                  className="inp mt-3 min-h-32 leading-relaxed"
                  placeholder="Describe what you built, how it meets each objective, and what you tested. Mention known limitations honestly — reviewers reward it. Minimum 60 characters."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  <input
                    className="inp sm:flex-1"
                    placeholder="Link to repo / demo / doc (optional)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <div className="flex items-center gap-3">
                    <span className={cn("font-mono text-[11px] whitespace-nowrap", valid ? "text-se" : "text-mute")}>{text.trim().length}/60+</span>
                    <button className="btn btn-primary" disabled={!valid} onClick={submit}>
                      <Icon name="send" size={14} /> Submit for review
                    </button>
                  </div>
                </div>
                <p className="mt-2.5 text-xs text-mute">Submitting locks milestones and notifies an instructor. You'll get written feedback — approval or specific changes to make.</p>
              </section>
            ) : (
              <section className={cn("card-ink bg-card p-5 sm:p-6", status === "completed" && "ring-2 ring-se/40")}>
                <div className="flex flex-wrap items-center gap-3">
                  {status === "completed" ? (
                    <span className="stamp text-se">APPROVED</span>
                  ) : (
                    <Chip className={status === "under_review" ? "bg-gold-soft text-warn" : "bg-ai-soft text-ai"}>
                      <span className="dot-live h-1.5 w-1.5 rounded-full bg-current" />
                      {STEP_LABEL[status]}
                    </Chip>
                  )}
                  <span className="text-sm text-mute">
                    {status === "completed" && ps?.completedAt ? `Completed ${fmtDate(ps.completedAt)}` : `Submitted ${ps?.submission ? timeAgo(ps.submission.at) : ""} — an instructor will review it.`}
                  </span>
                  {status === "completed" && (
                    <button className="btn btn-gold btn-sm ml-auto" onClick={() => setPresentOpen(true)}>
                      <Icon name="eye" size={13} /> Present project
                    </button>
                  )}
                </div>
                {ps?.submission && (
                  <div className="mt-4 rounded-md border-1.5 border-line bg-paper/50 p-4">
                    <div className="lbl">Your submission</div>
                    <p className="text-sm leading-relaxed">{ps.submission.text}</p>
                    {ps.submission.link && (
                      <a href={ps.submission.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-deep hover:underline">
                        <Icon name="link" size={13} /> {ps.submission.link}
                      </a>
                    )}
                  </div>
                )}
                {ps?.feedback && (
                  <div className={cn("mt-4 rounded-md border-1.5 p-4", ps.feedback.verdict === "approved" ? "border-se/40 bg-se-soft/60" : "border-gold/50 bg-gold-soft/60")}>
                    <div className="flex items-center gap-2">
                      <Icon name="message" size={14} className={ps.feedback.verdict === "approved" ? "text-se" : "text-warn"} />
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-mute">Instructor feedback · {ps.feedback.by} · {fmtDate(ps.feedback.at)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">{ps.feedback.text}</p>
                    {ps.feedback.verdict === "revise" && <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-warn">Address the notes, then resubmit from the form above.</p>}
                  </div>
                )}
              </section>
            )}
          </Reveal>
        </div>

        {/* Right rail */}
        <div className="space-y-5">
          <Reveal delay={120}>
            <section className="card-ink bg-card p-5">
              <div className="lbl">Project objectives</div>
              <ul className="space-y-2">
                {project.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-[13px] leading-snug">
                    <Icon name="check" size={14} className="mt-0.5 shrink-0" style={{ color: isPrimary }} />
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal delay={160}>
            <section className="card-ink bg-card p-5">
              <div className="lbl">Skills this project builds</div>
              <div className="space-y-2">
                {db.skills.filter((s) => s.via.project === project.id || (project.courseIds.length === 1 && s.via.lessons?.every((l) => db.lessons.find((x) => x.id === l)?.courseId === project.courseIds[0]))).slice(0, 6).map((s) => (
                  <div key={s.id} className="flex items-center gap-2.5 text-[13px] font-medium">
                    <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border-1.5", st.skills[s.id] ? "border-se bg-se text-[#f4faf7]" : "border-line bg-paper text-mute")}>
                      {st.skills[s.id] ? <Icon name="check" size={10} /> : <span className="h-1 w-1 rounded-full bg-line" />}
                    </span>
                    <span className={cn(!st.skills[s.id] && "text-mute")}>{s.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal delay={200}>
            <section className="card-ink bg-card p-5">
              <div className="lbl">The loop you're in</div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider">
                {["Lesson", "Practice", "Challenge", "Project", "Feedback", "Improvement"].map((s, i) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span className={cn("rounded border px-1.5 py-0.5", i === 3 ? "border-gold bg-gold-soft font-bold text-[#8a5a06]" : "border-line text-mute")}>{s}</span>
                    {i < 5 && <Icon name="arrowR" size={10} className="text-line" />}
                  </span>
                ))}
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-mute">Projects are not the end of learning — feedback turns them into the beginning of the next round.</p>
            </section>
          </Reveal>
        </div>
      </div>

      {/* Presentation modal */}
      <Modal
        open={presentOpen}
        onClose={() => setPresentOpen(false)}
        kicker="Project presentation"
        title={project.title}
        wide
        footer={<button className="btn btn-dark btn-sm" onClick={() => setPresentOpen(false)}>Close</button>}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.courseIds.map((cid) => <CourseTag key={cid} course={app.getCourse(cid)!} />)}
            <DiffChip level={project.difficulty} />
            <span className="stamp ml-auto text-se">APPROVED</span>
          </div>
          <div className="rounded-md border-1.5 border-line bg-paper/50 p-4 text-sm leading-relaxed">
            <span className="lbl">Builder</span>
            {user.name} · {user.title}<br />
            <span className="font-mono text-[11px] text-mute">Completed {ps?.completedAt ? fmtDate(ps.completedAt) : ""} · {project.milestones.length}/{project.milestones.length} milestones</span>
          </div>
          <ul className="space-y-1.5">
            {project.milestones.map((ms) => (
              <li key={ms.id} className="flex items-center gap-2 text-sm"><Icon name="check" size={14} className="text-se" /> {ms.title}</li>
            ))}
          </ul>
          {ps?.feedback && (
            <div className="rounded-md border-1.5 border-se/40 bg-se-soft/50 p-4">
              <div className="lbl">Instructor verdict</div>
              <p className="text-sm leading-relaxed">{ps.feedback.text}</p>
              <div className="mt-1 font-mono text-[11px] text-mute">— {ps.feedback.by}</div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

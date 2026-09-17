import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Bar, Chip, CourseTag, DiffChip, Reveal, Ring, SectionHead, Seg, StatusPill, cn, fmtDate } from "../components/ui";
import { Icon } from "../components/icons";

export function CoursesView() {
  const app = useApp();
  const { db, st } = app;
  return (
    <div>
      <SectionHead
        kicker="Curriculum"
        title="Four core courses, one progression"
        right={<Chip className="bg-brand-soft text-brand-deep">{db.lessons.length} lessons · {db.projects.length} projects</Chip>}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {db.courses.map((c, i) => {
          const m = courseMeta(c.id);
          const pct = app.coursePct(c.id);
          const topics = db.topics.filter((t) => t.courseId === c.id);
          const lessons = app.courseLessons(c.id);
          const done = lessons.filter((l) => st?.lessons[l.id]).length;
          const started = pct > 0;
          return (
            <Reveal key={c.id} delay={i * 80}>
              <button
                onClick={() => app.nav({ name: "course", id: c.id })}
                className="card-ink card-ink-hover group flex h-full w-full flex-col overflow-hidden bg-card text-left"
              >
                {/* Course Image */}
                {c.image_url && (
                  <div className="relative h-36 w-full overflow-hidden">
                    <img src={c.image_url} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${m.hex}40, transparent 60%)` }} />
                    <div className="absolute bottom-2 left-3">
                      <Chip className="bg-ink/70 text-paper backdrop-blur-sm">{c.code}</Chip>
                    </div>
                  </div>
                )}
                {!c.image_url && <div className="h-1.5 w-full" style={{ backgroundColor: m.hex }} />}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    {!c.image_url && <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">{c.code}</span>}
                    <Chip className={m.chip}>{c.level}</Chip>
                    <span className={cn("ml-auto font-mono text-[10px] uppercase tracking-wider", pct === 100 ? "text-se" : started ? "text-brand-deep" : "text-mute")}>
                      {pct === 100 ? "✓ complete" : started ? "in progress" : "not started"}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute">{c.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-mute">
                    <span>{topics.length} topics</span>
                    <span>{lessons.length} lessons</span>
                    <span>~{c.hours} h</span>
                    <span>{done}/{lessons.length} done</span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Seg value={pct} cells={18} color={m.hex} className="h-2.5 flex-1" />
                    <span className="font-mono text-sm font-bold" style={{ color: m.hex }}>{pct}%</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t-1.5 border-dashed border-line pt-3.5">
                    <span className="text-xs text-mute">{done === 0 ? "Start with topic one" : done < lessons.length ? "Pick up where you left off" : "Review or take the checkpoint"}</span>
                    <span className="flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-wider transition-transform group-hover:translate-x-0.5" style={{ color: m.hex }}>
                      Open course <Icon name="arrowR" size={13} />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function CourseView({ id }: { id: string }) {
  const app = useApp();
  const { db, st } = app;
  const course = app.getCourse(id);
  if (!course) return null;
  const m = courseMeta(course.id);
  const pct = app.coursePct(course.id);
  const topics = db.topics.filter((t) => t.courseId === course.id).sort((a, b) => a.order - b.order);
  const lessons = app.courseLessons(course.id);
  const doneCount = lessons.filter((l) => st?.lessons[l.id]).length;
  const doneTopics = topics.filter((t) => app.topicDone(t.id)).length;
  const currentTopicId = topics.find((t) => !app.topicDone(t.id))?.id;
  const assessments = db.assessments.filter((a) => a.courseId === course.id);
  const projects = db.projects.filter((p) => p.courseIds.includes(course.id));
  const checkpoint = assessments.find((a) => a.kind === "Checkpoint");
  const cpBest = checkpoint ? app.bestAttempt(checkpoint.id) : undefined;

  return (
    <div className="space-y-6">
      <button onClick={() => app.nav({ name: "courses" })} className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mute transition-colors hover:text-ink">
        <Icon name="arrowL" size={13} /> All courses
      </button>

      {/* Header */}
      <Reveal>
        <div className="card-ink overflow-hidden bg-card">
          <div className="h-2 w-full" style={{ backgroundColor: m.hex }} />
          {/* Course Image Banner */}
          {course.image_url && (
            <div className="relative h-48 w-full overflow-hidden sm:h-56">
              <img src={course.image_url} alt={course.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(20,24,31,0.85), transparent 70%)` }} />
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2">
                  <CourseTag course={course} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70">{course.code} · {course.level} · ~{course.hours}h</span>
                </div>
              </div>
            </div>
          )}
          <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              {!course.image_url && (
                <div className="flex flex-wrap items-center gap-2">
                  <CourseTag course={course} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{course.code} · {course.level} · ~{course.hours}h</span>
                </div>
              )}
              <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{course.title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">{course.description}</p>
              <div className="mt-5">
                <div className="lbl">Course objectives — what you will be able to do</div>
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {course.objectives.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-[13px] leading-snug">
                      <Icon name="check" size={14} className={cn("mt-0.5 shrink-0", m.text)} />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-row items-center justify-around gap-4 rounded-lg border-1.5 border-line bg-paper/60 p-5 lg:flex-col lg:justify-center">
              <Ring value={pct} size={110} stroke={10} color={m.hex}>
                <div className="text-center">
                  <div className="font-display text-2xl font-bold leading-none">{pct}%</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-mute">progress</div>
                </div>
              </Ring>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-center lg:text-left">
                <div>
                  <div className="font-display text-lg font-bold leading-none">{doneTopics}/{topics.length}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-mute">topics</div>
                </div>
                <div>
                  <div className="font-display text-lg font-bold leading-none">{doneCount}/{lessons.length}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-mute">lessons</div>
                </div>
                <div>
                  <div className="font-display text-lg font-bold leading-none">{cpBest ? `${cpBest.pct}%` : "—"}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-mute">checkpoint</div>
                </div>
                <div>
                  <div className="font-display text-lg font-bold leading-none">{lessons.filter((l) => l.id === st?.lastLessonId).length ? "Here" : doneCount ? "Active" : "New"}</div>
                  <div className="font-mono text-[9.5px] uppercase tracking-wider text-mute">status</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Topics + lessons */}
      <div className="space-y-3.5">
        {topics.map((t, ti) => {
          const tLessons = app.topicLessons(t.id);
          const done = app.topicDone(t.id);
          const isCurrent = t.id === currentTopicId;
          const tPct = app.topicPct(t.id);
          const skill = db.skills.find((s) => s.via.lessons?.every((l) => tLessons.some((tl) => tl.id === l)) && s.via.lessons?.length === tLessons.length);
          const activity = db.activities.find((a) => a.topicId === t.id);
          return (
            <Reveal key={t.id} delay={ti * 60}>
              <section className={cn("card-ink bg-card", isCurrent && "ring-2 ring-gold/50")}>
                <div className="flex flex-wrap items-center gap-3 px-5 pt-4 sm:px-6">
                  <span className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md border-1.5",
                    done ? "border-se/40 bg-se-soft text-se" : isCurrent ? "border-[#9a6a08]/40 bg-gold-soft text-[#8a5a06]" : "border-line bg-paper text-mute",
                  )}>
                    {done ? <Icon name="check" size={16} /> : isCurrent ? <Icon name="play" size={14} /> : <Icon name="circle" size={15} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mute">Topic {String(t.order).padStart(2, "0")}</span>
                      <h3 className="font-display text-base font-bold tracking-tight">{t.title}</h3>
                    </div>
                    <p className="mt-0.5 text-[13px] text-mute">{t.summary}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {skill && (
                      <Chip className={st?.skills[skill.id] ? "bg-gold-soft text-[#8a5a06]" : "bg-[#e8eadd] text-mute"}>
                        <Icon name={st?.skills[skill.id] ? "zap" : "circle"} size={10} /> {skill.name}
                      </Chip>
                    )}
                    <span className="font-mono text-xs font-bold" style={{ color: m.hex }}>{tPct}%</span>
                  </div>
                </div>
                <div className="mt-3 border-t-1.5 border-dashed border-line px-3 py-2.5 sm:px-4">
                  {tLessons.map((l) => {
                    const lDone = !!st?.lessons[l.id];
                    const isNext = !lDone && tLessons.filter((x) => !st?.lessons[x.id])[0]?.id === l.id && isCurrent;
                    return (
                      <button
                        key={l.id}
                        onClick={() => app.nav({ name: "lesson", id: l.id })}
                        className="group flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-left transition-colors hover:bg-paper"
                      >
                        <span className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-1.5",
                          lDone ? "border-brand bg-brand text-[#f4faf7]" : isNext ? "border-gold bg-gold-soft text-[#8a5a06]" : "border-line bg-card text-mute",
                        )}>
                          {lDone ? <Icon name="check" size={12} /> : isNext ? <span className="dot-live h-1.5 w-1.5 rounded-full bg-gold" /> : <span className="h-1.5 w-1.5 rounded-full bg-line" />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block truncate text-sm font-semibold leading-tight", !lDone && !isNext && "text-mute")}>{l.title}</span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Lesson {l.order} · {l.minutes} min{lDone && st ? ` · done ${fmtDate(st.lessons[l.id])}` : ""}</span>
                        </span>
                        {isNext && <Chip className="bg-gold-soft text-[#8a5a06]">up next</Chip>}
                        <Icon name="chevR" size={14} className="text-mute transition-transform group-hover:translate-x-0.5" />
                      </button>
                    );
                  })}
                  {activity && (
                    <button
                      onClick={() => app.nav({ name: "activity", id: activity.id })}
                      className="group flex w-full items-center gap-3 rounded-md px-2.5 py-2.5 text-left transition-colors hover:bg-paper"
                    >
                      <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-1.5", st?.activities[activity.id] ? "border-brand bg-brand text-[#f4faf7]" : "border-dashed border-mute/50 text-mute")}>
                        {st?.activities[activity.id] ? <Icon name="check" size={12} /> : <Icon name="wrench" size={11} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold leading-tight">Practical: {activity.title}</span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Activity · {activity.kind} · {activity.minutes} min</span>
                      </span>
                      <Icon name="chevR" size={14} className="text-mute transition-transform group-hover:translate-x-0.5" />
                    </button>
                  )}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      {/* Virtual Labs Link */}
      <Reveal delay={60}>
        <button
          onClick={() => app.nav({ name: "labs", id: course.id })}
          className="card-ink card-ink-hover group flex w-full items-center gap-4 overflow-hidden bg-card p-5 text-left sm:p-6"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-1.5" style={{ borderColor: m.hex + "40", backgroundColor: m.hex + "12" }}>
            <Icon name="spark" size={20} className={m.text} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-base font-bold tracking-tight">Virtual Labs & Simulations</h3>
            <p className="text-[13px] text-mute">{course.id === "c-di" ? "Image guides, design prompts, and hands-on innovation labs for this course" : "Interactive diagrams, simulations, and hands-on experiments for this course"}</p>
          </div>
          <span className="flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-wider transition-transform group-hover:translate-x-0.5" style={{ color: m.hex }}>
            Open labs <Icon name="arrowR" size={13} />
          </span>
        </button>
      </Reveal>

      {/* Assessments + projects for this course */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal delay={80}>
          <section className="card-ink h-full bg-card p-5 sm:p-6">
            <h3 className="mb-3 font-display text-lg font-semibold tracking-tight">Assessments</h3>
            <div className="space-y-2.5">
              {assessments.map((a) => {
                const best = app.bestAttempt(a.id);
                return (
                  <div key={a.id} className="flex flex-wrap items-center gap-3 rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3">
                    <Chip className={a.kind === "Checkpoint" ? "bg-gold-soft text-[#8a5a06]" : "bg-ai-soft text-ai"}>{a.kind}</Chip>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{a.title}</div>
                      <div className="font-mono text-[10.5px] uppercase tracking-wider text-mute">{a.questions.length} questions · {a.minutes} min · pass {a.passPct}%</div>
                    </div>
                    {best ? <Chip className={best.pass ? "bg-se-soft text-se" : "bg-[#f6e3e0] text-danger"}>best {best.pct}%</Chip> : <Chip className="bg-[#e8eadd] text-mute">not attempted</Chip>}
                    <button className="btn btn-dark btn-sm" onClick={() => app.nav({ name: "assessment", id: a.id })}>
                      {best ? "Retake" : "Start"}
                    </button>
                  </div>
                );
              })}
            </div>
            {checkpoint && (
              <p className="mt-3 text-xs leading-relaxed text-mute">
                {cpBest?.pass
                  ? "Checkpoint passed — combined with all lessons, this course's completion record is on your profile."
                  : `Finish all lessons, then pass the checkpoint (${checkpoint.passPct}%+) to earn the course completion record.`}
              </p>
            )}
          </section>
        </Reveal>
        <Reveal delay={140}>
          <section className="card-ink h-full bg-card p-5 sm:p-6">
            <h3 className="mb-3 font-display text-lg font-semibold tracking-tight">Course projects</h3>
            {projects.length === 0 ? (
              <div className="text-sm text-mute">This course contributes to cross-course capstone projects.</div>
            ) : (
              <div className="space-y-2.5">
                {projects.map((p) => {
                  const ps = st?.projects[p.id];
                  return (
                    <button key={p.id} onClick={() => app.nav({ name: "project", id: p.id })} className="card-ink-hover group flex w-full flex-col gap-2 rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-sm font-semibold">{p.title}</span>
                        <DiffChip level={p.difficulty} />
                        <span className="ml-auto"><StatusPill status={ps?.status ?? "not_started"} /></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Bar value={p.milestones.length ? ((ps?.milestones.length ?? 0) / p.milestones.length) * 100 : 0} color={m.hex} className="h-1.5 flex-1" />
                        <span className="font-mono text-[10.5px] text-mute">{ps?.milestones.length ?? 0}/{p.milestones.length} milestones</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </Reveal>
      </div>
    </div>
  );
}

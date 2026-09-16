import { useState } from "react";
import { useApp } from "../lib/store";
import type { Rec } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Bar, Chip, CourseTag, Reveal, Ring, Seg, StatusPill, cn, timeAgo } from "../components/ui";
import { Icon } from "../components/icons";
import type { IconName } from "../components/icons";

const KIND_ICON: Record<Rec["kind"], IconName> = { lesson: "book", assessment: "clipboard", project: "cube", activity: "wrench" };
const PHILOSOPHY = ["Learn", "Practice", "Build", "Solve", "Innovate"];

// ─── Course Selection Screen ─────────────────────────────────────────────────

function CourseSelection() {
  const app = useApp();
  const { db, user } = app;
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

  const handleContinue = async () => {
    if (!selectedCourseId) return;
    
    setIsEnrolling(true);
    setError(null);
    
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      app.enrollInCourse(selectedCourseId);
    } catch (err) {
      setError("Unable to save your course selection. Please try again.");
      setIsEnrolling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <Reveal>
        <div className="text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-deep/80">Welcome · {today}</div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {greet}, {user.name.split(" ")[0]}.
          </h1>
          <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink">
            Choose Your Technology Path
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-mute">
            Select the course you want to learn. You can choose one primary learning pathway. Once settled, this course becomes your personalized learning journey.
          </p>
        </div>
      </Reveal>

      {/* Course selection cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {db.courses.map((c, i) => {
          const m = courseMeta(c.id);
          const topics = db.topics.filter((t) => t.courseId === c.id);
          const lessons = db.lessons.filter((l) => l.courseId === c.id);
          const isSelected = selectedCourseId === c.id;
          
          return (
            <Reveal key={c.id} delay={i * 80}>
              <button
                onClick={() => {
                  setSelectedCourseId(c.id);
                  setError(null);
                }}
                disabled={isEnrolling}
                className={cn(
                  "card-ink group relative flex h-full w-full flex-col overflow-hidden bg-card text-left transition-all",
                  isSelected 
                    ? "ring-2 ring-offset-2" 
                    : "card-ink-hover",
                  isEnrolling && "opacity-50 cursor-not-allowed"
                )}
                style={isSelected ? { outlineColor: m.hex, outline: `2px solid ${m.hex}`, outlineOffset: '2px' } : undefined}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div 
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-lg"
                    style={{ backgroundColor: m.hex }}
                  >
                    <Icon name="check" size={18} className="text-white" />
                  </div>
                )}

                {/* Course image */}
                {c.image_url && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <img 
                      src={c.image_url} 
                      alt={c.title} 
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-500",
                        isSelected ? "scale-105" : "group-hover:scale-105"
                      )} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-paper/80">{c.code}</span>
                    </div>
                  </div>
                )}
                {!c.image_url && <div className="h-2 w-full" style={{ backgroundColor: m.hex }} />}
                
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Chip className={m.chip}>{c.level}</Chip>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-mute">~{c.hours}h</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute">{c.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-mute">
                    <span>{topics.length} topics</span>
                    <span>{lessons.length} lessons</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t-1.5 border-dashed border-line pt-3.5">
                    <span className={cn("text-xs", isSelected ? "font-semibold text-se" : "text-mute")}>
                      {isSelected ? "✓ Selected" : "Click to select"}
                    </span>
                    <span 
                      className={cn(
                        "flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-wider transition-transform",
                        isSelected ? "translate-x-0" : "group-hover:translate-x-0.5"
                      )} 
                      style={{ color: m.hex }}
                    >
                      {isSelected ? "Selected ✓" : "Select"} <Icon name="arrowR" size={13} />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Continue button */}
      <Reveal delay={320}>
        <div className="flex flex-col items-center gap-3">
          {error && (
            <div className="anim-fade-in flex items-start gap-2 rounded-md border-1.5 border-danger/40 bg-[#f6e3e0] px-4 py-2.5 text-sm font-medium text-danger">
              <Icon name="flag" size={14} className="mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Unable to save your course selection.</div>
                <div className="mt-0.5 text-xs">{error}</div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleContinue}
            disabled={!selectedCourseId || isEnrolling}
            className={cn(
              "btn btn-primary min-w-[240px]",
              !selectedCourseId && "opacity-50 cursor-not-allowed"
            )}
          >
            {isEnrolling ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Settling on your course...
              </>
            ) : (
              <>
                Settle on This Course
                <Icon name="arrowR" size={14} />
              </>
            )}
          </button>
          
          {!selectedCourseId && !isEnrolling && (
            <p className="text-xs text-mute">Select a course to settle on your learning pathway</p>
          )}
          {selectedCourseId && !isEnrolling && (
            <p className="text-xs font-medium text-se">
              <Icon name="check" size={12} className="inline mr-1" />
              Your course is ready to be saved
            </p>
          )}
        </div>
      </Reveal>

      {/* Philosophy strip */}
      <Reveal delay={380}>
        <div className="card-ink flex flex-wrap items-center justify-center gap-2 bg-card px-4 py-4 sm:gap-3">
          {PHILOSOPHY.map((p, i) => (
            <span key={p} className="flex items-center gap-2">
              <span className="font-display text-[13px] font-bold tracking-tight text-ink">{p}</span>
              {i < PHILOSOPHY.length - 1 && <span className="text-mute/50">→</span>}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

// ─── Active Course Dashboard ─────────────────────────────────────────────────

function ActiveCourseDashboard() {
  const app = useApp();
  const { user, st, db } = app;
  if (!user || !st) return null;

  const activeCourse = app.activeCourse();
  if (!activeCourse) return null;

  const m = courseMeta(activeCourse.id);
  const pct = app.coursePct(activeCourse.id);
  const topics = db.topics.filter((t) => t.courseId === activeCourse.id).sort((a, b) => a.order - b.order);
  const lessons = app.courseLessons(activeCourse.id);
  const doneCount = lessons.filter((l) => st.lessons[l.id]).length;
  const doneTopics = topics.filter((t) => app.topicDone(t.id)).length;
  const currentTopic = topics.find((t) => !app.topicDone(t.id));
  const currentLesson = currentTopic ? app.topicLessons(currentTopic.id).find((l) => !st.lessons[l.id]) : null;
  const assessments = db.assessments.filter((a) => a.courseId === activeCourse.id);
  const projects = db.projects.filter((p) => p.courseIds.includes(activeCourse.id));

  const rec = app.nextUp();
  const queue = app.upNextQueue();
  const level = app.levelInfo();

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

      {/* Active Course Hero */}
      <Reveal delay={70}>
        <div className="card-ink overflow-hidden bg-card">
          <div className="h-1.5 w-full" style={{ backgroundColor: m.hex }} />
          <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-brand-deep/80">My Course</span>
                <CourseTag course={activeCourse} />
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{activeCourse.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute">{activeCourse.tagline}</p>

              {/* Progress */}
              <div className="mt-5 flex items-center gap-4">
                <Seg value={pct} cells={20} color={m.hex} className="h-3 flex-1" />
                <span className="font-mono text-lg font-bold" style={{ color: m.hex }}>{pct}%</span>
              </div>

              {/* Current learning */}
              {currentLesson ? (
                <div className="mt-5">
                  <div className="lbl">Current Learning</div>
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{currentTopic?.title}</div>
                      <div className="mt-0.5 text-[13px] text-mute">{currentLesson.title} · {currentLesson.minutes} min</div>
                    </div>
                    <button onClick={() => app.nav({ name: "lesson", id: currentLesson.id })} className="btn btn-primary btn-sm">
                      <Icon name="play" size={13} /> {doneCount > 0 ? "Continue" : "Start Learning"}
                    </button>
                  </div>
                </div>
              ) : doneCount > 0 ? (
                <div className="mt-5 rounded-md border-1.5 border-se/40 bg-se-soft px-4 py-3">
                  <div className="flex items-center gap-2 text-se">
                    <Icon name="check" size={16} />
                    <span className="text-sm font-semibold">All lessons complete</span>
                  </div>
                  <p className="mt-1 text-xs text-se/80">Pass the checkpoint assessment to earn your course completion record.</p>
                </div>
              ) : null}

              {/* Learning path */}
              <div className="mt-5">
                <div className="lbl">Learning Path</div>
                <div className="space-y-1.5">
                  {topics.map((t) => {
                    const tDone = app.topicDone(t.id);
                    const isCurrent = t.id === currentTopic?.id;
                    const tLessons = app.topicLessons(t.id);
                    const tDoneCount = tLessons.filter((l) => st.lessons[l.id]).length;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          const nextL = tLessons.find((l) => !st.lessons[l.id]);
                          if (nextL) app.nav({ name: "lesson", id: nextL.id });
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
                          tDone ? "bg-se-soft/50" : isCurrent ? "bg-gold-soft/50" : "hover:bg-paper",
                        )}
                      >
                        <span className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-1.5",
                          tDone ? "border-se/40 bg-se text-[#f4faf7]" : isCurrent ? "border-gold/50 bg-gold-soft text-[#8a5a06]" : "border-line bg-card text-mute",
                        )}>
                          {tDone ? <Icon name="check" size={12} /> : isCurrent ? <span className="dot-live h-1.5 w-1.5 rounded-full bg-gold" /> : <Icon name="circle" size={13} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn("block text-sm font-semibold leading-tight", !tDone && !isCurrent && "text-mute")}>{t.title}</span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{tDoneCount}/{tLessons.length} lessons</span>
                        </span>
                        {isCurrent && <Chip className="bg-gold-soft text-[#8a5a06]">current</Chip>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right side: course image + stats */}
            <div className="flex flex-col items-center gap-4">
              {activeCourse.image_url ? (
                <div className="w-full overflow-hidden rounded-lg border-1.5 border-line">
                  <img src={activeCourse.image_url} alt={activeCourse.title} className="h-40 w-full object-cover" />
                </div>
              ) : (
                <div className="h-40 w-full rounded-lg border-1.5 border-line" style={{ backgroundColor: m.hex + "15" }} />
              )}
              <div className="flex w-full items-center justify-around gap-4 rounded-lg border-1.5 border-line bg-paper/60 p-4">
                <Ring value={pct} size={90} stroke={8} color={m.hex}>
                  <div className="text-center">
                    <div className="font-display text-xl font-bold leading-none">{pct}%</div>
                    <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-mute">progress</div>
                  </div>
                </Ring>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-center">
                  <div>
                    <div className="font-display text-base font-bold leading-none">{doneTopics}/{topics.length}</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-mute">topics</div>
                  </div>
                  <div>
                    <div className="font-display text-base font-bold leading-none">{doneCount}/{lessons.length}</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-mute">lessons</div>
                  </div>
                </div>
              </div>
              <button onClick={() => app.nav({ name: "course", id: activeCourse.id })} className="btn btn-dark btn-sm w-full">
                <Icon name="book" size={13} /> Full course view
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Continue learning console */}
      {rec && (
        <Reveal delay={120}>
          <div className="bg-sidebar-trace card-ink overflow-hidden bg-ink text-paper">
            <div className="grid gap-6 p-6 sm:p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                  <span className="dot-live inline-block h-2 w-2 rounded-full bg-[#3ecf7a]" />
                  Continue learning
                </div>
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
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2/3 */}
        <div className="space-y-6 lg:col-span-2">
      {/* Virtual Labs */}
      <Reveal delay={160}>
        <section className="card-ink overflow-hidden bg-card">
          <button
            onClick={() => app.nav({ name: "labs", id: activeCourse.id })}
            className="group flex w-full items-center gap-4 p-5 text-left sm:p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-1.5 text-[#f4faf7]" style={{ borderColor: m.hex + "60", backgroundColor: m.hex + "15", color: m.hex }}>
              <Icon name="spark" size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base font-bold tracking-tight">Virtual Labs</h3>
              <p className="text-[12px] text-mute">Interactive simulations, diagrams & experiments for {activeCourse.short}</p>
            </div>
            <span className="flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-transform group-hover:translate-x-0.5" style={{ color: m.hex }}>
              Explore <Icon name="arrowR" size={12} />
            </span>
          </button>
        </section>
      </Reveal>

      {/* Live Learning */}
      <Reveal delay={165}>
        <section className="card-ink overflow-hidden bg-card">
          {(() => {
            const studentClasses = app.getStudentLiveClasses();
            const liveNow = studentClasses.filter((c) => c.status === "live");
            const upcoming = studentClasses.filter((c) => c.status === "scheduled").slice(0, 2);

            if (liveNow.length === 0 && upcoming.length === 0) {
              return (
                <button
                  onClick={() => app.nav({ name: "liveclasses" })}
                  className="group flex w-full items-center gap-4 p-5 text-left sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-1.5 text-[#f4faf7]" style={{ borderColor: m.hex + "60", backgroundColor: m.hex + "15", color: m.hex }}>
                    <Icon name="video" size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-bold tracking-tight">Live Classes</h3>
                    <p className="text-[12px] text-mute">No live classes scheduled yet</p>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-transform group-hover:translate-x-0.5" style={{ color: m.hex }}>
                    View all <Icon name="arrowR" size={12} />
                  </span>
                </button>
              );
            }

            return (
              <div>
                <div className="flex items-center justify-between border-b-1.5 border-line px-5 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    <Icon name="video" size={16} style={{ color: m.hex }} />
                    <h3 className="font-display text-base font-bold tracking-tight">Live Learning</h3>
                  </div>
                  <button onClick={() => app.nav({ name: "liveclasses" })} className="font-mono text-[10px] font-medium uppercase tracking-wider hover:underline" style={{ color: m.hex }}>
                    View all
                  </button>
                </div>
                <div className="space-y-2 p-4 sm:p-5">
                  {liveNow.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => app.nav({ name: "liveclass", id: c.id })}
                      className="flex w-full items-center gap-3 rounded-lg border-1.5 border-danger/30 bg-danger/5 px-3 py-2.5 text-left transition-colors hover:bg-danger/10"
                    >
                      <span className="flex items-center gap-1 rounded-full bg-danger px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                        <span className="dot-live h-1.5 w-1.5 rounded-full bg-white" />
                        Live
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold">{c.title}</span>
                      <span className="btn btn-danger btn-sm shrink-0">Join</span>
                    </button>
                  ))}
                  {upcoming.map((c) => {
                    const date = new Date(c.scheduledAt);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const label = isToday ? "Today" : date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
                    return (
                      <button
                        key={c.id}
                        onClick={() => app.nav({ name: "liveclass", id: c.id })}
                        className="flex w-full items-center gap-3 rounded-lg border-1.5 border-line bg-paper/50 px-3 py-2.5 text-left transition-colors hover:bg-paper"
                      >
                        <Icon name="calendar" size={14} className="shrink-0 text-mute" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{c.title}</span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{label} · {date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</span>
                        </span>
                        <Icon name="arrowR" size={13} className="shrink-0 text-mute" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}
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
              {projects.length === 0 ? (
                <div className="text-sm text-mute">No projects for this course yet.</div>
              ) : (
                <div className="space-y-2.5">
                  {projects.map((p) => {
                    const ps = st.projects[p.id];
                    return (
                      <button
                        key={p.id}
                        onClick={() => app.nav({ name: "project", id: p.id })}
                        className="card-ink-hover group w-full rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3 text-left"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-sm font-semibold">{p.title}</span>
                          <DiffChip level={p.difficulty} />
                          <span className="ml-auto"><StatusPill status={ps?.status ?? "not_started"} /></span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-3">
                          <div className="flex gap-1">
                            {p.milestones.map((ms) => (
                              <span key={ms.id} className={cn("h-2 w-6 rounded-sm", ps?.milestones.includes(ms.id) ? "bg-brand" : "bg-[#e0e3d6]")} />
                            ))}
                          </div>
                          <span className="font-mono text-[11px] text-mute">{ps?.milestones.length ?? 0}/{p.milestones.length} milestones</span>
                          <Icon name="chevR" size={14} className="ml-auto text-mute transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          </Reveal>

          {/* Assessments */}
          <Reveal delay={180}>
            <section className="card-ink bg-card p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold tracking-tight">Assessments</h3>
                <button className="btn btn-ghost btn-sm text-brand-deep" onClick={() => app.nav({ name: "assessments" })}>
                  All <Icon name="arrowR" size={13} />
                </button>
              </div>
              <div className="space-y-2.5">
                {assessments.map((a) => {
                  const best = app.bestAttempt(a.id);
                  return (
                    <div key={a.id} className="flex flex-wrap items-center gap-3 rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3">
                      <Chip className={a.kind === "Checkpoint" ? "bg-gold-soft text-[#8a5a06]" : "bg-ai-soft text-ai"}>{a.kind}</Chip>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{a.title}</div>
                        <div className="font-mono text-[10.5px] uppercase tracking-wider text-mute">{a.questions.length} questions · {a.minutes} min</div>
                      </div>
                      {best ? <Chip className={best.pass ? "bg-se-soft text-se" : "bg-[#f6e3e0] text-danger"}>best {best.pct}%</Chip> : <Chip className="bg-[#e8eadd] text-mute">not attempted</Chip>}
                      <button className="btn btn-dark btn-sm" onClick={() => app.nav({ name: "assessment", id: a.id })}>
                        {best ? "Retake" : "Start"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </Reveal>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <Reveal delay={150}>
            <section className="card-ink bg-card p-5">
              <h3 className="mb-3 font-display text-base font-semibold tracking-tight">Up next</h3>
              <div className="space-y-2">
                {queue.slice(0, 5).map((r) => (
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
                {queue.length === 0 && <div className="text-sm text-mute">All caught up. Keep going!</div>}
              </div>
            </section>
          </Reveal>

          <Reveal delay={200}>
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

          {/* Enrollment info */}
          <Reveal delay={240}>
            <section className="card-ink bg-card p-5">
              <h3 className="mb-3 font-display text-base font-semibold tracking-tight">Enrollment</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", m.dot)} />
                  <span className="text-sm font-semibold">{activeCourse.title}</span>
                  <Chip className="bg-se-soft text-se ml-auto">active</Chip>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-mute">
                  {activeCourse.code} · {activeCourse.level} · ~{activeCourse.hours}h
                </div>
                {st.enrollments.length > 1 && (
                  <div className="mt-2 border-t-1.5 border-dashed border-line pt-2">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-mute mb-1">History</div>
                    {st.enrollments.filter((e) => e.status !== "active").map((e) => {
                      const c = db.courses.find((x) => x.id === e.courseId);
                      return c ? (
                        <div key={e.courseId} className="flex items-center gap-2 text-xs text-mute">
                          <span className={cn("h-2 w-2 rounded-full", courseMeta(c.id).dot)} />
                          <span>{c.title}</span>
                          <span className="ml-auto font-mono text-[9px] uppercase">{e.status}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      {/* Philosophy strip */}
      <Reveal delay={260}>
        <div className="card-ink flex flex-wrap items-center justify-center gap-2 bg-card px-4 py-4 sm:gap-3">
          {PHILOSOPHY.map((p, i) => (
            <span key={p} className="flex items-center gap-2">
              <span className="font-display text-[13px] font-bold tracking-tight text-ink">{p}</span>
              {i < PHILOSOPHY.length - 1 && <span className="text-mute/50">→</span>}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

// ─── DiffChip (reused from Projects) ─────────────────────────────────────────

function DiffChip({ level }: { level: string }) {
  const cls = level === "Capstone" ? "bg-gold-soft text-[#8a5a06]"
    : level === "Independent" ? "bg-ai-soft text-ai"
    : "bg-se-soft text-se";
  return <Chip className={cls}>{level}</Chip>;
}

// ─── Instructor Dashboard ────────────────────────────────────────────────────

function InstructorDashboard() {
  const app = useApp();
  const { db, user } = app;

  if (!user) return null;

  const liveNow = db.liveClasses.filter((c) => c.status === "live");
  const upcoming = db.liveClasses.filter((c) => c.status === "scheduled").slice(0, 3);

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6">
      {/* Header */}
      <Reveal>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-deep/80">Instructor Console</div>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {greet}, {user.name.split(" ")[0]}.
          </h1>
        </div>
      </Reveal>

      {/* Quick Actions */}
      <Reveal delay={70}>
        <div className="card-ink overflow-hidden bg-card">
          <div className="h-1.5 w-full bg-danger" />
          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border-1.5 border-danger/40 bg-danger/10 text-danger">
                <Icon name="video" size={24} />
              </span>
              <div className="flex-1">
                <h2 className="font-display text-xl font-bold tracking-tight">Live Virtual Classroom</h2>
                <p className="mt-1 text-sm text-mute">Start a live class to teach students in real-time with video, screen sharing, and interactive tools.</p>
              </div>
              <button onClick={() => app.nav({ name: "admin", tab: "liveclasses" })} className="btn btn-danger">
                <Icon name="play" size={15} /> Create Live Class
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Live Now */}
      {liveNow.length > 0 && (
        <Reveal delay={120}>
          <section className="card-ink overflow-hidden bg-card">
            <div className="flex items-center gap-2 border-b-1.5 border-line bg-danger/5 px-5 py-3">
              <span className="dot-live h-2 w-2 rounded-full bg-danger" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-danger">Live Now</span>
            </div>
            <div className="space-y-2 p-4">
              {liveNow.map((c) => {
                const course = app.getCourse(c.courseId);
                return (
                  <button
                    key={c.id}
                    onClick={() => app.nav({ name: "liveclass", id: c.id })}
                    className="flex w-full items-center gap-3 rounded-lg border-1.5 border-danger/30 bg-danger/5 px-4 py-3 text-left transition-colors hover:bg-danger/10"
                  >
                    <span className="flex items-center gap-1 rounded-full bg-danger px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                      <span className="dot-live h-1.5 w-1.5 rounded-full bg-white" />
                      Live
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{c.title}</span>
                      {course && <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{course.short}</span>}
                    </span>
                    <span className="btn btn-danger btn-sm shrink-0">Join</span>
                  </button>
                );
              })}
            </div>
          </section>
        </Reveal>
      )}

      {/* Upcoming Classes */}
      {upcoming.length > 0 && (
        <Reveal delay={160}>
          <section className="card-ink bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold tracking-tight">Upcoming Classes</h3>
              <button className="btn btn-ghost btn-sm text-brand-deep" onClick={() => app.nav({ name: "liveclasses" })}>
                View all <Icon name="arrowR" size={13} />
              </button>
            </div>
            <div className="space-y-2">
              {upcoming.map((c) => {
                const course = app.getCourse(c.courseId);
                const date = new Date(c.scheduledAt);
                const isToday = date.toDateString() === new Date().toDateString();
                const label = isToday ? "Today" : date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
                return (
                  <button
                    key={c.id}
                    onClick={() => app.nav({ name: "liveclass", id: c.id })}
                    className="flex w-full items-center gap-3 rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3 text-left transition-colors hover:bg-paper"
                  >
                    <Icon name="calendar" size={16} className="shrink-0 text-mute" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{c.title}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
                        {label} · {date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                        {course && ` · ${course.short}`}
                      </span>
                    </span>
                    <Icon name="arrowR" size={13} className="shrink-0 text-mute" />
                  </button>
                );
              })}
            </div>
          </section>
        </Reveal>
      )}

      {/* Quick Links */}
      <Reveal delay={200}>
        <div className="grid gap-4 sm:grid-cols-3">
          <button
            onClick={() => app.nav({ name: "liveclasses" })}
            className="card-ink card-ink-hover group bg-card p-5 text-left"
          >
            <Icon name="video" size={24} className="mb-2 text-brand" />
            <h3 className="font-display text-sm font-bold">All Live Classes</h3>
            <p className="mt-1 text-xs text-mute">View and manage all classes</p>
          </button>
          <button
            onClick={() => app.nav({ name: "courses" })}
            className="card-ink card-ink-hover group bg-card p-5 text-left"
          >
            <Icon name="book" size={24} className="mb-2 text-brand" />
            <h3 className="font-display text-sm font-bold">Courses</h3>
            <p className="mt-1 text-xs text-mute">Manage course content</p>
          </button>
          <button
            onClick={() => app.nav({ name: "admin" })}
            className="card-ink card-ink-hover group bg-card p-5 text-left"
          >
            <Icon name="shield" size={24} className="mb-2 text-brand" />
            <h3 className="font-display text-sm font-bold">Admin Console</h3>
            <p className="mt-1 text-xs text-mute">System administration</p>
          </button>
        </div>
      </Reveal>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

export default function Dashboard() {
  const app = useApp();
  const { st, user } = app;

  // Loading state while data loads
  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
          <p className="font-mono text-xs uppercase tracking-wider text-mute">Loading...</p>
        </div>
      </div>
    );
  }

  // Instructor/Admin dashboard
  if (user.role === "instructor" || user.role === "admin") {
    return <InstructorDashboard />;
  }

  // Student loading state
  if (!st) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand/30 border-t-brand" />
          <p className="font-mono text-xs uppercase tracking-wider text-mute">Loading your learning path...</p>
        </div>
      </div>
    );
  }

  // If student has an active course, show the personalized dashboard
  if (app.hasActiveCourse()) {
    return <ActiveCourseDashboard />;
  }

  // Otherwise, show course selection
  return <CourseSelection />;
}

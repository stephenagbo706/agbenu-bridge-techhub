import { useState } from "react";
import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Chip, CourseTag, Reveal, Seg, cn, fmtDate } from "../components/ui";
import { Icon } from "../components/icons";
import { DiagramNode, DiagramArrow } from "../components/simulations";
import { VideoPlayer } from "../components/VideoPlayer";

// ─── Inline lesson diagrams ─────────────────────────────────────────────────

const DI_IMAGE_GUIDES = [
  {
    title: "Discover Problem",
    sub: "Find real pain",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnva-NNPNPRBCceYon4scDHE4PyhWDdD7GTzWYUXEmTw&s=10",
  },
  {
    title: "Design Solution",
    sub: "Hypothesize fix",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK6JKYhf5feE9GsaOP8sA-er6PT16PwRexScm5FnsJXQ&s=10",
  },
  {
    title: "Build Prototype",
    sub: "Make it tangible",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGk6-J-ynuB1SlECVI2Y6lRk8f_FBnOx9otl0OVnGtg&s=10",
  },
  {
    title: "Test & Learn",
    sub: "Validate with users",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnva-NNPNPRBCceYon4scDHE4PyhWDdD7GTzWYUXEmTw&s=10",
  },
];

function LessonDiagram({ courseId, topicOrder, accent }: { courseId: string; topicOrder: number; accent: string }) {
  const [active, setActive] = useState<string | null>(null);

  const diagrams: Record<string, { title: string; nodes: { label: string; sub?: string; icon?: string }[] }> = {
    "c-ai": {
      title: "How AI Processes Information",
      nodes: [
        { label: "Input Data", sub: "Raw information", icon: "📥" },
        { label: "Feature Extraction", sub: "Pattern recognition", icon: "🔍" },
        { label: "Model Processing", sub: "Neural computation", icon: "🧠" },
        { label: "Output / Prediction", sub: "Result or decision", icon: "📤" },
      ],
    },
    "c-rob": {
      title: "Sense → Think → Act Loop",
      nodes: [
        { label: "Sensors", sub: "Measure environment", icon: "📡" },
        { label: "Controller", sub: "Process & decide", icon: "🔧" },
        { label: "Actuators", sub: "Physical action", icon: "⚙️" },
        { label: "Result", sub: "Changed state", icon: "✅" },
      ],
    },
    "c-se": {
      title: "Application Data Flow",
      nodes: [
        { label: "User Interface", sub: "What users see", icon: "🖥️" },
        { label: "API Layer", sub: "Request/response", icon: "📡" },
        { label: "Business Logic", sub: "Rules & processing", icon: "⚙️" },
        { label: "Database", sub: "Persistent storage", icon: "🗄️" },
      ],
    },
    "c-di": {
      title: "Product Development Cycle",
      nodes: [
        { label: "Discover Problem", sub: "Find real pain", icon: "🔍" },
        { label: "Design Solution", sub: "Hypothesize fix", icon: "💡" },
        { label: "Build Prototype", sub: "Make it tangible", icon: "🔧" },
        { label: "Test & Learn", sub: "Validate with users", icon: "🧪" },
      ],
    },
  };

  const diagram = diagrams[courseId] ?? diagrams["c-ai"];

  if (courseId === "c-di") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon name="spark" size={14} className="text-mute" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-mute">Digital innovation image board</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {DI_IMAGE_GUIDES.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-lg border-1.5 border-line bg-paper/50">
              <div className="relative aspect-[4/3] bg-paper">
                <img src={item.img} alt={`${item.title} visual guide`} className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-3 pb-3 pt-8">
                  <h3 className="font-display text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-[11px] font-semibold text-white/80">{item.sub}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="rounded-md border-l-4 bg-paper/50 px-4 py-2.5" style={{ borderColor: accent }}>
          <p className="text-[12px] leading-relaxed">
            Use the images as visual prompts for the Digital Innovation process. Open the full Virtual Lab when you are ready to build, test, and improve the idea hands-on.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon name="spark" size={14} className="text-mute" />
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-mute">{diagram.title}</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {diagram.nodes.map((node, i, arr) => (
          <div key={node.label} className="flex items-center gap-1">
            <DiagramNode
              label={node.label}
              sublabel={node.sub}
              icon={node.icon}
              active={active === node.label}
              onClick={() => setActive(active === node.label ? null : node.label)}
              accent={accent}
            />
            {i < arr.length - 1 && <DiagramArrow direction="right" accent={accent} />}
          </div>
        ))}
      </div>
      {active && (
        <div className="anim-fade-up rounded-md border-l-4 bg-paper/50 px-4 py-2.5" style={{ borderColor: accent }}>
          <p className="text-[12px] leading-relaxed">
            <strong>{active}:</strong> Click each component to explore the system. Open the full Virtual Lab for interactive simulations where you can experiment with these concepts hands-on.
          </p>
        </div>
      )}
    </div>
  );
}

export default function LessonView({ id }: { id: string }) {
  const app = useApp();
  const { db, st } = app;
  const lesson = app.getLesson(id);
  const [pick, setPick] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  if (!lesson || !st) return null;

  const course = app.getCourse(lesson.courseId)!;
  const topic = app.getTopic(lesson.topicId)!;
  const m = courseMeta(course.id);
  const courseLessons = app.courseLessons(course.id);
  const idx = courseLessons.findIndex((l) => l.id === lesson.id);
  const next = courseLessons[idx + 1];
  const doneAt = st.lessons[lesson.id];
  const answered = pick !== null;
  const correct = pick === lesson.check.answer;
  const checkSettled = correct || tries >= 2;
  const topicLessons = app.topicLessons(topic.id);
  const activity = db.activities.find((a) => a.topicId === lesson.topicId);
  const isDigitalInnovation = course.id === "c-di";

  const answer = (i: number) => {
    if (checkSettled) return;
    setPick(i);
    if (i !== lesson.check.answer) setTries((t) => t + 1);
  };

  const complete = () => {
    app.completeLesson(lesson.id);
    if (next) app.nav({ name: "lesson", id: next.id });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => app.nav({ name: "course", id: course.id })} className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mute transition-colors hover:text-ink">
          <Icon name="arrowL" size={13} /> {course.short}
        </button>
        <div className="flex items-center gap-2">
          <CourseTag course={course} />
          <Chip className="bg-[#e8eadd] text-mute">Topic {String(topic.order).padStart(2, "0")} · Lesson {lesson.order}/{topicLessons.length}</Chip>
        </div>
      </div>

      <Reveal>
        <header className="card-ink overflow-hidden bg-card">
          <div className="h-1.5" style={{ backgroundColor: m.hex }} />
          <div className="p-6 sm:p-7">
            <h1 className="max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{lesson.title}</h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-mute">{lesson.summary}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-mute">
              <span className="flex items-center gap-1.5"><Icon name="clock" size={13} /> {lesson.minutes} min</span>
              <span className="flex items-center gap-1.5"><Icon name="book" size={13} /> {lesson.sections.length} sections</span>
              <span className="flex items-center gap-1.5"><Icon name="clipboard" size={13} /> 1 knowledge check</span>
              {doneAt && <span className="flex items-center gap-1.5 text-se"><Icon name="check" size={13} /> completed {fmtDate(doneAt)}</span>}
            </div>
          </div>
        </header>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main content */}
        <div className="min-w-0 space-y-5">
          <Reveal delay={60}>
            <section className="card-ink bg-card p-5 sm:p-6">
              <div className="lbl">What am I learning?</div>
              <ul className="grid gap-1.5 sm:grid-cols-3">
                {lesson.objectives.map((o) => (
                  <li key={o} className="flex items-start gap-2 rounded-md border-1.5 border-line bg-paper/50 px-3 py-2 text-[13px] font-medium leading-snug">
                    <Icon name="target" size={14} className={cn("mt-0.5 shrink-0", m.text)} /> {o}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-md border-l-4 border-gold bg-gold-soft/50 px-4 py-3">
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#8a5a06]">Why does it matter?</div>
                <p className="mt-1 text-sm leading-relaxed">{lesson.why}</p>
              </div>
            </section>
          </Reveal>

          {lesson.sections.map((s, i) => (
            <Reveal key={s.h} delay={90 + i * 60}>
              <section className="card-ink bg-card p-5 sm:p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-bold" style={{ color: m.hex }}>{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-lg font-bold tracking-tight">{s.h}</h2>
                </div>
                <p className="mt-2.5 text-[15px] leading-[1.7]">{s.p}</p>
              </section>
            </Reveal>
          ))}

          {/* Video Section */}
          {(() => {
            const videos = app.getLessonVideos(lesson.id);
            if (videos.length === 0) return null;
            return (
              <Reveal delay={180}>
                <section className="card-ink overflow-hidden bg-card">
                  <div className="flex items-center gap-2 border-b-1.5 border-line bg-paper/60 px-5 py-3">
                    <Icon name="play" size={15} className={m.text} />
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                      {videos.length === 1 ? "Video lesson" : `${videos.length} video lessons`}
                    </span>
                    {videos[0].isRequired && (
                      <Chip className="ml-auto bg-gold-soft text-[#8a5a06]">Required</Chip>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 space-y-4">
                    {videos.map((video) => {
                      const videoProgress = st.videoProgress[video.id];
                      return (
                        <div key={video.id} className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h3 className="font-display text-base font-bold tracking-tight">{video.title}</h3>
                              <p className="mt-1 text-[13px] leading-relaxed text-mute">{video.description}</p>
                              <div className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-mute">
                                <span>{Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}</span>
                                {videoProgress?.completed && (
                                  <span className="flex items-center gap-1 text-se">
                                    <Icon name="check" size={10} /> Completed
                                  </span>
                                )}
                                {videoProgress && !videoProgress.completed && videoProgress.percentage > 0 && (
                                  <span>{videoProgress.percentage}% watched</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <VideoPlayer video={video} />
                        </div>
                      );
                    })}
                  </div>
                </section>
              </Reveal>
            );
          })()}

          {/* Visual Guide / Interactive Diagram Section */}
          <Reveal delay={190}>
            <section className="card-ink overflow-hidden bg-card">
              <button
                onClick={() => app.nav({ name: "labs", id: course.id })}
                className="group flex w-full items-center gap-4 border-b-1.5 border-line bg-paper/60 px-5 py-3 text-left transition-colors hover:bg-paper"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md border-1.5" style={{ borderColor: m.hex + "40", backgroundColor: m.hex + "12" }}>
                  <Icon name="spark" size={14} className={m.text} />
                </span>
                <div className="flex-1">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">{isDigitalInnovation ? "Image guides & virtual lab" : "Interactive diagrams & simulations"}</span>
                  <p className="text-[12px] text-mute">{isDigitalInnovation ? "Study visual prompts for each innovation step, then build in the virtual lab" : "Visualize concepts, run simulations, and experiment in the virtual lab"}</p>
                </div>
                <span className="flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-transform group-hover:translate-x-0.5" style={{ color: m.hex }}>
                  Open lab <Icon name="arrowR" size={11} />
                </span>
              </button>
              <div className="p-5 sm:p-6">
                <LessonDiagram courseId={course.id} topicOrder={topic.order} accent={m.hex} />
              </div>
            </section>
          </Reveal>

          <Reveal delay={200}>
            <section className="card-ink overflow-hidden bg-card">
              <div className="flex items-center gap-2 border-b-1.5 border-line bg-paper/60 px-5 py-3">
                <Icon name="bulb" size={15} className={m.text} />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">Worked example · {lesson.example.title}</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-sm leading-relaxed">{lesson.example.body}</p>
                {lesson.example.code && (
                  <pre className="mt-4 overflow-x-auto rounded-lg border-1.5 border-ink bg-ink p-4 font-mono text-[12px] leading-relaxed text-[#cfe8dd]">
                    {lesson.example.code}
                  </pre>
                )}
              </div>
            </section>
          </Reveal>

          <Reveal delay={230}>
            <section className="card-ink bg-card p-5 sm:p-6">
              <div className="lbl">Key terms</div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {lesson.terms.map(([t, d]) => (
                  <div key={t} className="rounded-md border-1.5 border-line bg-paper/50 p-3">
                    <div className="font-display text-[13px] font-bold">{t}</div>
                    <div className="mt-1 text-xs leading-relaxed text-mute">{d}</div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {(lesson.activityHint || activity) && (
            <Reveal delay={260}>
              <section className="card-ink bg-card p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <Icon name="wrench" size={15} className={m.text} />
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">Can I build something with it?</span>
                </div>
                {lesson.activityHint && <p className="mt-2 text-sm leading-relaxed">{lesson.activityHint}</p>}
                {activity && (
                  <button onClick={() => app.nav({ name: "activity", id: activity.id })} className="btn btn-dark btn-sm mt-3.5">
                    <Icon name="wrench" size={13} /> Open practical: {activity.title}
                  </button>
                )}
              </section>
            </Reveal>
          )}
        </div>

        {/* Rail */}
        <div className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <Reveal delay={100}>
            <section className="card-ink bg-card p-5">
              <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-mute">
                <span>Course position</span>
                <span>{idx + 1}/{courseLessons.length}</span>
              </div>
              <Seg value={app.coursePct(course.id)} cells={16} color={m.hex} className="h-2.5" />
              <div className="mt-2 text-right font-mono text-xs font-bold" style={{ color: m.hex }}>{app.coursePct(course.id)}%</div>
            </section>
          </Reveal>

          <Reveal delay={140}>
            <section className={cn("card-ink bg-card p-5", checkSettled && correct && "ring-2 ring-se/40")}>
              <div className="flex items-center gap-2">
                <Icon name="clipboard" size={15} className={m.text} />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">Knowledge check</span>
              </div>
              <p className="mt-2.5 text-sm font-semibold leading-snug">{lesson.check.prompt}</p>
              <div className="mt-3 space-y-2">
                {lesson.check.options.map((o, i) => {
                  const isPick = pick === i;
                  const isAnswer = i === lesson.check.answer;
                  const showState = answered && (checkSettled || isPick);
                  return (
                    <button
                      key={o}
                      onClick={() => answer(i)}
                      disabled={checkSettled}
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-md border-1.5 px-3 py-2.5 text-left text-[13px] font-medium leading-snug transition-all",
                        !showState && "border-line bg-paper/40 hover:border-ink hover:bg-paper",
                        showState && isAnswer && "border-se bg-se-soft",
                        showState && isPick && !isAnswer && "border-danger bg-[#f6e3e0]",
                        showState && !isPick && !isAnswer && "border-line bg-paper/30 opacity-55",
                        checkSettled && "cursor-default",
                      )}
                    >
                      <span className={cn(
                        "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-1.5 font-mono text-[10px]",
                        showState && isAnswer ? "border-se bg-se text-[#f4faf7]" : showState && isPick ? "border-danger bg-danger text-[#fdf6f4]" : "border-mute/50 text-mute",
                      )}>
                        {showState && isAnswer ? <Icon name="check" size={10} /> : showState && isPick ? <Icon name="x" size={9} /> : String.fromCharCode(65 + i)}
                      </span>
                      {o}
                    </button>
                  );
                })}
              </div>
              {answered && (
                <div className={cn("anim-fade-up mt-3 rounded-md border-1.5 px-3 py-2.5 text-xs leading-relaxed", correct ? "border-se/40 bg-se-soft text-se" : "border-gold/50 bg-gold-soft text-[#7a5205]")}>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider">{correct ? "Correct — " : tries >= 2 ? "Answer revealed — " : "Not quite — try again. "}</span>
                  {(correct || tries >= 2) && lesson.check.explain}
                </div>
              )}
            </section>
          </Reveal>

          <Reveal delay={180}>
            <section className="card-ink bg-card p-5">
              {doneAt ? (
                <>
                  <div className="flex items-center gap-2 text-se">
                    <Icon name="check" size={16} />
                    <span className="font-display text-sm font-bold">Lesson complete</span>
                    <span className="stamp ml-auto text-se">DONE</span>
                  </div>
                  {next ? (
                    <button onClick={() => app.nav({ name: "lesson", id: next.id })} className="btn btn-primary mt-4 w-full">
                      Next: {next.title.length > 26 ? next.title.slice(0, 26) + "…" : next.title} <Icon name="arrowR" size={14} />
                    </button>
                  ) : (
                    <button onClick={() => app.nav({ name: "course", id: course.id })} className="btn btn-primary mt-4 w-full">
                      Back to course <Icon name="arrowR" size={14} />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={complete}
                    disabled={!checkSettled}
                    className="btn btn-primary w-full"
                    title={checkSettled ? "" : "Answer the knowledge check first"}
                  >
                    <Icon name="check" size={15} /> Mark lesson complete
                  </button>
                  <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wider text-mute">
                    {checkSettled ? "+10 XP · unlocks next lesson" : "settle the check to continue"}
                  </p>
                </>
              )}
            </section>
          </Reveal>

          <Reveal delay={210}>
            <section className="card-ink bg-card p-5">
              <div className="lbl">Summary — take these with you</div>
              <ul className="space-y-1.5">
                {lesson.sections.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] leading-snug">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: m.hex }} />
                    <span><span className="font-semibold">{s.h}.</span> <span className="text-mute">{s.p.slice(0, 90)}…</span></span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

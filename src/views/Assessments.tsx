import { useState } from "react";
import { gradeQuestion, useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Bar, Chip, CourseTag, Modal, Reveal, Ring, SectionHead, Seg, cn, fmtDate } from "../components/ui";
import { Icon } from "../components/icons";
import type { Attempt, Question } from "../lib/types";

export function AssessmentsView() {
  const app = useApp();
  const { db, st } = app;
  return (
    <div>
      <SectionHead
        kicker="Assessment"
        title="Show what you know — and what to strengthen"
        right={<Chip className="bg-brand-soft text-brand-deep">{st?.attempts.length ?? 0} attempts logged</Chip>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {db.assessments.map((a, i) => {
          const course = app.getCourse(a.courseId)!;
          const m = courseMeta(a.courseId);
          const best = app.bestAttempt(a.id);
          const attempts = (st?.attempts ?? []).filter((x) => x.assessmentId === a.id);
          return (
            <Reveal key={a.id} delay={i * 50}>
              <div className="card-ink flex h-full flex-col bg-card p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip className={a.kind === "Checkpoint" ? "bg-gold-soft text-[#8a5a06]" : "bg-ai-soft text-ai"}>{a.kind}</Chip>
                  <CourseTag course={course} />
                  {best ? (
                    <Chip className={cn("ml-auto", best.pass ? "bg-se-soft text-se" : "bg-[#f6e3e0] text-danger")}>best {best.pct}%</Chip>
                  ) : (
                    <Chip className="ml-auto bg-[#e8eadd] text-mute">not attempted</Chip>
                  )}
                </div>
                <h3 className="mt-2.5 font-display text-base font-bold tracking-tight">{a.title}</h3>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-mute">
                  <span>{a.questions.length} questions</span>
                  <span>{a.minutes} min</span>
                  <span>pass ≥ {a.passPct}%</span>
                  <span>MCQ · T/F · short answer</span>
                </div>
                <div className="mt-3 flex-1" />
                <div className="flex items-center justify-between border-t-1.5 border-dashed border-line pt-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-mute">
                    {attempts.length ? `${attempts.length} attempt${attempts.length > 1 ? "s" : ""} · last ${fmtDate(attempts[attempts.length - 1].at)}` : "counts toward course record"}
                  </span>
                  <button className={cn("btn btn-sm", best?.pass ? "btn-ghost text-brand-deep" : "btn-dark")} onClick={() => app.nav({ name: "assessment", id: a.id })}>
                    {best ? "Retake" : "Start"} <Icon name="arrowR" size={13} />
                  </button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-5 max-w-2xl text-xs leading-relaxed text-mute">
        Assessments are feedback instruments, not traps. Every attempt is logged with its score, and short answers are checked against key concepts —
        retakes are encouraged until the idea is genuinely yours.
      </p>
    </div>
  );
}

export function AssessmentView({ id }: { id: string }) {
  const app = useApp();
  const { db } = app;
  const assessment = app.getAssessment(id);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Attempt | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  if (!assessment) return null;

  const course = app.getCourse(assessment.courseId)!;
  const m = courseMeta(assessment.courseId);
  const qs = assessment.questions;
  const q = qs[index];
  const answeredCount = qs.filter((x) => (answers[x.id] ?? "").trim() !== "").length;
  const started = Object.keys(answers).length > 0;
  const best = app.bestAttempt(assessment.id);

  const setAnswer = (qid: string, v: string) => setAnswers((a) => ({ ...a, [qid]: v }));

  const submit = () => {
    const attempt = app.submitAssessment(assessment.id, answers);
    setResult(attempt);
    setConfirmOpen(false);
    window.scrollTo(0, 0);
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setResult(null);
  };

  // ── Result screen ──
  if (result) {
    const openTopics = db.topics
      .filter((t) => t.courseId === assessment.courseId && app.topicPct(t.id) < 100)
      .slice(0, 3);
    return (
      <div className="mx-auto max-w-3xl space-y-5">
        <Reveal>
          <div className={cn("card-ink overflow-hidden bg-card", result.pass ? "ring-2 ring-se/40" : "ring-2 ring-gold/50")}>
            <div className="h-1.5" style={{ backgroundColor: m.hex }} />
            <div className="flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left sm:p-8">
              <Ring value={result.pct} size={120} stroke={11} color={result.pass ? "#1b8a4c" : "#a97514"}>
                <div>
                  <div className="font-display text-3xl font-bold leading-none">{result.pct}%</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-mute">{result.score}/{result.total} pts</div>
                </div>
              </Ring>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h1 className="font-display text-2xl font-bold tracking-tight">{assessment.title}</h1>
                  <span className={cn("stamp", result.pass ? "text-se" : "text-warn")}>{result.pass ? "PASSED" : "NOT YET"}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {result.pass
                    ? `Above the ${assessment.passPct}% pass mark — logged to your record and counted toward the course completion requirements.`
                    : `Below the ${assessment.passPct}% pass mark this time. Review the misses below, revisit the linked lessons, and retake when ready.`}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <button className="btn btn-dark btn-sm" onClick={restart}><Icon name="refresh" size={13} /> Retake assessment</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => app.nav({ name: "course", id: course.id })}>Back to course</button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {!result.pass && openTopics.length > 0 && (
          <Reveal delay={80}>
            <section className="card-ink bg-card p-5">
              <div className="lbl">Areas to strengthen</div>
              <div className="flex flex-wrap gap-2">
                {openTopics.map((t) => (
                  <button key={t.id} onClick={() => app.nav({ name: "course", id: course.id })} className="chip-link flex items-center gap-1.5 rounded-md border-1.5 border-line bg-paper/60 px-3 py-1.5 text-[13px] font-semibold transition-colors hover:border-ink">
                    <Icon name="book" size={13} className={m.text} /> {t.title}
                  </button>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        <Reveal delay={120}>
          <section className="card-ink bg-card p-5 sm:p-6">
            <h2 className="mb-4 font-display text-lg font-semibold tracking-tight">Question review</h2>
            <div className="space-y-3">
              {qs.map((qq, i) => {
                const ok = gradeQuestion(qq, result.answers[qq.id]);
                return (
                  <div key={qq.id} className={cn("rounded-lg border-1.5 p-4", ok ? "border-se/40 bg-se-soft/50" : "border-danger/30 bg-[#f9ece9]")}>
                    <div className="flex items-start gap-3">
                      <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-1.5 font-mono text-[11px] font-bold", ok ? "border-se bg-se text-[#f4faf7]" : "border-danger bg-danger text-[#fdf6f4]")}>
                        {ok ? <Icon name="check" size={12} /> : <Icon name="x" size={11} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold leading-snug">Q{i + 1} · {qq.prompt}</div>
                        <div className="mt-1.5 grid gap-1 text-[13px] sm:grid-cols-2">
                          <div><span className="font-mono text-[10px] uppercase tracking-wider text-mute">your answer · </span>{result.answers[qq.id] || <em className="text-mute">blank</em>}</div>
                          {!ok && <div><span className="font-mono text-[10px] uppercase tracking-wider text-mute">correct · </span>{qq.answer}</div>}
                        </div>
                        <div className="mt-1.5 text-xs leading-relaxed text-mute"><span className="font-semibold text-ink">Why: </span>{qq.explain}</div>
                      </div>
                      <span className="font-mono text-[11px] text-mute">{ok ? `+${qq.points}` : "0"} pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>
      </div>
    );
  }

  // ── Runner ──
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => (started ? setConfirmOpen(true) : app.nav({ name: "assessments" }))} className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mute transition-colors hover:text-ink">
          <Icon name="arrowL" size={13} /> Exit assessment
        </button>
        <div className="flex items-center gap-2">
          <CourseTag course={course} />
          <Chip className={assessment.kind === "Checkpoint" ? "bg-gold-soft text-[#8a5a06]" : "bg-ai-soft text-ai"}>{assessment.kind}</Chip>
          {best && <Chip className="bg-[#e8eadd] text-mute">best {best.pct}%</Chip>}
        </div>
      </div>

      <Reveal>
        <div className="card-ink bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-xl font-bold tracking-tight">{assessment.title}</h1>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">Question {index + 1} of {qs.length} · {answeredCount} answered · pass ≥ {assessment.passPct}%</div>
            </div>
            <div className="hidden sm:block"><Seg value={((index + 1) / qs.length) * 100} cells={qs.length} color={m.hex} className="h-2.5 w-36" /></div>
          </div>
          <Bar value={(answeredCount / qs.length) * 100} color={m.hex} className="mt-3 h-1.5" />
        </div>
      </Reveal>

      <Reveal key={q.id} delay={40}>
        <div className="card-ink bg-card p-5 sm:p-7">
          <div className="flex items-center gap-2">
            <Chip className={q.kind === "mcq" ? "bg-ai-soft text-ai" : q.kind === "tf" ? "bg-rob-soft text-rob" : "bg-di-soft text-di"}>
              {q.kind === "mcq" ? "Multiple choice" : q.kind === "tf" ? "True / False" : "Short answer"}
            </Chip>
            <span className="font-mono text-[11px] text-mute">{q.points} pts</span>
          </div>
          <p className="mt-3 text-[17px] font-semibold leading-snug">{q.prompt}</p>

          {q.kind !== "short" ? (
            <div className={cn("mt-4 grid gap-2", q.kind === "tf" && "grid-cols-2")}>
              {(q.options ?? []).map((o) => {
                const sel = answers[q.id] === o;
                return (
                  <button
                    key={o}
                    onClick={() => setAnswer(q.id, o)}
                    className={cn(
                      "flex items-start gap-3 rounded-md border-1.5 px-4 py-3 text-left text-sm font-medium leading-snug transition-all",
                      sel ? "border-ink bg-ink text-paper" : "border-line bg-paper/40 hover:border-ink hover:bg-paper",
                    )}
                  >
                    <span className={cn("mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-1.5", sel ? "border-gold bg-gold text-ink" : "border-mute/50 text-transparent")}>
                      <Icon name="check" size={10} />
                    </span>
                    {o}
                  </button>
                );
              })}
            </div>
          ) : (
            <>
              <textarea
                className="inp mt-4 min-h-28 leading-relaxed"
                placeholder="Answer in your own words — key concepts are matched, not exact phrasing."
                value={answers[q.id] ?? ""}
                onChange={(e) => setAnswer(q.id, e.target.value)}
              />
              <div className="mt-1.5 font-mono text-[10.5px] text-mute">{(answers[q.id] ?? "").trim().length} chars</div>
            </>
          )}

          <div className="mt-6 flex items-center justify-between border-t-1.5 border-dashed border-line pt-4">
            <button className="btn btn-ghost btn-sm" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
              <Icon name="arrowL" size={13} /> Previous
            </button>
            {index < qs.length - 1 ? (
              <button className="btn btn-dark btn-sm" onClick={() => setIndex((i) => i + 1)}>
                Next <Icon name="arrowR" size={13} />
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => (answeredCount === qs.length ? submit() : setConfirmOpen(true))}>
                <Icon name="send" size={13} /> Submit answers
              </button>
            )}
          </div>
        </div>
      </Reveal>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        kicker="Before you go"
        title={answeredCount === qs.length ? "Submit this attempt?" : `${qs.length - answeredCount} question${qs.length - answeredCount > 1 ? "s are" : " is"} unanswered`}
        footer={
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmOpen(false)}>Keep working</button>
            {answeredCount === qs.length ? (
              <button className="btn btn-primary btn-sm" onClick={submit}><Icon name="send" size={13} /> Submit now</button>
            ) : (
              <button className="btn btn-danger btn-sm" onClick={submit}>Submit with blanks</button>
            )}
          </>
        }
      >
        <p className="text-sm leading-relaxed text-mute">
          {answeredCount === qs.length
            ? "Your answers will be graded immediately and the attempt logged to your record. You can retake the assessment later."
            : "Unanswered questions score zero. You can go back and finish them, or submit as-is."}
        </p>
      </Modal>
    </div>
  );
}

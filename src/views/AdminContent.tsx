import { useState } from "react";
import { useApp } from "../lib/store";
import { courseMeta, uid as newId } from "../lib/data";
import { Chip, Modal, SectionHead, cn } from "../components/ui";
import { Icon } from "../components/icons";
import type { Lesson, Question, QuestionKind } from "../lib/types";

interface LessonDraft {
  id?: string;
  courseId: string;
  topicId: string;
  order: number;
  title: string;
  minutes: number;
  summary: string;
  why: string;
  objectives: string;
  sections: { h: string; p: string }[];
  exTitle: string;
  exBody: string;
  exCode: string;
  ckPrompt: string;
  ckOptions: string[];
  ckAnswer: number;
  ckExplain: string;
}

const emptyDraft = (courseId: string, topicId: string, order: number): LessonDraft => ({
  courseId, topicId, order, title: "", minutes: 12, summary: "", why: "", objectives: "",
  sections: [{ h: "", p: "" }], exTitle: "", exBody: "", exCode: "",
  ckPrompt: "", ckOptions: ["", "", "", ""], ckAnswer: 0, ckExplain: "",
});

const draftFromLesson = (l: Lesson): LessonDraft => ({
  id: l.id, courseId: l.courseId, topicId: l.topicId, order: l.order,
  title: l.title, minutes: l.minutes, summary: l.summary, why: l.why,
  objectives: l.objectives.join("\n"),
  sections: l.sections.map((s) => ({ ...s })),
  exTitle: l.example.title, exBody: l.example.body, exCode: l.example.code ?? "",
  ckPrompt: l.check.prompt, ckOptions: [...l.check.options], ckAnswer: l.check.answer, ckExplain: l.check.explain,
});

export default function AdminContent() {
  const app = useApp();
  const { db } = app;
  const [courseId, setCourseId] = useState(db.courses[0]?.id ?? "c-ai");
  const [draft, setDraft] = useState<LessonDraft | null>(null);
  const [topicOpen, setTopicOpen] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicSummary, setTopicSummary] = useState("");
  const [qOpen, setQOpen] = useState(false);

  const course = app.getCourse(courseId)!;
  const topics = db.topics.filter((t) => t.courseId === courseId).sort((a, b) => a.order - b.order);

  const saveDraft = () => {
    if (!draft) return;
    const existing = draft.id ? db.lessons.find((l) => l.id === draft.id) : undefined;
    const lesson: Lesson = {
      id: draft.id ?? `l-x-${newId()}`,
      courseId: draft.courseId,
      topicId: draft.topicId,
      order: draft.order,
      title: draft.title.trim(),
      minutes: Math.max(3, draft.minutes),
      summary: draft.summary.trim(),
      why: draft.why.trim(),
      objectives: draft.objectives.split("\n").map((s) => s.trim()).filter(Boolean),
      sections: draft.sections.filter((s) => s.h.trim() && s.p.trim()).map((s) => ({ h: s.h.trim(), p: s.p.trim() })),
      example: { title: draft.exTitle.trim() || "Example", body: draft.exBody.trim(), code: draft.exCode || undefined },
      terms: existing?.terms ?? [["Key term", "Defined by the author of this lesson."]],
      activityHint: existing?.activityHint,
      check: { prompt: draft.ckPrompt.trim(), options: draft.ckOptions.map((o) => o.trim()).filter(Boolean), answer: draft.ckAnswer, explain: draft.ckExplain.trim() },
    };
    app.saveLesson(lesson);
    setDraft(null);
  };

  const draftValid = !!draft &&
    draft.title.trim().length > 3 && draft.summary.trim().length > 10 && draft.why.trim().length > 10 &&
    draft.objectives.split("\n").some((s) => s.trim()) &&
    draft.sections.some((s) => s.h.trim() && s.p.trim()) &&
    draft.ckPrompt.trim().length > 5 && draft.ckOptions.filter((o) => o.trim()).length >= 2 &&
    draft.ckAnswer < draft.ckOptions.filter((o) => o.trim()).length && draft.ckExplain.trim().length > 5;

  return (
    <div>
      <SectionHead
        kicker="Content management"
        title="Curriculum editor"
        right={
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm" onClick={() => setQOpen(true)}><Icon name="plus" size={13} /> Question</button>
            <button className="btn btn-dark btn-sm" onClick={() => setTopicOpen(true)}><Icon name="plus" size={13} /> Topic</button>
          </div>
        }
      />
      <p className="-mt-2 mb-4 max-w-2xl text-sm text-mute">
        Courses, topics, lessons, and assessment questions are data — edit them here and every student view updates immediately. Nothing is hard-coded into the interface.
      </p>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {db.courses.map((c) => {
          const m = courseMeta(c.id);
          return (
            <button
              key={c.id}
              onClick={() => setCourseId(c.id)}
              className={cn(
                "flex items-center gap-2 rounded-md border-1.5 px-3.5 py-2 font-display text-[13px] font-bold transition-all",
                courseId === c.id ? "border-ink bg-ink text-paper" : "border-line bg-card text-mute hover:border-ink hover:text-ink",
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", m.dot)} /> {c.short}
              <span className="font-mono text-[10px] font-medium opacity-60">{app.courseLessons(c.id).length}L</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {topics.map((t) => {
          const lessons = app.topicLessons(t.id);
          return (
            <section key={t.id} className="card-ink bg-card">
              <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-md border-1.5 border-line bg-paper font-mono text-[11px] font-bold text-mute">
                  {String(t.order).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[15px] font-bold tracking-tight">{t.title}</div>
                  <div className="truncate text-xs text-mute">{t.summary}</div>
                </div>
                <Chip className="bg-[#e8eadd] text-mute">{lessons.length} lessons</Chip>
                <button
                  className="btn btn-ghost btn-sm text-brand-deep"
                  onClick={() => setDraft(emptyDraft(courseId, t.id, lessons.length + 1))}
                >
                  <Icon name="plus" size={13} /> Lesson
                </button>
              </div>
              <div className="border-t-1.5 border-dashed border-line px-3 py-2">
                {lessons.map((l) => (
                  <div key={l.id} className="group flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-paper">
                    <Icon name="book" size={14} className="shrink-0 text-mute" />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold leading-tight">{l.title}</span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Lesson {l.order} · {l.minutes} min · {l.sections.length} sections · 1 check</span>
                    </div>
                    <button className="btn btn-ghost btn-xs opacity-0 transition-opacity group-hover:opacity-100" onClick={() => setDraft(draftFromLesson(l))}>
                      <Icon name="edit" size={12} /> Edit
                    </button>
                  </div>
                ))}
                {lessons.length === 0 && <div className="px-2 py-2 text-xs italic text-mute">No lessons yet — add the first one.</div>}
              </div>
            </section>
          );
        })}
      </div>

      {/* Add topic */}
      <Modal
        open={topicOpen}
        onClose={() => setTopicOpen(false)}
        kicker={`New topic · ${course.short}`}
        title="Add a topic"
        footer={
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => setTopicOpen(false)}>Cancel</button>
            <button
              className="btn btn-primary btn-sm"
              disabled={topicTitle.trim().length < 3}
              onClick={() => { app.addTopic(courseId, topicTitle.trim(), topicSummary.trim() || "New topic in this course."); setTopicOpen(false); setTopicTitle(""); setTopicSummary(""); }}
            >
              <Icon name="plus" size={13} /> Add topic
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="lbl">Topic title</label>
            <input className="inp" placeholder="e.g. Neural Networks Intuition" value={topicTitle} onChange={(e) => setTopicTitle(e.target.value)} />
          </div>
          <div>
            <label className="lbl">One-line summary</label>
            <input className="inp" placeholder="What this topic covers, in one sentence" value={topicSummary} onChange={(e) => setTopicSummary(e.target.value)} />
          </div>
        </div>
      </Modal>

      {/* Lesson editor */}
      <Modal
        open={!!draft}
        onClose={() => setDraft(null)}
        kicker={draft?.id ? "Edit lesson" : `New lesson · ${app.getTopic(draft?.topicId ?? "")?.title ?? ""}`}
        title={draft?.id ? draft.title : "Author a lesson"}
        wide
        footer={
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => setDraft(null)}>Cancel</button>
            <button className="btn btn-primary btn-sm" disabled={!draftValid} onClick={saveDraft}>
              <Icon name="check" size={13} /> {draft?.id ? "Save changes" : "Publish lesson"}
            </button>
          </>
        }
      >
        {draft && (
          <div className="space-y-3.5">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_110px]">
              <div>
                <label className="lbl">Title</label>
                <input className="inp" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Lesson title" />
              </div>
              <div>
                <label className="lbl">Minutes</label>
                <input className="inp" type="number" min={3} value={draft.minutes} onChange={(e) => setDraft({ ...draft, minutes: Number(e.target.value) || 10 })} />
              </div>
            </div>
            <div>
              <label className="lbl">Summary (one–two lines)</label>
              <textarea className="inp min-h-16" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
            </div>
            <div>
              <label className="lbl">Why does it matter?</label>
              <textarea className="inp min-h-16" value={draft.why} onChange={(e) => setDraft({ ...draft, why: e.target.value })} />
            </div>
            <div>
              <label className="lbl">Learning objectives — one per line</label>
              <textarea className="inp min-h-20" value={draft.objectives} onChange={(e) => setDraft({ ...draft, objectives: e.target.value })} placeholder={"Explain X\nApply Y\nPredict Z"} />
            </div>
            <div>
              <div className="lbl">Explanation sections</div>
              <div className="space-y-2">
                {draft.sections.map((s, i) => (
                  <div key={i} className="rounded-md border-1.5 border-line bg-paper/40 p-2.5">
                    <div className="flex items-center gap-2">
                      <input className="inp" placeholder={`Section ${i + 1} heading`} value={s.h} onChange={(e) => setDraft({ ...draft, sections: draft.sections.map((x, j) => (j === i ? { ...x, h: e.target.value } : x)) })} />
                      <button className="btn btn-ghost btn-xs text-danger" onClick={() => setDraft({ ...draft, sections: draft.sections.filter((_, j) => j !== i) })} aria-label="Remove section">
                        <Icon name="trash" size={13} />
                      </button>
                    </div>
                    <textarea className="inp mt-2 min-h-20" placeholder="Teaching content — concrete, example-driven, no walls of text" value={s.p} onChange={(e) => setDraft({ ...draft, sections: draft.sections.map((x, j) => (j === i ? { ...x, p: e.target.value } : x)) })} />
                  </div>
                ))}
                <button className="btn btn-ghost btn-sm text-brand-deep" onClick={() => setDraft({ ...draft, sections: [...draft.sections, { h: "", p: "" }] })}>
                  <Icon name="plus" size={13} /> Add section
                </button>
              </div>
            </div>
            <div className="rounded-md border-1.5 border-line bg-paper/40 p-2.5">
              <div className="lbl">Worked example</div>
              <input className="inp" placeholder="Example title" value={draft.exTitle} onChange={(e) => setDraft({ ...draft, exTitle: e.target.value })} />
              <textarea className="inp mt-2 min-h-16" placeholder="Narrative around the example" value={draft.exBody} onChange={(e) => setDraft({ ...draft, exBody: e.target.value })} />
              <textarea className="inp mt-2 min-h-20 font-mono text-[12px]" placeholder={"optional code / diagram (monospace block)"} value={draft.exCode} onChange={(e) => setDraft({ ...draft, exCode: e.target.value })} />
            </div>
            <div className="rounded-md border-1.5 border-gold/50 bg-gold-soft/40 p-2.5">
              <div className="lbl">Knowledge check (single MCQ)</div>
              <textarea className="inp min-h-14" placeholder="Question prompt" value={draft.ckPrompt} onChange={(e) => setDraft({ ...draft, ckPrompt: e.target.value })} />
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {draft.ckOptions.map((o, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <button
                      className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-1.5 font-mono text-[11px] font-bold", draft.ckAnswer === i ? "border-se bg-se text-[#f4faf7]" : "border-line bg-card text-mute")}
                      onClick={() => setDraft({ ...draft, ckAnswer: i })}
                      title="Mark as correct answer"
                    >
                      {String.fromCharCode(65 + i)}
                    </button>
                    <input className="inp" placeholder={`Option ${String.fromCharCode(65 + i)}`} value={o} onChange={(e) => setDraft({ ...draft, ckOptions: draft.ckOptions.map((x, j) => (j === i ? e.target.value : x)) })} />
                  </div>
                ))}
              </div>
              <textarea className="inp mt-2 min-h-14" placeholder="Explanation shown after answering" value={draft.ckExplain} onChange={(e) => setDraft({ ...draft, ckExplain: e.target.value })} />
            </div>
          </div>
        )}
      </Modal>

      <section className="mt-6 rounded-lg border-1.5 border-dashed border-line bg-card/60 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <Icon name="flag" size={14} className="text-warn" />
          <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-warn">Pending modules</span>
        </div>
        <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-mute">
          Authoring for <span className="font-semibold text-ink">practical activities</span> and <span className="font-semibold text-ink">project definitions</span> is not
          yet wired into this console — their schemas (activities, projects, milestones) are already live in the data layer and seeded content, so both
          editors slot in without model changes. Marked pending rather than simulated.
        </p>
      </section>

      <QuestionBuilder open={qOpen} onClose={() => setQOpen(false)} defaultCourseId={courseId} />
    </div>
  );
}

function QuestionBuilder({ open, onClose, defaultCourseId }: { open: boolean; onClose: () => void; defaultCourseId: string }) {
  const app = useApp();
  const { db } = app;
  const [assessmentId, setAssessmentId] = useState(db.assessments.find((a) => a.courseId === defaultCourseId)?.id ?? db.assessments[0]?.id ?? "");
  const [kind, setKind] = useState<QuestionKind>("mcq");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState("Option one\nOption two\nOption three\nOption four");
  const [answer, setAnswer] = useState("");
  const [accept, setAccept] = useState("");
  const [explain, setExplain] = useState("");
  const [points, setPoints] = useState(2);

  const valid = prompt.trim().length > 5 && explain.trim().length > 5 &&
    (kind === "short" ? answer.trim().length > 3 && accept.split(",").some((k) => k.trim()) : answer.trim().length > 0) &&
    (kind !== "mcq" || options.split("\n").filter((o) => o.trim()).length >= 2);

  const save = () => {
    const opts = kind === "mcq" ? options.split("\n").map((o) => o.trim()).filter(Boolean) : kind === "tf" ? ["True", "False"] : undefined;
    const q: Question = {
      id: `q-x-${newId()}`, kind, prompt: prompt.trim(),
      options: opts,
      answer: kind === "tf" ? (answer === "False" ? "False" : "True") : answer.trim(),
      accept: kind === "short" ? accept.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
      explain: explain.trim(), points: Math.max(1, points),
    };
    app.addQuestion(assessmentId, q);
    setPrompt(""); setAnswer(""); setAccept(""); setExplain("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      kicker="Assessment builder"
      title="Add a question"
      footer={
        <>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-sm" disabled={!valid} onClick={save}><Icon name="plus" size={13} /> Add question</button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="lbl">Assessment</label>
            <select className="inp" value={assessmentId} onChange={(e) => setAssessmentId(e.target.value)}>
              {db.assessments.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
          </div>
          <div>
            <label className="lbl">Type</label>
            <select className="inp" value={kind} onChange={(e) => setKind(e.target.value as QuestionKind)}>
              <option value="mcq">Multiple choice</option>
              <option value="tf">True / False</option>
              <option value="short">Short answer</option>
            </select>
          </div>
        </div>
        <div>
          <label className="lbl">Prompt</label>
          <textarea className="inp min-h-16" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        {kind === "mcq" && (
          <div>
            <label className="lbl">Options — one per line</label>
            <textarea className="inp min-h-24" value={options} onChange={(e) => setOptions(e.target.value)} />
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="lbl">{kind === "mcq" ? "Correct option (exact text)" : kind === "tf" ? "Correct answer" : "Model answer"}</label>
            {kind === "tf" ? (
              <select className="inp" value={answer} onChange={(e) => setAnswer(e.target.value)}>
                <option value="">Select…</option><option>True</option><option>False</option>
              </select>
            ) : (
              <input className="inp" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder={kind === "mcq" ? "Must match an option exactly" : "Reference answer"} />
            )}
          </div>
          <div>
            <label className="lbl">Points</label>
            <input className="inp" type="number" min={1} max={5} value={points} onChange={(e) => setPoints(Number(e.target.value) || 2)} />
          </div>
        </div>
        {kind === "short" && (
          <div>
            <label className="lbl">Accepted keywords — comma separated (any match scores)</label>
            <input className="inp" value={accept} onChange={(e) => setAccept(e.target.value)} placeholder="test set, hold-out, generalization" />
          </div>
        )}
        <div>
          <label className="lbl">Explanation (shown in review)</label>
          <textarea className="inp min-h-14" value={explain} onChange={(e) => setExplain(e.target.value)} />
        </div>
      </div>
    </Modal>
  );
}

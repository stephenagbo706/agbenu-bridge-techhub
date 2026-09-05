import { useState } from "react";
import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Chip, CourseTag, EmptyState, Reveal, SectionHead, cn, fmtDate } from "../components/ui";
import { Icon } from "../components/icons";

const KIND_CHIP: Record<string, string> = {
  Prompt: "bg-ai-soft text-ai",
  Design: "bg-rob-soft text-rob",
  Build: "bg-se-soft text-se",
  Business: "bg-di-soft text-di",
};

export function PracticeView() {
  const app = useApp();
  const { db, st } = app;
  return (
    <div>
      <SectionHead
        kicker="Practical learning"
        title="Practice — prove it with your hands"
        right={<Chip className="bg-brand-soft text-brand-deep">{Object.keys(st?.activities ?? {}).length}/{db.activities.length} submitted</Chip>}
      />
      <p className="-mt-2 mb-5 max-w-2xl text-sm text-mute">
        Lessons tell you what and why; activities make it yours. Each one produces evidence you can point to — a prompt, a design, a build, a business model.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {db.activities.map((a, i) => {
          const course = app.getCourse(a.courseId)!;
          const topic = app.getTopic(a.topicId);
          const m = courseMeta(a.courseId);
          const doneAt = st?.activities[a.id]?.at;
          return (
            <Reveal key={a.id} delay={i * 60}>
              <button
                onClick={() => app.nav({ name: "activity", id: a.id })}
                className="card-ink card-ink-hover group flex h-full w-full flex-col bg-card p-5 text-left"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Chip className={KIND_CHIP[a.kind]}>{a.kind}</Chip>
                  <CourseTag course={course} />
                  <span className="ml-auto flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-wider text-mute">
                    <Icon name="clock" size={12} /> {a.minutes} min
                  </span>
                </div>
                <h3 className="mt-2.5 font-display text-base font-bold leading-snug tracking-tight">{a.title}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-mute">{a.brief}</p>
                <div className="mt-3 flex items-center justify-between border-t-1.5 border-dashed border-line pt-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-mute">{topic?.title}</span>
                  {doneAt ? (
                    <span className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-se"><Icon name="check" size={12} /> done {fmtDate(doneAt)}</span>
                  ) : (
                    <span className={cn("flex items-center gap-1 font-mono text-[11px] font-medium uppercase tracking-wider transition-transform group-hover:translate-x-0.5", m.text)}>
                      Open brief <Icon name="arrowR" size={12} />
                    </span>
                  )}
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

export function ActivityView({ id }: { id: string }) {
  const app = useApp();
  const { db, st } = app;
  const activity = app.getActivity(id);
  const existing = st?.activities[id];
  const [text, setText] = useState(existing?.text ?? "");
  const [editing, setEditing] = useState(!existing);
  const [checked, setChecked] = useState<boolean[]>(activity ? activity.deliverables.map(() => !!existing) : []);
  if (!activity || !st) return null;

  const course = app.getCourse(activity.courseId)!;
  const topic = app.getTopic(activity.topicId);
  const m = courseMeta(activity.courseId);
  const valid = text.trim().length >= 40;

  const submit = () => {
    if (!valid) return;
    app.saveActivity(activity.id, text.trim());
    setEditing(false);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button onClick={() => app.nav({ name: "practice" })} className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mute transition-colors hover:text-ink">
        <Icon name="arrowL" size={13} /> All activities
      </button>

      <Reveal>
        <header className="card-ink overflow-hidden bg-card">
          <div className="h-1.5" style={{ backgroundColor: m.hex }} />
          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip className={KIND_CHIP[activity.kind]}>{activity.kind} activity</Chip>
              <CourseTag course={course} />
              <Chip className="bg-[#e8eadd] text-mute">{topic?.title}</Chip>
              <span className="ml-auto flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-mute"><Icon name="clock" size={12} /> ~{activity.minutes} min</span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">{activity.title}</h1>
            <p className="mt-2.5 text-[15px] leading-[1.7]">{activity.brief}</p>
          </div>
        </header>
      </Reveal>

      <Reveal delay={80}>
        <section className="card-ink bg-card p-5 sm:p-6">
          <div className="lbl">Deliverables — check each as you produce it</div>
          <div className="space-y-2">
            {activity.deliverables.map((d, i) => (
              <button
                key={d}
                onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md border-1.5 px-3.5 py-2.5 text-left text-sm font-medium leading-snug transition-all",
                  checked[i] ? "border-se/50 bg-se-soft" : "border-line bg-paper/40 hover:border-ink",
                )}
              >
                <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-1.5", checked[i] ? "border-se bg-se text-[#f4faf7]" : "border-mute/50 bg-card text-transparent")}>
                  <Icon name="check" size={12} />
                </span>
                <span className={cn(!checked[i] && "text-mute")}>{d}</span>
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={140}>
        <section className="card-ink bg-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="lbl mb-0">Your work &amp; evidence</div>
            {existing && !editing && (
              <span className="flex items-center gap-2">
                <span className="stamp text-se">SUBMITTED {fmtDate(existing.at)}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(true); setText(existing.text); }}><Icon name="edit" size={13} /> Update</button>
              </span>
            )}
          </div>
          {editing ? (
            <>
              <textarea
                className="inp mt-3 min-h-40 leading-relaxed"
                placeholder="Describe what you made, the decisions you took, and what you verified. Link deliverables where they live. Minimum 40 characters — this is your evidence."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <span className={cn("font-mono text-[11px]", valid ? "text-se" : "text-mute")}>{text.trim().length} chars {valid ? "· enough to submit" : "· need " + (40 - text.trim().length) + " more"}</span>
                <div className="flex gap-2">
                  {existing && <button className="btn btn-ghost btn-sm" onClick={() => { setEditing(false); setText(existing.text); }}>Cancel</button>}
                  <button className="btn btn-primary btn-sm" disabled={!valid} onClick={submit}>
                    <Icon name="send" size={13} /> {existing ? "Update submission" : "Submit evidence"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            existing && (
              <div className="mt-3 rounded-md border-1.5 border-line bg-paper/50 px-4 py-3.5 text-sm leading-relaxed">{existing.text}</div>
            )
          )}
        </section>
      </Reveal>

      {existing && (
        <Reveal delay={180}>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border-1.5 border-se/40 bg-se-soft px-5 py-4">
            <div className="flex items-center gap-2.5 text-se">
              <Icon name="check" size={18} />
              <div>
                <div className="font-display text-sm font-bold">Activity complete · +15 XP</div>
                <div className="text-xs text-se/80">Evidence recorded — skills tied to this work unlock as their lessons finish.</div>
              </div>
            </div>
            <button className="btn btn-dark btn-sm" onClick={() => app.nav({ name: "skills" })}>View skills <Icon name="arrowR" size={13} /></button>
          </div>
        </Reveal>
      )}
      {!activity && <EmptyState icon="wrench" title="Activity not found" sub="It may have been removed from the curriculum." />}
    </div>
  );
}

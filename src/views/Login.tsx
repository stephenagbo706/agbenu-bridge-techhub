import { useState } from "react";
import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Avatar, Chip, Reveal, cn } from "../components/ui";
import { Icon } from "../components/icons";

const PHILOSOPHY = ["LEARN", "PRACTICE", "BUILD", "SOLVE", "INNOVATE"];

const ROLE_CHIP: Record<string, string> = {
  student: "bg-brand-soft text-brand-deep",
  instructor: "bg-gold-soft text-warn",
  admin: "bg-di-soft text-di",
};

export default function Login() {
  const { db, login, register } = useApp();
  const [mode, setMode] = useState<"signin" | "join">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const demoIds = ["u-amara", "u-maya", "u-ade"];
  const accounts = demoIds.map((id) => db.users.find((u) => u.id === id)).filter(Boolean);

  const submit = () => {
    const e = register(name, email);
    setErr(e);
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">
      {/* Left — the program console */}
      <div className="bg-sidebar-trace relative hidden overflow-hidden bg-ink text-paper lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border-1.5 border-brand bg-ink2 text-brand">
              <Icon name="logo" size={22} />
            </span>
            <div>
              <div className="font-display text-lg font-bold leading-none tracking-tight">TECHFOUNDRY</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/50">Technology Academy</div>
            </div>
          </div>

          <h1 className="mt-12 max-w-md font-display text-4xl font-bold leading-[1.08] tracking-tight">
            You are here to become a <span className="text-gold">technology creator</span>.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/65">
            Four core courses. One progression: from fundamentals to working projects —
            AI, Robotics &amp; IoT, Software Engineering, and Digital Innovation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.14em]">
            {PHILOSOPHY.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                <span className={cn("rounded-md border px-2 py-1", i === 0 ? "border-gold/70 text-gold" : "border-paper/20 text-paper/60")}>{p}</span>
                {i < PHILOSOPHY.length - 1 && <Icon name="arrowR" size={12} className="text-paper/35" />}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-2">
          {db.courses.map((c, i) => {
            const m = courseMeta(c.id);
            return (
              <div key={c.id} className="anim-fade-up flex items-center gap-3 rounded-lg border-1.5 border-paper/12 bg-ink2/70 px-4 py-3" style={{ animationDelay: `${150 + i * 90}ms` }}>
                <span className={cn("h-2.5 w-2.5 rounded-full", m.dot)} />
                <span className="font-mono text-[11px] text-paper/45">{c.code}</span>
                <span className="font-display text-sm font-semibold">{c.title}</span>
                <span className="ml-auto font-mono text-[11px] text-paper/40">~{c.hours}h</span>
              </div>
            );
          })}
          <div className="pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/35">
            Program → Course → Topic → Lesson → Activity → Project → Skill
          </div>
        </div>
      </div>

      {/* Right — authentication */}
      <div className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border-1.5 border-ink bg-ink text-brand">
              <Icon name="logo" size={22} />
            </span>
            <div>
              <div className="font-display text-lg font-bold leading-none tracking-tight">TECHFOUNDRY</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">Technology Academy</div>
            </div>
          </div>

          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-deep/80">Authentication</div>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">Enter your workspace</h2>
            <p className="mt-2 text-sm text-mute">Role-based access: students learn and build; instructors review and guide; administrators run the platform.</p>
          </Reveal>

          {/* Mode switch */}
          <Reveal delay={80}>
            <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border-1.5 border-line bg-paper/70 p-1">
              {([["signin", "Cohort sign-in"], ["join", "New student"]] as const).map(([m, label]) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setErr(null); }}
                  className={cn(
                    "rounded-md px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wider transition-all",
                    mode === m ? "border-1.5 border-ink bg-ink text-paper" : "border-1.5 border-transparent text-mute hover:text-ink",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>

          {mode === "signin" ? (
            <div className="mt-5 space-y-3">
              {accounts.map((u, i) => u && (
                <Reveal key={u.id} delay={120 + i * 100}>
                  <button
                    onClick={() => login(u.id)}
                    className="card-ink card-ink-hover group flex w-full items-center gap-4 bg-card px-4 py-3.5 text-left focus-ring"
                  >
                    <Avatar user={u} size={42} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-[15px] font-semibold">{u.name}</span>
                        <Chip className={ROLE_CHIP[u.role]}>{u.role}</Chip>
                      </div>
                      <div className="mt-0.5 truncate text-xs text-mute">{u.title} · {u.email}</div>
                    </div>
                    <span className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-brand-deep transition-transform group-hover:translate-x-0.5">
                      Enter <Icon name="arrowR" size={14} />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={120}>
              <div className="card-ink mt-5 bg-card p-5">
                <div className="flex items-center gap-2">
                  <Icon name="user" size={16} className="text-brand-deep" />
                  <h3 className="font-display text-base font-bold tracking-tight">Create a student workspace</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-mute">
                  You start from zero — an empty record that fills with lessons, skills, and project evidence as you work.
                  Instructor and admin accounts are provisioned by the academy.
                </p>
                <label className="lbl mt-4">Full name</label>
                <input
                  className="inp" placeholder="e.g. Selam Bekele" value={name}
                  onChange={(e) => { setName(e.target.value); setErr(null); }}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                />
                <label className="lbl mt-3">Email</label>
                <input
                  className="inp" type="email" placeholder="you@example.com" value={email}
                  onChange={(e) => { setEmail(e.target.value); setErr(null); }}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                />
                {err && (
                  <div className="anim-fade-in mt-3 flex items-start gap-2 rounded-md border-1.5 border-danger/40 bg-[#f6e3e0] px-3 py-2 text-xs font-medium text-danger">
                    <Icon name="flag" size={13} className="mt-0.5 shrink-0" /> {err}
                  </div>
                )}
                <button className="btn btn-primary mt-4 w-full" onClick={submit} disabled={name.trim().length < 2 || email.trim().length < 5}>
                  <Icon name="plus" size={14} /> Create workspace & sign in
                </button>
              </div>
            </Reveal>
          )}

          <Reveal delay={480}>
            <div className="mt-8 rounded-lg border-1.5 border-line bg-card/70 px-4 py-3 text-xs leading-relaxed text-mute">
              <span className="font-semibold text-ink">Demo environment.</span> Cohort accounts are pre-provisioned with realistic
              data. Everything you do — lessons, quizzes, submissions, reviews — persists in this browser and flows
              through the same state engine a hosted API would serve. Reset anytime from Profile → Danger zone.
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

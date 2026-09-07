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

type AuthMode = "signin" | "join" | "forgot";

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "#c4373d" };
  if (score <= 2) return { score: 2, label: "Fair", color: "#a97514" };
  if (score <= 3) return { score: 3, label: "Good", color: "#e8a11c" };
  if (score <= 4) return { score: 4, label: "Strong", color: "#0e7c6b" };
  return { score: 5, label: "Excellent", color: "#1b8a4c" };
}

export default function Login() {
  const app = useApp();
  const { db, login, register } = app;
  const [mode, setMode] = useState<AuthMode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const demoIds = ["u-amara", "u-maya", "u-ade"];
  const accounts = demoIds.map((id) => db.users.find((u) => u.id === id)).filter(Boolean);

  const passwordStrength = getPasswordStrength(password);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = async (userId?: string) => {
    setLoading(true);
    setErr(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (userId) {
      login(userId);
    } else {
      // For demo, just find user by email
      const foundUser = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (foundUser) {
        login(foundUser.id);
      } else {
        setErr("Unable to sign in. Please check your credentials and try again.");
        setLoading(false);
      }
    }
  };

  const handleCreateAccount = async () => {
    setErr(null);

    // Validation
    if (name.trim().length < 2) {
      setErr("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setErr("Password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Register creates user, sets session, and navigates to dashboard
    // Dashboard will show course selection if no active course
    const error = register(name, email);
    if (error) {
      setErr(error);
      setLoading(false);
    }
    // If no error, user is automatically logged in and navigated to dashboard
  };

  const handleForgotPassword = async () => {
    setErr(null);
    setResetSent(false);

    if (!validateEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));

    setLoading(false);
    setResetSent(true);
  };

  // Authentication forms
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
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">
              {mode === "signin" && "Welcome Back"}
              {mode === "join" && "Create Your Account"}
              {mode === "forgot" && "Reset Password"}
            </h2>
            <p className="mt-2 text-sm text-mute">
              {mode === "signin" && "Sign in to continue your technology learning journey."}
              {mode === "join" && "Start your technology learning journey."}
              {mode === "forgot" && "Enter your email to receive a password reset link."}
            </p>
          </Reveal>

          {/* Mode switch */}
          {mode !== "forgot" && (
            <Reveal delay={80}>
              <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border-1.5 border-line bg-paper/70 p-1">
                {([[["signin", "Sign In"], ["join", "Create Account"]]] as const).flat().map(([m, label]) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m as AuthMode); setErr(null); }}
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
          )}

          {/* Sign In Form */}
          {mode === "signin" && (
            <>
              <div className="mt-5 space-y-3">
                {accounts.map((u, i) => u && (
                  <Reveal key={u.id} delay={120 + i * 100}>
                    <button
                      onClick={() => handleSignIn(u.id)}
                      disabled={loading}
                      className="card-ink card-ink-hover group flex w-full items-center gap-4 bg-card px-4 py-3.5 text-left focus-ring disabled:opacity-50"
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
                        {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" /> : <>Enter <Icon name="arrowR" size={14} /></>}
                      </span>
                    </button>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={420}>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => { setMode("forgot"); setErr(null); }}
                    className="font-mono text-[11px] uppercase tracking-wider text-brand-deep hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </Reveal>
            </>
          )}

          {/* Create Account Form */}
          {mode === "join" && (
            <Reveal delay={120}>
              <div className="card-ink mt-5 bg-card p-5">
                <div className="flex items-center gap-2">
                  <Icon name="user" size={16} className="text-brand-deep" />
                  <h3 className="font-display text-base font-bold tracking-tight">Create a student workspace</h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-mute">
                  You start from zero — an empty record that fills with lessons, skills, and project evidence as you work.
                </p>

                <label className="lbl mt-4">Full name</label>
                <input
                  className="inp"
                  placeholder="e.g. Selam Bekele"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErr(null); }}
                  disabled={loading}
                />

                <label className="lbl mt-3">Email</label>
                <input
                  className="inp"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErr(null); }}
                  disabled={loading}
                />

                <label className="lbl mt-3">Password</label>
                <div className="relative">
                  <input
                    className="inp pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErr(null); }}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <Icon name={showPassword ? "eyeOff" : "eye"} size={16} />
                  </button>
                </div>

                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-1 gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className="h-1.5 flex-1 rounded-full transition-colors"
                            style={{
                              backgroundColor: level <= passwordStrength.score ? passwordStrength.color : "#d9dbd0",
                            }}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: passwordStrength.color }}>
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}

                <label className="lbl mt-3">Confirm password</label>
                <div className="relative">
                  <input
                    className="inp pr-10"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErr(null); }}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    <Icon name={showConfirmPassword ? "eyeOff" : "eye"} size={16} />
                  </button>
                </div>

                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <div className="mt-1.5 text-xs text-danger">Passwords do not match</div>
                )}

                {err && (
                  <div className="anim-fade-in mt-3 flex items-start gap-2 rounded-md border-1.5 border-danger/40 bg-[#f6e3e0] px-3 py-2 text-xs font-medium text-danger">
                    <Icon name="flag" size={13} className="mt-0.5 shrink-0" /> {err}
                  </div>
                )}

                <button
                  className="btn btn-primary mt-4 w-full"
                  onClick={handleCreateAccount}
                  disabled={loading || name.trim().length < 2 || !validateEmail(email) || password.length < 8 || password !== confirmPassword}
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating your account...
                    </>
                  ) : (
                    <>
                      <Icon name="plus" size={14} /> Create Account
                    </>
                  )}
                </button>
              </div>
            </Reveal>
          )}

          {/* Forgot Password Form */}
          {mode === "forgot" && (
            <Reveal delay={120}>
              <div className="card-ink mt-5 bg-card p-5">
                {resetSent ? (
                  <div className="anim-fade-in text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-se-soft text-se">
                      <Icon name="check" size={22} />
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold tracking-tight">Check your email</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mute">
                      We've sent a password reset link to <span className="font-semibold text-ink">{email}</span>. Click the link in the email to reset your password.
                    </p>
                    <button
                      onClick={() => { setMode("signin"); setErr(null); setEmail(""); setResetSent(false); }}
                      className="btn btn-primary mt-4"
                    >
                      Back to Sign In
                    </button>
                  </div>
                ) : (
                  <>
                    <label className="lbl">Email address</label>
                    <input
                      className="inp"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErr(null); setResetSent(false); }}
                      disabled={loading}
                    />

                    {err && (
                      <div className="anim-fade-in mt-3 flex items-start gap-2 rounded-md border-1.5 border-danger/40 bg-[#f6e3e0] px-3 py-2 text-xs font-medium text-danger">
                        <Icon name="flag" size={13} className="mt-0.5 shrink-0" /> {err}
                      </div>
                    )}

                    <button
                      className="btn btn-primary mt-4 w-full"
                      onClick={handleForgotPassword}
                      disabled={loading || !validateEmail(email)}
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending reset link...
                        </>
                      ) : (
                        <>
                          <Icon name="send" size={14} /> Send Reset Link
                        </>
                      )}
                    </button>

                    <div className="mt-4 text-center">
                      <button
                        onClick={() => { setMode("signin"); setErr(null); setEmail(""); setResetSent(false); }}
                        className="font-mono text-[11px] uppercase tracking-wider text-brand-deep hover:underline"
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </>
                )}
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

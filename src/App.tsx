import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AppProvider, useApp } from "./lib/store";
import type { RouteName } from "./lib/store";
import { Avatar, Seg, Toasts, cn, timeAgo } from "./components/ui";
import { courseMeta } from "./lib/data";
import { Icon } from "./components/icons";
import type { IconName } from "./components/icons";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import { CourseView, CoursesView } from "./views/Courses";
import LessonView from "./views/Lesson";
import { ActivityView, PracticeView } from "./views/Practice";
import { AssessmentView, AssessmentsView } from "./views/Assessments";
import { ProjectView, ProjectsView } from "./views/Projects";
import Skills from "./views/Skills";
import { CareersView, PathView } from "./views/PathCareers";
import Profile from "./views/Profile";
import Admin from "./views/Admin";
import { VirtualLabsView } from "./views/VirtualLabs";
import { LiveClassesView, LiveClassroomView } from "./views/LiveClasses";
import type { AppNotification } from "./lib/types";

const LOADING_MESSAGES = [
  "[SYNCING] Neural Firmware & IoT Gateway...",
  "[INITIALIZING] Autonomous Machine Learning Core...",
  "[OPTIMIZING] Robotics Micro-Controllers...",
  "[COMPILING] Software Engineering Cloud Stack...",
  "[CALIBRATING] Innovation Sandbox & Venture Labs...",
  "[READY] Agbenu Bridge Gateway Initialized.",
];

function LoadingScreen() {
  const [progress, setProgress] = useState(24);
  const [messageIndex, setMessageIndex] = useState(0);
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((current) => Math.min(current + 2, 99));
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
      setLatency((current) => 12 + Math.floor(Math.random() * 7));
    }, 220);

    return () => window.clearInterval(timer);
  }, []);

  const status = LOADING_MESSAGES[messageIndex];

  return (
    <div className="loading-shell">
      <div className="loading-ambient loading-ambient-left" />
      <div className="loading-ambient loading-ambient-center" />
      <div className="loading-ambient loading-ambient-right" />

      <header className="loading-header">
        <div className="loading-status-left">
          <span className="loading-status-blip">
            <span className="loading-status-ping" />
          </span>
          <span className="loading-status-label">Core Gateway // Online</span>
        </div>
        <div className="loading-header-right">
          <div className="loading-node-pill">
            <span className="loading-node-icon"><Icon name="spark" size={14} /></span>
            <span>NODE: ABT-WEST-01</span>
          </div>
          <div className="loading-node-pill">
            <span className="loading-node-icon"><Icon name="gear" size={14} /></span>
            <span>PING: {latency}ms</span>
          </div>
        </div>
      </header>

      <main className="loading-main">
        <div className="loading-logo-wrap">
          <div className="loading-logo-glow" />
          <div className="loading-logo-ring" />
          <div className="loading-badge">
            <img src="/abt-logo.png" alt="Agbenu Bridge TechHub emblem" className="loading-badge-image" />
          </div>
        </div>

        <div className="loading-title-wrap">
          <div className="loading-mini-badge">
            <span className="loading-mini-dot" />
            <span>Autonomous Learning Network</span>
          </div>
          <h1 className="loading-title">Agbenu Bridge TechHub</h1>
          <p className="loading-tagline">Learn Technology. Build the Future.</p>
        </div>

        <div className="loading-panel">
          <div className="loading-panel-top">
            <div className="loading-panel-label">
              <span className="loading-settings-icon"><Icon name="gear" size={15} /></span>
              <span>System Pipeline Sync</span>
            </div>
            <span className="loading-percent">{progress}%</span>
          </div>

          <div className="loading-meter">
            <div className="loading-meter-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="loading-panel-bottom">
            <div className="loading-status-stream">
              <span className="loading-stream-dot" />
              <p>{status}</p>
            </div>
            <span className="loading-hash">SEC-HASH: 0x88F2A</span>
          </div>
        </div>

        <div className="loading-grid-row">
          {[
            { title: "AI Systems", tone: "cyan", iconName: "spark", label: "SYNAPSE ACTIVE" },
            { title: "Robotics & IoT", tone: "emerald", iconName: "cube", label: "CALIBRATING" },
            { title: "Software Eng.", tone: "blue", iconName: "code", label: "CORE MOUNTED" },
            { title: "Innovation Lab", tone: "amber", iconName: "compass", label: "INCUBATING" },
          ].map((item) => (
            <div key={item.title} className={`loading-feature-card loading-feature-${item.tone}`}>
              <div className={`loading-feature-icon loading-feature-icon-${item.tone}`}>
                <Icon name={item.iconName as IconName} size={18} />
              </div>
              <div className="loading-feature-copy">
                <div className="loading-feature-title">{item.title}</div>
                <div className={`loading-feature-label loading-feature-label-${item.tone}`}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="loading-footer">
        <div className="loading-footer-inner">
          <div className="loading-system-status">
            <span className="loading-system-dot" />
            <span>ABT-OS v2.5 // Secure Bridge Connection Active // Gateway Ready</span>
          </div>
          <div className="loading-footer-links">
            <span>Telemetry Diagnostics</span>
            <span>Curriculum Roadmap</span>
            <span>Neural Core Docs</span>
            <span className="loading-footer-link-accent">Lab Access</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const STUDENT_NAV: { section: string; items: { route: RouteName; label: string; icon: IconName }[] }[] = [
  { section: "Learn", items: [
    { route: "dashboard", label: "Dashboard", icon: "dashboard" },
    { route: "courses", label: "Courses", icon: "book" },
    { route: "labs", label: "Virtual Labs", icon: "spark" },
    { route: "liveclasses", label: "Live Classes", icon: "video" },
    { route: "practice", label: "Practice", icon: "wrench" },
    { route: "assessments", label: "Assessments", icon: "clipboard" },
  ]},
  { section: "Build", items: [
    { route: "projects", label: "Projects", icon: "cube" },
    { route: "skills", label: "Skills", icon: "zap" },
  ]},
  { section: "Explore", items: [
    { route: "path", label: "Learning Path", icon: "map" },
    { route: "careers", label: "Careers", icon: "compass" },
  ]},
  { section: "Me", items: [{ route: "profile", label: "Profile", icon: "user" }]},
];

const ACTIVE_MAP: Record<string, RouteName> = {
  course: "courses", lesson: "courses", activity: "practice", assessment: "assessments", project: "projects", lab: "labs", liveclass: "liveclasses",
};

const CRUMB: Record<string, string> = {
  dashboard: "Learn / Dashboard", courses: "Learn / Courses", course: "Learn / Course", lesson: "Learn / Lesson",
  labs: "Learn / Virtual Labs", liveclasses: "Learn / Live Classes", liveclass: "Learn / Live Class",
  practice: "Learn / Practice", activity: "Learn / Activity", assessments: "Learn / Assessments", assessment: "Learn / Assessment",
  projects: "Build / Projects", project: "Build / Project", skills: "Build / Skills",
  path: "Explore / Learning Path", careers: "Explore / Careers", profile: "Me / Profile", admin: "Staff / Console",
};

const NOTIF_ICON: Record<AppNotification["kind"], IconName> = {
  achievement: "award", course: "grad", project: "cube", content: "book", announcement: "send", system: "gear",
};

function App() {
  return (
    <AppProvider>
      <BootApp />
    </AppProvider>
  );
}

function BootApp() {
  const { user } = useApp();
  const [booting, setBooting] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem("techhub-sidebar-collapsed") === "1");

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("techhub-sidebar-collapsed", sidebarCollapsed ? "1" : "0");
  }, [sidebarCollapsed]);

  if (booting) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="bg-blueprint min-h-screen">
        <Login />
        <Toasts />
      </div>
    );
  }

  return (
    <div className="bg-blueprint min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((current) => !current)} />
      <MobileDrawer />
      <div className={cn("transition-[padding] duration-200", sidebarCollapsed ? "lg:pl-20" : "lg:pl-60")}>
        <Topbar />
        <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
          <View />
        </main>
      </div>
      <NotifDrawer />
      <Toasts />
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────────

function Brand({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5 px-1", collapsed && "justify-center px-0")}>
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border-1.5 border-brand bg-ink2 text-brand">
        <img src="/abt-logo.png" alt="Agbenu Bridge TechHub logo" className="h-full w-full object-cover" />
      </span>
      <div className={cn(collapsed && "sr-only")}>
        <div className="font-display text-[15px] font-bold leading-none tracking-tight text-paper">Agbenu Bridge TechHub</div>
        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-paper/45">Learn Technology. Build the Future.</div>
      </div>
    </div>
  );
}

function NavContent({ collapsed = false, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const app = useApp();
  const { user, route } = app;
  if (!user) return null;
  const isStaff = user.role !== "student";
  const activeName = ACTIVE_MAP[route.name] ?? route.name;

  return (
    <>
      <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between gap-2")}>
        <Brand collapsed={collapsed} />
        {onToggle && (
          <button
            onClick={onToggle}
            className={cn("hidden h-8 w-8 items-center justify-center rounded-md border-1.5 border-paper/10 text-paper/60 transition-colors hover:bg-paper/10 hover:text-paper lg:flex", collapsed && "absolute -right-3 top-5 bg-ink shadow-sm")}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name={collapsed ? "arrowR" : "arrowL"} size={15} />
          </button>
        )}
      </div>
      <nav className={cn("mt-6 flex-1 space-y-5 overflow-y-auto thin-scroll", collapsed ? "pr-0" : "pr-1")}>
        {isStaff ? (
          <div>
            <div className={cn("mb-1.5 px-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/35", collapsed && "sr-only")}>Staff</div>
            <button
              onClick={() => app.nav({ name: "admin" })}
              title={collapsed ? "Admin console" : undefined}
              className={cn(
                "flex w-full items-center rounded-md py-2 text-sm font-semibold transition-colors",
                collapsed ? "justify-center px-0" : "gap-2.5 px-3",
                route.name === "admin" ? "bg-paper/12 text-gold" : "text-paper/70 hover:bg-paper/8 hover:text-paper",
              )}
            >
              <Icon name="shield" size={16} /> <span className={cn(collapsed && "sr-only")}>Admin console</span>
              <span className={cn("dot-live h-1.5 w-1.5 rounded-full bg-gold", collapsed ? "absolute ml-6 mt-[-18px]" : "ml-auto")} />
            </button>
          </div>
        ) : (
          STUDENT_NAV.map((sec) => (
            <div key={sec.section}>
              <div className={cn("mb-1.5 px-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/35", collapsed && "sr-only")}>{sec.section}</div>
              <div className="space-y-0.5">
                {sec.items.map((it) => (
                  <button
                    key={it.route}
                    title={collapsed ? it.label : undefined}
                    onClick={() => {
                      // For labs, include active course ID if available
                      if (it.route === "labs" && app.hasActiveCourse()) {
                        const activeCourse = app.activeCourse();
                        app.nav({ name: it.route, id: activeCourse?.id });
                      } else {
                        app.nav({ name: it.route });
                      }
                    }}
                    className={cn(
                      "flex w-full items-center rounded-md py-2 text-sm font-semibold transition-all",
                      collapsed ? "justify-center px-0" : "gap-2.5 px-3",
                      activeName === it.route
                        ? "bg-paper/12 text-gold shadow-[inset_2.5px_0_0_0_var(--color-gold)]"
                        : "text-paper/70 hover:bg-paper/8 hover:text-paper",
                    )}
                  >
                    <Icon name={it.icon} size={16} /> <span className={cn(collapsed && "sr-only")}>{it.label}</span>
                    {it.route === "liveclasses" && !collapsed && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-danger" />}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}

        {!isStaff && app.hasActiveCourse() && !collapsed && (
          <div>
            <div className="mb-1.5 px-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/35">In progress</div>
            <div className="space-y-1 px-1">
              {(() => {
                const activeCourse = app.activeCourse();
                if (!activeCourse) return null;
                const pct = app.coursePct(activeCourse.id);
                const m = courseMeta(activeCourse.id);
                return (
                  <button key={activeCourse.id} onClick={() => app.nav({ name: "course", id: activeCourse.id })} className="group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-paper/8">
                    <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", m.dot)} />
                    <span className="w-16 shrink-0 truncate font-mono text-[10px] text-paper/60">{activeCourse.short}</span>
                    <Seg value={pct} cells={10} color={m.hex} className="h-1.5 flex-1" />
                    <span className="w-8 text-right font-mono text-[10px] text-paper/50">{pct}%</span>
                  </button>
                );
              })()}
            </div>
          </div>
        )}
      </nav>
      <div className="mt-4 border-t-1.5 border-paper/10 pt-4">
        <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
          <Avatar user={user} size={34} />
          <div className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
            <div className="truncate text-[13px] font-bold text-paper">{user.name}</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/45">{user.role}</div>
          </div>
          <button onClick={app.logout} className="flex h-8 w-8 items-center justify-center rounded-md text-paper/55 transition-colors hover:bg-paper/10 hover:text-paper" title="Sign out" aria-label="Sign out">
            <Icon name="logout" size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { user } = useApp();
  if (!user) return null;
  return (
    <aside className={cn("bg-sidebar-trace fixed inset-y-0 left-0 z-40 hidden flex-col bg-ink py-5 transition-[width,padding] duration-200 lg:flex", collapsed ? "w-20 px-3" : "w-60 px-3.5")}>
      <NavContent collapsed={collapsed} onToggle={onToggle} />
    </aside>
  );
}

function MobileDrawer() {
  const app = useApp();
  const { menuOpen, setMenuOpen, user } = app;
  if (!menuOpen || !user) return null;
  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="anim-fade-in absolute inset-0 bg-ink/60" onClick={() => setMenuOpen(false)} />
      <div className="anim-fade-up absolute inset-y-0 left-0 flex w-72 flex-col bg-ink px-3.5 py-5" style={{ animationDuration: "0.25s" }}>
        <button className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-md text-paper/60 hover:bg-paper/10 hover:text-paper" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <Icon name="x" size={16} />
        </button>
        <NavContent />
      </div>
    </div>
  );
}

// ─── Topbar ─────────────────────────────────────────────────────────────────

function Topbar() {
  const app = useApp();
  const { user, route } = app;
  if (!user) return null;
  const unreadCount = app.unread();
  return (
    <header className="sticky top-0 z-30 border-b-1.5 border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <button className="flex h-9 w-9 items-center justify-center rounded-md border-1.5 border-line bg-card lg:hidden" onClick={() => app.setMenuOpen(true)} aria-label="Open menu">
          <Icon name="menu" size={17} />
        </button>
        <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
          {CRUMB[route.name] ?? "Agbenu Bridge TechHub"}
        </div>
        <div className="ml-auto flex items-center gap-2">
          {user.role === "student" && (
            <button
              onClick={() => app.setNotifOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-md border-1.5 border-line bg-card transition-all hover:-translate-y-px hover:shadow-[var(--shadow-lift-sm)]"
              aria-label={`Notifications (${unreadCount} unread)`}
            >
              <Icon name="bell" size={16} />
              {unreadCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full border-1.5 border-paper bg-danger px-1 font-mono text-[9.5px] font-bold text-[#fdf6f4]">
                  {unreadCount}
                </span>
              )}
            </button>
          )}
          <button onClick={() => user.role === "student" && app.nav({ name: "profile" })} className="flex items-center gap-2.5 rounded-md border-1.5 border-line bg-card py-1 pl-1 pr-3 transition-all hover:-translate-y-px hover:shadow-[var(--shadow-lift-sm)]">
            <Avatar user={user} size={28} />
            <span className="hidden text-left sm:block">
              <span className="block text-[12.5px] font-bold leading-tight">{user.name.split(" ")[0]}</span>
              <span className="block font-mono text-[8.5px] uppercase tracking-[0.14em] text-mute">{user.role}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Notifications drawer ───────────────────────────────────────────────────

function NotifDrawer() {
  const app = useApp();
  const { notifOpen, setNotifOpen, user, db } = app;
  if (!notifOpen || !user) return null;
  const list = db.notifications[user.id] ?? [];
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="anim-fade-in absolute inset-0 bg-ink/45" onClick={() => setNotifOpen(false)} />
      <div className="anim-slide-right absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l-1.5 border-ink bg-card">
        <div className="flex items-center justify-between border-b-1.5 border-line px-5 py-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">Notifications</div>
            <div className="font-display text-lg font-bold tracking-tight">{list.filter((n) => !n.read).length} unread</div>
          </div>
          <div className="flex items-center gap-1.5">
            {list.some((n) => !n.read) && <button className="btn btn-ghost btn-xs text-brand-deep" onClick={app.markAllRead}>Mark all read</button>}
            <button className="flex h-8 w-8 items-center justify-center rounded-md text-mute hover:bg-paper" onClick={() => setNotifOpen(false)} aria-label="Close notifications">
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {list.length === 0 && <div className="px-4 py-10 text-center text-sm text-mute">No notifications — signal, not noise.</div>}
          <div className="space-y-2">
            {list.map((n) => (
              <button
                key={n.id}
                onClick={() => app.markRead(n.id)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg border-1.5 px-3.5 py-3 text-left transition-colors",
                  n.read ? "border-line bg-paper/40 opacity-70" : "border-line bg-card hover:border-ink",
                )}
              >
                <span className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-1.5",
                  n.kind === "achievement" ? "border-[#9a6a08]/40 bg-gold-soft text-[#8a5a06]"
                    : n.kind === "project" ? "border-brand/30 bg-brand-soft text-brand-deep"
                    : n.kind === "announcement" ? "border-di/30 bg-di-soft text-di"
                    : "border-line bg-paper text-mute",
                )}>
                  <Icon name={NOTIF_ICON[n.kind]} size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className={cn("text-[13px] font-bold leading-tight", !n.read && "text-ink")}>{n.title}</span>
                    {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-danger" />}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-mute">{n.body}</span>
                  <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-wider text-mute/80">{timeAgo(n.at)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Guards + view switch ───────────────────────────────────────────────────

function StaffGate() {
  const app = useApp();
  return (
    <div className="card-ink mx-auto mt-10 max-w-md bg-card p-8 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border-1.5 border-line bg-paper text-brand-deep"><Icon name="shield" size={22} /></span>
      <h2 className="mt-3 font-display text-lg font-bold tracking-tight">Staff workspace</h2>
      <p className="mt-1.5 text-sm text-mute">Your role works from the console — reviewing submissions, managing content, and monitoring the cohort.</p>
      <button className="btn btn-dark mt-4" onClick={() => app.nav({ name: "admin" })}><Icon name="shield" size={14} /> Open console</button>
    </div>
  );
}

function NoAccess() {
  const app = useApp();
  return (
    <div className="card-ink mx-auto mt-10 max-w-md bg-card p-8 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border-1.5 border-danger/40 bg-[#f6e3e0] text-danger"><Icon name="key" size={22} /></span>
      <h2 className="mt-3 font-display text-lg font-bold tracking-tight">Instructor access required</h2>
      <p className="mt-1.5 text-sm text-mute">Administration is role-restricted. Student accounts can't open the console — that boundary is enforced in the service layer, not just the UI.</p>
      <button className="btn btn-primary mt-4" onClick={() => app.nav({ name: "dashboard" })}><Icon name="arrowL" size={14} /> Back to dashboard</button>
    </div>
  );
}

function View() {
  const { route, user } = useApp();
  if (!user) return null;
  const key = `${route.name}:${route.id ?? ""}:${route.tab ?? ""}`;

  let node: ReactNode;
  if (user.role !== "student") {
    if (route.name === "admin") node = <Admin />;
    else if (route.name === "liveclasses") node = <LiveClassesView />;
    else if (route.name === "liveclass") node = <LiveClassroomView classId={route.id ?? ""} />;
    else node = <StaffGate />;
  } else {
    switch (route.name) {
      case "courses": node = <CoursesView />; break;
      case "course": node = <CourseView id={route.id ?? ""} />; break;
      case "lesson": node = <LessonView id={route.id ?? ""} />; break;
      case "practice": node = <PracticeView />; break;
      case "activity": node = <ActivityView id={route.id ?? ""} />; break;
      case "assessments": node = <AssessmentsView />; break;
      case "assessment": node = <AssessmentView id={route.id ?? ""} />; break;
      case "projects": node = <ProjectsView />; break;
      case "project": node = <ProjectView id={route.id ?? ""} />; break;
      case "skills": node = <Skills />; break;
      case "path": node = <PathView />; break;
      case "careers": node = <CareersView />; break;
      case "profile": node = <Profile />; break;
      case "labs": node = <VirtualLabsView courseId={route.id} />; break;
      case "liveclasses": node = <LiveClassesView />; break;
      case "liveclass": node = <LiveClassroomView classId={route.id ?? ""} />; break;
      case "admin": node = <NoAccess />; break;
      default: node = <Dashboard />;
    }
  }
  return (
    <div key={key} className="anim-fade-in">
      {node}
    </div>
  );
}

export default App;

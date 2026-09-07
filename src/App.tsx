import type { ReactNode } from "react";
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
import type { AppNotification } from "./lib/types";

const STUDENT_NAV: { section: string; items: { route: RouteName; label: string; icon: IconName }[] }[] = [
  { section: "Learn", items: [
    { route: "dashboard", label: "Dashboard", icon: "dashboard" },
    { route: "courses", label: "Courses", icon: "book" },
    { route: "labs", label: "Virtual Labs", icon: "spark" },
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
  course: "courses", lesson: "courses", activity: "practice", assessment: "assessments", project: "projects", lab: "labs",
};

const CRUMB: Record<string, string> = {
  dashboard: "Learn / Dashboard", courses: "Learn / Courses", course: "Learn / Course", lesson: "Learn / Lesson",
  labs: "Learn / Virtual Labs", practice: "Learn / Practice", activity: "Learn / Activity", assessments: "Learn / Assessments", assessment: "Learn / Assessment",
  projects: "Build / Projects", project: "Build / Project", skills: "Build / Skills",
  path: "Explore / Learning Path", careers: "Explore / Careers", profile: "Me / Profile", admin: "Staff / Console",
};

const NOTIF_ICON: Record<AppNotification["kind"], IconName> = {
  achievement: "award", course: "grad", project: "cube", content: "book", announcement: "send", system: "gear",
};

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}

function Root() {
  const { user } = useApp();
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
      <Sidebar />
      <MobileDrawer />
      <div className="lg:pl-60">
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

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border-1.5 border-brand bg-ink2 text-brand">
        <Icon name="logo" size={20} />
      </span>
      <div>
        <div className="font-display text-[15px] font-bold leading-none tracking-tight text-paper">TECHFOUNDRY</div>
        <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-paper/45">Technology Academy</div>
      </div>
    </div>
  );
}

function NavContent() {
  const app = useApp();
  const { user, route } = app;
  if (!user) return null;
  const isStaff = user.role !== "student";
  const activeName = ACTIVE_MAP[route.name] ?? route.name;

  return (
    <>
      <Brand />
      <nav className="mt-6 flex-1 space-y-5 overflow-y-auto pr-1 thin-scroll">
        {isStaff ? (
          <div>
            <div className="mb-1.5 px-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/35">Staff</div>
            <button
              onClick={() => app.nav({ name: "admin" })}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                route.name === "admin" ? "bg-paper/12 text-gold" : "text-paper/70 hover:bg-paper/8 hover:text-paper",
              )}
            >
              <Icon name="shield" size={16} /> Admin console
              <span className="dot-live ml-auto h-1.5 w-1.5 rounded-full bg-gold" />
            </button>
          </div>
        ) : (
          STUDENT_NAV.map((sec) => (
            <div key={sec.section}>
              <div className="mb-1.5 px-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/35">{sec.section}</div>
              <div className="space-y-0.5">
                {sec.items.map((it) => (
                  <button
                    key={it.route}
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
                      "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-semibold transition-all",
                      activeName === it.route
                        ? "bg-paper/12 text-gold shadow-[inset_2.5px_0_0_0_var(--color-gold)]"
                        : "text-paper/70 hover:bg-paper/8 hover:text-paper",
                    )}
                  >
                    <Icon name={it.icon} size={16} /> {it.label}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}

        {!isStaff && app.hasActiveCourse() && (
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
        <div className="flex items-center gap-2.5">
          <Avatar user={user} size={34} />
          <div className="min-w-0 flex-1">
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

function Sidebar() {
  const { user } = useApp();
  if (!user) return null;
  return (
    <aside className="bg-sidebar-trace fixed inset-y-0 left-0 z-40 hidden w-60 flex-col bg-ink px-3.5 py-5 lg:flex">
      <NavContent />
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
          {CRUMB[route.name] ?? "TechFoundry"}
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
    node = route.name === "admin" ? <Admin /> : <StaffGate />;
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

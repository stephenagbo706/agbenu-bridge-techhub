import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import confetti from "canvas-confetti";
import type {
  Activity, AppNotification, Assessment, Attempt, Course, DB, Lesson, Project, Question,
  StudentState, Topic, User, Video,
} from "./types";
import { buildSeedDB, syncStudent, uid as newId } from "./data";
import type { Career } from "./data";

// ─── Routing ────────────────────────────────────────────────────────────────

export type RouteName =
  | "dashboard" | "courses" | "course" | "lesson" | "practice" | "activity"
  | "assessments" | "assessment" | "projects" | "project" | "skills" | "path"
  | "careers" | "profile" | "admin" | "labs";

export interface Route { name: RouteName; id?: string; tab?: string; }

export interface Rec { kind: "lesson" | "assessment" | "project" | "activity"; id: string; label: string; sub: string; courseId?: string; }

export interface Toast { id: string; msg: string; kind: "ok" | "info" | "warn" | "trophy"; }

const LS_DB = "techfoundry-db-v1";
const LS_SESSION = "techfoundry-session-v1";

const LEVELS = [
  { xp: 0, name: "Explorer" },
  { xp: 100, name: "Builder" },
  { xp: 220, name: "Maker" },
  { xp: 400, name: "Creator" },
  { xp: 650, name: "Innovator" },
];

function loadDB(): DB {
  try {
    const raw = localStorage.getItem(LS_DB);
    if (raw) {
      const parsed = JSON.parse(raw) as DB;
      if (parsed && parsed.version === 1 && Array.isArray(parsed.lessons)) {
        // Migrate: ensure all student states have enrollments and videoProgress
        for (const sid of Object.keys(parsed.students)) {
          if (!parsed.students[sid].enrollments) {
            parsed.students[sid].enrollments = [];
          }
          if (!parsed.students[sid].videoProgress) {
            parsed.students[sid].videoProgress = {};
          }
        }
        // Migrate: ensure videos array exists
        if (!parsed.videos) {
          parsed.videos = [];
        }
        return parsed;
      }
    }
  } catch { /* fall through to seed */ }
  return buildSeedDB();
}

export function gradeQuestion(q: Question, answer: string | undefined): boolean {
  if (answer === undefined || String(answer).trim() === "") return false;
  if (q.kind === "short") {
    const a = answer.toLowerCase();
    if (q.accept && q.accept.length) return q.accept.some((k) => a.includes(k.toLowerCase()));
    return a.length >= 12;
  }
  return answer === q.answer;
}

interface Ctx {
  db: DB;
  user: User | null;
  st: StudentState | null;
  route: Route;
  nav: (r: Route) => void;
  login: (userId: string) => void;
  register: (name: string, email: string) => string | null;
  logout: () => void;
  resetAll: () => void;
  toasts: Toast[];
  toast: (msg: string, kind?: Toast["kind"]) => void;
  dismissToast: (id: string) => void;
  notifOpen: boolean; setNotifOpen: (v: boolean) => void;
  menuOpen: boolean; setMenuOpen: (v: boolean) => void;

  getUser: (id: string) => User | undefined;
  getCourse: (id: string) => Course | undefined;
  getTopic: (id: string) => Topic | undefined;
  getLesson: (id: string) => Lesson | undefined;
  getActivity: (id: string) => Activity | undefined;
  getAssessment: (id: string) => Assessment | undefined;
  getProject: (id: string) => Project | undefined;
  courseLessons: (courseId: string) => Lesson[];
  topicLessons: (topicId: string) => Lesson[];
  coursePct: (courseId: string, userId?: string) => number;
  topicPct: (topicId: string, userId?: string) => number;
  overallPct: (userId?: string) => number;
  topicDone: (topicId: string, userId?: string) => boolean;
  courseDone: (courseId: string, userId?: string) => boolean;
  bestAttempt: (assessmentId: string, userId?: string) => Attempt | undefined;
  nextUp: (userId?: string) => Rec | null;
  upNextQueue: (userId?: string) => Rec[];
  pathStage: (userId?: string) => number;
  careerPct: (career: Career, userId?: string) => number;
  unread: (userId?: string) => number;
  levelInfo: (userId?: string) => { name: string; xp: number; next: number | null; pct: number };
  studentStats: (userId?: string) => { lessons: number; activities: number; avgPct: number | null; projectsDone: number; skills: number };

  activeCourse: () => Course | undefined;
  hasActiveCourse: () => boolean;
  enrollInCourse: (courseId: string) => void;
  completeLesson: (lessonId: string) => void;
  saveActivity: (activityId: string, text: string) => void;
  submitAssessment: (assessmentId: string, answers: Record<string, string>) => Attempt;
  startProject: (projectId: string) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
  submitProject: (projectId: string, text: string, link?: string) => void;
  getVideo: (videoId: string) => Video | undefined;
  getLessonVideos: (lessonId: string) => Video[];
  updateVideoProgress: (videoId: string, position: number, duration: number) => void;
  completeVideo: (videoId: string) => void;
  getVideoProgress: (videoId: string) => { currentPosition: number; percentage: number; completed: boolean } | undefined;
  beginReview: (userId: string, projectId: string) => void;
  reviewProject: (userId: string, projectId: string, verdict: "approved" | "revise", feedback: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  saveLesson: (lesson: Lesson) => void;
  saveVideo: (video: Video) => void;
  deleteVideo: (videoId: string) => void;
  addTopic: (courseId: string, title: string, summary: string) => void;
  addQuestion: (assessmentId: string, q: Question) => void;
  announce: (title: string, body: string) => void;
  pendingQueue: () => { user: User; project: Project; at: number }[];
  courseAvgPct: (courseId: string) => number;
  activeStudents: () => number;
}

const AppCtx = createContext<Ctx | null>(null);

export function useApp(): Ctx {
  const v = useContext(AppCtx);
  if (!v) throw new Error("useApp outside provider");
  return v;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(loadDB);
  const dbRef = useRef(db);
  const [sessionId, setSessionId] = useState<string | null>(() => localStorage.getItem(LS_SESSION));
  const [route, setRoute] = useState<Route>({ name: "dashboard" });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(LS_DB, JSON.stringify(db)); } catch { /* storage full — ignore */ }
  }, [db]);

  const user = db.users.find((u) => u.id === sessionId) ?? null;
  const st = user ? db.students[user.id] ?? null : null;

  const mutate = (fn: (next: DB) => void) => {
    const next = structuredClone(dbRef.current);
    fn(next);
    dbRef.current = next;
    setDb(next);
  };

  const toast = (msg: string, kind: Toast["kind"] = "ok") => {
    const id = newId();
    setToasts((t) => [...t.slice(-3), { id, msg, kind }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  };
  const dismissToast = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));

  const nav = (r: Route) => {
    setRoute(r);
    setMenuOpen(false);
    setNotifOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const pushNotif = (d: DB, userId: string, n: Omit<AppNotification, "id" | "at" | "read">) => {
    const list = d.notifications[userId] ?? (d.notifications[userId] = []);
    list.unshift({ ...n, id: `n-${newId()}`, at: Date.now(), read: false });
  };

  const processEvents = (d: DB, userId: string, events: { kind: string; title: string }[]) => {
    for (const e of events) {
      if (e.kind === "skill") {
        pushNotif(d, userId, { kind: "system", title: "Skill acquired", body: `“${e.title}” is now part of your skill set.` });
        if (userId === sessionId) toast(`Skill acquired — ${e.title}`, "ok");
      } else if (e.kind === "achievement") {
        pushNotif(d, userId, { kind: "achievement", title: "Achievement unlocked", body: `${e.title} — earned and recorded on your profile.` });
        if (userId === sessionId) {
          toast(`Achievement unlocked — ${e.title}`, "trophy");
          confetti({ particleCount: 110, spread: 78, origin: { y: 0.7 }, colors: ["#0e7c6b", "#e8a11c", "#2f5fe3", "#d95f0e"] });
        }
      } else if (e.kind === "certificate") {
        pushNotif(d, userId, { kind: "course", title: "Course completed", body: `${e.title} — completion record issued. See your profile.` });
        if (userId === sessionId) {
          toast(`Course completed — ${e.title}`, "trophy");
          confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ["#e8a11c", "#0e7c6b", "#14181f"] });
        }
      }
    }
  };

  const log = (d: DB, userId: string, type: "lesson" | "activity" | "assessment" | "project" | "system", label: string) => {
    d.log.unshift({ at: Date.now(), userId, type, label });
    if (d.log.length > 200) d.log.length = 200;
  };

  const requireStudent = (): string => {
    if (!user || user.role !== "student") throw new Error("student role required");
    return user.id;
  };

  // ── Enrollment / Active Course ──

  const activeCourse = (): Course | undefined => {
    if (!st?.activeCourseId) return undefined;
    return db.courses.find((c) => c.id === st.activeCourseId);
  };

  const hasActiveCourse = (): boolean => {
    return !!st?.activeCourseId;
  };

  const enrollInCourse = (courseId: string) => {
    const meId = requireStudent();
    const course = db.courses.find((c) => c.id === courseId);
    if (!course) return;
    mutate((d) => {
      const s = d.students[meId];
      // Archive any existing active enrollment
      for (const e of s.enrollments) {
        if (e.status === "active") e.status = "archived";
      }
      // Create new active enrollment
      const existing = s.enrollments.find((e) => e.courseId === courseId);
      if (existing) {
        existing.status = "active";
        existing.enrolledAt = Date.now();
      } else {
        s.enrollments.push({ courseId, status: "active", enrolledAt: Date.now() });
      }
      s.activeCourseId = courseId;
      log(d, meId, "system", `enrolled in ${course.title}`);
      pushNotif(d, meId, { kind: "course", title: "Course enrolled", body: `You are now learning ${course.title}. Your personalized path is ready.` });
    });
    toast(`Enrolled in ${course.title}`, "ok");
  };

  // ── Video Functions ──

  const getVideo = (videoId: string): Video | undefined => {
    return db.videos.find((v) => v.id === videoId);
  };

  const getLessonVideos = (lessonId: string): Video[] => {
    return db.videos
      .filter((v) => v.lessonId === lessonId && v.published)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const updateVideoProgress = (videoId: string, position: number, duration: number) => {
    const meId = requireStudent();
    const percentage = duration > 0 ? Math.min(100, Math.round((position / duration) * 100)) : 0;
    mutate((d) => {
      const s = d.students[meId];
      s.videoProgress[videoId] = {
        videoId,
        currentPosition: position,
        percentage,
        completed: percentage >= 90, // 90% threshold for completion
        lastWatchedAt: Date.now(),
        completedAt: percentage >= 90 && !s.videoProgress[videoId]?.completed ? Date.now() : s.videoProgress[videoId]?.completedAt,
      };
    });
  };

  const completeVideo = (videoId: string) => {
    const meId = requireStudent();
    const video = db.videos.find((v) => v.id === videoId);
    if (!video) return;
    mutate((d) => {
      const s = d.students[meId];
      s.videoProgress[videoId] = {
        videoId,
        currentPosition: video.duration,
        percentage: 100,
        completed: true,
        lastWatchedAt: Date.now(),
        completedAt: Date.now(),
      };
      log(d, meId, "system", `completed video "${video.title}"`);
    });
    toast(`Video complete: ${video.title}`, "ok");
  };

  const getVideoProgress = (videoId: string) => {
    if (!st?.videoProgress[videoId]) return undefined;
    const p = st.videoProgress[videoId];
    return {
      currentPosition: p.currentPosition,
      percentage: p.percentage,
      completed: p.completed,
    };
  };

  // ── Actions ──

  const completeLesson = (lessonId: string) => {
    const meId = requireStudent();
    const lesson = db.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    let events: ReturnType<typeof syncStudent> = [];
    mutate((d) => {
      const s = d.students[meId];
      if (s.lessons[lessonId]) return;
      s.lessons[lessonId] = Date.now();
      s.lastLessonId = lessonId;
      log(d, meId, "lesson", `completed “${lesson.title}”`);
      const courseLessonsList = d.lessons.filter((l) => l.courseId === lesson.courseId).sort((a, b) => {
        const ta = d.topics.findIndex((t) => t.id === a.topicId);
        const tb = d.topics.findIndex((t) => t.id === b.topicId);
        return ta !== tb ? ta - tb : a.order - b.order;
      });
      const nextL = courseLessonsList[courseLessonsList.findIndex((l) => l.id === lessonId) + 1];
      const topicComplete = courseLessonsList.filter((l) => l.topicId === lesson.topicId).every((l) => s.lessons[l.id]);
      const courseComplete = courseLessonsList.every((l) => s.lessons[l.id]);
      if (courseComplete) pushNotif(d, meId, { kind: "course", title: "All lessons complete", body: `Every lesson in ${d.courses.find((c) => c.id === lesson.courseId)?.title} is done. Pass the checkpoint to earn the record.` });
      else if (topicComplete) pushNotif(d, meId, { kind: "content", title: "Topic complete", body: `“${d.topics.find((t) => t.id === lesson.topicId)?.title}” finished${nextL ? ` — next: “${nextL.title}”` : ""}.` });
      else if (nextL) pushNotif(d, meId, { kind: "content", title: "Lesson available", body: `“${nextL.title}” is ready in ${d.topics.find((t) => t.id === lesson.topicId)?.title}.` });
      events = syncStudent(d, meId);
      processEvents(d, meId, events);
    });
    toast("Lesson complete · +10 XP", "ok");
  };

  const saveActivity = (activityId: string, text: string) => {
    const meId = requireStudent();
    const act = db.activities.find((a) => a.id === activityId);
    if (!act) return;
    mutate((d) => {
      const s = d.students[meId];
      s.activities[activityId] = { at: Date.now(), text };
      log(d, meId, "activity", `submitted ${act.title}`);
      processEvents(d, meId, syncStudent(d, meId));
    });
    toast("Activity submitted · +15 XP", "ok");
  };

  const submitAssessment = (assessmentId: string, answers: Record<string, string>): Attempt => {
    const meId = requireStudent();
    const a = db.assessments.find((x) => x.id === assessmentId);
    if (!a) throw new Error("assessment not found");
    let score = 0;
    for (const q of a.questions) if (gradeQuestion(q, answers[q.id])) score += q.points;
    const total = a.questions.reduce((s, q) => s + q.points, 0);
    const pct = Math.round((score / total) * 100);
    const attempt: Attempt = { assessmentId, answers, score, total, pct, pass: pct >= a.passPct, at: Date.now() };
    mutate((d) => {
      d.students[meId].attempts.push(attempt);
      log(d, meId, "assessment", `sat ${a.title} (${pct}%)`);
      if (attempt.pass) pushNotif(d, meId, { kind: "system", title: "Assessment passed", body: `${a.title}: ${pct}% — above the ${a.passPct}% pass mark.` });
      processEvents(d, meId, syncStudent(d, meId));
    });
    return attempt;
  };

  const startProject = (projectId: string) => {
    const meId = requireStudent();
    const p = db.projects.find((x) => x.id === projectId);
    if (!p) return;
    mutate((d) => {
      const s = d.students[meId];
      if (!s.projects[projectId]) s.projects[projectId] = { status: "not_started", milestones: [] };
      s.projects[projectId].status = "in_progress";
      s.projects[projectId].startedAt = Date.now();
      log(d, meId, "project", `started ${p.title}`);
    });
    toast("Project started — milestones unlocked", "ok");
  };

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    const meId = requireStudent();
    const p = db.projects.find((x) => x.id === projectId);
    mutate((d) => {
      const ps = d.students[meId].projects[projectId];
      if (!ps || ps.status !== "in_progress") return;
      if (ps.milestones.includes(milestoneId)) ps.milestones = ps.milestones.filter((m) => m !== milestoneId);
      else {
        ps.milestones.push(milestoneId);
        const ms = p?.milestones.find((m) => m.id === milestoneId);
        log(d, meId, "project", `completed milestone “${ms?.title ?? ""}” (${p?.title})`);
      }
    });
  };

  const submitProject = (projectId: string, text: string, link?: string) => {
    const meId = requireStudent();
    const p = db.projects.find((x) => x.id === projectId);
    if (!p) return;
    mutate((d) => {
      const ps = d.students[meId].projects[projectId];
      if (!ps) return;
      ps.status = "submitted";
      ps.submission = { text, link: link || undefined, at: Date.now() };
      ps.feedback = undefined;
      log(d, meId, "project", `submitted ${p.title}`);
    });
    toast("Submitted — awaiting instructor review", "ok");
  };

  const beginReview = (userId: string, projectId: string) => {
    const p = db.projects.find((x) => x.id === projectId);
    mutate((d) => {
      const ps = d.students[userId]?.projects[projectId];
      if (!ps) return;
      ps.status = "under_review";
      pushNotif(d, userId, { kind: "project", title: "Review started", body: `An instructor is reviewing ${p?.title ?? "your project"}.` });
      log(d, user?.id ?? userId, "system", `began review of ${p?.title} (${d.users.find((u) => u.id === userId)?.name})`);
    });
    toast("Marked as under review", "info");
  };

  const reviewProject = (userId: string, projectId: string, verdict: "approved" | "revise", feedback: string) => {
    const p = db.projects.find((x) => x.id === projectId);
    const by = user?.name ?? "Instructor";
    mutate((d) => {
      const ps = d.students[userId]?.projects[projectId];
      if (!ps) return;
      ps.feedback = { text: feedback, verdict, at: Date.now(), by };
      if (verdict === "approved") {
        ps.status = "completed";
        ps.completedAt = Date.now();
        pushNotif(d, userId, { kind: "project", title: "Project approved", body: `${p?.title} was approved by ${by}. Completion record issued.` });
      } else {
        ps.status = "in_progress";
        pushNotif(d, userId, { kind: "project", title: "Feedback received", body: `${by} requested changes on ${p?.title}. Read the notes and resubmit.` });
      }
      log(d, user?.id ?? userId, "project", `${verdict === "approved" ? "approved" : "requested changes on"} ${p?.title} (${d.users.find((u) => u.id === userId)?.name})`);
      processEvents(d, userId, syncStudent(d, userId));
    });
    toast(verdict === "approved" ? "Project approved · student notified" : "Changes requested · student notified", "ok");
  };

  const markRead = (id: string) => {
    if (!user) return;
    mutate((d) => {
      const n = (d.notifications[user.id] ?? []).find((x) => x.id === id);
      if (n) n.read = true;
    });
  };
  const markAllRead = () => {
    if (!user) return;
    mutate((d) => { (d.notifications[user.id] ?? []).forEach((n) => { n.read = true; }); });
  };

  const saveLesson = (lesson: Lesson) => {
    mutate((d) => {
      const i = d.lessons.findIndex((l) => l.id === lesson.id);
      if (i >= 0) d.lessons[i] = lesson;
      else {
        d.lessons.push(lesson);
        const topicTitle = d.topics.find((t) => t.id === lesson.topicId)?.title ?? "the curriculum";
        for (const u of d.users)
          if (u.role === "student")
            pushNotif(d, u.id, { kind: "content", title: "New lesson published", body: `“${lesson.title}” is now available in ${topicTitle}.` });
      }
      if (user) log(d, user.id, "system", `${i >= 0 ? "updated" : "published"} lesson “${lesson.title}”`);
    });
    toast("Lesson saved to curriculum", "ok");
  };

  const saveVideo = (video: Video) => {
    mutate((d) => {
      const i = d.videos.findIndex((v) => v.id === video.id);
      if (i >= 0) d.videos[i] = video;
      else d.videos.push(video);
      if (user) log(d, user.id, "system", `${i >= 0 ? "updated" : "added"} video "${video.title}"`);
    });
    toast("Video saved", "ok");
  };

  const deleteVideo = (videoId: string) => {
    mutate((d) => {
      const video = d.videos.find((v) => v.id === videoId);
      d.videos = d.videos.filter((v) => v.id !== videoId);
      if (user && video) log(d, user.id, "system", `deleted video "${video.title}"`);
    });
    toast("Video deleted", "ok");
  };

  const addTopic = (courseId: string, title: string, summary: string) => {
    mutate((d) => {
      const order = Math.max(0, ...d.topics.filter((t) => t.courseId === courseId).map((t) => t.order)) + 1;
      d.topics.push({ id: `t-x-${newId()}`, courseId, order, title, summary });
      if (user) log(d, user.id, "system", `added topic “${title}” to ${d.courses.find((c) => c.id === courseId)?.short}`);
    });
    toast("Topic added", "ok");
  };

  const addQuestion = (assessmentId: string, q: Question) => {
    mutate((d) => {
      const a = d.assessments.find((x) => x.id === assessmentId);
      if (a) a.questions.push(q);
      if (user) log(d, user.id, "system", `added a question to ${a?.title}`);
    });
    toast("Question added to assessment", "ok");
  };

  const announce = (title: string, body: string) => {
    mutate((d) => {
      for (const u of d.users) if (u.role === "student") pushNotif(d, u.id, { kind: "announcement", title, body });
      if (user) log(d, user.id, "system", `announced “${title}” to all students`);
    });
    toast("Announcement sent to all students", "ok");
  };

  const login = (userId: string) => {
    const u = db.users.find((x) => x.id === userId);
    if (!u) return;
    localStorage.setItem(LS_SESSION, userId);
    setSessionId(userId);
    setRoute({ name: u.role === "student" ? "dashboard" : "admin" });
    window.scrollTo(0, 0);
    toast(`Signed in as ${u.name} · ${u.role}`, "info");
  };

  const register = (name: string, email: string): string | null => {
    const nm = name.trim();
    const em = email.trim().toLowerCase();
    if (nm.length < 2) return "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return "Enter a valid email address.";
    if (db.users.some((u) => u.email.toLowerCase() === em)) return "That email is already registered — use cohort sign-in.";
    const id = `u-${newId()}`;
    const hue = Math.floor(Math.random() * 360);
    mutate((d) => {
      d.users.push({ id, name: nm, email: em, role: "student", hue, joinedAt: Date.now(), active: true, title: "Student · Self-enrolled" });
      d.students[id] = { lessons: {}, activities: {}, attempts: [], projects: {}, skills: {}, achievements: {}, certificates: [], xp: 0, enrollments: [], videoProgress: {} };
      const list = d.notifications[id] ?? (d.notifications[id] = []);
      list.unshift({
        id: `n-${newId()}`, at: Date.now(), read: false, kind: "system",
        title: "Welcome to TechFoundry",
        body: "Your workspace is ready. Four courses are open — most builders start with Artificial Intelligence, then follow the path.",
      });
      log(d, id, "system", "joined the platform");
    });
    localStorage.setItem(LS_SESSION, id);
    setSessionId(id);
    setRoute({ name: "dashboard" });
    window.scrollTo(0, 0);
    toast(`Workspace created — welcome, ${nm.split(" ")[0]}`, "ok");
    return null;
  };

  const logout = () => {
    localStorage.removeItem(LS_SESSION);
    setSessionId(null);
    setRoute({ name: "dashboard" });
  };

  const resetAll = () => {
    localStorage.removeItem(LS_DB);
    localStorage.removeItem(LS_SESSION);
    window.location.reload();
  };

  // ── Selectors ──

  const stateOf = (userId?: string): StudentState | null => {
    const id = userId ?? user?.id;
    return id ? db.students[id] ?? null : null;
  };

  const courseLessons = (courseId: string) =>
    db.lessons.filter((l) => l.courseId === courseId).sort((a, b) => {
      const ta = db.topics.findIndex((t) => t.id === a.topicId);
      const tb = db.topics.findIndex((t) => t.id === b.topicId);
      return ta !== tb ? ta - tb : a.order - b.order;
    });

  const topicLessons = (topicId: string) => db.lessons.filter((l) => l.topicId === topicId).sort((a, b) => a.order - b.order);

  const coursePct = (courseId: string, userId?: string) => {
    const s = stateOf(userId);
    const ls = courseLessons(courseId);
    if (!s || ls.length === 0) return 0;
    return Math.round((ls.filter((l) => s.lessons[l.id]).length / ls.length) * 100);
  };
  const topicPct = (topicId: string, userId?: string) => {
    const s = stateOf(userId);
    const ls = topicLessons(topicId);
    if (!s || ls.length === 0) return 0;
    return Math.round((ls.filter((l) => s.lessons[l.id]).length / ls.length) * 100);
  };
  const overallPct = (userId?: string) => {
    const s = stateOf(userId);
    if (!s || db.lessons.length === 0) return 0;
    return Math.round((Object.keys(s.lessons).filter((id) => db.lessons.some((l) => l.id === id)).length / db.lessons.length) * 100);
  };
  const topicDone = (topicId: string, userId?: string) => topicPct(topicId, userId) === 100;
  const courseDone = (courseId: string, userId?: string) => coursePct(courseId, userId) === 100;

  const bestAttempt = (assessmentId: string, userId?: string) => {
    const s = stateOf(userId);
    const list = (s?.attempts ?? []).filter((a) => a.assessmentId === assessmentId);
    return list.length ? list.reduce((m, a) => (a.pct > m.pct ? a : m)) : undefined;
  };

  const nextUp = (userId?: string): Rec | null => {
    const s = stateOf(userId);
    if (!s) return null;
    const findLessonRec = (l: Lesson): Rec => ({
      kind: "lesson", id: l.id, label: l.title,
      sub: `${db.courses.find((c) => c.id === l.courseId)?.short} · ${db.topics.find((t) => t.id === l.topicId)?.title}`,
      courseId: l.courseId,
    });
    // Use active course if settled, otherwise fall back to ordered courses
    const activeCourseId = s.activeCourseId;
    if (activeCourseId) {
      // Only look at the active course
      const next = courseLessons(activeCourseId).find((l) => !s.lessons[l.id]);
      if (next) return findLessonRec(next);
      // Check checkpoint for active course
      const cp = db.assessments.find((a) => a.courseId === activeCourseId && a.kind === "Checkpoint" && !(bestAttempt(a.id, userId)?.pass));
      if (cp) return { kind: "assessment", id: cp.id, label: cp.title, sub: "Final checkpoint", courseId: cp.courseId };
      // Check projects for active course
      const proj = db.projects.find((p) => p.courseIds.includes(activeCourseId) && (!(s.projects[p.id]?.status) || s.projects[p.id]?.status === "not_started"));
      if (proj) return { kind: "project", id: proj.id, label: proj.title, sub: "Project · not started" };
      return null;
    }
    // Fallback for students without active course (legacy behavior)
    const ordered = [...db.lessons].sort((a, b) => {
      const ca = db.courses.findIndex((c) => c.id === a.courseId);
      const cb = db.courses.findIndex((c) => c.id === b.courseId);
      if (ca !== cb) return ca - cb;
      const ta = db.topics.findIndex((t) => t.id === a.topicId);
      const tb = db.topics.findIndex((t) => t.id === b.topicId);
      return ta !== tb ? ta - tb : a.order - b.order;
    });
    const lastCourse = s.lastLessonId ? ordered.find((l) => l.id === s.lastLessonId)?.courseId : undefined;
    const courseOrder = [...db.courses].sort((a, b) => a.order - b.order).map((c) => c.id);
    const tryCourses = lastCourse ? [lastCourse, ...courseOrder.filter((c) => c !== lastCourse)] : courseOrder;
    for (const cid of tryCourses) {
      const next = courseLessons(cid).find((l) => !s.lessons[l.id]);
      if (next) return findLessonRec(next);
    }
    const cp = db.assessments.find((a) => a.kind === "Checkpoint" && !(bestAttempt(a.id, userId)?.pass));
    if (cp) return { kind: "assessment", id: cp.id, label: cp.title, sub: "Final checkpoint", courseId: cp.courseId };
    const proj = db.projects.find((p) => !(s.projects[p.id]?.status) || s.projects[p.id]?.status === "not_started");
    if (proj) return { kind: "project", id: proj.id, label: proj.title, sub: "Project · not started" };
    return null;
  };

  const upNextQueue = (userId?: string): Rec[] => {
    const s = stateOf(userId);
    if (!s) return [];
    const out: Rec[] = [];
    const seen = new Set<string>();
    const push = (r: Rec | null) => {
      if (!r) return;
      const k = `${r.kind}:${r.id}`;
      if (!seen.has(k)) { seen.add(k); out.push(r); }
    };
    const nu = nextUp(userId);
    push(nu);
    // If student has active course, only show items from that course
    const activeCourseId = s.activeCourseId;
    if (activeCourseId) {
      // In-progress projects for active course
      for (const [pid, ps] of Object.entries(s.projects)) {
        if (ps.status !== "in_progress") continue;
        const p = db.projects.find((x) => x.id === pid);
        if (!p || !p.courseIds.includes(activeCourseId)) continue;
        push({ kind: "project", id: pid, label: p.title, sub: `${ps.milestones.length}/${p.milestones.length} milestones · in progress` });
      }
      // Open assessments for active course
      for (const a of db.assessments.filter((x) => x.courseId === activeCourseId)) {
        if (!bestAttempt(a.id, userId)?.pass)
          push({ kind: "assessment", id: a.id, label: a.title, sub: `${a.kind} · ${a.questions.length} questions · pass ${a.passPct}%`, courseId: activeCourseId });
      }
      // Activities for active course topics
      for (const a of db.activities.filter((x) => x.courseId === activeCourseId)) {
        if (s.activities[a.id]) continue;
        if (topicPct(a.topicId, userId) > 0 || coursePct(activeCourseId, userId) > 0)
          push({ kind: "activity", id: a.id, label: a.title, sub: `Practical · ${a.kind.toLowerCase()} · ${a.minutes} min`, courseId: activeCourseId });
      }
      // Projects not yet started for active course
      for (const p of db.projects.filter((x) => x.courseIds.includes(activeCourseId))) {
        const ps = s.projects[p.id];
        if (!ps || ps.status === "not_started")
          push({ kind: "project", id: p.id, label: p.title, sub: `${p.difficulty} project · ~${p.hours} h` });
      }
    } else {
      // Fallback for students without active course (legacy behavior)
      // In-progress projects with open milestones.
      for (const [pid, ps] of Object.entries(s.projects)) {
        if (ps.status !== "in_progress") continue;
        const p = db.projects.find((x) => x.id === pid);
        if (!p) continue;
        push({ kind: "project", id: pid, label: p.title, sub: `${ps.milestones.length}/${p.milestones.length} milestones · in progress` });
      }
      // Open assessments for courses already started.
      for (const c of db.courses) {
        if (coursePct(c.id, userId) === 0) continue;
        for (const a of db.assessments.filter((x) => x.courseId === c.id)) {
          if (!bestAttempt(a.id, userId)?.pass)
            push({ kind: "assessment", id: a.id, label: a.title, sub: `${a.kind} · ${a.questions.length} questions · pass ${a.passPct}%`, courseId: c.id });
        }
      }
      // Activities whose topic is at least started.
      for (const a of db.activities) {
        if (s.activities[a.id]) continue;
        if (topicPct(a.topicId, userId) > 0 || coursePct(a.courseId, userId) > 0)
          push({ kind: "activity", id: a.id, label: a.title, sub: `Practical · ${a.kind.toLowerCase()} · ${a.minutes} min`, courseId: a.courseId });
      }
      // Projects not yet started.
      for (const p of db.projects) {
        const ps = s.projects[p.id];
        if (!ps || ps.status === "not_started")
          push({ kind: "project", id: p.id, label: p.title, sub: `${p.difficulty} project · ~${p.hours} h` });
      }
    }
    return out.slice(0, 5);
  };

  const pathStage = (userId?: string): number => {
    const s = stateOf(userId);
    if (!s) return 0;
    const n = Object.keys(s.lessons).length;
    const coursesTouched = new Set(Object.keys(s.lessons).map((id) => db.lessons.find((l) => l.id === id)?.courseId).filter(Boolean)).size;
    const acts = Object.keys(s.activities).length;
    const started = Object.values(s.projects).filter((p) => p.status !== "not_started").length;
    const attempts = s.attempts.length;
    const skills = Object.keys(s.skills).length;
    const cap = s.projects["p-cap-1"];
    const innPct = coursePct("c-di", userId);
    // Stages are earned, not skipped: count how many the student has genuinely reached.
    let stage = 0;
    if (n >= 1) stage += 1;
    if (coursesTouched >= 2) stage += 1;
    if (n >= 6) stage += 1;
    if (acts >= 2) stage += 1;
    if (started >= 1) stage += 1;
    if (attempts >= 2) stage += 1;
    if (skills >= 8) stage += 1;
    if (cap && cap.status !== "not_started") stage += 1;
    if ((cap && cap.status === "completed") || innPct >= 50) stage += 1;
    return stage;
  };

  const careerPct = (career: Career, userId?: string) => {
    const s = stateOf(userId);
    if (!s) return 0;
    const hit = career.skills.filter((id) => s.skills[id]).length;
    return Math.round((hit / career.skills.length) * 100);
  };

  const unread = (userId?: string) => {
    const id = userId ?? user?.id;
    return id ? (db.notifications[id] ?? []).filter((n) => !n.read).length : 0;
  };

  const levelInfo = (userId?: string) => {
    const xp = stateOf(userId)?.xp ?? 0;
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) idx = i;
    const cur = LEVELS[idx];
    const nextL = LEVELS[idx + 1] ?? null;
    return { name: cur.name, xp, next: nextL ? nextL.xp : null, pct: nextL ? Math.min(100, Math.round(((xp - cur.xp) / (nextL.xp - cur.xp)) * 100)) : 100 };
  };

  const studentStats = (userId?: string) => {
    const s = stateOf(userId);
    const lessons = s ? Object.keys(s.lessons).length : 0;
    const activities = s ? Object.keys(s.activities).length : 0;
    const attempts = s?.attempts ?? [];
    const avgPct = attempts.length ? Math.round(attempts.reduce((x, a) => x + a.pct, 0) / attempts.length) : null;
    const projectsDone = s ? Object.values(s.projects).filter((p) => p.status === "completed").length : 0;
    const skills = s ? Object.keys(s.skills).length : 0;
    return { lessons, activities, avgPct, projectsDone, skills };
  };

  const pendingQueue = () => {
    const out: { user: User; project: Project; at: number }[] = [];
    for (const u of db.users) {
      if (u.role !== "student") continue;
      const s = db.students[u.id];
      if (!s) continue;
      for (const [pid, ps] of Object.entries(s.projects)) {
        if (ps.status === "submitted" || ps.status === "under_review") {
          const p = db.projects.find((x) => x.id === pid);
          if (p) out.push({ user: u, project: p, at: ps.submission?.at ?? Date.now() });
        }
      }
    }
    return out.sort((a, b) => b.at - a.at);
  };

  const courseAvgPct = (courseId: string) => {
    const ids = db.users.filter((u) => u.role === "student").map((u) => u.id);
    if (!ids.length) return 0;
    return Math.round(ids.reduce((s, id) => s + coursePct(courseId, id), 0) / ids.length);
  };

  const activeStudents = () => {
    const cutoff = Date.now() - 7 * 86_400_000;
    const ids = new Set(db.log.filter((e) => e.at >= cutoff).map((e) => e.userId));
    return db.users.filter((u) => u.role === "student" && ids.has(u.id)).length;
  };

  const value: Ctx = {
    db, user, st, route, nav, login, register, logout, resetAll,
    toasts, toast, dismissToast, notifOpen, setNotifOpen, menuOpen, setMenuOpen,
    getUser: (id) => db.users.find((u) => u.id === id),
    getCourse: (id) => db.courses.find((c) => c.id === id),
    getTopic: (id) => db.topics.find((t) => t.id === id),
    getLesson: (id) => db.lessons.find((l) => l.id === id),
    getActivity: (id) => db.activities.find((a) => a.id === id),
    getAssessment: (id) => db.assessments.find((a) => a.id === id),
    getProject: (id) => db.projects.find((p) => p.id === id),
    getVideo: (id) => db.videos.find((v) => v.id === id),
    getLessonVideos: (lessonId) => db.videos.filter((v) => v.lessonId === lessonId && v.published).sort((a, b) => a.sortOrder - b.sortOrder),
    courseLessons, topicLessons, coursePct, topicPct, overallPct, topicDone, courseDone,
    bestAttempt, nextUp, upNextQueue, pathStage, careerPct, unread, levelInfo, studentStats,
    activeCourse, hasActiveCourse, enrollInCourse,
    completeLesson, saveActivity, submitAssessment, startProject, toggleMilestone, submitProject,
    updateVideoProgress, completeVideo, getVideoProgress,
    beginReview, reviewProject, markRead, markAllRead, saveLesson, saveVideo, deleteVideo, addTopic, addQuestion, announce,
    pendingQueue, courseAvgPct, activeStudents,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

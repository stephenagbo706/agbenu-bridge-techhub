// ─── TechFoundry domain model ────────────────────────────────────────────────
// Mirrors the production content architecture:
// PROGRAM → COURSE → TOPIC → LESSON → ACTIVITY → ASSESSMENT → PROJECT → SKILL

export type Role = "student" | "instructor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  hue: number; // avatar hue
  joinedAt: number;
  active: boolean;
  title: string;
}

export interface Course {
  id: string;
  code: string; // e.g. AI-101
  title: string;
  short: string; // short label for chips
  tagline: string;
  description: string;
  color: string; // hex accent
  level: string;
  hours: number;
  objectives: string[];
  order: number;
}

export interface Topic {
  id: string;
  courseId: string;
  order: number;
  title: string;
  summary: string;
}

export interface KnowledgeCheck {
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  topicId: string;
  order: number;
  title: string;
  minutes: number;
  summary: string;
  why: string; // "why does it matter?"
  objectives: string[];
  sections: { h: string; p: string }[];
  example: { title: string; body: string; code?: string };
  terms: [string, string][];
  activityHint?: string; // "can I build something with it?"
  check: KnowledgeCheck;
}

export interface Activity {
  id: string;
  courseId: string;
  topicId: string;
  title: string;
  kind: "Prompt" | "Design" | "Build" | "Business";
  brief: string;
  deliverables: string[];
  minutes: number;
}

export type QuestionKind = "mcq" | "tf" | "short";

export interface Question {
  id: string;
  kind: QuestionKind;
  prompt: string;
  options?: string[]; // mcq
  answer: string; // mcq: option text · tf: "True"/"False" · short: model answer
  accept?: string[]; // short: accepted keywords (any match = correct)
  explain: string;
  points: number;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  kind: "Quiz" | "Checkpoint";
  minutes: number;
  passPct: number;
  questions: Question[];
}

export interface Milestone {
  id: string;
  title: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  brief: string;
  objectives: string[];
  courseIds: string[]; // supports cross-course projects
  roles?: { courseId: string; role: string }[]; // cross-course contribution map
  milestones: Milestone[];
  difficulty: "Guided" | "Independent" | "Capstone";
  hours: number;
}

export interface Skill {
  id: string;
  domain: "Artificial Intelligence" | "Robotics & IoT" | "Software Engineering" | "Digital Innovation" | "Integration";
  name: string;
  via: { lessons?: string[]; assessment?: string; project?: string };
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  metric: string;
}

// ─── Per-student state ───────────────────────────────────────────────────────

export type ProjectStatus = "not_started" | "in_progress" | "submitted" | "under_review" | "completed";

export interface ProjectState {
  status: ProjectStatus;
  startedAt?: number;
  completedAt?: number;
  milestones: string[]; // completed milestone ids
  submission?: { text: string; link?: string; at: number };
  feedback?: { text: string; verdict: "approved" | "revise"; at: number; by: string };
}

export interface Attempt {
  assessmentId: string;
  answers: Record<string, string>; // questionId → answer
  score: number;
  total: number;
  pct: number;
  pass: boolean;
  at: number;
}

export interface Certificate {
  id: string;
  courseId: string;
  at: number;
}

export interface StudentState {
  lessons: Record<string, number>; // lessonId → completedAt
  activities: Record<string, { at: number; text: string }>;
  attempts: Attempt[];
  projects: Record<string, ProjectState>;
  skills: Record<string, number>; // skillId → earnedAt
  achievements: Record<string, number>; // achievementId → earnedAt
  certificates: Certificate[];
  xp: number;
  lastLessonId?: string;
}

export interface AppNotification {
  id: string;
  at: number;
  kind: "achievement" | "course" | "project" | "content" | "announcement" | "system";
  title: string;
  body: string;
  read: boolean;
}

export interface ActivityEvent {
  at: number;
  userId: string;
  type: "lesson" | "activity" | "assessment" | "project" | "system";
  label: string;
}

export interface DB {
  version: number;
  users: User[];
  courses: Course[];
  topics: Topic[];
  lessons: Lesson[];
  activities: Activity[];
  assessments: Assessment[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  students: Record<string, StudentState>;
  notifications: Record<string, AppNotification[]>;
  log: ActivityEvent[];
}

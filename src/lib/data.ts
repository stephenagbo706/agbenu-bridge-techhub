import type {
  Achievement, ActivityEvent, AppNotification, DB, Lesson, Project, Skill, StudentState, User, Video,
} from "./types";
import { ASSESSMENTS, ACTIVITIES, COURSES, LESSONS, TOPICS } from "./seed-content";

// ─── Course presentation metadata (literal Tailwind classes for v4 scanning) ─

export interface CourseMeta {
  dot: string; bar: string; text: string; chip: string; softBg: string; hex: string; icon: "spark" | "robot" | "code" | "bulb";
}
export const COURSE_META: Record<string, CourseMeta> = {
  "c-ai":  { dot: "bg-ai",  bar: "bg-ai",  text: "text-ai",  chip: "bg-ai-soft text-ai",  softBg: "bg-ai-soft",  hex: "#2f5fe3", icon: "spark" },
  "c-rob": { dot: "bg-rob", bar: "bg-rob", text: "text-rob", chip: "bg-rob-soft text-rob", softBg: "bg-rob-soft", hex: "#d95f0e", icon: "robot" },
  "c-se":  { dot: "bg-se",  bar: "bg-se",  text: "text-se",  chip: "bg-se-soft text-se",  softBg: "bg-se-soft",  hex: "#1b8a4c", icon: "code" },
  "c-di":  { dot: "bg-di",  bar: "bg-di",  text: "text-di",  chip: "bg-di-soft text-di",  softBg: "bg-di-soft",  hex: "#c2317e", icon: "bulb" },
};

export const courseMeta = (id: string): CourseMeta => COURSE_META[id] ?? COURSE_META["c-ai"];

// ─── Projects (including the cross-course capstone) ─────────────────────────

export const PROJECTS: Project[] = [
  {
    id: "p-ai-1", code: "PRJ-AI-01", title: "Everyday AI Prompt Toolkit",
    brief:
      "Build a personal library of five engineered prompts that solve real, recurring problems for you or someone you know — study planning, budgeting, meal prep, revision, scheduling. Each prompt must use the five-part structure (role, context, task, format, constraints), be iterated at least twice, and its accepted output verified by hand.",
    objectives: [
      "Apply the five-part prompt structure to genuine problems",
      "Demonstrate a versioned test–evaluate–refine loop per prompt",
      "Verify AI output against primary sources before accepting it",
      "Produce a reusable prompt library documented for others",
    ],
    courseIds: ["c-ai"], difficulty: "Guided", hours: 3,
    milestones: [
      { id: "p-ai-1-m1", title: "Choose 5 real problems and draft v1 prompts" },
      { id: "p-ai-1-m2", title: "Run, evaluate, and iterate each prompt at least twice" },
      { id: "p-ai-1-m3", title: "Annotate each prompt with its five structural parts" },
      { id: "p-ai-1-m4", title: "Write verification notes: what you checked by hand for each output" },
    ],
  },
  {
    id: "p-ai-2", code: "PRJ-AI-02", title: "Build an AI Chatbot",
    brief: "Design a small chatbot for a real support, study, or service task. Define the user, write sample questions, design the response style, and test the bot with normal and difficult prompts.",
    objectives: ["Define chatbot purpose and user", "Create intents and sample questions", "Design helpful, safe response rules", "Test the bot with at least five conversations"],
    courseIds: ["c-ai"], difficulty: "Guided", hours: 4,
    milestones: [
      { id: "p-ai-2-m1", title: "User problem and chatbot purpose" },
      { id: "p-ai-2-m2", title: "Intent list with sample user questions" },
      { id: "p-ai-2-m3", title: "Response style, safety rules, and fallback behavior" },
      { id: "p-ai-2-m4", title: "Five tested conversations with improvements" },
    ],
  },
  {
    id: "p-ai-3", code: "PRJ-AI-03", title: "Build a Simple Recommendation System",
    brief: "Create a recommendation logic for books, courses, songs, videos, or careers. Use user preferences as inputs and explain why each recommendation is produced.",
    objectives: ["Collect preference inputs", "Create matching or scoring rules", "Return ranked recommendations", "Explain and test recommendation quality"],
    courseIds: ["c-ai"], difficulty: "Guided", hours: 4,
    milestones: [
      { id: "p-ai-3-m1", title: "Recommendation domain and user preference fields" },
      { id: "p-ai-3-m2", title: "Item list with tags or features" },
      { id: "p-ai-3-m3", title: "Scoring logic and ranked output" },
      { id: "p-ai-3-m4", title: "Three user profiles tested and explained" },
    ],
  },
  {
    id: "p-ai-4", code: "PRJ-AI-04", title: "Build an Image Classifier",
    brief: "Prototype an image classifier that separates a small set of categories. Document the classes, example images, expected labels, and how the classifier should respond when uncertain.",
    objectives: ["Choose image classes", "Prepare example inputs", "Design classification output", "Test correct, incorrect, and uncertain examples"],
    courseIds: ["c-ai"], difficulty: "Independent", hours: 5,
    milestones: [
      { id: "p-ai-4-m1", title: "Class list and example image plan" },
      { id: "p-ai-4-m2", title: "Input and output interface sketch" },
      { id: "p-ai-4-m3", title: "Classifier prototype or workflow" },
      { id: "p-ai-4-m4", title: "Test results with uncertainty notes" },
    ],
  },
  {
    id: "p-ai-5", code: "PRJ-AI-05", title: "Build a Sentiment Detector",
    brief: "Build a text sentiment detector for reviews, comments, or messages. It should classify text as positive, neutral, or negative and explain the evidence.",
    objectives: ["Define sentiment labels", "Create a sample text dataset", "Classify and explain sentiment", "Test edge cases such as sarcasm or mixed feedback"],
    courseIds: ["c-ai"], difficulty: "Guided", hours: 3,
    milestones: [
      { id: "p-ai-5-m1", title: "Sentiment labels and example texts" },
      { id: "p-ai-5-m2", title: "Classification rules or prompt" },
      { id: "p-ai-5-m3", title: "Output format with evidence words" },
      { id: "p-ai-5-m4", title: "Edge-case testing notes" },
    ],
  },
  {
    id: "p-ai-6", code: "PRJ-AI-06", title: "Build an AI Study Assistant",
    brief: "Design an assistant that turns a learner's topic, goals, weak areas, and time available into a study plan with practice questions.",
    objectives: ["Gather learner context", "Generate a structured study plan", "Create practice questions", "Verify the plan is realistic and topic-specific"],
    courseIds: ["c-ai"], difficulty: "Guided", hours: 4,
    milestones: [
      { id: "p-ai-6-m1", title: "Learner input form and constraints" },
      { id: "p-ai-6-m2", title: "Study-plan prompt or workflow" },
      { id: "p-ai-6-m3", title: "Practice question generator" },
      { id: "p-ai-6-m4", title: "Verification notes from two study scenarios" },
    ],
  },
  {
    id: "p-ai-7", code: "PRJ-AI-07", title: "Build an AI Prompt Generator",
    brief: "Create a tool that helps users build strong prompts by collecting role, context, task, output format, and constraints, then assembling a reusable prompt.",
    objectives: ["Use the five-part prompt structure", "Collect user constraints", "Generate a clean final prompt", "Test prompt quality across different tasks"],
    courseIds: ["c-ai"], difficulty: "Guided", hours: 3,
    milestones: [
      { id: "p-ai-7-m1", title: "Prompt generator input fields" },
      { id: "p-ai-7-m2", title: "Prompt assembly template" },
      { id: "p-ai-7-m3", title: "Three generated prompts for different use cases" },
      { id: "p-ai-7-m4", title: "Quality review and refinement notes" },
    ],
  },
  {
    id: "p-ai-8", code: "PRJ-AI-08", title: "Build an AI Career Assistant",
    brief: "Build a career assistant that maps a learner's interests, strengths, skills, and goals to possible technology careers with a next-step learning plan.",
    objectives: ["Collect learner profile data", "Match profile to career paths", "Explain recommendations", "Generate next learning steps"],
    courseIds: ["c-ai"], difficulty: "Independent", hours: 5,
    milestones: [
      { id: "p-ai-8-m1", title: "Learner profile fields and career list" },
      { id: "p-ai-8-m2", title: "Matching logic or prompt" },
      { id: "p-ai-8-m3", title: "Recommendation output with explanations" },
      { id: "p-ai-8-m4", title: "Next-step learning plan and test profiles" },
    ],
  },
  {
    id: "p-rb-1", code: "PRJ-RB-01", title: "Smart Plant Monitor",
    brief:
      "Design (and prototype where hardware allows) a sensor-based automation that keeps a plant healthy: measure soil moisture and light, apply control rules with hysteresis to a water pump or alert, and document the full sense–think–act loop with requirements, a bill of materials, and a test plan.",
    objectives: [
      "Write testable requirements and a priced bill of materials",
      "Select and calibrate sensors for soil moisture and light",
      "Design threshold rules with hysteresis bands — no chattering",
      "Specify failure modes (dead sensor, dry pump) with guards for each",
    ],
    courseIds: ["c-rob"], difficulty: "Guided", hours: 4,
    milestones: [
      { id: "p-rb-1-m1", title: "Requirements (testable) + bill of materials" },
      { id: "p-rb-1-m2", title: "Sense–think–act diagram with sensor calibration plan" },
      { id: "p-rb-1-m3", title: "Control rules with at least one hysteresis band" },
      { id: "p-rb-1-m4", title: "Test plan + two failure modes with guards" },
    ],
  },
  {
    id: "p-se-1", code: "PRJ-SE-01", title: "Personal Portfolio Site",
    brief:
      "Design, build, and deploy a one-page portfolio that presents you as a technology builder: who you are, what you are learning, and the projects you have shipped. Semantic HTML, mobile-first CSS, at least one JavaScript-driven interaction, and a live deployed URL tested on two devices.",
    objectives: [
      "Structure content semantically before styling it",
      "Apply mobile-first responsive layout that works at 360px",
      "Implement real state-driven UI behavior with JavaScript",
      "Deploy publicly and verify on phone and laptop",
    ],
    courseIds: ["c-se"], difficulty: "Independent", hours: 5,
    milestones: [
      { id: "p-se-1-m1", title: "Content inventory + wireframe" },
      { id: "p-se-1-m2", title: "Semantic HTML structure complete" },
      { id: "p-se-1-m3", title: "Mobile-first responsive CSS (tested at 360px)" },
      { id: "p-se-1-m4", title: "JavaScript interaction wired to state" },
      { id: "p-se-1-m5", title: "Deployed URL, verified on two devices" },
    ],
  },
  {
    id: "p-di-1", code: "PRJ-DI-01", title: "Campus Problem Pitch",
    brief:
      "Hunt for real friction on your campus or in your community, frame the strongest problem you find, map a full Business Model Canvas for a digital solution, name the riskiest box, design the cheapest experiment that tests it — and deliver a three-minute pitch.",
    objectives: [
      "Document three observed workarounds as problem evidence",
      "Write a problem statement with who / frequency / current cost",
      "Complete all nine canvas blocks and name the riskiest one",
      "Design a validation experiment with a pre-committed pass mark",
    ],
    courseIds: ["c-di"], difficulty: "Guided", hours: 3,
    milestones: [
      { id: "p-di-1-m1", title: "Three observed workarounds, described concretely" },
      { id: "p-di-1-m2", title: "Problem statement passing the worth-solving test" },
      { id: "p-di-1-m3", title: "Nine-block canvas + named risk box" },
      { id: "p-di-1-m4", title: "Experiment design with pre-committed success criterion" },
      { id: "p-di-1-m5", title: "Three-minute pitch (5 slides max)" },
    ],
  },
  {
    id: "p-cap-1", code: "PRJ-CAP-01", title: "Smart Agriculture System",
    brief:
      "The capstone integrates all four technology areas into one working solution: an IoT sensor rig monitors soil and climate, a web application displays live telemetry, an AI layer analyses the data and issues planting or watering recommendations, and a business model turns the system into a viable product for small farms. This is what the four-course structure is for.",
    objectives: [
      "Design the sensor-to-cloud data flow (IoT + microcontrollers)",
      "Build an application that stores and visualises live telemetry (software)",
      "Specify an AI recommendation layer trained or prompted from the data (AI)",
      "Produce a business model with segment, channel, and revenue logic (innovation)",
      "Integrate all parts into one demonstrable system with a pitch",
    ],
    courseIds: ["c-ai", "c-rob", "c-se", "c-di"], difficulty: "Capstone", hours: 12,
    roles: [
      { courseId: "c-rob", role: "Connect soil, moisture and climate sensors; design the device-to-cloud flow" },
      { courseId: "c-se", role: "Build the application: API, database, and live dashboard" },
      { courseId: "c-ai", role: "Analyse collected data; generate predictions and recommendations" },
      { courseId: "c-di", role: "Develop the business model and launch plan for the solution" },
    ],
    milestones: [
      { id: "p-cap-1-m1", title: "Sensor rig spec + MQTT data-flow design" },
      { id: "p-cap-1-m2", title: "Application with live telemetry dashboard" },
      { id: "p-cap-1-m3", title: "AI recommendation logic on collected data" },
      { id: "p-cap-1-m4", title: "Business model canvas + pricing logic" },
      { id: "p-cap-1-m5", title: "Integrated demo + five-minute pitch" },
    ],
  },
];

// ─── Skills — what a student can actually DO ────────────────────────────────

export const SKILLS: Skill[] = [
  { id: "sk-ai-core",   domain: "Artificial Intelligence", name: "AI Foundations", via: { lessons: ["l-ai-1", "l-ai-2"] } },
  { id: "sk-ai-gen",    domain: "Artificial Intelligence", name: "Generative AI Workflow", via: { lessons: ["l-ai-3", "l-ai-4"] } },
  { id: "sk-ai-prompt", domain: "Artificial Intelligence", name: "Prompt Engineering", via: { lessons: ["l-ai-5", "l-ai-6"] } },
  { id: "sk-ai-ml",     domain: "Artificial Intelligence", name: "Machine Learning Concepts", via: { lessons: ["l-ai-7", "l-ai-8"] } },
  { id: "sk-ai-resp",   domain: "Artificial Intelligence", name: "Responsible AI Practice", via: { lessons: ["l-ai-9", "l-ai-10"] } },
  { id: "sk-ai-project", domain: "Artificial Intelligence", name: "AI Project Builder", via: { lessons: ["l-ai-13"], project: "p-ai-2" } },
  { id: "sk-ai-code-tools", domain: "Artificial Intelligence", name: "AI Coding Tools Workflow", via: { lessons: ["l-ai-14", "l-ai-15", "l-ai-16", "l-ai-17", "l-ai-18", "l-ai-19", "l-ai-20", "l-ai-21", "l-ai-22", "l-ai-23", "l-ai-24", "l-ai-25"] } },

  { id: "sk-rb-loop",  domain: "Robotics & IoT", name: "Sense–Think–Act Design", via: { lessons: ["l-rb-1", "l-rb-2"] } },
  { id: "sk-rb-elec",  domain: "Robotics & IoT", name: "Electronics & Sensors", via: { lessons: ["l-rb-3", "l-rb-4"] } },
  { id: "sk-rb-mcu",   domain: "Robotics & IoT", name: "Microcontroller Programming", via: { lessons: ["l-rb-5", "l-rb-6"] } },
  { id: "sk-rb-iot",   domain: "Robotics & IoT", name: "IoT Systems Design", via: { lessons: ["l-rb-7", "l-rb-8"] } },
  { id: "sk-rb-auto",  domain: "Robotics & IoT", name: "Automation & Control", via: { lessons: ["l-rb-9", "l-rb-10"] } },
  { id: "sk-rb-build", domain: "Robotics & IoT", name: "Hardware Build & Test", via: { lessons: ["l-rb-11", "l-rb-12"], project: "p-rb-1" } },

  { id: "sk-se-prog",   domain: "Software Engineering", name: "Programming Fundamentals", via: { lessons: ["l-se-1", "l-se-2"] } },
  { id: "sk-se-web",    domain: "Software Engineering", name: "Web Development", via: { lessons: ["l-se-3", "l-se-4"] } },
  { id: "sk-se-mobile", domain: "Software Engineering", name: "Mobile Development", via: { lessons: ["l-se-5", "l-se-6"] } },
  { id: "sk-se-eng",    domain: "Software Engineering", name: "Engineering Practice (tests + review)", via: { lessons: ["l-se-7", "l-se-8"] } },
  { id: "sk-se-data",   domain: "Software Engineering", name: "Databases & API Design", via: { lessons: ["l-se-9", "l-se-10"] } },
  { id: "sk-se-git",    domain: "Software Engineering", name: "Version Control & Collaboration", via: { lessons: ["l-se-11", "l-se-12"] } },

  { id: "sk-di-prod",   domain: "Digital Innovation", name: "Digital Product Development", via: { lessons: ["l-di-1", "l-di-2"] } },
  { id: "sk-di-prob",   domain: "Digital Innovation", name: "Problem Discovery", via: { lessons: ["l-di-3", "l-di-4"] } },
  { id: "sk-di-start",  domain: "Digital Innovation", name: "Startup Validation", via: { lessons: ["l-di-5", "l-di-6"] } },
  { id: "sk-di-biz",    domain: "Digital Innovation", name: "Business Modeling", via: { lessons: ["l-di-7", "l-di-8"] } },
  { id: "sk-di-mkt",    domain: "Digital Innovation", name: "Positioning & Growth", via: { lessons: ["l-di-9", "l-di-10"] } },
  { id: "sk-di-launch", domain: "Digital Innovation", name: "Launch & Iteration", via: { lessons: ["l-di-11", "l-di-12"] } },

  { id: "sk-int-systems", domain: "Integration", name: "Cross-Domain Systems Builder", via: { project: "p-cap-1" } },
];

// ─── Achievements ────────────────────────────────────────────────────────────

export const ACHIEVEMENTS: Achievement[] = [
  { id: "ach-first-lesson",     title: "First Lesson",      desc: "Completed a first lesson on the platform.", metric: "Complete 1 lesson" },
  { id: "ach-first-assessment", title: "Measured Baseline", desc: "Sat a first quiz or checkpoint assessment.", metric: "Complete 1 assessment" },
  { id: "ach-ai-explorer",      title: "AI Explorer",       desc: "Completed the AI Fundamentals pathway.", metric: "Finish all AI Fundamentals lessons" },
  { id: "ach-practitioner",     title: "Hands-On",          desc: "Completed three practical activities — proof over theory.", metric: "Complete 3 activities" },
  { id: "ach-ace",              title: "Perfect Measure",   desc: "Scored 100% on an assessment.", metric: "Score 100% once" },
  { id: "ach-first-project",    title: "First Project",     desc: "Completed a first practical project end to end.", metric: "Complete 1 project" },
  { id: "ach-robotics-builder", title: "Robotics Builder",  desc: "Completed a robotics or IoT project.", metric: "Complete a Robotics & IoT project" },
  { id: "ach-code-builder",     title: "Code Builder",      desc: "Completed a software engineering project.", metric: "Complete a Software project" },
  { id: "ach-innovator",        title: "Innovator",         desc: "Completed a digital innovation project.", metric: "Complete an Innovation project" },
  { id: "ach-tech-creator",     title: "Tech Creator",      desc: "Completed projects spanning three or more technology areas.", metric: "Projects across 3+ areas" },
  { id: "ach-halfway",          title: "Halfway Forge",     desc: "Passed 50% of the full lesson curriculum.", metric: "Reach 50% lesson progress" },
];

// ─── Career pathways (directions, not promises) ─────────────────────────────

export interface Career { id: string; title: string; desc: string; skills: string[]; courses: string[]; }

export const CAREERS: Career[] = [
  { id: "cr-ai-dev", title: "AI Developer", desc: "Builds applications with AI capabilities: assistants, generators, classifiers — wiring models into products people use.", skills: ["sk-ai-core", "sk-ai-gen", "sk-ai-prompt", "sk-se-prog"], courses: ["c-ai", "c-se"] },
  { id: "cr-ml-eng", title: "Machine Learning Engineer", desc: "Trains, evaluates, and deploys learning systems — data pipelines, test sets, and generalization under real conditions.", skills: ["sk-ai-ml", "sk-ai-core", "sk-se-prog", "sk-se-data"], courses: ["c-ai", "c-se"] },
  { id: "cr-sw-dev", title: "Software Developer", desc: "Designs and maintains applications across the stack with engineering discipline: tests, reviews, and version control.", skills: ["sk-se-prog", "sk-se-eng", "sk-se-git", "sk-se-data"], courses: ["c-se"] },
  { id: "cr-web-dev", title: "Web Developer", desc: "Builds for the most deployed platform in history — HTTP, responsive interfaces, APIs, and performance.", skills: ["sk-se-web", "sk-se-prog", "sk-se-git"], courses: ["c-se"] },
  { id: "cr-mob-dev", title: "Mobile Developer", desc: "Ships apps to phones under real constraints: offline-first design, small screens, store review cycles.", skills: ["sk-se-mobile", "sk-se-web", "sk-se-prog"], courses: ["c-se"] },
  { id: "cr-rob-eng", title: "Robotics Engineer", desc: "Makes machines sense and act in the physical world — control loops, actuators, and honest test regimes.", skills: ["sk-rb-loop", "sk-rb-elec", "sk-rb-mcu", "sk-rb-build"], courses: ["c-rob"] },
  { id: "cr-iot-dev", title: "IoT Developer", desc: "Connects devices into systems: MQTT topics, telemetry pipelines, dashboards, and resilience when networks fail.", skills: ["sk-rb-iot", "sk-rb-mcu", "sk-rb-elec", "sk-se-data"], courses: ["c-rob", "c-se"] },
  { id: "cr-auto-eng", title: "Automation Engineer", desc: "Designs rule sets, thresholds, and closed-loop control that keep greenhouses, labs, and buildings running themselves.", skills: ["sk-rb-auto", "sk-rb-iot", "sk-rb-mcu"], courses: ["c-rob"] },
  { id: "cr-founder", title: "Technology Entrepreneur", desc: "Finds real problems, validates solutions with evidence, and builds ventures with a model that survives arithmetic.", skills: ["sk-di-start", "sk-di-biz", "sk-di-launch", "sk-di-prob"], courses: ["c-di"] },
  { id: "cr-product", title: "Product Developer", desc: "Turns technology into products that return users: discovery, MVPs, positioning, and the weekly measure–decide loop.", skills: ["sk-di-prod", "sk-di-prob", "sk-di-mkt", "sk-se-web"], courses: ["c-di", "c-se"] },
];

// ─── Users ──────────────────────────────────────────────────────────────────

const D = 86_400_000;

export const DEMO_USERS: User[] = [
  { id: "u-amara",  name: "Amara Kide",    email: "amara@techfoundry.ac",  role: "student",    hue: 158, joinedAt: Date.now() - 92 * D, active: true, title: "Student · Cohort 2025" },
  { id: "u-noah",   name: "Noah Berg",     email: "noah@techfoundry.ac",   role: "student",    hue: 210, joinedAt: Date.now() - 90 * D, active: true, title: "Student · Cohort 2025" },
  { id: "u-zara",   name: "Zara Hussen",   email: "zara@techfoundry.ac",   role: "student",    hue: 20,  joinedAt: Date.now() - 88 * D, active: true, title: "Student · Cohort 2025" },
  { id: "u-miguel", name: "Miguel Santos", email: "miguel@techfoundry.ac", role: "student",    hue: 260, joinedAt: Date.now() - 85 * D, active: true, title: "Student · Cohort 2025" },
  { id: "u-lin",    name: "Lin Wei",       email: "lin@techfoundry.ac",    role: "student",    hue: 330, joinedAt: Date.now() - 80 * D, active: true, title: "Student · Cohort 2025" },
  { id: "u-tariq",  name: "Tariq Aziz",    email: "tariq@techfoundry.ac",  role: "student",    hue: 95,  joinedAt: Date.now() - 70 * D, active: true, title: "Student · Cohort 2025" },
  { id: "u-elsa",   name: "Elsa Virtanen", email: "elsa@techfoundry.ac",   role: "student",    hue: 190, joinedAt: Date.now() - 60 * D, active: true, title: "Student · Cohort 2025" },
  { id: "u-maya",   name: "Maya Chen",     email: "maya@techfoundry.ac",   role: "instructor", hue: 45,  joinedAt: Date.now() - 120 * D, active: true, title: "Instructor · Program Lead" },
  { id: "u-ade",    name: "Ade Okonkwo",   email: "ade@techfoundry.ac",    role: "admin",      hue: 230, joinedAt: Date.now() - 120 * D, active: true, title: "Administrator · Director" },
];

// ─── Videos ─────────────────────────────────────────────────────────────────

export const VIDEOS: Video[] = [
  // AI Course Videos
  {
    id: "v-ai-1",
    lessonId: "l-ai-1",
    title: "What Is Artificial Intelligence?",
    description: "An introduction to AI concepts, history, and real-world applications. Learn how AI systems learn from data and make predictions.",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    thumbnailUrl: "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg",
    provider: "youtube",
    duration: 324, // 5:24
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 30 * 86400000,
    updatedAt: Date.now() - 30 * 86400000,
  },
  {
    id: "v-ai-2",
    lessonId: "l-ai-3",
    title: "How Generative AI Works",
    description: "Understanding how generative AI models produce content. Explore the architecture behind modern AI systems.",
    videoUrl: "https://www.youtube.com/embed/wxq5rN3UYhU",
    thumbnailUrl: "https://img.youtube.com/vi/wxq5rN3UYhU/maxresdefault.jpg",
    provider: "youtube",
    duration: 412, // 6:52
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 28 * 86400000,
    updatedAt: Date.now() - 28 * 86400000,
  },
  {
    id: "v-ai-3",
    lessonId: "l-ai-5",
    title: "Prompt Engineering Fundamentals",
    description: "Learn how to write effective prompts for AI systems. Master the art of getting better results from generative AI.",
    videoUrl: "https://www.youtube.com/embed/T9aRN5JkmL8",
    thumbnailUrl: "https://img.youtube.com/vi/T9aRN5JkmL8/maxresdefault.jpg",
    provider: "youtube",
    duration: 378, // 6:18
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 26 * 86400000,
    updatedAt: Date.now() - 26 * 86400000,
  },
  {
    id: "v-ai-4",
    lessonId: "l-ai-7",
    title: "Machine Learning Explained",
    description: "How machine learning models learn from data. Understand supervised vs unsupervised learning and training processes.",
    videoUrl: "https://www.youtube.com/embed/ukzFI9rgwfU",
    thumbnailUrl: "https://img.youtube.com/vi/ukzFI9rgwfU/maxresdefault.jpg",
    provider: "youtube",
    duration: 456, // 7:36
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 24 * 86400000,
    updatedAt: Date.now() - 24 * 86400000,
  },
  {
    id: "v-ai-5",
    lessonId: "l-ai-11",
    title: "Introduction to Natural Language Processing (NLP)",
    description: "Learn what NLP is, how AI works with human language, and the key tasks involved such as classification, sentiment analysis, translation, and chatbots.",
    videoUrl: "https://www.youtube.com/embed/5ctbvkAMQO4",
    thumbnailUrl: "https://img.youtube.com/vi/5ctbvkAMQO4/maxresdefault.jpg",
    provider: "youtube",
    duration: 420, // 7:00
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 23 * 86400000,
    updatedAt: Date.now() - 23 * 86400000,
  },
  {
    id: "v-ai-6",
    lessonId: "l-ai-13",
    title: "3 Python AI Projects for Beginners",
    description: "A beginner-friendly AI project walkthrough covering practical AI builds, including an AI agent and image classifier ideas that connect to the AI Project topic.",
    videoUrl: "https://www.youtube.com/embed/XZdY15sHUa8",
    thumbnailUrl: "https://img.youtube.com/vi/XZdY15sHUa8/maxresdefault.jpg",
    provider: "youtube",
    duration: 4100, // ~1:08:20
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: false,
    published: true,
    createdAt: Date.now() - 12 * 86400000,
    updatedAt: Date.now() - 12 * 86400000,
  },
  {
    id: "v-ai-7",
    lessonId: "l-ai-14",
    title: "Get Started with GitHub Copilot in VS Code",
    description: "A practical introduction to AI coding assistance in VS Code, including Copilot basics, chat, slash commands, testing, edits, and responsible workflow habits.",
    videoUrl: "https://learn-video.azurefd.net/vod/player?show=visual-studio-code&ep=get-started-with-github-copilot-in-vs-code",
    thumbnailUrl: undefined,
    provider: "external",
    duration: 1284, // 21:24
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 8 * 86400000,
    updatedAt: Date.now() - 8 * 86400000,
  },
  // Robotics Course Videos
  {
    id: "v-rb-1",
    lessonId: "l-rb-1",
    title: "Introduction to Robotics",
    description: "What is robotics? Learn about robot components, sensors, and how robots interact with the physical world.",
    videoUrl: "https://www.youtube.com/embed/fqzQGlZmuJ8",
    thumbnailUrl: "https://img.youtube.com/vi/fqzQGlZmuJ8/maxresdefault.jpg",
    provider: "youtube",
    duration: 345, // 5:45
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 22 * 86400000,
    updatedAt: Date.now() - 22 * 86400000,
  },
  // Software Engineering Videos
  {
    id: "v-se-1",
    lessonId: "l-se-1",
    title: "Programming Fundamentals",
    description: "Learn the basics of programming: variables, data types, functions, and control flow. Build your foundation.",
    videoUrl: "https://www.youtube.com/embed/zOjov-2OZ0E",
    thumbnailUrl: "https://img.youtube.com/vi/zOjov-2OZ0E/maxresdefault.jpg",
    provider: "youtube",
    duration: 489, // 8:09
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 20 * 86400000,
    updatedAt: Date.now() - 20 * 86400000,
  },
  // Digital Innovation Videos
  {
    id: "v-di-1",
    lessonId: "l-di-1",
    title: "Digital Product Development",
    description: "How to build digital products that solve real problems. Learn the product development lifecycle.",
    videoUrl: "https://www.youtube.com/embed/7PCkvCPvUkA",
    thumbnailUrl: "https://img.youtube.com/vi/7PCkvCPvUkA/maxresdefault.jpg",
    provider: "youtube",
    duration: 398, // 6:38
    captionsUrl: undefined,
    sortOrder: 1,
    isRequired: true,
    published: true,
    createdAt: Date.now() - 18 * 86400000,
    updatedAt: Date.now() - 18 * 86400000,
  },
];

// ─── Ordered curriculum helpers ─────────────────────────────────────────────

export const ORDERED_LESSONS: Lesson[] = [...LESSONS].sort((a, b) => {
  const ca = COURSES.findIndex((c) => c.id === a.courseId);
  const cb = COURSES.findIndex((c) => c.id === b.courseId);
  if (ca !== cb) return ca - cb;
  const ta = TOPICS.findIndex((t) => t.id === a.topicId);
  const tb = TOPICS.findIndex((t) => t.id === b.topicId);
  return ta !== tb ? ta - tb : a.order - b.order;
});

export const uid = () => Math.random().toString(36).slice(2, 10);

function emptyState(): StudentState {
  return { lessons: {}, activities: {}, attempts: [], projects: {}, skills: {}, achievements: {}, certificates: [], xp: 0, enrollments: [], videoProgress: {} };
}

function recomputeXp(st: StudentState): number {
  let xp = Object.keys(st.lessons).length * 10;
  xp += Object.keys(st.activities).length * 15;
  for (const a of st.attempts) xp += a.pass ? 20 : 5;
  for (const p of Object.values(st.projects)) {
    xp += p.milestones.length * 5;
    if (p.status === "completed") xp += 40;
  }
  return xp;
}

// ─── The earn engine: skills, achievements, certificates ────────────────────

export interface EarnEvent { kind: "skill" | "achievement" | "certificate"; id: string; title: string; }

export function syncStudent(db: DB, userId: string, now = Date.now()): EarnEvent[] {
  const st = db.students[userId];
  if (!st) return [];
  const events: EarnEvent[] = [];

  for (const sk of db.skills) {
    if (st.skills[sk.id]) continue;
    let earned = false;
    if (sk.via.lessons && sk.via.lessons.every((l) => st.lessons[l])) earned = true;
    if (!earned && sk.via.assessment && st.attempts.some((a) => a.assessmentId === sk.via.assessment && a.pass)) earned = true;
    if (!earned && sk.via.project && st.projects[sk.via.project]?.status === "completed") earned = true;
    if (earned) {
      st.skills[sk.id] = now;
      events.push({ kind: "skill", id: sk.id, title: sk.name });
    }
  }

  const lessonsDone = Object.keys(st.lessons).length;
  const totalLessons = db.lessons.length;
  const completedProjects = Object.entries(st.projects).filter(([, p]) => p.status === "completed").map(([pid]) => pid);
  const completedCourseSets = completedProjects.map((pid) => new Set(db.projects.find((p) => p.id === pid)?.courseIds ?? []));
  const coveredCourses = new Set(completedCourseSets.flatMap((s) => [...s]));
  const topicDone = (tid: string) => {
    const ls = db.lessons.filter((l) => l.topicId === tid);
    return ls.length > 0 && ls.every((l) => st.lessons[l.id]);
  };

  const earned: Record<string, boolean> = {
    "ach-first-lesson": lessonsDone >= 1,
    "ach-first-assessment": st.attempts.length >= 1,
    "ach-ai-explorer": topicDone("t-ai-1"),
    "ach-practitioner": Object.keys(st.activities).length >= 3,
    "ach-ace": st.attempts.some((a) => a.pct === 100),
    "ach-first-project": completedProjects.length >= 1,
    "ach-robotics-builder": completedCourseSets.some((s) => s.has("c-rob")),
    "ach-code-builder": completedCourseSets.some((s) => s.has("c-se")),
    "ach-innovator": completedCourseSets.some((s) => s.has("c-di")),
    "ach-tech-creator": coveredCourses.size >= 3,
    "ach-halfway": totalLessons > 0 && lessonsDone / totalLessons >= 0.5,
  };
  for (const [aid, ok] of Object.entries(earned)) {
    if (ok && !st.achievements[aid]) {
      st.achievements[aid] = now;
      events.push({ kind: "achievement", id: aid, title: db.achievements.find((a) => a.id === aid)?.title ?? aid });
    }
  }

  for (const course of db.courses) {
    const ls = db.lessons.filter((l) => l.courseId === course.id);
    const lessonsComplete = ls.length > 0 && ls.every((l) => st.lessons[l.id]);
    const checkpoint = db.assessments.find((a) => a.courseId === course.id && a.kind === "Checkpoint");
    const passed = !checkpoint || st.attempts.some((a) => a.assessmentId === checkpoint.id && a.pass);
    if (lessonsComplete && passed && !st.certificates.some((c) => c.courseId === course.id)) {
      st.certificates.push({ id: `cert-${userId}-${course.id}`, courseId: course.id, at: now });
      events.push({ kind: "certificate", id: course.id, title: course.title });
    }
  }

  st.xp = recomputeXp(st);
  return events;
}

// ─── Seed database ──────────────────────────────────────────────────────────

export function buildSeedDB(): DB {
  const now = Date.now();
  const students: Record<string, StudentState> = {};
  const notifications: Record<string, AppNotification[]> = {};
  const log: ActivityEvent[] = [];

  for (const u of DEMO_USERS) if (u.role === "student") students[u.id] = emptyState();

  const done = (st: StudentState, ids: string[], startDaysAgo: number) =>
    ids.forEach((id, i) => { st.lessons[id] = now - (startDaysAgo - i * 1.2) * D; });

  const L = ORDERED_LESSONS.map((l) => l.id);

  // Amara — the demo student: AI deep, software started, robotics touched, capstone underway.
  {
    const st = students["u-amara"];
    st.activeCourseId = "c-ai";
    st.enrollments.push({ courseId: "c-ai", status: "active", enrolledAt: now - 90 * D });
    done(st, ["l-ai-1", "l-ai-2", "l-ai-3", "l-ai-4", "l-ai-5", "l-se-1", "l-se-2", "l-se-3", "l-rb-1"], 24);
    st.lastLessonId = "l-ai-5";
    st.activities["act-ai-1"] = { at: now - 9 * D, text: "Built a five-part prompt that turns my weekly syllabus + exam dates into a revision plan. v1 was generic; v2 added difficulty weighting per topic; v3 constrained output to a printable one-page table. Verified dates against the official calendar by hand." };
    st.attempts.push({ assessmentId: "a-ai-1", answers: {}, score: 11, total: 13, pct: 85, pass: true, at: now - 7 * D });
    st.projects["p-ai-1"] = {
      status: "completed", startedAt: now - 16 * D, completedAt: now - 6 * D,
      milestones: ["p-ai-1-m1", "p-ai-1-m2", "p-ai-1-m3", "p-ai-1-m4"],
      submission: { text: "Five prompts covering revision planning, grocery budgeting, meal prep, cover-letter drafting, and weekly scheduling. Each iterated at least twice and annotated with role/context/task/format/constraints; every accepted output checked against a primary source.", at: now - 7 * D },
      feedback: { text: "Strong iteration discipline — the v2→v3 changes show real diagnosis, not tinkering. Your verification notes are exactly the habit professional teams need. Next: try the same loop on a prompt that must produce structured data (JSON) reliably.", verdict: "approved", at: now - 6 * D, by: "Maya Chen" },
    };
    st.projects["p-se-1"] = {
      status: "submitted", startedAt: now - 12 * D,
      milestones: ["p-se-1-m1", "p-se-1-m2", "p-se-1-m3", "p-se-1-m4", "p-se-1-m5"],
      submission: { text: "One-page portfolio deployed at a public URL. Semantic HTML sections, mobile-first CSS tested at 360px and 1440px, and a project-filter interaction driven by a single state variable. Screenshots for both widths attached in the repo README.", link: "https://amara-portfolio.example.dev", at: now - 1 * D },
    };
    st.projects["p-cap-1"] = {
      status: "in_progress", startedAt: now - 5 * D,
      milestones: ["p-cap-1-m1"],
    };
  }

  // Cohort — deterministic varied progress for real analytics.
  {
    const noah = students["u-noah"];
    noah.activeCourseId = "c-ai";
    noah.enrollments.push({ courseId: "c-ai", status: "active", enrolledAt: now - 88 * D });
    done(noah, L.slice(0, 16), 40);
    noah.lastLessonId = L[15];
    noah.activities["act-ai-1"] = { at: now - 12 * D, text: "Prompt for weekly football training plans; iterated twice." };
    noah.activities["act-rb-2"] = { at: now - 6 * D, text: "MQTT topic tree for a three-node weather station with pub/sub table." };
    noah.attempts.push({ assessmentId: "a-ai-1", answers: {}, score: 10, total: 13, pct: 77, pass: true, at: now - 10 * D });
    noah.projects["p-rb-1"] = { status: "in_progress", startedAt: now - 8 * D, milestones: ["p-rb-1-m1", "p-rb-1-m2"] };

    const zara = students["u-zara"];
    zara.activeCourseId = "c-ai";
    zara.enrollments.push({ courseId: "c-ai", status: "active", enrolledAt: now - 86 * D });
    done(zara, L.slice(0, 12), 55);
    zara.lastLessonId = L[11];
    zara.activities["act-se-1"] = { at: now - 20 * D, text: "Grade calculator one-pager; state: subjects list, weights, result — UI derives from state." };
    zara.attempts.push({ assessmentId: "a-ai-1", answers: {}, score: 12, total: 13, pct: 92, pass: true, at: now - 25 * D });
    zara.attempts.push({ assessmentId: "a-ai-2", answers: {}, score: 10, total: 11, pct: 91, pass: true, at: now - 14 * D });
    zara.projects["p-ai-1"] = {
      status: "completed", startedAt: now - 30 * D, completedAt: now - 18 * D,
      milestones: ["p-ai-1-m1", "p-ai-1-m2", "p-ai-1-m3", "p-ai-1-m4"],
      submission: { text: "Five annotated prompts for a student society: event planning, budget tracking, meeting summaries, sponsor outreach, and onboarding docs.", at: now - 19 * D },
      feedback: { text: "Clean five-part structure throughout. Push further on few-shot examples in your next toolkit.", verdict: "approved", at: now - 18 * D, by: "Maya Chen" },
    };

    const miguel = students["u-miguel"];
    miguel.activeCourseId = "c-ai";
    miguel.enrollments.push({ courseId: "c-ai", status: "active", enrolledAt: now - 83 * D });
    done(miguel, L.slice(0, 8), 30);
    miguel.lastLessonId = L[7];
    miguel.attempts.push({ assessmentId: "a-se-1", answers: {}, score: 8, total: 13, pct: 62, pass: false, at: now - 5 * D });
    miguel.projects["p-ai-1"] = {
      status: "submitted", startedAt: now - 15 * D,
      milestones: ["p-ai-1-m1", "p-ai-1-m2", "p-ai-1-m3"],
      submission: { text: "Four prompts so far — meal prep, gym plan, Spanish revision, rent splitting. Verification notes pending for two of them.", at: now - 2 * D },
    };

    const lin = students["u-lin"];
    lin.activeCourseId = "c-di";
    lin.enrollments.push({ courseId: "c-di", status: "active", enrolledAt: now - 78 * D });
    done(lin, L.slice(0, 6), 21);
    lin.lastLessonId = L[5];
    lin.projects["p-di-1"] = { status: "in_progress", startedAt: now - 4 * D, milestones: ["p-di-1-m1"] };

    const tariq = students["u-tariq"];
    tariq.activeCourseId = "c-rob";
    tariq.enrollments.push({ courseId: "c-rob", status: "active", enrolledAt: now - 68 * D });
    done(tariq, L.slice(0, 3), 12);
    tariq.lastLessonId = L[2];

    const elsa = students["u-elsa"];
    elsa.activeCourseId = "c-se";
    elsa.enrollments.push({ courseId: "c-se", status: "active", enrolledAt: now - 58 * D });
    done(elsa, L.slice(0, 20), 50);
    elsa.lastLessonId = L[19];
    elsa.activities["act-ai-2"] = { at: now - 16 * D, text: "Audited a video recommendation feed: data flows, two bias risks, one required improvement." };
    elsa.attempts.push({ assessmentId: "a-ai-1", answers: {}, score: 13, total: 13, pct: 100, pass: true, at: now - 21 * D });
    elsa.attempts.push({ assessmentId: "a-rb-1", answers: {}, score: 11, total: 13, pct: 85, pass: true, at: now - 9 * D });
    elsa.projects["p-cap-1"] = {
      status: "submitted", startedAt: now - 40 * D,
      milestones: ["p-cap-1-m1", "p-cap-1-m2", "p-cap-1-m3", "p-cap-1-m4", "p-cap-1-m5"],
      submission: { text: "Full stack: ESP32 moisture + DHT node publishing to MQTT, Node API logging to SQLite, dashboard with live charts, rule-based AI watering recommendations, and a canvas targeting smallholder cooperatives with a per-season license.", link: "https://smartfarm-demo.example.dev", at: now - 3 * D },
    };
  }

  // ─── Live Classes ───────────────────────────────────────────────────────────
  const LIVE_CLASSES: import("./types").LiveClass[] = [
    {
      id: "lc-1",
      title: "Introduction to Neural Networks",
      description: "Live walkthrough of how neural networks process data, with interactive demonstrations.",
      courseId: "c-ai",
      topicId: "t-ai-1",
      instructorId: "u-maya",
      scheduledAt: now + 2 * D, // 2 days from now
      duration: 60,
      status: "scheduled",
      allowStudentMic: false,
      allowStudentCamera: false,
      allowStudentChat: true,
      allowScreenShare: true,
      recordingEnabled: true,
      resources: [
        { id: "r-1", title: "Neural Network Slides", type: "pdf", url: "#", description: "Presentation slides" },
        { id: "r-2", title: "Python Notebook", type: "code", url: "#", description: "Code examples" },
      ],
      createdAt: now - 5 * D,
      updatedAt: now - 5 * D,
    },
    {
      id: "lc-2",
      title: "Building Your First Robot",
      description: "Hands-on session building a simple robot with sensors and motors.",
      courseId: "c-rob",
      topicId: "t-rob-1",
      instructorId: "u-maya",
      scheduledAt: now + 4 * D,
      duration: 90,
      status: "scheduled",
      allowStudentMic: true,
      allowStudentCamera: true,
      allowStudentChat: true,
      allowScreenShare: true,
      recordingEnabled: true,
      resources: [
        { id: "r-3", title: "Robot Assembly Guide", type: "document", url: "#", description: "Step-by-step guide" },
      ],
      createdAt: now - 3 * D,
      updatedAt: now - 3 * D,
    },
    {
      id: "lc-3",
      title: "React Components Deep Dive",
      description: "Live coding session on building reusable React components with TypeScript.",
      courseId: "c-se",
      topicId: "t-se-2",
      instructorId: "u-maya",
      scheduledAt: now - 1 * D, // Yesterday (completed)
      duration: 75,
      status: "completed",
      allowStudentMic: false,
      allowStudentCamera: false,
      allowStudentChat: true,
      allowScreenShare: true,
      recordingEnabled: true,
      resources: [
        { id: "r-4", title: "React Code Examples", type: "code", url: "#", description: "GitHub repo" },
      ],
      createdAt: now - 7 * D,
      updatedAt: now - 1 * D,
    },
    {
      id: "lc-4",
      title: "Business Model Canvas Workshop",
      description: "Interactive workshop on creating business models for tech startups.",
      courseId: "c-di",
      topicId: "t-di-3",
      instructorId: "u-maya",
      scheduledAt: now + 1 * D, // Tomorrow
      duration: 120,
      status: "scheduled",
      allowStudentMic: true,
      allowStudentCamera: true,
      allowStudentChat: true,
      allowScreenShare: true,
      recordingEnabled: false,
      resources: [
        { id: "r-5", title: "Canvas Template", type: "pdf", url: "#", description: "Printable template" },
      ],
      createdAt: now - 2 * D,
      updatedAt: now - 2 * D,
    },
  ];

  const db: DB = {
    version: 1,
    users: DEMO_USERS,
    courses: COURSES,
    topics: TOPICS,
    lessons: LESSONS,
    activities: ACTIVITIES,
    assessments: ASSESSMENTS,
    projects: PROJECTS,
    skills: SKILLS,
    achievements: ACHIEVEMENTS,
    videos: VIDEOS,
    liveClasses: LIVE_CLASSES,
    classMessages: {},
    classPolls: {},
    classAttendance: {},
    students,
    notifications,
    log: log.sort((a, b) => b.at - a.at),
  };

  // Run the earn engine once so seeded progress carries consistent skills/achievements.
  for (const u of DEMO_USERS) if (u.role === "student") syncStudent(db, u.id, now);

  // Amara notifications
  notifications["u-amara"] = [
    { id: `n-${uid()}`, at: now - 1 * D, kind: "project", title: "Portfolio submitted", body: "Your Personal Portfolio Site is waiting for instructor review.", read: false },
    { id: `n-${uid()}`, at: now - 1 * D, kind: "announcement", title: "Term 2 brief published", body: "The Smart Agriculture capstone brief is live in Projects. Teams of one to three.", read: false },
    { id: `n-${uid()}`, at: now - 2 * D, kind: "content", title: "Lesson available", body: "“Iterating: Test, Evaluate, Refine” unlocked in Prompt Engineering.", read: false },
    { id: `n-${uid()}`, at: now - 6 * D, kind: "project", title: "Project approved", body: "Maya Chen approved your Everyday AI Prompt Toolkit. Completion record issued.", read: true },
    { id: `n-${uid()}`, at: now - 6 * D, kind: "achievement", title: "Achievement unlocked", body: "First Project — completed a first practical project end to end.", read: true },
  ];

  // Activity log across the cohort (feeds admin analytics + recency).
  const ev = (daysAgo: number, userId: string, type: ActivityEvent["type"], label: string) =>
    log.push({ at: now - daysAgo * D, userId, type, label });
  ev(0.2, "u-elsa", "lesson", "completed “Metrics, Learning, and Iteration”");
  ev(0.6, "u-noah", "activity", "submitted IoT Topic Architecture");
  ev(1, "u-amara", "project", "submitted Personal Portfolio Site");
  ev(1.5, "u-miguel", "assessment", "sat Programming & Web Quiz (62%)");
  ev(2, "u-elsa", "project", "submitted Smart Agriculture System");
  ev(2.4, "u-amara", "lesson", "completed “Anatomy of an Effective Prompt”");
  ev(3, "u-elsa", "assessment", "sat Robotics & Circuits Quiz (85%)");
  ev(3.6, "u-lin", "project", "started Campus Problem Pitch");
  ev(4.5, "u-noah", "lesson", "completed “Interactive UIs: JavaScript and Components”");
  ev(5, "u-amara", "project", "started Smart Agriculture System");
  ev(6, "u-amara", "project", "Everyday AI Prompt Toolkit approved");
  ev(8, "u-noah", "project", "started Smart Plant Monitor");
  ev(9, "u-elsa", "assessment", "scored 100% on AI Foundations Quiz");
  ev(12, "u-zara", "lesson", "completed “Git: Commits, Branches, History”");
  ev(18, "u-zara", "project", "Everyday AI Prompt Toolkit approved");

  return db;
}

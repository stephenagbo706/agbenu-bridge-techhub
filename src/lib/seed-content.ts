import type { Course, Topic, Lesson, Activity, Assessment } from "./types";

// ─── PROGRAM: four core courses ──────────────────────────────────────────────

export const COURSES: Course[] = [
  {
    id: "c-ai", code: "AI-101", title: "Artificial Intelligence", short: "AI",
    tagline: "Understand how intelligent systems work — and put them to work on real problems.",
    description:
      "This course takes you from understanding what AI actually is, to using generative AI tools effectively, engineering strong prompts, grasping core machine-learning concepts, and applying AI responsibly. You finish by building an AI-assisted solution to a real problem.",
    color: "#2f5fe3", level: "Foundation → Applied", hours: 14, order: 1,
    image_url: "https://www.telefonica.com/en/wp-content/uploads/sites/5/2023/07/differences-robotis-ia.jpg?w=1200",
    objectives: [
      "Explain how AI systems learn from data and make predictions",
      "Use generative AI tools as a partner for real work",
      "Design, test, and refine effective prompts",
      "Distinguish supervised learning, training, and overfitting",
      "Apply responsible-AI checks: bias, privacy, honesty",
    ],
  },
  {
    id: "c-rob", code: "RB-201", title: "Robotics & Internet of Things", short: "Robotics · IoT",
    tagline: "Make software touch the physical world: sensors, microcontrollers, and connected machines.",
    description:
      "Robotics and IoT is where code meets the physical world. You will learn how robots sense-think-act, how circuits and sensors measure reality, how microcontrollers run your programs, and how devices connect into IoT systems — ending with a working automation or robotics build.",
    color: "#d95f0e", level: "Foundation → Builder", hours: 16, order: 2,
    image_url: "https://image.qwenlm.ai/generated-images/0f544980-595d-4ac9-905e-a98137226c03/_result.png",
    objectives: [
      "Describe the sense–think–act loop behind every robot",
      "Read basic circuits and choose sensors for a task",
      "Program a microcontroller to read inputs and drive outputs",
      "Design a device-to-cloud IoT data flow",
      "Build and test a sensor-based automation project",
    ],
  },
  {
    id: "c-se", code: "SE-301", title: "Software Engineering & Programming", short: "Software",
    tagline: "Design, build, test, and ship real software — not just write code.",
    description:
      "Programming is the starting point; engineering is the discipline. This course moves you from fundamentals through web and mobile development into testing, databases, APIs, and version control — the full lifecycle of real software, with an emphasis on shipping working applications.",
    color: "#1b8a4c", level: "Foundation → Engineer", hours: 18, order: 3,
    image_url: "https://articles.unesco.org/sites/default/files/2025-12/unsplash_arnold-francisca.jpg",
    objectives: [
      "Write clean programs using variables, logic, loops, and functions",
      "Explain how the web works and build interactive pages",
      "Model data and design a simple REST API",
      "Test and refactor code like an engineer",
      "Collaborate through Git commits, branches, and pull requests",
    ],
  },
  {
    id: "c-di", code: "DI-401", title: "Digital Innovation & Entrepreneurship", short: "Innovation",
    tagline: "Turn technology skills into solutions people actually use — and sustainable ventures.",
    description:
      "Technology only matters when it solves a problem for someone. This course teaches you to find real problems, prototype digital solutions, validate ideas before building, design business models, and plan a launch — transforming technical skills into products and potential ventures.",
    color: "#c2317e", level: "Applied → Creator", hours: 12, order: 4,
    image_url: "https://image.qwenlm.ai/generated-images/3d9ea6bb-d8ac-497f-9901-30e3596eb65c/_result.png",
    objectives: [
      "Identify and frame real problems worth solving",
      "Build and test minimum viable products (MVPs)",
      "Validate ideas with evidence before heavy building",
      "Map a business model with the Business Model Canvas",
      "Plan a launch and measure what matters",
    ],
  },
];

export const TOPICS: Topic[] = [
  { id: "t-ai-1", courseId: "c-ai", order: 1, title: "AI Fundamentals", summary: "What AI is, what it is not, and how systems learn from data." },
  { id: "t-ai-2", courseId: "c-ai", order: 2, title: "Generative AI", summary: "How models create text and images, and how to work with AI assistants." },
  { id: "t-ai-3", courseId: "c-ai", order: 3, title: "Prompt Engineering", summary: "The craft of instructing AI: structure, iteration, evaluation." },
  { id: "t-ai-4", courseId: "c-ai", order: 4, title: "Machine Learning Concepts", summary: "Supervised learning, training vs. testing, overfitting." },
  { id: "t-ai-5", courseId: "c-ai", order: 5, title: "Responsible AI", summary: "Bias, fairness, privacy, and honest use of AI systems." },
  { id: "t-ai-6", courseId: "c-ai", order: 6, title: "Natural Language Processing", summary: "How AI works with human language: understanding, generation, and translation." },

  { id: "t-rb-1", courseId: "c-rob", order: 1, title: "Robotics Fundamentals", summary: "The sense–think–act loop and what makes a machine a robot." },
  { id: "t-rb-2", courseId: "c-rob", order: 2, title: "Electronics & Sensors", summary: "Circuits, current, and measuring the physical world." },
  { id: "t-rb-3", courseId: "c-rob", order: 3, title: "Microcontrollers", summary: "Tiny computers that run your code on real hardware." },
  { id: "t-rb-4", courseId: "c-rob", order: 4, title: "IoT Systems", summary: "Connected devices, networks, and sensor-to-cloud flows." },
  { id: "t-rb-5", courseId: "c-rob", order: 5, title: "Automation & Control", summary: "Rules, thresholds, feedback loops, and control patterns." },
  { id: "t-rb-6", courseId: "c-rob", order: 6, title: "Practical Robotics Projects", summary: "Planning builds, bill of materials, testing, and demoing." },
  { id: "t-rb-7", courseId: "c-rob", order: 7, title: "AI in Robotics", summary: "How perception, decisions, language, and connected intelligence make robots autonomous." },

  { id: "t-se-1", courseId: "c-se", order: 1, title: "Programming Fundamentals", summary: "Variables, types, logic, loops, functions — thinking like a programmer." },
  { id: "t-se-2", courseId: "c-se", order: 2, title: "Web Development", summary: "HTTP, HTML, CSS, JavaScript, and modern UI frameworks." },
  { id: "t-se-3", courseId: "c-se", order: 3, title: "Mobile Application Development", summary: "Native vs. cross-platform, and designing for small screens." },
  { id: "t-se-4", courseId: "c-se", order: 4, title: "Software Engineering Principles", summary: "Design, testing, refactoring, and code review." },
  { id: "t-se-5", courseId: "c-se", order: 5, title: "Databases & APIs", summary: "Data modeling, SQL, and designing REST interfaces." },
  { id: "t-se-6", courseId: "c-se", order: 6, title: "Version Control & Collaboration", summary: "Git history, branches, and team workflows." },

  { id: "t-di-1", courseId: "c-di", order: 1, title: "Digital Product Development", summary: "From idea to prototype to MVP — the build-measure loop." },
  { id: "t-di-2", courseId: "c-di", order: 2, title: "Problem-Solving & Innovation", summary: "Finding real problems and solving them under constraints." },
  { id: "t-di-3", courseId: "c-di", order: 3, title: "Startup Fundamentals", summary: "What makes startups different, and validating before building." },
  { id: "t-di-4", courseId: "c-di", order: 4, title: "Business Models", summary: "The Business Model Canvas and revenue logic." },
  { id: "t-di-5", courseId: "c-di", order: 5, title: "Digital Marketing", summary: "Positioning, storytelling, and reaching first users." },
  { id: "t-di-6", courseId: "c-di", order: 6, title: "Building & Launching Tech Products", summary: "Launch planning, metrics, and iteration after release." },
];

// ─── LESSONS ─────────────────────────────────────────────────────────────────

const LESSONS: Lesson[] = [];
function L(l: Lesson) { LESSONS.push(l); }

// ·· AI ·· Course 1 ·· Topic 1 — AI Fundamentals
L({
  id: "l-ai-1", courseId: "c-ai", topicId: "t-ai-1", order: 1, title: "What Is AI — and What Is It Not?", minutes: 12,
  summary: "Separate the hype from the engineering: AI as pattern-matching systems built from data, rules, and statistics.",
  why: "You cannot use AI well if you think it is magic. Knowing its true nature — and its limits — is what lets you trust it in the right places and verify it everywhere else.",
  objectives: ["Define AI in plain engineering terms", "Distinguish narrow AI from general AI", "Identify everyday systems that are (and are not) AI"],
  sections: [
    { h: "AI as applied pattern-matching", p: "At its core, modern AI is a system that finds patterns in data and uses them to make predictions or decisions. A spam filter has seen millions of emails labeled 'spam' or 'not spam'; it learned statistical patterns — strange sender names, urgent phrasing, suspicious links — and applies them to new mail. There is no understanding in the human sense; there is very good pattern-matching at scale." },
    { h: "Narrow vs. general intelligence", p: "Everything you use today is narrow AI: excellent at one task (translating, recommending, driving) but unable to transfer its skill elsewhere. A chess engine cannot write poetry. Artificial General Intelligence — a system with human-range flexibility — does not exist yet. When you evaluate a tool, always ask: what narrow task was it trained for?" },
  ],
  example: { title: "Three systems, one test", body: "Ask of any system: does it learn from examples and improve? A thermostat follows fixed rules — not AI. A music recommender improves as you listen — AI. A calculator computes exactly — not AI.", code: "thermostat:   if temp > 24 → cool      (rules, no learning)\nrecommender:  history → patterns → pick (learns from data) ✓ AI\ncalculator:   2 + 2 → 4 always          (exact math, no learning)" },
  terms: [["Artificial Intelligence", "Systems that perform tasks normally requiring human-like perception or judgment, by learning patterns from data."], ["Narrow AI", "AI trained for one specific task; all AI in production today."], ["Model", "The learned pattern-matcher: a mathematical function shaped by training data."]],
  activityHint: "Audit three apps you use daily. For each, write one sentence: is it AI, and what narrow task was it trained for?",
  check: { prompt: "A music app recommends songs and improves as you listen. A thermostat cools the room above 24°C. Which statement is correct?", options: ["Both are AI because both are automated", "Only the recommender is AI — it learns from data; the thermostat follows fixed rules", "Only the thermostat is AI — it reacts to the environment", "Neither is AI — automation is not AI"], answer: 1, explain: "The defining trait is learning from examples. The recommender improves from data; the thermostat executes a fixed rule." },
});
L({
  id: "l-ai-2", courseId: "c-ai", topicId: "t-ai-1", order: 2, title: "How AI Systems Learn from Data", minutes: 14,
  summary: "Inputs, labels, training, inference — the pipeline every learning system follows.",
  why: "Every AI failure you will ever debug traces back to data. Understanding the pipeline tells you where quality comes from and where it breaks.",
  objectives: ["Trace the data → training → inference pipeline", "Explain what labels are and why they matter", "Predict how bad data degrades an AI system"],
  sections: [
    { h: "The pipeline: data in, decisions out", p: "A learning system has four stages. (1) Collect examples — photos, emails, sensor readings. (2) Label them — this is a cat, this is spam. (3) Train — an algorithm adjusts millions of internal numbers until its predictions match the labels. (4) Infer — the trained model makes predictions on new, unlabeled data. The model is only as good as each stage allows." },
    { h: "Garbage in, gospel out — the danger", p: "Models do not know your data is biased, outdated, or mislabeled; they learn whatever is there, confidently. If a hiring dataset mostly shows one demographic in senior roles, the model learns that pattern as 'qualified'. This is why data inspection is an engineering discipline, not a footnote — the model will happily amplify whatever the data contains." },
  ],
  example: { title: "House price predictor", body: "You feed 10,000 sales records: size, location, age → sale price. Training finds how each feature pushes price up or down. A new listing gets an estimate. If your records only cover one neighborhood, the model is confident — and wrong — everywhere else.", code: "data:      [size=120m², district=Riverside, age=9y] → price=€310k\ntraining:  adjust weights until predicted ≈ actual (×10,000)\ninference: [size=95m²,  district=Old Town,  age=30y] → price=€???" },
  terms: [["Training data", "The labeled examples a model learns from."], ["Label", "The correct answer attached to an example during training."], ["Inference", "Using the trained model to predict on new data."]],
  activityHint: "Pick a prediction you would like an AI to make. List the 5 data fields you would collect and 2 ways the data could mislead the model.",
  check: { prompt: "A loan-approval model trained only on data from one city is deployed nationwide and performs badly. The most likely root cause is…", options: ["The model has too few parameters", "The training data does not represent the new population", "Inference is slower than training", "The labels were too accurate"], answer: 1, explain: "Models generalize only to situations resembling their training data. Narrow data → narrow competence, applied with unearned confidence." },
});

// ·· AI ·· Topic 2 — Generative AI
L({
  id: "l-ai-3", courseId: "c-ai", topicId: "t-ai-2", order: 1, title: "How Generative Models Create Content", minutes: 13,
  summary: "Tokens, next-word prediction, and why a statistics engine can write essays, code, and images.",
  why: "Generative AI is the most widely used AI in history. Understanding its mechanism turns you from a passenger into a pilot.",
  objectives: ["Explain token-by-token generation", "Describe why generated text can be factually wrong", "Name two modalities beyond text"],
  sections: [
    { h: "One token at a time", p: "A large language model reads your prompt, converts it to tokens (word pieces), and repeatedly asks: what token most plausibly comes next? Each answer extends the input, and the question repeats — thousands of times per response. The result is fluent because the model has absorbed the statistical shape of human writing, not because it 'knows' the topic." },
    { h: "Fluency ≠ truth", p: "The model optimizes for plausible continuation, not verified facts. When its training data is thin on your question, it still generates — producing confident errors called hallucinations. The practical rule: treat generative output as a brilliant first draft that must be checked against primary sources, especially for numbers, citations, and claims." },
  ],
  example: { title: "Watch a sentence assemble", body: "Prompt: 'The capital of Kenya is'. The model scores candidate tokens and picks the most probable continuation — not by looking it up, but because 'Nairobi' overwhelmingly follows that context in its training data.", code: "input : \"The capital of Kenya is\"\nnext? : [Nairobi 0.94] [Mombasa 0.03] [Kenya 0.01] ...\noutput: \"The capital of Kenya is Nairobi\" (repeat process)" },
  terms: [["Token", "A chunk of text (often a word piece) — the unit models read and emit."], ["Hallucination", "Confidently generated content that is wrong or invented."], ["Modality", "The kind of content a model handles: text, image, audio, code."]],
  activityHint: "Ask an AI assistant one question it will certainly know and one obscure question. Compare confidence vs. accuracy — note where it should have said 'I don't know'.",
  check: { prompt: "Why can a language model produce fluent text that is factually wrong?", options: ["It intentionally deceives users", "It predicts plausible next tokens rather than retrieving verified facts", "It runs out of memory mid-sentence", "It only reads the last word of a prompt"], answer: 1, explain: "Generation is probabilistic continuation. Plausibility is optimized; truth is not — so verification stays your job." },
});
L({
  id: "l-ai-4", courseId: "c-ai", topicId: "t-ai-2", order: 2, title: "Working with AI Assistants on Real Tasks", minutes: 15,
  summary: "A workflow for research, drafting, coding, and review — with verification built into every step.",
  why: "The students who benefit most from AI are not the ones who ask it to do everything, but the ones who build reliable human-plus-AI workflows.",
  objectives: ["Apply a four-step AI workflow to any task", "Verify AI output with primary sources", "Recognize tasks where AI adds little value"],
  sections: [
    { h: "The draft–check–refine workflow", p: "Use AI where it is strongest: generating structure, options, and first drafts. A reliable loop: (1) brief the assistant with context and constraints, (2) generate a draft, (3) verify every claim, number, and reference against a primary source, (4) refine with follow-up instructions. You remain the editor and the accountable author." },
    { h: "Where AI shines — and stalls", p: "Strong: brainstorming, summarizing, explaining concepts, boilerplate code, reformatting, translation. Weak or risky: precise current facts, private/confidential data, final decisions about people (grades, hiring), and anything requiring legal or medical authority. Matching tasks to tool strength is a professional skill, not a limitation." },
  ],
  example: { title: "AI-assisted study plan", body: "Instead of 'make me a study plan', brief the assistant: exam date, syllabus topics, weak areas, 90 minutes/day. Generate the draft, then adjust: move weak topics earlier, add past-paper practice. The plan is yours; the assistant handled the structuring.", code: "brief    → context + constraints + format\ngenerate → draft plan (AI)\nverify   → syllabus coverage, realistic timing (you)\nrefine   → \"move statistics to week 1, add 2 mock exams\"" },
  terms: [["Primary source", "The original authoritative material a claim is checked against."], ["Editor role", "You decide what is correct and publishable; AI proposes."], ["Context window", "How much text the assistant can consider at once — brief it accordingly."]],
  check: { prompt: "You use an AI assistant to summarize a research paper for your project. What is the correct verification step?", options: ["If the summary reads well, it is reliable", "Ask the assistant to confirm its own summary", "Check the summary's claims against the actual paper", "Assume summaries are always more accurate than full text"], answer: 2, explain: "The paper is the primary source. Summaries can drift or invent — the check is always against the original." },
});

// ·· AI ·· Topic 3 — Prompt Engineering
L({
  id: "l-ai-5", courseId: "c-ai", topicId: "t-ai-3", order: 1, title: "Anatomy of an Effective Prompt", minutes: 14,
  summary: "Role, context, task, format, constraints — the five parts that turn vague asks into precise output.",
  why: "The quality gap between a weak and a strong prompt is often bigger than the gap between AI models. Prompting is engineering: structure beats luck.",
  objectives: ["Structure prompts with the five-part template", "Add constraints that eliminate useless output", "Specify output format up front"],
  sections: [
    { h: "The five-part structure", p: "Strong prompts carry: ROLE (who the model should act as), CONTEXT (what it needs to know), TASK (exactly what to produce), FORMAT (shape of the output — list, table, code), CONSTRAINTS (length, tone, what to avoid). Missing parts are filled by the model's guesses — and guesses are average by design." },
    { h: "Constraints do the heavy lifting", p: "Telling a model what NOT to do is as powerful as saying what to do. 'Explain photosynthesis' returns a textbook wall. Add: 'for a 12-year-old, in 5 bullet points, using a kitchen analogy, no jargon' — and the output becomes useful. Constraints are the difference between content and communication." },
  ],
  example: { title: "Before / after", body: "Same goal, two prompts. The second specifies role, audience, format, and constraints — and gets a usable answer in one shot instead of three rounds of fixing.", code: "BEFORE: \"help me with my cover letter\"\n\nAFTER : \"You are a hiring manager in renewable energy.\n        Rewrite my cover letter draft below for a junior analyst\n        role. Keep it under 200 words, 3 paragraphs, concrete\n        achievements only, no clichés like 'passionate'.\"" },
  terms: [["Prompt", "The full instruction — context included — given to a model."], ["Constraint", "An explicit limit on length, style, or content that narrows output."], ["Few-shot", "Including 1–3 examples in the prompt to demonstrate the pattern."]],
  activityHint: "Rewrite one question you asked an AI this week using all five parts. Compare the two outputs side by side.",
  check: { prompt: "Which prompt is best engineered for the task 'feedback on my app idea'?", options: ["'What do you think of my app idea?'", "'As a product analyst, critique this app idea for students: list 3 risks and 3 strengths in a table, be blunt, under 300 words.'", "'Be nice and tell me my app idea is good'", "'Give me feedback' + pasting 40 pages of notes"], answer: 1, explain: "It supplies role, context, task, format, and constraints — leaving nothing to the model's average-case guessing." },
});
L({
  id: "l-ai-6", courseId: "c-ai", topicId: "t-ai-3", order: 2, title: "Iterating: Test, Evaluate, Refine", minutes: 13,
  summary: "Prompting is a loop, not a single shot: version your prompts and judge output against criteria.",
  why: "Professionals do not get great prompts; they get great at improving prompts. The iteration loop is the transferable skill.",
  objectives: ["Run a versioned prompt-improvement loop", "Evaluate outputs against explicit criteria", "Use few-shot examples to teach a pattern"],
  sections: [
    { h: "Treat prompts like code", p: "Version them. Write v1, observe the failure mode ('too long', 'missed the risks', 'wrong tone'), change one thing, write v2. After three versions you usually know the prompt better than the first draft ever did. Keeping a small library of your proven prompts is a genuine professional asset." },
    { h: "Few-shot: show, don't tell", p: "Sometimes describing the pattern is harder than demonstrating it. Including one or two examples of the input→output you want (few-shot prompting) teaches format and tone more reliably than paragraphs of description. One precise example beats ten adjectives." },
  ],
  example: { title: "The improvement loop", body: "Goal: weekly quiz questions from class notes. v1 returns generic questions. Diagnosis: no difficulty spec. v2 adds 'Bloom's level: apply/analyze' and one example question. v2 output is usable; v3 trims wording. Three versions, each changing one variable.", code: "v1: \"make quiz questions from these notes\"        → too generic\nv2: + criteria + 1 example question (few-shot)    → usable ✓\nv3: + \"max 18 words per question\"                 → polished" },
  terms: [["Iteration", "Improving a prompt in versions, changing one variable at a time."], ["Failure mode", "The specific way an output misses the goal — name it before fixing it."], ["Prompt library", "Your saved, proven prompts — reusable engineering artifacts."]],
  check: { prompt: "Your prompt's output is 'right topic, wrong tone'. The most efficient next step is…", options: ["Switch to a different AI model", "Add one example of the desired tone (few-shot) or one explicit tone constraint", "Make the prompt much longer with more background", "Ask 'are you sure?' until the tone changes"], answer: 1, explain: "Change one variable targeting the diagnosed failure. Few-shot examples or a tone constraint directly address tone drift." },
});

// ·· AI ·· Topic 4 — Machine Learning Concepts
L({
  id: "l-ai-7", courseId: "c-ai", topicId: "t-ai-4", order: 1, title: "Supervised Learning: Learning from Examples", minutes: 15,
  summary: "Classification vs. regression — how labeled examples become prediction machines.",
  why: "Supervised learning powers most production AI: fraud flags, price estimates, medical screening. Its logic is the backbone of the field.",
  objectives: ["Distinguish classification from regression", "Explain features and labels with a concrete example", "Map a real problem to a supervised-learning setup"],
  sections: [
    { h: "Two kinds of prediction", p: "If the label is a category — spam/not spam, fraud/legit, cat/dog — the task is classification. If the label is a number — price, temperature, delivery time — it is regression. The setup is identical: examples with features (inputs) and labels (answers); the model learns the mapping; new features go in, a predicted label comes out." },
    { h: "Features are the vocabulary of the problem", p: "Choosing what to measure is half the engineering. Predicting crop yield? Features might be rainfall, soil nitrogen, and planting date. A model can only use what you measure — unmeasured causes become blind spots. Feature design is where domain knowledge makes models dramatically better." },
  ],
  example: { title: "Same data, two tasks", body: "From bank transaction records you can build both: classify transactions as fraudulent/legitimate (category) or estimate how much a customer will spend next month (number). Same features, different label type, different model output.", code: "features (both): amount, merchant, time, location, history\nclassification: label ∈ {fraud, legit}        → \"flag this? yes/no\"\nregression:     label ∈ numbers (€)           → \"next month: €412\"" },
  terms: [["Classification", "Predicting a category label."], ["Regression", "Predicting a numeric label."], ["Feature", "A measured input the model uses to predict."]],
  check: { prompt: "A hospital wants a model that outputs 'low / medium / high' risk for readmission. This is…", options: ["Regression, because risk is serious", "Classification, because the output is a category", "Neither — hospitals cannot use AI", "Regression, because patients are measured"], answer: 1, explain: "The output is one of a fixed set of categories, so it is classification — regardless of how the categories are ordered." },
});
L({
  id: "l-ai-8", courseId: "c-ai", topicId: "t-ai-4", order: 2, title: "Training, Testing, and the Overfitting Trap", minutes: 14,
  summary: "Why models are examined on data they never saw — and what it means when they memorize instead of learn.",
  why: "Overfitting is the most common silent failure in ML. Understanding train/test discipline protects every project you will ever evaluate.",
  objectives: ["Explain why data is split into training and test sets", "Define overfitting and recognize its signature", "Describe one remedy for overfitting"],
  sections: [
    { h: "The held-out exam", p: "If you evaluate a model on the same examples it trained on, you test its memory, not its skill. So engineers hide a portion of the data — the test set — and never show it during training. Test performance estimates how the model will behave on genuinely new data. This discipline is non-negotiable in serious ML." },
    { h: "Memorizing vs. understanding", p: "With enough capacity, a model can memorize training examples — perfect training score, poor test score. That gap is the signature of overfitting: the model learned noise and quirks instead of the pattern. Remedies: more varied data, simpler models, regularization, or early stopping. The goal is always generalization: performance that transfers." },
  ],
  example: { title: "The signature in numbers", body: "A study-app predictor scores 99% on training data but 61% on the held-out test set. The 38-point gap means it memorized. A healthier model shows something like 84% train / 81% test — a small gap, real skill.", code: "overfit:   train 99%  test 61%   gap 38  ← memorized noise\nhealthy:   train 84%  test 81%   gap  3  ← learned the pattern" },
  terms: [["Test set", "Held-out data used once, to estimate real-world performance."], ["Overfitting", "High training performance with poor generalization to new data."], ["Generalization", "The ability to perform well on unseen examples — the actual goal."]],
  check: { prompt: "A model scores 98% on training data and 60% on the test set. What is happening?", options: ["It needs more training epochs on the same data", "It is overfitting — it memorized training examples instead of learning general patterns", "The test set is broken", "This is a healthy, strong model"], answer: 1, explain: "A large train–test gap is the textbook overfitting signature. More memorization (same data, more epochs) makes it worse, not better." },
});

// ·· AI ·· Topic 5 — Responsible AI
L({
  id: "l-ai-9", courseId: "c-ai", topicId: "t-ai-5", order: 1, title: "Bias, Fairness, and Costly Errors", minutes: 13,
  summary: "Where bias enters AI systems, and how unequal error rates cause real harm.",
  why: "AI systems make decisions about people — loans, screening, hiring. Engineers who can spot bias build systems that deserve deployment.",
  objectives: ["Trace how bias enters through data, design, and use", "Explain why equal accuracy can hide unequal errors", "Apply a fairness check to a decision system"],
  sections: [
    { h: "Bias is a pipeline problem", p: "Bias enters at every stage: historical data that reflects past discrimination, labels that encode human prejudice, feature choices that proxy for protected attributes (postcode as a stand-in for ethnicity), and deployment in contexts the data never covered. Fairness is not a filter you add at the end — it is an inspection at every stage." },
    { h: "Errors are not distributed equally", p: "A face-analysis system can be 95% accurate overall yet fail far more often on one demographic. Aggregate accuracy hides who carries the errors — and in high-stakes decisions, errors are not symmetric: a wrongly denied loan and a wrongly approved one harm different people differently. Ask: who bears the false positives, and who bears the false negatives?" },
  ],
  example: { title: "The résumé experiment", body: "A hiring model trained on ten years of past hires learns that most senior engineers were men — so it down-ranks résumés mentioning women's colleges. The data was 'accurate history'; the model industrialized its bias. The fix begins with questioning the label itself: were past hiring decisions actually good?", code: "history:  senior hires → 87% one demographic\nmodel:    learns \"that demographic ⇒ senior material\"\nresult:   qualified applicants down-ranked, silently, at scale\ncheck:    compare error rates per group, not just overall accuracy" },
  terms: [["Proxy feature", "A neutral-looking input that stands in for a protected attribute."], ["False positive / negative", "Wrongly accepting / wrongly rejecting — their costs are rarely equal."], ["Disparate impact", "When a system's errors fall disproportionately on one group."]],
  check: { prompt: "A model has 90% overall accuracy but 74% accuracy for one demographic group. The responsible response is…", options: ["Ship it — 90% overall is strong", "Investigate error rates per group before deployment", "Remove the demographic data so the model can't be biased", "Retrain until overall accuracy reaches 99%"], answer: 1, explain: "Aggregate accuracy hides distribution of harm. Removing demographic data prevents you from measuring fairness. Inspect per-group errors first." },
});
L({
  id: "l-ai-10", courseId: "c-ai", topicId: "t-ai-5", order: 2, title: "Using AI Safely and Honestly", minutes: 12,
  summary: "Privacy, disclosure, and verification — a personal code of conduct for AI-assisted work.",
  why: "Your judgment is what makes AI output trustworthy. These habits protect your data, your credibility, and the people affected by your work.",
  objectives: ["Apply a privacy checklist before sharing data with AI tools", "Disclose AI involvement where it matters", "Build a personal verification habit"],
  sections: [
    { h: "The privacy checkpoint", p: "Before pasting anything into an AI tool, ask: does this contain personal data about others? Confidential work? Security-sensitive details? Most public tools may retain or train on what you send. Anonymize, summarize, or use approved institutional tools. Convenience never justifies leaking other people's data." },
    { h: "Honesty as a professional standard", p: "Two rules keep AI-assisted work credible. One: you are accountable for everything you publish under your name — the assistant was the drafter, you are the author. Two: disclose AI involvement wherever the audience reasonably expects to know (academic work, client deliverables, public claims). And always verify facts, figures, and references before they travel anywhere." },
  ],
  example: { title: "The 30-second checkpoint", body: "Before sending any text to a public assistant: (1) names, IDs, grades, health or financial details → remove; (2) confidential or unreleased material → do not send; (3) could this embarrass someone if leaked? → rewrite. Then send the sanitized version.", code: "✗ \"Summarize these 30 student records with grades…\"\n✓ \"Summarize this anonymized, aggregated grade distribution…\"\n✗ \"Write my essay about X\"\n✓ \"Give me 5 angles on X\" → you research, write, and own it" },
  terms: [["Anonymization", "Removing identifying details before processing data."], ["Disclosure", "Stating that AI assisted in producing the work."], ["Accountability", "The author — you — stands behind the output."]],
  check: { prompt: "You want AI feedback on an app containing real user sign-up data. What do you do?", options: ["Paste it — feedback is more useful with real data", "Replace real data with anonymized or synthetic samples first", "Paste it but ask the AI to keep it secret", "Only paste half the records to reduce risk"], answer: 1, explain: "Anonymized or synthetic data preserves the analytical value without exposing real people's information. Asking for secrecy is not a control." },
});

// ·· AI ·· Topic 6 — Natural Language Processing
L({
  id: "l-ai-11", courseId: "c-ai", topicId: "t-ai-6", order: 1, title: "What Is NLP? How AI Works with Human Language", minutes: 14,
  summary: "Natural Language Processing helps computers understand, generate, and work with human language.",
  why: "Language is how people communicate, reason, and express ideas. NLP gives AI a way to read text, interpret meaning, and respond in ways that feel natural.",
  objectives: ["Define Natural Language Processing in plain terms", "Explain why human language is difficult for machines", "Recognize common NLP tasks in everyday AI tools"],
  sections: [
    { h: "What is NLP?", p: "Natural Language Processing, or NLP, is a branch of AI focused on understanding and generating human language. It helps systems process text and speech so they can classify messages, summarize documents, translate languages, answer questions, and generate helpful responses." },
    { h: "Why language is hard for AI", p: "Human language is full of context, ambiguity, tone, slang, and meaning that changes by situation. The same sentence can mean different things depending on stress, culture, or recent conversation. NLP models learn patterns from large amounts of language data, but they still do not understand language the same way a human does." },
    { h: "AI understanding vs. human understanding", p: "Humans use memory, intention, background knowledge, and context. AI models use patterns in text, probability, and learned representations to predict likely words or meanings. That is why AI can be highly useful for language tasks while still making mistakes, especially with sarcasm, hidden meaning, or factual accuracy." },
  ],
  example: { title: "NLP in everyday life", body: "Your phone auto-corrects text, your email app flags spam, a translator converts a sentence into another language, and a chatbot helps answer questions. All of these rely on NLP techniques to work with human language.", code: "input text:   \"I can't wait to see you!\"\nNLP tasks:    sentiment, tone detection, grammar, chatbot reply\nresult:       friendly, positive message understood and responded to" },
  terms: [["Natural Language Processing (NLP)", "A field of AI that helps computers understand and generate human language."], ["Language model", "A model trained on large language data to predict and generate text."], ["Context", "The surrounding words, situation, or background that give meaning to language."]],
  activityHint: "List 5 examples where AI is using human language in your daily life: messaging apps, search, chatbots, translation, and voice assistants.",
  check: { prompt: "Which statement best describes NLP?", options: ["A way to design circuits for robots", "AI that helps computers understand and generate human language", "A method for storing databases", "A type of machine hardware"], answer: 1, explain: "NLP is the AI field for language understanding, generation, translation, and interaction." },
});
L({
  id: "l-ai-12", courseId: "c-ai", topicId: "t-ai-6", order: 2, title: "Core NLP Tasks: Classification, Sentiment, Translation, and More", minutes: 16,
  summary: "Major NLP tasks include text classification, sentiment analysis, chatbots, translation, speech recognition, text prediction, keyword extraction, and language modeling.",
  why: "NLP systems solve many useful tasks. Learning the main types of language problems helps you understand how AI applications are built and where they are strongest.",
  objectives: ["Explain the main NLP tasks", "Differentiate between classification, sentiment, and prediction", "Connect NLP tasks to real AI products and services"],
  sections: [
    { h: "Text classification", p: "Text classification is when an AI model assigns input text to a category or class. Examples include detecting spam emails, labeling a message as urgent or normal, or sorting support tickets into billing, technical, or account issues. The system learns patterns from many labeled examples and then predicts the class for new texts." },
    { h: "Sentiment analysis", p: "Sentiment analysis helps detect whether a message is positive, negative, or neutral. Companies use it to study customer reviews, social media comments, or product feedback. A model may classify the text as happy, angry, disappointed, or satisfied based on the words and context used." },
    { h: "Chatbots and dialogue systems", p: "Chatbots use NLP to understand user questions and generate helpful replies. A simple chatbot may answer a question, while more advanced systems can carry a conversation across several turns. These systems rely on language understanding, context, and response generation." },
    { h: "Translation and speech recognition", p: "Machine translation turns one language into another, such as English to French or Swahili to English. Speech recognition turns spoken words into text, which then allows voice assistants, transcripts, and dictation tools to work. Many modern systems combine both: speech to text, language understanding, and generation back into spoken language." },
    { h: "Text prediction and keyword extraction", p: "Text prediction is used in typing suggestions, search query completion, and email auto-complete. Keyword extraction identifies important terms or topics in a document, which helps with summaries, search, and content organization. These are practical NLP tasks that improve productivity and information retrieval." },
    { h: "Language models and the bigger picture", p: "Language models are trained on huge amounts of text and learn to predict the next words in a sequence. They can answer questions, summarize text, generate stories, and write code. However, they are probabilistic systems — they predict likely language, not guaranteed truth — so outputs still need checking." },
  ],
  example: { title: "A real NLP pipeline", body: "A customer writes: 'I am unhappy with the delivery — it arrived late and the package was damaged.' An NLP system can classify the message as complaint, detect negative sentiment, extract keywords such as 'late' and 'damaged', and route it to the customer support team or chatbot for response.", code: "Message: \"I am unhappy with the delivery; it was late and damaged.\"\nTasks:  sentiment analysis → negative\n        text classification → complaint\n        keyword extraction → late, damaged, delivery\n        chatbot reply → apologize and offer support" },
  terms: [["Text classification", "Assigning text to a category such as spam or not spam."], ["Sentiment analysis", "Identifying the emotional tone of a message."], ["Keyword extraction", "Finding the most important words or phrases in a text."], ["Speech recognition", "Turning spoken language into text."], ["Machine translation", "Converting text from one language to another."], ["Language model", "A model trained to understand and generate language by predicting likely words."]],
  activityHint: "Choose one AI app or service you use daily and identify which NLP task it performs: classification, sentiment, translation, prediction, keyword extraction, or chatbot interaction.",
  check: { prompt: "Which NLP task is most closely related to identifying whether a customer review is positive or negative?", options: ["Text prediction", "Sentiment analysis", "Speech recognition", "Keyword extraction"], answer: 1, explain: "Sentiment analysis detects emotional tone, such as positive, negative, or neutral language." },
});

// ·· ROBOTICS ·· Topic 1 — Robotics Fundamentals
L({
  id: "l-rb-1", courseId: "c-rob", topicId: "t-rb-1", order: 1, title: "What Makes a Robot?", minutes: 12,
  summary: "The sense–think–act loop: the pattern shared by every robot from a line-follower to a Mars rover.",
  why: "Every robotics project you will ever build is an instance of one loop. Master the loop and every new robot becomes a variation, not a mystery.",
  objectives: ["Describe the sense–think–act loop", "Identify sensors, controllers, and actuators in real robots", "Explain why feedback separates robots from machines"],
  sections: [
    { h: "Sense → think → act, forever", p: "A robot measures the world with sensors (distance, light, temperature, touch), decides something with a controller running your program, and changes the world with actuators (motors, pumps, LEDs, speakers). Then it measures again. A line-follower does this hundreds of times per second; a rover does it with a five-minute delay from Mars. Same loop, different scale." },
    { h: "Machines move; robots respond", p: "A washing machine follows a fixed timed sequence — it does not care what is inside. A robot adjusts its behavior based on what it senses: a vacuum that maps the room and revisits dirty spots, a gripper that softens its grip on an egg. The defining feature is a feedback loop from the environment back into the decision." },
  ],
  example: { title: "Anatomy of a line-follower", body: "Infrared sensors look down (sense). Your code compares left vs. right brightness (think). Motors adjust speed on each wheel to steer back onto the line (act). Loop repeats ~100×/second. Remove any leg of the loop and it is no longer a robot.", code: "SENSE:  left_sensor=0.9  right_sensor=0.2   (line drifted left)\nTHINK:  if left bright → steer left\nACT:    left_motor 40%  right_motor 80%      (turn toward line)\nREPEAT: every 10 ms" },
  terms: [["Sensor", "A component that measures a physical quantity and reports it as a signal."], ["Actuator", "A component that turns a command into physical action (motion, light, sound)."], ["Feedback loop", "Using sensor results to adjust the next action."]],
  activityHint: "Pick any automated device at home. Diagram its sense–think–act loop — or explain which leg is missing.",
  check: { prompt: "An automatic door opens when someone approaches. Which sequence describes it?", options: ["Act → sense → think", "Sense (motion detected) → think (someone is approaching) → act (motor opens door)", "Think → act → sense", "It is not a loop — doors are simple"], answer: 1, explain: "It senses presence, decides, and actuates the motor — then senses again to decide when to close. A full loop." },
});
L({
  id: "l-rb-2", courseId: "c-rob", topicId: "t-rb-1", order: 2, title: "The Control Loop in Practice", minutes: 13,
  summary: "From 'if obstacle, stop' to smooth proportional control — how decision logic shapes robot behavior.",
  why: "The difference between a jerky toy and a smooth machine is the quality of its control logic. This is where programming meets physics.",
  objectives: ["Write simple rule-based robot logic", "Explain proportional response in plain terms", "Predict how loop speed affects behavior"],
  sections: [
    { h: "Rules first: bang-bang control", p: "The simplest robot logic is a rule: IF distance < 20cm THEN stop. This 'bang-bang' control works but is jerky — full speed, then full stop. It is the right place to start because it is debuggable: one condition, one action, obvious behavior." },
    { h: "Smarter: respond in proportion", p: "Better behavior comes from responding in proportion to the error. A line-follower that turns a little when slightly off-line and a lot when far off-line traces smoothly instead of zigzagging. Proportional thinking — action scales with how wrong things are — is the gateway to all serious control, from cruise control to drone stabilization." },
  ],
  example: { title: "Two wall-avoiders", body: "Robot A: if wall < 20cm → full reverse. Result: lurches backward, spins randomly, lurches again. Robot B: speed scales with distance — slow down as the wall approaches, turn gradually. Same sensor, proportionally better behavior.", code: "bang-bang:  if dist < 20:  speed = -100%   (jerk!)\n\nproportional: speed = min(100, dist × 5)   (dist 40 → 100%,\n              dist 10 → 50%, dist 4 → 20%) smooth approach" },
  terms: [["Bang-bang control", "All-or-nothing switching between extreme actions."], ["Error", "The gap between where you are and where you want to be."], ["Proportional response", "Action strength scales with the size of the error."]],
  check: { prompt: "A line-follower zigzags violently across the line. The best first improvement is…", options: ["Faster motors", "Make the turn proportional to how far off the line it is", "Remove one sensor", "Run the loop less often"], answer: 1, explain: "Violent zigzag is the bang-bang signature: full correction for any error. Scaling correction to the error smooths the path." },
});

// ·· ROBOTICS ·· Topic 2 — Electronics & Sensors
L({
  id: "l-rb-3", courseId: "c-rob", topicId: "t-rb-2", order: 1, title: "Circuits, Voltage, and Current", minutes: 15,
  summary: "The water-pipe model of electricity, plus Ohm's law — enough to wire real projects safely.",
  why: "Hardware does not forgive guesswork. A working mental model of circuits is what keeps your components (and fingers) safe.",
  objectives: ["Explain voltage, current, and resistance with the pipe analogy", "Apply Ohm's law to size a resistor", "Identify an open vs. a short circuit"],
  sections: [
    { h: "The pipe model", p: "Think of a circuit as a loop of pipe with a pump (battery). Voltage is the pump's pressure, measured in volts. Current is the flow of water — electrons — measured in amperes. Resistance is a narrowing in the pipe that restricts flow, measured in ohms. More pressure pushes more flow; more restriction reduces it. Components are engineered to expect specific pressure and flow." },
    { h: "Ohm's law: V = I × R", p: "The three quantities lock together: Voltage = Current × Resistance. An LED wants about 2V and 20mA from a 5V supply — so a resistor must drop the extra 3V at 20mA: R = 3V ÷ 0.02A = 150Ω. This one calculation protects nearly every beginner circuit you will build. A short circuit is resistance ≈ 0, which means current → enormous: that is why shorts spark and burn." },
  ],
  example: { title: "Sizing an LED resistor", body: "Supply 5V, LED drop 2V, target current 20mA. The resistor handles the difference: 3V ÷ 0.02A = 150Ω. The nearest standard value, 220Ω, is slightly dimmer and even safer — engineers round up.", code: "V_supply 5V − V_led 2V = 3V across resistor\nR = V / I = 3V / 0.02A = 150 Ω\nuse next common value up → 220 Ω (safe, slightly dimmer)" },
  terms: [["Voltage (V)", "Electrical 'pressure' that pushes charge through a circuit."], ["Current (A)", "The rate of charge flow — what actually does work (and harm)."], ["Resistance (Ω)", "Opposition to current flow; sets how much current passes."]],
  check: { prompt: "With a fixed voltage, you increase the resistance in a circuit. The current…", options: ["Increases", "Decreases", "Stays the same", "Becomes negative"], answer: 1, explain: "Ohm's law: I = V/R. Fixed V, larger R → smaller current. More restriction, less flow." },
});
L({
  id: "l-rb-4", courseId: "c-rob", topicId: "t-rb-2", order: 2, title: "Sensors: Measuring the Physical World", minutes: 14,
  summary: "Analog vs. digital signals, and how to choose the right sensor for the job.",
  why: "Sensors are the robot's connection to reality. Choosing and reading them correctly determines everything the system can know.",
  objectives: ["Distinguish analog from digital sensor signals", "Match sensor types to physical quantities", "Explain what a sensor reading actually represents"],
  sections: [
    { h: "Two kinds of signals", p: "Digital sensors report discrete states: button pressed/not pressed, motion detected/clear — on or off. Analog sensors report a continuous range: a light sensor returning any value from 0 to 1023 as the room brightens. Microcontrollers convert analog voltages into numbers with an analog-to-digital converter (ADC), so your code sees numbers either way." },
    { h: "Reading a number, understanding a quantity", p: "A sensor value is meaningless until calibrated against reality. An ultrasonic sensor reports pulse time; you convert it to centimeters. A soil moisture sensor's '612' means nothing until you map it: dry pot = 800, wet pot = 300. Every serious sensor project includes a calibration step where you record known conditions and their readings — that mapping is what turns numbers into knowledge." },
  ],
  example: { title: "Choosing sensors for a smart plant pot", body: "What do you need to know? Soil wetness (analog moisture probe), light level (analog photoresistor), room temperature (digital temperature sensor), and 'was it watered?' (digital flow switch). Each question maps to a sensor type and signal kind.", code: "soil wetness  → analog moisture probe   (0–1023, needs calibration)\nlight level   → analog photoresistor    (bright = low resistance)\ntemperature   → digital sensor (e.g. DHT) (returns °C directly)\nwatered?      → digital flow switch      (on/off pulse)" },
  terms: [["Analog signal", "A continuous range of values representing a measured quantity."], ["Digital signal", "A discrete on/off or countable signal."], ["Calibration", "Mapping raw sensor numbers to real-world values you measured."]],
  check: { prompt: "Your soil moisture sensor reads 612. What can you confidently conclude?", options: ["The soil is 61.2% wet", "The soil is dry", "Almost nothing — until you calibrate what readings mean for your soil and sensor", "The sensor is broken"], answer: 2, explain: "Raw values are arbitrary until calibrated against known conditions. 612 could be soggy or bone-dry depending on the probe and soil." },
});

// ·· ROBOTICS ·· Topic 3 — Microcontrollers
L({
  id: "l-rb-5", courseId: "c-rob", topicId: "t-rb-3", order: 1, title: "Inside a Microcontroller", minutes: 14,
  summary: "A computer the size of a stamp: GPIO pins, programs that run in a loop, and why it beats a laptop for embedded jobs.",
  why: "Microcontrollers put your code inside the physical world. Understanding pins and the main loop unlocks every IoT and robotics build.",
  objectives: ["Describe what GPIO pins do", "Explain why embedded code runs setup once, then loops forever", "Give reasons to choose a microcontroller over a full computer"],
  sections: [
    { h: "Pins: the hands and ears", p: "A microcontroller is a tiny computer whose edge is lined with General Purpose Input/Output (GPIO) pins. Configured as input, a pin reads the world — is this wire high or low? Configured as output, it commands the world — set this pin high to light an LED. Your entire program is a conversation through these pins." },
    { h: "Setup once, loop forever", p: "Unlike a laptop app that opens and closes, embedded code runs a setup() function once (configure the pins), then a loop() function repeatedly, forever, as long as power flows. Every sensor read, every decision, every motor command happens inside that loop. This is why responsiveness depends on keeping the loop fast and free of blocking waits." },
  ],
  example: { title: "The smallest real program", body: "Blinking an LED is the 'hello world' of hardware because it exercises the whole stack: configure pin 13 as output (setup), then alternate high/low with a delay (loop). If this runs, your toolchain, board, and understanding of pins all work.", code: "setup() {\n  pinMode(13, OUTPUT)      // pin 13 will command an LED\n}\nloop() {\n  digitalWrite(13, HIGH)   // LED on\n  delay(500)\n  digitalWrite(13, LOW)    // LED off\n  delay(500)\n}                          // …repeats forever" },
  terms: [["GPIO", "General Purpose Input/Output pins — configurable connections to the outside world."], ["setup()", "Runs once at boot to configure pins and state."], ["loop()", "Runs repeatedly forever — the heartbeat of embedded programs."]],
  check: { prompt: "Why does embedded code use setup() + loop() instead of running top-to-bottom once?", options: ["Microcontrollers have no memory", "The device must keep responding to the world indefinitely", "Loops are faster than sequential code", "It is only a convention with no reason"], answer: 1, explain: "A robot or sensor node must keep sensing and acting as long as it has power. The infinite loop is the design, not a limitation." },
});
L({
  id: "l-rb-6", courseId: "c-rob", topicId: "t-rb-3", order: 2, title: "Reading Inputs, Driving Outputs", minutes: 15,
  summary: "Wiring a button and an LED to a microcontroller — your first complete sense–think–act circuit.",
  why: "This single exercise contains the DNA of every embedded project: read a state, make a decision, change the physical world.",
  objectives: ["Wire input and output components correctly", "Read a digital input and branch on it", "Debug the three most common wiring mistakes"],
  sections: [
    { h: "Button in, LED out", p: "The classic first circuit: a button wired to an input pin (with a resistor so the pin reads a clean LOW when unpressed), an LED with its current-limiting resistor on an output pin. The program reads the button each loop; when pressed, the LED lights. You have just built the smallest possible sense–think–act system." },
    { h: "Debug like an engineer", p: "Three failures cover 90% of beginner circuits: component wired backwards (LEDs and many sensors are one-way — check polarity), loose jumper wires (press each connection gently while watching), and the wrong pin in code versus the board (pin 13 in code, wire in pin 3). The discipline: check polarity, check connections, check pin numbers — in that order." },
  ],
  example: { title: "From press to light", body: "Each loop iteration: read the button pin. If HIGH (pressed), set the LED pin HIGH; otherwise LOW. The LED mirrors your finger within milliseconds — and every smart device is this loop with better sensors and better decisions.", code: "loop() {\n  int pressed = digitalRead(2)   // SENSE: pin 2 = button\n  if (pressed == HIGH) {         // THINK: decision\n    digitalWrite(13, HIGH)       // ACT: LED on\n  } else {\n    digitalWrite(13, LOW)        // ACT: LED off\n  }\n}" },
  terms: [["Polarity", "Components that only work wired one direction (anode/cathode, VCC/GND)."], ["Pull-down resistor", "Keeps an input pin at a defined LOW when the button is open."], ["digitalRead", "Reads a pin as HIGH (on) or LOW (off)."]],
  check: { prompt: "Your button circuit never reads HIGH. You have confirmed the code and pin numbers are correct. What do you check next?", options: ["Rewrite the program in another language", "Wiring: loose jumpers, button orientation, and missing pull-down resistor", "Replace the microcontroller", "Increase the delay() time"], answer: 1, explain: "With code and pins verified, the fault is physical: connections, orientation, or the pin floating LOW because the pull-down/pull-up is missing." },
});

// ·· ROBOTICS ·· Topic 4 — IoT Systems
L({
  id: "l-rb-7", courseId: "c-rob", topicId: "t-rb-4", order: 1, title: "Connected Devices: How IoT Talks", minutes: 14,
  summary: "MQTT, brokers, and pub/sub — the messaging pattern behind smart-home and industrial IoT.",
  why: "IoT is not magic connectivity; it is a messaging pattern. Learn the pattern and you can design systems with dozens of devices.",
  objectives: ["Explain the publish/subscribe model", "Describe the broker's role", "Design topics for a small IoT system"],
  sections: [
    { h: "Publish and subscribe", p: "IoT devices rarely talk directly to each other. Instead they use a broker — a mailroom in the cloud or on your network. A sensor publishes a message to a topic like farm/field1/soil/moisture. A dashboard subscribes to that topic and receives every message. Devices never need to know who is listening — they just publish to well-named topics." },
    { h: "Topics are an architecture", p: "Topic names are your system design: greenhouse/temp/now, greenhouse/humidity/now, greenhouse/pump/command. Sensors publish readings; controllers subscribe to command topics. New listeners — a phone app, an alert service, a database logger — join by subscribing, with zero changes to the devices. Good topic design is what lets IoT systems grow." },
  ],
  example: { title: "A one-room IoT system", body: "A temperature sensor publishes to room/temp every 30 seconds. Three subscribers, three jobs: a dashboard displays it, a logger stores history, an alert service watches for > 30°C. Add a fourth subscriber later — nothing else changes.", code: "sensor  → publishes → \"room/temp\"  (23.4, every 30s)\n                     ┌→ dashboard:  displays it\nbroker routes to ────┼→ logger:     saves history\n                     └→ alert:      if > 30°C → notify" },
  terms: [["MQTT", "A lightweight messaging protocol built for small devices and unreliable networks."], ["Broker", "The service that receives published messages and routes them to subscribers."], ["Topic", "A named channel, structured like a path, that groups related messages."]],
  check: { prompt: "You add a new phone app that should display your greenhouse's temperature. With pub/sub, you…", options: ["Rewrite the sensor's firmware to know about the phone", "Subscribe the app to the existing temperature topic — no device changes", "Buy a second temperature sensor for the phone", "Connect the phone directly to the sensor's wires"], answer: 1, explain: "That is the power of pub/sub: new consumers subscribe to existing topics. The publishing device never changes." },
});
L({
  id: "l-rb-8", courseId: "c-rob", topicId: "t-rb-4", order: 2, title: "From Sensor to Cloud Dashboard", minutes: 15,
  summary: "The complete IoT data flow: measure, publish, route, store, display, alert.",
  why: "Seeing the whole pipeline lets you place any component — and debug any failure — in a connected system.",
  objectives: ["Trace data from physical quantity to dashboard pixel", "Explain where storage and alerting happen", "Identify single points of failure in an IoT chain"],
  sections: [
    { h: "Six stages of a reading", p: "A soil reading's journey: (1) the probe measures moisture as voltage; (2) the microcontroller converts it to a number and packages it as a message; (3) it publishes via Wi-Fi to the broker; (4) a subscriber stores it in a database; (5) a dashboard queries history and draws a chart; (6) an alert rule checks thresholds and notifies you. Each stage is a place data can be lost — which is exactly where you debug." },
    { h: "Design for the moment Wi-Fi drops", p: "Real networks fail. A well-designed node buffers recent readings locally and sends them when the connection returns; dashboards show the age of the last reading, not just the value. 'Last updated 6 hours ago' is information; a silently stale number is a lie. Robustness is designed at every stage, not hoped for." },
  ],
  example: { title: "Where did the data die?", body: "Your dashboard shows nothing. Debug the chain in order: is the sensor powered and reading? Is the device on Wi-Fi? Did the broker receive the message? Is the logger subscribed and writing? Is the dashboard querying the right table? Walking the pipeline stage by stage finds the break in minutes.", code: "probe → µC → Wi-Fi → broker → logger → database → dashboard\n  ✓      ✓     ✗ dead here: device lost Wi-Fi at 03:00\nfix: buffer locally + auto-reconnect → gaps disappear" },
  terms: [["Telemetry", "The measurements devices send about their environment and themselves."], ["Time-series data", "Readings stored with timestamps — the natural shape of sensor history."], ["Stale data", "Readings old enough to mislead; always display data age."]],
  check: { prompt: "Your dashboard displays a soil value, but you watered the plant an hour ago and it has not changed. The most useful first question is…", options: ["Is the chart color wrong?", "How old is the last reading — is data actually flowing?", "Should I buy a bigger database?", "Does the dashboard need a redesign?"], answer: 1, explain: "Display the data's age first. A stale value with an old timestamp points you down the pipeline; a fresh wrong value points at the probe." },
});

// ·· ROBOTICS ·· Topic 5 — Automation & Control
L({
  id: "l-rb-9", courseId: "c-rob", topicId: "t-rb-5", order: 1, title: "Rules, Thresholds, and Hysteresis", minutes: 13,
  summary: "Designing automation rules that don't chatter — why smart thresholds have two edges.",
  why: "Naive thresholds make systems flicker and wear out hardware. Hysteresis is the one idea that makes rule-based automation reliable.",
  objectives: ["Write event-driven automation rules", "Explain the chattering problem at a single threshold", "Design a two-threshold (hysteresis) rule"],
  sections: [
    { h: "The flickering fan", p: "Rule: IF temperature > 25°C THEN fan on. At 25.0 the fan turns on, cools to 24.9, turns off, warms to 25.0, turns on… clicking on and off every few seconds. The sensor isn't wrong; the rule is. A single threshold is a knife-edge, and real measurements always wobble across it." },
    { h: "Two edges solve it: hysteresis", p: "Give the rule a band: turn ON above 26°C, turn OFF below 24°C. Between 24 and 26, the fan simply holds its current state. That dead band — hysteresis — absorbs the wobble. Thermostats, water pumps, and phone brightness all use it. Whenever you automate with thresholds, design the band before you write the code." },
  ],
  example: { title: "Before / after hysteresis", body: "Same greenhouse fan, two rules. The single-threshold fan switches 40 times an hour and dies in a month. The banded version switches a few times a day and runs for years — with identical average temperature.", code: "naive:  if temp > 25: fan = ON   else fan = OFF\n        → switches ~40×/hour (chatter, hardware wear)\n\nbanded: if temp > 26: fan = ON\n        if temp < 24: fan = OFF   (between: keep state)\n        → switches ~6×/day, same comfort" },
  terms: [["Threshold", "The value at which a rule triggers."], ["Hysteresis", "A deliberate gap between turn-on and turn-off thresholds."], ["Chattering", "Rapid on/off cycling caused by wobble across a single threshold."]],
  check: { prompt: "A water pump turns on at soil moisture < 300 and off at moisture > 300. It clicks on/off every minute. The fix is…", options: ["A faster pump", "Add hysteresis: on below 300, off only above a higher value like 400", "Measure moisture more often", "Remove the sensor"], answer: 1, explain: "Wet soil reads ~350 right after watering, then drops — crossing 300 repeatedly. An off-threshold above the on-threshold creates a stable band." },
});
L({
  id: "l-rb-10", courseId: "c-rob", topicId: "t-rb-5", order: 2, title: "Automation Design Patterns", minutes: 14,
  summary: "Timers, event rules, and closed-loop control — the three patterns behind nearly all automation.",
  why: "Recognizing which pattern a problem needs prevents both overbuilding and fragile hacks.",
  objectives: ["Choose between timer, event, and closed-loop automation", "Combine patterns for robust systems", "List failure modes each pattern must handle"],
  sections: [
    { h: "Three patterns", p: "TIMER: do X every N minutes — simple, predictable, blind to conditions (waters even during rain). EVENT: when sensor crosses a threshold, act — responsive, but only to what you anticipated. CLOSED LOOP: continuously adjust output to hold a target (a thermostat modulating a heater) — smooth and adaptive, more complex. Most real systems combine them: closed loop for comfort, events for alarms, timers for safety backups." },
    { h: "Design for the failure, not the happy path", p: "Each pattern fails differently, so each needs its own guard: timers need a watchdog (did the schedule actually run?), event rules need hysteresis and sensor-fault detection (a dead sensor reading 0 forever would run the pump dry), closed loops need limits (cap the maximum output so a bad reading cannot drive hardware to destruction). Automation you can trust is automation that expects to be wrong." },
  ],
  example: { title: "Layered greenhouse control", body: "Closed loop keeps temperature in band. An event rule opens a vent if humidity spikes past 85%. A timer runs a 30-second circulation fan every hour regardless. A watchdog alarm fires if no sensor message arrives for 10 minutes. Four patterns, each covering the others' blind spots.", code: "closed loop: heater power ∝ (target − temp)      smooth comfort\nevent:       humidity > 85% → open vent 10 min   fast response\ntimer:       hourly 30s air circulation           predictable\nwatchdog:    no data 10 min → alert the owner     trust" },
  terms: [["Closed-loop control", "Continuously adjusting output to hold a measured target."], ["Watchdog", "A monitor that raises an alarm when the system goes silent."], ["Event rule", "An if-this-then-that trigger on a sensor condition."]],
  check: { prompt: "You need a system that keeps a server room at exactly 21°C despite doors opening and weather changes. Best pattern?", options: ["A timer that runs the AC for 10 minutes every hour", "A single event rule at 21°C", "Closed-loop control with a target of 21°C", "No automation — manual control"], answer: 2, explain: "Holding an exact target under changing conditions requires continuous adjustment — the definition of closed loop. Timers and single events overshoot and chatter." },
});

// ·· ROBOTICS ·· Topic 6 — Practical Robotics Projects
L({
  id: "l-rb-11", courseId: "c-rob", topicId: "t-rb-6", order: 1, title: "Planning a Build: Requirements and BOM", minutes: 13,
  summary: "Turning 'I want a robot that…' into testable requirements and a bill of materials.",
  why: "Builds fail in planning, not soldering. A written requirement and a parts list are the cheapest engineering you will ever do.",
  objectives: ["Write measurable requirements", "Produce a bill of materials (BOM)", "Identify the riskiest component to prototype first"],
  sections: [
    { h: "Requirements you can test", p: "'Moves well' is a wish; 'travels 3 meters in under 10 seconds on a flat surface' is a requirement — you can build a test for it. Write 5–8 testable requirements (distance, speed, battery life, sensor range, budget). Each one later becomes a pass/fail check on demo day. Requirements are a contract with yourself." },
    { h: "The bill of materials", p: "List every part: microcontroller, motor driver, two motors, wheels, ultrasonic sensor, battery pack, chassis, jumpers — with quantities and costs. The BOM exposes impossibilities early: the battery cannot supply the motors' stall current; the sensor's range is shorter than the requirement. De-risk by prototyping the riskiest piece first — usually whatever moves or senses." },
  ],
  example: { title: "Obstacle-avoider, planned", body: "Requirements: avoids walls ≥ 15 cm away; turns within 1 s of detecting one; runs 30 min per charge; budget ≤ €40. BOM sums to €32. Riskiest part: the motor driver's current rating — so test motors + driver alone before building any chassis.", code: "REQ-1 avoids obstacles detected at ≥ 15 cm      (test: wall run)\nREQ-2 turns clear within 1 second               (test: timed)\nREQ-3 ≥ 30 min runtime                          (test: timed run)\nBOM:  board €9, driver €3, motors 2×€4, sensor €3,\n      battery €8, chassis €5 = €32 ≤ €40 ✓\nRISK: driver current → prototype motors first" },
  terms: [["Requirement", "A specific, testable statement of what the build must do."], ["BOM", "Bill of materials — the complete priced parts list."], ["De-risking", "Prototyping the most uncertain component before full assembly."]],
  check: { prompt: "Which of these is a proper project requirement?", options: ["The robot should be cool", "Battery life should be good", "The robot stops within 20 cm of an obstacle, 9 times out of 10", "Use the best possible sensor"], answer: 2, explain: "It is specific, measurable, and testable — you can run the robot ten times at a wall and count. The others cannot be tested." },
});
L({
  id: "l-rb-12", courseId: "c-rob", topicId: "t-rb-6", order: 2, title: "Testing, Debugging, and Demo Day", minutes: 14,
  summary: "A systematic test plan, the sensor-first debugging order, and how to demo honestly.",
  why: "Anyone can build something that works once on their desk. Engineers build things that work in front of other people.",
  objectives: ["Write a test plan from requirements", "Apply the sensor-first debugging order", "Demo with honesty: show the failure mode too"],
  sections: [
    { h: "Test the requirement, then the integration", p: "Unit-test each subsystem alone: does the sensor report sensible values at known distances? Do the motors turn the right way at the right speed? Only then integrate — because a bug found at integration could be anywhere, while a bug found in a subsystem is exactly somewhere. Integration failures are almost always wiring or power: motors browning out the board is the classic." },
    { h: "Demo honestly", p: "A great demo shows the requirement being met, names the current limitation ('it struggles with black surfaces — infrared sees them as holes'), and states the next fix. Hiding failure modes is how toy projects stay toys; naming them is how builders earn trust. Demo day is not a performance — it is an engineering report that happens to be fun." },
  ],
  example: { title: "The debugging order", body: "Robot does nothing when powered: (1) sensor sanity — cover/uncover the sensor, watch values change; (2) actuator sanity — command motors directly, watch them spin; (3) power — measure battery under load; (4) logic — print the decision each loop. Four checks, in order, find almost everything.", code: "1. SENSOR:   values change with distance?     yes → next\n2. ACTUATOR: motors spin when commanded?      yes → next\n3. POWER:    battery ≥ rated under load?      NO ← found it:\n             motors brown out the board → separate supply\n4. LOGIC:    (reached only if 1–3 pass)" },
  terms: [["Unit test", "Verifying one subsystem in isolation before integration."], ["Brownout", "Voltage collapse when motors draw current the supply cannot give."], ["Failure mode", "The known condition under which your build misbehaves — declare it."]],
  check: { prompt: "Your robot worked on USB power but acts strangely on batteries when motors run. Most likely cause?", options: ["The code changed itself", "Voltage drop under motor load starving the board — power issue", "The Wi-Fi is weaker on batteries", "You need a more expensive chassis"], answer: 1, explain: "Classic brownout: motors draw heavy current, battery voltage sags, the microcontroller resets or misreads. Separate or regulate the motor supply." },
});

// ·· ROBOTICS ·· Topic 7 — AI in Robotics
L({
  id: "l-rb-13", courseId: "c-rob", topicId: "t-rb-7", order: 1, title: "AI Perception and Robot Decisions", minutes: 15,
  summary: "How sensors, object detection, and learned models help robots decide what to do next.",
  why: "A robot becomes useful when it can interpret changing surroundings instead of replaying a fixed sequence. Perception supplies evidence; decision logic turns evidence into safe action.",
  objectives: ["Explain how sensors support robot decisions", "Distinguish object detection from navigation", "Design a simple sense–decide–act policy"],
  sections: [
    { h: "From sensors to meaning", p: "A distance sensor reports a number; a camera can report detected objects; a microphone can report a spoken command. AI models turn these raw signals into useful labels such as 'person ahead' or 'turn left'. The robot should keep the evidence and confidence visible so a low-confidence prediction can trigger a safe pause instead of a confident mistake." },
    { h: "A decision policy", p: "A robot policy connects perception to action: if an obstacle is close, stop and turn; if the destination is visible, move toward it; if no safe route exists, ask for help. Navigation is not only movement. It is repeated observation, decision, action, and verification." },
  ],
  example: { title: "Obstacle-aware navigator", body: "The robot reads distance, detects an obstacle, turns, and checks again. The important design is the loop: never assume a turn worked; observe the new state before continuing.", code: "while not at_destination:\n  readings = read_sensors()\n  if readings.obstacle_ahead:\n    turn_right()\n  else:\n    move_forward()\n  verify_position()" },
  terms: [["Object detection", "Finding and labeling objects in sensor data, often with a camera model."], ["Policy", "A rule or learned mapping from observations to actions."], ["Autonomy", "The ability to sense, decide, and act without continuous human control."]],
  activityHint: "Use the Sensor & Automation Lab. Write down which sensor evidence would justify each automated decision and what the robot should do when confidence is low.",
  check: { prompt: "A camera model detects an obstacle with low confidence. What is the safest next decision?", options: ["Accelerate through it", "Ignore the result forever", "Slow or stop, gather another reading, and choose a safe action", "Delete the sensor reading"], answer: 2, explain: "Autonomous systems should make uncertainty actionable. A second reading or safe stop limits harm while the robot resolves the ambiguity." },
});
L({
  id: "l-rb-14", courseId: "c-rob", topicId: "t-rb-7", order: 2, title: "Autonomous Robots in the Real World", minutes: 15,
  summary: "Voice control, smart machines, AI + IoT, and the safeguards real-world robots need.",
  why: "A lab robot has clean boundaries. Real robots share spaces with people, networks, weather, and incomplete data, so autonomy must include communication, limits, and recovery plans.",
  objectives: ["Describe voice-controlled and connected robot workflows", "Explain how AI and IoT work together", "Name safety boundaries for real-world autonomous systems"],
  sections: [
    { h: "Connected and conversational machines", p: "A voice-controlled robot turns speech into an intent, checks whether the request is allowed, and maps it to an action. AI + IoT extends the loop: devices publish sensor readings, a model or service analyzes them, and the robot receives a command. Every network hop needs authentication, timeouts, and a fallback when the connection fails." },
    { h: "Smart does not mean unsupervised", p: "A real-world robot needs boundaries: speed limits, emergency stop, obstacle rules, human override, and logs of important decisions. Test unusual lighting, noisy speech, lost connectivity, and blocked paths. The goal is useful autonomy that fails predictably, not a machine that acts mysteriously." },
  ],
  example: { title: "Voice command with a safety gate", body: "The robot hears 'go to the door', confirms the intent, checks its map and sensors, then navigates. If the door area is occupied or the network disappears, it pauses and reports the reason.", code: "intent = speech_to_intent(audio)\nif intent == \"go_to_door\" and path_is_safe():\n  navigate_to(door)\nelse:\n  stop_and_report()" },
  terms: [["Voice control", "Converting spoken language into a validated robot intent."], ["AI + IoT", "Combining AI interpretation with connected sensors and devices."], ["Human override", "A direct control that can safely pause or stop an autonomous system."]],
  activityHint: "Create a safety checklist for a voice-controlled delivery robot: include three sensor failures, one network failure, and the human override behavior.",
  check: { prompt: "What should a connected smart machine do when its network connection drops during navigation?", options: ["Continue at full speed without sensors", "Stop or enter a defined local-safe mode and report the failure", "Erase its destination", "Wait forever with motors powered"], answer: 1, explain: "Real-world autonomy needs a local fallback. A defined safe mode prevents a network failure from becoming uncontrolled motion." },
});

// ·· SOFTWARE ·· Topic 1 — Programming Fundamentals
L({
  id: "l-se-1", courseId: "c-se", topicId: "t-se-1", order: 1, title: "Thinking in Variables and Types", minutes: 14,
  summary: "Data, names, and types — the atoms every program is built from.",
  why: "Every bug in history is a story about data. Naming data well and knowing its type is the foundation of all programming.",
  objectives: ["Explain what variables store and why names matter", "Use core types: numbers, strings, booleans, lists", "Predict type errors before they happen"],
  sections: [
    { h: "Named boxes with rules", p: "A variable is a named reference to data: score = 42, playerName = 'Ada', isOnline = true. The name is for humans — total is better than t, and itemsInCart beats x. The type is for the machine: you can add numbers, join strings, branch on booleans — and mixing them carelessly ('42' + 8) is where classic bugs live." },
    { h: "Collections: lists and objects", p: "Real programs handle groups: a list of grades, an object describing a user {name, age, plan}. The skill is modeling: which data belongs together, what type is each field, what is always present versus optional? Clean models make every function you write later simpler; muddled models tax every line of code forever." },
  ],
  example: { title: "Modeling a quiz question", body: "Before writing any quiz-app logic, model the data: a question has text (string), options (list of strings), correctIndex (number), points (number). Every later function — display, grade, review — becomes obvious because the shape of the data is honest.", code: "question = {\n  text: \"Which is a storage type?\",\n  options: [\"RAM\", \"CPU\", \"GPU\", \"PSU\"],\n  correctIndex: 0,\n  points: 2\n}\n// grading is now trivial: picked === correctIndex" },
  terms: [["Variable", "A name bound to a piece of data."], ["Type", "The kind of data: number, string, boolean, list, object — with its allowed operations."], ["Data model", "The deliberate shape you give your data before writing logic."]],
  check: { prompt: "userName holds 'Amara' and loginCount holds 3. What operation is definitely a bug?", options: ["loginCount + 1", "userName + ' logged in'", "loginCount + userName", "loginCount > 0"], answer: 2, explain: "Adding a number to a string is a type mix-up — the classic '3Amara' bug. The other operations are each type-correct." },
});
L({
  id: "l-se-2", courseId: "c-se", topicId: "t-se-1", order: 2, title: "Logic, Loops, and Functions", minutes: 15,
  summary: "Conditionals, iteration, and abstraction — the three structures that express any algorithm.",
  why: "These three structures are not 'basics to get past' — they are the complete toolbox of computation. Mastery here is mastery of programming.",
  objectives: ["Write conditionals that cover all cases", "Choose between for and while loops correctly", "Extract repeated logic into functions"],
  sections: [
    { h: "Branch, repeat, abstract", p: "IF decides: if attempts > 3 then lock the account. LOOPS repeat: for each question in the quiz, grade it. FUNCTIONS abstract: gradeAnswer(question, pick) packages logic under a name so you call it instead of copying it. A program of any size is thousands of these three, composed well." },
    { h: "The function mindset", p: "When you paste the same five lines twice, you have found a function waiting to be born. Good functions do one thing, are named after that thing, take only what they need, and return a result instead of reaching into the world. Code written this way reads like an outline: checkAccess(), gradeAll(answers), sendReport(scores)." },
  ],
  example: { title: "Grading a quiz, three ways", body: "Inline: a growing wall of copy-pasted ifs. With a loop: shorter, still repetitive. With a function: the logic exists once, is testable alone, and the main program reads like a sentence.", code: "// the function, written once, tested once\nfunction grade(q, pick) { return pick === q.correctIndex ? q.points : 0 }\n\n// the program now reads like an outline\nlet total = 0\nfor (const q of quiz) total += grade(q, picks[q.id])\nshowResult(total)" },
  terms: [["Conditional", "Code that runs only when a condition holds — covering all cases matters."], ["Loop", "Repetition: for (each item) or while (condition still true)."], ["Function", "Named, reusable logic with inputs and a result."]],
  check: { prompt: "You need to process every item in a list of known length. The cleanest structure is…", options: ["A while loop with a manual counter", "A for-each loop over the list", "Copy-pasted code per item", "A single giant if-chain"], answer: 1, explain: "When you iterate 'each item', for-each states the intent directly and removes the off-by-one bugs that manual counters invite." },
});

// ·· SOFTWARE ·· Topic 2 — Web Development
L({
  id: "l-se-3", courseId: "c-se", topicId: "t-se-2", order: 1, title: "How the Web Works: HTTP, HTML, CSS", minutes: 15,
  summary: "Requests, responses, and the three languages every page is built from.",
  why: "The web is the most deployed platform in history. Understanding the request–response cycle demystifies every site and API you will ever build.",
  objectives: ["Trace a browser request to a rendered page", "Describe HTML, CSS, and JavaScript roles", "Read a URL and an HTTP status code"],
  sections: [
    { h: "Request → response → render", p: "You type a URL; the browser sends an HTTP request to a server; the server responds with a status (200 found, 404 missing, 500 server error) and content — usually HTML. The browser parses HTML into structure, applies CSS for presentation, and runs JavaScript for behavior. Every web interaction, from loading a page to posting a photo, is this cycle." },
    { h: "Three jobs, three languages", p: "HTML is the skeleton: headings, paragraphs, buttons, forms — meaning and structure. CSS is the appearance: layout, color, spacing, responsive rules for different screens. JavaScript is the muscle: responding to clicks, fetching new data, updating the page without reloading. When a page misbehaves, ask which of the three owns the problem." },
  ],
  example: { title: "Reading a response", body: "Your browser asks for /profile. The server answers 200 OK with an HTML document; CSS and JS files arrive as follow-up requests. Later, a wrong link asks for /profil — 404 Not Found. Status codes are the web's shared vocabulary; 4xx means 'you asked wrong', 5xx means 'we broke'.", code: "GET /profile            → 200 OK      (HTML + CSS + JS follow)\nGET /profil             → 404         (client's mistake: typo)\nPOST /login (bad pass)  → 401         (not authorized)\nGET /reports (db down)  → 500         (server's mistake)" },
  terms: [["HTTP", "The request–response protocol of the web."], ["Status code", "The server's three-digit verdict: 2xx success, 4xx client error, 5xx server error."], ["Responsive design", "CSS techniques that adapt layout to any screen size."]],
  check: { prompt: "A user reports 'the site says 500 when I submit the form'. This means…", options: ["The user typed the URL wrong", "The server failed while handling the request — a backend problem", "The CSS is broken", "The user's browser is unsupported"], answer: 1, explain: "5xx status codes mean the server side failed. Client mistakes are 4xx. CSS problems never produce status codes." },
});
L({
  id: "l-se-4", courseId: "c-se", topicId: "t-se-2", order: 2, title: "Interactive UIs: JavaScript and Components", minutes: 16,
  summary: "From manipulating the page to thinking in components — how modern UI frameworks organize real apps.",
  why: "Modern apps are built from components with state. This mental model is shared by React, Vue, and everything you will build on the web.",
  objectives: ["Explain state and re-rendering", "Decompose a page into components", "Describe why unidirectional data flow prevents bugs"],
  sections: [
    { h: "State drives the screen", p: "In a modern UI, you do not manually poke the page. You declare state — the data the screen depends on: quizAnswers, score, currentQuestion. When state changes, the framework re-renders the affected components. You stop writing 'update this label' and start describing 'the screen is a function of this data'. That shift is the heart of component UIs." },
    { h: "Components: small, named, composable", p: "Decompose a page like an organization chart: a QuizPage contains a QuestionCard, an AnswerButton list, and a ScoreBar. Each component owns a small piece of logic and receives the rest as inputs (props). Benefits: pieces are testable alone, reusable across pages, and replaceable without surgery. When a component grows a second responsibility, split it." },
  ],
  example: { title: "A quiz page, decomposed", body: "State lives at the top: answers and current index. QuestionCard renders one question; AnswerButton reports the pick upward; ScoreBar derives its number from answers. Data flows down, events flow up — when anything changes, only what depends on it re-renders.", code: "QuizPage            state: { answers, index }\n├─ ProgressBar      ← derives: index / total\n├─ QuestionCard     ← receives question, reports pick ↑\n│   └─ AnswerButton ×4\n└─ ScoreBar         ← derives: score from answers" },
  terms: [["State", "The data a screen depends on; change it and the UI follows."], ["Component", "A named, self-contained piece of UI with its own logic."], ["Props", "Inputs a parent passes down to a component."]],
  check: { prompt: "In a component-based app, the score display stops updating after answers change. The first thing to suspect is…", options: ["The CSS file", "That the display is not derived from the current answers state", "The internet connection", "The browser version"], answer: 1, explain: "If the screen is a function of state, a stale display means it is reading old or unrelated state. Fix the data wiring, not the styling." },
});

// ·· SOFTWARE ·· Topic 3 — Mobile Development
L({
  id: "l-se-5", courseId: "c-se", topicId: "t-se-3", order: 1, title: "Native vs. Cross-Platform Mobile", minutes: 13,
  summary: "The trade-offs between building once for all phones and building specifically for each.",
  why: "Choosing an approach is an engineering decision with real costs — knowing the trade-offs keeps your projects from starting on the wrong foot.",
  objectives: ["Compare native and cross-platform approaches", "Match project constraints to the right approach", "Explain what 'write once' actually costs"],
  sections: [
    { h: "Two philosophies", p: "Native development (Swift for iOS, Kotlin for Android) gives maximum performance and full access to device capabilities, at the price of two codebases. Cross-platform frameworks (Flutter, React Native) ship one codebase to both stores — faster for most apps, with occasional costs in performance or access to the newest device features. The right choice depends on team, deadline, and how deep the hardware integration goes." },
    { h: "Mobile constraints change how you design", p: "Phones impose discipline web pages can skip: intermittent connectivity (design offline-first, sync later), battery and data budgets (fetch less, cache more), small screens (one primary action per view), and app-store review (plan for rejection cycles). Mobile engineering is largely engineering around constraints — and those habits make you a better web developer too." },
  ],
  example: { title: "Choosing for a study-flashcard app", body: "Requirements: works on both stores, simple UI, camera import is nice-to-have, one developer, eight weeks. Verdict: cross-platform — one codebase fits the team and deadline; nothing needs bleeding-edge hardware. A GPS-heavy AR game would argue the opposite.", code: "team: 1 dev, 8 weeks          → one codebase wins\nhardware: camera (basic)      → cross-platform handles it\noffline: required             → both can; design sync-later\nverdict: cross-platform (React Native / Flutter)" },
  terms: [["Native", "Platform-specific code (Swift/Kotlin): max capability, two codebases."], ["Cross-platform", "One codebase compiled to both platforms."], ["Offline-first", "Designing so the app fully works without a connection, syncing later."]],
  check: { prompt: "A two-person team must ship an identical booking app on iOS and Android in 10 weeks, with no exotic hardware needs. The pragmatic choice is…", options: ["Two separate native codebases", "A cross-platform codebase", "A desktop app instead", "Waiting until the team doubles"], answer: 1, explain: "Identical features, small team, tight deadline, standard hardware — the exact situation cross-platform exists for." },
});
L({
  id: "l-se-6", courseId: "c-se", topicId: "t-se-3", order: 2, title: "Designing for Small Screens First", minutes: 14,
  summary: "Thumb zones, progressive disclosure, and why mobile-first improves every layout you will ever make.",
  why: "Most of your users hold your product in one hand. Designing for the constraint first produces interfaces that work everywhere.",
  objectives: ["Apply mobile-first layout ordering", "Use progressive disclosure to reduce clutter", "Design for one-handed reach"],
  sections: [
    { h: "Start narrow, then widen", p: "Mobile-first means designing the smallest screen first, then adding layout as space appears. It forces ruthless prioritization: if only one thing fits above the fold, it must be the most important thing. Designs grown this way stay coherent at tablet and desktop size; designs shrunk from desktop always leak clutter." },
    { h: "Progressive disclosure and thumb law", p: "Show the essentials now, details on demand: a summary card that expands, an 'advanced options' fold. And respect anatomy — primary actions live in the bottom third of the screen, where a thumb reaches; destructive actions require deliberate reach or confirmation. An interface that fights the hand loses, however pretty it is." },
  ],
  example: { title: "A project tracker, mobile-first", body: "Phone view: one card per project — name, progress bar, one primary button at the bottom ('Log work'). Details (members, milestones, history) expand on tap. On desktop the same pieces become columns, not a different design. Nothing was deleted to fit; everything was ordered to matter.", code: "PHONE:                DESKTOP (same pieces, more room):\n[ Project: Farm App ] [ Farm App | ███░ 65% | 3 members | Log ]\n[ ███░░░ 45%      ] [ StudyBot | █░░░ 20% | 1 member  | Log ]\n[    ( Log work )  ] ← thumb zone" },
  terms: [["Mobile-first", "Designing the narrowest layout first, enhancing for wider screens."], ["Progressive disclosure", "Revealing detail only when the user asks for it."], ["Thumb zone", "The bottom screen area reachable one-handed — home of primary actions."]],
  check: { prompt: "A mobile form shows 14 fields at once and users abandon it halfway. The best structural fix is…", options: ["Smaller font so all fields fit better", "Progressive disclosure: ask essentials first, details in later steps or folds", "Remove the submit button to prevent errors", "Make the form desktop-only"], answer: 1, explain: "The problem is cognitive load, not pixels. Staging the questions keeps every field but spreads the effort across deliberate steps." },
});

// ·· SOFTWARE ·· Topic 4 — Software Engineering Principles
L({
  id: "l-se-7", courseId: "c-se", topicId: "t-se-4", order: 1, title: "From Code to Engineering: Design and Tests", minutes: 15,
  summary: "Why programs rot, and the two disciplines — small design decisions and automated tests — that keep them alive.",
  why: "Anyone can write code that works today. Engineers write code that still works, and can be changed, six months from now.",
  objectives: ["Explain why software degrades without care", "Write a test before and after a change", "Keep functions and modules small on purpose"],
  sections: [
    { h: "Software rots by default", p: "Every change made in a hurry borrows time from the future: a duplicated block here, a magic number there. Interest compounds — each later change becomes harder and riskier, until rewriting feels cheaper than touching it. Engineering is the interest payment made on schedule: small functions, honest names, no duplication, and tests that catch regressions the moment they happen." },
    { h: "Tests are executable documentation", p: "A test states, in code, what 'working' means: grade(full marks) returns 10; grade(wrong pick) returns 0. Run the suite after every change and the program's promises enforce themselves. When you fix a bug, write the test that would have caught it first — then the same bug can never return quietly. Tests turn fear of change into confidence in change." },
  ],
  example: { title: "Bug, test, fix — in that order", body: "Bug found: grading gives points when the pick is an empty string. Step one, not the fix: write test grade(q, '') === 0 and watch it fail. Step two: fix the comparison. Step three: green suite. The bug is now permanently impossible — the test stands guard forever.", code: "test:  grade(question, \"\")  expected 0   → FAILS (bug reproduced)\nfix:   if (!pick || pick !== q.correctIndex) return 0\ntest:  grade(question, \"\")  expected 0   → PASSES\nsuite: all 14 tests green → ship it" },
  terms: [["Technical debt", "The future cost of shortcuts taken today."], ["Regression", "A change that breaks something that used to work."], ["Test suite", "The automated checks that define 'working' for a program."]],
  check: { prompt: "You fixed a bug where discounts applied twice. What guarantees it never silently returns?", options: ["A comment explaining the old bug", "A test asserting the discount is applied exactly once, run in the suite", "Renaming the discount variable", "Promising to be more careful"], answer: 1, explain: "Only an automated test re-checks the behavior on every future change. Comments rot; tests enforce." },
});
L({
  id: "l-se-8", courseId: "c-se", topicId: "t-se-4", order: 2, title: "Refactoring and Code Review", minutes: 14,
  summary: "Improving code without changing behavior, and the team ritual that multiplies quality.",
  why: "Code is read far more than it is written. Refactoring and review are how teams keep their shared codebase readable and safe.",
  objectives: ["Refactor in small, behavior-preserving steps", "Name things after what they mean", "Give and receive review feedback that improves code"],
  sections: [
    { h: "Refactor under the safety net", p: "Refactoring means restructuring code while its observable behavior stays identical: extract a function, rename a misleading variable, replace a copy-paste with a loop. The discipline: never refactor and change behavior in the same step, and run the tests after each small move. With tests green, you can improve any code fearlessly." },
    { h: "Review is a conversation about trade-offs", p: "A good review comment is specific and explains why: 'this name suggests sorting, but the function filters — rename or split?' not 'bad name'. Reviewers catch the bugs tests miss — unclear intent, missed edge cases, duplicated logic — and reviewers learn every pattern the team writes. The codebase is a shared language; review is where the team agrees on its grammar." },
  ],
  example: { title: "One refactoring pass", body: "Before: 40 lines mixing validation, grading, and message building, named processStuff. After: validate(pick), grade(q, pick), feedbackFor(score) — same behavior, each piece testable and nameable. The diff is large; the risk, with tests, is near zero.", code: "BEFORE: processStuff() — 40 lines, 3 jobs, 0 tests\nAFTER : validate(pick)    → throws on empty / out of range\n        grade(q, pick)    → points, pure function\n        feedbackFor(score)→ message per band\nsame behavior · 3 testable units · honest names" },
  terms: [["Refactoring", "Improving structure without changing behavior."], ["Pure function", "Output depends only on inputs — trivially testable."], ["Code review", "Team inspection of changes before they merge."]],
  check: { prompt: "The safest order when improving messy-but-working code is…", options: ["Rewrite everything and change a few behaviors while at it", "Add tests for current behavior, then refactor in small steps with tests green", "Refactor first, then write tests if time remains", "Leave it — working code must never be touched"], answer: 1, explain: "Tests capture today's behavior as the safety net; small verified steps improve structure without ever losing that guarantee." },
});

// ·· SOFTWARE ·· Topic 5 — Databases & APIs
L({
  id: "l-se-9", courseId: "c-se", topicId: "t-se-5", order: 1, title: "Data Modeling and SQL Basics", minutes: 15,
  summary: "Tables, relationships, and the queries that turn stored data into answers.",
  why: "Nearly every real application is a well-designed database wearing a user interface. Model data well and the app almost writes itself.",
  objectives: ["Design tables with clear relationships", "Write SELECT queries with WHERE and JOIN", "Explain why duplicated data causes bugs"],
  sections: [
    { h: "Tables that mirror reality", p: "A database models your world as tables: students, courses, enrollments. Each row is one instance; each column one fact. Relationships connect them: an enrollments table links a student_id to a course_id, so 'who takes what' lives in one queryable place. The golden rule: store each fact once. Duplicate a student's name across ten rows and someday you will update nine of them." },
    { h: "Queries are questions", p: "SQL reads like the question it answers: SELECT name FROM students WHERE level = 'builder'; SELECT students.name, courses.title FROM enrollments JOIN students … JOIN courses … — 'who takes what'. A well-modeled schema makes questions direct; a muddled one makes every question a negotiation. Time spent modeling is repaid in every query forever." },
  ],
  example: { title: "Modeling the academy", body: "students(id, name, level), courses(id, title), enrollments(student_id, course_id, started_at). One fact per place; relationships in the link table. 'Builders taking the AI course' is now one honest sentence in SQL.", code: "SELECT s.name\nFROM students s\nJOIN enrollments e ON e.student_id = s.id\nJOIN courses c    ON c.id = e.course_id\nWHERE s.level = 'builder' AND c.title LIKE '%AI%';" },
  terms: [["Row / Column", "One instance / one fact per entity."], ["JOIN", "Combining rows across tables through their relationship."], ["Normalization", "Storing each fact in exactly one place."]],
  check: { prompt: "A student's email is stored in both the students table and the certificates table, and they no longer match. The root problem is…", options: ["The query is too slow", "The same fact is stored in two places — it should live once and be referenced", "The email is too long", "SQL cannot handle emails"], answer: 1, explain: "Storing one fact twice guarantees they will eventually disagree. Store it once in students; let certificates reference the student." },
});
L({
  id: "l-se-10", courseId: "c-se", topicId: "t-se-5", order: 2, title: "Designing a REST API", minutes: 15,
  summary: "Endpoints, methods, status codes, and validation — how frontends and backends agree to talk.",
  why: "Every modern app is a frontend speaking to an API. Designing that contract well is the single highest-leverage backend skill.",
  objectives: ["Map resources to endpoints and HTTP methods", "Choose correct status codes", "Explain why the server must validate every input"],
  sections: [
    { h: "Resources and verbs", p: "A REST API exposes nouns (resources) manipulated by HTTP verbs: GET /courses reads the list, POST /courses creates one, GET /courses/ai-101 reads one, PUT updates it, DELETE removes it. The URL names the thing; the verb names the action; the body carries the data. This shared grammar is why strangers' APIs feel familiar." },
    { h: "Trust nothing from the client", p: "The frontend is not a security boundary — anyone can craft requests. The server validates every input: types, ranges, ownership ('is this YOUR submission?'). It answers honestly with status codes: 201 created, 400 your input was invalid (say why), 401 who are you, 403 not yours, 404 not found, 500 our fault. Precise codes and messages turn an API into a conversation instead of a black box." },
  ],
  example: { title: "A submissions contract", body: "POST /projects/smart-farm/submissions with {text, link}. Server validates: text ≥ 50 chars, link is a URL, the requester owns the project. Responses tell the whole story: 201 + the created record; 400 + 'text must be at least 50 characters'; 403 + 'not your project'.", code: "POST /projects/smart-farm/submissions\nbody: { \"text\": \"Built the sensor node…\", \"link\": \"…\" }\n\n201 Created   → { id, status: \"submitted\" }\n400 Bad Request → { error: \"text must be ≥ 50 characters\" }\n403 Forbidden   → { error: \"project not assigned to you\" }" },
  terms: [["Endpoint", "A URL representing a resource: /projects, /courses/ai-101."], ["HTTP method", "The verb: GET reads, POST creates, PUT updates, DELETE removes."], ["Validation", "Server-side checking of every client input before use."]],
  check: { prompt: "A client sends a submission for a project owned by another student. The correct server response is…", options: ["201 Created — the data looks valid", "403 Forbidden — authenticated, but not your resource", "404 Not Found — pretend the project doesn't exist", "200 OK"], answer: "403 Forbidden — authenticated, but not your resource", explain: "The user is authenticated (not 401) but lacks rights to this resource — exactly what 403 means. Never silently accept foreign data." },
});
L({
  id: "l-se-11", courseId: "c-se", topicId: "t-se-6", order: 1, title: "Git: Commits, Branches, History", minutes: 14,
  summary: "A time machine for your code: snapshots, parallel timelines, and honest history.",
  why: "Version control is the difference between 'it worked yesterday' and being able to prove what changed, when, and why.",
  objectives: ["Explain what a commit stores", "Use branches to work without breaking main", "Write commit messages that tell the story"],
  sections: [
    { h: "Commits are snapshots with a story", p: "A commit stores the complete state of your project plus who, when, and why. It is not a diff to fear but a checkpoint to trust: any moment can be revisited, compared, or restored. Commit often, at logical moments — 'finished grading function with tests', not 'stuff' — and history becomes a readable engineering diary." },
    { h: "Branches: parallel universes", p: "A branch is a separate timeline where you can build a feature or test an idea while main stays working. Experiment freely; if it fails, delete the branch — main never knew. If it succeeds, merge it back. This is how teams and solo developers alike change software without fear: every risky idea gets its own universe." },
  ],
  example: { title: "A week in history", body: "Read the log like a story: Monday 'add quiz scoring + tests', Tuesday 'fix: empty answer scored full marks', Wednesday branch feature/dark-mode, Friday 'merge dark-mode'. When Thursday's bug appears, you can name the exact commit that introduced it — and reverse only that.", code: "* 9f2c1 merge feature/dark-mode\n* 7a11d dark mode: theme toggle + saved preference\n* 3b9e0 fix: empty answer scored full marks\n* c44aa add quiz scoring + tests\n* 0d1f7 initial project skeleton" },
  terms: [["Commit", "A named snapshot of the whole project with author and message."], ["Branch", "An independent line of development."], ["Merge", "Bringing a branch's changes back into another line."]],
  check: { prompt: "You want to try a risky redesign without endangering the working app. You…", options: ["Edit main carefully and quickly", "Create a branch, redesign there, merge only if it works", "Copy the project folder to 'project-backup-2'", "Delete the tests that would fail"], answer: 1, explain: "A branch isolates the experiment completely. If it fails, delete it; the working line was never touched. Folder copies can't merge or compare." },
});
L({
  id: "l-se-12", courseId: "c-se", topicId: "t-se-6", order: 2, title: "Collaborating with Pull Requests", minutes: 13,
  summary: "The team workflow: propose, review, test, merge — how groups ship together without chaos.",
  why: "Real software is team software. The pull-request workflow is how professional groups move fast without breaking things.",
  objectives: ["Describe the PR workflow end to end", "Keep changes small and reviewable", "Handle merge conflicts without fear"],
  sections: [
    { h: "The pull-request loop", p: "Work happens on a branch; when done, you open a pull request — a formal proposal to merge. Automated tests run; teammates review the exact lines changed; discussion happens on the code itself. Only when checks pass and reviewers approve does the change merge into main. Nothing reaches users unreviewed; every line has a name and a reason attached." },
    { h: "Small changes move fastest", p: "A 400-line PR waits for days and hides bugs in the noise; five 60-line PRs merge the same week, each reviewed properly. When two people edit the same lines, Git flags a merge conflict — not an error, but a question: 'these two intentions overlap, which should win?' Resolved line by line, deliberately, with both authors' intent visible." },
  ],
  example: { title: "A healthy PR", body: "Branch fix/grading-empty-answers, three commits, 47 lines changed, description: 'Empty answers scored full marks — reproduced with failing test, fixed comparison, suite green.' Reviewer approves in ten minutes. That description is the PR doing its job: reviewable at a glance.", code: "PR #42  fix: empty answer scored full marks\n        + test reproducing the bug (fails before, passes after)\n        + one-line fix in grade()\n        47 lines · 2 approvals · CI green → merged" },
  terms: [["Pull request", "A reviewable proposal to merge a branch's changes."], ["CI checks", "Automated tests that must pass before merging."], ["Merge conflict", "Overlapping edits that require a deliberate human decision."]],
  check: { prompt: "Two teammates edited the same function; Git reports a conflict at merge time. This means…", options: ["One teammate's work is permanently lost", "Git needs a human decision about how the overlapping changes combine", "The repository is corrupted", "Both must delete their branches"], answer: 1, explain: "Conflicts are questions, not damage. Git preserves both versions; you combine them intentionally, usually with both authors present." },
});

// ·· INNOVATION ·· Topic 1 — Digital Product Development
L({
  id: "l-di-1", courseId: "c-di", topicId: "t-di-1", order: 1, title: "From Idea to Product: The Build–Measure Loop", minutes: 13,
  summary: "Why products are discovered, not declared — the loop of building small, measuring honestly, and learning fast.",
  why: "Most digital products fail from building the wrong thing confidently. The loop is the discipline that catches that early, when change is cheap.",
  objectives: ["Explain why ideas must be tested, not assumed", "Describe the build–measure–learn loop", "Choose what to build first to learn the most"],
  sections: [
    { h: "Fall in love with the problem, not the plan", p: "Every founder believes their idea is the one — which is precisely why the market is littered with polished products nobody wanted. The professional stance: an idea is a hypothesis, not a prophecy. 'Students will use an AI study planner' is a claim that must survive contact with real students, real schedules, and real indifference." },
    { h: "Build the smallest informative thing", p: "The loop: build the smallest version that can teach you something (a landing page, a manual service, a single-feature prototype), measure how real people behave — not what they say in polite surveys — and learn whether to continue, adjust, or stop. Speed matters because each loop costs time and ego; the team that learns fastest wins, not the team that builds biggest first." },
  ],
  example: { title: "Testing a tutoring-platform idea", body: "Full platform: six months, unknown demand. Loop 1 instead: a sign-up page describing the service, one week, real traffic. 4 of 200 visitors sign up — weak signal. Learning: the framing 'exam rescue' outperformed 'study partner' 3-to-1. The product was redesigned around the signal before a line of platform code existed.", code: "hypothesis: students want on-demand math tutoring\nbuild:     sign-up page, 2 framings, 1 week\nmeasure:   clicks, sign-ups, which framing won\nlearn:     'exam rescue' 3× stronger → rebuild around it" },
  terms: [["Hypothesis", "A testable claim about what people will do."], ["Signal", "Observed behavior — stronger evidence than stated opinion."], ["Pivot", "A structured change of direction based on what was learned."]],
  check: { prompt: "In interviews, 30 students say they 'would definitely use' your app. What is this evidence worth?", options: ["It confirms demand — start building the full product", "Little — stated intent is unreliable; observed behavior (sign-ups, usage) is the real test", "It is legally binding demand", "It means you need 300 more interviews"], answer: 1, explain: "People are kind in interviews and busy in real life. Behavior — sign-ups, retention, payment — is the evidence that predicts use." },
});
L({
  id: "l-di-2", courseId: "c-di", topicId: "t-di-1", order: 2, title: "Prototypes and MVPs", minutes: 14,
  summary: "The ladder from sketch to clickable prototype to minimum viable product — each rung answers a different question.",
  why: "Prototypes let you be wrong on paper, where being wrong is free. Skipping them means being wrong in production, where it is not.",
  objectives: ["Distinguish sketches, prototypes, and MVPs", "Match fidelity to the question being answered", "Define 'viable' for a minimum product"],
  sections: [
    { h: "Three rungs, three questions", p: "A sketch asks: is the flow coherent? A clickable prototype asks: can users complete the core task without help? An MVP asks: will they come back? Each rung should be the cheapest artifact that answers its question — no more. A beautiful prototype that answers nothing is decoration; an ugly one that kills a bad idea is a triumph." },
    { h: "Minimum AND viable", p: "'Minimum' is not half-broken; it is the smallest thing that still delivers the core value. An MVP taxi app must reliably get you a car — but it needs no ratings, no split fares, no animated confetti. Cut features around the value, never through it. The test: if the early users would be genuinely disappointed to lose it, it is viable." },
  ],
  example: { title: "A homework-help MVP", body: "V1 was embarrassingly manual: students messaged a number, a founder answered within an hour. It proved willingness to ask, typical questions, and willingness to pay — all before any app existed. The eventual app automated only the patterns the manual version had already proven.", code: "rung 1  sketch of the ask→answer flow      (coherent?)\nrung 2  clickable prototype, 5 users       (completable?)\nrung 3  manual MVP: messaging + human      (valuable? paid?)\nthen:   automate only the proven patterns" },
  terms: [["Prototype", "A cheap artifact testing usability and flow, not infrastructure."], ["MVP", "The smallest product that still delivers the core value."], ["Fidelity", "How real an artifact looks — match it to the question, not to pride."]],
  check: { prompt: "You want to know whether users can find the 'submit answer' flow without help. The cheapest adequate artifact is…", options: ["The finished product with real backend", "A clickable prototype of that flow", "A written survey describing the flow", "A TV advertisement"], answer: 1, explain: "Usability questions need users doing the task, not imagining it. A clickable prototype observes real navigation at near-zero cost." },
});

// ·· INNOVATION ·· Topic 2 — Problem-Solving & Innovation
L({
  id: "l-di-3", courseId: "c-di", topicId: "t-di-2", order: 1, title: "Finding Real Problems Worth Solving", minutes: 14,
  summary: "Problems are observed, not invented: techniques for spotting friction people already live with.",
  why: "Solutions in search of problems are the default failure. Builders who find genuine friction first carry an unfair advantage for everything after.",
  objectives: ["Distinguish real problems from assumed ones", "Use observation and 'workaround hunting'", "Judge whether a problem is worth solving"],
  sections: [
    { h: "Hunt for workarounds", p: "Real problems announce themselves through workarounds: the notebook beside the register, the shared spreadsheet with 40 tabs, the parent group chat coordinating carpools manually. Wherever people are duct-taping a process together, friction exists — and friction that people already pay to reduce (with time, money, or frustration) is a problem worth solving." },
    { h: "The worth-solving test", p: "Three questions filter ideas: Is it frequent (weekly, not yearly)? Is it painful enough that people act on it now (workarounds prove this)? Can it be solved meaningfully with the tools you can build? A small frequent pain beats a grand rare one. 'Students lose 20 minutes daily finding study rooms' outclasses 'world hunger' as a first project — you can actually move the first one." },
  ],
  example: { title: "From observation to problem statement", body: "Observed: the school café queue peaks at 12:40; students check it by walking over. Workaround: a group chat asking 'anyone at the café?'. Problem statement: 'Students waste 10+ minutes daily checking café crowding because no live signal exists.' Frequent, painful, observable, solvable with a simple sensor or check-in app.", code: "observe:    queue peaks 12:40, students walk over to check\nworkaround: group chat \"anyone there?\"\nproblem:    no live crowding signal → 10+ min wasted daily\ntest:       frequent ✓ painful ✓ solvable ✓ → worth solving" },
  terms: [["Workaround", "A manual hack people maintain because no tool exists — a problem beacon."], ["Problem statement", "Who hurts, how often, how much, and why nothing solves it yet."], ["Frequency", "How often the pain occurs — weekly pains beat yearly ones."]],
  check: { prompt: "Which is the strongest evidence that a problem is real?", options: ["A founder's strong intuition", "People already spending time or money on clumsy workarounds", "A large theoretical market size", "A similar app existing abroad"], answer: 1, explain: "Revealed behavior is truth: if people already pay (in effort) to reduce the pain, the problem is proven and the willingness is demonstrated." },
});
L({
  id: "l-di-4", courseId: "c-di", topicId: "t-di-2", order: 2, title: "Solving Under Constraints", minutes: 13,
  summary: "Constraints are the design material: time, budget, and skills reshape problems into solvable forms.",
  why: "Unconstrained brainstorming produces fantasy. The ability to reframe within real limits is what separates makers from dreamers.",
  objectives: ["Reframe a problem to fit real constraints", "Use 'how might we' to open solution space", "Trade scope against certainty deliberately"],
  sections: [
    { h: "The constraint is the assignment", p: "'Build a hospital records system' is not a student project. 'Reduce one repeated data-entry step for one clinic role, with forms and a small database, in six weeks' is. Reframing is not surrender — it is engineering: same problem domain, scoped to where you can actually produce evidence. Constraints chosen deliberately produce finished work; constraints ignored produce abandoned work." },
    { h: "How might we…", p: "The phrase 'how might we' keeps problems open: 'How might we make lost-property returns take a day instead of a week?' invites many solutions (photos, QR tags, a notification list) without committing to one. Then rank candidates by impact × feasibility and prototype the best one. Diverge, then converge — creativity with a decision at the end." },
  ],
  example: { title: "Scoping a lost-property fix", body: "Wild version: AI camera system campus-wide. Constrained reframe: how might we make reporting a found item take under a minute? Solution: a QR poster in each building → snap photo, auto-tagged location, list page updates instantly. Built in three weeks, used the first day. The scope made it real.", code: "problem: found items take a week to reunite\nHMW: make reporting a find take < 1 minute?\noptions: cameras ✗ cost · staff app ✗ adoption · QR posters ✓\nship:   QR → photo → tagged list · 3 weeks · used day one" },
  terms: [["Reframing", "Restating the problem so it fits constraints without losing the core pain."], ["How might we", "A question form that opens solution space before choosing."], ["Impact × feasibility", "The ranking grid for choosing what to build next."]],
  check: { prompt: "Your team wants to 'fix school communication' in a semester. The best next move is…", options: ["Registering a company and printing business cards", "Running the cheapest experiment that tests their riskiest assumption", "Writing a 40-page business plan", "Building the complete product before telling anyone"], answer: 1, explain: "'School communication' is unbuildable in a semester. One specific frequent failure, scoped to evidence you can produce, is buildable — and actually useful." },
});

// ·· INNOVATION ·· Topic 3 — Startup Fundamentals
L({
  id: "l-di-5", courseId: "c-di", topicId: "t-di-3", order: 1, title: "What Makes a Startup Different", minutes: 12,
  summary: "Startups are experiments in search of a repeatable model — not small versions of big companies.",
  why: "Confusing startup work with normal business work produces the wrong activities. Knowing the difference focuses every hour you invest.",
  objectives: ["Define a startup as a search, not an execution", "Explain why growth assumptions must be tested", "Distinguish lifestyle businesses from scalable startups"],
  sections: [
    { h: "Search vs. execution", p: "An established company executes a known model: it knows its customers, channels, and margins, and optimizes. A startup does not yet know these — it searches for them. That is why its core activity is experiments: priced offers, landing pages, pilot users. A startup that behaves like a small corporation (printing letterheads before finding customers) is performing business instead of discovering it." },
    { h: "Scalable vs. lifestyle", p: "A tutoring service earning its founder a good living is a fine lifestyle business — value delivered, income earned. A startup additionally claims scalability: software, content, or platforms whose cost per additional user approaches zero. Neither is superior; they simply demand different strategies. Honest classification saves years of mismatched effort." },
  ],
  example: { title: "Two study apps, two natures", body: "App A: local tutors booked through it, founder personally recruits and quality-checks — excellent lifestyle business, growth limited by the founder's week. App B: an AI-generated practice-quiz engine, marginal cost per student ≈ 0 — scalable claim, but the experiment is whether students retain week after week. Same sector; different engines; different evidence needed.", code: "lifestyle: tutor marketplace — revenue ✓, scales with founder's time\nscalable:  AI quiz engine — marginal cost ~0, but retention unknown\nboth valid · the mistake is running one playbook on the other" },
  terms: [["Startup", "An organization designed to search for a repeatable, scalable business model."], ["Lifestyle business", "A profitable venture sized to its owner's life, not to hypergrowth."], ["Scalability", "Revenue growing faster than cost per additional user."]],
  check: { prompt: "A student team's first activity should be…", options: ["Registering a company and printing business cards", "Running the cheapest experiment that tests their riskiest assumption", "Writing a 40-page business plan", "Building the complete product before telling anyone"], answer: 1, explain: "A startup searches. The riskiest assumption (will anyone pay/use it?) deserves the first and cheapest test — everything else is theater until that is known." },
});
L({
  id: "l-di-6", courseId: "c-di", topicId: "t-di-3", order: 2, title: "Validating Before Building", minutes: 14,
  summary: "Demand tests, concierge pilots, and pre-orders — gathering evidence before committing heavy build time.",
  why: "Building is the expensive way to learn. Validation buys the same learning for a fraction of the cost — and sometimes saves the whole project.",
  objectives: ["Design a demand test with a clear success criterion", "Run a concierge (manual) pilot", "Interpret weak signals honestly"],
  sections: [
    { h: "Pre-commit the pass mark", p: "A demand test without a criterion is self-deception in advance. Before launch: 'If 15 of 200 targeted students sign up with a real email, we build; below that, we reframe.' Then run the test — a landing page, a pitch to one class, a waiting list — and obey the result. The discipline is writing the number down before seeing the data, not after." },
    { h: "Do things that don't scale", p: "A concierge pilot delivers the promise manually: you ARE the recommendation engine, the support desk, the delivery system. It feels unscalable — that is the point. Manual delivery teaches the true shape of the work: what users actually ask, where they get stuck, what they value enough to repeat. Automate only what the manual version proved. This is how nearly every great product began — as a service wearing a prototype's clothes." },
  ],
  example: { title: "A meal-plan app, validated by hand", body: "Hypothesis: students would pay for weekly meal plans. Concierge test: 12 volunteers, plans written by hand each Sunday, feedback via chat. Learning: they ignored the recipes but loved the shopping list. Criterion met on the list, failed on recipes. The built product became a shopping-list generator — validated before a single sprint.", code: "criterion (set first): ≥ 8/12 continue after 3 weeks\npilot: manual weekly plans + chat support\nsignal: recipes ignored · shopping lists requested twice each\nresult: pivot product to list generator before building recipes" },
  terms: [["Demand test", "An artifact measuring real intent, with a pre-set pass mark."], ["Concierge pilot", "Delivering the product's promise fully manually to learn its shape."], ["Pivot", "Redirecting the product toward the validated signal."]],
  check: { prompt: "Your landing-page test gets 6 sign-ups from 500 visitors (criterion was 20). The honest interpretation is…", options: ["Basically a success — 6 real people!", "The current framing failed its test; examine who the 6 were and reframe or pivot", "Run the identical test again hoping for different results", "Ignore the test and build anyway"], answer: 1, explain: "The pre-committed criterion exists precisely to override optimism. The 6 sign-ups are data worth studying — but the hypothesis, as framed, did not pass." },
});

// ·· INNOVATION ·· Topic 4 — Business Models
L({
  id: "l-di-7", courseId: "c-di", topicId: "t-di-4", order: 1, title: "The Business Model Canvas Essentials", minutes: 15,
  summary: "Nine boxes that hold any venture's entire logic: customers, value, channels, revenue, costs.",
  why: "A canvas is a shared map. When the team can fill all nine boxes honestly, the venture has a logic; where a box stays vague, risk is hiding.",
  objectives: ["Fill the nine canvas blocks for a real idea", "Connect value proposition to a specific segment", "Identify the riskiest box in a model"],
  sections: [
    { h: "The nine boxes", p: "Customer segments (who exactly?), value propositions (what pain is removed for them?), channels (how does it reach them?), customer relationships, revenue streams, key resources, key activities, key partnerships, cost structure. The power is in the connections: a value proposition only exists relative to a segment; a channel only matters for the segment it reaches; revenue must eventually exceed the cost structure it funds." },
    { h: "Find the riskiest box", p: "Every canvas has one box that, if wrong, collapses the rest. For a student tutoring platform: not the technology (buildable), but 'parents will pay monthly' (untested). Honest teams name that box and attack it first with experiments, instead of polishing the boxes they already know. The canvas is not paperwork — it is a risk map wearing a grid." },
  ],
  example: { title: "Canvas for a campus study-room finder", body: "Segments: students with gaps between classes. Value: know in 10 seconds where free rooms are. Channels: campus QR codes, student-group shares. Revenue: campus license to the university (not ads — the segment is too small for ad math). Riskiest box: will the university pay? Test that before optimizing anything else.", code: "segments:    students with 1–2 h gaps\nvalue:       free-room info in ~10 seconds\nchannels:    QR posters + student groups\nrevenue:     university license (ads ✗: audience too small)\nrisk box:    will the university pay? → test FIRST" },
  terms: [["Business Model Canvas", "A one-page map of how a venture creates, delivers, and captures value."], ["Value proposition", "The specific pain removed for a specific segment."], ["Revenue stream", "How money actually arrives — priced and paid by someone named."]],
  check: { prompt: "On a student-project canvas, the 'revenue: advertisements' box deserves skepticism because…", options: ["Ads are illegal in education", "Ad revenue needs large sustained audiences — usually absent in student-scale projects", "Ads are too difficult to implement technically", "Students dislike all technology"], answer: 1, explain: "Ad models need scale — tens of thousands of frequent users. A campus project rarely reaches that, so the revenue box is likely fiction." },
});
L({
  id: "l-di-8", courseId: "c-di", topicId: "t-di-4", order: 2, title: "Revenue Models for Digital Products", minutes: 14,
  summary: "Subscriptions, freemium, marketplaces, licenses — how digital value becomes recurring income.",
  why: "Choosing a revenue model changes what you build, who you build for, and what you measure. It is a design decision, not an afterthought.",
  objectives: ["Compare subscription, freemium, marketplace, and license models", "Match a model to user behavior", "Explain what 'willingness to pay' evidence looks like"],
  sections: [
    { h: "Four common engines", p: "SUBSCRIPTION: recurring fee for ongoing value (works when the pain is weekly). FREEMIUM: free core, paid depth (works when free users recruit paid ones). MARKETPLACE: take a cut of transactions (works when you own the meeting point of two sides). LICENSE/B2B: organizations pay for outcomes (works when you save institutions money or risk). Each engine demands different product shape and different proof." },
    { h: "Price is a feature test", p: "The cleanest validation is a price: 'free' attracts opinions; '€3/month' attracts truth. Willingness-to-pay evidence: pre-orders, paid pilots, or at minimum users choosing the paid tier when both exist. If nobody pays after real exposure, either the value is weaker than believed, the segment is wrong, or the price is — all learnable, all fatal if ignored." },
  ],
  example: { title: "Pricing a study-planner", body: "Freemium split: planner free, AI-generated weekly schedules paid. After one month: 220 free users, 9 paid. Signal: schedules convert at 4% — low, but the paying 9 all cited exam weeks. Learning: price around urgency (exam-season passes) rather than a flat monthly fee.", code: "free tier:  manual planner           → 220 users\npaid tier:  AI weekly schedules €3/mo → 9 users (4%)\npattern:    all 9 bought during exam weeks\npivot:      €2 exam-week pass → test conversion again" },
  terms: [["Freemium", "Free core product with paid upgrades; free users are the funnel."], ["Conversion", "The share of free users who pay — the freemium vital sign."], ["Willingness to pay", "Demonstrated by money moving, never by surveys."]],
  check: { prompt: "A flashcard app has 5,000 monthly users but 0.2% convert to paid. The most informative next step is…", options: ["Immediately raise the price", "Interview non-converters about what would make them pay, and examine when converts bought", "Remove the free tier entirely", "Conclude flashcards are worthless"], answer: 1, explain: "Low conversion is a signal to investigate: timing, price, or value framing. Converters' purchase moments and non-converters' reasons are the data that decides the fix." },
});

// ·· INNOVATION ·· Topic 5 — Digital Marketing
L({
  id: "l-di-9", courseId: "c-di", topicId: "t-di-5", order: 1, title: "Reaching Your First Hundred Users", minutes: 14,
  summary: "Distribution for small teams: go where your users already gather, and earn attention with usefulness.",
  why: "Build-only teams die invisibly. First users are acquired through deliberate, personal, channel-by-channel work — a skill as learnable as coding.",
  objectives: ["Identify channels where your exact users gather", "Craft an offer, not an announcement", "Measure acquisition with one honest number"],
  sections: [
    { h: "Do things that don't scale — in distribution too", p: "Your first users will not come from a logo reveal. They come from one-to-one work: post in the three communities where your users already complain about your problem; message ten people who posted those complaints; give them early access and listen. Small, personal, unscalable — and it compounds: each real user teaches you the message that recruits the next ten." },
    { h: "Sell the outcome, not the product", p: "'An app with AI scheduling and calendar sync' is a feature list; 'know your whole exam week by Sunday night' is an outcome. Users buy the after-state. Write the announcement as: problem they recognize → outcome they want → one-line how → one clear next step. Then measure one number — sign-ups per channel — and double down on the channel that wins." },
  ],
  example: { title: "A two-week acquisition plan", body: "Week 1: post the outcome framing in 3 student communities; DM 15 people who complained about scheduling; collect 40 sign-ups. Week 2: ask the best 5 what almost stopped them; refine the message; rerun in 2 new communities. Result: 90 sign-ups, one winning message, one winning channel — all for €0.", code: "msg: \"Know your whole exam week by Sunday night\"\nch1: student Discord → 40 sign-ups   ← winner\nch2: class group chats → 18\nch3: poster QR codes → 32\nnext: double ch1, fix the drop-off ch2 revealed" },
  terms: [["Channel", "A specific place and method where users are reached."], ["Outcome framing", "Describing the after-state the user buys, not the features."], ["CAC", "Cost (money or time) to acquire one user — track it per channel."]],
  check: { prompt: "Your launch post says 'Introducing StudyFlow 2.0 with 14 new features!' and gets ignored. The fix is…", options: ["Add more feature bullet points", "Lead with the user's outcome and one clear next step", "Post it in more groups unchanged", "Buy followers to look credible"], answer: 1, explain: "Nobody wakes up wanting features. They want their week under control. Outcome first, one action, features later — if asked." },
});
L({
  id: "l-di-10", courseId: "c-di", topicId: "t-di-5", order: 2, title: "Positioning and Storytelling", minutes: 13,
  summary: "Why being 'for someone specific' beats being 'better for everyone' — and how stories carry products.",
  why: "In crowded spaces, the clearest position wins, not the best product. Positioning is strategy you can learn in a week and use for years.",
  objectives: ["Write a one-sentence position: for X, who need Y, we do Z", "Explain why narrow positioning widens growth", "Structure a 30-second story arc"],
  sections: [
    { h: "The courage to be specific", p: "'A note app for everyone' competes with giants and describes nothing. 'The lab-notebook app for chemistry students who lose protocols' can be found, recommended, and loved — by exactly the people who need it. Narrow positioning is not a smaller market; it is a market that can hear you. Expansion comes later, from a position of being the obvious choice somewhere." },
    { h: "The 30-second arc", p: "Every product story has the same bones: a character (your user) → a tension (their recurring pain) → a turn (the moment your product changes it) → a proof (one concrete number or scene). 'Maya lost her protocol again before a titration. She opened LabNote, scanned last week's page, and started in 30 seconds.' That is positioning doing its job — felt before it is explained." },
  ],
  example: { title: "Positioning sentence, before/after", body: "Before: 'A smart study assistant.' After: 'For first-year engineering students drowning in problem sets, ProofPath checks each step of your working — not just the answer — so you learn the method before the exam.' Someone specific, pain named, difference clear.", code: "✗ \"A smart study assistant for students\"\n✓  FOR   first-year engineering students\n   WHO   drown in problem sets\n   WE    check every step, not just the answer\n   SO    the method sticks before exams" },
  terms: [["Positioning", "The specific place your product occupies in one group's mind."], ["Story arc", "Character → tension → turn → proof: how value is felt quickly."], ["Beachhead", "The narrow first segment you fully win before expanding."]],
  check: { prompt: "A team fears narrow positioning will limit growth. The correct view is…", options: ["They are right — always target everyone", "Narrow first: being the obvious choice for one group is how products earn referrals and expand later", "Positioning is marketing decoration, not strategy", "Switch positioning weekly to test more groups"], answer: 1, explain: "A beachhead gives word-of-mouth a shape ('it's THE app for X'). Vague products get vague word-of-mouth — which is none." },
});

// ·· INNOVATION ·· Topic 6 — Building & Launching
L({
  id: "l-di-11", courseId: "c-di", topicId: "t-di-6", order: 1, title: "Planning a Launch That Teaches", minutes: 13,
  summary: "A launch is an experiment with a date: pre-launch checklist, launch-day instrumentation, and honest success criteria.",
  why: "Teams launch to celebrate; professionals launch to learn. Instrumented launches turn one scary day into a semester of evidence.",
  objectives: ["Build a pre-launch checklist", "Instrument the launch to answer specific questions", "Define success criteria before the date"],
  sections: [
    { h: "Launch to answer questions", p: "Before the date, write the three questions the launch must answer: Will the target group sign up? Will they complete the core action once? Will any return within a week? Then instrument exactly those: sign-up count, completion rate, day-7 return. A launch measured this way succeeds even when the numbers are bad — because the learning was the product all along." },
    { h: "The checklist saves the day", p: "Launch day punishes improvisation. The checklist: value statement and one clear call-to-action live; onboarding tested by three outsiders; the one critical path tested on a phone, on bad Wi-Fi; a way for users to report problems visible in-app; the team available for the first four hours; and a written plan for 'if nothing happens in 48 hours' (it usually means the channel, not the product — respond by moving to where users are). Prepared teams launch calm; unprepared teams launch twice." },
  ],
  example: { title: "Instrumented launch, honest verdict", body: "Study-room finder, launch to 3 campuses. Pre-set: success = 60 sign-ups, 50% completing one search, 20% back in 7 days. Result: 74 / 61% / 11%. Verdict: discovery works, retention fails — users find rooms but have no reason to return. Next loop: booking reminders. Without pre-set numbers, the team would have argued about vibes instead.", code: "metric        target   actual   verdict\nsign-ups      60       74       ✓ found\none search    50%      61%      ✓ works\nday-7 return  20%      11%      ✗ no reason to return\nnext loop:    reminder when saved rooms free up" },
  terms: [["Instrumentation", "Measuring the specific behaviors your launch questions ask about."], ["Activation", "A user completing the core action once — the first real value moment."], ["Retention", "Users returning later — the truest signal of value."]],
  check: { prompt: "Launch week: 200 sign-ups but only 6% ever complete the core action. The priority is…", options: ["Spend everything on more sign-ups", "Fix onboarding/activation — 200 people already showed intent", "Declare the launch a failure and stop", "Redesign the logo for a relaunch"], answer: 1, explain: "Sign-ups are cheap intent; activation is delivered value. A leaky bucket punishes every new user you buy — fix the bucket first." },
});
L({
  id: "l-di-12", courseId: "c-di", topicId: "t-di-6", order: 2, title: "Metrics, Learning, and Iteration", minutes: 14,
  summary: "One North-Star metric, a tight weekly loop, and the discipline of changing course on evidence.",
  why: "After launch, evidence replaces opinions. Teams with a measurement habit improve weekly; teams without one improve by accident.",
  objectives: ["Choose one North-Star metric tied to value", "Run a weekly measure–decide loop", "Distinguish noise from signal before acting"],
  sections: [
    { h: "One number that means value", p: "Vanity metrics flatter; value metrics instruct. Downloads mean nothing; weekly active planners mean something. Choose one North-Star metric that is true only when users receive value — 'rooms booked', 'quizzes completed', 'schedules kept' — and let every decision argue in its language. Supporting numbers explain it; they never replace it." },
    { h: "The weekly loop, and when to trust a number", p: "Every week: read the North-Star and its drivers, form one hypothesis ('reminders will lift returns'), ship the smallest test, measure next week. Discipline: single-user anecdotes are stories, one-day spikes are noise — act on patterns across a week or more, and never change everything at once, or you will not know what worked. Slow is smooth; smooth is fast." },
  ],
  example: { title: "Six weeks of disciplined iteration", body: "North-Star: weekly kept schedules. W1 baseline 18. W2 test: Sunday-evening reminder → 31. W3 test: one-tap reschedule → 44. W4 vanity temptation (homepage redesign) rejected as unmeasured against the star. W5–6: 52 and 58. Four small changes, each owned by evidence — versus one big redesign blamed on the moon.", code: "north-star: schedules kept per week\nW1 18 → W2 31 (reminder ✓) → W3 44 (one-tap ✓)\nrejected: homepage redesign (no link to the star)\nW6: 58 · every gain attributable to one change" },
  terms: [["North-Star metric", "The single number that is true only when users get value."], ["Vanity metric", "A flattering count that changes no decision."], ["Iteration loop", "Hypothesize → ship small → measure → keep or revert, weekly."]],
  check: { prompt: "Downloads tripled after a press mention, but weekly active users are flat. The honest read is…", options: ["The product is growing strongly", "Awareness grew; value delivery did not — investigate activation and retention", "Delete the app and rebrand", "Press coverage is the North-Star metric"], answer: 1, explain: "Downloads are vanity without activation. The press worked at awareness; the product must still earn its weekly users — that is the real work now." },
});

export { LESSONS };

// ─── ACTIVITIES (practical learning per topic) ──────────────────────────────

export const ACTIVITIES: Activity[] = [
  { id: "act-ai-1", courseId: "c-ai", topicId: "t-ai-3", title: "Prompt That Solves a Real Problem", kind: "Prompt", minutes: 30,
    brief: "Choose a real problem you or someone you know actually faces (study planning, budgeting, meal prep, revision). Design a five-part prompt (role, context, task, format, constraints) that turns an AI assistant into a genuinely useful helper for that problem. Run it, evaluate the output, and iterate at least twice.",
    deliverables: ["The final prompt, annotated with its five parts", "One sentence: what you changed in each iteration and why", "The output you accepted, and what you verified by hand"] },
  { id: "act-ai-2", courseId: "c-ai", topicId: "t-ai-5", title: "Responsible-AI Audit", kind: "Design", minutes: 25,
    brief: "Pick an AI-powered system you use (recommendation feed, autocomplete, filter). Audit it: what data does it likely learn from? Where could bias enter? Who bears its errors? Write a one-page audit with one concrete improvement you would require before trusting it with higher-stakes decisions.",
    deliverables: ["Data-flow sketch: inputs → model → decisions", "Two bias risks and who would be harmed by errors", "One required improvement, justified"] },
  { id: "act-rb-1", courseId: "c-rob", topicId: "t-rb-5", title: "Design a Sensor Automation System", kind: "Design", minutes: 35,
    brief: "Design a sensor-based automation for a real setting (greenhouse, classroom, home, shop). Specify: the physical quantities measured, sensors chosen, the control rules (with hysteresis where thresholds are used), the actuators, and the failure modes with their guards. Draw the sense–think–act loop and the device-to-cloud flow if connected.",
    deliverables: ["System diagram: sensors → controller → actuators", "Rule set including at least one banded (hysteresis) threshold", "Two failure modes and the guard for each"] },
  { id: "act-rb-2", courseId: "c-rob", topicId: "t-rb-4", title: "IoT Topic Architecture", kind: "Design", minutes: 25,
    brief: "Design the MQTT topic architecture for a three-device system of your choice (e.g., weather station, fish tank, server room). Define topics for telemetry and commands, state what each device publishes and subscribes to, and explain how a new dashboard joins without touching the devices.",
    deliverables: ["Topic tree with naming rationale", "Publish/subscribe table per device", "One paragraph: adding a fourth consumer"] },
  { id: "act-se-1", courseId: "c-se", topicId: "t-se-2", title: "Build a One-Page Web App", kind: "Build", minutes: 45,
    brief: "Build a small, genuinely useful one-page web application: a grade calculator, a study timer with breaks, a flashcard viewer. It must use HTML structure, CSS layout that works on a phone, and JavaScript state that updates the page without reloading. Test it on at least two screen sizes.",
    deliverables: ["The working page (link or files)", "Three state variables it manages and how the UI derives from them", "A phone-width screenshot"] },
  { id: "act-se-2", courseId: "c-se", topicId: "t-se-5", title: "Model a Database & API Contract", kind: "Design", minutes: 30,
    brief: "Choose a small real system (club membership, equipment booking, homework tracker). Design the tables with relationships, write three SQL queries it must answer, and specify four REST endpoints with methods, request bodies, and status codes — including one validation error.",
    deliverables: ["Table diagram with relationships", "Three SELECT queries answering real questions", "Four endpoints including one 400/403 case"] },
  { id: "act-di-1", courseId: "c-di", topicId: "t-di-2", title: "Problem Hunt: Find Real Friction", kind: "Design", minutes: 30,
    brief: "Spend one week collecting workarounds you observe: duct-taped processes, shared spreadsheets, manual coordination chats. Pick the strongest one and write its problem statement: who hurts, how often, what they do today, and why it is worth solving. Include your frequency/pain/solvability verdict.",
    deliverables: ["Three observed workarounds, described concretely", "One problem statement with who/frequency/current cost", "The worth-solving test, answered honestly"] },
  { id: "act-di-2", courseId: "c-di", topicId: "t-di-4", title: "Business Model Canvas + Risk Box", kind: "Business", minutes: 35,
    brief: "For a technology solution you could realistically build this term, complete all nine Business Model Canvas blocks. Then name the single riskiest box — the one that, if wrong, collapses the model — and design the cheapest experiment that tests it, with a pass mark set in advance.",
    deliverables: ["Completed 9-block canvas for one concrete idea", "The riskiest box, named and justified", "One experiment with a pre-committed success criterion"] },
];

// ─── ASSESSMENTS ─────────────────────────────────────────────────────────────

export const ASSESSMENTS: Assessment[] = [
  {
    id: "a-ai-1", courseId: "c-ai", title: "AI Foundations Quiz", kind: "Quiz", minutes: 12, passPct: 70,
    questions: [
      { id: "q-ai1-1", kind: "mcq", prompt: "Which statement best describes today's production AI?", options: ["General intelligence equal to humans", "Narrow systems trained for specific tasks", "Programs that follow fixed hand-written rules only", "Systems that understand meaning like people"], answer: "Narrow systems trained for specific tasks", explain: "All deployed AI is narrow: excellent at its trained task, no transfer to others.", points: 2 },
      { id: "q-ai1-2", kind: "mcq", prompt: "In the AI pipeline, what is a 'label'?", options: ["A sticker on the server", "The correct answer attached to a training example", "The model's confidence score", "A type of neural network"], answer: "The correct answer attached to a training example", explain: "Supervised learning trains against labels — the known-correct answers in the data.", points: 2 },
      { id: "q-ai1-3", kind: "tf", prompt: "A model that scores 99% on training data and 60% on test data is demonstrating strong generalization.", options: ["True", "False"], answer: "False", explain: "That gap is the signature of overfitting — memorization, not generalization.", points: 2 },
      { id: "q-ai1-4", kind: "mcq", prompt: "Why do language models hallucinate?", options: ["They are programmed to lie", "They predict plausible continuations, not verified facts", "They have too little training data", "They only work offline"], answer: "They predict plausible continuations, not verified facts", explain: "Generation optimizes plausibility; truth requires your verification against sources.", points: 2 },
      { id: "q-ai1-5", kind: "short", prompt: "Name the discipline of evaluating a model only on data it never saw during training, and state in one line why it matters.", answer: "Hold out a test set (train/test split). It estimates real-world performance instead of measuring memorization.", accept: ["test set", "hold", "unseen", "generaliz", "memoriz"], explain: "The test set is the held-out exam; without it you cannot separate learning from memorizing.", points: 3 },
      { id: "q-ai1-6", kind: "mcq", prompt: "A hiring model trained on past hires down-ranks one demographic. The most responsible first step is…", options: ["Deploy it — history is accurate", "Compare error rates across groups before deployment", "Delete all demographic records", "Increase model size"], answer: "Compare error rates across groups before deployment", explain: "Aggregate accuracy hides who carries the errors; fairness requires per-group inspection.", points: 2 },
    ],
  },
  {
    id: "a-ai-2", courseId: "c-ai", title: "Applied AI Checkpoint", kind: "Checkpoint", minutes: 10, passPct: 70,
    questions: [
      { id: "q-ai2-1", kind: "mcq", prompt: "Which prompt is best engineered?", options: ["'Write something about climate'", "'As a science teacher, explain monsoons to 13-year-olds in 5 bullets with one analogy, under 150 words'", "'Climate. Go.'", "'Tell me everything about climate change'"], answer: "'As a science teacher, explain monsoons to 13-year-olds in 5 bullets with one analogy, under 150 words'", explain: "Role, context, task, format, constraints — nothing left to average-case guessing.", points: 2 },
      { id: "q-ai2-2", kind: "tf", prompt: "Including one or two input→output examples in a prompt (few-shot) often works better than long descriptions.", options: ["True", "False"], answer: "True", explain: "Demonstrating the pattern beats describing it — one precise example outweighs ten adjectives.", points: 2 },
      { id: "q-ai2-3", kind: "mcq", prompt: "Predicting delivery time in minutes is…", options: ["Classification", "Regression", "Clustering", "Not machine learning"], answer: "Regression", explain: "The label is a number, so the task is regression; categories would be classification.", points: 2 },
      { id: "q-ai2-4", kind: "short", prompt: "Before pasting project data into a public AI assistant, what two checks should always pass?", answer: "No personal/confidential data about others; no security-sensitive details (anonymize or use approved tools).", accept: ["personal", "confidential", "anonymiz", "private", "sensitive"], explain: "Privacy checkpoint: personal data out, confidential material out — sanitize before sending.", points: 3 },
      { id: "q-ai2-5", kind: "mcq", prompt: "Your prompt output has the right content but wrong tone. The efficient fix is…", options: ["Switch models", "Add a tone constraint or one example of the desired tone", "Ask it to try harder", "Restart the computer"], answer: "Add a tone constraint or one example of the desired tone", explain: "Diagnose the failure mode, change one variable — constraints or few-shot target tone directly.", points: 2 },
    ],
  },
  {
    id: "a-rb-1", courseId: "c-rob", title: "Robotics & Circuits Quiz", kind: "Quiz", minutes: 12, passPct: 70,
    questions: [
      { id: "q-rb1-1", kind: "mcq", prompt: "The loop shared by every robot is…", options: ["Charge → sleep → wake", "Sense → think → act", "Design → sell → support", "Input → print → archive"], answer: "Sense → think → act", explain: "Measure the world, decide, change the world — repeated continuously.", points: 2 },
      { id: "q-rb1-2", kind: "mcq", prompt: "Fixed voltage, resistance increases. Current…", options: ["Increases", "Decreases", "Is unchanged", "Reverses"], answer: "Decreases", explain: "Ohm's law I = V/R: more restriction, less flow.", points: 2 },
      { id: "q-rb1-3", kind: "tf", prompt: "A raw soil-moisture reading of 612 means the soil is 61.2% wet.", options: ["True", "False"], answer: "False", explain: "Raw values are meaningless until calibrated against measured dry/wet conditions.", points: 2 },
      { id: "q-rb1-4", kind: "mcq", prompt: "A fan at a single 25°C threshold clicks on/off constantly. The fix is…", options: ["A bigger fan", "Hysteresis: on above 26, off below 24", "Measuring faster", "Removing the sensor"], answer: "Hysteresis: on above 26, off below 24", explain: "A dead band absorbs measurement wobble; the fan holds state inside the band.", points: 2 },
      { id: "q-rb1-5", kind: "short", prompt: "In embedded code, what runs once at boot and what runs forever after — and why is the forever part necessary?", options: undefined, answer: "setup() runs once to configure pins; loop() runs forever because the device must keep sensing and acting while powered.", accept: ["setup", "loop", "forever", "continuous", "respond"], explain: "The infinite loop is the design: robots must keep responding as long as they have power.", points: 3 },
      { id: "q-rb1-6", kind: "mcq", prompt: "In MQTT, adding a new dashboard to an existing sensor network requires…", options: ["Rewriting sensor firmware", "Subscribing to the existing topic — no device changes", "A second sensor", "Direct wiring to the sensor"], answer: "Subscribing to the existing topic — no device changes", explain: "Pub/sub decouples producers from consumers; new listeners just subscribe.", points: 2 },
    ],
  },
  {
    id: "a-rb-2", courseId: "c-rob", title: "Automation & Build Checkpoint", kind: "Checkpoint", minutes: 10, passPct: 70,
    questions: [
      { id: "q-rb2-1", kind: "mcq", prompt: "Holding a server room at exactly 21°C under changing conditions needs…", options: ["A timer", "A single threshold", "Closed-loop control", "Manual switching"], answer: "Closed-loop control", explain: "Continuous adjustment toward a target under disturbance is the definition of closed loop.", points: 2 },
      { id: "q-rb2-2", kind: "tf", prompt: "A good project requirement is 'the robot should move well'.", options: ["True", "False"], answer: "False", explain: "It is untestable. Requirements must be measurable: '3 m in under 10 s on flat ground'.", points: 2 },
      { id: "q-rb2-3", kind: "mcq", prompt: "A robot works on USB but misbehaves on battery when motors run. Most likely…", options: ["Corrupted code", "Voltage sag under motor load — power issue", "Weaker Wi-Fi on battery", "Wrong chassis"], answer: "Voltage sag under motor load — power issue", explain: "Motors draw heavy current; the supply sags and starves the board. Separate or regulate supplies.", points: 2 },
      { id: "q-rb2-4", kind: "short", prompt: "Name the debugging order used before blaming program logic on a dead robot.", answer: "Sensor sanity, actuator sanity, power under load, then logic.", accept: ["sensor", "actuator", "power", "logic", "wiring"], explain: "Check sensing, then acting, then power — logic is examined only once the hardware speaks.", points: 3 },
      { id: "q-rb2-5", kind: "mcq", prompt: "The riskiest component in a build should be…", options: ["Built last, for suspense", "Prototyped first, alone", "Bought cheapest", "Kept secret"], answer: "Prototyped first, alone", explain: "De-risking: the most uncertain piece gets tested before you commit to the full assembly.", points: 2 },
    ],
  },
  {
    id: "a-se-1", courseId: "c-se", title: "Programming & Web Quiz", kind: "Quiz", minutes: 12, passPct: 70,
    questions: [
      { id: "q-se1-1", kind: "mcq", prompt: "userName = 'Amara', loginCount = 3. Which operation is a type bug?", options: ["loginCount + 1", "loginCount > 0", "loginCount + userName", "userName + ' logged in'"], answer: 2, explain: "Adding a number to a string mixes types — the classic '3Amara' bug.", points: 2 },
      { id: "q-se1-2", kind: "mcq", prompt: "HTTP status 500 means…", options: ["The user made a request mistake", "The server failed while handling the request", "The page was not found", "The browser is outdated"], answer: "The server failed while handling the request", explain: "5xx = server's fault. 4xx = client's fault. 404 is a specific 4xx.", points: 2 },
      { id: "q-se1-3", kind: "tf", prompt: "In component UIs, you manually update each label whenever data changes.", options: ["True", "False"], answer: "False", explain: "You change state; the framework re-renders what depends on it. The screen is a function of data.", points: 2 },
      { id: "q-se1-4", kind: "mcq", prompt: "You paste the same five lines twice. You have found…", options: ["A comment", "A function waiting to be born", "A security hole", "A loop"], answer: "A function waiting to be born", explain: "Duplication is the signal: extract, name, and call it instead.", points: 2 },
      { id: "q-se1-5", kind: "short", prompt: "What is the safest order when improving messy-but-working code?", answer: "Add tests capturing current behavior, then refactor in small steps keeping tests green.", accept: ["test", "refactor", "small", "green", "behavior"], explain: "Tests are the safety net; small verified steps improve structure without losing guarantees.", points: 3 },
      { id: "q-se1-6", kind: "mcq", prompt: "HTML, CSS, and JavaScript own respectively…", options: ["Style, structure, behavior", "Structure, presentation, behavior", "Behavior, structure, style", "Data, database, server"], answer: "Structure, presentation, behavior", explain: "HTML = skeleton, CSS = appearance, JS = muscle.", points: 2 },
    ],
  },
  {
    id: "a-se-2", courseId: "c-se", title: "Engineering & Data Checkpoint", kind: "Checkpoint", minutes: 10, passPct: 70,
    questions: [
      { id: "q-se2-1", kind: "mcq", prompt: "Storing a student's email in two tables that drift apart is a failure of…", options: ["Indexing", "Normalization — each fact should live once", "CSS", "Version control"], answer: "Normalization — each fact should live once", explain: "Duplicate facts eventually disagree; store once and reference.", points: 2 },
      { id: "q-se2-2", kind: "mcq", prompt: "A client POSTs a submission for someone else's project. The server answers…", options: ["201 Created", "403 Forbidden", "404 Not Found", "200 OK"], answer: "403 Forbidden", explain: "Authenticated but not authorized for this resource — exactly 403.", points: 2 },
      { id: "q-se2-3", kind: "tf", prompt: "A commit stores only the lines that changed since the previous commit, and nothing else.", options: ["True", "False"], answer: "False", explain: "A commit is a full snapshot plus author, time, and message — a checkpoint you can trust.", points: 2 },
      { id: "q-se2-4", kind: "short", prompt: "Why do teams use branches for risky work instead of editing main directly?", answer: "A branch isolates the experiment: main stays working, failed ideas are deleted, good ones merge after review.", accept: ["isolat", "main", "experiment", "safe", "merge"], explain: "Parallel timelines keep the working line safe while ideas are proven.", points: 3 },
      { id: "q-se2-5", kind: "mcq", prompt: "The test that would have caught a fixed bug should be…", options: ["Skipped — the bug is gone", "Written and kept in the suite permanently", "Written then deleted", "Kept as a comment"], answer: "Written and kept in the suite permanently", explain: "The regression test stands guard so the same bug can never return quietly.", points: 2 },
    ],
  },
  {
    id: "a-di-1", courseId: "c-di", title: "Product & Validation Quiz", kind: "Quiz", minutes: 12, passPct: 70,
    questions: [
      { id: "q-di1-1", kind: "mcq", prompt: "The strongest evidence that a problem is real is…", options: ["Founder enthusiasm", "People already paying with time or money in clumsy workarounds", "A big theoretical market", "Positive surveys"], answer: "People already paying with time or money in clumsy workarounds", explain: "Revealed behavior proves both the pain and the willingness to reduce it.", points: 2 },
      { id: "q-di1-2", kind: "mcq", prompt: "An MVP must be…", options: ["Feature-complete but buggy", "The smallest thing that still delivers the core value", "Free forever", "Built in one weekend no matter what"], answer: "The smallest thing that still delivers the core value", explain: "Minimum without viability is broken; viable without minimum is a project, not a test.", points: 2 },
      { id: "q-di1-3", kind: "tf", prompt: "'I would definitely use that' in an interview is strong evidence of demand.", options: ["True", "False"], answer: "False", explain: "Stated intent is cheap and kind; observed behavior — sign-ups, usage, payment — is evidence.", points: 2 },
      { id: "q-di1-4", kind: "mcq", prompt: "Your demand test set '≥ 20 sign-ups to proceed' and got 6. The honest move is…", options: ["Build anyway", "Treat the framing as failing its test; examine who the 6 were and reframe or pivot", "Rerun the identical test", "Lower the criterion after the fact"], answer: "Treat the framing as failing its test; examine who the 6 were and reframe or pivot", explain: "Pre-committed criteria exist to override optimism. The 6 are data, not permission.", points: 2 },
      { id: "q-di1-5", kind: "short", prompt: "What is a concierge pilot, and what does it teach that software cannot?", answer: "Delivering the promise fully manually; it teaches the true shape of the work — what users ask, where they get stuck, what they value enough to repeat.", accept: ["manual", "manually", "shape", "learn", "before building"], explain: "Manual delivery is the cheapest source of truth about the real workflow; automate only what is proven.", points: 3 },
      { id: "q-di1-6", kind: "mcq", prompt: "A canvas lists 'revenue: advertisements' for a 500-user campus app. The problem is…", options: ["Ads are illegal on campus", "Ad models need large sustained audiences; the box is likely fiction", "Ads require AI", "Students block all ads"], answer: "Ad models need large sustained audiences; the box is likely fiction", explain: "Revenue models must survive arithmetic. Small audiences cannot fund ad economics.", points: 2 },
    ],
  },
  {
    id: "a-di-2", courseId: "c-di", title: "Launch & Growth Checkpoint", kind: "Checkpoint", minutes: 10, passPct: 70,
    questions: [
      { id: "q-di2-1", kind: "mcq", prompt: "200 sign-ups, 6% activation. The priority is…", options: ["More sign-ups", "Fixing onboarding/activation", "A new logo", "Paid ads"], answer: "Fixing onboarding/activation", explain: "A leaky bucket punishes every user you acquire; deliver value to the users you already have.", points: 2 },
      { id: "q-di2-2", kind: "mcq", prompt: "The best North-Star metric for a study-planner is…", options: ["App downloads", "Schedules actually kept per week", "Social followers", "Lines of code shipped"], answer: "Schedules actually kept per week", explain: "It is true only when users receive value — the definition of a North-Star.", points: 2 },
      { id: "q-di2-3", kind: "tf", prompt: "Narrow positioning ('the app for first-year engineers') limits growth compared to 'an app for everyone'.", options: ["True", "False"], answer: "False", explain: "Being the obvious choice somewhere earns referrals; vague products get no word-of-mouth.", points: 2 },
      { id: "q-di2-4", kind: "short", prompt: "Give the four beats of a 30-second product story.", answer: "Character (user), tension (their pain), turn (the product changes it), proof (one concrete number or scene).", accept: ["character", "tension", "turn", "proof", "user", "pain"], explain: "Felt before explained: someone like them, their recurring pain, the change, and evidence.", points: 3 },
      { id: "q-di2-5", kind: "mcq", prompt: "One-day usage tripled then faded. Before changing anything you should…", options: ["Ship three features immediately", "Check whether it is a pattern across a week — one-day spikes are noise", "Declare product-market fit", "Raise prices"], answer: "Check whether it is a pattern across a week — one-day spikes are noise", explain: "Act on weekly patterns, not daily weather. Change one thing at a time so you know what worked.", points: 2 },
    ],
  },
];

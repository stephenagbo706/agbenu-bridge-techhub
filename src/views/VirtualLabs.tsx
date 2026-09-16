import { useState } from "react";
import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Chip, Reveal, SectionHead, cn } from "../components/ui";
import { Icon } from "../components/icons";
import {
  NeuralNetworkSim, ClassificationSim, PromptEngineeringSim,
  NLPTextClassificationSim,
  RobotSimulator, RobotNavigatorSim, SensorSim, IoTSim, MicrocontrollerSim,
  APISim, DatabaseSim, BusinessModelSim, ProductDevSim,
  SimulationContainer, DiagramNode, DiagramArrow,
} from "../components/simulations";

type LabId = string;

interface LabDef {
  id: LabId; courseId: string; title: string; desc: string; icon: string; minutes: number;
}

const LABS: LabDef[] = [
  // AI Labs
  { id: "lab-ai-nn", courseId: "c-ai", title: "Neural Network Explorer", desc: "Visualize how data flows through a neural network", icon: "🧠", minutes: 15 },
  { id: "lab-ai-cls", courseId: "c-ai", title: "Classification Lab", desc: "Train a simple classifier on visual data", icon: "📊", minutes: 12 },
  { id: "lab-ai-prompt", courseId: "c-ai", title: "Prompt Engineering Lab", desc: "Build structured prompts and see quality effects", icon: "✍️", minutes: 10 },
  { id: "lab-ai-nlp", courseId: "c-ai", title: "NLP Text Classification Lab", desc: "Tokenize text and classify its sentiment", icon: "💬", minutes: 12 },
  // Robotics Labs
  { id: "lab-rob-move", courseId: "c-rob", title: "Robot Movement Simulator", desc: "Program a virtual robot to reach targets", icon: "🤖", minutes: 15 },
  { id: "lab-rob-navigator", courseId: "c-rob", title: "Robot Navigator", desc: "Program an AI robot to navigate to its destination", icon: "🧭", minutes: 15 },
  { id: "lab-rob-sensor", courseId: "c-rob", title: "Sensor & Automation Lab", desc: "Connect sensors to automation rules", icon: "🌡️", minutes: 10 },
  { id: "lab-rob-iot", courseId: "c-rob", title: "IoT Data Flow", desc: "Trace data from sensor to cloud dashboard", icon: "🌐", minutes: 12 },
  { id: "lab-rob-mcu", courseId: "c-rob", title: "Microcontroller Lab", desc: "Wire inputs and outputs on a virtual MCU", icon: "🔧", minutes: 15 },
  // Software Engineering Labs
  { id: "lab-se-api", courseId: "c-se", title: "API Lab", desc: "Send HTTP requests and observe responses", icon: "📡", minutes: 12 },
  { id: "lab-se-db", courseId: "c-se", title: "Database Lab", desc: "Query and manage a simulated database", icon: "🗄️", minutes: 12 },
  // Innovation Labs
  { id: "lab-di-biz", courseId: "c-di", title: "Business Model Canvas", desc: "Build and validate a startup business model", icon: "📋", minutes: 15 },
  { id: "lab-di-prod", courseId: "c-di", title: "Product Development Sim", desc: "Walk through the product lifecycle", icon: "🚀", minutes: 12 },
];

// ─── Diagram Components ──────────────────────────────────────────────────────

function AIDiagrams() {
  const [active, setActive] = useState<string | null>(null);
  const info: Record<string, string> = {
    "Input Layer": "Receives raw data — numbers, text, images — that the network will process.",
    "Hidden Layer 1": "Extracts basic patterns and features from the input data.",
    "Hidden Layer 2": "Combines basic features into more complex representations.",
    "Output Layer": "Produces the final prediction — a classification, a number, or generated text.",
    "Data": "Raw information collected for the model to learn from.",
    "Preparation": "Cleaning, labeling, and splitting data into training and test sets.",
    "Training": "The model adjusts its internal weights to minimize prediction errors.",
    "Model": "The trained system that can now make predictions on new data.",
    "Testing": "Evaluating the model on unseen data to measure real performance.",
    "Prediction": "The model's output for new, real-world inputs.",
    "Prompt": "Your structured instruction to the AI model.",
    "AI Model": "The trained system that generates responses based on your prompt.",
    "Context": "Background information that helps the model understand your request.",
    "Generation": "The model produces output token by token based on patterns learned.",
    "Output": "The final response — text, code, analysis, or creative content.",
  };
  return (
    <div className="space-y-6">
      <SimulationContainer title="Neural Network Architecture" subtitle="Click each layer to understand its role" badge="Diagram" accent="#2f5fe3">
        <div className="flex flex-col items-center gap-1">
          {["Input Layer", "Hidden Layer 1", "Hidden Layer 2", "Output Layer"].map((node, i, arr) => (
            <div key={node} className="flex flex-col items-center">
              <DiagramNode label={node} sublabel={`${3 + (i % 2)} neurons`} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#2f5fe3" icon={i === 0 ? "📥" : i === arr.length - 1 ? "📤" : "⚡"} />
              {i < arr.length - 1 && <DiagramArrow accent="#2f5fe3" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-ai bg-ai-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>

      <SimulationContainer title="Machine Learning Workflow" subtitle="How a model learns from data" badge="Diagram" accent="#2f5fe3">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {["Data", "Preparation", "Training", "Model", "Testing", "Prediction"].map((node, i, arr) => (
            <div key={node} className="flex items-center gap-1">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#2f5fe3" />
              {i < arr.length - 1 && <DiagramArrow direction="right" accent="#2f5fe3" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-ai bg-ai-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>

      <SimulationContainer title="Generative AI Flow" subtitle="How prompts become outputs" badge="Diagram" accent="#2f5fe3">
        <div className="flex flex-col items-center gap-1">
          {["Prompt", "AI Model", "Context", "Generation", "Output"].map((node, i, arr) => (
            <div key={node} className="flex flex-col items-center">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#2f5fe3" />
              {i < arr.length - 1 && <DiagramArrow accent="#2f5fe3" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-ai bg-ai-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>
    </div>
  );
}

function RoboticsDiagrams() {
  const [active, setActive] = useState<string | null>(null);
  const info: Record<string, string> = {
    "Sensors": "Measure the physical world — temperature, distance, light, motion, pressure.",
    "Microcontroller": "The brain — reads sensor data, runs your program, sends commands to actuators.",
    "Decision / Control": "Your code's logic: IF temperature > 30 THEN turn fan on.",
    "Motors / Actuators": "Physical outputs — motors move, LEDs light, buzzers sound, pumps flow.",
    "Sensor Node": "A device with sensors that collects environmental data.",
    "Internet": "Data travels over WiFi, cellular, or LoRaWAN to reach the cloud.",
    "Cloud / Server": "Stores data, runs analytics, and serves dashboards to users.",
    "Application": "The user interface — web or mobile — that displays insights and controls.",
    "User": "The person who makes decisions based on the system's information.",
  };
  return (
    <div className="space-y-6">
      <SimulationContainer title="Robot System Architecture" subtitle="Sense → Think → Act" badge="Diagram" accent="#d95f0e">
        <div className="flex flex-col items-center gap-1">
          {["Sensors", "Microcontroller", "Decision / Control", "Motors / Actuators"].map((node, i, arr) => (
            <div key={node} className="flex flex-col items-center">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#d95f0e" icon={i === 0 ? "📡" : i === 1 ? "🔧" : i === 2 ? "🧠" : "⚙️"} />
              {i < arr.length - 1 && <DiagramArrow accent="#d95f0e" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-rob bg-rob-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>

      <SimulationContainer title="IoT Architecture" subtitle="From device to user" badge="Diagram" accent="#d95f0e">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {["Sensor Node", "Internet", "Cloud / Server", "Application", "User"].map((node, i, arr) => (
            <div key={node} className="flex items-center gap-1">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#d95f0e" />
              {i < arr.length - 1 && <DiagramArrow direction="right" accent="#d95f0e" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-rob bg-rob-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>
    </div>
  );
}

function SEDiagrams() {
  const [active, setActive] = useState<string | null>(null);
  const info: Record<string, string> = {
    "User": "The person using the application through a browser or mobile app.",
    "Frontend": "The visible interface — HTML, CSS, JavaScript — that users interact with.",
    "API": "The contract between frontend and backend — defines what data can be requested.",
    "Backend": "Server-side logic — processes requests, applies business rules, queries databases.",
    "Database": "Persistent storage — stores users, products, orders, and all application data.",
    "Planning": "Define what to build, for whom, and why.",
    "Requirements": "Specific, testable descriptions of what the system must do.",
    "Design": "Architecture decisions, UI wireframes, database schema.",
    "Development": "Writing the actual code that implements the design.",
    "Testing": "Verifying the code works correctly — unit, integration, user tests.",
    "Deployment": "Releasing the software to users — servers, app stores, CI/CD.",
    "Maintenance": "Fixing bugs, adding features, monitoring performance.",
  };
  return (
    <div className="space-y-6">
      <SimulationContainer title="Application Architecture" subtitle="How a web application works" badge="Diagram" accent="#1b8a4c">
        <div className="flex flex-col items-center gap-1">
          {["User", "Frontend", "API", "Backend", "Database"].map((node, i, arr) => (
            <div key={node} className="flex flex-col items-center">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#1b8a4c" icon={i === 0 ? "👤" : i === 1 ? "🖥️" : i === 2 ? "📡" : i === 3 ? "⚙️" : "🗄️"} />
              {i < arr.length - 1 && <DiagramArrow accent="#1b8a4c" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-se bg-se-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>

      <SimulationContainer title="Software Development Lifecycle" subtitle="From idea to maintained product" badge="Diagram" accent="#1b8a4c">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {["Planning", "Requirements", "Design", "Development", "Testing", "Deployment", "Maintenance"].map((node, i, arr) => (
            <div key={node} className="flex items-center gap-1">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#1b8a4c" />
              {i < arr.length - 1 && <DiagramArrow direction="right" accent="#1b8a4c" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-se bg-se-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>
    </div>
  );
}

function DIDiagrams() {
  const [active, setActive] = useState<string | null>(null);
  const info: Record<string, string> = {
    "Problem": "A real pain point that people experience — the starting point of every product.",
    "Research": "Talking to users, observing behavior, gathering evidence that the problem is real.",
    "Idea": "A proposed solution — your hypothesis about how to solve the problem.",
    "Prototype": "The simplest version you can build to test your hypothesis.",
    "Test": "Putting your prototype in front of real users and measuring their response.",
    "Improve": "Using test feedback to make the product better — iterate based on evidence.",
    "Launch": "Releasing the product to your target market with a clear go-to-market plan.",
    "Solution": "Your specific approach to solving the identified problem.",
    "Target Users": "The specific group of people who experience the problem most acutely.",
    "Business Model": "How the venture creates, delivers, and captures value — sustainably.",
    "Product": "The actual thing users interact with — app, website, device, service.",
    "Marketing": "How you reach and convert your target users into customers.",
    "Revenue": "The money flowing in — subscriptions, transactions, ads, licensing.",
  };
  return (
    <div className="space-y-6">
      <SimulationContainer title="Product Development Process" subtitle="From problem to launch" badge="Diagram" accent="#c2317e">
        <div className="flex flex-col items-center gap-1">
          {["Problem", "Research", "Idea", "Prototype", "Test", "Improve", "Launch"].map((node, i, arr) => (
            <div key={node} className="flex flex-col items-center">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#c2317e" />
              {i < arr.length - 1 && <DiagramArrow accent="#c2317e" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-di bg-di-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>

      <SimulationContainer title="Startup Model" subtitle="From problem to revenue" badge="Diagram" accent="#c2317e">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {["Problem", "Solution", "Target Users", "Business Model", "Product", "Marketing", "Revenue"].map((node, i, arr) => (
            <div key={node} className="flex items-center gap-1">
              <DiagramNode label={node} active={active === node} onClick={() => setActive(active === node ? null : node)} accent="#c2317e" />
              {i < arr.length - 1 && <DiagramArrow direction="right" accent="#c2317e" />}
            </div>
          ))}
        </div>
        {active && info[active] && (
          <div className="mt-3 rounded-md border-l-4 border-di bg-di-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed"><strong>{active}:</strong> {info[active]}</p>
          </div>
        )}
      </SimulationContainer>
    </div>
  );
}

// ─── Main Labs View ──────────────────────────────────────────────────────────

export function VirtualLabsView({ courseId }: { courseId?: string }) {
  const app = useApp();
  const { db } = app;
  const [activeLab, setActiveLab] = useState<LabId | null>(null);
  const [showDiagrams, setShowDiagrams] = useState(false);

  // Default to active course if no courseId provided
  const effectiveCourseId = courseId || (app.hasActiveCourse() ? app.activeCourse()?.id : undefined);
  const filteredLabs = effectiveCourseId ? LABS.filter((l) => l.courseId === effectiveCourseId) : LABS;
  const courses = effectiveCourseId ? db.courses.filter((c) => c.id === effectiveCourseId) : db.courses;

  const renderLab = (labId: LabId) => {
    switch (labId) {
      case "lab-ai-nn": return <NeuralNetworkSim />;
      case "lab-ai-cls": return <ClassificationSim />;
      case "lab-ai-prompt": return <PromptEngineeringSim />;
      case "lab-ai-nlp": return <NLPTextClassificationSim />;
      case "lab-rob-move": return <RobotSimulator />;
      case "lab-rob-navigator": return <RobotNavigatorSim />;
      case "lab-rob-sensor": return <SensorSim />;
      case "lab-rob-iot": return <IoTSim />;
      case "lab-rob-mcu": return <MicrocontrollerSim />;
      case "lab-se-api": return <APISim />;
      case "lab-se-db": return <DatabaseSim />;
      case "lab-di-biz": return <BusinessModelSim />;
      case "lab-di-prod": return <ProductDevSim />;
      default: return null;
    }
  };

  const renderDiagrams = (cid: string) => {
    switch (cid) {
      case "c-ai": return <AIDiagrams />;
      case "c-rob": return <RoboticsDiagrams />;
      case "c-se": return <SEDiagrams />;
      case "c-di": return <DIDiagrams />;
      default: return null;
    }
  };

  if (activeLab) {
    const lab = LABS.find((l) => l.id === activeLab)!;
    const m = courseMeta(lab.courseId);
    return (
      <div className="space-y-5">
        <button onClick={() => setActiveLab(null)} className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-mute transition-colors hover:text-ink">
          <Icon name="arrowL" size={13} /> Back to labs
        </button>
        {renderLab(activeLab)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHead
        kicker="Interactive Learning"
        title="Virtual Labs & Simulations"
        right={<Chip className="bg-brand-soft text-brand-deep">{filteredLabs.length} labs available</Chip>}
      />

      {/* Learning Journey */}
      {!courseId && (
        <Reveal>
          <div className="card-ink overflow-hidden bg-card">
            <div className="h-1 w-full bg-gradient-to-r from-ai via-rob via-se to-di" />
            <div className="p-5 sm:p-6">
              <div className="lbl">The learning journey</div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {["Discover", "Learn", "Visualize", "Simulate", "Experiment", "Practice", "Assess", "Build", "Solve", "Innovate"].map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-md border-1.5 border-brand/30 bg-brand-soft/50 px-2.5 py-1 font-mono text-[10px] font-semibold text-brand-deep">{step}</span>
                    {i < arr.length - 1 && <span className="text-mute">→</span>}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-mute">
                Every course is a technology laboratory. Don't just read — <strong>see it, interact with it, experiment with it, and build something.</strong> Each lab below is a hands-on environment where concepts become tangible.
              </p>
            </div>
          </div>
        </Reveal>
      )}

      {/* Course filter tabs - only show if no active course */}
      {!effectiveCourseId && (
        <div className="flex flex-wrap gap-2">
          {db.courses.map((c) => {
            const m = courseMeta(c.id);
            const count = LABS.filter((l) => l.courseId === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => app.nav({ name: "labs", id: c.id })}
                className={cn("btn btn-sm", m.chip)}
              >
                {c.short} ({count} labs)
              </button>
            );
          })}
        </div>
      )}

      {/* Course sections */}
      {courses.map((course) => {
        const m = courseMeta(course.id);
        const courseLabs = filteredLabs.filter((l) => l.courseId === course.id);
        return (
          <div key={course.id} className="space-y-4">
            <Reveal>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border-1.5" style={{ borderColor: m.hex + "40", backgroundColor: m.hex + "12" }}>
                    <Icon name={m.icon === "spark" ? "spark" : m.icon === "robot" ? "cube" : m.icon === "code" ? "code" : "bulb"} size={16} className={m.text} />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold tracking-tight">{course.title}</h2>
                    <p className="text-[12px] text-mute">{courseLabs.length} labs · Diagrams · Simulations</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDiagrams(!showDiagrams)}
                  className={cn("btn btn-sm", showDiagrams ? "btn-dark" : "")}
                >
                  <Icon name="book" size={12} /> {showDiagrams ? "Hide" : "Show"} Diagrams
                </button>
              </div>
            </Reveal>

            {/* Diagrams */}
            {showDiagrams && (
              <Reveal delay={60}>
                {renderDiagrams(course.id)}
              </Reveal>
            )}

            {/* Lab Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courseLabs.map((lab, i) => (
                <Reveal key={lab.id} delay={100 + i * 60}>
                  <button
                    onClick={() => setActiveLab(lab.id)}
                    className="card-ink card-ink-hover group flex h-full w-full flex-col overflow-hidden bg-card text-left"
                  >
                    <div className="h-1 w-full" style={{ backgroundColor: m.hex }} />
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{lab.icon}</span>
                        <Chip className={m.chip}>Lab</Chip>
                        <span className="ml-auto font-mono text-[10px] text-mute">~{lab.minutes} min</span>
                      </div>
                      <h3 className="mt-2 font-display text-sm font-bold tracking-tight">{lab.title}</h3>
                      <p className="mt-1 text-[12px] leading-relaxed text-mute">{lab.desc}</p>
                      <div className="mt-3 flex items-center justify-between border-t-1.5 border-dashed border-line pt-2.5">
                        <span className="text-[11px] text-mute">Interactive simulation</span>
                        <span className="flex items-center gap-1 font-mono text-[10px] font-medium uppercase tracking-wider transition-transform group-hover:translate-x-0.5" style={{ color: m.hex }}>
                          Open <Icon name="arrowR" size={11} />
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

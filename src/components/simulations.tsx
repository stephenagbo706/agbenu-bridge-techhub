import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "./ui";
import { Icon } from "./icons";

// ─── Reusable Simulation Container ──────────────────────────────────────────

export function SimulationContainer({
  title, subtitle, badge, accent, children, className,
}: {
  title: string; subtitle?: string; badge?: string; accent: string;
  children: React.ReactNode; className?: string;
}) {
  return (
    <section className={cn("card-ink overflow-hidden bg-card", className)}>
      <div className="h-1 w-full" style={{ backgroundColor: accent }} />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border-1.5" style={{ borderColor: accent + "40", backgroundColor: accent + "12" }}>
            <Icon name="spark" size={14} style={{ color: accent }} />
          </span>
          <div>
            <h3 className="font-display text-base font-bold tracking-tight">{title}</h3>
            {subtitle && <p className="text-[12px] text-mute">{subtitle}</p>}
          </div>
          {badge && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider" style={{ backgroundColor: accent + "15", color: accent }}>
              {badge}
            </span>
          )}
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

// ─── Interactive Diagram Node ────────────────────────────────────────────────

export function DiagramNode({
  label, sublabel, active, onClick, accent, icon,
}: {
  label: string; sublabel?: string; active?: boolean; onClick?: () => void; accent: string; icon?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 rounded-lg border-2 px-4 py-3 text-center transition-all",
        active ? "scale-105 shadow-md" : "hover:scale-[1.02]",
      )}
      style={{
        borderColor: active ? accent : "#d9dbd0",
        backgroundColor: active ? accent + "12" : "#fbfbf7",
      }}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm font-semibold">{label}</span>
      {sublabel && <span className="text-[10px] text-mute">{sublabel}</span>}
    </button>
  );
}

export function DiagramArrow({ direction = "down", accent }: { direction?: "down" | "right"; accent: string }) {
  if (direction === "right") {
    return (
      <div className="flex items-center px-1">
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
          <path d="M0 8h20M16 2l6 6-6 6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex justify-center py-1">
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <path d="M8 0v20M2 16l6 6 6-6" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Neural Network Simulation ───────────────────────────────────────────────

export function NeuralNetworkSim() {
  const [inputs, setInputs] = useState([0.5, 0.3, 0.8]);
  const [weights] = useState(() => ({
    inputToHidden: Array.from({ length: 3 }, () => Array.from({ length: 4 }, () => Math.random() * 2 - 1)),
    hiddenToOutput: Array.from({ length: 4 }, () => Array.from({ length: 2 }, () => Math.random() * 2 - 1)),
  }));

  const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

  const hiddenLayer = weights.inputToHidden[0].map((_, j) =>
    sigmoid(inputs.reduce((sum, inp, i) => sum + inp * weights.inputToHidden[i][j], 0))
  );
  const outputLayer = weights.hiddenToOutput[0].map((_, j) =>
    sigmoid(hiddenLayer.reduce((sum, h, i) => sum + h * weights.hiddenToOutput[i][j], 0))
  );

  return (
    <SimulationContainer title="Neural Network Simulation" subtitle="Adjust inputs and watch how data flows through the network" badge="Interactive" accent="#2f5fe3">
      <div className="space-y-4">
        {/* Input Controls */}
        <div className="grid gap-3 sm:grid-cols-3">
          {inputs.map((val, i) => (
            <div key={i} className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
              <label className="lbl">Input {i + 1}</label>
              <input
                type="range" min="0" max="1" step="0.05" value={val}
                onChange={(e) => { const n = [...inputs]; n[i] = parseFloat(e.target.value); setInputs(n); }}
                className="w-full accent-[#2f5fe3]"
              />
              <div className="mt-1 text-center font-mono text-sm font-bold text-ai">{val.toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Network Visualization */}
        <div className="rounded-lg border-1.5 border-line bg-paper/30 p-4">
          <div className="flex items-center justify-between gap-2">
            {/* Input Layer */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-mute">Input</span>
              {inputs.map((v, i) => (
                <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-ai-soft font-mono text-xs font-bold text-ai" style={{ borderColor: "#2f5fe3" }}>
                  {v.toFixed(1)}
                </div>
              ))}
            </div>

            {/* Connections + Hidden */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-mute">Hidden</span>
              {hiddenLayer.map((v, i) => (
                <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-ai-soft/60 font-mono text-xs font-bold text-ai" style={{ borderColor: "#2f5fe360" }}>
                  {v.toFixed(2)}
                </div>
              ))}
            </div>

            {/* Output */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-mute">Output</span>
              {outputLayer.map((v, i) => (
                <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-xs font-bold text-[#f4faf7]" style={{ backgroundColor: "#2f5fe3", borderColor: "#1a3fa0" }}>
                  {v.toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-md border-l-4 border-ai bg-ai-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>How it works:</strong> Each input is multiplied by weights, summed at each neuron, and passed through an activation function (sigmoid). The network transforms raw inputs into predictions through layers of computation. Move the sliders to see how changing inputs affects outputs.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── ML Classification Simulation ────────────────────────────────────────────

interface DataPoint { x: number; y: number; label: 0 | 1; }

export function ClassificationSim() {
  const [points, setPoints] = useState<DataPoint[]>([
    { x: 20, y: 70, label: 0 }, { x: 30, y: 80, label: 0 }, { x: 15, y: 60, label: 0 },
    { x: 25, y: 55, label: 0 }, { x: 70, y: 30, label: 1 }, { x: 80, y: 25, label: 1 },
    { x: 75, y: 40, label: 1 }, { x: 85, y: 20, label: 1 },
  ]);
  const [trained, setTrained] = useState(false);
  const [testPoint, setTestPoint] = useState<{ x: number; y: number } | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);

  // Simple linear classifier: find midpoint between class centroids
  const train = () => {
    setTrained(true);
  };

  const classify = (px: number, py: number): number => {
    const c0 = points.filter(p => p.label === 0);
    const c1 = points.filter(p => p.label === 1);
    const cx0 = c0.reduce((s, p) => s + p.x, 0) / c0.length;
    const cy0 = c0.reduce((s, p) => s + p.y, 0) / c0.length;
    const cx1 = c1.reduce((s, p) => s + p.x, 0) / c1.length;
    const cy1 = c1.reduce((s, p) => s + p.y, 0) / c1.length;
    const d0 = Math.sqrt((px - cx0) ** 2 + (py - cy0) ** 2);
    const d1 = Math.sqrt((px - cx1) ** 2 + (py - cy1) ** 2);
    return d0 < d1 ? 0 : 1;
  };

  const addPoint = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = 100 - ((e.clientY - rect.top) / rect.height) * 100;
    const label = (classify(x, y)) as 0 | 1;
    setPoints([...points, { x, y, label }]);
    setTrained(false);
  };

  const testPrediction = () => {
    if (!testPoint || !trained) return;
    setPrediction(classify(testPoint.x, testPoint.y));
  };

  const reset = () => {
    setPoints([
      { x: 20, y: 70, label: 0 }, { x: 30, y: 80, label: 0 }, { x: 15, y: 60, label: 0 },
      { x: 25, y: 55, label: 0 }, { x: 70, y: 30, label: 1 }, { x: 80, y: 25, label: 1 },
      { x: 75, y: 40, label: 1 }, { x: 85, y: 20, label: 1 },
    ]);
    setTrained(false);
    setTestPoint(null);
    setPrediction(null);
  };

  return (
    <SimulationContainer title="Classification Lab" subtitle="Click the graph to add data points, then train the classifier" badge="Lab" accent="#2f5fe3">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={train} className={cn("btn btn-sm", trained ? "btn-dark" : "btn-primary")}>
            <Icon name="spark" size={12} /> {trained ? "Retrain" : "Train Classifier"}
          </button>
          <button onClick={reset} className="btn btn-sm">Reset Data</button>
          {trained && (
            <span className="inline-flex items-center gap-1 rounded-md bg-se-soft px-2 py-1 font-mono text-[10px] font-medium text-se">
              <Icon name="check" size={10} /> Model trained on {points.length} points
            </span>
          )}
        </div>

        {/* Graph */}
        <div
          onClick={addPoint}
          className="relative h-64 cursor-crosshair overflow-hidden rounded-lg border-1.5 border-line bg-paper/50"
        >
          {/* Grid */}
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(20,24,31,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,24,31,0.05) 1px, transparent 1px)", backgroundSize: "20% 20%" }} />
          {/* Decision boundary */}
          {trained && (
            <div className="absolute inset-0">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {(() => {
                  const c0 = points.filter(p => p.label === 0);
                  const c1 = points.filter(p => p.label === 1);
                  const cx0 = c0.reduce((s, p) => s + p.x, 0) / c0.length;
                  const cy0 = 100 - c0.reduce((s, p) => s + p.y, 0) / c0.length;
                  const cx1 = c1.reduce((s, p) => s + p.x, 0) / c1.length;
                  const cy1 = 100 - c1.reduce((s, p) => s + p.y, 0) / c1.length;
                  const mx = (cx0 + cx1) / 2;
                  const my = (cy0 + cy1) / 2;
                  const dx = cx1 - cx0;
                  const dy = cy1 - cy0;
                  // Perpendicular line through midpoint
                  const len = 80;
                  const nx = -dy / Math.sqrt(dx * dx + dy * dy) * len;
                  const ny = dx / Math.sqrt(dx * dx + dy * dy) * len;
                  return <line x1={mx - nx} y1={my - ny} x2={mx + nx} y2={my + ny} stroke="#2f5fe3" strokeWidth="0.4" strokeDasharray="2,2" />;
                })()}
              </svg>
            </div>
          )}
          {/* Points */}
          {points.map((p, i) => (
            <div
              key={i}
              className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                left: `${p.x}%`, top: `${100 - p.y}%`,
                backgroundColor: p.label === 0 ? "#2f5fe3" : "#d95f0e",
                borderColor: p.label === 0 ? "#1a3fa0" : "#a04a0a",
              }}
            />
          ))}
          {/* Test point */}
          {testPoint && (
            <div
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-gold-soft"
              style={{ left: `${testPoint.x}%`, top: `${100 - testPoint.y}%` }}
            />
          )}
          {/* Labels */}
          <div className="absolute bottom-1 left-1 font-mono text-[9px] text-mute">Click to add points</div>
          <div className="absolute right-2 top-2 flex gap-2">
            <span className="flex items-center gap-1 font-mono text-[9px]"><span className="h-2 w-2 rounded-full bg-ai" /> Class A</span>
            <span className="flex items-center gap-1 font-mono text-[9px]"><span className="h-2 w-2 rounded-full bg-rob" /> Class B</span>
          </div>
        </div>

        {/* Test area */}
        {trained && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
              <label className="lbl">Test Point X</label>
              <input type="range" min="0" max="100" value={testPoint?.x ?? 50} onChange={(e) => setTestPoint({ x: parseInt(e.target.value), y: testPoint?.y ?? 50 })} className="w-full accent-[#2f5fe3]" />
            </div>
            <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
              <label className="lbl">Test Point Y</label>
              <input type="range" min="0" max="100" value={testPoint?.y ?? 50} onChange={(e) => setTestPoint({ x: testPoint?.x ?? 50, y: parseInt(e.target.value) })} className="w-full accent-[#2f5fe3]" />
            </div>
          </div>
        )}
        {trained && testPoint && (
          <div className="flex items-center gap-3">
            <button onClick={testPrediction} className="btn btn-sm btn-dark">Predict Class</button>
            {prediction !== null && (
              <span className={cn("rounded-md px-3 py-1 font-mono text-xs font-bold", prediction === 0 ? "bg-ai-soft text-ai" : "bg-rob-soft text-rob")}>
                → Predicted: Class {prediction === 0 ? "A" : "B"}
              </span>
            )}
          </div>
        )}

        <div className="rounded-md border-l-4 border-ai bg-ai-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>How classification works:</strong> The model finds the center (centroid) of each class and draws a boundary between them. New points are classified based on which centroid they're closest to. Click the graph to add training data, then train and test predictions.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── NLP Text Classification Simulation ──────────────────────────────────────

const NLP_EXAMPLES = [
  "I love how clear and helpful this lesson is",
  "The app is slow and frustrating to use",
  "The new feature works exactly as expected",
];

export function NLPTextClassificationSim() {
  const [text, setText] = useState(NLP_EXAMPLES[0]);
  const tokens = text.trim() ? text.trim().split(/\s+/) : [];
  const positiveWords = new Set(["love", "clear", "helpful", "great", "excellent", "works", "expected"]);
  const negativeWords = new Set(["slow", "frustrating", "bad", "poor", "confusing", "broken"]);
  const normalizedTokens = tokens.map((token) => token.toLowerCase().replace(/[^a-z']/g, ""));
  const positive = normalizedTokens.filter((token) => positiveWords.has(token)).length;
  const negative = normalizedTokens.filter((token) => negativeWords.has(token)).length;
  let sentiment = "Neutral";
  let sentimentColor = "#8a6a1b";
  if (positive > negative) {
    sentiment = "Positive";
    sentimentColor = "#1b8a4c";
  } else if (negative > positive) {
    sentiment = "Negative";
    sentimentColor = "#c2413b";
  }

  return (
    <SimulationContainer title="NLP Text Classification Lab" subtitle="See how text becomes tokens and a simple sentiment prediction" badge="Interactive" accent="#7657c5">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {NLP_EXAMPLES.map((example, index) => (
            <button key={example} onClick={() => setText(example)} className="btn btn-sm">
              Example {index + 1}
            </button>
          ))}
        </div>
        <label className="block">
          <span className="lbl">Input text</span>
          <textarea value={text} onChange={(event) => setText(event.target.value)} rows={3} className="mt-1 w-full rounded-lg border-1.5 border-line bg-paper/50 p-3 text-sm outline-none transition-colors focus:border-[#7657c5]" placeholder="Write a sentence to classify..." />
        </label>
        <div className="rounded-lg border-1.5 border-line bg-paper/30 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Tokenization</span>
            <span className="font-mono text-[11px] text-mute">{tokens.length} tokens</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tokens.length > 0 ? tokens.map((token, index) => (
              <span key={`${token}-${index}`} className="rounded-md border-1.5 border-[#7657c5]/25 bg-[#7657c5]/10 px-2 py-1 font-mono text-xs text-[#5c419f]">
                {token}
              </span>
            )) : <span className="text-sm text-mute">Enter text to create tokens.</span>}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3"><span className="lbl">Positive signals</span><strong className="mt-1 block text-xl text-se">{positive}</strong></div>
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3"><span className="lbl">Negative signals</span><strong className="mt-1 block text-xl text-[#c2413b]">{negative}</strong></div>
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3"><span className="lbl">Prediction</span><strong className="mt-1 block text-xl" style={{ color: sentimentColor }}>{sentiment}</strong></div>
        </div>
        <div className="rounded-md border-l-4 px-4 py-3" style={{ borderColor: sentimentColor, backgroundColor: `${sentimentColor}12` }}>
          <p className="text-[13px] leading-relaxed"><strong>What the model is doing:</strong> It converts the sentence into tokens, looks for learned word signals, and chooses the class with the strongest evidence. Real NLP models learn richer patterns than this teaching example.</p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── Prompt Engineering Simulation ───────────────────────────────────────────

export function PromptEngineeringSim() {
  const [prompt, setPrompt] = useState("");
  const [role, setRole] = useState("");
  const [context, setContext] = useState("");
  const [format, setFormat] = useState("");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const runSimulation = () => {
    if (!prompt.trim()) return;
    setRunning(true);
    setOutput("");

    // Educational simulation - generates structured response based on prompt components
    setTimeout(() => {
      const parts: string[] = [];
      if (role) parts.push(`[Role Applied: ${role}]`);
      if (context) parts.push(`[Context: ${context}]`);
      parts.push(`\nResponse to: "${prompt}"`);
      if (format) parts.push(`\n[Format: ${format}]`);
      if (constraints) parts.push(`[Constraints: ${constraints}]`);

      // Simulate different quality based on prompt completeness
      const score = [role, context, format, constraints].filter(Boolean).length;
      const quality = score === 0 ? "basic" : score <= 2 ? "moderate" : "strong";

      const responses: Record<string, string> = {
        basic: `\n─── Basic Response (no structure) ───\n\nThis is a simple, unstructured response because no role, context, or constraints were provided. The output is generic and may not match your specific needs.\n\n💡 Tip: Adding role, context, and format instructions dramatically improves AI output quality.`,
        moderate: `\n─── Moderate Response ───\n\n${parts.join("\n")}\n\nThe response is shaped by ${score} structural elements. It's more targeted than a basic prompt but could benefit from additional constraints and output format specifications.\n\n💡 Tip: The five-part structure (Role + Context + Task + Format + Constraints) produces the most reliable outputs.`,
        strong: `\n─── High-Quality Response ───\n\n${parts.join("\n")}\n\n✓ All five prompt engineering elements are present.\n✓ The response will be focused, well-structured, and constrained.\n✓ Output format ensures consistency.\n\nThis demonstrates how structured prompts produce significantly better AI outputs. Each element reduces ambiguity and guides the model toward your specific needs.`,
      };
      setOutput(responses[quality]);
      setRunning(false);
    }, 1200);
  };

  return (
    <SimulationContainer title="Prompt Engineering Lab" subtitle="Build structured prompts and see how each element affects output quality" badge="Simulation" accent="#2f5fe3">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <label className="lbl">Role</label>
            <input className="inp" placeholder="e.g., Expert data scientist" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <label className="lbl">Context</label>
            <input className="inp" placeholder="e.g., Teaching beginners" value={context} onChange={(e) => setContext(e.target.value)} />
          </div>
        </div>
        <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
          <label className="lbl">Task / Prompt</label>
          <textarea className="inp min-h-[60px]" placeholder="What do you want the AI to do?" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <label className="lbl">Output Format</label>
            <input className="inp" placeholder="e.g., Bullet points, 3 items" value={format} onChange={(e) => setFormat(e.target.value)} />
          </div>
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <label className="lbl">Constraints</label>
            <input className="inp" placeholder="e.g., Under 100 words" value={constraints} onChange={(e) => setConstraints(e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={runSimulation} disabled={running || !prompt.trim()} className="btn btn-primary btn-sm">
            {running ? <><span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Running...</> : <><Icon name="spark" size={12} /> Run Simulation</>}
          </button>
          <span className="font-mono text-[10px] text-mute">
            Structure score: {[role, context, format, constraints].filter(Boolean).length}/4
          </span>
        </div>

        {output && (
          <div className="rounded-lg border-1.5 border-line bg-ink p-4">
            <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-paper/90">{output}</pre>
          </div>
        )}

        <div className="rounded-md border-l-4 border-ai bg-ai-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>Educational Simulation:</strong> This demonstrates how prompt structure affects AI output quality. In production, these structured prompts would be sent to a real AI model. The five-part structure (Role + Context + Task + Format + Constraints) is the foundation of effective prompt engineering.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── AI Coding Tools Lab ────────────────────────────────────────────────────

type AICodingScenarioId = "complete" | "generate" | "debug" | "review" | "test" | "agent";

const aiCodingSteps = [
  { id: "goal", label: "Goal", help: "State the exact coding outcome." },
  { id: "context", label: "Context", help: "Share relevant files, framework, errors, and constraints." },
  { id: "prompt", label: "Prompt", help: "Ask for a focused change or explanation." },
  { id: "review", label: "Review", help: "Read the output before accepting it." },
  { id: "run", label: "Run", help: "Build, test, or reproduce the behavior." },
  { id: "document", label: "Document", help: "Explain the final change clearly." },
  { id: "privacy", label: "Privacy", help: "Remove secrets, private data, and confidential code." },
];

const aiCodingScenarios: {
  id: AICodingScenarioId;
  title: string;
  request: string;
  required: string[];
  output: string;
  risk: string;
}[] = [
  { id: "complete", title: "AI Code Completion", request: "Finish a function that filters active students and sorts newest first.", required: ["goal", "context", "review", "run"], output: "Suggested completion: filter by active, sort by joinedAt descending, return the new list without mutating the original array.", risk: "Do not accept long completions without reading the sorting logic and checking empty-list behavior." },
  { id: "generate", title: "AI Code Generation", request: "Generate a small TypeScript email validator with examples.", required: ["goal", "context", "prompt", "review", "run"], output: "Generated function includes empty, missing @, missing domain, and valid-address checks plus example test cases.", risk: "Generated validators can be too simple. Check real requirements before using them for production sign-up forms." },
  { id: "debug", title: "AI Debugging", request: "Fix a Save button that throws: Cannot read properties of undefined (reading 'id').", required: ["goal", "context", "prompt", "review", "run"], output: "Likely cause: the selected project is undefined before save. Add a guard, show an error state, and verify the reproduction steps.", risk: "Avoid applying several fixes at once. Test one hypothesis and confirm the result." },
  { id: "review", title: "AI Code Review", request: "Review a diff for bugs, security risks, accessibility issues, and missing tests.", required: ["goal", "context", "prompt", "review"], output: "Review report: one high-priority null-state bug, one missing keyboard label, and one missing regression test.", risk: "AI review is not final approval. A human must decide what matters for the product." },
  { id: "test", title: "AI Testing", request: "Create tests for password validation rules.", required: ["goal", "context", "prompt", "review", "run"], output: "Test plan covers empty, too short, missing number, missing uppercase, valid password, and boundary length cases.", risk: "Generated tests may mirror implementation instead of requirements. Strengthen them with edge cases." },
  { id: "agent", title: "Using AI Coding Agents", request: "Ask an agent to add saved filters to a project page without redesigning the app.", required: ["goal", "context", "prompt", "review", "run", "document", "privacy"], output: "Agent plan: inspect store patterns, add filter state, update UI controls, run build, summarize changed files.", risk: "Agents can edit many files. Review the diff, protect secrets, and run verification before shipping." },
];

export function AICodingToolsSim() {
  const [scenarioId, setScenarioId] = useState<AICodingScenarioId>("complete");
  const [selected, setSelected] = useState<string[]>(["goal", "context", "review"]);
  const [mode, setMode] = useState("Beginner");
  const [includeSecret, setIncludeSecret] = useState(false);
  const [ran, setRan] = useState(false);
  const [runningAI, setRunningAI] = useState(false);
  const [assistantOutput, setAssistantOutput] = useState("");
  const [assistantSource, setAssistantSource] = useState<"live" | "simulation">("simulation");
  const [provider, setProvider] = useState<"openai" | "deepseek">("deepseek");
  const [deepSeekPrompt, setDeepSeekPrompt] = useState("Explain how to use AI debugging safely in a student project.");
  const scenario = aiCodingScenarios.find((item) => item.id === scenarioId) ?? aiCodingScenarios[0];
  const missing = scenario.required.filter((step) => !selected.includes(step));
  const privacyRisk = includeSecret && !selected.includes("privacy");
  const score = Math.max(0, Math.round(((scenario.required.length - missing.length) / scenario.required.length) * 100) - (privacyRisk ? 25 : 0));

  const chooseScenario = (id: AICodingScenarioId) => {
    const next = aiCodingScenarios.find((item) => item.id === id) ?? aiCodingScenarios[0];
    setScenarioId(id);
    setSelected(next.required.slice(0, Math.min(3, next.required.length)));
    setIncludeSecret(false);
    setRan(false);
    setAssistantOutput("");
    setAssistantSource("simulation");
  };

  const runWorkflow = async () => {
    setRan(true);
    setRunningAI(true);
    setAssistantSource("simulation");
    const fallback = missing.length
      ? `Missing steps: ${missing.map((id) => aiCodingSteps.find((step) => step.id === id)?.label ?? id).join(", ")}`
      : scenario.output;
    try {
      const response = await fetch("/api/ai-coding-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: scenario.title,
          request: scenario.request,
          selectedSteps: selected.map((id) => aiCodingSteps.find((step) => step.id === id)?.label ?? id),
          missingSteps: missing.map((id) => aiCodingSteps.find((step) => step.id === id)?.label ?? id),
          mode,
          privacyRisk,
          provider,
        }),
      });
      if (!response.ok) throw new Error("Assistant route unavailable");
      const data = await response.json();
      setAssistantOutput(typeof data.output === "string" && data.output.trim() ? data.output : fallback);
      setAssistantSource(data.source === "live" ? "live" : "simulation");
    } catch {
      setAssistantOutput(fallback);
      setAssistantSource("simulation");
    } finally {
      setRunningAI(false);
    }
  };

  const askDeepSeek = async () => {
    setProvider("deepseek");
    setRan(true);
    setRunningAI(true);
    setAssistantSource("simulation");
    try {
      const response = await fetch("/api/ai-coding-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "deepseek",
          scenario: "DeepSeek chat inside Agbenu Bridge TechHub",
          request: deepSeekPrompt,
          selectedSteps: ["Goal", "Prompt", "Review", "Privacy"],
          missingSteps: [],
          mode,
          privacyRisk: false,
        }),
      });
      if (!response.ok) throw new Error("DeepSeek route unavailable");
      const data = await response.json();
      setAssistantOutput(typeof data.output === "string" && data.output.trim() ? data.output : "DeepSeek did not return a response.");
      setAssistantSource(data.source === "live" ? "live" : "simulation");
    } catch {
      setAssistantOutput("DeepSeek is not configured yet. Add DEEPSEEK_API_KEY in Vercel Environment Variables, then redeploy. The lab still works with the built-in workflow simulation.");
      setAssistantSource("simulation");
    } finally {
      setRunningAI(false);
    }
  };

  return (
    <SimulationContainer title="AI Coding Tools Lab" subtitle="Practice completion, generation, debugging, review, testing, documentation, agents, and responsible coding" badge="Virtual Lab" accent="#2f5fe3">
      <div className="space-y-4">
        <div className="rounded-lg border-1.5 border-ai bg-ai-soft/40 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ai">DeepSeek inside this software</div>
              <h4 className="mt-1 font-display text-base font-bold">Ask DeepSeek AI</h4>
              <p className="mt-1 text-sm text-mute">Students can ask DeepSeek from this TechHub interface. The official DeepSeek website is not embedded; the secure server route connects to DeepSeek behind the app.</p>
            </div>
            <a className="btn btn-ghost btn-sm" href="https://chat.deepseek.com/" target="_blank" rel="noreferrer">Open DeepSeek Chat <Icon name="arrowR" size={13} /></a>
          </div>
          <div className="mt-3 grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto]">
            <textarea className="inp min-h-20" value={deepSeekPrompt} onChange={(event) => setDeepSeekPrompt(event.target.value)} aria-label="Ask DeepSeek inside the software" />
            <button onClick={askDeepSeek} disabled={runningAI || !deepSeekPrompt.trim()} className="btn btn-primary self-start">
              {runningAI ? <><span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Asking...</> : <><Icon name="spark" size={14} /> Ask DeepSeek</>}
            </button>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {aiCodingScenarios.map((item) => (
            <button
              key={item.id}
              onClick={() => chooseScenario(item.id)}
              className={cn("rounded-lg border-1.5 px-3 py-3 text-left transition-all focus-ring", scenario.id === item.id ? "border-ai bg-ai-soft" : "border-line bg-paper/50 hover:border-ai/50")}
            >
              <span className="block text-sm font-semibold">{item.title}</span>
              <span className="mt-1 block text-[11px] leading-relaxed text-mute">{item.request}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <div className="rounded-lg border-1.5 border-line bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ai">Coding task</div>
                  <h4 className="mt-1 font-display text-base font-bold">{scenario.title}</h4>
                  <p className="mt-1 text-sm text-mute">{scenario.request}</p>
                </div>
                <span className={cn("rounded-md px-2 py-1 font-mono text-[10px] font-bold", score >= 90 ? "bg-se-soft text-se" : "bg-gold-soft text-[#8a5a06]")}>{score}% ready</span>
              </div>
            </div>

            <div className="rounded-lg border-1.5 border-line bg-paper/50 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-display text-sm font-bold">Workflow steps</h4>
                <div className="flex flex-wrap gap-2">
                  <select className="inp max-w-44" value={provider} onChange={(event) => setProvider(event.target.value as "openai" | "deepseek")} aria-label="AI provider">
                    <option value="deepseek">DeepSeek AI</option>
                    <option value="openai">OpenAI</option>
                  </select>
                  <select className="inp max-w-44" value={mode} onChange={(event) => setMode(event.target.value)} aria-label="Learner mode">
                    {["Beginner", "Student project", "Team workflow"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {aiCodingSteps.map((step) => {
                  const active = selected.includes(step.id);
                  const required = scenario.required.includes(step.id);
                  return (
                    <button key={step.id} onClick={() => setSelected((current) => toggleListValue(current, step.id))} className={cn("rounded-md border-1.5 px-3 py-3 text-left transition-all focus-ring", active ? "border-ai bg-white" : "border-line bg-card/60 hover:border-ai/50")}>
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">{step.label}</span>
                        <span className="font-mono text-[10px]">{active ? "Selected" : required ? "Needed" : "Optional"}</span>
                      </span>
                      <span className="mt-1 block text-[11px] leading-relaxed text-mute">{step.help}</span>
                    </button>
                  );
                })}
              </div>
              <label className="mt-3 flex items-center gap-2 rounded-md border-1.5 border-line bg-card px-3 py-2 text-sm">
                <input type="checkbox" checked={includeSecret} onChange={(event) => setIncludeSecret(event.target.checked)} />
                Include a fake secret in prompt context
              </label>
              <p className="mt-2 text-[11px] leading-relaxed text-mute">Real API keys must stay in server environment variables such as DEEPSEEK_API_KEY or OPENAI_API_KEY. Do not put secret keys in React code, prompts, or GitHub.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={runWorkflow} disabled={runningAI} className="btn btn-primary">
                {runningAI ? <><span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Running...</> : <><Icon name="spark" size={14} /> Run AI workflow</>}
              </button>
              <button onClick={() => { setSelected(["goal", "context", "review"]); setRan(false); setIncludeSecret(false); setAssistantOutput(""); setAssistantSource("simulation"); }} className="btn btn-ghost btn-sm"><Icon name="refresh" size={13} /> Reset</button>
            </div>
          </div>

          <div className="rounded-lg border-1.5 border-line bg-ink p-4 text-paper">
            <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50">Assistant output</div>
            {ran ? (
              <div className="mt-3 space-y-3">
                <div className={cn("rounded-md border px-3 py-2 text-sm", missing.length || privacyRisk ? "border-gold/60 bg-gold/15" : "border-se/60 bg-se/15")}>
                  {missing.length || privacyRisk ? "Workflow needs revision" : assistantSource === "live" ? `Live ${provider === "deepseek" ? "DeepSeek" : "OpenAI"} response` : "Workflow ready"}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-paper/85">{assistantOutput}</p>
                {privacyRisk && <p className="rounded-md bg-warn/20 px-3 py-2 text-sm text-paper">Privacy warning: remove API keys, passwords, tokens, and real user data before sending context to an AI tool.</p>}
                <p className="text-[12px] leading-relaxed text-paper/60"><strong>Responsible use:</strong> {scenario.risk}</p>
                <p className="text-[12px] leading-relaxed text-paper/60"><strong>Mode:</strong> {mode}. Keep the final code explainable at this level.</p>
              </div>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-paper/65">Choose the workflow pieces, then run the simulation to see whether your AI coding process is safe and complete.</p>
            )}
          </div>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── AI Builder Lab ─────────────────────────────────────────────────────────

type AIBuilderProjectId = "chatbot" | "recommendation" | "image" | "sentiment" | "study" | "prompt" | "career";
type AIBuilderResult = { ok: boolean; score: number; title: string; body: string; explanation: string; warning?: string };
type AIBuilderProgress = {
  xp: number;
  currentProjectId: AIBuilderProjectId;
  completed: Record<string, { score: number; attempts: number; xp: number }>;
  inventorComplete?: boolean;
};

const AI_BUILDER_PROGRESS_KEY = "techfoundry-ai-builder-progress-v1";

const aiBuilderComponentInfo: Record<string, { label: string; icon: string; help: string }> = {
  input: { label: "User Input", icon: "⌨️", help: "What the learner or user gives the AI." },
  model: { label: "AI Model", icon: "🧠", help: "The simulated model or reasoning step." },
  knowledge: { label: "Knowledge", icon: "📚", help: "Trusted information the system can use." },
  instructions: { label: "Instructions", icon: "📝", help: "Rules that guide the AI response." },
  response: { label: "Response", icon: "💬", help: "The final answer shown to the user." },
  interests: { label: "Student Interests", icon: "🎯", help: "Signals used for personalization." },
  rules: { label: "Match Rules", icon: "📏", help: "Logic that compares data to options." },
  courses: { label: "Compare Courses", icon: "🏫", help: "Course choices to rank." },
  score: { label: "Calculate Match", icon: "📊", help: "A confidence or fit score." },
  recommendation: { label: "Recommendation", icon: "⭐", help: "The suggested result." },
  dataset: { label: "Dataset", icon: "🗂️", help: "Training examples for the AI." },
  labels: { label: "Labels", icon: "🏷️", help: "Correct answers attached to examples." },
  train: { label: "Training", icon: "⚙️", help: "The simulated learning step." },
  classifier: { label: "Classifier", icon: "🔍", help: "The AI that predicts a category." },
  prediction: { label: "Prediction", icon: "🔮", help: "The AI's classification result." },
  text: { label: "Text Input", icon: "✍️", help: "The sentence or message to analyze." },
  sentiment: { label: "Sentiment Model", icon: "😊", help: "Classifies emotional tone." },
  context: { label: "Context", icon: "🧩", help: "Subject, level, audience, and goal." },
  features: { label: "Features", icon: "🧰", help: "Assistant abilities the learner enables." },
  quiz: { label: "Quiz Generator", icon: "❓", help: "Creates a practice question." },
  prompt: { label: "Prompt", icon: "💡", help: "The structured AI instruction." },
  format: { label: "Output Format", icon: "📋", help: "The requested response shape." },
  constraints: { label: "Constraints", icon: "🚧", help: "Limits and requirements." },
  skills: { label: "Skills", icon: "🛠️", help: "What the learner can already do." },
  careers: { label: "Career Matching", icon: "🧭", help: "Maps interests and skills to paths." },
  roadmap: { label: "Skill Roadmap", icon: "🗺️", help: "Suggested next learning steps." },
};

const aiBuilderProjects: {
  id: AIBuilderProjectId;
  number: number;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  mission: string;
  reward: number;
  required: string[];
  note: string;
}[] = [
  { id: "chatbot", number: 1, title: "Build an AI Chatbot", difficulty: "Beginner", mission: "Build a simple chatbot that can answer questions using predefined knowledge and instructions.", reward: 100, required: ["input", "model", "knowledge", "instructions", "response"], note: "This chatbot uses predefined knowledge. Real chatbots need careful data, testing, and safety rules." },
  { id: "recommendation", number: 2, title: "Build a Simple Recommendation System", difficulty: "Beginner", mission: "Build an AI that recommends a technology course based on a student's interests.", reward: 100, required: ["interests", "rules", "courses", "score", "recommendation"], note: "Recommendation systems personalize outputs, but they can miss context and should explain why an item was suggested." },
  { id: "image", number: 3, title: "Build an Image Classifier", difficulty: "Intermediate", mission: "Train an AI to recognize different categories.", reward: 150, required: ["dataset", "labels", "train", "classifier", "prediction"], note: "Image classifiers depend on balanced, representative data. Bad data creates confident mistakes." },
  { id: "sentiment", number: 4, title: "Build a Sentiment Detector", difficulty: "Beginner", mission: "Build an AI that identifies the emotion/sentiment of text.", reward: 100, required: ["text", "dataset", "labels", "sentiment", "prediction"], note: "Human language can be ambiguous. Sentiment tools should show uncertainty, especially with sarcasm or mixed wording." },
  { id: "study", number: 5, title: "Build an AI Study Assistant", difficulty: "Intermediate", mission: "Build an AI assistant that helps students study.", reward: 150, required: ["input", "context", "features", "model", "quiz", "response"], note: "Educational AI should support learning, not replace thinking. Learners still need to verify answers." },
  { id: "prompt", number: 6, title: "Build an AI Prompt Generator", difficulty: "Intermediate", mission: "Build a tool that converts a simple request into a better structured AI prompt.", reward: 150, required: ["input", "prompt", "context", "format", "constraints", "response"], note: "A strong prompt improves output quality, but it does not guarantee truth. Always verify important outputs." },
  { id: "career", number: 7, title: "Build an AI Career Assistant", difficulty: "Advanced", mission: "Build an AI assistant that helps students explore technology career paths.", reward: 200, required: ["input", "interests", "skills", "careers", "roadmap", "response"], note: "Career recommendations are educational suggestions, not absolute decisions. Goals, opportunity, and experience matter too." },
];

const defaultAIBuilderProgress: AIBuilderProgress = { xp: 0, currentProjectId: "chatbot", completed: {} };
const loadAIBuilderProgress = (): AIBuilderProgress => {
  try {
    const raw = localStorage.getItem(AI_BUILDER_PROGRESS_KEY);
    if (!raw) return defaultAIBuilderProgress;
    return { ...defaultAIBuilderProgress, ...JSON.parse(raw) };
  } catch {
    return defaultAIBuilderProgress;
  }
};

const projectIndex = (id: AIBuilderProjectId) => aiBuilderProjects.findIndex((project) => project.id === id);

export function AIBuilderLabSim() {
  const [progress, setProgress] = useState<AIBuilderProgress>(loadAIBuilderProgress);
  const [projectId, setProjectId] = useState<AIBuilderProjectId>(progress.currentProjectId);
  const [selected, setSelected] = useState<string[]>(["input", "model", "response"]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<AIBuilderResult | null>(null);
  const [chatInput, setChatInput] = useState("What courses are available at TechHub?");
  const [interests, setInterests] = useState<string[]>(["Coding", "Problem Solving"]);
  const [dogExamples, setDogExamples] = useState(4);
  const [catExamples, setCatExamples] = useState(4);
  const [testAnimal, setTestAnimal] = useState<"dog" | "cat">("dog");
  const [sentimentExamples, setSentimentExamples] = useState({ positive: 1, neutral: 1, negative: 1 });
  const [sentimentText, setSentimentText] = useState("The new AI laboratory is amazing!");
  const [studyFeatures, setStudyFeatures] = useState<string[]>(["Explain topics", "Generate quiz questions"]);
  const [studySubject, setStudySubject] = useState("Computer Science");
  const [studyLevel, setStudyLevel] = useState("Beginner");
  const [studyStyle, setStudyStyle] = useState("Simple explanation");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [promptRequest, setPromptRequest] = useState("I want AI to teach me Python.");
  const [promptParts, setPromptParts] = useState(["Role", "Task", "Context", "Audience"]);
  const [careerInterests, setCareerInterests] = useState<string[]>(["Coding", "Problem Solving"]);
  const [careerSkills, setCareerSkills] = useState<string[]>(["HTML", "CSS", "JavaScript"]);
  const [inventor, setInventor] = useState({ name: "", problem: "", input: "", processing: "", output: "" });

  const project = aiBuilderProjects.find((item) => item.id === projectId) ?? aiBuilderProjects[0];
  const completedCount = Object.keys(progress.completed).length;
  const isUnlocked = (id: AIBuilderProjectId) => projectIndex(id) <= completedCount;
  const missing = project.required.filter((id) => !selected.includes(id));
  const readiness = Math.round(((project.required.length - missing.length) / project.required.length) * 100);
  const activeCompletion = progress.completed[project.id];

  useEffect(() => {
    localStorage.setItem(AI_BUILDER_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const chooseProject = (id: AIBuilderProjectId) => {
    if (!isUnlocked(id)) return;
    const next = aiBuilderProjects.find((item) => item.id === id) ?? aiBuilderProjects[0];
    setProjectId(id);
    setSelected(next.required.slice(0, Math.min(3, next.required.length)));
    setResult(null);
    setProgress((current) => ({ ...current, currentProjectId: id }));
  };

  const toggleSelected = (id: string) => {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const completeProject = (simulation: AIBuilderResult) => {
    const prior = progress.completed[project.id];
    const earned = simulation.ok && !prior ? project.reward : 0;
    const nextCompleted = {
      ...progress.completed,
      [project.id]: {
        score: Math.max(prior?.score ?? 0, simulation.score),
        attempts: (prior?.attempts ?? 0) + 1,
        xp: prior?.xp ?? earned,
      },
    };
    const nextIndex = Math.min(projectIndex(project.id) + 1, aiBuilderProjects.length - 1);
    setProgress({
      ...progress,
      xp: progress.xp + earned,
      completed: nextCompleted,
      currentProjectId: simulation.ok ? aiBuilderProjects[nextIndex].id : project.id,
    });
  };

  const runSimulation = () => {
    setRunning(true);
    window.setTimeout(() => {
      const pipelineReady = missing.length === 0;
      let simulation: AIBuilderResult;
      if (!pipelineReady) {
        simulation = { ok: false, score: readiness, title: "Pipeline incomplete", body: `Missing: ${missing.map((id) => aiBuilderComponentInfo[id]?.label ?? id).join(", ")}`, explanation: "Add all required components before testing this AI system." };
      } else if (project.id === "chatbot") {
        const knowsCourses = /course|available|techhub/i.test(chatInput);
        simulation = { ok: knowsCourses, score: knowsCourses ? 96 : 72, title: knowsCourses ? "Chatbot response generated" : "Try a TechHub course question", body: knowsCourses ? "Agbenu Bridge TechHub offers practical technology education in Artificial Intelligence, Robotics & IoT, Software Engineering & Programming, and Digital Innovation & Entrepreneurship." : "I can answer TechHub course questions best. Try asking what courses are available.", explanation: "The chatbot matched keywords in the user input to predefined TechHub knowledge, then followed its response instructions." };
      } else if (project.id === "recommendation") {
        const scores = [
          { course: "Software Engineering", score: 45 + (interests.includes("Coding") ? 22 : 0) + (interests.includes("Websites") ? 14 : 0) + (interests.includes("Mobile Apps") ? 10 : 0) },
          { course: "Robotics & IoT", score: 42 + (interests.includes("Hardware") ? 24 : 0) + (interests.includes("Robotics") ? 18 : 0) },
          { course: "Artificial Intelligence", score: 46 + (interests.includes("AI") ? 25 : 0) + (interests.includes("Problem Solving") ? 12 : 0) },
          { course: "Digital Innovation", score: 40 + (interests.includes("Creativity") ? 20 : 0) + (interests.includes("Problem Solving") ? 8 : 0) },
        ].sort((a, b) => b.score - a.score);
        simulation = { ok: interests.length > 0, score: Math.min(99, scores[0].score), title: `Recommended Course: ${scores[0].course}`, body: `Match: ${Math.min(99, scores[0].score)}%`, explanation: `Your selected interests (${interests.join(", ")}) were compared with course tags and ranked by match strength.` };
      } else if (project.id === "image") {
        const total = dogExamples + catExamples;
        const imbalance = Math.max(dogExamples, catExamples) / Math.max(1, Math.min(dogExamples, catExamples));
        const confidence = testAnimal === "dog" ? Math.round((dogExamples / Math.max(1, total)) * 100) : Math.round((catExamples / Math.max(1, total)) * 100);
        simulation = { ok: imbalance <= 2 && dogExamples >= 2 && catExamples >= 2, score: imbalance <= 2 ? 92 : 58, title: `AI Prediction: ${testAnimal === "dog" ? "Dog" : "Cat"} ${Math.max(55, confidence)}%`, body: `${testAnimal === "dog" ? "Cat" : "Dog"} ${Math.max(4, 100 - confidence)}%`, warning: imbalance > 2 ? "UNBALANCED DATA: Your model has significantly more training examples for one category. Try adding more examples." : undefined, explanation: "The classifier compares the test image against labeled examples. Balanced labels make the simulated prediction more reliable." };
      } else if (project.id === "sentiment") {
        const lower = sentimentText.toLowerCase();
        const positive = /love|amazing|great|good|excellent|happy/.test(lower) || /isn't bad/.test(lower);
        const negative = /hate|bad|awful|terrible|angry/.test(lower) && !/isn't bad/.test(lower);
        const label = positive ? "😊 POSITIVE" : negative ? "😡 NEGATIVE" : "😐 NEUTRAL";
        const trained = sentimentExamples.positive && sentimentExamples.neutral && sentimentExamples.negative;
        simulation = { ok: !!trained, score: trained ? 91 : 62, title: label, body: `Confidence: ${trained ? 91 : 62}%`, warning: /isn't bad|not bad|could be worse/i.test(sentimentText) ? "Ambiguous language detected. Negation can make sentiment harder for AI." : undefined, explanation: "The detector used labeled examples and sentiment keywords to classify the emotional tone of the text." };
      } else if (project.id === "study") {
        const quizCorrect = quizAnswer === "B";
        simulation = { ok: studyFeatures.length >= 2 && !!quizAnswer, score: quizCorrect ? 94 : 76, title: `${studySubject} Study Assistant`, body: `A computer is an electronic device that receives data, processes it, stores information, and produces useful results.\n\nQuiz feedback: ${quizCorrect ? "Correct: B is the best answer." : "Review the concept: the best answer is B, an electronic device."}`, explanation: `The assistant used subject (${studySubject}), level (${studyLevel}), response style (${studyStyle}), and selected features to personalize the output.` };
      } else if (project.id === "prompt") {
        const quality = Math.round((promptParts.length / 6) * 100);
        simulation = { ok: quality >= 80, score: quality, title: `Prompt Quality: ${quality}%`, body: `You are a beginner-friendly Python teacher.\n\nTeach me Python programming.\n\nAssume I have no previous programming experience.\n\nExplain each concept simply and provide small practical examples.`, explanation: `Quality is based on selected structure parts: ${promptParts.join(", ")}. Strong prompts include role, task, context, audience, format, and constraints.` };
      } else {
        const hasData = careerInterests.length > 0 && careerSkills.length > 0;
        const paths = careerInterests.includes("Hardware") ? ["Robotics Engineer", "IoT Developer", "Automation Engineer"] : careerInterests.includes("Business") ? ["Technology Entrepreneur", "Product Developer", "AI Product Builder"] : ["Web Development", "Software Engineering", "AI Development"];
        simulation = { ok: hasData, score: hasData ? 93 : 50, title: "AI Career Assistant", body: `Possible career paths:\n${paths.map((path) => `→ ${path}`).join("\n")}\n\nSuggested next skills:\n→ JavaScript\n→ Git\n→ React\n→ Python`, explanation: "The assistant compared selected interests and skills against career patterns. This is an educational recommendation, not an absolute career decision." };
      }
      setResult(simulation);
      if (simulation.ok) completeProject(simulation);
      setRunning(false);
    }, 900);
  };

  const resetLab = () => {
    setProgress({ ...defaultAIBuilderProgress, completed: {} });
    setProjectId("chatbot");
    setSelected(["input", "model", "response"]);
    setResult(null);
    localStorage.removeItem(AI_BUILDER_PROGRESS_KEY);
  };

  const nextProject = () => {
    const next = aiBuilderProjects[Math.min(projectIndex(project.id) + 1, aiBuilderProjects.length - 1)];
    chooseProject(next.id);
  };

  const runInventorChallenge = () => {
    const complete = Boolean(inventor.name.trim() && inventor.problem.trim() && inventor.input.trim() && inventor.processing.trim() && inventor.output.trim());
    if (!complete) {
      setResult({ ok: false, score: 40, title: "Inventor pipeline incomplete", body: "Add an AI name, problem, input, processing, and output.", explanation: "A complete AI invention needs a valid input, processing/model step, and output." });
      return;
    }
    const earned = progress.inventorComplete ? 0 : 500;
    setProgress({ ...progress, xp: progress.xp + earned, inventorComplete: true });
    setResult({ ok: true, score: 100, title: "🎉 AI Inventor Complete", body: `AI Concepts ✓\nData ✓\nPrompting ✓\nPrediction ✓\nTesting ✓\nResponsible AI ✓\n\n+${earned} XP\n🏆 AI Inventor Badge`, explanation: `${inventor.name} solves "${inventor.problem}" with a complete input → processing → output pipeline.` });
  };

  const allDone = completedCount >= aiBuilderProjects.length;

  return (
    <SimulationContainer title="AI Builder Lab" subtitle="Assemble, test, fix, and complete seven simulated AI systems" badge="Game / Simulation" accent="#2f5fe3">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border-1.5 border-line bg-paper/50 p-3">
          <div>
            <div className="font-display text-base font-bold">Projects completed: {completedCount} / 7</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-mute">XP: {progress.xp}{progress.inventorComplete ? " · AI Inventor Badge earned" : ""}</div>
          </div>
          <button onClick={resetLab} className="btn btn-ghost btn-sm"><Icon name="refresh" size={13} /> Reset lab</button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[230px_minmax(0,1fr)]">
          <div className="space-y-2">
            {aiBuilderProjects.map((item, index) => {
              const locked = !isUnlocked(item.id);
              const done = progress.completed[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => chooseProject(item.id)}
                  disabled={locked}
                  className={cn("w-full rounded-lg border-1.5 px-3 py-3 text-left transition-all focus-ring", project.id === item.id ? "border-ai bg-ai-soft" : "border-line bg-paper/50 hover:border-ai/50", locked && "cursor-not-allowed opacity-55")}
                  aria-label={`${item.title}${locked ? " locked" : done ? " completed" : " unlocked"}`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">Project {index + 1}</span>
                    <span className="font-mono text-[10px]">{done ? "✅" : locked ? "🔒" : "🔓"}</span>
                  </span>
                  <span className="mt-1 block text-xs">{item.title}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-mute">{item.difficulty} · +{item.reward} XP</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border-1.5 border-line bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-ai">Mission</div>
                  <h3 className="mt-1 font-display text-lg font-bold">{project.title}</h3>
                  <p className="mt-1 text-sm text-mute">{project.mission}</p>
                </div>
                <span className={cn("rounded-md px-2 py-1 font-mono text-[10px] font-bold", activeCompletion ? "bg-se-soft text-se" : "bg-gold-soft text-[#8a5a06]")}>{activeCompletion ? `Best ${activeCompletion.score}%` : `${readiness}% ready`}</span>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
              <div className="rounded-lg border-1.5 border-line bg-paper/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-display text-sm font-bold">Components</h4>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{missing.length ? `${missing.length} missing` : "Pipeline complete"}</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {project.required.map((id) => {
                    const info = aiBuilderComponentInfo[id];
                    const active = selected.includes(id);
                    return (
                      <button key={id} onClick={() => toggleSelected(id)} className={cn("rounded-md border-1.5 px-3 py-3 text-left transition-all focus-ring", active ? "border-ai bg-white" : "border-line bg-card/60 hover:border-ai/50")}>
                        <span className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">{info.icon} {info.label}</span><span>{active ? "✓" : "+"}</span></span>
                        <span className="mt-1 block text-[11px] leading-relaxed text-mute">{info.help}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border-1.5 border-line bg-ink p-4 text-paper">
                <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50">Build area</div>
                <div className="mt-3 space-y-2">
                  {project.required.map((id, index) => (
                    <div key={id} className={cn("flex items-center gap-2 rounded-md border px-3 py-2 text-sm", selected.includes(id) ? "border-ai/70 bg-ai/20" : "border-paper/10 bg-paper/5 text-paper/45")}>
                      <span className="font-mono text-[10px] text-paper/45">{String(index + 1).padStart(2, "0")}</span>
                      <span>{aiBuilderComponentInfo[id].icon}</span>
                      <span>{aiBuilderComponentInfo[id].label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AITestPanel
              projectId={project.id}
              chatInput={chatInput}
              setChatInput={setChatInput}
              interests={interests}
              setInterests={setInterests}
              dogExamples={dogExamples}
              setDogExamples={setDogExamples}
              catExamples={catExamples}
              setCatExamples={setCatExamples}
              testAnimal={testAnimal}
              setTestAnimal={setTestAnimal}
              sentimentExamples={sentimentExamples}
              setSentimentExamples={setSentimentExamples}
              sentimentText={sentimentText}
              setSentimentText={setSentimentText}
              studyFeatures={studyFeatures}
              setStudyFeatures={setStudyFeatures}
              studySubject={studySubject}
              setStudySubject={setStudySubject}
              studyLevel={studyLevel}
              setStudyLevel={setStudyLevel}
              studyStyle={studyStyle}
              setStudyStyle={setStudyStyle}
              quizAnswer={quizAnswer}
              setQuizAnswer={setQuizAnswer}
              promptRequest={promptRequest}
              setPromptRequest={setPromptRequest}
              promptParts={promptParts}
              setPromptParts={setPromptParts}
              careerInterests={careerInterests}
              setCareerInterests={setCareerInterests}
              careerSkills={careerSkills}
              setCareerSkills={setCareerSkills}
            />

            <div className="flex flex-wrap items-center gap-2">
              <button onClick={runSimulation} disabled={running} className="btn btn-primary">
                {running ? <><span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Testing...</> : <><Icon name="spark" size={14} /> Test my AI</>}
              </button>
              {activeCompletion && projectIndex(project.id) < aiBuilderProjects.length - 1 && <button onClick={nextProject} className="btn btn-dark btn-sm">Next project <Icon name="arrowR" size={13} /></button>}
            </div>

            {result && (
              <div className={cn("rounded-lg border-1.5 p-4", result.ok ? "border-se bg-se-soft/70" : "border-gold bg-gold-soft/70")}>
                <div className="font-display text-base font-bold">{result.title}</div>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-sm leading-relaxed">{result.body}</pre>
                {result.warning && <p className="mt-2 rounded-md bg-card/70 px-3 py-2 text-sm font-semibold text-warn">⚠️ {result.warning}</p>}
                <p className="mt-2 text-[13px] leading-relaxed text-mute">{result.explanation}</p>
              </div>
            )}

            <div className="rounded-md border-l-4 border-ai bg-ai-soft/40 px-4 py-3">
              <p className="text-[13px] leading-relaxed"><strong>AI note:</strong> {project.note}</p>
            </div>

            {allDone && (
              <div className="rounded-lg border-1.5 border-gold bg-gold-soft/50 p-4">
                <h4 className="font-display text-base font-bold">🏆 AI Inventor Challenge</h4>
                <p className="mt-1 text-sm text-mute">Design an AI system that solves a problem for a student.</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <input className="inp" placeholder="AI name" value={inventor.name} onChange={(e) => setInventor({ ...inventor, name: e.target.value })} />
                  <input className="inp" placeholder="Problem" value={inventor.problem} onChange={(e) => setInventor({ ...inventor, problem: e.target.value })} />
                  <input className="inp" placeholder="Input" value={inventor.input} onChange={(e) => setInventor({ ...inventor, input: e.target.value })} />
                  <input className="inp" placeholder="AI processing" value={inventor.processing} onChange={(e) => setInventor({ ...inventor, processing: e.target.value })} />
                  <input className="inp sm:col-span-2" placeholder="Output" value={inventor.output} onChange={(e) => setInventor({ ...inventor, output: e.target.value })} />
                </div>
                <button onClick={runInventorChallenge} className="btn btn-gold mt-3"><Icon name="award" size={14} /> Complete Inventor Challenge</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SimulationContainer>
  );
}

function toggleListValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function AITestPanel(props: {
  projectId: AIBuilderProjectId;
  chatInput: string; setChatInput: (value: string) => void;
  interests: string[]; setInterests: (value: string[]) => void;
  dogExamples: number; setDogExamples: (value: number) => void;
  catExamples: number; setCatExamples: (value: number) => void;
  testAnimal: "dog" | "cat"; setTestAnimal: (value: "dog" | "cat") => void;
  sentimentExamples: { positive: number; neutral: number; negative: number }; setSentimentExamples: (value: { positive: number; neutral: number; negative: number }) => void;
  sentimentText: string; setSentimentText: (value: string) => void;
  studyFeatures: string[]; setStudyFeatures: (value: string[]) => void;
  studySubject: string; setStudySubject: (value: string) => void;
  studyLevel: string; setStudyLevel: (value: string) => void;
  studyStyle: string; setStudyStyle: (value: string) => void;
  quizAnswer: string; setQuizAnswer: (value: string) => void;
  promptRequest: string; setPromptRequest: (value: string) => void;
  promptParts: string[]; setPromptParts: (value: string[]) => void;
  careerInterests: string[]; setCareerInterests: (value: string[]) => void;
  careerSkills: string[]; setCareerSkills: (value: string[]) => void;
}) {
  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button type="button" onClick={onClick} className={cn("rounded-md border-1.5 px-2.5 py-1.5 text-xs font-semibold focus-ring", active ? "border-ai bg-ai-soft text-ai" : "border-line bg-card text-mute")}>{label}</button>
  );
  return (
    <div className="rounded-lg border-1.5 border-line bg-card p-4">
      <h4 className="font-display text-sm font-bold">Test interface</h4>
      {props.projectId === "chatbot" && <textarea className="inp mt-3 min-h-20" value={props.chatInput} onChange={(e) => props.setChatInput(e.target.value)} aria-label="Chatbot test question" />}
      {props.projectId === "recommendation" && <div className="mt-3 flex flex-wrap gap-2">{["Coding", "Problem Solving", "Hardware", "Creativity", "AI", "Websites", "Mobile Apps", "Robotics"].map((item) => pill(item, props.interests.includes(item), () => props.setInterests(toggleListValue(props.interests, item))))}</div>}
      {props.projectId === "image" && <div className="mt-3 grid gap-3 sm:grid-cols-3"><label className="text-sm">DOG 🐶 examples<input className="inp mt-1" type="number" min={0} value={props.dogExamples} onChange={(e) => props.setDogExamples(Number(e.target.value))} /></label><label className="text-sm">CAT 🐱 examples<input className="inp mt-1" type="number" min={0} value={props.catExamples} onChange={(e) => props.setCatExamples(Number(e.target.value))} /></label><label className="text-sm">New image<select className="inp mt-1" value={props.testAnimal} onChange={(e) => props.setTestAnimal(e.target.value as "dog" | "cat")}><option value="dog">🐶 Dog</option><option value="cat">🐱 Cat</option></select></label></div>}
      {props.projectId === "sentiment" && <div className="mt-3 space-y-3"><textarea className="inp min-h-20" value={props.sentimentText} onChange={(e) => props.setSentimentText(e.target.value)} aria-label="Sentiment test text" /><div className="grid gap-2 sm:grid-cols-3">{(["positive", "neutral", "negative"] as const).map((key) => <label key={key} className="text-sm capitalize">{key} examples<input className="inp mt-1" type="number" min={0} value={props.sentimentExamples[key]} onChange={(e) => props.setSentimentExamples({ ...props.sentimentExamples, [key]: Number(e.target.value) })} /></label>)}</div></div>}
      {props.projectId === "study" && <div className="mt-3 space-y-3"><div className="flex flex-wrap gap-2">{["Explain topics", "Generate quiz questions", "Create summaries", "Give examples", "Create revision notes"].map((item) => pill(item, props.studyFeatures.includes(item), () => props.setStudyFeatures(toggleListValue(props.studyFeatures, item))))}</div><div className="grid gap-2 sm:grid-cols-3"><select className="inp" value={props.studySubject} onChange={(e) => props.setStudySubject(e.target.value)}>{["Computer Science", "Mathematics", "Physics", "English", "Biology"].map((item) => <option key={item}>{item}</option>)}</select><select className="inp" value={props.studyLevel} onChange={(e) => props.setStudyLevel(e.target.value)}>{["Beginner", "Intermediate", "Advanced"].map((item) => <option key={item}>{item}</option>)}</select><select className="inp" value={props.studyStyle} onChange={(e) => props.setStudyStyle(e.target.value)}>{["Simple explanation", "Detailed explanation", "Examples", "Step-by-step"].map((item) => <option key={item}>{item}</option>)}</select></div><div className="rounded-md border-1.5 border-line bg-paper/50 p-3"><div className="text-sm font-semibold">Quiz: What is a computer?</div><div className="mt-1 text-xs text-mute">A. A book · B. An electronic device · C. A chair · D. A fruit</div><div className="mt-3 flex flex-wrap gap-2">{["A", "B", "C", "D"].map((item) => pill(`Answer ${item}`, props.quizAnswer === item, () => props.setQuizAnswer(item)))}</div></div></div>}
      {props.projectId === "prompt" && <div className="mt-3 space-y-3"><textarea className="inp min-h-20" value={props.promptRequest} onChange={(e) => props.setPromptRequest(e.target.value)} aria-label="Prompt generator request" /><div className="flex flex-wrap gap-2">{["Role", "Task", "Context", "Audience", "Format", "Constraints"].map((item) => pill(item, props.promptParts.includes(item), () => props.setPromptParts(toggleListValue(props.promptParts, item))))}</div></div>}
      {props.projectId === "career" && <div className="mt-3 space-y-3"><div><div className="lbl">Interests</div><div className="flex flex-wrap gap-2">{["Coding", "Problem Solving", "Hardware", "Creativity", "Business", "Design"].map((item) => pill(item, props.careerInterests.includes(item), () => props.setCareerInterests(toggleListValue(props.careerInterests, item))))}</div></div><div><div className="lbl">Skills</div><div className="flex flex-wrap gap-2">{["HTML", "CSS", "JavaScript", "Python", "Programming", "Electronics", "Communication"].map((item) => pill(item, props.careerSkills.includes(item), () => props.setCareerSkills(toggleListValue(props.careerSkills, item))))}</div></div></div>}
    </div>
  );
}

// ─── Graphic Design Studio ──────────────────────────────────────────────────

type GDElement = { id: string; kind: "text" | "rect" | "circle" | "image"; x: number; y: number; w: number; h: number; fill: string; text?: string; fontSize?: number; rotate?: number };
type GDProjectBrief = { id: string; title: string; level: string; xp: number; req: string[]; brief: string; format: string; skills: string[] };
type GDWorkflowStatus = "started" | "canva-opened" | "design-in-progress" | "ready-for-submission" | "submitted" | "reviewed";
type GDWorkflowState = {
  status: GDWorkflowStatus;
  canvaOpened: boolean;
  checkedRequirements: Record<string, boolean>;
  uploadedName?: string;
  uploadedType?: string;
  uploadedPreview?: string;
  submittedAt?: number;
  reviewedAt?: number;
  feedback?: string;
  xpAwarded?: number;
};
type GDCanvaPortfolioItem = { projectId: string; title: string; at: number; uploadName?: string; preview?: string; xp: number };
const GD_KEY = "techhub-graphic-design-studio-v1";
const GD_WORKFLOW_KEY = `${GD_KEY}-canva-workflow`;
const GD_CANVA_PORTFOLIO_KEY = `${GD_KEY}-canva-portfolio`;
const DESIGN_TOOL_LINKS = {
  canva: "https://www.canva.com/",
};
const GD_REFERENCE_IMAGES = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfd1WIXMOaiAA_HMNXkJty64vkOuCPzup8e8Au4sP7Q&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZeS5AvLgR9LroUHUTY2RTJpjxiKBXgiNhen08Ppzrkw&s=10",
];
const gdProjectBriefs: GDProjectBrief[] = [
  { id: "first", title: "My First Graphic", level: "Beginner", xp: 50, format: "Square post", req: ["Title", "Message", "Image", "Background"], skills: ["Basic layout", "Visual hierarchy"], brief: "Create a motivational graphic with a title, short message, image area, background, and readable type." },
  { id: "principles", title: "Redesign the Bad Poster", level: "Beginner", xp: 60, format: "Poster", req: ["Clear heading", "Alignment", "Contrast", "Spacing"], skills: ["Contrast", "Alignment", "Balance"], brief: "Improve a crowded poster by using contrast, alignment, spacing, and a cleaner reading order." },
  { id: "palette", title: "Brand Color Palette", level: "Beginner", xp: 70, format: "Brand board", req: ["Primary color", "Secondary color", "Accent color", "Usage note"], skills: ["Color theory", "Brand consistency"], brief: "Create a color palette for a youth technology brand and explain where each color should be used." },
  { id: "type", title: "Typography Poster", level: "Beginner", xp: 70, format: "Poster", req: ["Headline", "Subheading", "Body text", "Two font styles"], skills: ["Typography", "Hierarchy"], brief: "Design a poster that shows strong type hierarchy with a headline, subheading, body text, and readable font choices." },
  { id: "layout", title: "Technology Event Poster", level: "Intermediate", xp: 90, format: "Event poster", req: ["Event title", "Date", "Time", "Location", "CTA"], skills: ["Layout", "Information design"], brief: "Design a technology event poster that makes the most important information easy to scan." },
  { id: "logo", title: "Technology Logo", level: "Intermediate", xp: 100, format: "Logo sheet", req: ["Logo mark", "Wordmark", "One-color version", "Short brand meaning"], skills: ["Logo design", "Brand symbols"], brief: "Create a simple technology logo with a mark, wordmark, and a short note explaining the brand idea." },
  { id: "flyer", title: "AI Bootcamp Flyer", level: "Intermediate", xp: 100, format: "Flyer", req: ["Event title", "Date", "Time", "Location", "CTA", "Logo"], skills: ["Flyer design", "Call to action"], brief: "Design a flyer for Agbenu Bridge TechHub's AI Bootcamp with clear event details and a strong call to action." },
  { id: "social", title: "Social Media Campaign", level: "Intermediate", xp: 120, format: "Three posts", req: ["Post 1", "Post 2", "Post 3", "Consistent style"], skills: ["Campaign design", "Content systems"], brief: "Create three social graphics for one campaign, keeping the colors, type, and message consistent." },
  { id: "brand", title: "TechStart Brand Board", level: "Advanced", xp: 200, format: "Mini brand identity", req: ["Logo", "Color palette", "Typography", "Social graphic", "Business card"], skills: ["Brand identity", "Presentation"], brief: "Create a mini brand identity board for TechStart Academy." },
  { id: "photo", title: "Before and After Edit", level: "Intermediate", xp: 120, format: "Photo edit", req: ["Before image", "After image", "Adjustment notes", "Clean crop"], skills: ["Photo editing", "Composition"], brief: "Edit a photo for a technology training advert and show the before, after, and the changes you made." },
  { id: "ai", title: "AI-Assisted Promo Graphic", level: "Advanced", xp: 160, format: "Promo graphic", req: ["AI idea note", "Edited final design", "Readable text", "Brand colors"], skills: ["AI-assisted design", "Creative direction"], brief: "Use an AI idea or generated concept as inspiration, then refine it into a clear promotional graphic." },
  { id: "final", title: "Complete Brand Package", level: "Capstone", xp: 250, format: "Brand package", req: ["Logo", "Palette", "Typography", "Flyer", "Social post", "Mockup"], skills: ["Portfolio design", "Brand systems"], brief: "Build a complete brand package that combines the best skills from the full Graphic Design Academy." },
];
const gdStart: GDElement[] = [
  { id: "bg", kind: "rect", x: 0, y: 0, w: 720, h: 540, fill: "#f7f3e8", text: "Background" },
  { id: "title", kind: "text", x: 64, y: 82, w: 430, h: 58, fill: "#1f2937", text: "CREATE YOUR FUTURE", fontSize: 40 },
  { id: "message", kind: "text", x: 68, y: 156, w: 330, h: 40, fill: "#4b5563", text: "Learn. Design. Improve.", fontSize: 22 },
  { id: "image", kind: "image", x: 440, y: 92, w: 190, h: 178, fill: "#2f5fe3", text: "Image" },
  { id: "cta", kind: "rect", x: 68, y: 382, w: 210, h: 52, fill: "#c2317e", text: "CTA" },
  { id: "ctaText", kind: "text", x: 94, y: 397, w: 170, h: 30, fill: "#ffffff", text: "Start today", fontSize: 20 },
];
const cloneGD = (items: GDElement[]) => items.map((item) => ({ ...item }));
const emptyGDWorkflow = (): GDWorkflowState => ({ status: "started", canvaOpened: false, checkedRequirements: {} });
const isTrustedCanvaUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && ["canva.com", "www.canva.com"].includes(parsed.hostname);
  } catch {
    return false;
  }
};
function CanvaLaunchButton({ onOpened }: { onOpened: () => void }) {
  const [blocked, setBlocked] = useState(false);
  const url = DESIGN_TOOL_LINKS.canva;
  const openCanva = () => {
    if (!isTrustedCanvaUrl(url)) return;
    onOpened();
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) setBlocked(true);
  };
  return (
    <div className="space-y-2">
      <button type="button" onClick={openCanva} className="btn btn-primary w-full justify-center">
        Open Canva
      </button>
      {blocked && (
        <a href={url} target="_blank" rel="noreferrer" onClick={onOpened} className="block rounded-md border border-line bg-paper px-3 py-2 text-center text-xs font-semibold text-di hover:border-di">
          Browser blocked the popup. Tap here to open Canva.
        </a>
      )}
    </div>
  );
}

export function GraphicDesignStudioSim() {
  const [projectId, setProjectId] = useState("first");
  const [elements, setElements] = useState<GDElement[]>(() => {
    try { return JSON.parse(localStorage.getItem(GD_KEY) || "").elements ?? gdStart; } catch { return gdStart; }
  });
  const [selectedId, setSelectedId] = useState("title");
  const [history, setHistory] = useState<GDElement[][]>([]);
  const [future, setFuture] = useState<GDElement[][]>([]);
  const [drag, setDrag] = useState<{ id: string; dx: number; dy: number } | null>(null);
  const [portfolio, setPortfolio] = useState<{ title: string; at: number; elements: GDElement[] }[]>(() => {
    try { return JSON.parse(localStorage.getItem(`${GD_KEY}-portfolio`) || "[]"); } catch { return []; }
  });
  const [workflowByProject, setWorkflowByProject] = useState<Record<string, GDWorkflowState>>(() => {
    try { return JSON.parse(localStorage.getItem(GD_WORKFLOW_KEY) || "{}"); } catch { return {}; }
  });
  const [canvaPortfolio, setCanvaPortfolio] = useState<GDCanvaPortfolioItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(GD_CANVA_PORTFOLIO_KEY) || "[]"); } catch { return []; }
  });
  const [uploadError, setUploadError] = useState("");
  const project = gdProjectBriefs.find((item) => item.id === projectId) ?? gdProjectBriefs[0];
  const workflow = workflowByProject[project.id] ?? emptyGDWorkflow();
  const selected = elements.find((item) => item.id === selectedId);
  const designText = elements.map((item) => `${item.kind} ${item.text ?? ""}`).join(" ").toLowerCase();
  const checks = project.req.map((req) => ({ req, ok: designText.includes(req.split(" ")[0].toLowerCase()) || (req === "Color palette" && new Set(elements.map((item) => item.fill)).size >= 3) }));
  const score = Math.round((checks.filter((item) => item.ok).length / checks.length) * 100);
  const manualChecksComplete = project.req.every((req) => workflow.checkedRequirements[req]);
  const canSubmitCanvaDesign = workflow.canvaOpened && manualChecksComplete && Boolean(workflow.uploadedName);
  const commit = (next: GDElement[]) => { setHistory((old) => [...old.slice(-14), cloneGD(elements)]); setFuture([]); setElements(next); };
  const update = (patch: Partial<GDElement>) => selected && commit(elements.map((item) => item.id === selected.id ? { ...item, ...patch } : item));
  const add = (kind: GDElement["kind"]) => {
    const id = `${kind}-${Date.now()}`;
    const item: GDElement = kind === "text" ? { id, kind, x: 120, y: 120, w: 260, h: 48, fill: "#1f2937", text: "New text", fontSize: 26 } : kind === "circle" ? { id, kind, x: 150, y: 150, w: 120, h: 120, fill: "#2f5fe3" } : kind === "image" ? { id, kind, x: 180, y: 140, w: 190, h: 130, fill: "#8ecae6", text: "Image" } : { id, kind, x: 140, y: 140, w: 170, h: 90, fill: "#c2317e" };
    commit([...elements, item]); setSelectedId(id);
  };
  const undo = () => { const prev = history[history.length - 1]; if (!prev) return; setFuture((old) => [cloneGD(elements), ...old]); setElements(prev); setHistory((old) => old.slice(0, -1)); };
  const redo = () => { const next = future[0]; if (!next) return; setHistory((old) => [...old, cloneGD(elements)]); setElements(next); setFuture((old) => old.slice(1)); };
  const save = () => localStorage.setItem(GD_KEY, JSON.stringify({ projectId, elements }));
  const submit = () => { const next = [{ title: project.title, at: Date.now(), elements: cloneGD(elements) }, ...portfolio].slice(0, 8); setPortfolio(next); localStorage.setItem(`${GD_KEY}-portfolio`, JSON.stringify(next)); save(); };
  const updateWorkflow = (patch: Partial<GDWorkflowState>) => {
    setWorkflowByProject((old) => {
      const current = old[project.id] ?? emptyGDWorkflow();
      const next = { ...old, [project.id]: { ...current, ...patch } };
      localStorage.setItem(GD_WORKFLOW_KEY, JSON.stringify(next));
      return next;
    });
  };
  const markCanvaOpened = () => updateWorkflow({ status: workflow.status === "started" ? "canva-opened" : workflow.status, canvaOpened: true });
  const toggleRequirement = (req: string) => updateWorkflow({ checkedRequirements: { ...workflow.checkedRequirements, [req]: !workflow.checkedRequirements[req] }, status: workflow.canvaOpened ? "design-in-progress" : workflow.status });
  const handleCanvaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadError("");
    if (!file) return;
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowed.includes(file.type)) {
      setUploadError("Upload a PNG, JPG, or PDF export from Canva.");
      event.target.value = "";
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadError("Keep the exported design under 8 MB for this classroom submission.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateWorkflow({
      status: "design-in-progress",
      uploadedName: file.name,
      uploadedType: file.type,
      uploadedPreview: typeof reader.result === "string" ? reader.result : undefined,
    });
    reader.readAsDataURL(file);
  };
  const markReadyForSubmission = () => canSubmitCanvaDesign && updateWorkflow({ status: "ready-for-submission" });
  const submitCanvaDesign = () => {
    if (!canSubmitCanvaDesign) return;
    const submittedAt = Date.now();
    const feedback = manualChecksComplete
      ? "Submitted for teacher review. The checklist is complete, and your exported design is ready to discuss."
      : "Submitted, but the checklist still needs review.";
    const nextWorkflow: GDWorkflowState = { ...workflow, status: "submitted", submittedAt, reviewedAt: submittedAt, feedback, xpAwarded: project.xp };
    const nextByProject = { ...workflowByProject, [project.id]: nextWorkflow };
    const nextPortfolio = [{ projectId: project.id, title: project.title, at: submittedAt, uploadName: workflow.uploadedName, preview: workflow.uploadedPreview, xp: project.xp }, ...canvaPortfolio.filter((item) => item.projectId !== project.id)].slice(0, 12);
    setWorkflowByProject(nextByProject);
    setCanvaPortfolio(nextPortfolio);
    localStorage.setItem(GD_WORKFLOW_KEY, JSON.stringify(nextByProject));
    localStorage.setItem(GD_CANVA_PORTFOLIO_KEY, JSON.stringify(nextPortfolio));
  };
  const exportSvg = () => { const svg = document.querySelector("#gd-studio-svg")?.outerHTML; if (!svg) return; const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })); const a = document.createElement("a"); a.href = url; a.download = `${project.title.toLowerCase().replace(/\s+/g, "-")}.svg`; a.click(); URL.revokeObjectURL(url); };
  const remove = () => selected && selected.id !== "bg" && commit(elements.filter((item) => item.id !== selected.id));
  const duplicate = () => selected && commit([...elements, { ...selected, id: `${selected.id}-${Date.now()}`, x: selected.x + 24, y: selected.y + 24 }]);
  const layer = (dir: 1 | -1) => { if (!selected) return; const i = elements.findIndex((item) => item.id === selected.id); const j = i + dir; if (j < 0 || j >= elements.length) return; const next = cloneGD(elements); [next[i], next[j]] = [next[j], next[i]]; commit(next); };
  const pointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 720;
    const y = ((event.clientY - box.top) / box.height) * 540;
    setElements((items) => items.map((item) => item.id === drag.id ? { ...item, x: Math.max(0, Math.min(700, x - drag.dx)), y: Math.max(0, Math.min(520, y - drag.dy)) } : item));
  };
  const pointerUp = () => { if (drag) save(); setDrag(null); };

  return (
    <SimulationContainer title="Graphic Design Studio" subtitle="Canvas editor, projects, feedback, save/reopen, export, and portfolio" badge="Design Lab" accent="#c2317e">
      <div className="space-y-4">
        <div className="grid gap-2 lg:grid-cols-3">
          {gdProjectBriefs.map((item) => <button key={item.id} onClick={() => setProjectId(item.id)} className={cn("rounded-lg border-1.5 px-3 py-3 text-left focus-ring", project.id === item.id ? "border-di bg-di-soft" : "border-line bg-paper/50")}><span className="block text-sm font-semibold">{item.title}</span><span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-mute">{item.level} · +{item.xp} XP</span></button>)}
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
          <div className="rounded-lg border-1.5 border-line bg-card p-4">
            <div className="flex flex-wrap items-start gap-3">
              <div className="w-full overflow-hidden rounded-md border border-line bg-paper sm:w-56">
                <div className="grid grid-cols-2 gap-px bg-line">
                  {GD_REFERENCE_IMAGES.map((src, index) => (
                    <img key={src} src={src} alt={`Graphic design reference example ${index + 1}`} className="aspect-[4/3] w-full bg-paper object-cover" loading="lazy" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div className="border-t border-line px-3 py-2 text-[11px] font-semibold text-mute">Design reference</div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-di">Canva design workflow</p>
                <h4 className="mt-1 font-display text-lg font-bold">{project.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-mute">{project.brief}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-md bg-paper px-2 py-1 font-mono text-mute">{project.format}</span>
                  <span className="rounded-md bg-paper px-2 py-1 font-mono text-mute">{project.level}</span>
                  <span className="rounded-md bg-gold-soft px-2 py-1 font-mono font-bold text-[#8a5a06]">+{project.xp} XP after submission</span>
                </div>
              </div>
              <div className="w-full sm:w-48">
                <CanvaLaunchButton onOpened={markCanvaOpened} />
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {(["started", "canva-opened", "design-in-progress", "ready-for-submission", "submitted", "reviewed"] as GDWorkflowStatus[]).map((status) => (
                <div key={status} className={cn("rounded-md border px-3 py-2 text-xs", workflow.status === status ? "border-di bg-di-soft text-di" : "border-line bg-paper/50 text-mute")}>
                  <span className="font-mono uppercase tracking-wider">{status.replace(/-/g, " ")}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-4">
            <h4 className="font-display text-sm font-bold">Bring your Canva design back</h4>
            <label className="mt-3 block rounded-md border border-dashed border-line bg-card px-3 py-3 text-sm hover:border-di">
              <span className="block font-semibold">Upload exported design</span>
              <span className="mt-1 block text-xs text-mute">PNG, JPG, or PDF. This file stays in this browser for classroom review.</span>
              <input type="file" accept=".png,.jpg,.jpeg,.pdf,image/png,image/jpeg,application/pdf" onChange={handleCanvaUpload} className="mt-3 block w-full text-xs" />
            </label>
            {uploadError && <p className="mt-2 text-xs font-semibold text-danger">{uploadError}</p>}
            {workflow.uploadedName && (
              <div className="mt-3 rounded-md border border-line bg-card p-3">
                <div className="text-xs font-semibold">{workflow.uploadedName}</div>
                {workflow.uploadedType?.startsWith("image/") && workflow.uploadedPreview && <img src={workflow.uploadedPreview} alt={`${project.title} uploaded preview`} className="mt-2 max-h-36 w-full rounded-md object-contain bg-paper" />}
                {workflow.uploadedType === "application/pdf" && <p className="mt-2 text-xs text-mute">PDF attached for review.</p>}
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="rounded-lg border-1.5 border-line bg-card p-4">
            <h4 className="font-display text-sm font-bold">Manual requirements checklist</h4>
            <p className="mt-1 text-xs leading-relaxed text-mute">Check each item after you confirm it in your exported design. The app does not pretend to inspect the image for you.</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {project.req.map((req) => (
                <label key={req} className="flex min-h-12 items-center gap-2 rounded-md border border-line bg-paper/50 px-3 py-2 text-sm">
                  <input type="checkbox" checked={Boolean(workflow.checkedRequirements[req])} onChange={() => toggleRequirement(req)} className="h-4 w-4 accent-[#c2317e]" />
                  <span>{req}</span>
                </label>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="btn btn-gold btn-sm" onClick={markReadyForSubmission} disabled={!canSubmitCanvaDesign}>Mark ready</button>
              <button className="btn btn-primary btn-sm" onClick={submitCanvaDesign} disabled={!canSubmitCanvaDesign}>Submit Canva design</button>
            </div>
            {workflow.feedback && <p className="mt-3 rounded-md border border-se bg-se-soft px-3 py-2 text-xs font-semibold text-se">{workflow.feedback} Award: +{workflow.xpAwarded ?? project.xp} XP.</p>}
          </div>
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-4">
            <h4 className="font-display text-sm font-bold">Design skills</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => <span key={skill} className="rounded-md bg-card px-2 py-1 text-xs font-semibold text-mute">{skill}</span>)}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-mute">Canva opens in the browser because Canva protects its login and editor from being embedded inside other websites.</p>
          </div>
        </div>
        <div className="grid gap-4 xl:grid-cols-[245px_minmax(0,1fr)_270px]">
          <div className="space-y-3">
            <div className="rounded-lg border-1.5 border-line bg-card p-3"><h4 className="font-display text-sm font-bold">Project brief</h4><p className="mt-2 text-sm leading-relaxed text-mute">{project.brief}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-line"><div className="h-full bg-di" style={{ width: `${score}%` }} /></div><div className="mt-2 space-y-1 text-xs">{checks.map((item) => <div key={item.req}>{item.ok ? "✓" : "○"} {item.req}</div>)}</div></div>
            <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3"><h4 className="font-display text-sm font-bold">Assets</h4><div className="mt-2 grid grid-cols-2 gap-2"><button className="btn btn-ghost btn-sm" onClick={() => add("text")}>Text</button><button className="btn btn-ghost btn-sm" onClick={() => add("rect")}>Shape</button><button className="btn btn-ghost btn-sm" onClick={() => add("circle")}>Circle</button><button className="btn btn-ghost btn-sm" onClick={() => add("image")}>Image</button></div></div>
          </div>
          <div className="rounded-lg border-1.5 border-line bg-[#ece7da] p-3">
            <div className="mb-2 flex flex-wrap gap-2"><button className="btn btn-ghost btn-sm" onClick={undo} disabled={!history.length}>Undo</button><button className="btn btn-ghost btn-sm" onClick={redo} disabled={!future.length}>Redo</button><button className="btn btn-ghost btn-sm" onClick={duplicate}>Duplicate</button><button className="btn btn-ghost btn-sm" onClick={remove}>Delete</button><button className="btn btn-gold btn-sm" onClick={save}>Save</button><button className="btn btn-primary btn-sm" onClick={submit}>Submit</button><button className="btn btn-dark btn-sm" onClick={exportSvg}>Export SVG</button></div>
            <svg id="gd-studio-svg" viewBox="0 0 720 540" className="aspect-[4/3] w-full rounded-md bg-white shadow-sm" onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerLeave={pointerUp}>
              {elements.map((item) => <g key={item.id} transform={`rotate(${item.rotate ?? 0} ${item.x + item.w / 2} ${item.y + item.h / 2})`} onPointerDown={(event) => { setSelectedId(item.id); setDrag({ id: item.id, dx: (event.nativeEvent.offsetX / event.currentTarget.ownerSVGElement!.clientWidth) * 720 - item.x, dy: (event.nativeEvent.offsetY / event.currentTarget.ownerSVGElement!.clientHeight) * 540 - item.y }); }}>
                {item.kind === "text" && <text x={item.x} y={item.y + (item.fontSize ?? 24)} fill={item.fill} fontSize={item.fontSize ?? 24} fontFamily="Inter, Arial" fontWeight={item.id === "title" ? 800 : 600}>{item.text}</text>}
                {item.kind === "rect" && <rect x={item.x} y={item.y} width={item.w} height={item.h} rx={10} fill={item.fill} />}
                {item.kind === "circle" && <ellipse cx={item.x + item.w / 2} cy={item.y + item.h / 2} rx={item.w / 2} ry={item.h / 2} fill={item.fill} />}
                {item.kind === "image" && <><rect x={item.x} y={item.y} width={item.w} height={item.h} rx={12} fill={item.fill} /><circle cx={item.x + item.w * 0.32} cy={item.y + item.h * 0.35} r={22} fill="#ffffff55" /><path d={`M${item.x + 18} ${item.y + item.h - 20} L${item.x + item.w * 0.48} ${item.y + item.h * 0.56} L${item.x + item.w - 18} ${item.y + item.h - 20}Z`} fill="#ffffff88" /></>}
                {selectedId === item.id && <rect x={item.x - 4} y={item.y - 4} width={item.w + 8} height={item.h + 8} fill="none" stroke="#c2317e" strokeDasharray="6 4" strokeWidth={2} />}
              </g>)}
            </svg>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border-1.5 border-line bg-card p-3"><h4 className="font-display text-sm font-bold">Inspector</h4>{selected ? <div className="mt-3 space-y-2">{selected.kind === "text" && <input className="inp" value={selected.text ?? ""} onChange={(event) => update({ text: event.target.value })} aria-label="Selected text" />}<input className="h-10 w-full rounded-md border border-line" type="color" value={selected.fill} onChange={(event) => update({ fill: event.target.value })} /><div className="grid grid-cols-2 gap-2"><input className="inp" type="number" value={Math.round(selected.x)} onChange={(event) => update({ x: Number(event.target.value) })} aria-label="X" /><input className="inp" type="number" value={Math.round(selected.y)} onChange={(event) => update({ y: Number(event.target.value) })} aria-label="Y" /><input className="inp" type="number" value={Math.round(selected.w)} onChange={(event) => update({ w: Number(event.target.value) })} aria-label="Width" /><input className="inp" type="number" value={Math.round(selected.h)} onChange={(event) => update({ h: Number(event.target.value) })} aria-label="Height" /></div>{selected.kind === "text" && <input className="inp" type="number" value={selected.fontSize ?? 24} onChange={(event) => update({ fontSize: Number(event.target.value) })} aria-label="Font size" />}<input type="range" min="-45" max="45" value={selected.rotate ?? 0} onChange={(event) => update({ rotate: Number(event.target.value) })} className="w-full" /><div className="flex gap-2"><button className="btn btn-ghost btn-sm" onClick={() => layer(-1)}>Layer down</button><button className="btn btn-ghost btn-sm" onClick={() => layer(1)}>Layer up</button></div></div> : <p className="mt-2 text-sm text-mute">Select an element.</p>}</div>
            <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3"><h4 className="font-display text-sm font-bold">Design review</h4><div className="mt-2 space-y-1 text-xs"><div>Typography {elements.some((item) => item.kind === "text") ? "✓" : "○"}</div><div>Color {new Set(elements.map((item) => item.fill)).size >= 2 ? "✓" : "○"}</div><div>Layout {elements.length >= 4 ? "✓" : "○"}</div><div>Hierarchy {elements.some((item) => (item.fontSize ?? 0) >= 32) ? "✓" : "⚠"}</div></div><p className="mt-2 text-[11px] leading-relaxed text-mute">Automated feedback is a practice guide, not professional human design review.</p></div>
            <div className="rounded-lg border-1.5 border-line bg-card p-3">
              <h4 className="font-display text-sm font-bold">My Design Portfolio</h4>
              <div className="mt-2 space-y-2">
                {canvaPortfolio.map((item) => (
                  <button key={`${item.projectId}-${item.at}`} onClick={() => setProjectId(item.projectId)} className="w-full rounded-md border border-line px-2 py-2 text-left text-xs hover:border-di">
                    <span className="font-semibold">{item.title}</span>
                    <span className="block text-mute">Canva submission · {new Date(item.at).toLocaleDateString()}</span>
                    {item.preview?.startsWith("data:image/") && <img src={item.preview} alt={`${item.title} portfolio preview`} className="mt-2 max-h-20 w-full rounded object-contain bg-paper" />}
                  </button>
                ))}
                {portfolio.map((item) => (
                  <button key={`${item.title}-${item.at}`} onClick={() => { setProjectId(gdProjectBriefs.find((p) => p.title === item.title)?.id ?? "first"); setElements(item.elements); }} className="w-full rounded-md border border-line px-2 py-2 text-left text-xs hover:border-di">
                    {item.title}
                    <span className="block text-mute">Studio draft · {new Date(item.at).toLocaleDateString()}</span>
                  </button>
                ))}
                {!portfolio.length && !canvaPortfolio.length && <p className="text-xs text-mute">Submit a design to start your portfolio.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── Robot Movement Simulator ────────────────────────────────────────────────

type Direction = "up" | "down" | "left" | "right";
type RobotCommand = "FORWARD" | "LEFT" | "RIGHT";

export function RobotSimulator() {
  const GRID_SIZE = 6;
  const [robot, setRobot] = useState({ x: 0, y: 0, dir: "right" as Direction });
  const [target, setTarget] = useState({ x: 5, y: 5 });
  const [commands, setCommands] = useState<RobotCommand[]>([]);
  const [executing, setExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [reached, setReached] = useState(false);

  const dirToDelta: Record<Direction, { dx: number; dy: number }> = {
    up: { dx: 0, dy: -1 }, down: { dx: 0, dy: 1 }, left: { dx: -1, dy: 0 }, right: { dx: 1, dy: 0 },
  };
  const dirEmoji: Record<Direction, string> = { up: "↑", down: "↓", left: "←", right: "→" };
  const turnLeft: Record<Direction, Direction> = { up: "left", left: "down", down: "right", right: "up" };
  const turnRight: Record<Direction, Direction> = { up: "right", right: "down", down: "left", left: "up" };

  const addCommand = (cmd: RobotCommand) => setCommands([...commands, cmd]);

  const executeCommands = async () => {
    setExecuting(true);
    setReached(false);
    setCurrentStep(-1);
    let pos = { ...robot };
    for (let i = 0; i < commands.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 500));
      const cmd = commands[i];
      if (cmd === "FORWARD") {
        const delta = dirToDelta[pos.dir];
        pos = { ...pos, x: Math.max(0, Math.min(GRID_SIZE - 1, pos.x + delta.dx)), y: Math.max(0, Math.min(GRID_SIZE - 1, pos.y + delta.dy)) };
      } else if (cmd === "LEFT") {
        pos = { ...pos, dir: turnLeft[pos.dir] };
      } else {
        pos = { ...pos, dir: turnRight[pos.dir] };
      }
      setRobot({ ...pos });
      if (pos.x === target.x && pos.y === target.y) {
        setReached(true);
        break;
      }
    }
    setExecuting(false);
  };

  const reset = () => {
    setRobot({ x: 0, y: 0, dir: "right" });
    setCommands([]);
    setCurrentStep(-1);
    setReached(false);
    setExecuting(false);
  };

  return (
    <SimulationContainer title="Robot Movement Simulator" subtitle="Program the robot to reach the target using commands" badge="Lab" accent="#d95f0e">
      <div className="space-y-4">
        {/* Grid */}
        <div className="mx-auto grid w-fit gap-0" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const isRobot = x === robot.x && y === robot.y;
            const isTarget = x === target.x && y === target.y;
            return (
              <div key={idx} className="flex h-10 w-10 items-center justify-center border border-line bg-paper/30 sm:h-12 sm:w-12">
                {isRobot && <span className="text-xl" title={`Facing ${robot.dir}`}>🤖</span>}
                {isTarget && !isRobot && <span className="text-lg">🎯</span>}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => addCommand("FORWARD")} disabled={executing} className="btn btn-sm">FORWARD</button>
          <button onClick={() => addCommand("LEFT")} disabled={executing} className="btn btn-sm">← LEFT</button>
          <button onClick={() => addCommand("RIGHT")} disabled={executing} className="btn btn-sm">RIGHT →</button>
          <button onClick={executeCommands} disabled={executing || commands.length === 0} className="btn btn-sm btn-dark">
            {executing ? "Running..." : "▶ Run Program"}
          </button>
          <button onClick={reset} className="btn btn-sm">Reset</button>
        </div>

        {/* Command Queue */}
        {commands.length > 0 && (
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <div className="lbl">Program ({commands.length} commands)</div>
            <div className="flex flex-wrap gap-1.5">
              {commands.map((cmd, i) => (
                <span key={i} className={cn(
                  "rounded-md px-2 py-0.5 font-mono text-[11px] font-medium",
                  i === currentStep ? "bg-gold-soft text-[#8a5a06] ring-1 ring-gold" : i < currentStep ? "bg-se-soft text-se" : "bg-paper text-mute",
                )}>
                  {cmd}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div className="flex flex-wrap gap-3 font-mono text-[11px]">
          <span className="rounded-md bg-paper px-2 py-1">Position: ({robot.x}, {robot.y})</span>
          <span className="rounded-md bg-paper px-2 py-1">Facing: {dirEmoji[robot.dir]} {robot.dir}</span>
          {reached && <span className="rounded-md bg-se-soft px-2 py-1 font-bold text-se">✓ Target reached!</span>}
        </div>

        <div className="rounded-md border-l-4 border-rob bg-rob-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>How robots move:</strong> Robots follow programmed instructions sequentially. FORWARD moves one step in the current direction. LEFT/RIGHT rotate the robot 90°. This is the foundation of robot programming — sequence, direction, and control flow.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── Sensor Simulation ───────────────────────────────────────────────────────

export function SensorSim() {
  const [temp, setTemp] = useState(24);
  const [light, setLight] = useState(65);
  const [distance, setDistance] = useState(50);
  const [fanOn, setFanOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false);

  // Automation rules
  useEffect(() => { setFanOn(temp > 30); }, [temp]);
  useEffect(() => { setLightOn(light < 40); }, [light]);
  useEffect(() => { setAlarmOn(distance < 20); }, [distance]);

  return (
    <SimulationContainer title="Sensor & Automation Lab" subtitle="Adjust sensors and observe automation rules in action" badge="Lab" accent="#d95f0e">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Temperature */}
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌡️</span>
              <span className="lbl mb-0">Temperature</span>
            </div>
            <input type="range" min="10" max="45" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))} className="mt-2 w-full accent-[#d95f0e]" />
            <div className="mt-1 text-center font-mono text-lg font-bold text-rob">{temp}°C</div>
            <div className="mt-2 rounded border-1.5 border-dashed border-line p-2 text-center">
              <span className="font-mono text-[10px] text-mute">IF temp &gt; 30°C → </span>
              <span className={cn("font-mono text-[10px] font-bold", fanOn ? "text-se" : "text-mute")}>
                FAN {fanOn ? "ON ✓" : "OFF"}
              </span>
            </div>
          </div>

          {/* Light */}
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <span className="lbl mb-0">Light Level</span>
            </div>
            <input type="range" min="0" max="100" value={light} onChange={(e) => setLight(parseInt(e.target.value))} className="mt-2 w-full accent-[#d95f0e]" />
            <div className="mt-1 text-center font-mono text-lg font-bold text-rob">{light}%</div>
            <div className="mt-2 rounded border-1.5 border-dashed border-line p-2 text-center">
              <span className="font-mono text-[10px] text-mute">IF light &lt; 40% → </span>
              <span className={cn("font-mono text-[10px] font-bold", lightOn ? "text-se" : "text-mute")}>
                LIGHT {lightOn ? "ON ✓" : "OFF"}
              </span>
            </div>
          </div>

          {/* Distance */}
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">📡</span>
              <span className="lbl mb-0">Distance</span>
            </div>
            <input type="range" min="0" max="100" value={distance} onChange={(e) => setDistance(parseInt(e.target.value))} className="mt-2 w-full accent-[#d95f0e]" />
            <div className="mt-1 text-center font-mono text-lg font-bold text-rob">{distance} cm</div>
            <div className="mt-2 rounded border-1.5 border-dashed border-line p-2 text-center">
              <span className="font-mono text-[10px] text-mute">IF dist &lt; 20cm → </span>
              <span className={cn("font-mono text-[10px] font-bold", alarmOn ? "text-danger" : "text-mute")}>
                ALARM {alarmOn ? "ON ⚠" : "OFF"}
              </span>
            </div>
          </div>
        </div>

        {/* Actuator Status */}
        <div className="grid grid-cols-3 gap-3">
          <div className={cn("rounded-lg border-2 p-3 text-center transition-all", fanOn ? "border-se bg-se-soft" : "border-line bg-paper/50")}>
            <span className="text-2xl">{fanOn ? "🌀" : "⭕"}</span>
            <div className="mt-1 font-mono text-[11px] font-bold">{fanOn ? "Fan ON" : "Fan OFF"}</div>
          </div>
          <div className={cn("rounded-lg border-2 p-3 text-center transition-all", lightOn ? "border-gold bg-gold-soft" : "border-line bg-paper/50")}>
            <span className="text-2xl">{lightOn ? "💡" : "⭕"}</span>
            <div className="mt-1 font-mono text-[11px] font-bold">{lightOn ? "Light ON" : "Light OFF"}</div>
          </div>
          <div className={cn("rounded-lg border-2 p-3 text-center transition-all", alarmOn ? "border-danger bg-[#f6e3e0]" : "border-line bg-paper/50")}>
            <span className="text-2xl">{alarmOn ? "🚨" : "⭕"}</span>
            <div className="mt-1 font-mono text-[11px] font-bold">{alarmOn ? "ALARM!" : "Alarm OFF"}</div>
          </div>
        </div>

        <div className="rounded-md border-l-4 border-rob bg-rob-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>Sense → Think → Act:</strong> Sensors measure the environment (temperature, light, distance). The controller evaluates rules (IF conditions). Actuators respond (fan, light, alarm). This is the core automation loop used in robotics and IoT systems.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── IoT Architecture Simulation ─────────────────────────────────────────────

export function IoTSim() {
  const [temp, setTemp] = useState(28);
  const [flowing, setFlowing] = useState(false);
  const [stages, setStages] = useState([false, false, false, false, false]);

  const sendData = () => {
    setFlowing(true);
    setStages([false, false, false, false, false]);
    const delays = [300, 600, 900, 1200, 1500];
    delays.forEach((d, i) => {
      setTimeout(() => setStages((prev) => { const n = [...prev]; n[i] = true; return n; }), d);
    });
    setTimeout(() => setFlowing(false), 1800);
  };

  const labels = ["Sensor", "Microcontroller", "Internet", "Cloud", "Dashboard"];
  const icons = ["🌡️", "🔧", "🌐", "☁️", "📊"];

  return (
    <SimulationContainer title="IoT Data Flow Simulation" subtitle="Send sensor data through the complete IoT architecture" badge="Simulation" accent="#d95f0e">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <label className="lbl">Sensor Reading</label>
            <div className="flex items-center gap-2">
              <input type="range" min="10" max="45" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))} className="w-32 accent-[#d95f0e]" />
              <span className="font-mono text-sm font-bold text-rob">{temp}°C</span>
            </div>
          </div>
          <button onClick={sendData} disabled={flowing} className="btn btn-sm btn-dark">
            {flowing ? "Sending..." : "📤 Send Data"}
          </button>
        </div>

        {/* Flow Visualization */}
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-lg border-1.5 border-line bg-paper/30 p-4">
          {labels.map((label, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={cn(
                "flex flex-col items-center gap-1 rounded-lg border-2 px-3 py-2 transition-all",
                stages[i] ? "border-se bg-se-soft scale-105" : "border-line bg-card",
              )}>
                <span className="text-lg">{icons[i]}</span>
                <span className="font-mono text-[9px] font-medium">{label}</span>
                {stages[i] && <span className="text-se text-[10px]">✓</span>}
              </div>
              {i < labels.length - 1 && (
                <div className={cn("px-1 font-mono text-sm", stages[i] && stages[i + 1] ? "text-se" : "text-mute")}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* Dashboard Output */}
        {stages[4] && (
          <div className="rounded-lg border-2 border-se bg-se-soft/50 p-4">
            <div className="lbl text-se">Dashboard Received</div>
            <div className="font-mono text-sm">Temperature: <strong className="text-rob">{temp}°C</strong></div>
            <div className="mt-1 font-mono text-[11px] text-mute">
              Timestamp: {new Date().toLocaleTimeString()} · Status: Normal {temp > 35 ? "⚠️ HIGH" : temp < 15 ? "⚠️ LOW" : "✓"}
            </div>
          </div>
        )}

        <div className="rounded-md border-l-4 border-rob bg-rob-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>IoT Architecture:</strong> Sensors collect data → Microcontroller processes it → Data travels over the internet → Cloud stores/processes it → Dashboard displays it. This is how smart devices connect to create intelligent systems.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── API Simulation Lab ──────────────────────────────────────────────────────

export function APISim() {
  const [method, setMethod] = useState<"GET" | "POST">("GET");
  const [endpoint, setEndpoint] = useState("/users");
  const [body, setBody] = useState('{ "name": "New User", "email": "user@example.com" }');
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const sendRequest = () => {
    setLoading(true);
    setResponse("");
    setTimeout(() => {
      if (method === "GET" && endpoint === "/users") {
        setStatus(200);
        setResponse(JSON.stringify([
          { id: 1, name: "Amara Kide", email: "amara@techfoundry.ac" },
          { id: 2, name: "Noah Berg", email: "noah@techfoundry.ac" },
          { id: 3, name: "Zara Hussen", email: "zara@techfoundry.ac" },
        ], null, 2));
      } else if (method === "GET" && endpoint === "/courses") {
        setStatus(200);
        setResponse(JSON.stringify([
          { id: "c-ai", title: "Artificial Intelligence", lessons: 10 },
          { id: "c-rob", title: "Robotics & IoT", lessons: 12 },
        ], null, 2));
      } else if (method === "POST") {
        try {
          JSON.parse(body);
          setStatus(201);
          setResponse(JSON.stringify({ success: true, message: "Resource created", data: JSON.parse(body), id: Math.floor(Math.random() * 1000) }, null, 2));
        } catch {
          setStatus(400);
          setResponse(JSON.stringify({ error: "Invalid JSON body" }, null, 2));
        }
      } else {
        setStatus(404);
        setResponse(JSON.stringify({ error: "Endpoint not found" }, null, 2));
      }
      setLoading(false);
    }, 800);
  };

  return (
    <SimulationContainer title="API Lab" subtitle="Send HTTP requests and observe server responses" badge="Lab" accent="#1b8a4c">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <select value={method} onChange={(e) => setMethod(e.target.value as "GET" | "POST")} className="inp w-auto">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          <select value={endpoint} onChange={(e) => setEndpoint(e.target.value)} className="inp flex-1 min-w-[150px]">
            <option value="/users">/users</option>
            <option value="/courses">/courses</option>
            <option value="/unknown">/unknown (404)</option>
          </select>
          <button onClick={sendRequest} disabled={loading} className="btn btn-sm btn-dark">
            {loading ? "Sending..." : "📡 Send Request"}
          </button>
        </div>

        {method === "POST" && (
          <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
            <label className="lbl">Request Body (JSON)</label>
            <textarea className="inp min-h-[60px] font-mono text-[12px]" value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
        )}

        {/* Request/Response Flow */}
        <div className="flex items-center justify-center gap-2 rounded-lg border-1.5 border-line bg-paper/30 p-3">
          <div className="rounded border-1.5 border-se bg-se-soft px-3 py-2 text-center">
            <div className="font-mono text-[10px] font-bold">Client</div>
          </div>
          <div className="font-mono text-xs text-mute">
            {method} {endpoint} →
          </div>
          <div className="rounded border-1.5 border-ink bg-ink px-3 py-2 text-center">
            <div className="font-mono text-[10px] font-bold text-paper">Server</div>
          </div>
          {status > 0 && (
            <>
              <div className="font-mono text-xs text-mute">→ {status}</div>
              <div className={cn("rounded border-1.5 px-3 py-2 text-center", status < 300 ? "border-se bg-se-soft" : "border-danger bg-[#f6e3e0]")}>
                <div className="font-mono text-[10px] font-bold">Response</div>
              </div>
            </>
          )}
        </div>

        {response && (
          <div className="rounded-lg border-1.5 border-line bg-ink p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className={cn("rounded px-2 py-0.5 font-mono text-[10px] font-bold", status < 300 ? "bg-se text-[#f4faf7]" : "bg-danger text-white")}>
                {status}
              </span>
              <span className="font-mono text-[10px] text-paper/60">Response Body</span>
            </div>
            <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-paper/90">{response}</pre>
          </div>
        )}

        <div className="rounded-md border-l-4 border-se bg-se-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>How APIs work:</strong> Your application sends an HTTP request (GET to read, POST to create) to a server. The server processes it and returns a response with a status code (200 = success, 404 = not found, 400 = bad request) and data.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── Database Simulation ─────────────────────────────────────────────────────

export function DatabaseSim() {
  const [rows, setRows] = useState([
    { id: 1, name: "Amara Kide", email: "amara@techfoundry.ac", course: "AI" },
    { id: 2, name: "Noah Berg", email: "noah@techfoundry.ac", course: "Robotics" },
    { id: 3, name: "Zara Hussen", email: "zara@techfoundry.ac", course: "AI" },
    { id: 4, name: "Miguel Santos", email: "miguel@techfoundry.ac", course: "Software" },
  ]);
  const [query, setQuery] = useState("SELECT * FROM students");
  const [result, setResult] = useState<typeof rows>(rows);
  const [newRow, setNewRow] = useState({ name: "", email: "", course: "AI" });

  const runQuery = () => {
    const q = query.toLowerCase().trim();
    if (q.includes("select * from students")) {
      setResult(rows);
    } else if (q.includes("where course")) {
      const match = q.match(/'([^']+)'/);
      if (match) {
        setResult(rows.filter(r => r.course.toLowerCase() === match[1].toLowerCase()));
      }
    } else if (q.includes("count")) {
      setResult([{ id: 0, name: `Count: ${rows.length}`, email: "", course: "" }] as typeof rows);
    } else {
      setResult([]);
    }
  };

  const addRow = () => {
    if (!newRow.name || !newRow.email) return;
    const id = Math.max(...rows.map(r => r.id)) + 1;
    setRows([...rows, { id, ...newRow }]);
    setNewRow({ name: "", email: "", course: "AI" });
  };

  return (
    <SimulationContainer title="Database Lab" subtitle="Query and manage a simulated database" badge="Lab" accent="#1b8a4c">
      <div className="space-y-4">
        <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
          <label className="lbl">SQL Query</label>
          <div className="flex gap-2">
            <input className="inp flex-1 font-mono text-[12px]" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={runQuery} className="btn btn-sm btn-dark">▶ Run</button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button onClick={() => setQuery("SELECT * FROM students")} className="btn btn-xs">SELECT *</button>
            <button onClick={() => setQuery("SELECT * FROM students WHERE course = 'AI'")} className="btn btn-xs">WHERE course='AI'</button>
            <button onClick={() => setQuery("SELECT COUNT(*) FROM students")} className="btn btn-xs">COUNT</button>
          </div>
        </div>

        {/* Result Table */}
        <div className="overflow-x-auto rounded-lg border-1.5 border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-1.5 border-line bg-paper">
                <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-mute">id</th>
                <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-mute">name</th>
                <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-mute">email</th>
                <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wider text-mute">course</th>
              </tr>
            </thead>
            <tbody>
              {result.map((r) => (
                <tr key={r.id} className="border-b border-line/50">
                  <td className="px-3 py-2 font-mono text-[12px]">{r.id}</td>
                  <td className="px-3 py-2">{r.name}</td>
                  <td className="px-3 py-2 font-mono text-[12px] text-mute">{r.email}</td>
                  <td className="px-3 py-2"><span className="rounded bg-paper px-1.5 py-0.5 font-mono text-[10px]">{r.course}</span></td>
                </tr>
              ))}
              {result.length === 0 && (
                <tr><td colSpan={4} className="px-3 py-4 text-center text-mute">No results</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Insert */}
        <div className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
          <label className="lbl">INSERT new record</label>
          <div className="flex flex-wrap gap-2">
            <input className="inp flex-1 min-w-[120px]" placeholder="Name" value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} />
            <input className="inp flex-1 min-w-[150px]" placeholder="Email" value={newRow.email} onChange={(e) => setNewRow({ ...newRow, email: e.target.value })} />
            <select className="inp w-auto" value={newRow.course} onChange={(e) => setNewRow({ ...newRow, course: e.target.value })}>
              <option>AI</option><option>Robotics</option><option>Software</option><option>Innovation</option>
            </select>
            <button onClick={addRow} className="btn btn-sm">+ Insert</button>
          </div>
        </div>

        <div className="rounded-md border-l-4 border-se bg-se-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>How databases work:</strong> Applications send SQL queries to a database. SELECT retrieves data, WHERE filters it, INSERT adds new records. The database returns structured results. This is how applications store and retrieve persistent data.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── Business Model Canvas Simulation ────────────────────────────────────────

export function BusinessModelSim() {
  const [canvas, setCanvas] = useState({
    problem: "", solution: "", customers: "", channels: "", revenue: "", costs: "", keyResources: "", partners: "", metrics: "",
  });
  const [validated, setValidated] = useState(false);

  const blocks = [
    { key: "problem", label: "Problem", hint: "What pain point exists?" },
    { key: "solution", label: "Solution", hint: "How do you solve it?" },
    { key: "customers", label: "Target Users", hint: "Who has this problem?" },
    { key: "channels", label: "Channels", hint: "How do you reach them?" },
    { key: "revenue", label: "Revenue Model", hint: "How do you make money?" },
    { key: "costs", label: "Cost Structure", hint: "What does it cost to run?" },
    { key: "keyResources", label: "Key Resources", hint: "What do you need?" },
    { key: "partners", label: "Partners", hint: "Who helps you?" },
    { key: "metrics", label: "Key Metrics", hint: "How do you measure success?" },
  ] as const;

  const validate = () => {
    const filled = Object.values(canvas).filter(Boolean).length;
    setValidated(filled >= 7);
  };

  const score = Object.values(canvas).filter((v) => v.trim().length > 5).length;

  return (
    <SimulationContainer title="Business Model Canvas" subtitle="Build and validate your startup's business model" badge="Simulation" accent="#c2317e">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.key} className="rounded-lg border-1.5 border-line bg-paper/50 p-3">
              <label className="lbl">{b.label}</label>
              <textarea
                className="inp min-h-[50px] text-[12px]"
                placeholder={b.hint}
                value={canvas[b.key]}
                onChange={(e) => setCanvas({ ...canvas, [b.key]: e.target.value })}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={validate} className="btn btn-sm btn-dark">Validate Model</button>
          <span className="font-mono text-[11px] text-mute">Completeness: {score}/9 blocks</span>
          <div className="flex-1">
            <div className="h-2 overflow-hidden rounded-full bg-[#e3e6da]">
              <div className="h-full rounded-full bg-di transition-all" style={{ width: `${(score / 9) * 100}%` }} />
            </div>
          </div>
        </div>

        {validated && (
          <div className="rounded-lg border-2 border-se bg-se-soft/50 p-4">
            <div className="flex items-center gap-2">
              <Icon name="check" size={16} className="text-se" />
              <span className="font-display text-sm font-bold text-se">Business Model Valid</span>
            </div>
            <p className="mt-1 text-[13px] text-mute">
              Your canvas has {score} defined blocks. Next step: identify the riskiest assumption and design the cheapest experiment to test it.
            </p>
          </div>
        )}

        <div className="rounded-md border-l-4 border-di bg-di-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>Business Model Canvas:</strong> A one-page framework that maps how a business creates, delivers, and captures value. Fill all nine blocks to ensure your model is complete. The riskiest block is the one you're least certain about — test that first.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── Microcontroller Lab ─────────────────────────────────────────────────────

export function MicrocontrollerSim() {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [ledOn, setLedOn] = useState(false);
  const [motorSpeed, setMotorSpeed] = useState(0);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [mode, setMode] = useState<"button-led" | "sensor-motor" | "alarm">("button-led");

  useEffect(() => {
    if (mode === "button-led") {
      setLedOn(buttonPressed);
      setMotorSpeed(0);
      setBuzzerOn(false);
    } else if (mode === "sensor-motor") {
      setLedOn(motorSpeed > 0);
      setBuzzerOn(false);
    } else {
      setLedOn(buttonPressed);
      setBuzzerOn(buttonPressed);
      setMotorSpeed(0);
    }
  }, [buttonPressed, motorSpeed, mode]);

  return (
    <SimulationContainer title="Microcontroller Lab" subtitle="Connect virtual components and observe the control logic" badge="Lab" accent="#d95f0e">
      <div className="space-y-4">
        {/* Mode Selection */}
        <div className="flex flex-wrap gap-2">
          {(["button-led", "sensor-motor", "alarm"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setButtonPressed(false); setMotorSpeed(0); }} className={cn("btn btn-sm", mode === m ? "btn-dark" : "")}>
              {m === "button-led" ? "Button → LED" : m === "sensor-motor" ? "Sensor → Motor" : "Alarm System"}
            </button>
          ))}
        </div>

        {/* Circuit Visualization */}
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg border-1.5 border-line bg-paper/30 p-4">
          {/* Input */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-mute">Input</span>
            {mode === "sensor-motor" ? (
              <div className="flex flex-col items-center gap-1">
                <input type="range" min="0" max="100" value={motorSpeed} onChange={(e) => setMotorSpeed(parseInt(e.target.value))} className="w-20 accent-[#d95f0e]" style={{ writingMode: "vertical-lr" as any, height: "60px" }} />
                <span className="font-mono text-[10px]">Sensor: {motorSpeed}%</span>
              </div>
            ) : (
              <button
                onMouseDown={() => setButtonPressed(true)}
                onMouseUp={() => setButtonPressed(false)}
                onMouseLeave={() => setButtonPressed(false)}
                onTouchStart={() => setButtonPressed(true)}
                onTouchEnd={() => setButtonPressed(false)}
                className={cn("h-14 w-14 rounded-full border-3 transition-all", buttonPressed ? "border-se bg-se text-white scale-95" : "border-line bg-paper text-mute")}
              >
                <span className="text-lg">{buttonPressed ? "⬤" : "○"}</span>
              </button>
            )}
          </div>

          <div className="font-mono text-lg text-mute">→</div>

          {/* Microcontroller */}
          <div className="flex flex-col items-center gap-1 rounded-lg border-2 border-ink bg-ink px-4 py-3">
            <span className="text-lg">🔧</span>
            <span className="font-mono text-[9px] font-bold text-paper">MCU</span>
            <span className="font-mono text-[8px] text-paper/60">Processing</span>
          </div>

          <div className="font-mono text-lg text-mute">→</div>

          {/* Outputs */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-mute">Output</span>
            <div className="flex gap-2">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all", ledOn ? "border-gold bg-gold text-ink" : "border-line bg-paper")}>
                <span className="text-lg">{ledOn ? "💡" : "⭕"}</span>
              </div>
              {mode === "sensor-motor" && (
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all", motorSpeed > 0 ? "border-se bg-se-soft" : "border-line bg-paper")}>
                  <span className={cn("text-lg", motorSpeed > 0 && "animate-spin")} style={{ animationDuration: `${Math.max(0.2, 2 - motorSpeed / 50)}s` }}>⚙️</span>
                </div>
              )}
              {mode === "alarm" && (
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all", buzzerOn ? "border-danger bg-[#f6e3e0]" : "border-line bg-paper")}>
                  <span className="text-lg">{buzzerOn ? "🔔" : "⭕"}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Code representation */}
        <div className="rounded-lg border-1.5 border-line bg-ink p-3">
          <div className="font-mono text-[11px] leading-relaxed text-paper/80">
            <span className="text-paper/40">// Microcontroller code</span><br />
            <span className="text-[#7ec8e3]">if</span> ({mode === "button-led" ? "button.isPressed()" : mode === "sensor-motor" ? `sensor.read() > ${50}` : "button.isPressed()"}) {"{"}<br />
            <span className="ml-4">{mode === "alarm" ? "buzzer.on(); led.on();" : mode === "sensor-motor" ? `motor.setSpeed(sensor.read());` : "led.on();"}</span><br />
            {"}"} <span className="text-[#7ec8e3]">else</span> {"{"}<br />
            <span className="ml-4">{mode === "alarm" ? "buzzer.off(); led.off();" : mode === "sensor-motor" ? "motor.stop();" : "led.off();"}</span><br />
            {"}"}
          </div>
        </div>

        <div className="rounded-md border-l-4 border-rob bg-rob-soft/40 px-4 py-3">
          <p className="text-[13px] leading-relaxed">
            <strong>Microcontrollers:</strong> Read inputs (buttons, sensors), process logic (if/else rules), and control outputs (LEDs, motors, buzzers). This sense-process-act loop runs thousands of times per second in real devices.
          </p>
        </div>
      </div>
    </SimulationContainer>
  );
}

// ─── Product Development Simulation ──────────────────────────────────────────

export function ProductDevSim() {
  type Stage = "problem" | "research" | "idea" | "prototype" | "test" | "launch";
  const stages: { key: Stage; label: string; icon: string }[] = [
    { key: "problem", label: "Problem", icon: "🔍" },
    { key: "research", label: "Research", icon: "📊" },
    { key: "idea", label: "Idea", icon: "💡" },
    { key: "prototype", label: "Prototype", icon: "🔧" },
    { key: "test", label: "Test", icon: "🧪" },
    { key: "launch", label: "Launch", icon: "🚀" },
  ];
  const [current, setCurrent] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");

  const stageQuestions: Record<Stage, { q: string; options: string[] }> = {
    problem: { q: "What problem are you solving?", options: ["Students can't find study groups", "Campus food is always cold", "Parking is impossible to find"] },
    research: { q: "How will you validate the problem?", options: ["Survey 50 students", "Interview 10 people", "Observe behavior for a week"] },
    idea: { q: "What's your solution approach?", options: ["Mobile app", "Web platform", "Physical product + app"] },
    prototype: { q: "What's your MVP scope?", options: ["One core feature only", "Three features minimum", "Full product vision"] },
    test: { q: "How will you measure success?", options: ["10 active daily users", "80% would recommend", "Users pay for it"] },
    launch: { q: "What's your launch strategy?", options: ["Soft launch to friends", "Campus-wide announcement", "Paid marketing campaign"] },
  };

  const advance = () => {
    if (current < stages.length - 1) {
      setCurrent(current + 1);
      setFeedback("");
    } else {
      setFeedback("🎉 Product development cycle complete! You've gone from problem to launch.");
    }
  };

  const selectOption = (opt: string) => {
    setDecisions({ ...decisions, [stages[current].key]: opt });
    const feedbacks = [
      "Good — a clearly defined problem is the foundation of every successful product.",
      "Smart — direct user research beats assumptions every time.",
      "Interesting — consider which approach fastest validates your hypothesis.",
      "Wise — start small, learn fast, iterate based on evidence.",
      "Clear metrics prevent vanity numbers and keep you honest.",
      "Strategic — match your launch energy to your confidence level.",
    ];
    setFeedback(feedbacks[current]);
  };

  return (
    <SimulationContainer title="Product Development Simulator" subtitle="Walk through the product development lifecycle" badge="Simulation" accent="#c2317e">
      <div className="space-y-4">
        {/* Stage Progress */}
        <div className="flex items-center justify-between">
          {stages.map((s, i) => (
            <div key={s.key} className="flex flex-col items-center gap-1">
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm transition-all",
                i < current ? "border-se bg-se-soft" : i === current ? "border-di bg-di-soft scale-110" : "border-line bg-paper",
              )}>
                {i < current ? "✓" : s.icon}
              </div>
              <span className="font-mono text-[8px] uppercase tracking-wider text-mute">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Current Stage */}
        <div className="rounded-lg border-1.5 border-line bg-paper/50 p-4">
          <div className="lbl">Stage: {stages[current].label}</div>
          <p className="text-sm font-semibold">{stageQuestions[stages[current].key].q}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {stageQuestions[stages[current].key].options.map((opt) => (
              <button
                key={opt}
                onClick={() => selectOption(opt)}
                className={cn(
                  "rounded-lg border-2 px-3 py-2 text-left text-[13px] transition-all",
                  decisions[stages[current].key] === opt ? "border-di bg-di-soft font-semibold" : "border-line bg-card hover:border-di/50",
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="rounded-md border-l-4 border-di bg-di-soft/40 px-4 py-3">
            <p className="text-[13px] leading-relaxed">{feedback}</p>
          </div>
        )}

        <button
          onClick={advance}
          disabled={!decisions[stages[current].key]}
          className="btn btn-sm btn-dark"
        >
          {current < stages.length - 1 ? "Next Stage →" : "Complete ✓"}
        </button>
      </div>
    </SimulationContainer>
  );
}

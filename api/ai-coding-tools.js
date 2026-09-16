export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const requestedProvider = req.body?.provider === "deepseek" ? "deepseek" : "openai";
  const provider = process.env.AI_PROVIDER === "deepseek" || requestedProvider === "deepseek" ? "deepseek" : "openai";
  const apiKey = provider === "deepseek" ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: `${provider === "deepseek" ? "DEEPSEEK_API_KEY" : "OPENAI_API_KEY"} is not configured` });
  }

  try {
    const { scenario, request, selectedSteps, missingSteps, mode, privacyRisk } = req.body ?? {};
    const prompt = [
      `Scenario: ${scenario || "AI coding workflow"}`,
      `Task: ${request || "Help with a coding task"}`,
      `Learner mode: ${mode || "Beginner"}`,
      `Selected workflow steps: ${(selectedSteps || []).join(", ") || "none"}`,
      `Missing workflow steps: ${(missingSteps || []).join(", ") || "none"}`,
      `Privacy risk flagged: ${privacyRisk ? "yes" : "no"}`,
      "",
      "Respond with:",
      "1. A short assistant output for this coding workflow.",
      "2. One safety/review reminder.",
      "3. One next action the learner should take.",
    ].join("\n");

    const response = provider === "deepseek" ? await callDeepSeek(apiKey, prompt) : await callOpenAI(apiKey, prompt);
    return res.status(200).json({ output: response || "The assistant returned no text.", source: "live", provider });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : "Unexpected server error" });
  }
}

async function callOpenAI(apiKey, prompt) {
  const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        max_output_tokens: 450,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: "You are an AI coding coach for beginner students. Give concise, practical, safe guidance. Never ask for secrets, API keys, passwords, private data, or confidential source code.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "OpenAI request failed");

  return data.output_text || data.output?.flatMap((item) => item.content || [])
    .map((content) => content.text)
    .filter(Boolean)
    .join("\n")
    .trim();
}

async function callDeepSeek(apiKey, prompt) {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-flash",
      messages: [
        {
          role: "system",
          content: "You are an AI coding coach for beginner students. Give concise, practical, safe guidance. Never ask for secrets, API keys, passwords, private data, or confidential source code.",
        },
        { role: "user", content: prompt },
      ],
      stream: false,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "DeepSeek request failed");

  return data.choices?.[0]?.message?.content?.trim();
}

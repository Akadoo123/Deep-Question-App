import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getCategoryById, getRandomCategory, CategoryId } from "@/lib/categories";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function escapeStringNewlines(json: string): string {
  let inString = false;
  let escaped = false;
  let result = "";
  for (let i = 0; i < json.length; i++) {
    const ch = json[i];
    if (escaped) { result += ch; escaped = false; continue; }
    if (ch === "\\" && inString) { result += ch; escaped = true; continue; }
    if (ch === '"') { inString = !inString; result += ch; continue; }
    if (inString && (ch === "\n" || ch === "\r")) { result += "\\n"; continue; }
    result += ch;
  }
  return result;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  let body: { category?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { category: categoryId } = body;

  if (!categoryId || typeof categoryId !== "string") {
    return NextResponse.json({ error: "category is required" }, { status: 400 });
  }

  const validIds: CategoryId[] = [
    "productivity", "mindfulness", "wealth",
    "psychology", "relationships", "purpose", "health", "random",
  ];
  if (!validIds.includes(categoryId as CategoryId)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  let resolvedCategory = getCategoryById(categoryId as CategoryId)!;
  let randomedFrom: string | undefined;

  if (categoryId === "random") {
    resolvedCategory = getRandomCategory();
    randomedFrom = resolvedCategory.label;
  }

  try {
    const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

    const message = await client.messages.create({
      model,
      max_tokens: 1500,
      system: buildSystemPrompt(),
      messages: [
        {
          role: "user",
          content: buildUserPrompt(resolvedCategory, randomedFrom),
        },
      ],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";

    let parsed: {
      question: string;
      perspective: string;
      mental_model: string;
      real_example: string;
      reflection: string;
    };

    try {
      let cleaned = rawText.trim();
      // Strip markdown code fences like ```json ... ``` or ``` ... ```
      cleaned = cleaned.replace(/^```[a-zA-Z]*\s*/g, "").replace(/```\s*$/g, "").trim();

      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");

      const jsonStr = jsonMatch[0];
      try {
        parsed = JSON.parse(jsonStr);
      } catch {
        // Escape literal newlines inside JSON string values, then fix trailing commas
        const fixed = escapeStringNewlines(jsonStr).replace(/,\s*([}\]])/g, "$1");
        parsed = JSON.parse(fixed);
      }

      if (
        !parsed ||
        typeof parsed.question !== "string" ||
        typeof parsed.perspective !== "string" ||
        typeof parsed.mental_model !== "string" ||
        typeof parsed.real_example !== "string" ||
        typeof parsed.reflection !== "string"
      ) {
        throw new Error("Missing fields");
      }
    } catch (parseErr) {
      console.error("Failed to parse AI response:", parseErr, "raw:", rawText);
      return NextResponse.json(
        { error: "AI returned unexpected format. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      category: resolvedCategory.label,
      categoryId: resolvedCategory.id,
      randomedFrom,
      ...parsed,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Anthropic API error:", message);
    return NextResponse.json(
      { error: "Failed to generate insight. Please try again." },
      { status: 502 }
    );
  }
}

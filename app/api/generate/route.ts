import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getCategoryById, getRandomCategory, CategoryId } from "@/lib/categories";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
      tools: [
        {
          name: "generate_insight",
          description: "Generate a deep insight for the given category",
          input_schema: {
            type: "object" as const,
            properties: {
              question: { type: "string", description: "คำถามเชิงลึกที่ไม่ obvious (1–2 ประโยค)" },
              perspective: { type: "string", description: "บทสนทนา/มุมมอง (3–5 ย่อหน้า)" },
              mental_model: { type: "string", description: "Mental Model 1 อัน (2–3 ประโยค)" },
              real_example: { type: "string", description: "ตัวอย่างจากโลกจริง (2–3 ประโยค)" },
              reflection: { type: "string", description: "คำถามสั้นๆ ไว้คิดต่อวันนี้ (1 ประโยค)" },
            },
            required: ["question", "perspective", "mental_model", "real_example", "reflection"],
          },
        },
      ],
      tool_choice: { type: "tool", name: "generate_insight" },
      messages: [
        {
          role: "user",
          content: buildUserPrompt(resolvedCategory, randomedFrom),
        },
      ],
    });

    const toolUse = message.content.find((c) => c.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      return NextResponse.json(
        { error: "AI returned unexpected format. Please try again." },
        { status: 502 }
      );
    }

    const parsed = toolUse.input as {
      question: string;
      perspective: string;
      mental_model: string;
      real_example: string;
      reflection: string;
    };

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

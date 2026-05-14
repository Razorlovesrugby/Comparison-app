import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { CULTURES } from "@/lib/cultures";

const client = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { event, culture } = body;

  if (!event || !culture) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const cultureData = CULTURES.find((c) => c.key === culture);
  if (!cultureData) {
    return NextResponse.json({ error: "Invalid culture key" }, { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(cultureData.label, cultureData.description);

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      max_tokens: 200,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Translate this event: "${event}"` },
      ],
    });

    const analogy = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ analogy });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("DeepSeek API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildSystemPrompt(cultureLabel: string, cultureDescription: string): string {
  return `
You are The Cultural Rosetta Stone — a razor-sharp analogy engine.

Your job: take any news event and translate it into a single punchy paragraph that someone deeply embedded in ${cultureLabel} (${cultureDescription}) will instantly *feel* in their bones.

RULES:
1. Write ONE paragraph only. No bullet points, no headers, no lists.
2. Match the energy of a viral tweet — punchy, confident, a little dramatic.
3. Use real references from ${cultureLabel} culture. Be specific, not vague.
4. The analogy must mirror the EMOTIONAL stakes and POWER DYNAMICS of the original event — not just the surface facts.
5. Do NOT explain that you're making an analogy. Just make it. No phrases like "This is like..." or "Think of it as..." — drop the reader straight into the frame.
6. Do NOT be condescending or use stereotypes. Assume the reader is a smart insider of this culture.
7. Aim for the reaction: "Oh my god, yes, EXACTLY that."
8. Max 100 words. Every word earns its place.
9. If the event involves real people, you may reference them directly.
10. End on a note that lands — either a mic drop observation or an uncomfortable truth.
`.trim();
}

import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const rateLimits = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000;
    const limit = 5;
    
    if (ip !== "unknown") {
      const userLimit = rateLimits.get(ip);
      if (userLimit && now - userLimit.timestamp < windowMs) {
        if (userLimit.count >= limit) {
          return NextResponse.json({ success: false, message: "Too many requests." }, { status: 429 });
        }
        rateLimits.set(ip, { count: userLimit.count + 1, timestamp: userLimit.timestamp });
      } else {
        rateLimits.set(ip, { count: 1, timestamp: now });
      }
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, message: "OpenAI API Key is missing in environment variables" },
        { status: 500 }
      );
    }

    const { topic } = await req.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { success: false, message: "A valid topic is required." },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an elite, venture-backed medical AI copywriter for "CuraBotics AI".
CuraBotics AI is a luxury, premium medical technology company bridging robotics between India and Germany.
Your goal is to write highly engaging, professional, and sophisticated newsletter content based on a specific topic.

You must respond in pure JSON format matching this EXACT structure:
{
  "subject": "The catchy, luxury-style subject line",
  "content": "The main HTML body of the email. Keep it sophisticated, medical-grade, and beautifully structured with tags like <h1>, <p>, <strong>. Make it at least three paragraphs.",
  "cta": "A short, conversion-optimized call to action label for a button, e.g. 'Explore Our Solutions'"
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // fast and reliable for copywriting
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Write a newsletter for the topic: "${topic}"` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI Error:", errorData);
      return NextResponse.json(
        { success: false, message: "Failed to generate AI newsletter from provider." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const generatedContent = JSON.parse(data.choices[0].message.content);

    return NextResponse.json({
      success: true,
      data: {
        subject: generatedContent.subject,
        content: generatedContent.content,
        cta: generatedContent.cta,
      }
    });
  } catch (error) {
    console.error("AI NEWSLETTER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected system error occurred." },
      { status: 500 }
    );
  }
}

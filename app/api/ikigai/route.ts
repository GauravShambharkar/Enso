import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Groq from "groq-sdk";
import { env } from "@/config/env.config";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { love, goodAt, worldNeeds, paidFor } = await req.json();

    if (!love || !goodAt || !worldNeeds || !paidFor) {
      return NextResponse.json(
        { error: "Please fill out all fields" },
        { status: 400 },
      );
    }

    const apiKey = env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key not configured on server" },
        { status: 500 },
      );
    }

    const groq = new Groq({ apiKey });

    const prompt = `
You are an expert life coach and philosopher specializing in the Japanese concept of Ikigai (reason for being).
The user has submitted their answers to the 4 pillars of Ikigai:
1. WHAT YOU LOVE (Passion): ${love}
2. WHAT YOU ARE GOOD AT (Profession/Vocation): ${goodAt}
3. WHAT THE WORLD NEEDS (Mission): ${worldNeeds}
4. WHAT YOU CAN BE PAID FOR (Profession/Vocation): ${paidFor}

Synthesize these inputs and provide a clear, comprehensive analysis of their potential Ikigai.
Address the user directly in the second person ("you", "your", "yourself"). Do NOT use third-person pronouns (they, their, them, he, she).
Structure your response in JSON format matching the following schema. Make sure to return ONLY valid JSON:
{
  "ikigaiSummary": "A concise, powerful synthesis sentence defining your core purpose.",
  "analysis": {
    "passion": "Analysis of the intersection of what you love and what you are good at.",
    "mission": "Analysis of the intersection of what you love and what the world needs.",
    "vocation": "Analysis of the intersection of what the world needs and what you can be paid for.",
    "profession": "Analysis of the intersection of what you are good at and what you can be paid for."
  },
  "actionableSteps": [
    "Step 1 to start aligning your life with this Ikigai",
    "Step 2...",
    "Step 3..."
  ],
  "potentialObstacles": [
    "Potential challenge or distraction you might face",
    "Another challenge..."
  ]
}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert Ikigai strategist. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response content from AI provider");
    }

    const parsedData = JSON.parse(content);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Ikigai API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate Ikigai" },
      { status: 500 },
    );
  }
}

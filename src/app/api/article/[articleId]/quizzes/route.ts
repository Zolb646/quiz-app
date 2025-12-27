import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import extractJson from "@/app/_utils/extractJSON";

const bodySchema = z.object({
  numQuestions: z.number().min(1).max(10).optional(),
});

const quizSchema = z.array(
  z.object({
    question: z.string(),
    options: z.array(z.string()).length(4),
    answer: z.union([
      z.number().int().min(0).max(3),
      z.string().regex(/^[0-3]$/),
    ]),
  })
);

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const MAX_QUIZZES = 5;

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ articleId: string }> }
) {
  try {
    const { articleId } = await context.params;

    const body = bodySchema.parse(await req.json());
    const requested = body.numQuestions ?? MAX_QUIZZES;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const existingQuizzes = await prisma.quiz.findMany({
      where: { articleId },
    });

    if (existingQuizzes.length >= MAX_QUIZZES) {
      return NextResponse.json({ quizzes: existingQuizzes });
    }

    const remaining = Math.min(MAX_QUIZZES - existingQuizzes.length, requested);

    if (remaining <= 0) {
      return NextResponse.json({ quizzes: existingQuizzes });
    }

    const prompt = `Generate ${remaining} multiple choice questions based on this article:

${article.content}

Return the response in this exact JSON format:
[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "0"
  }
]

Rules:
- The response MUST be valid JSON
- "answer" MUST be the index (0-3) of the correct option
- Do NOT include explanations
`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error("Empty AI response");
    }

    const parsed = extractJson(response.text);
    const quizzes = quizSchema.parse(parsed);

    const savedQuizzes = await prisma.$transaction(
      quizzes.map((q) => {
        const answerIndex =
          typeof q.answer === "string" ? Number(q.answer) : q.answer;

        return prisma.quiz.create({
          data: {
            question: q.question,
            options: q.options,
            answer: q.options[answerIndex],
            articleId,
          },
        });
      })
    );

    return NextResponse.json({
      quizzes: [...existingQuizzes, ...savedQuizzes],
    });
  } catch (err: unknown) {
    console.error("QUIZ GEN ERROR:", err);

    const message =
      err instanceof Error
        ? err.message.toLowerCase()
        : String(err).toLowerCase();

    // Gemini quota / rate limit
    if (
      message.includes("quota") ||
      message.includes("rate") ||
      message.includes("limit")
    ) {
      return NextResponse.json(
        { error: "Gemini API quota exceeded" },
        { status: 429 }
      );
    }

    // Invalid or missing API key
    if (
      message.includes("api key") ||
      message.includes("permission") ||
      message.includes("unauthorized")
    ) {
      return NextResponse.json(
        { error: "Invalid or missing Gemini API key" },
        { status: 403 }
      );
    }

    // Zod validation error
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Fallback
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

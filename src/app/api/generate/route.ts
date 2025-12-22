import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const bodySchema = z.object({
  numQuestions: z.number().min(1).max(10).optional(),
});

const quizSchema = z.array(
  z.object({
    question: z.string(),
    options: z.array(z.string()).length(4),
    answer: z.string().regex(/^[0-3]$/),
  })
);

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { articleId: string } }
) {
  try {
    const { articleId } = params;
    const body = bodySchema.parse(await req.json());
    const numQuestions = body.numQuestions ?? 5;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const content = article.summary || article.content;

    const prompt = `Generate ${numQuestions} multiple choice questions based on this article:
${content}

Return the response in this exact JSON format:
[
  {
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "0"
  }
]

Make sure the response is valid JSON and the answer is the index (0-3) of the correct option.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response.text) {
      throw new Error("Empty AI response");
    }

    const parsed = JSON.parse(response.text);
    const quizzes = quizSchema.parse(parsed);

    const savedQuizzes = await prisma.$transaction(
      quizzes.map((q) => {
        const answerIndex = Number(q.answer);

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

    return NextResponse.json({ quizzes: savedQuizzes });
  } catch (err: any) {
    console.error("QUIZ GEN ERROR:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}

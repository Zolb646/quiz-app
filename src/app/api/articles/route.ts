import prisma from "../../../lib/prisma";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const ArticleSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(20),
});

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const data = ArticleSchema.parse(body);
    const session = await auth();

    const user = await prisma.user.findUnique({
      where: { clerkId: session.userId! },
    });

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const res = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize the following text in 3 or 4 sentences:\n\n${data.content}`,
    });

    const article = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        summary: res.text ?? "",
        userId: user.id,
      },
    });

    return new Response(JSON.stringify({ article }), { status: 201 });
  } catch (error: unknown) {
    console.error("API Error:", error);

    // Narrow the type
    const errMsg =
      error instanceof Error
        ? error.message.toLowerCase()
        : JSON.stringify(error).toLowerCase();

    // 🚫 Gemini quota / rate limit
    if (
      errMsg.includes("quota") ||
      errMsg.includes("rate") ||
      errMsg.includes("limit")
    ) {
      return NextResponse.json(
        { error: "Gemini API quota exceeded" },
        { status: 429 }
      );
    }

    // 🔑 Invalid or missing API key
    if (
      errMsg.includes("api key") ||
      errMsg.includes("permission") ||
      errMsg.includes("unauthorized")
    ) {
      return NextResponse.json(
        { error: "Invalid or missing Gemini API key" },
        { status: 403 }
      );
    }

    // ❌ Zod validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const session = await auth();

    const user = await prisma.user.findUnique({
      where: { clerkId: session.userId! },
    });
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const articles = await prisma.article.findMany({
      where: { userId: user.id },
      include: {
        quizzes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const now = new Date();

    const today: typeof articles = [];
    const yesterday: typeof articles = [];
    const last7Days: typeof articles = [];
    const last30Days: typeof articles = [];
    const byMonth: Record<string, typeof articles> = {};

    articles.forEach((article) => {
      const createdAt = new Date(article.createdAt);
      const diffDays =
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        today.push(article);
      } else if (diffDays < 2) {
        yesterday.push(article);
      } else if (diffDays <= 7) {
        last7Days.push(article);
      } else if (diffDays <= 30) {
        last30Days.push(article);
      } else {
        // When diffdays are older than 30 it will show that month and year
        const monthKey = createdAt.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });

        if (!byMonth[monthKey]) {
          byMonth[monthKey] = [];
        }
        byMonth[monthKey].push(article);
      }
    });

    return NextResponse.json(
      { today, yesterday, last7Days, last30Days, byMonth },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

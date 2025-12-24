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

    const res = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize the following text in 3 or 4 sentences:\n\n${data.content}`,
    });

    const article = await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        summary: res.text ?? "",
        userId: user?.id!,
      },
    });

    return new Response(JSON.stringify({ article }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const GET = async () => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        quizzes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const now = new Date();

    const yesterday: typeof articles = [];
    const last7Days: typeof articles = [];
    const last30Days: typeof articles = [];

    articles.forEach((article) => {
      const diffDays =
        (now.getTime() - new Date(article.createdAt).getTime()) /
        (1000 * 60 * 60 * 24);

      if (diffDays < 1) {
        yesterday.push(article);
      } else if (diffDays <= 7) {
        last7Days.push(article);
      } else if (diffDays <= 30) {
        last30Days.push(article);
      }
    });

    return NextResponse.json(
      { yesterday, last7Days, last30Days },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

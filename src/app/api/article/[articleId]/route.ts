import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    articleId: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { articleId } = await params;

    const article = await prisma.article.findUnique({
      where: { id: articleId },
      include: { quizzes: true },
    });

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.articleId },
      include: { quizzes: true },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch article" },
      { status: 500 }
    );
  }
}

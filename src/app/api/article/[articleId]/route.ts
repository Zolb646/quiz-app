import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const POST = async (
  req: Request,
  { params }: { params: { articleId: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const article = await prisma.article.updateMany({
      where: {
        id: params.articleId,
        userId,
      },
      data: body,
    });

    if (!article.count) {
      return new Response("Article not found", { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

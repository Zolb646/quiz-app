import prisma from "../../../lib/prisma";

export const POST = async (req: Request) => {
  const article = await prisma.article.create({
    data: await req.json(),
  });
  return new Response(JSON.stringify({ article }), { status: 201 });
};

export const GET = async (req: Request) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        quizzes: true,
      },
    });
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

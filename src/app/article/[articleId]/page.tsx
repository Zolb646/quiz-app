import ArticleClient from "@/app/_features/articleClient";

type PageProps = {
  params: Promise<{
    articleId: string;
  }>;
};

export default async function ArticlePage({ params }: PageProps) {
  const { articleId } = await params;

  return <ArticleClient articleId={`${articleId}`} />;
}

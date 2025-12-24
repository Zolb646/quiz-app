type PageProps = {
  params: {
    articleId: string;
  };
};

export default async function ArticlePage({ params }: PageProps) {
  const articleId = params.articleId;

  return;
  //   <ArticleClient article={article} />;
}

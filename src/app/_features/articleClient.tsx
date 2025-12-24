"use client";

import { useEffect, useState } from "react";
import { useArticle } from "../_context/articleContext";

type ArticleClientProps = {
  articleId: string;
};

export default function ArticleClient({ articleId }: ArticleClientProps) {
  const { setArticle } = useArticle();
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${articleId}`);
        if (!res.ok) throw new Error("Failed to fetch article");

        const data = await res.json();
        setArticle(data);
        setArticleLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, [articleId, setArticle]);

  if (!articleLoaded) return <div>Loading...</div>;

  // Step 1 = summary, Step 2 = quizzes
  return;
  //   step === 1 ? (
  //     <SummarySection setStep={setStep} />
  //   ) : (
  //     <QuizSection setStep={setStep} />
  //   );
}

"use client";

import { useEffect, useState } from "react";
import { useArticle } from "../_context/articleContext";
import { SummarySection } from "../_components/summarySection";
import { useStep } from "../_context/stepContext";
import { AppShell } from "../_components/appShell";
import { QuizSection } from "../_components/quizSection";
import { QuizResultSection } from "../_components/quizResultSection";

type ArticleClientProps = {
  articleId: string;
};

export default function ArticleClient({ articleId }: ArticleClientProps) {
  const { setArticle } = useArticle();
  const [articleLoaded, setArticleLoaded] = useState(false);
  const { step, setStep } = useStep();

  useEffect(() => {
    setStep(0);
  }, [setStep]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/article/${articleId}`);
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

  if (!articleLoaded) return <AppShell>Loading...</AppShell>;

  return (
    <AppShell>
      {step === 0 && <SummarySection />}
      {step === 1 && <QuizSection />}
      {step === 2 && <QuizResultSection />}
    </AppShell>
  );
}

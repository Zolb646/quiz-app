"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";
import { useArticle } from "../_context/articleContext";
import { useRouter } from "next/navigation";
import { useQuiz } from "../_context/quizContext";

type Article = {
  id?: string;
  title: string;
  content: string;
  summary: string;
};

type HistoryResponse = {
  today: Article[];
  yesterday: Article[];
  last7Days: Article[];
  last30Days: Article[];
  byMonth: Record<string, Article[]>;
};

type SideBarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideBar = ({ open, setOpen }: SideBarProps) => {
  const [history, setHistory] = useState<HistoryResponse>({
    today: [],
    yesterday: [],
    last7Days: [],
    last30Days: [],
    byMonth: {},
  });
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingArticle, setPendingArticle] = useState<Article | null>(null);
  const { setArticle, article } = useArticle();
  const { isQuizActive, resetQuiz } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [article]);

  const navigateToArticle = (article: Article) => {
    setArticle(article);
    router.push(`/article/${article.id}`);
    setOpen(false);
  };

  const handleSelectArticle = (article: Article) => {
    if (isQuizActive) {
      setPendingArticle(article);
      setShowConfirm(true);
      return;
    }
    navigateToArticle(article);
  };

  return (
    <>
      <div
        className={`h-full bg-white py-5 flex flex-col transition-all duration-200
        ${open ? "w-64 px-4" : "w-16 items-center"}
        sm:px-4`}
      >
        {!open && (
          <button onClick={() => setOpen(true)}>
            <LuPanelLeftOpen className="size-6" />
          </button>
        )}

        {open && (
          <div className="w-full h-full flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">History</h1>
              <button onClick={() => setOpen(false)}>
                <LuPanelLeftClose className="size-6" />
              </button>
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto">
              {loading ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-24" />
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-8 w-full rounded-md" />
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {history?.today?.length > 0 && (
                    <Section
                      title="Today"
                      articles={history?.today}
                      onSelect={handleSelectArticle}
                    />
                  )}
                  {history?.yesterday?.length > 0 && (
                    <Section
                      title="Yesterday"
                      articles={history?.yesterday}
                      onSelect={handleSelectArticle}
                    />
                  )}
                  {history?.last7Days.length > 0 && (
                    <Section
                      title="Last 7 Days"
                      articles={history.last7Days}
                      onSelect={handleSelectArticle}
                    />
                  )}
                  {history?.last30Days.length > 0 && (
                    <Section
                      title="Last 30 Days"
                      articles={history.last30Days}
                      onSelect={handleSelectArticle}
                    />
                  )}
                  {Object.entries(history.byMonth).map(([month, articles]) => (
                    <Section
                      key={month}
                      title={month}
                      articles={articles}
                      onSelect={handleSelectArticle}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You are currently in the middle of a quiz. Leaving now will reset
              your progress.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pendingArticle) return;
                resetQuiz();
                navigateToArticle(pendingArticle);
                setPendingArticle(null);
              }}
            >
              Leave quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

type SectionProps = {
  title: string;
  articles: Article[];
  onSelect: (article: Article) => void;
};

const Section = ({ title, articles, onSelect }: SectionProps) => (
  <section className="flex flex-col gap-2">
    <p className="text-sm text-zinc-500">{title}</p>
    {articles.map((article) => (
      <Button
        key={article.id}
        variant="ghost"
        className="justify-start px-2"
        onClick={() => onSelect(article)}
      >
        {article.title}
      </Button>
    ))}
  </section>
);

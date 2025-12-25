"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderTitle } from "./headerTitle";
import { Label } from "@/components/ui/label";
import { BsBook } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SummaryDialogContent } from "./summaryDialogContent";
import { FaAngleLeft } from "react-icons/fa";
import { useArticle } from "../_context/articleContext";
import { useQuiz } from "../_context/quizContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStep } from "../_context/stepContext";
import { usePathname } from "next/navigation";
import { FiFileText } from "react-icons/fi";

export const SummarySection = () => {
  const { article } = useArticle();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setQuizzes, setCurrentIndex, setSelectedOption, setScore } =
    useQuiz();
  const { nextStep } = useStep();
  const pathname = usePathname();
  const isArticlePage = pathname.startsWith("/article/");

  const handleTakeQuiz = async () => {
    if (!article?.id) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/article/${article.id}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numQuestions: 5 }),
      });

      const data = await res.json();

      nextStep();

      setQuizzes(data.quizzes ?? []);
      setCurrentIndex(0);
      setSelectedOption(null);
      setScore(0);
    } catch (err) {
      console.error("Failed to load quizzes", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className="mb-6"
        onClick={() => router.push(`/`)}
      >
        <FaAngleLeft className="size-5" />
      </Button>

      <Card className="w-3xl max-h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>
            <HeaderTitle title="" />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden mt-3">
          <Label className="flex gap-2 items-center">
            <BsBook className="size-4" />
            <span className="text-zinc-500">Summary Content</span>
          </Label>

          <h1 className="mt-2 font-bold text-2xl">{article?.title}</h1>

          <p className="mt-2 text-sm text-zinc-600 line-clamp-10">
            {article?.summary}
          </p>

          {isArticlePage && (
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="article-title"
                  className="font-medium flex items-center"
                >
                  <FiFileText />
                  <span className="ml-1 text-[#71717a]">Article Title</span>
                </Label>
              </div>

              <p className="mt-2 text-sm text-zinc-700 line-clamp-6 whitespace-pre-line">
                {article?.content}
              </p>
              <div className="w-full flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-semibold text-sm"
                    >
                      See more
                    </Button>
                  </DialogTrigger>
                  <SummaryDialogContent />
                </Dialog>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-between">
          {!isArticlePage && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">See Content</Button>
              </DialogTrigger>
              <SummaryDialogContent />
            </Dialog>
          )}

          <Button onClick={handleTakeQuiz} disabled={loading}>
            {loading ? "Preparing quiz..." : "Take a quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

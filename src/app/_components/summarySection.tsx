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
import { toast } from "react-toastify";

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

      if (!res.ok) {
        if (res.status === 429) {
          toast.error("Gemini API quota exceeded. Please try again later.");
        } else {
          toast.error(data?.error || "Failed to load quizzes.");
        }
        return;
      }

      setQuizzes(data.quizzes ?? []);
      setCurrentIndex(0);
      setSelectedOption(null);
      setScore(0);
      nextStep();
    } catch (err: unknown) {
      console.error("Failed to load quizzes", err);
      const message = err instanceof Error ? err.message : JSON.stringify(err);
      toast.error(`Network error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-full">
      {/* Back button */}
      <Button
        variant="outline"
        size="icon"
        className="mb-4 sm:mb-6"
        onClick={() => router.push(`/`)}
      >
        <FaAngleLeft className="w-5 h-5" />
      </Button>

      <Card className="w-full max-w-xl sm:max-w-3xl lg:max-w-4xl mx-auto flex flex-col max-h-max">
        <CardHeader>
          <CardTitle>
            <HeaderTitle title="" />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto mt-3 h-fit">
          <Label className="flex gap-2 items-center text-sm sm:text-base">
            <BsBook className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-zinc-500">Summary Content</span>
          </Label>

          <h1 className="mt-2 font-bold text-lg sm:text-xl lg:text-2xl">
            {article?.title}
          </h1>

          <p className="mt-2 text-xs sm:text-sm lg:text-base text-zinc-600">
            {article?.summary}
          </p>

          {isArticlePage && (
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <Label
                  htmlFor="article-title"
                  className="font-medium flex items-center text-sm sm:text-base"
                >
                  <FiFileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="ml-1 text-zinc-400">Article Title</span>
                </Label>
              </div>

              <p className="mt-2 text-xs sm:text-sm lg:text-base text-zinc-700 line-clamp-6 whitespace-pre-line">
                {article?.content}
              </p>

              <div className="w-full flex justify-end mt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-semibold text-sm sm:text-base"
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

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          {!isArticlePage && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  See Content
                </Button>
              </DialogTrigger>
              <SummaryDialogContent />
            </Dialog>
          )}

          <Button
            onClick={handleTakeQuiz}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Preparing quiz..." : "Take a quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

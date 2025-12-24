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

type HomeSectionProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const SummarySection = ({ setStep }: HomeSectionProps) => {
  const { article } = useArticle();
  const { setQuizzes, setCurrentIndex, setSelectedOption, setScore } =
    useQuiz();

  const [loading, setLoading] = useState(false);

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

      setQuizzes(data.quizzes ?? []);
      setCurrentIndex(0);
      setSelectedOption(null);
      setScore(0);

      setStep(3); // 👉 QuizSection step
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
        onClick={() => setStep(1)}
      >
        <FaAngleLeft className="size-5" />
      </Button>

      <Card className="w-3xl max-h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>
            <HeaderTitle title="" />
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-hidden">
          <Label className="flex gap-2 items-center">
            <BsBook className="size-4" />
            <span className="text-zinc-500">Summary Content</span>
          </Label>

          <h1 className="mt-2 font-bold text-2xl">{article?.title}</h1>

          <p className="mt-2 text-sm text-zinc-600 line-clamp-10">
            {article?.summary}
          </p>
        </CardContent>

        <CardFooter className="justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">See Content</Button>
            </DialogTrigger>
            <SummaryDialogContent />
          </Dialog>

          <Button onClick={handleTakeQuiz} disabled={loading}>
            {loading ? "Preparing quiz..." : "Take a quiz"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

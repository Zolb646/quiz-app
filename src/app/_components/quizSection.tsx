"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderTitle } from "./headerTitle";
import { Button } from "@/components/ui/button";
import { FiX } from "react-icons/fi";
import { useArticle } from "../_context/articleContext";
import { useEffect, useState } from "react";
import { useQuiz } from "../_context/quizContext";

type HomeSectionProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const QuizSection = ({ setStep }: HomeSectionProps) => {
  const { article } = useArticle();

  const {
    quizzes,
    setQuizzes,
    setCurrentIndex,
    setSelectedOption,
    setScore,
    selectedOption,
    currentIndex,
    score,
  } = useQuiz();
  const [loading, setLoading] = useState(true);
  const [loadedQuizzes, setLoadedQuizzes] = useState(false);
  useEffect(() => {
    if (!article?.id) return;

    const generateQuizzes = async () => {
      if (loadedQuizzes) return;
      try {
        setLoading(true);
        setCurrentIndex(0);
        setSelectedOption(null);
        setScore(0);

        const res = await fetch(`/api/article/${article.id}/quizzes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ numQuestions: 5 }),
        });

        const data = await res.json();
        setQuizzes(data.quizzes ?? []);
        setLoadedQuizzes(true);
        console.log(data, "data");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    generateQuizzes();
  }, []);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const updatedQuizzes = [...quizzes];
    updatedQuizzes[currentIndex] = {
      ...updatedQuizzes[currentIndex],
      selectedOption, // save user answer here
    };
    setQuizzes(updatedQuizzes);

    // check correctness
    if (selectedOption === updatedQuizzes[currentIndex].answer) {
      setScore((prev) => prev + 1);
    }

    // move to next
    if (currentIndex + 1 < updatedQuizzes.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setStep(4); // finish
    }
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (!quizzes.length) return <p>No quizzes</p>;

  const currentQuiz = quizzes[currentIndex];

  return (
    <Card className="bg-[#f0f2f5] shadow-none border-none relative w-full max-w-3xl mx-auto">
      <CardHeader>
        <div>
          <CardTitle className="text-3xl font-bold text-center">
            <HeaderTitle title="Quick Test" />
          </CardTitle>
          <CardDescription className="text-base">
            Take a quick test about your knowledge from your content
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 right-6 border bg-white"
          onClick={() => setStep(1)}
        >
          <FiX />
        </Button>
      </CardHeader>

      <CardContent className="bg-white border rounded-lg p-7 shadow-lg mx-6">
        <div className="flex items-start justify-between w-full mb-4 gap-4">
          <h1 className="text-xl font-medium flex-1 wrap-break-words">
            {currentQuiz.question}
          </h1>
          <p className="text-xl shrink-0 whitespace-nowrap">
            {currentIndex + 1}
            <span className="text-base text-zinc-500"> / {quizzes.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-5">
          {currentQuiz.options.map((option) => (
            <Button
              key={option}
              onClick={() => setSelectedOption(option)}
              variant={selectedOption === option ? "default" : "outline"}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="pt-5">
          <Button
            onClick={handleSubmit}
            variant="outline"
            disabled={!selectedOption}
          >
            {currentIndex + 1 < quizzes.length ? "Next" : "Finish"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

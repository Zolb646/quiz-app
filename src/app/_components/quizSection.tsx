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
import { useQuiz } from "../_context/quizContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useStep } from "../_context/stepContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export const QuizSection = () => {
  const {
    quizzes,
    setQuizzes,
    setCurrentIndex,
    setSelectedOption,
    setScore,
    currentIndex,
    setShowResults,
  } = useQuiz();

  const { nextStep, setStep } = useStep();
  const [isLoading, setIsLoading] = useState(false);

  if (!quizzes.length) {
    return <p className="text-center">No quizzes available</p>;
  }

  const currentQuiz = quizzes[currentIndex];

  const handleAnswerSelect = (option: string) => {
    setIsLoading(true);
    const updatedQuizzes = [...quizzes];

    updatedQuizzes[currentIndex] = {
      ...updatedQuizzes[currentIndex],
      selectedOption: option,
    };

    setQuizzes(updatedQuizzes);

    if (option === currentQuiz.answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < updatedQuizzes.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResults(false);
        nextStep();
      }
      setIsLoading(false);
    }, 200);
  };

  return (
    <Card className="bg-[#f0f2f5] shadow-none border-none relative w-full max-w-3xl mx-auto sm:mx-4">
      <CardHeader className="relative">
        <div className="text-center sm:text-left flex flex-col max-sm:gap-2">
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            <HeaderTitle title="Quick Test" />
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Take a quick test about your knowledge from your content
          </CardDescription>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 border bg-white"
            >
              <FiX />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                If you cancel, this quiz will restart from the beginning.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Go back</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setScore(0);
                  setStep(0);
                }}
              >
                Cancel Quiz
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent className="bg-white border rounded-lg p-5 sm:p-7 shadow-lg mx-2 sm:mx-6 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-4 gap-2 sm:gap-4">
          <h1 className="text-lg sm:text-xl font-medium wrap-break-words flex-1">
            {currentQuiz.question}
          </h1>
          <p className="text-lg sm:text-xl shrink-0 whitespace-nowrap">
            {currentIndex + 1}
            <span className="text-base text-zinc-500"> / {quizzes.length}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
          {currentQuiz.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              variant="outline"
              className="h-full w-full transition-transform duration-200 hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg active:translate-y-0 active:shadow-md"
            >
              <p className="wrap-break-words whitespace-normal text-sm sm:text-base">
                {option}
              </p>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

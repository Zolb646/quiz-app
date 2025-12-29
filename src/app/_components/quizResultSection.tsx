"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderTitle } from "./headerTitle";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FiXCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { RxReload } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa6";
import { useQuiz } from "../_context/quizContext";
import { useStep } from "../_context/stepContext";

export const QuizResultSection = () => {
  const {
    quizzes,
    score,
    setCurrentIndex,
    setSelectedOption,
    setScore,
    setQuizzes,
  } = useQuiz();
  const { setStep, prevStep } = useStep();

  const results = quizzes.map((q) => ({
    question: q.question,
    userAnswer: q.selectedOption ?? "",
    correctAnswer: q.answer,
  }));

  // 🔁 Retake without regenerating
  const handleRetake = () => {
    const resetQuizzes = quizzes.map((q) => ({
      ...q,
      selectedOption: "",
    }));

    setQuizzes(resetQuizzes);
    setCurrentIndex(0);
    setSelectedOption("");
    setScore(0);

    prevStep();
  };

  // 📌 Leave quiz safely
  const handleSaveAndLeave = () => {
    setCurrentIndex(0);
    setSelectedOption("");
    setScore(0);

    // OPTIONAL:
    // If you want to completely clear quiz state, uncomment:
    // setQuizzes([]);

    setStep(0); // Back to article / summary
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto flex flex-col px-4 sm:px-6">
      <HeaderTitle title="Quiz Completed" />
      <p className="text-gray-600 mt-2 font-medium text-sm sm:text-base">
        Let’s see what you did
      </p>

      <Card className="mt-6">
        <CardHeader className="flex flex-col sm:flex-row items-baseline sm:items-center gap-2.5">
          <CardTitle className="text-xl sm:text-2xl">
            Your score: {score} / {quizzes.length}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {results.map((res, idx) => {
            const isCorrect = res.userAnswer === res.correctAnswer;

            return (
              <div key={idx} className="flex items-start sm:items-center gap-3">
                {isCorrect ? (
                  <HiOutlineCheckCircle className="text-green-500 w-7 h-7 shrink-0" />
                ) : (
                  <FiXCircle className="text-red-500 w-7 h-7 shrink-0" />
                )}

                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-zinc-500 text-sm sm:text-base wrap-break-words">
                    {idx + 1}. {res.question}
                  </p>

                  <p className="font-medium wrap-break-words text-sm sm:text-base">
                    Your answer: {res.userAnswer || "No answer"}
                  </p>

                  {!isCorrect && (
                    <p className="text-sm sm:text-base text-green-500 wrap-break-words">
                      Correct answer: {res.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="gap-3 flex flex-col sm:flex-row mt-4">
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={handleRetake}
          >
            <RxReload className="w-4 h-4 mr-1" />
            Retake Quiz
          </Button>

          <Button className="w-full sm:w-auto" onClick={handleSaveAndLeave}>
            <FaRegBookmark className="w-4 h-4 mr-1" />
            Save and Leave
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

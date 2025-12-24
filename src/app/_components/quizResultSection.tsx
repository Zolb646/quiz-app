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

export const QuizResultSection = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { quizzes, score } = useQuiz();

  const results = quizzes.map((q) => ({
    question: q.question,
    userAnswer: q.selectedOption ?? "",
    correctAnswer: q.answer,
  }));
  return (
    <div className="min-w-md max-w-lg flex flex-col">
      <HeaderTitle title="Quiz Completed" />
      <p className="text-gray-600 mt-2 font-medium">Let’s see what you did</p>
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-baseline gap-2.5">
          <CardTitle className="text-2xl">
            Your score: {score} / {quizzes.length}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {results.map((res, idx) => {
            const isCorrect = res.userAnswer === res.correctAnswer;

            return (
              <div key={idx} className="flex items-start gap-3">
                {isCorrect ? (
                  <HiOutlineCheckCircle className="text-green-500 size-7 shrink-0" />
                ) : (
                  <FiXCircle className="text-red-500 size-7 shrink-0" />
                )}

                <div className="flex flex-col gap-1 min-w-0">
                  <p className="text-zinc-500 text-sm wrap-break-words">
                    {idx + 1}. {res.question}
                  </p>

                  <p className="font-medium wrap-break-words">
                    Your answer: {res.userAnswer || "No answer"}
                  </p>

                  {!isCorrect && (
                    <p className="text-sm text-green-500 wrap-break-words">
                      Correct answer: {res.correctAnswer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="gap-5 flex flex-col sm:flex-row">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setStep(3)}
          >
            <RxReload className="size-4 mr-0.5" />
            Retake Quiz
          </Button>
          <Button className="w-full" onClick={() => setStep(1)}>
            <FaRegBookmark className="size-4 mr-0.5" />
            Save and Leave
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

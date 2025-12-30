"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useStep } from "./stepContext";

export type Quiz = {
  selectedOption: string;
  id: string;
  question: string;
  options: string[];
  answer: string;
};

export type QuizResult = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
};

type QuizContextType = {
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  isQuizActive: boolean;
  resetQuiz: () => void;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  answerQuestion: (option: string) => void;
  goToNext: () => void;
  finishQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { nextStep } = useStep();

  const isQuizActive = useMemo(() => {
    return quizzes.length > 0 && currentIndex < quizzes.length && !showResults;
  }, [quizzes.length, currentIndex, showResults]);

  const answerQuestion = (option: string) => {
    setQuizzes((prev) => {
      const copy = [...prev];
      copy[currentIndex] = {
        ...copy[currentIndex],
        selectedOption: option,
      };
      return copy;
    });

    setSelectedOption(option);

    if (option === quizzes[currentIndex]?.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const goToNext = () => {
    if (currentIndex + 1 < quizzes.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setShowResults(true);
    setCurrentIndex(quizzes.length);
    setSelectedOption(null);
    nextStep();
  };

  const resetQuiz = () => {
    setQuizzes([]);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResults(false);
    setScore(0);
  };
  return (
    <QuizContext.Provider
      value={{
        quizzes,
        setQuizzes,
        currentIndex,
        setCurrentIndex,
        selectedOption,
        setSelectedOption,
        score,
        setScore,
        isQuizActive,
        resetQuiz,
        setShowResults,
        goToNext,
        answerQuestion,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

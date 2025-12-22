"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

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
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
};

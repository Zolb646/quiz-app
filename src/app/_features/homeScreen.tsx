"use client";
import { Header } from "../_components/header";
import { SideBar } from "../_components/sideBar";
import React from "react";
import { HomeSection } from "../_components/homeSection";
import { SummarySection } from "../_components/summarySection";
import { QuizSection } from "../_components/quizSection";
import { QuizResultSection } from "../_components/quizResultSection";
export const HomeScreen = () => {
  const [step, setStep] = React.useState(2);
  return (
    <div className="h-screen w-full flex flex-col bg-[#f0f2f5]">
      <Header />
      <div className="flex h-full">
        <SideBar />
        <div className="w-full h-full flex flex-col items-center pt-20">
          {step === 1 && <HomeSection setStep={setStep} />}
          {step === 2 && <SummarySection setStep={setStep} />}
          {step === 3 && <QuizSection setStep={setStep} />}
          {step === 4 && <QuizResultSection setStep={setStep} />}
        </div>
      </div>
    </div>
  );
};

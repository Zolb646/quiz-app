"use client";
import { Header } from "../_components/header";
import { SideBar } from "../_components/sideBar";
import React from "react";
import { HomeSection } from "../_components/homeSection";
import { SummarySection } from "../_components/summarySection";
import { QuizSection } from "../_components/quizSection";
import { QuizResultSection } from "../_components/quizResultSection";
import { useStep } from "../_context/stepContext";
import { AppShell } from "../_components/appShell";
export const HomeScreen = () => {
  const { step } = useStep();
  return (
    <AppShell>
      {step === 0 && <HomeSection />}
      {step === 1 && <SummarySection />}
      {step === 2 && <QuizSection />}
      {step === 3 && <QuizResultSection />}
    </AppShell>
  );
};

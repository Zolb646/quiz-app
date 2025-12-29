"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuiz } from "../_context/quizContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuPanelLeftOpen } from "react-icons/lu";

type HeaderProps = {
  toggleSidebar: () => void;
};

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const router = useRouter();
  const { isQuizActive, resetQuiz } = useQuiz();
  const [pendingNavigation, setPendingNavigation] = useState(false);

  const handleNavigateHome = () => {
    if (isQuizActive) {
      setPendingNavigation(true);
      return;
    }
    router.push("/");
  };

  const confirmLeaveQuiz = () => {
    resetQuiz();
    router.push("/");
    setPendingNavigation(false);
  };

  return (
    <>
      <header className="w-full py-3 px-6 bg-white flex justify-between items-center border-b">
        <button className="sm:hidden mr-4" onClick={toggleSidebar}>
          <LuPanelLeftOpen className="size-6" />
        </button>
        <h1
          className="text-2xl font-semibold cursor-pointer"
          onClick={handleNavigateHome}
        >
          Quiz App
        </h1>

        <div className="flex gap-5">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {pendingNavigation && (
        <AlertDialog
          open={pendingNavigation}
          onOpenChange={setPendingNavigation}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Leave Quiz?</AlertDialogTitle>
              <AlertDialogDescription>
                You are currently in the middle of a quiz. Leaving now will
                reset your progress.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPendingNavigation(false)}>
                Stay
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmLeaveQuiz}>
                Leave Quiz
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

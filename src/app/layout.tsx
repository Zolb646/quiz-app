import type { Metadata } from "next";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ArticleProvider } from "./_context/articleContext";
import { QuizProvider } from "./_context/quizContext";
import InitUser from "./_components/initUser";
import { StepProvider } from "./_context/stepContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiz App",
  description: "A simple quiz application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ArticleProvider>
        <QuizProvider>
          <StepProvider>
            <html lang="en">
              <body
                className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
              >
                <InitUser />
                {children}
              </body>
            </html>
          </StepProvider>
        </QuizProvider>
      </ArticleProvider>
    </ClerkProvider>
  );
}

"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Article = {
  id?: string;
  title: string;
  content: string;
  summary: string;
};

type ArticleContextType = {
  article: Article | null;
  setArticle: React.Dispatch<React.SetStateAction<Article | null>>;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within an ArticleProvider");
  }
  return context;
};

type ProviderProps = {
  children: ReactNode;
};

export const ArticleProvider = ({ children }: ProviderProps) => {
  const [article, setArticle] = useState<Article | null>(null);

  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

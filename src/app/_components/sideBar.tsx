"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";
import { useArticle } from "../_context/articleContext";

type Article = {
  id?: string;
  title: string;
  content: string;
  summary: string;
};

type HistoryResponse = {
  yesterday: Article[];
  last7Days: Article[];
  last30Days: Article[];
};

type SideBarProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const SideBar = ({ setStep }: SideBarProps) => {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<HistoryResponse>({
    yesterday: [],
    last7Days: [],
    last30Days: [],
  });
  const { setArticle } = useArticle();

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(console.error);
  }, []);

  const handleSelectArticle = (article: Article) => {
    setArticle(article);
    setStep(2); // 👈 SummarySection
    setOpen(false);
  };

  return (
    <div
      className={`h-full bg-white py-5 flex flex-col transition-all duration-200 ${
        open ? "w-80 px-4" : "w-16 items-center"
      }`}
    >
      {/* OPEN BUTTON */}
      {!open && (
        <button onClick={() => setOpen(true)}>
          <LuPanelLeftOpen className="size-6" />
        </button>
      )}

      {/* CONTENT */}
      {open && (
        <div className="w-full h-full flex flex-col gap-6">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">History</h1>
            <button onClick={() => setOpen(false)}>
              <LuPanelLeftClose className="size-6" />
            </button>
          </div>

          {/* SECTIONS */}
          <div className="flex flex-col gap-5 overflow-y-auto">
            {/* YESTERDAY */}
            {history?.yesterday?.length > 0 && (
              <Section
                title="Yesterday"
                articles={history?.yesterday}
                onSelect={handleSelectArticle}
              />
            )}

            {/* LAST 7 DAYS */}
            {history?.last7Days.length > 0 && (
              <Section
                title="Last 7 Days"
                articles={history.last7Days}
                onSelect={handleSelectArticle}
              />
            )}

            {/* LAST 30 DAYS */}
            {history?.last30Days.length > 0 && (
              <Section
                title="Last 30 Days"
                articles={history.last30Days}
                onSelect={handleSelectArticle}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

type SectionProps = {
  title: string;
  articles: Article[];
  onSelect: (article: Article) => void;
};

const Section = ({ title, articles, onSelect }: SectionProps) => (
  <section className="flex flex-col gap-2">
    <p className="text-sm text-zinc-500">{title}</p>
    {articles.map((article) => (
      <Button
        key={article.id}
        variant="ghost"
        className="justify-start px-2"
        onClick={() => onSelect(article)}
      >
        {article.title}
      </Button>
    ))}
  </section>
);

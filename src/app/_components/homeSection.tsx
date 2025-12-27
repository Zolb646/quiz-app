import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderTitle } from "./headerTitle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FiFileText } from "react-icons/fi";
import React from "react";
import { Button } from "@/components/ui/button";
import { useArticle } from "../_context/articleContext";
import { useStep } from "../_context/stepContext";
import { toast } from "react-toastify";

export const HomeSection = () => {
  const [articleTitle, setArticleTitle] = React.useState("");
  const [articleContent, setArticleContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [titleError, setTitleError] = React.useState("");
  const [contentError, setContentError] = React.useState("");

  const { setArticle } = useArticle();
  const { nextStep } = useStep();

  const validate = () => {
    let valid = true;

    if (articleTitle.trim().length < 3) {
      setTitleError("Title must be at least 3 characters.");
      valid = false;
    } else {
      setTitleError("");
    }

    if (articleContent.trim().length < 20) {
      setContentError("Content must be at least 20 characters.");
      valid = false;
    } else {
      setContentError("");
    }

    return valid;
  };

  const handleGenerateSummary = async () => {
    if (!validate()) return;
    if (!articleTitle || !articleContent) return;

    setLoading(true);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: articleTitle,
          content: articleContent,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          toast.error(
            "Gemini API limit reached. Please wait or try again later."
          );
          return;
        }

        toast.error(data?.error || "Something went wrong.");
        return;
      }

      console.log("Generated Article:", data);
      setArticle(data.article);

      nextStep();
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-3xl">
      <CardHeader>
        <CardTitle>
          <HeaderTitle title="" />
        </CardTitle>
        <CardDescription className="text-base">
          Paste your article below to generate a summarize and quiz question.
          Your articles will saved in the sidebar for future reference.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Label
            htmlFor="article-title"
            className="text-lg font-medium flex items-center"
          >
            <FiFileText />
            <span className="ml-1 text-[#71717a]">Article Title</span>
          </Label>
          <Input
            className={`mt-2 shadow-none ${
              titleError ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            placeholder="Enter a title for your article..."
            value={articleTitle}
            onChange={(e) => {
              setArticleTitle(e.target.value);
              if (e.target.value.trim().length >= 3) {
                setTitleError("");
              }
            }}
          />
          {titleError && (
            <p className="mt-1 text-sm text-red-500">{titleError}</p>
          )}
        </div>
        <div>
          <Label
            htmlFor="article-content"
            className="text-lg font-medium flex items-center mt-5"
          >
            <FiFileText />
            <span className="ml-1 text-[#71717a]">Article Content</span>
          </Label>
          <Textarea
            className={`mt-2 resize-none shadow-none min-h-[120px] ${
              contentError ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            placeholder="Paste your article content here..."
            value={articleContent}
            onChange={(e) => {
              setArticleContent(e.target.value);
              if (e.target.value.trim().length >= 20) {
                setContentError("");
              }
            }}
          />
          {contentError && (
            <p className="mt-1 text-sm text-red-500">{contentError}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          disabled={!articleContent.trim() || !articleTitle.trim() || loading}
          onClick={() => {
            console.log("error");

            handleGenerateSummary();
          }}
          className={
            !articleContent.trim() || !articleTitle.trim() || loading
              ? "bg-[#71717A]"
              : ""
          }
        >
          {loading ? "Generating..." : "Generate summary"}
        </Button>
      </CardFooter>
    </Card>
  );
};

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
import { useUser } from "@clerk/nextjs";
import { useArticle } from "../_context/articleContext";

type HomeSectionProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
export const HomeSection = ({ setStep }: HomeSectionProps) => {
  const [articleTitle, setArticleTitle] = React.useState("");
  const [articleContent, setArticleContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { setArticle } = useArticle();
  const userId = useUser();
  const handleGenerateSummary = async () => {
    if (!articleTitle || !articleContent) return;

    setLoading(true);

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: articleTitle,
          content: articleContent,
          userId: userId.user?.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate summary");

      const data = await response.json();
      console.log("Generated Article:", data);
      setArticle(data.article);

      // Move to next step after successful summary
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert("There was an error generating the summary.");
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
            type="text"
            id="article-title"
            className="shadow-none mt-2"
            placeholder="Enter a title for your article..."
            onChange={(e) => setArticleTitle(e.target.value)}
          />
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
            id="article-content"
            placeholder="Paste your article content here..."
            className="resize-none shadow-none min-h-30 mt-2  scrollbar-hide"
            onChange={(e) => setArticleContent(e.target.value)}
          />
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

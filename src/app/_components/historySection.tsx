import { Button } from "@/components/ui/button";

type Article = {
  id: string;
  title: string;
  createdAt: string;
};
type SectionProps = {
  title: string;
  articles: Article[];
  onSelect: (article: Article) => void;
};
export const Section = ({ title, articles, onSelect }: SectionProps) => (
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

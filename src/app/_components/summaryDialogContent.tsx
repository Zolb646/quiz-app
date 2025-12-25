import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useArticle } from "../_context/articleContext";
import { usePathname } from "next/navigation";

export const SummaryDialogContent = () => {
  const { article } = useArticle();
  const pathname = usePathname();

  const isArticlePage = pathname.startsWith("/article/");

  return (
    <DialogContent
      className="max-w-2xl max-h-[80vh] overflow-y-auto"
      aria-describedby={undefined}
    >
      <DialogTitle className="font-bold text-2xl mb-4">
        {article?.title}
      </DialogTitle>

      {/* Summary always visible */}
      {!isArticlePage && (
        <p className="text-sm text-zinc-700 whitespace-pre-line">
          {article?.summary}
        </p>
      )}

      {/* Full content on article page */}
      {isArticlePage && (
        <p className="text-sm text-zinc-700 whitespace-pre-line">
          {article?.content}
        </p>
      )}
    </DialogContent>
  );
};

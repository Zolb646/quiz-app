import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useArticle } from "../_context/articleContext";

export const SummaryDialogContent = () => {
  const { article } = useArticle();
  return (
    <DialogContent className="max-w-2xl" aria-describedby="">
      <DialogTitle className="font-bold text-2xl mb-4">
        {article?.title}
      </DialogTitle>
      <p>{article?.summary}</p>
    </DialogContent>
  );
};

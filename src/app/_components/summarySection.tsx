import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderTitle } from "./headerTitle";
import { Label } from "@/components/ui/label";
import { BsBook } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SummaryDialogContent } from "./summaryDialogContent";
import { FaAngleLeft } from "react-icons/fa";
import { useArticle } from "../_context/articleContext";

type HomeSectionProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
export const SummarySection = ({ setStep }: HomeSectionProps) => {
  const { article } = useArticle();
  return (
    <div>
      <Button
        variant={`outline`}
        size={`icon`}
        className={`mb-6`}
        onClick={() => setStep(1)}
      >
        <FaAngleLeft className="size-5" />
      </Button>
      <Card className="w-3xl max-h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>
            <HeaderTitle title="" />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <Label className="flex gap-2 items-center">
            <BsBook className="size-4" />
            <span className="text-zinc-500">Summary Content</span>
          </Label>

          <h1 className="mt-2 font-bold text-2xl">{article?.title}</h1>

          {/* MULTI-LINE CLAMP */}
          <p className="mt-2 text-sm text-zinc-600 line-clamp-10">
            {article?.summary}
          </p>
        </CardContent>
        <CardFooter className="justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={`outline`}>See Content</Button>
            </DialogTrigger>
            <SummaryDialogContent />
          </Dialog>
          <Button onClick={() => setStep((prev) => prev + 1)}>
            Take a quiz
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

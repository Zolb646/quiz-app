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

type HomeSectionProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
export const SummarySection = ({ setStep }: HomeSectionProps) => {
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

          <h1 className="mt-2 font-bold text-2xl">Summary of the Quiz</h1>

          {/* MULTI-LINE CLAMP */}
          <p className="mt-2 text-sm text-zinc-600 line-clamp-10">
            Genghis Khan, born Temüjin around 1162, was the founder of the
            Mongol Empire. After his father's death, Temüjin's family was left
            in poverty, and he later killed his half-brother to secure his
            position. He built alliances with leaders like Jamukha and Toghrul,
            and despite being defeated in battle and briefly under the Jin
            dynasty, he rose to power by defeating rivals... Genghis Khan, born
            Temüjin around 1162, was the founder of the Mongol Empire. After his
            father's death, Temüjin's family was left in poverty, and he later
            killed his half-brother to secure his position. He built alliances
            with leaders like Jamukha and Toghrul, and despite being defeated in
            battle and briefly under the Jin dynasty, he rose to power by
            defeating rivals... Genghis Khan, born Temüjin around 1162, was the
            founder of the Mongol Empire. After his father's death, Temüjin's
            family was left in poverty, and he later killed his half-brother to
            secure his position. He built alliances with leaders like Jamukha
            and Toghrul, and despite being defeated in battle and briefly under
            the Jin dynasty, he rose to power by defeating rivals... Genghis
            Khan, born Temüjin around 1162, was the founder of the Mongol
            Empire. After his father's death, Temüjin's family was left in
            poverty, and he later killed his half-brother to secure his
            position. He built alliances with leaders like Jamukha and Toghrul,
            and despite being defeated in battle and briefly under the Jin
            dynasty, he rose to power by defeating rivals
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

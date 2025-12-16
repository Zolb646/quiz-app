import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderTitle } from "./headerTitle";
import { Button } from "@/components/ui/button";
import { FiX } from "react-icons/fi";
type HomeSectionProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
export const QuizSection = ({ setStep }: HomeSectionProps) => {
  return (
    <Card className="bg-[#f0f2f5] shadow-none border-none relative w-3xl">
      <CardHeader>
        <div>
          <CardTitle className="text-3xl font-bold text-center">
            <HeaderTitle title="Quick Test" />
          </CardTitle>
          <CardDescription className="text-base">
            Take a quick test about your knowledge from your content
          </CardDescription>
        </div>
        <Button
          variant={`ghost`}
          size={`icon`}
          className="absolute top-6 right-6 border bg-white"
          onClick={() => setStep(1)}
        >
          <FiX />
        </Button>
      </CardHeader>
      <CardContent className="bg-white border rounded-lg p-7 shadow-lg mx-6">
        <div className="flex items-start justify-between w-full mb-4 gap-4">
          <h1 className="text-xl font-medium flex-1 min-w-0 wrap-break-words">
            This is where the quiz questions will be displayed. This is where
            the quiz questions will be displayed. This is where the quiz
            questions will be displayed.
          </h1>

          <p className="text-xl shrink-0 whitespace-nowrap">
            3 <span className="text-base text-zinc-500">/ 3</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-5">
          <Button
            onClick={() => setStep((prev) => prev + 1)}
            variant={`outline`}
          >
            Submit
          </Button>
          <Button
            onClick={() => setStep((prev) => prev + 1)}
            variant={`outline`}
          >
            Submit
          </Button>
          <Button
            onClick={() => setStep((prev) => prev + 1)}
            variant={`outline`}
          >
            Submit
          </Button>
          <Button
            onClick={() => setStep((prev) => prev + 1)}
            variant={`outline`}
          >
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

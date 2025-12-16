import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeaderTitle } from "./headerTitle";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { FiXCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { RxReload } from "react-icons/rx";
import { FaRegBookmark } from "react-icons/fa6";

export const QuizResultSection = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="min-w-md max-w-lg flex flex-col">
      <HeaderTitle title="Quiz Completed" />
      <p className="text-gray-600 mt-2 font-medium">Let’s see what you did</p>
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-baseline gap-2.5 ">
          <CardTitle className="text-2xl">Your score: {`3`}</CardTitle>
          <p className="text-[#6B7280]">/ 5</p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <HiOutlineCheckCircle className="text-green-500 size-7" />
            <div className="flex flex-col gap-1">
              <p className="text-[#737373] text-sm wrap-break-words">
                1. What was Genghis Khan’s birth name?
              </p>
              <p className="font-medium">Your answer: Temujin</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <FiXCircle className="text-red-500 size-7" />
            <div className="flex flex-col gap-1">
              <p className="text-[#737373] text-sm wrap-break-words">
                2. What was the name of the first Mongol Empire?
              </p>
              <p className="font-medium">Your answer: Mongol Empire</p>
              <p className=" text-sm text-green-500">Correct answer: Temujin</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <HiOutlineCheckCircle className="text-green-500 size-7" />
            <div className="flex flex-col gap-1">
              <p className="text-[#737373] text-sm wrap-break-words">
                3. What was Genghis Khan’s birth name?
              </p>
              <p className="font-medium">Your answer: Temujin</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <FiXCircle className="text-red-500 size-7" />
            <div className="flex flex-col gap-1">
              <p className="text-[#737373] text-sm wrap-break-words">
                4. What was the name of the first Mongol Empire?
              </p>
              <p className="font-medium">Your answer: Mongol Empire</p>
              <p className=" text-sm text-green-500">Correct answer: Temujin</p>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <FiXCircle className="text-red-500 size-7" />
            <div className="flex flex-col gap-1">
              <p className="text-[#737373] text-sm wrap-break-words">
                5. What was the name of the first Mongol Empire?
              </p>
              <p className="font-medium">Your answer: Mongol Empire</p>
              <p className=" text-sm text-green-500">Correct answer: Temujin</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-5">
          <Button
            className="w-full"
            variant={`outline`}
            onClick={() => setStep(3)}
          >
            <RxReload className="size-4 mr-0.5" />
            <span>Retake Quiz</span>
          </Button>
          <Button className="w-full" onClick={() => setStep(1)}>
            <FaRegBookmark className="size-4 mr-0.5" />
            <span>Save and Leave</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

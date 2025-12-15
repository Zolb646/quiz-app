import { Header } from "../_components/header";
import { SideBar } from "../_components/sideBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { BsStars } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";

export const HomeScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-[#f0f2f5]">
      <Header />
      <div className="flex h-full">
        <SideBar />
        <div className="w-full h-screen px-64">
          <Card className="mt-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BsStars className="size-6" />
                <h1 className="text-2xl font-bold">Article Quiz Generator</h1>
              </CardTitle>
              <CardDescription className="text-base">
                Paste your article below to generate a summarize and quiz
                question. Your articles will saved in the sidebar for future
                reference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="article" className="text-lg font-medium">
                <FiFileText />
                <span className="ml-2">Article Title</span>
              </Label>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

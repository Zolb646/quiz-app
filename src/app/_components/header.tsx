import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export const Header = (): React.JSX.Element => {
  return (
    <header className="w-full py-3 px-6 bg-white flex justify-between items-center border-b">
      <h1 className="text-2xl font-semibold">Quiz App</h1>
      <Avatar>
        <AvatarImage src={`/_.jpeg`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
};

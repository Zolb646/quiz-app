import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

export const Header = (): React.JSX.Element => {
  return (
    <header className="w-full py-3 px-6 bg-white flex justify-between items-center border-b">
      <h1 className="text-2xl font-semibold">Quiz App</h1>
      {/* <Avatar>
        <AvatarImage src={`/_.jpeg`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
      <div className="flex gap-5">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

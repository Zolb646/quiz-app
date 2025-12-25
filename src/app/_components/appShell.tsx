"use client";

import { Header } from "./header";
import { SideBar } from "./sideBar";

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex flex-col bg-[#f0f2f5]">
      <Header />
      <div className="flex h-full">
        <SideBar />
        <div className="w-full h-full flex flex-col items-center pt-20">
          {children}
        </div>
      </div>
    </div>
  );
};

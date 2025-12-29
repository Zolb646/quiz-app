"use client";

import React, { ReactNode, useState } from "react";
import { Header } from "./header";
import { SideBar } from "./sideBar";

type LayoutProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col bg-[#f0f2f5]">
      {/* Header */}
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex h-full overflow-hidden">
        {/* Sidebar */}
        <div className="hidden sm:flex">
          <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex sm:hidden">
            {/* Overlay backdrop */}
            <div
              className="fixed inset-0 bg-black z-[-1] opacity-50"
              onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar drawer */}
            <SideBar open={true} setOpen={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 h-full overflow-auto flex flex-col items-center p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

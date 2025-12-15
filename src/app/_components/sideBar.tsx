"use client";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelLeftOpen } from "react-icons/lu";
import React from "react";
import { Button } from "@/components/ui/button";
export const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={`h-full bg-white py-5 flex flex-col space-y-4 transition-all duration-300 ${
        open ? "w-80 px-4" : "w-16 items-center"
      }`}
    >
      <button className={`${open && "hidden"}`} onClick={() => setOpen(!open)}>
        <LuPanelLeftOpen className="size-6" />
      </button>

      <div className={`w-full h-full flex flex-col gap-2 ${!open && "hidden"}`}>
        {/* header */}
        <div className="w-full flex justify-between">
          <h1 className="font-semibold text-xl">History</h1>
          <button onClick={() => setOpen(!open)}>
            <LuPanelLeftClose className="size-6" />
          </button>
        </div>

        {/* content */}
        <section className="w-full flex flex-col mt-4 max-h-fit">
          <div className="w-full h-fit flex flex-col">
            <div className="w-full h-fit flex flex-col">
              <p className="text-[#71717A] text-sm">Yesterday</p>
              <Button variant={`ghost`} className="w-fit">
                Quiz on React Basics
              </Button>
              <Button variant={`ghost`} className="w-fit">
                Quiz on React Basics
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

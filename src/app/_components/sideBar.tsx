"use client";
import { LuPanelLeftClose } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { LuPanelLeftOpen } from "react-icons/lu";
import React from "react";
export const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={`h-full bg-white py-5 flex flex-col space-y-4 transition-all duration-300 ${
        open ? "w-80 items-end px-4" : "w-16 items-center"
      }`}
    >
      <button className={`${open && "hidden"}`} onClick={() => setOpen(!open)}>
        <LuPanelLeftOpen className="size-7" />
      </button>
      <button className={`${!open && "hidden"}`} onClick={() => setOpen(!open)}>
        <LuPanelLeftClose className="size-7" />
      </button>
    </div>
  );
};

// "use client";
// import { useState } from "react";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);

//   return <div className="flex h-screen">{/* Sidebar */}</div>;
// }

import prisma from "../lib/prisma";
import { Header } from "./_components/header";
import { SideBar } from "./_components/sideBar";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users, "idk");

  return (
    <div className="h-screen w-full flex flex-col bg-[#f0f2f5]">
      <Header />
      <div className="flex h-screen">
        <SideBar />
      </div>
    </div>
  );
}

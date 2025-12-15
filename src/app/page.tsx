import prisma from "../lib/prisma";
import { HomeScreen } from "./_features/homeScreen";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users, "idk");

  return (
    <>
      <HomeScreen />
    </>
  );
}
